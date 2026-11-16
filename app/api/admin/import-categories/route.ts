import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";

interface ImportRequest {
  data: Record<string, string>[];
  mapping: Record<string, string | null>;
}

export async function POST(request: NextRequest) {
  try {
    const body: ImportRequest = await request.json();
    const { data, mapping } = body;

    if (!data || !Array.isArray(data) || data.length === 0) {
      return NextResponse.json({ error: "No data provided" }, { status: 400 });
    }

    if (!mapping) {
      return NextResponse.json({ error: "No column mapping provided" }, { status: 400 });
    }

    const nameCol = Object.keys(mapping).find((col) => mapping[col] === "name");
    const slugCol = Object.keys(mapping).find((col) => mapping[col] === "slug");

    if (!nameCol || !slugCol) {
      return NextResponse.json(
        { error: "Missing required column mappings (name, slug)" },
        { status: 400 }
      );
    }

    const errors: Array<{ row: number; message: string }> = [];
    let created = 0;
    let skipped = 0;
    const categoryNameMap = new Map<string, string>();
    const parentCategories = new Map<string, string>();

    const allExistingCategories = await prisma.category.findMany({
      select: { id: true, name: true, slug: true },
    });

    allExistingCategories.forEach((cat) => {
      categoryNameMap.set(cat.name.toLowerCase(), cat.id);
    });

    for (let i = 0; i < data.length; i++) {
      const row = data[i];
      const rowNumber = i + 2;

      try {
        const name = row[nameCol]?.trim();
        const slug = row[slugCol]?.trim();
        const description = row[Object.keys(mapping).find((col) => mapping[col] === "description") || ""]?.trim();
        const icon = row[Object.keys(mapping).find((col) => mapping[col] === "icon") || ""]?.trim();
        const color = row[Object.keys(mapping).find((col) => mapping[col] === "color") || ""]?.trim();
        const parentName = row[Object.keys(mapping).find((col) => mapping[col] === "parentName") || ""]?.trim();

        if (!name || !slug) {
          errors.push({ row: rowNumber, message: "Missing name or slug" });
          skipped++;
          continue;
        }

        if (categoryNameMap.has(name.toLowerCase())) {
          skipped++;
          continue;
        }

        let parentId: string | null = null;

        if (parentName) {
          if (parentCategories.has(parentName.toLowerCase())) {
            parentId = parentCategories.get(parentName.toLowerCase()) || null;
          } else {
            const parentCat = await prisma.category.findFirst({
              where: {
                name: { equals: parentName, mode: "insensitive" },
              },
              select: { id: true },
            });

            if (parentCat) {
              parentId = parentCat.id;
              parentCategories.set(parentName.toLowerCase(), parentId);
            } else {
              errors.push({
                row: rowNumber,
                message: `Parent category "${parentName}" not found`,
              });
              skipped++;
              continue;
            }
          }
        }

        const newCategory = await prisma.category.create({
          data: {
            name,
            slug,
            description: description || undefined,
            icon: icon || undefined,
            color: color || "#2D2B7F",
            parentId,
            isActive: true,
            sortOrder: 0,
          },
        });

        categoryNameMap.set(name.toLowerCase(), newCategory.id);
        created++;
      } catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error";
        errors.push({ row: rowNumber, message });
        skipped++;
      }
    }

    return NextResponse.json({
      success: true,
      created,
      skipped,
      errors: errors.slice(0, 20),
    });
  } catch (error) {
    console.error("Import error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Import failed" },
      { status: 500 }
    );
  }
}
