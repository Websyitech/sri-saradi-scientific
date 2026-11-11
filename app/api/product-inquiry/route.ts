import { NextRequest, NextResponse } from "next/server";
import { sendQuoteNotification, sendQuoteConfirmation } from "@/app/lib/email";
import { generateOrderId } from "@/app/lib/orderIdGenerator";

// "Can't find a product?" form in the top header.
export async function POST(request: NextRequest) {
  try {
    const { name, email, phone, company, productName, description } = await request.json();
    if (!name || !email || !productName) {
      return NextResponse.json({ error: "Name, email and product are required" }, { status: 400 });
    }
    const orderId = await generateOrderId();
    const emailData = {
      name,
      email,
      phone,
      company,
      notes: `Product inquiry (not found on site)\n${description || ""}`,
      items: [{ name: productName, quantity: 1 }],
      orderId,
    };
    const sent = await sendQuoteNotification(emailData);
    if (!sent) return NextResponse.json({ error: "Could not send your inquiry" }, { status: 502 });
    await sendQuoteConfirmation(emailData).catch(() => false);
    return NextResponse.json({ success: true, orderId }, { status: 201 });
  } catch (error) {
    console.error("Product inquiry error:", error);
    return NextResponse.json({ error: "Failed to send inquiry" }, { status: 500 });
  }
}
