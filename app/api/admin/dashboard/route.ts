import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";
import { adminAuth } from "@/app/lib/adminAuth";

export async function GET(request: NextRequest) {
  const auth = adminAuth(request);
  if (auth instanceof NextResponse) return auth;

  try {
    const [
      totalProducts,
      totalCategories,
      totalQuotes,
      pendingQuotes,
      activeSlides,
      totalJobs,
    ] = await Promise.all([
      prisma.product.count(),
      prisma.category.count(),
      prisma.quoteRequest.count(),
      prisma.quoteRequest.count({ where: { status: "pending" } }),
      prisma.heroSlide.count({ where: { isActive: true } }),
      prisma.jobOpening.count({ where: { isActive: true } }),
    ]);

    const recentQuotes = await prisma.quoteRequest.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      include: { items: true },
    });

    return NextResponse.json({
      stats: {
        totalProducts,
        totalCategories,
        totalQuotes,
        pendingQuotes,
        activeSlides,
        totalJobs,
      },
      recentQuotes,
    });
  } catch (error) {
    console.error("Dashboard error:", error);
    return NextResponse.json({ error: "Failed to load dashboard" }, { status: 500 });
  }
}
