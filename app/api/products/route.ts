import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const offset = parseInt(searchParams.get("offset") || "0");
    const limit = parseInt(searchParams.get("limit") || "20");
    const search = searchParams.get("search") || "";
    const category = searchParams.get("category") || "";
    const brand = searchParams.get("brand") || "";
    const packSize = searchParams.get("packSize") || "";
    const abReactivity = searchParams.get("abReactivity") || "";
    const abTarget = searchParams.get("abTarget") || "";
    const applications = searchParams.get("applications") || "";
    const productLine = searchParams.get("productLine") || "";
    const subCategory = searchParams.get("subCategory") || "";

    const where: Record<string, unknown> = { isActive: true };
    const andConditions: Record<string, unknown>[] = [];

    if (search) {
      const searchTerms = search.trim().split(/\s+/).filter(term => term.length > 0);
      
      if (searchTerms.length > 0) {
        const orConditions = [];
        
        for (const term of searchTerms) {
          orConditions.push({
            OR: [
              { name: { contains: term, mode: "insensitive" } },
              { catalogNumber: { contains: term, mode: "insensitive" } },
              { description: { contains: term, mode: "insensitive" } },
            ],
          });
        }
        
        andConditions.push({
          AND: orConditions,
        });
      }
    }

    if (category) {
      // Handle single or multiple categories (comma-separated)
      const categoryValues = category.split(",").map((c) => c.trim()).filter(Boolean);
      
      if (categoryValues.length > 0) {
        // Try to find categories by slug first
        const foundCategories = await prisma.category.findMany({
          where: { slug: { in: categoryValues } },
          select: { id: true, children: { select: { id: true } } }
        });
        
        let categoryIds: string[] = [];
        
        // For each found category, include its ID and all child IDs
        foundCategories.forEach((cat) => {
          categoryIds.push(cat.id);
          categoryIds.push(...cat.children.map((child) => child.id));
        });
        
        // Add any IDs that were passed directly (for backward compatibility)
        categoryValues.forEach((val) => {
          if (!categoryIds.includes(val)) {
            categoryIds.push(val);
          }
        });
        
        // Remove duplicates
        categoryIds = [...new Set(categoryIds)];
        
        if (categoryIds.length > 0) {
          andConditions.push({ categoryId: { in: categoryIds } });
        }
      }
    }

    if (brand) {
      andConditions.push({
        OR: [
          { brand: { equals: brand, mode: "insensitive" } },
          { brand: null },
        ],
      });
    }

    if (abReactivity) {
      const values = abReactivity.split(",").map((v) => v.trim());
      andConditions.push({
        abReactivity: { in: values },
      });
    }

    if (abTarget) {
      const values = abTarget.split(",").map((v) => v.trim());
      andConditions.push({
        abTarget: { in: values },
      });
    }

    if (applications) {
      const values = applications.split(",").map((v) => v.trim());
      andConditions.push({
        applications: { in: values },
      });
    }

    if (productLine) {
      const values = productLine.split(",").map((v) => v.trim());
      andConditions.push({
        productLine: { in: values },
      });
    }

    if (subCategory) {
      const values = subCategory.split(",").map((v) => v.trim());
      andConditions.push({
        subCategory: { in: values },
      });
    }

    if (andConditions.length > 0) {
      where.AND = andConditions;
    }

    const products = await prisma.product.findMany({
      where,
      include: {
        category: true,
        variants: { orderBy: { sortOrder: "asc" }, where: { isActive: true } },
      },
      orderBy: { sortOrder: "asc" },
      skip: offset,
      take: limit,
    });

    // Filter by packSize if specified (since it's in variants)
    let filteredProducts = products;
    if (packSize) {
      const packSizes = packSize.split(",").map((v) => v.trim());
      filteredProducts = products.filter((p) =>
        p.variants.some((v) =>
          packSizes.includes(String(v.packSize))
        )
      );
    }

    const total = await prisma.product.count({ where });
    const page = Math.floor(offset / limit) + 1;

    return NextResponse.json({
      products: filteredProducts,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { products: [], total: 0, page: 1, totalPages: 0 },
      { status: 500 }
    );
  }
}
