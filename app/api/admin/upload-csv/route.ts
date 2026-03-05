import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    if (!file.name.endsWith(".csv")) {
      return NextResponse.json({ error: "Only CSV files are supported" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const csvText = new TextDecoder().decode(bytes);

    const lines = csvText.split("\n").filter((line) => line.trim());
    if (lines.length < 2) {
      return NextResponse.json({ error: "CSV file is empty or invalid" }, { status: 400 });
    }

    // Detect delimiter (comma or tab)
    const firstLine = lines[0];
    const delimiter = firstLine.includes("\t") ? "\t" : ",";

    const headers = parseCSVLine(firstLine, delimiter).map((h) => h.trim());
    const records: Record<string, string>[] = [];

    for (let i = 1; i < lines.length; i++) {
      const values = parseCSVLine(lines[i], delimiter).map((v) => v.trim());
      const record: Record<string, string> = {};

      headers.forEach((header, idx) => {
        record[header] = values[idx] || "";
      });

      records.push(record);
    }

    const importedCount = await importProductsFromCSV(records);

    return NextResponse.json({
      success: true,
      recordCount: records.length,
      importedCount,
      headers,
    });
  } catch (error) {
    console.error("CSV upload failed:", error);
    return NextResponse.json(
      { error: "CSV upload failed: " + String(error) },
      { status: 500 }
    );
  }
}

function parseCSVLine(line: string, delimiter: string): string[] {
  const result: string[] = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    const nextChar = line[i + 1];

    if (char === '"') {
      if (inQuotes && nextChar === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === delimiter && !inQuotes) {
      result.push(current);
      current = "";
    } else {
      current += char;
    }
  }

  result.push(current);
  return result;
}

async function importProductsFromCSV(records: Record<string, string>[]) {
  let importedCount = 0;
  const BATCH_SIZE = 30;
  const BATCH_DELAY = 1000;

  for (let batchStart = 0; batchStart < records.length; batchStart += BATCH_SIZE) {
    const batchEnd = Math.min(batchStart + BATCH_SIZE, records.length);
    const batch = records.slice(batchStart, batchEnd);

    const batchPromises = batch.map(async (record) => {
      try {
        const catalogNumber = record.catalogNumber?.trim();
        if (!catalogNumber) return false;

        const productData = {
          catalogNumber,
          name: record.name?.trim() || "Unnamed Product",
          description: record.description?.trim() || null,
          brand: record.brand?.trim() || null,
          productLine: record.productLine?.trim() || null,
          manufacturer: record.manufacturer?.trim() || null,
          categoryId: record.categoryId?.trim() || null,
          primaryCategory: record.primaryCategory?.trim() || null,
          subCategory: record.subCategory?.trim() || null,
          applications: record.applications?.trim() || null,
          section: record.section?.trim() || null,
          casNumber: record.casNumber?.trim() || null,
          purity: record.purity?.trim() || null,
          storage: record.storage?.trim() || null,
          material: record.material?.trim() || null,
          volume: record.volume?.trim() || null,
          needleShape: record.needleShape?.trim() || null,
          size: record.size?.trim() || null,
          image: record.image?.trim() || null,
          abType: record.abType?.trim() || null,
          abHost: record.abHost?.trim() || null,
          abReactivity: record.abReactivity?.trim() || null,
          abTarget: record.abTarget?.trim() || null,
          abCloneType: record.abCloneType?.trim() || null,
          abIsotype: record.abIsotype?.trim() || null,
          abImmunogen: record.abImmunogen?.trim() || null,
          abCalculatedMw: record.abCalculatedMw?.trim() || null,
          abPurification: record.abPurification?.trim() || null,
          abStorageBuffer: record.abStorageBuffer?.trim() || null,
          abGeneId: record.abGeneId?.trim() || null,
          abSubcellularLocation: record.abSubcellularLocation?.trim() || null,
          abSwissProt: record.abSwissProt?.trim() || null,
          abDilutionRatio: record.abDilutionRatio?.trim() || null,
          abApplicationType: record.abApplicationType?.trim() || null,
          elisaDetectionRange: record.elisaDetectionRange?.trim() || null,
          elisaSensitivity: record.elisaSensitivity?.trim() || null,
          elisaReactivity: record.elisaReactivity?.trim() || null,
          elisaSampleType: record.elisaSampleType?.trim() || null,
          elisaChineseName: record.elisaChineseName?.trim() || null,
          mediaExpiry: record.mediaExpiry?.trim() || null,
          histoPrimaryCategory: record.histoPrimaryCategory?.trim() || null,
          isFeatured: record.isFeatured?.toLowerCase() === "true",
          isActive: record.isActive?.toLowerCase() !== "false",
          sortOrder: parseInt(record.sortOrder || "0") || 0,
        };

        await prisma.product.upsert({
          where: { catalogNumber },
          update: productData,
          create: productData,
        });

        return true;
      } catch (err) {
        console.error(`Failed to import product:`, err);
        return false;
      }
    });

    const batchResults = await Promise.all(batchPromises);
    importedCount += batchResults.filter(Boolean).length;

    if (batchEnd < records.length) {
      await new Promise((resolve) => setTimeout(resolve, BATCH_DELAY));
    }
  }

  return importedCount;
}
