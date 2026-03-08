import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";
import { registerImportProgress } from "@/app/api/admin/import-tracking-stream/route";

interface ImportRequest {
  data: Record<string, string>[];
  mapping: Record<string, string | null>;
  importId?: string;
}

const BATCH_SIZE = 200;

interface ProcessingItem {
  name: string;
  catalogNumber: string;
  status: "created" | "skipped" | "error";
  message?: string;
}

function createProgressStream(
  controller: ReadableStreamDefaultController<Uint8Array>,
  encoder: TextEncoder
) {
  return {
    sendProgress: (current: number, total: number, created: number, skipped: number, status: string, processingItems: ProcessingItem[] = [], errors: Array<{ row: number; message: string }> = []) => {
      const data = {
        type: "progress",
        current,
        total,
        created,
        skipped,
        status,
        processingItems,
        errors,
      };
      controller.enqueue(encoder.encode(JSON.stringify(data) + "\n"));
    },
    sendComplete: (created: number, skipped: number, errors: Array<{ row: number; message: string }>) => {
      const data = {
        type: "complete",
        created,
        skipped,
        errors,
      };
      controller.enqueue(encoder.encode(JSON.stringify(data) + "\n"));
    },
    sendError: (message: string) => {
      const data = {
        type: "error",
        message,
      };
      controller.enqueue(encoder.encode(JSON.stringify(data) + "\n"));
    },
  };
}

export async function POST(request: NextRequest) {
  const body: ImportRequest = await request.json();
  const { data, mapping, importId } = body;

  const productIdCol = Object.keys(mapping).find((col) => mapping[col] === "productId");
  const nameCol = Object.keys(mapping).find((col) => mapping[col] === "name");
  const catalogCol = Object.keys(mapping).find((col) => mapping[col] === "catalogNumber");
  const categoryIdCol = Object.keys(mapping).find((col) => mapping[col] === "categoryId");
  const categoryNameCol = Object.keys(mapping).find((col) => mapping[col] === "categoryName");

  console.log("=== IMPORT STARTED ===");
  console.log("Mapping:", mapping);
  console.log("Category ID Column:", categoryIdCol);
  console.log("Category Name Column:", categoryNameCol);
  console.log("First 3 rows:", data.slice(0, 3));

  const readable = new ReadableStream<Uint8Array>({
    async start(controller) {
      const encoder = new TextEncoder();
      const stream = createProgressStream(controller, encoder);

      try {
      if (!data || !Array.isArray(data) || data.length === 0) {
        stream.sendError("No data provided");
        controller.close();
        return;
      }

      if (!productIdCol || !nameCol) {
        stream.sendError("Missing required column mappings (productId, name)");
        controller.close();
        return;
      }

      const errors: Array<{ row: number; message: string }> = [];
      let created = 0;
      let skipped = 0;
      let existingProductIds: Set<string>;

      try {
        stream.sendProgress(0, data.length, 0, 0, "📦 Loading existing products from database...");
        
        const existingProducts = await prisma.product.findMany({
          select: { id: true },
        });

        existingProductIds = new Set(existingProducts.map((p) => p.id));
        stream.sendProgress(0, data.length, 0, 0, `✓ Loaded ${existingProducts.length} existing products`);

        stream.sendProgress(0, data.length, 0, 0, "🚀 Starting batch import process...");
        await new Promise((resolve) => setTimeout(resolve, 500));
      } catch (initErr) {
        console.error("Initialization error:", initErr);
        stream.sendError(`Initialization failed: ${initErr instanceof Error ? initErr.message : "Unknown error"}`);
        controller.close();
        return;
      }

      for (let batchStart = 0; batchStart < data.length; batchStart += BATCH_SIZE) {
        const batchEnd = Math.min(batchStart + BATCH_SIZE, data.length);
        const batchData = data.slice(batchStart, batchEnd);
        const processingItems: ProcessingItem[] = [];

        for (let i = 0; i < batchData.length; i++) {
          const row = batchData[i];
          const rowNumber = batchStart + i + 2;

          try {
            const productIdFromFile = row[productIdCol]?.trim();
            const name = row[nameCol]?.trim();
            const catalogNumber = catalogCol ? row[catalogCol]?.trim() : undefined;
            const sku = row[Object.keys(mapping).find((col) => mapping[col] === "sku") || ""]?.trim();

            if (i < 3) {
              console.log(`\n--- Row ${rowNumber} ---`);
              console.log("Full row data:", row);
              console.log("Available columns:", Object.keys(row));
            }

            if (!productIdFromFile || !name) {
              const missingFields = [];
              if (!productIdFromFile) missingFields.push("productId");
              if (!name) missingFields.push("name");
              const errorMsg = `Missing required field(s): ${missingFields.join(", ")}`;
              errors.push({ row: rowNumber, message: errorMsg });
              skipped++;
              if (processingItems.length < 5) {
                if (productIdFromFile || name) {
                  processingItems.push({
                    name: name || productIdFromFile || "",
                    catalogNumber: productIdFromFile || name || "",
                    status: "error",
                    message: errorMsg,
                  });
                }
              }
              console.log(`Row ${rowNumber} skipped: ${errorMsg}`);
              continue;
            }

            const isExistingProduct = existingProductIds.has(productIdFromFile);

            const categoryIdCol = Object.keys(mapping).find((col) => mapping[col] === "categoryId");
            const categoryNameCol = Object.keys(mapping).find((col) => mapping[col] === "categoryName");
            
            const categoryId = categoryIdCol ? row[categoryIdCol]?.trim() : undefined;
            const description = row[Object.keys(mapping).find((col) => mapping[col] === "description") || ""]?.trim();
            const categoryName = categoryNameCol ? row[categoryNameCol]?.trim() : undefined;

            if (i < 3) {
              console.log(`categoryIdCol: "${categoryIdCol}", value: "${categoryId}"`);
              console.log(`categoryNameCol: "${categoryNameCol}", value: "${categoryName}"`);
            }
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
            const packSize = row[Object.keys(mapping).find((col) => mapping[col] === "packSize") || ""]?.trim();
            const price = row[Object.keys(mapping).find((col) => mapping[col] === "price") || ""]?.trim();
            const productLine = row[Object.keys(mapping).find((col) => mapping[col] === "productLine") || ""]?.trim();
            const primaryCategory = row[Object.keys(mapping).find((col) => mapping[col] === "primaryCategory") || ""]?.trim();
            const subCategory = row[Object.keys(mapping).find((col) => mapping[col] === "subCategory") || ""]?.trim();
            const applications = row[Object.keys(mapping).find((col) => mapping[col] === "applications") || ""]?.trim();
            const needleShape = row[Object.keys(mapping).find((col) => mapping[col] === "needleShape") || ""]?.trim();
            const abType = row[Object.keys(mapping).find((col) => mapping[col] === "abType") || ""]?.trim();
            const abHost = row[Object.keys(mapping).find((col) => mapping[col] === "abHost") || ""]?.trim();
            const abTarget = row[Object.keys(mapping).find((col) => mapping[col] === "abTarget") || ""]?.trim();
            const abCloneType = row[Object.keys(mapping).find((col) => mapping[col] === "abCloneType") || ""]?.trim();
            const abIsotype = row[Object.keys(mapping).find((col) => mapping[col] === "abIsotype") || ""]?.trim();
            const abImmunogen = row[Object.keys(mapping).find((col) => mapping[col] === "abImmunogen") || ""]?.trim();
            const abCalculatedMw = row[Object.keys(mapping).find((col) => mapping[col] === "abCalculatedMw") || ""]?.trim();
            const abPurification = row[Object.keys(mapping).find((col) => mapping[col] === "abPurification") || ""]?.trim();
            const abStorageBuffer = row[Object.keys(mapping).find((col) => mapping[col] === "abStorageBuffer") || ""]?.trim();
            const abGeneId = row[Object.keys(mapping).find((col) => mapping[col] === "abGeneId") || ""]?.trim();
            const abSubcellularLocation = row[Object.keys(mapping).find((col) => mapping[col] === "abSubcellularLocation") || ""]?.trim();
            const abSwissProt = row[Object.keys(mapping).find((col) => mapping[col] === "abSwissProt") || ""]?.trim();
            const abDilutionRatio = row[Object.keys(mapping).find((col) => mapping[col] === "abDilutionRatio") || ""]?.trim();
            const abApplicationType = row[Object.keys(mapping).find((col) => mapping[col] === "abApplicationType") || ""]?.trim();
            const abReactivity = row[Object.keys(mapping).find((col) => mapping[col] === "abReactivity") || ""]?.trim();
            const elisaDetectionRange = row[Object.keys(mapping).find((col) => mapping[col] === "elisaDetectionRange") || ""]?.trim();
            const elisaSensitivity = row[Object.keys(mapping).find((col) => mapping[col] === "elisaSensitivity") || ""]?.trim();
            const elisaReactivity = row[Object.keys(mapping).find((col) => mapping[col] === "elisaReactivity") || ""]?.trim();
            const elisaSampleType = row[Object.keys(mapping).find((col) => mapping[col] === "elisaSampleType") || ""]?.trim();
            const elisaChineseName = row[Object.keys(mapping).find((col) => mapping[col] === "elisaChineseName") || ""]?.trim();
            const mediaExpiry = row[Object.keys(mapping).find((col) => mapping[col] === "mediaExpiry") || ""]?.trim();
            const histoPrimaryCategory = row[Object.keys(mapping).find((col) => mapping[col] === "histoPrimaryCategory") || ""]?.trim();

            let finalCategoryId: string | null = categoryId || null;

            if (!finalCategoryId && categoryName) {
              const foundCategory = await prisma.category.findFirst({
                where: {
                  name: { equals: categoryName, mode: "insensitive" },
                },
                select: { id: true },
              });

              if (foundCategory) {
                finalCategoryId = foundCategory.id;
                console.log(`Row ${rowNumber}: Category "${categoryName}" mapped to ID: ${finalCategoryId}`);
              } else {
                console.log(`Row ${rowNumber}: Category "${categoryName}" NOT FOUND in database`);
              }
            }

            if (categoryId) {
              console.log(`Row ${rowNumber}: Using direct categoryId from file: ${categoryId}`);
            }

            if (!isExistingProduct && !finalCategoryId && categoryName) {
              console.warn(`⚠️ Row ${rowNumber}: Category "${categoryName}" could not be mapped - will be created without category`);
            }

            try {
              const productData: any = {
                name,
                description: description || undefined,
                categoryId: finalCategoryId || undefined,
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
                productLine: productLine || undefined,
                primaryCategory: primaryCategory || undefined,
                subCategory: subCategory || undefined,
                applications: applications || undefined,
                needleShape: needleShape || undefined,
                abType: abType || undefined,
                abHost: abHost || undefined,
                abTarget: abTarget || undefined,
                abCloneType: abCloneType || undefined,
                abIsotype: abIsotype || undefined,
                abImmunogen: abImmunogen || undefined,
                abCalculatedMw: abCalculatedMw || undefined,
                abPurification: abPurification || undefined,
                abStorageBuffer: abStorageBuffer || undefined,
                abGeneId: abGeneId || undefined,
                abSubcellularLocation: abSubcellularLocation || undefined,
                abSwissProt: abSwissProt || undefined,
                abDilutionRatio: abDilutionRatio || undefined,
                abApplicationType: abApplicationType || undefined,
                abReactivity: abReactivity || undefined,
                elisaDetectionRange: elisaDetectionRange || undefined,
                elisaSensitivity: elisaSensitivity || undefined,
                elisaReactivity: elisaReactivity || undefined,
                elisaSampleType: elisaSampleType || undefined,
                elisaChineseName: elisaChineseName || undefined,
                mediaExpiry: mediaExpiry || undefined,
                histoPrimaryCategory: histoPrimaryCategory || undefined,
              };

              if (catalogNumber) {
                productData.catalogNumber = catalogNumber;
              }

              if (!isExistingProduct) {
                productData.id = productIdFromFile;
                productData.isActive = true;

                await prisma.product.create({
                  data: productData,
                });
                existingProductIds.add(productIdFromFile);
              } else {
                await prisma.product.update({
                  where: { id: productIdFromFile },
                  data: productData,
                });
              }

              if (sku || packSize || price) {
                try {
                  const existingVariant = await prisma.productVariant.findFirst({
                    where: {
                      productId: productIdFromFile,
                      sku: sku || undefined,
                    },
                    select: { id: true },
                  });

                  if (!existingVariant) {
                    await prisma.productVariant.create({
                      data: {
                        productId: productIdFromFile,
                        sku: sku || undefined,
                        packSize: packSize || undefined,
                        price: price ? parseFloat(price) : undefined,
                      },
                    });
                  }
                } catch (variantErr) {
                  console.warn(`Variant creation failed for row ${rowNumber}:`, variantErr);
                }
              }

              created++;
              if (processingItems.length < 5) {
                processingItems.push({
                  name,
                  catalogNumber: productIdFromFile,
                  status: "created",
                });
              }
            } catch (createErr) {
              const message = createErr instanceof Error ? createErr.message : "Unknown error";
              const fullErrorMsg = `Failed to create product: ${message}`;
              errors.push({ row: rowNumber, message: fullErrorMsg });
              skipped++;
              if (processingItems.length < 5) {
                processingItems.push({
                  name,
                  catalogNumber: productIdFromFile,
                  status: "error",
                  message: fullErrorMsg,
                });
              }
              console.error(`Row ${rowNumber} product creation failed: ${fullErrorMsg}`, createErr);
            }
          } catch (err) {
            const message = err instanceof Error ? err.message : "Unknown error";
            const fullErrorMsg = `Row processing error: ${message}`;
            errors.push({ row: rowNumber, message: fullErrorMsg });
            skipped++;
            console.error(`Row ${rowNumber} error: ${fullErrorMsg}`, err);
          }
        }

        const current = batchEnd;
        const percentage = Math.round((current / data.length) * 100);
        const currentBatch = Math.ceil(current / BATCH_SIZE);
        const totalBatches = Math.ceil(data.length / BATCH_SIZE);
        const etaTotalSeconds = Math.round((data.length - current) / BATCH_SIZE * 0.5);
        const etaMinutes = Math.floor(etaTotalSeconds / 60);
        const etaSeconds = etaTotalSeconds % 60;
        const etaDisplay = etaMinutes > 0 ? `${etaMinutes}m ${etaSeconds}s` : `${etaSeconds}s`;
        
        stream.sendProgress(
          current,
          data.length,
          created,
          skipped,
          `⚙️ Batch ${currentBatch}/${totalBatches} | Created: ${created} | Skipped: ${skipped} | ETA: ${etaDisplay}`,
          processingItems,
          errors
        );

        if (importId) {
          registerImportProgress(importId, current, data.length, created, skipped, `⚙️ Batch ${currentBatch}/${totalBatches} | Created: ${created} | Skipped: ${skipped}`, errors);
        }

        await new Promise((resolve) => setTimeout(resolve, 10));
      }

      stream.sendComplete(created, skipped, errors);
      controller.close();
      } catch (error) {
        console.error("Stream import error:", error);
        stream.sendError(error instanceof Error ? error.message : "Import failed");
        controller.close();
      }
    }
  });

  return new NextResponse(readable, {
    headers: {
      "Content-Type": "application/x-ndjson",
      "Cache-Control": "no-cache",
    },
  });
}
