import prisma from "@/app/lib/prisma";
import { computeOrderTotal, getPayableProduct } from "@/app/lib/payableProducts";
import { getPayment, getPaymentSession, ZohoPayment } from "@/app/lib/zohoPayments";
import { sendPaymentNotification, sendPaymentConfirmation } from "@/app/lib/email";

export const STATUS_PAYMENT_PENDING = "payment_pending";
export const STATUS_PAID = "paid";

export type SettleResult =
  | { ok: true; orderId: string; alreadyPaid: boolean }
  | { ok: false; reason: string; pending?: boolean };

async function loadOrder(orderId: string) {
  return prisma.quoteRequest.findUnique({ where: { orderId }, include: { items: true } });
}

function expectedAmount(order: NonNullable<Awaited<ReturnType<typeof loadOrder>>>): number | null {
  const item = order.items[0];
  const product = item?.sku ? getPayableProduct(item.sku) : null;
  if (!item || !product) return null;
  return computeOrderTotal(product, item.quantity);
}

/**
 * Marks an order paid after checking the payment with Zoho directly.
 * Safe to call from both the browser-verify route and the webhook:
 * only the first caller flips the status and sends the emails.
 */
export async function settlePayment(payment: ZohoPayment, expectOrderId?: string): Promise<SettleResult> {
  const orderId = payment.reference_number || "";
  if (!orderId || (expectOrderId && expectOrderId !== orderId)) {
    return { ok: false, reason: "Payment does not belong to this order" };
  }
  const order = await loadOrder(orderId);
  if (!order) return { ok: false, reason: "Order not found" };

  if (payment.status !== "succeeded") {
    return { ok: false, reason: `Payment status is ${payment.status}`, pending: payment.status !== "failed" };
  }

  const expected = expectedAmount(order);
  if (expected === null || payment.currency !== "INR" || Math.abs(Number(payment.amount) - expected) > 0.009) {
    console.error("Zoho payment amount mismatch", { orderId, paid: payment.amount, expected });
    return { ok: false, reason: "Paid amount does not match the order total" };
  }

  if (order.status !== STATUS_PAYMENT_PENDING) {
    return { ok: true, orderId, alreadyPaid: true };
  }

  const stamp =
    `\n[Payment] PAID ₹${payment.amount} via ${payment.payment_method?.type || "online"}` +
    ` | Zoho payment ID: ${payment.payment_id}`;
  const updated = await prisma.quoteRequest.updateMany({
    where: { orderId, status: STATUS_PAYMENT_PENDING },
    data: { status: STATUS_PAID, notes: `${order.notes || ""}${stamp}`, updatedAt: new Date() },
  });
  if (updated.count === 0) return { ok: true, orderId, alreadyPaid: true };

  try {
    const emailData = {
      orderId,
      name: order.name,
      email: order.email,
      phone: order.phone || undefined,
      company: order.company || undefined,
      notes: order.notes || undefined,
      amount: payment.amount,
      paymentId: payment.payment_id,
      items: order.items.map((i) => ({ name: i.name, quantity: i.quantity })),
    };
    await Promise.all([sendPaymentNotification(emailData), sendPaymentConfirmation(emailData)]);
  } catch (err) {
    console.error("Payment emails failed:", err);
  }
  return { ok: true, orderId, alreadyPaid: false };
}

/** Settle from a payment id (widget response or webhook). */
export async function settleByPaymentId(paymentId: string, expectOrderId?: string): Promise<SettleResult> {
  return settlePayment(await getPayment(paymentId), expectOrderId);
}

/** Fallback when the widget closed before returning a payment id. */
export async function settleBySessionId(sessionId: string, expectOrderId: string): Promise<SettleResult> {
  const session = await getPaymentSession(sessionId);
  if (session.reference_number !== expectOrderId) {
    return { ok: false, reason: "Payment session does not belong to this order" };
  }
  const paid = session.payments?.find((p) => p.status === "succeeded");
  if (!paid) return { ok: false, reason: "No successful payment in this session yet", pending: true };
  return settleByPaymentId(paid.payment_id, expectOrderId);
}
