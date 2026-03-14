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

  function slugify(text: string) {
    return text
      .toString()
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9\-]/g, '')
      .replace(/\-+/g, '-');
  }

  try {
    const { name, slug, description, image, icon, color, sortOrder, isActive, parentId, isKitCategory } = await request.json();
    // If slug is missing or empty, generate from name
    const finalSlug = slug && slug.trim() ? slug : slugify(name);
    // Check for existing slug
    const existing = await prisma.category.findUnique({ where: { slug: finalSlug } });
    if (existing) {
      return NextResponse.json({ error: "A category with this slug already exists." }, { status: 409 });
    }
    const category = await prisma.category.create({
      data: {
        name,
        slug: finalSlug,
        description: description || null,
        image: image || null,
        icon: icon || null,
        color: color || "#2D2B7F",
        sortOrder: sortOrder || 0,
        isActive: isActive !== undefined ? isActive : true,
        parent: parentId ? { connect: { id: parentId } } : undefined,
        isKitCategory: isKitCategory === true,
      },
    });
    return NextResponse.json(category, { status: 201 });
  } catch (error: any) {
    // Handle Prisma unique constraint error for slug
    if (error?.code === 'P2002' && error?.meta?.target?.includes('slug')) {
      return NextResponse.json({ error: "A category with this slug already exists." }, { status: 409 });
    }
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
    const body = await request.json();
    const { id, deleteAll } = body;
    
    if (deleteAll) {
      await prisma.category.deleteMany({});
      return NextResponse.json({ success: true, message: "All categories deleted" });
    }
    
    // Delete children first (cascade manually for safety)
    await prisma.category.deleteMany({ where: { parentId: id } });
    await prisma.category.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to delete category" }, { status: 500 });
  }
}
