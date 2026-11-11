import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { saveOrder } from "@/app/lib/orderStore";
import { generateOrderId } from "@/app/lib/orderIdGenerator";
import { computeOrderTotal, getPayableProduct } from "@/app/lib/payableProducts";
import { createPaymentSession, missingConfig, widgetConfig, ZohoPayError } from "@/app/lib/zohoPayments";
import { STATUS_PAYMENT_PENDING } from "@/app/lib/paidOrders";

const clean = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const product = getPayableProduct(clean(body.sku, 80));
    const quantity = Number(body.quantity);
    const name = clean(body.name, 120);
    const email = clean(body.email, 160);
    const phone = clean(body.phone, 20);
    const company = clean(body.company, 160);
    const address = clean(body.address, 600);
    const gstin = clean(body.gstin, 20);
    const pageUrl = clean(body.pageUrl, 300);

    if (!product) return NextResponse.json({ error: "This product cannot be bought online." }, { status: 400 });
    if (!Number.isInteger(quantity) || quantity < 1 || quantity > product.maxQuantity) {
      return NextResponse.json({ error: `Quantity must be between 1 and ${product.maxQuantity}.` }, { status: 400 });
    }
    if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !/^\+?[0-9][0-9\s-]{7,16}$/.test(phone) || address.length < 10) {
      return NextResponse.json(
        { error: "Please enter your name, a valid email, a phone number and the full delivery address." },
        { status: 400 }
      );
    }

    const missing = missingConfig();
    if (missing.length) {
      console.error("Zoho Payments not configured. Missing:", missing.join(", "));
      return NextResponse.json(
        { error: "Online payment is not available right now. Please request a quotation instead." },
        { status: 503 }
      );
    }

    const amount = computeOrderTotal(product, quantity);
    const orderId = await generateOrderId();

    const notes = [
      `ONLINE ORDER — amount due ₹${amount.toFixed(2)} (GST included)`,
      `Delivery address: ${address}`,
      gstin ? `GSTIN: ${gstin}` : "",
      pageUrl ? `Page: ${pageUrl}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    const order = {
      orderId,
      status: STATUS_PAYMENT_PENDING,
      name,
      email,
      phone,
      company: company || undefined,
      notes,
      sku: product.sku,
      productName: product.name,
      quantity,
      amount: amount.toFixed(2),
      createdAt: new Date().toISOString(),
    } as const;
    await saveOrder({ ...order });

    const session = await createPaymentSession({
      amount,
      description: `${product.name} x ${quantity} (Order ${orderId})`,
      referenceNumber: orderId,
      metaData: [
        { key: "order_id", value: orderId },
        { key: "sku", value: product.sku },
      ],
    });

    await saveOrder({ ...order, paymentSessionId: session.payments_session_id });

    return NextResponse.json({
      orderId,
      paymentSessionId: session.payments_session_id,
      amount: amount.toFixed(2),
      currency: "INR",
      description: `${product.name} x ${quantity}`,
      thankYouPath: product.thankYouPath,
      widget: widgetConfig(),
    });
  } catch (error) {
    console.error("Create payment session error:", error);
    const status = error instanceof ZohoPayError ? error.status : 500;
    return NextResponse.json({ error: "Could not start the payment. Please try again in a moment." }, { status });
  }
}
