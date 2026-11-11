import { NextResponse } from "next/server";
import { sendContactFormNotification, sendContactConfirmation } from "@/app/lib/email";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body.name || !body.email || !body.message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }
    const emailData = {
      name: body.name,
      email: body.email,
      phone: body.phone,
      subject: body.subject,
      message: body.message,
      pageUrl: body.pageUrl,
    };
    const sent = await sendContactFormNotification(emailData);
    if (!sent) {
      return NextResponse.json({ error: "Could not send your message. Please email us directly." }, { status: 502 });
    }
    await sendContactConfirmation(emailData).catch(() => false);
    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error("Contact message error:", error);
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }
}
