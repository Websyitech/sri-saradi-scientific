import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";

// Public API - returns Solarbio products for homepage
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get("limit") || "12");

    const products = await prisma.product.findMany({
      where: {
        brand: "Solarbio",
        isActive: true,
      },
      select: {
        id: true,
        catalogNumber: true,
        name: true,
        primaryCategory: true,
        image: true,
      },
      orderBy: [{ isFeatured: "desc" }, { sortOrder: "asc" }],
      take: limit,
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error("Error fetching Solarbio products:", error);
    return NextResponse.json([]);
  }
}
