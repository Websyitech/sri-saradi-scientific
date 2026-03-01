import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";
import { adminAuth } from "@/app/lib/adminAuth";

export async function GET(request: NextRequest) {
  const auth = adminAuth(request);
  if (auth instanceof NextResponse) return auth;

  try {
    const url = new URL(request.url);
    const flat = url.searchParams.get("flat");

    if (flat === "true") {
      // Flat list of all categories (useful for parent dropdown)
      const categories = await prisma.category.findMany({
        orderBy: { sortOrder: "asc" },
        include: { _count: { select: { products: true, children: true } } },
      });
      return NextResponse.json(categories);
    }

    // Hierarchical: only top-level (parentId = null), with nested children 3 levels deep
    const categories = await prisma.category.findMany({
      where: { parentId: null },
      orderBy: { sortOrder: "asc" },
      include: {
        _count: { select: { products: true, children: true } },
        children: {
          orderBy: { sortOrder: "asc" },
          include: {
            _count: { select: { products: true, children: true } },
            children: {
              orderBy: { sortOrder: "asc" },
              include: {
                _count: { select: { products: true, children: true } },
              },
            },
          },
        },
      },
    });
    return NextResponse.json(categories);
  } catch (error) {
    console.error("Categories API error:", error);
    return NextResponse.json({ error: "Failed to fetch categories", details: String(error) }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const auth = adminAuth(request);
  if (auth instanceof NextResponse) return auth;

  try {
    const { name, slug, description, image, icon, color, sortOrder, isActive, isFeatured, parentId } = await request.json();
    const category = await prisma.category.create({
      data: {
        name,
        slug,
        description: description || null,
        image: image || null,
        icon: icon || null,
        color: color || "#2D2B7F",
        sortOrder: sortOrder || 0,
        isActive: isActive !== undefined ? isActive : true,
        isFeatured: isFeatured !== undefined ? isFeatured : false,
        parentId: parentId || null,
      },
    });
    return NextResponse.json(category, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to create category" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  const auth = adminAuth(request);
  if (auth instanceof NextResponse) return auth;

  try {
    const { id, ...data } = await request.json();
    // Clean up parentId
    if (data.parentId === "") data.parentId = null;
    // Ensure isFeatured is properly set
    if (data.isFeatured === undefined) data.isFeatured = false;
    const category = await prisma.category.update({ where: { id }, data });
    return NextResponse.json(category);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to update category" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const auth = adminAuth(request);
  if (auth instanceof NextResponse) return auth;

  try {
    const { id } = await request.json();
    // Delete children first (cascade manually for safety)
    await prisma.category.deleteMany({ where: { parentId: id } });
    await prisma.category.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to delete category" }, { status: 500 });
  }
}
