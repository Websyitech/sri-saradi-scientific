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
      andConditions.push({ categoryId: category });
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
