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

    const catalogCol = Object.keys(mapping).find((col) => mapping[col] === "catalogNumber");
    const nameCol = Object.keys(mapping).find((col) => mapping[col] === "name");

    if (!catalogCol || !nameCol) {
      return NextResponse.json(
        { error: "Missing required column mappings (catalogNumber, name)" },
        { status: 400 }
      );
    }

    const errors: Array<{ row: number; message: string }> = [];
    let created = 0;
    let skipped = 0;

    const existingProducts = await prisma.product.findMany({
      select: { catalogNumber: true },
    });

    const existingCatalogNumbers = new Set(existingProducts.map((p) => p.catalogNumber));

    const categoryCache = new Map<string, string>();
    const allCategories = await prisma.category.findMany({
      select: { id: true, name: true },
    });

    allCategories.forEach((cat) => {
      categoryCache.set(cat.name.toLowerCase(), cat.id);
    });

    for (let i = 0; i < data.length; i++) {
      const row = data[i];
      const rowNumber = i + 2;

      try {
        const catalogNumber = row[catalogCol]?.trim();
        const name = row[nameCol]?.trim();

        if (!catalogNumber || !name) {
          errors.push({ row: rowNumber, message: "Missing catalogNumber or name" });
          skipped++;
          continue;
        }

        if (existingCatalogNumbers.has(catalogNumber)) {
          skipped++;
          continue;
        }

        const description = row[Object.keys(mapping).find((col) => mapping[col] === "description") || ""]?.trim();
        const categoryName = row[Object.keys(mapping).find((col) => mapping[col] === "categoryName") || ""]?.trim();
        const manufacturer = row[Object.keys(mapping).find((col) => mapping[col] === "manufacturer") || ""]?.trim();
        const material = row[Object.keys(mapping).find((col) => mapping[col] === "material") || ""]?.trim();
        const volume = row[Object.keys(mapping).find((col) => mapping[col] === "volume") || ""]?.trim();
        const size = row[Object.keys(mapping).find((col) => mapping[col] === "size") || ""]?.trim();
        const image = row[Object.keys(mapping).find((col) => mapping[col] === "image") || ""]?.trim();
        const brand = row[Object.keys(mapping).find((col) => mapping[col] === "brand") || ""]?.trim();
        const casNumber = row[Object.keys(mapping).find((col) => mapping[col] === "casNumber") || ""]?.trim();
        const storage = row[Object.keys(mapping).find((col) => mapping[col] === "storage") || ""]?.trim();
        const purity = row[Object.keys(mapping).find((col) => mapping[col] === "purity") || ""]?.trim();
        const section = row[Object.keys(mapping).find((col) => mapping[col] === "section") || ""]?.trim();
        const sku = row[Object.keys(mapping).find((col) => mapping[col] === "sku") || ""]?.trim();
        const packSize = row[Object.keys(mapping).find((col) => mapping[col] === "packSize") || ""]?.trim();
        const price = row[Object.keys(mapping).find((col) => mapping[col] === "price") || ""]?.trim();
        const abType = row[Object.keys(mapping).find((col) => mapping[col] === "abType") || ""]?.trim();
        const abHost = row[Object.keys(mapping).find((col) => mapping[col] === "abHost") || ""]?.trim();
        const abTarget = row[Object.keys(mapping).find((col) => mapping[col] === "abTarget") || ""]?.trim();

        let categoryId: string | null = null;

        if (categoryName) {
          const catId = categoryCache.get(categoryName.toLowerCase());
          if (catId) {
            categoryId = catId;
          } else {
            const foundCategory = await prisma.category.findFirst({
              where: {
                name: { equals: categoryName, mode: "insensitive" },
              },
              select: { id: true },
            });

            if (foundCategory) {
              categoryId = foundCategory.id;
              categoryCache.set(categoryName.toLowerCase(), foundCategory.id);
            }
          }
        }

        const productData: any = {
          catalogNumber,
          name,
          description: description || undefined,
          categoryId,
          manufacturer: manufacturer || undefined,
          material: material || undefined,
          volume: volume || undefined,
          size: size || undefined,
          image: image || undefined,
          brand: brand || undefined,
          casNumber: casNumber || undefined,
          storage: storage || undefined,
          purity: purity || undefined,
          section: section || undefined,
          abType: abType || undefined,
          abHost: abHost || undefined,
          abTarget: abTarget || undefined,
          isActive: true,
        };

        const newProduct = await prisma.product.create({
          data: productData,
        });

        if (sku && packSize && price) {
          await prisma.productVariant.create({
            data: {
              productId: newProduct.id,
              sku,
              packSize,
              price: parseFloat(price) || 0,
            },
          });
        }

        existingCatalogNumbers.add(catalogNumber);
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
