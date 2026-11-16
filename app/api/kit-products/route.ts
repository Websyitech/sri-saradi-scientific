import { NextResponse, NextRequest } from "next/server";
import prisma from "@/app/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const slug = request.nextUrl.searchParams.get("slug");

    if (slug) {
      const kitProduct = await prisma.kitProduct.findFirst({
        where: { slug, isActive: true },
        include: {
          catalog: true
        }
      });
      console.log("Fetched kit product with slug:", slug, kitProduct);
      return NextResponse.json(kitProduct);
    }

    const kitProducts = await prisma.kitProduct.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: "asc" },
    });
    console.log("Fetched all kit products, count:", kitProducts.length);
    
    // Debug: fetch all without filter
    const allProducts = await prisma.kitProduct.findMany();
    console.log("ALL kit products in DB (unfiltered):", allProducts.length, allProducts.map(p => ({ id: p.id, title: p.title, isActive: p.isActive })));
    
    return NextResponse.json(kitProducts);
  } catch (error) {
    console.error("Error fetching kit products:", error);
    return NextResponse.json([], { status: 500 });
  }
}
