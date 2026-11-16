import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";
import { adminAuth } from "@/app/lib/adminAuth";

export async function GET(request: NextRequest) {
  const auth = adminAuth(request);
  if (auth instanceof NextResponse) return auth;

  try {
    const products = await prisma.product.findMany({
      select: {
        id: true,
        catalogNumber: true,
        name: true,
        categoryId: true,
        category: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
      },
      orderBy: { catalogNumber: "asc" },
    });

    const categoryMap = new Map<string, { id: string; name: string; slug: string; count: number }>();

    for (const product of products) {
      if (product.categoryId && product.category) {
        const catId = product.categoryId;
        if (!categoryMap.has(catId)) {
          categoryMap.set(catId, {
            id: product.category.id,
            name: product.category.name,
            slug: product.category.slug,
            count: 0,
          });
        }
        const cat = categoryMap.get(catId)!;
        cat.count++;
      }
    }

    const categories = Array.from(categoryMap.values()).sort((a, b) => b.count - a.count);

    const csv = [
      "Category ID,Category Name,Category Slug,Product Count",
      ...categories.map((c) => `"${c.id}","${c.name}","${c.slug}",${c.count}`),
    ].join("\n");

    return new NextResponse(csv, {
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": "attachment; filename=category-mapping.csv",
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to export categories" }, { status: 500 });
  }
}
