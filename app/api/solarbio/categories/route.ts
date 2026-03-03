import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";

// Public API - returns all Solarbio sub-categories from the Category tree
export async function GET() {
  try {
    // Find the Solarbio parent category and fetch all active children
    const solarbioParent = await prisma.category.findFirst({
      where: { slug: "solarbio", isActive: true },
      include: {
        children: {
          where: { isActive: true },
          orderBy: { sortOrder: "asc" },
          include: {
            _count: {
              select: { products: true },
            },
          },
        },
      },
    });

    if (!solarbioParent || !solarbioParent.children.length) {
      return NextResponse.json([]);
    }

    const result = solarbioParent.children.map((child) => ({
      id: child.id,
      name: child.name,
      slug: child.slug,
      image: child.image,
      description: child.description,
      icon: child.icon,
      color: child.color || "#2D2B7F",
      count: child._count.products,
    }));

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error fetching Solarbio categories:", error);
    return NextResponse.json([]);
  }
}
