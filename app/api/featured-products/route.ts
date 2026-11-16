import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      where: { isFeatured: true, isActive: true },
      orderBy: { sortOrder: "asc" },
      take: 6,
      include: {
        variants: { orderBy: { sortOrder: "asc" }, where: { isActive: true } },
        category: true,
      },
    });
    return NextResponse.json(products);
  } catch (error) {
    console.error("Error fetching featured products:", error);
    return NextResponse.json([], { status: 500 });
  }
}
