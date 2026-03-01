/**
 * POST /api/admin/import-products
 *
 * Batch-wise bulk import of products from "Unified Product Catalog.csv".
 *
 * Two-phase protocol:
 *
 *   Phase 1 — PREPARE  { action: "prepare" }
 *     Parses CSV, groups by catalog_number, clears DB, creates categories,
 *     caches grouped products in memory.
 *     Returns { totalProducts, totalVariants, categoriesCreated }
 *
 *   Phase 2 — BATCH    { action: "batch", offset: N, limit: 500 }
 *     Inserts products[offset..offset+limit] + their variants.
 *     Returns { inserted, variantsInserted, done }
 *
 * The admin page calls prepare once, then loops batch calls showing a progress bar.
 */

import { NextRequest, NextResponse } from "next/server";
import { adminAuth } from "@/app/lib/adminAuth";
import prisma from "@/app/lib/prisma";
import fs from "fs";
import path from "path";
import { parse } from "csv-parse/sync";

// ── Types ──

interface CsvRow {
  product_id: string;
  catalog_number: string;
  product_name: string;
  product_line: string;
  brand: string;
  primary_category: string;
  sub_category: string;
  applications: string;
  cas_number: string;
  storage: string;
  purity: string;
  description: string;
  sku: string;
  pack_size: string;
  unit: string;
  price: string;
  ab_type: string;
  ab_host: string;
  ab_reactivity: string;
  ab_target: string;
  ab_clone_type: string;
  ab_isotype: string;
  ab_immunogen: string;
  ab_calculated_mw: string;
  ab_purification: string;
  ab_storage_buffer: string;
  ab_gene_id: string;
  ab_subcellular_location: string;
  ab_swiss_prot: string;
  ab_dilution_ratio: string;
  ab_application_type: string;
  elisa_detection_range: string;
  elisa_sensitivity: string;
  elisa_reactivity: string;
  elisa_sample_type: string;
  elisa_chinese_name: string;
  media_expiry: string;
  histo_primary_category: string;
}

interface GroupedProduct {
  catalogNumber: string;
  name: string;
  description: string | null;
  productLine: string | null;
  brand: string | null;
  primaryCategory: string | null;
  subCategory: string | null;
  applications: string | null;
  casNumber: string | null;
  storage: string | null;
  purity: string | null;
  abType: string | null;
  abHost: string | null;
  abReactivity: string | null;
  abTarget: string | null;
  abCloneType: string | null;
  abIsotype: string | null;
  abImmunogen: string | null;
  abCalculatedMw: string | null;
  abPurification: string | null;
  abStorageBuffer: string | null;
  abGeneId: string | null;
  abSubcellularLocation: string | null;
  abSwissProt: string | null;
  abDilutionRatio: string | null;
  abApplicationType: string | null;
  elisaDetectionRange: string | null;
  elisaSensitivity: string | null;
  elisaReactivity: string | null;
  elisaSampleType: string | null;
  elisaChineseName: string | null;
  mediaExpiry: string | null;
  histoPrimaryCategory: string | null;
  categorySlug: string | null;
  variants: { sku: string | null; packSize: string | null; price: number }[];
}

// ── Helpers ──

function str(val: string | undefined): string | null {
  if (!val) return null;
  const trimmed = val.trim();
  return trimmed || null;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const CATEGORY_META: Record<string, { icon: string; color: string }> = {
  "Antibodies": { icon: "FaSyringe", color: "#7B1FA2" },
  "Biochemical Reagents": { icon: "FaFlask", color: "#E53935" },
  "Peptides": { icon: "FaFilter", color: "#4527A0" },
  "Analytical Reference Standards (General)": { icon: "FaMicroscope", color: "#6D4C41" },
  "ELISA Kits": { icon: "FaDna", color: "#00838F" },
  "Cell Culture Media": { icon: "GiChemicalDrop", color: "#2E7D32" },
  "Standard Solutions": { icon: "FaTint", color: "#0277BD" },
  "Cell Biology": { icon: "FaAtom", color: "#E65100" },
  "Protein & Immunity": { icon: "FaShieldAlt", color: "#AD1457" },
  "Molecular Biology": { icon: "GiMolecule", color: "#2E7D32" },
  "Biochemical Assay Kits": { icon: "FaVials", color: "#1565C0" },
  "Histological Staining": { icon: "FaPalette", color: "#6A1B9A" },
  "Natural Products & Phytochemicals": { icon: "FaLeaf", color: "#33691E" },
  "Amino Acids & Biochemical Reagents": { icon: "FaFlask", color: "#BF360C" },
  "Pesticides & Agrochemicals": { icon: "FaBug", color: "#827717" },
  "Antibiotics & Antimicrobials": { icon: "FaCapsules", color: "#C62828" },
  "Environmental Contaminants": { icon: "FaExclamationTriangle", color: "#F57F17" },
  "Food Additives & Contaminants": { icon: "FaUtensils", color: "#FF6F00" },
  "Vitamins & Nutritional Compounds": { icon: "FaCapsules", color: "#00695C" },
  "Pharmaceutical APIs & Metabolites": { icon: "FaPrescriptionBottleAlt", color: "#283593" },
  "Steroids & Hormones": { icon: "FaDna", color: "#880E4F" },
  "Veterinary Drugs": { icon: "FaPaw", color: "#4E342E" },
};

// ── In-memory cache for grouped products between prepare → batch calls ──
// Avoids re-parsing a 65 MB CSV on every batch call.
// Safe in single-server / dev environment.

let cachedProducts: GroupedProduct[] = [];
let cachedCategoryIdMap: Map<string, string> = new Map();
let cacheTimestamp = 0;
const CACHE_TTL_MS = 6 * 60 * 60 * 1000; // 6 hours

function isCacheValid(): boolean {
  return cachedProducts.length > 0 && Date.now() - cacheTimestamp < CACHE_TTL_MS;
}

// ── Main handler ──

export async function POST(request: NextRequest) {
  const auth = adminAuth(request);
  if (auth instanceof NextResponse) return auth;

  try {
    const body = await request.json().catch(() => ({}));
    const action: string = body.action || "prepare";

    if (action === "prepare") {
      const skipClear = body.skipClear === true;
      return await handlePrepare(skipClear);
    } else if (action === "batch") {
      const offset = Number(body.offset) || 0;
      const limit = Number(body.limit) || 500;
      return await handleBatch(offset, limit);
    } else {
      return NextResponse.json({ error: `Unknown action: ${action}` }, { status: 400 });
    }
  } catch (error) {
    console.error("Import failed:", error);
    return NextResponse.json(
      { error: "Import failed", details: String(error) },
      { status: 500 }
    );
  }
}

// ── Phase 1: PREPARE ──

async function handlePrepare(skipClear = false) {
  // 1. Read & parse CSV
  const csvPath = path.resolve(process.cwd(), "Unified Product Catalog.csv");
  if (!fs.existsSync(csvPath)) {
    return NextResponse.json(
      { error: `CSV file not found at ${csvPath}` },
      { status: 400 }
    );
  }

  const csvContent = fs.readFileSync(csvPath, "utf-8");
  const rows: CsvRow[] = parse(csvContent, {
    columns: true,
    skip_empty_lines: true,
    trim: true,
    relax_column_count: true,
  });

  // 2. Group rows by catalog_number
  const productMap = new Map<string, GroupedProduct>();

  for (const row of rows) {
    const catNum = row.catalog_number?.trim();
    if (!catNum) continue;

    if (!productMap.has(catNum)) {
      const primaryCat = str(row.primary_category);

      productMap.set(catNum, {
        catalogNumber: catNum,
        name: row.product_name?.trim() || catNum,
        description: str(row.description),
        productLine: str(row.product_line),
        brand: str(row.brand),
        primaryCategory: primaryCat,
        subCategory: str(row.sub_category),
        applications: str(row.applications),
        casNumber: str(row.cas_number),
        storage: str(row.storage),
        purity: str(row.purity),
        abType: str(row.ab_type),
        abHost: str(row.ab_host),
        abReactivity: str(row.ab_reactivity),
        abTarget: str(row.ab_target),
        abCloneType: str(row.ab_clone_type),
        abIsotype: str(row.ab_isotype),
        abImmunogen: str(row.ab_immunogen),
        abCalculatedMw: str(row.ab_calculated_mw),
        abPurification: str(row.ab_purification),
        abStorageBuffer: str(row.ab_storage_buffer),
        abGeneId: str(row.ab_gene_id),
        abSubcellularLocation: str(row.ab_subcellular_location),
        abSwissProt: str(row.ab_swiss_prot),
        abDilutionRatio: str(row.ab_dilution_ratio),
        abApplicationType: str(row.ab_application_type),
        elisaDetectionRange: str(row.elisa_detection_range),
        elisaSensitivity: str(row.elisa_sensitivity),
        elisaReactivity: str(row.elisa_reactivity),
        elisaSampleType: str(row.elisa_sample_type),
        elisaChineseName: str(row.elisa_chinese_name),
        mediaExpiry: str(row.media_expiry),
        histoPrimaryCategory: str(row.histo_primary_category),
        categorySlug: primaryCat ? slugify(primaryCat) : null,
        variants: [],
      });
    }

    // Add variant
    const product = productMap.get(catNum)!;
    const sku = str(row.sku);
    const packSize = str(row.pack_size);
    const priceVal = parseFloat(row.price?.trim() || "0") || 0;

    if (sku || packSize) {
      const isDuplicate = product.variants.some(
        (v) => v.sku === sku && v.packSize === packSize
      );
      if (!isDuplicate) {
        product.variants.push({ sku, packSize, price: priceVal });
      }
    }
  }

  const products = Array.from(productMap.values());
  const totalVariants = products.reduce((s, p) => s + p.variants.length, 0);

  // 3. Collect unique primary categories
  const uniqueCategories = new Set<string>();
  for (const p of products) {
    if (p.primaryCategory) uniqueCategories.add(p.primaryCategory);
  }

  // 4. Clear existing products & variants (unless skipClear is true for resume)
  if (!skipClear) {
    await prisma.productVariant.deleteMany({});
    await prisma.product.deleteMany({});
  }

  // 5. Create / upsert categories
  let solarbioParent = await prisma.category.findFirst({
    where: { slug: "solarbio" },
  });
  if (!solarbioParent) {
    solarbioParent = await prisma.category.create({
      data: {
        name: "Solarbio Life Sciences",
        slug: "solarbio",
        description: "Authorized distributors of Solarbio Life Science products",
        icon: "FaAtom",
        color: "#E53935",
        sortOrder: 10,
      },
    });
  }

  const categoryIdMap = new Map<string, string>();
  let sortIdx = 0;

  for (const catName of Array.from(uniqueCategories).sort()) {
    sortIdx++;
    const slug = slugify(catName);
    const solarbioSlug = `solarbio-${slug}`;
    const meta = CATEGORY_META[catName] || { icon: "FaFlask", color: "#2D2B7F" };

    let existing = await prisma.category.findFirst({
      where: { OR: [{ slug }, { slug: solarbioSlug }] },
    });

    if (!existing) {
      existing = await prisma.category.create({
        data: {
          name: catName,
          slug: solarbioSlug,
          icon: meta.icon,
          color: meta.color,
          sortOrder: sortIdx,
          parentId: solarbioParent.id,
        },
      });
    }

    categoryIdMap.set(slug, existing.id);
  }

  // 6. Cache in memory for batch calls
  cachedProducts = products;
  cachedCategoryIdMap = categoryIdMap;
  cacheTimestamp = Date.now();

  return NextResponse.json({
    success: true,
    phase: "prepare",
    totalProducts: products.length,
    totalVariants,
    csvRows: rows.length,
    categoriesCreated: categoryIdMap.size,
  });
}

// ── Phase 2: BATCH ──

async function handleBatch(offset: number, limit: number) {
  if (!isCacheValid()) {
    return NextResponse.json(
      { error: "Cache expired or not prepared. Call with action=prepare first." },
      { status: 400 }
    );
  }

  const total = cachedProducts.length;
  const end = Math.min(offset + limit, total);
  const batch = cachedProducts.slice(offset, end);

  if (batch.length === 0) {
    // Nothing left — return final stats
    const productsInDb = await prisma.product.count();
    const variantsInDb = await prisma.productVariant.count();
    const categoriesInDb = await prisma.category.count();

    cachedProducts = [];
    cachedCategoryIdMap = new Map();
    cacheTimestamp = 0;

    return NextResponse.json({
      success: true,
      phase: "batch",
      inserted: 0,
      variantsInserted: 0,
      done: true,
      stats: { productsInDb, variantsInDb, categoriesInDb },
    });
  }

  // Bulk create products
  const productCreateData = batch.map((p) => ({
    catalogNumber: p.catalogNumber,
    name: p.name,
    description: p.description,
    productLine: p.productLine,
    brand: p.brand,
    primaryCategory: p.primaryCategory,
    subCategory: p.subCategory,
    applications: p.applications,
    casNumber: p.casNumber,
    storage: p.storage,
    purity: p.purity,
    abType: p.abType,
    abHost: p.abHost,
    abReactivity: p.abReactivity,
    abTarget: p.abTarget,
    abCloneType: p.abCloneType,
    abIsotype: p.abIsotype,
    abImmunogen: p.abImmunogen,
    abCalculatedMw: p.abCalculatedMw,
    abPurification: p.abPurification,
    abStorageBuffer: p.abStorageBuffer,
    abGeneId: p.abGeneId,
    abSubcellularLocation: p.abSubcellularLocation,
    abSwissProt: p.abSwissProt,
    abDilutionRatio: p.abDilutionRatio,
    abApplicationType: p.abApplicationType,
    elisaDetectionRange: p.elisaDetectionRange,
    elisaSensitivity: p.elisaSensitivity,
    elisaReactivity: p.elisaReactivity,
    elisaSampleType: p.elisaSampleType,
    elisaChineseName: p.elisaChineseName,
    mediaExpiry: p.mediaExpiry,
    histoPrimaryCategory: p.histoPrimaryCategory,
    categoryId: p.categorySlug
      ? cachedCategoryIdMap.get(p.categorySlug) || null
      : null,
    isActive: true,
    isFeatured: false,
    sortOrder: 0,
  }));

  await prisma.product.createMany({
    data: productCreateData,
    skipDuplicates: true,
  });

  // Fetch IDs of created products for variant linking
  const catalogNumbers = batch.map((p) => p.catalogNumber);
  const createdProducts = await prisma.product.findMany({
    where: { catalogNumber: { in: catalogNumbers } },
    select: { id: true, catalogNumber: true },
  });

  const idLookup = new Map<string, string>();
  for (const cp of createdProducts) {
    idLookup.set(cp.catalogNumber, cp.id);
  }

  // Bulk create variants
  const variantData: {
    productId: string;
    sku: string | null;
    packSize: string | null;
    price: number;
    sortOrder: number;
  }[] = [];

  for (const p of batch) {
    const productId = idLookup.get(p.catalogNumber);
    if (!productId) continue;
    for (let vi = 0; vi < p.variants.length; vi++) {
      const v = p.variants[vi];
      variantData.push({
        productId,
        sku: v.sku,
        packSize: v.packSize,
        price: v.price,
        sortOrder: vi,
      });
    }
  }

  let variantsInserted = 0;
  if (variantData.length > 0) {
    await prisma.productVariant.createMany({ data: variantData });
    variantsInserted = variantData.length;
  }

  const done = end >= total;

  // If last batch, return final stats and clear cache
  if (done) {
    const productsInDb = await prisma.product.count();
    const variantsInDb = await prisma.productVariant.count();
    const categoriesInDb = await prisma.category.count();

    cachedProducts = [];
    cachedCategoryIdMap = new Map();
    cacheTimestamp = 0;

    return NextResponse.json({
      success: true,
      phase: "batch",
      inserted: batch.length,
      variantsInserted,
      done: true,
      stats: { productsInDb, variantsInDb, categoriesInDb },
    });
  }

  return NextResponse.json({
    success: true,
    phase: "batch",
    inserted: batch.length,
    variantsInserted,
    done: false,
  });
}
