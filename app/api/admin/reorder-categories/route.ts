import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";

export async function POST(request: Request) {
  try {
    // Find Solarbio parent
    const solarbio = await prisma.category.findFirst({
      where: { slug: "solarbio" }
    });

    if (!solarbio) {
      return NextResponse.json(
        { error: "Solarbio not found" },
        { status: 404 }
      );
    }

    // Find Analytical Standards
    const analyticalStandards = await prisma.category.findFirst({
      where: { slug: "analytical-standards", parentId: solarbio.id }
    });

    if (!analyticalStandards) {
      return NextResponse.json(
        { error: "Analytical Standards not found" },
        { status: 404 }
      );
    }

    // Get all children of Solarbio sorted by current sort order
    const allChildren = await prisma.category.findMany({
      where: { parentId: solarbio.id },
      orderBy: { sortOrder: "asc" }
    });

    // Create new sort order with Analytical Standards first
    let newSortOrder = 0;
    for (const child of allChildren) {
      if (child.id === analyticalStandards.id) {
        await prisma.category.update({
          where: { id: child.id },
          data: { sortOrder: 0 }
        });
        newSortOrder = 1;
      } else {
        await prisma.category.update({
          where: { id: child.id },
          data: { sortOrder: newSortOrder }
        });
        newSortOrder++;
      }
    }

    return NextResponse.json(
      { message: "✓ Analytical Standards is now first" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error reordering categories:", error);
    return NextResponse.json(
      { error: "Failed to reorder categories" },
      { status: 500 }
    );
  }
}
