import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";

interface GrandchildCategory {
  id: string;
  name: string;
  slug: string;
  color: string;
  image: string | null;
}

interface ChildCategory {
  id: string;
  name: string;
  slug: string;
  color: string;
  children: GrandchildCategory[];
}

interface HierarchicalCategory {
  id: string;
  name: string;
  slug: string;
  color: string;
  image: string | null;
  children: GrandchildCategory[];
}

export async function GET() {
  try {
    const solarbioParent = await prisma.category.findFirst({
      where: { slug: "solarbio", isActive: true },
      include: {
        children: {
          where: { isActive: true },
          orderBy: { sortOrder: "asc" },
          include: {
            children: {
              where: { isActive: true },
              orderBy: { sortOrder: "asc" },
            },
          },
        },
      },
    });

    if (!solarbioParent || !solarbioParent.children.length) {
      return NextResponse.json([]);
    }

    const result: HierarchicalCategory[] = solarbioParent.children.map((level2) => ({
      id: level2.id,
      name: level2.name,
      slug: level2.slug,
      color: level2.color || "#2D2B7F",
      image: level2.image || null,
      children: level2.children.map((level3) => ({
        id: level3.id,
        name: level3.name,
        slug: level3.slug,
        color: level3.color || "#2D2B7F",
        image: level3.image || null,
      })),
    }));

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error fetching hierarchical categories:", error);
    return NextResponse.json([]);
  }
}
