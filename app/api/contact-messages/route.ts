import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";
import { sendContactFormNotification, sendContactConfirmation } from "@/app/lib/email";

export async function GET() {
  try {
    const messages = await prisma.contactMessage.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(messages);
  } catch (error) {
    console.error("Error fetching contact messages:", error);
    return NextResponse.json([], { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log("Contact message received:", { name: body.name, email: body.email, subject: body.subject, hasMessage: !!body.message });

    if (!body.name || !body.email || !body.message) {
      console.log("Contact message validation failed:", { name: !!body.name, email: !!body.email, message: !!body.message });
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const message = await prisma.contactMessage.create({
      data: {
        name: body.name,
        email: body.email,
        phone: body.phone || null,
        subject: body.subject || null,
        message: body.message,
        isRead: false,
      },
    });

    console.log("Contact message created:", { id: message.id, subject: message.subject });

    // Send email notifications
    try {
      const emailData = {
        name: body.name,
        email: body.email,
        phone: body.phone,
        subject: body.subject,
        message: body.message,
        pageUrl: body.pageUrl
      };

      // Send notification to admin
      const notificationSent = await sendContactFormNotification(emailData);
      
      // Send confirmation to customer
      const confirmationSent = await sendContactConfirmation(emailData);
      
      console.log("Email notifications:", { 
        notification: notificationSent, 
        confirmation: confirmationSent 
      });
    } catch (emailError) {
      console.error("Error sending email notifications:", emailError);
      // Continue with success response even if emails fail
    }

    return NextResponse.json(message, { status: 201 });
  } catch (error) {
    console.error("Error creating contact message:", error);
    return NextResponse.json(
      { error: "Failed to save message" },
      { status: 500 }
    );
  }
}
