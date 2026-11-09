import { NextRequest, NextResponse } from "next/server";
import { settleByPaymentId } from "@/app/lib/paidOrders";
import { verifyWebhookSignature } from "@/app/lib/zohoPayments";

/** Finds the first payment_id anywhere in the event payload. */
function findPaymentId(node: unknown, depth = 0): string | null {
  if (!node || typeof node !== "object" || depth > 6) return null;
  const obj = node as Record<string, unknown>;
  if (typeof obj.payment_id === "string" || typeof obj.payment_id === "number") return String(obj.payment_id);
  for (const value of Object.values(obj)) {
    const found = findPaymentId(value, depth + 1);
    if (found) return found;
  }
  return null;
}

/**
 * Zoho Payments webhook (register for payment.succeeded and payment.failed).
 * The body is only used to learn which payment changed; its status and amount
 * are then read from the Zoho API before the order is touched.
 */
export async function POST(request: NextRequest) {
  const raw = await request.text();

  if (!process.env.ZOHO_PAY_WEBHOOK_SIGNING_KEY) {
    // Lets Zoho's registration ping succeed before the signing key exists; nothing is processed.
    console.warn("Zoho webhook received but ZOHO_PAY_WEBHOOK_SIGNING_KEY is not set; ignoring.");
    return NextResponse.json({ received: true });
  }
  if (!verifyWebhookSignature(raw, request.headers.get("x-zoho-webhook-signature"))) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  try {
    const paymentId = findPaymentId(JSON.parse(raw));
    if (paymentId && /^[A-Za-z0-9_-]{1,64}$/.test(paymentId)) {
      const result = await settleByPaymentId(paymentId);
      if (!result.ok) console.log("Zoho webhook not settled:", paymentId, result.reason);
    }
  } catch (error) {
    // Return 5xx so Zoho retries later.
    console.error("Zoho webhook processing error:", error);
    return NextResponse.json({ error: "Processing failed" }, { status: 500 });
  }
  return NextResponse.json({ received: true });
}

export async function GET() {
  return NextResponse.json({ ok: true });
}
