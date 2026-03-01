import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";
import { adminAuth } from "@/app/lib/adminAuth";

const productInclude = {
  category: true,
  variants: { orderBy: { sortOrder: "asc" as const } },
};

export async function GET(request: NextRequest) {
  const auth = adminAuth(request);
  if (auth instanceof NextResponse) return auth;

  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");
    const search = searchParams.get("search") || "";
    const categoryId = searchParams.get("categoryId") || "";
    const brand = searchParams.get("brand") || "";

    const where: Record<string, unknown> = {};
    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { catalogNumber: { contains: search, mode: "insensitive" } },
      ];
    }
    if (categoryId) where.categoryId = categoryId;
    if (brand) where.brand = brand;

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: "desc" },
        include: productInclude,
      }),
      prisma.product.count({ where }),
    ]);

    return NextResponse.json({ products, total, page, totalPages: Math.ceil(total / limit) });
  } catch {
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const auth = adminAuth(request);
  if (auth instanceof NextResponse) return auth;

  try {
    const { variants, ...data } = await request.json();
    const product = await prisma.product.create({
      data: {
        ...data,
        variants: variants && variants.length > 0
          ? { create: variants.map((v: Record<string, unknown>, i: number) => ({ ...v, sortOrder: i })) }
          : undefined,
      },
      include: productInclude,
    });
    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  const auth = adminAuth(request);
  if (auth instanceof NextResponse) return auth;

  try {
    const { id, variants, ...data } = await request.json();

    // Delete existing variants then re-create (simple upsert strategy)
    await prisma.productVariant.deleteMany({ where: { productId: id } });

    const product = await prisma.product.update({
      where: { id },
      data: {
        ...data,
        variants: variants && variants.length > 0
          ? { create: variants.map((v: Record<string, unknown>, i: number) => {
              // Strip client-side fields from variant data
              const { id: _vid, productId: _pid, createdAt: _ca, updatedAt: _ua, ...variantData } = v;
              return { ...variantData, sortOrder: i };
            })}
          : undefined,
      },
      include: productInclude,
    });
    return NextResponse.json(product);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to update product" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const auth = adminAuth(request);
  if (auth instanceof NextResponse) return auth;

  try {
    const { id } = await request.json();
    await prisma.product.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to delete product" }, { status: 500 });
  }
}
