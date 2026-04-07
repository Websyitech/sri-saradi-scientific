import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";
import { sendQuoteNotification, sendQuoteConfirmation } from "@/app/lib/email";

interface QuoteItemData {
  productId?: string;
  sku?: string;
  name: string;
  quantity: number;
}

export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get("auth_token")?.value;
    const { name, email, phone, company, notes, items, pageUrl } = await request.json();

    console.log("Quote submission received:", { name, email, phone, company, notes, items: items?.length });

    // Validate input
    if (!name || !email) {
      console.log("Quote validation failed:", { name: !!name, email: !!email, items: items?.length });
      return NextResponse.json(
        { error: "Name and email are required" },
        { status: 400 }
      );
    }

    // Get user ID if logged in
    let userId: string | undefined;
    if (token) {
      const user = await prisma.user.findUnique({
        where: { id: token },
      });
      if (user) {
        userId = user.id;
      }
    }

    // Create quote request
    console.log("Creating quote request with data:", { userId, name, email, phone, company, notes });
    const quoteRequest = await prisma.quoteRequest.create({
      data: {
        userId,
        name,
        email,
        phone: phone || null,
        company: company || null,
        notes: notes || null,
        status: "pending",
      },
    });
    console.log("Quote request created:", { id: quoteRequest.id, orderId: quoteRequest.orderId });

    // Create quote items
    console.log("Creating quote items:", items);
    let quoteItems: any[] = [];
    if (items && items.length > 0) {
      quoteItems = await Promise.all(
        items.map((item: QuoteItemData) =>
          prisma.quoteItem.create({
            data: {
              quoteId: quoteRequest.id,
              productId: item.productId || null,
              sku: item.sku || null,
              name: item.name,
              quantity: item.quantity || 1,
            },
          })
        )
      );
    }
    console.log("Quote items created:", quoteItems.length);

    // Send email notifications
    try {
      const emailData = {
        name,
        email,
        phone,
        company,
        notes,
        items: items || [],
        orderId: quoteRequest.orderId,
        pageUrl
      };

      // Send notification to admin
      const notificationSent = await sendQuoteNotification(emailData);
      
      // Send confirmation to customer
      const confirmationSent = await sendQuoteConfirmation(emailData);
      
      console.log("Quote email notifications:", { 
        notification: notificationSent, 
        confirmation: confirmationSent 
      });
    } catch (emailError) {
      console.error("Error sending quote email notifications:", emailError);
      // Continue with success response even if emails fail
    }

    return NextResponse.json(
      {
        success: true,
        orderId: quoteRequest.orderId,
        quote: {
          id: quoteRequest.id,
          orderId: quoteRequest.orderId,
          itemCount: quoteItems.length,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Quote creation error:", error);
    return NextResponse.json(
      { error: "Failed to create quote" },
      { status: 500 }
    );
  }
}

// GET endpoint to fetch user's quotes
export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get("auth_token")?.value;

    if (!token) {
      return NextResponse.json(
        { error: "Not authenticated" },
        { status: 401 }
      );
    }

    const quotes = await prisma.quoteRequest.findMany({
      where: { userId: token },
      include: { items: true },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ quotes });
  } catch (error) {
    console.error("Quote fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch quotes" },
      { status: 500 }
    );
  }
}
