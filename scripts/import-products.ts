/**
 * Bulk import products from "Unified Product Catalog.csv"
 *
 * This script:
 *  1. Reads & parses the CSV (proper quoting)
 *  2. Creates Category records for each unique primary_category
 *     - Solarbio-branded products → sub-categories under "Solarbio Life Sciences" parent
 *     - Non-Solarbio products → top-level categories
 *  3. Groups rows by catalog_number → product-level fields + variants array
 *  4. Clears existing products & variants, then bulk-inserts in batches
 *
 * Usage:
 *   npx tsx scripts/import-products.ts
 */

import { parse } from "csv-parse/sync";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import { PrismaClient } from "../app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

// Load .env from project root
dotenv.config({ path: path.resolve(__dirname, "..", ".env") });

// ── Setup Prisma ──
// Use DIRECT_DATABASE_URL from env, but allow override via IMPORT_DATABASE_URL
const connectionString = process.env.IMPORT_DATABASE_URL || process.env.DIRECT_DATABASE_URL || process.env.DATABASE_URL!;
console.log(`🔗 DB connection: ${connectionString.replace(/\/\/.*@/, '//***@')}`);
const pool = new pg.Pool({
  connectionString,
  max: 3,
  ssl: false,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 30000,
});
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter } as never);

// ── CSV column → Prisma field mapping ──
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
  // Antibody fields
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
  // ELISA fields
  elisaDetectionRange: string | null;
  elisaSensitivity: string | null;
  elisaReactivity: string | null;
  elisaSampleType: string | null;
  elisaChineseName: string | null;
  // Other
  mediaExpiry: string | null;
  histoPrimaryCategory: string | null;
  // Meta
  categorySlug: string | null; // resolved later to categoryId
  variants: { sku: string | null; packSize: string | null; price: number }[];
}

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

// Category icon/color mapping for well-known primary categories
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

async function main() {
  const csvPath = path.resolve(__dirname, "..", "Unified Product Catalog.csv");
  console.log(`📖 Reading CSV from: ${csvPath}`);

  if (!fs.existsSync(csvPath)) {
    throw new Error(`CSV file not found at ${csvPath}`);
  }

  const csvContent = fs.readFileSync(csvPath, "utf-8");
  console.log(`📊 Parsing CSV...`);

  const rows: CsvRow[] = parse(csvContent, {
    columns: true,
    skip_empty_lines: true,
    trim: true,
    relax_column_count: true,
  });

  console.log(`   Total rows: ${rows.length}`);

  // ── Step 1: Group rows by catalog_number ──
  console.log(`\n🔄 Grouping rows by catalog_number...`);
  const productMap = new Map<string, GroupedProduct>();

  for (const row of rows) {
    const catNum = row.catalog_number?.trim();
    if (!catNum) continue;

    if (!productMap.has(catNum)) {
      const primaryCat = str(row.primary_category);
      const brand = str(row.brand);

      productMap.set(catNum, {
        catalogNumber: catNum,
        name: row.product_name?.trim() || catNum,
        description: str(row.description),
        productLine: str(row.product_line),
        brand,
        primaryCategory: primaryCat,
        subCategory: str(row.sub_category),
        applications: str(row.applications),
        casNumber: str(row.cas_number),
        storage: str(row.storage),
        purity: str(row.purity),
        // Antibody
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
        // ELISA
        elisaDetectionRange: str(row.elisa_detection_range),
        elisaSensitivity: str(row.elisa_sensitivity),
        elisaReactivity: str(row.elisa_reactivity),
        elisaSampleType: str(row.elisa_sample_type),
        elisaChineseName: str(row.elisa_chinese_name),
        // Other
        mediaExpiry: str(row.media_expiry),
        histoPrimaryCategory: str(row.histo_primary_category),
        // Category
        categorySlug: primaryCat ? slugify(primaryCat) : null,
        variants: [],
      });
    }

    // Add variant (each row = one pack size variant)
    const product = productMap.get(catNum)!;
    const sku = str(row.sku);
    const packSize = str(row.pack_size);
    const priceVal = parseFloat(row.price?.trim() || "0") || 0;

    // Only add if variant has meaningful data (sku or packSize)
    if (sku || packSize) {
      // Avoid duplicate variants (same sku+packSize)
      const isDuplicate = product.variants.some(
        (v) => v.sku === sku && v.packSize === packSize
      );
      if (!isDuplicate) {
        product.variants.push({ sku, packSize, price: priceVal });
      }
    }
  }

  const products = Array.from(productMap.values());
  console.log(`   Unique products: ${products.length}`);
  console.log(`   Total variants: ${products.reduce((sum, p) => sum + p.variants.length, 0)}`);

  // ── Step 2: Collect unique primary categories ──
  const uniqueCategories = new Set<string>();
  for (const p of products) {
    if (p.primaryCategory) {
      uniqueCategories.add(p.primaryCategory);
    }
  }
  console.log(`\n📁 Unique primary categories: ${uniqueCategories.size}`);
  for (const c of Array.from(uniqueCategories).sort()) {
    console.log(`   - ${c}`);
  }

  // ── Step 3: Clear existing data ──
  console.log(`\n🗑️  Clearing existing products & variants...`);
  await prisma.productVariant.deleteMany({});
  await prisma.product.deleteMany({});
  console.log(`   Cleared.`);

  // ── Step 4: Create/upsert categories ──
  console.log(`\n📂 Creating categories...`);

  // Find or create the Solarbio Life Sciences parent
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
    console.log(`   Created parent: Solarbio Life Sciences`);
  }

  // Create category records — all as sub-categories of Solarbio (since nearly all products are Solarbio branded)
  const categoryIdMap = new Map<string, string>(); // slug → id

  let sortIdx = 0;
  for (const catName of Array.from(uniqueCategories).sort()) {
    sortIdx++;
    const slug = slugify(catName);
    const solarbioSlug = `solarbio-${slug}`;
    const meta = CATEGORY_META[catName] || { icon: "FaFlask", color: "#2D2B7F" };

    // Check if category already exists (may have been created by seed)
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
      console.log(`   Created: ${catName} (under Solarbio)`);
    } else {
      console.log(`   Exists:  ${catName} → ${existing.slug}`);
    }

    categoryIdMap.set(slug, existing.id);
  }

  // ── Step 5: Bulk insert products in batches ──
  const BATCH_SIZE = 500;
  const totalProducts = products.length;
  let inserted = 0;
  let variantCount = 0;

  console.log(`\n📦 Inserting ${totalProducts} products in batches of ${BATCH_SIZE}...`);

  for (let i = 0; i < totalProducts; i += BATCH_SIZE) {
    const batch = products.slice(i, i + BATCH_SIZE);

    // Use individual creates with nested variants (Prisma doesn't support createMany with nested relations)
    // But we can do createMany for products then createMany for variants separately

    // First, bulk create products
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
      categoryId: p.categorySlug ? categoryIdMap.get(p.categorySlug) || null : null,
      isActive: true,
      isFeatured: false,
      sortOrder: 0,
    }));

    await prisma.product.createMany({
      data: productCreateData,
      skipDuplicates: true,
    });

    // Now fetch the created products to get their IDs (for variant linking)
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
    const variantCreateData: {
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
        variantCreateData.push({
          productId,
          sku: v.sku,
          packSize: v.packSize,
          price: v.price,
          sortOrder: vi,
        });
      }
    }

    if (variantCreateData.length > 0) {
      await prisma.productVariant.createMany({
        data: variantCreateData,
      });
      variantCount += variantCreateData.length;
    }

    inserted += batch.length;
    const pct = ((inserted / totalProducts) * 100).toFixed(1);
    process.stdout.write(`\r   Progress: ${inserted}/${totalProducts} products (${pct}%) | ${variantCount} variants`);
  }

  console.log(`\n\n✅ Import complete!`);
  console.log(`   Products: ${inserted}`);
  console.log(`   Variants: ${variantCount}`);
  console.log(`   Categories: ${categoryIdMap.size}`);

  // ── Step 6: Quick verification ──
  const totalInDb = await prisma.product.count();
  const totalVariantsInDb = await prisma.productVariant.count();
  const totalCatsInDb = await prisma.category.count();
  console.log(`\n📊 Database totals:`);
  console.log(`   Products:  ${totalInDb}`);
  console.log(`   Variants:  ${totalVariantsInDb}`);
  console.log(`   Categories: ${totalCatsInDb}`);

  await prisma.$disconnect();
  await pool.end();
  process.exit(0);
}

main().catch((err) => {
  console.error("\n❌ Import failed:", err);
  process.exit(1);
});
