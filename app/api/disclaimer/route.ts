import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";

export async function GET() {
  try {
    const disclaimer = await prisma.disclaimer.findFirst();
    
    if (!disclaimer) {
      return NextResponse.json({
        id: null,
        title: "Data & Privacy Notice",
        content: "We respect your privacy. By using our website, you agree to our terms and privacy policy.",
        isActive: true,
        acceptButtonText: "I Accept",
        declineButtonText: "Decline",
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    return NextResponse.json(disclaimer);
  } catch (error) {
    console.error("Error fetching disclaimer:", error);
    return NextResponse.json({
      id: null,
      title: "Data & Privacy Notice",
      content: "We respect your privacy. By using our website, you agree to our terms and privacy policy.",
      isActive: true,
      acceptButtonText: "I Accept",
      declineButtonText: "Decline",
    });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const existing = await prisma.disclaimer.findFirst();
    
    if (existing) {
      const updated = await prisma.disclaimer.update({
        where: { id: existing.id },
        data: {
          title: body.title,
          content: body.content,
          isActive: body.isActive,
          acceptButtonText: body.acceptButtonText,
          declineButtonText: body.declineButtonText,
        },
      });
      return NextResponse.json(updated);
    } else {
      const created = await prisma.disclaimer.create({
        data: {
          title: body.title,
          content: body.content,
          isActive: body.isActive || true,
          acceptButtonText: body.acceptButtonText || "I Accept",
          declineButtonText: body.declineButtonText || "Decline",
        },
      });
      return NextResponse.json(created);
    }
  } catch (error) {
    console.error("Error saving disclaimer:", error);
    return NextResponse.json({ error: "Failed to save disclaimer" }, { status: 500 });
  }
}
