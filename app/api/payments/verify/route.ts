import { NextRequest, NextResponse } from "next/server";
import { settleByPaymentId, settleBySessionId } from "@/app/lib/paidOrders";
import { verifyWidgetSignature } from "@/app/lib/zohoPayments";

const idOk = (v: unknown): v is string => typeof v === "string" && /^[A-Za-z0-9_-]{1,64}$/.test(v);

/**
 * Called by the browser after the checkout widget closes.
 * Nothing sent here is trusted: the payment is re-read from Zoho and must
 * carry this order's reference number and the exact order total.
 */
export async function POST(request: NextRequest) {
  try {
    const { orderId, paymentId, paymentSessionId, signature } = await request.json().catch(() => ({}));
    if (!idOk(orderId) || !idOk(paymentSessionId) || (paymentId !== undefined && paymentId !== null && !idOk(paymentId))) {
      return NextResponse.json({ paid: false, error: "Invalid request" }, { status: 400 });
    }

    let result;
    if (paymentId) {
      if (verifyWidgetSignature(paymentId, paymentSessionId, typeof signature === "string" ? signature : "") === false) {
        return NextResponse.json({ paid: false, error: "Payment signature is not valid" }, { status: 400 });
      }
      result = await settleByPaymentId(paymentId, orderId);
    } else {
      result = await settleBySessionId(paymentSessionId, orderId);
    }

    if (result.ok) return NextResponse.json({ paid: true, orderId: result.orderId });
    return NextResponse.json({ paid: false, pending: !!result.pending, error: result.reason });
  } catch (error) {
    console.error("Verify payment error:", error);
    return NextResponse.json({ paid: false, pending: true, error: "Could not confirm the payment yet" }, { status: 502 });
  }
}
