import { NextRequest, NextResponse } from "next/server";
import { sendQuoteNotification, sendQuoteConfirmation } from "@/app/lib/email";
import { generateOrderId } from "@/app/lib/orderIdGenerator";

export async function POST(request: NextRequest) {
  try {
    const { name, email, phone, company, notes, items, pageUrl } = await request.json();
    if (!name || !email) {
      return NextResponse.json({ error: "Name and email are required" }, { status: 400 });
    }
    const orderId = await generateOrderId();
    const emailData = { name, email, phone, company, notes, items: Array.isArray(items) ? items : [], orderId, pageUrl };

    const sent = await sendQuoteNotification(emailData);
    if (!sent) {
      return NextResponse.json({ error: "Could not send your request. Please email us directly." }, { status: 502 });
    }
    await sendQuoteConfirmation(emailData).catch(() => false);

    return NextResponse.json(
      { success: true, orderId, quote: { id: orderId, orderId, itemCount: emailData.items.length } },
      { status: 201 }
    );
  } catch (error) {
    console.error("Quote error:", error);
    return NextResponse.json({ error: "Failed to send quote request" }, { status: 500 });
  }
}
