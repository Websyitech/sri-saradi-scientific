import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const faqs = await prisma.fAQ.findMany({
      orderBy: { sortOrder: "asc" },
    });
    return NextResponse.json(faqs);
  } catch (error) {
    console.error("Error fetching FAQs:", error);
    return NextResponse.json(
      { error: "Failed to fetch FAQs" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { slug, title, heading, subheading, banner, content, isActive, sortOrder } = body;

    const faq = await prisma.fAQ.create({
      data: {
        slug,
        title,
        heading,
        subheading,
        banner,
        content,
        isActive: isActive ?? true,
        sortOrder: sortOrder ?? 0,
      },
    });

    return NextResponse.json(faq, { status: 201 });
  } catch (error) {
    console.error("Error creating FAQ:", error);
    return NextResponse.json(
      { error: "Failed to create FAQ" },
      { status: 500 }
    );
  }
}
