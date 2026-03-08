import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug");

    if (slug) {
      const faq = await prisma.fAQ.findUnique({
        where: { slug },
      });

      if (!faq) {
        return NextResponse.json(
          { error: "FAQ not found" },
          { status: 404 }
        );
      }

      return NextResponse.json(faq);
    }

    const faqs = await prisma.fAQ.findMany({
      where: { isActive: true },
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
