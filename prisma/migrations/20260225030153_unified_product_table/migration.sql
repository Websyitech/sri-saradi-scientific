-- Migration: Unified Product Table
-- Merges Product + ProductSku + SolarbioProduct into a single Product table

-- =============================================
-- 1. Drop foreign keys that will be removed
-- =============================================
ALTER TABLE "product_skus" DROP CONSTRAINT "product_skus_productId_fkey";
ALTER TABLE "solarbio_products" DROP CONSTRAINT "solarbio_products_categoryId_fkey";

-- =============================================
-- 2. Rename productNumber → catalogNumber
-- =============================================
DROP INDEX "products_productNumber_key";
ALTER TABLE "products" RENAME COLUMN "productNumber" TO "catalogNumber";
CREATE UNIQUE INDEX "products_catalogNumber_key" ON "products"("catalogNumber");

-- =============================================
-- 3. Add all new columns to the products table
-- =============================================
ALTER TABLE "products"
ADD COLUMN     "abApplicationType" TEXT,
ADD COLUMN     "abCalculatedMw" TEXT,
ADD COLUMN     "abCloneType" TEXT,
ADD COLUMN     "abDilutionRatio" TEXT,
ADD COLUMN     "abGeneId" TEXT,
ADD COLUMN     "abHost" TEXT,
ADD COLUMN     "abImmunogen" TEXT,
ADD COLUMN     "abIsotype" TEXT,
ADD COLUMN     "abPurification" TEXT,
ADD COLUMN     "abReactivity" TEXT,
ADD COLUMN     "abStorageBuffer" TEXT,
ADD COLUMN     "abSubcellularLocation" TEXT,
ADD COLUMN     "abSwissProt" TEXT,
ADD COLUMN     "abTarget" TEXT,
ADD COLUMN     "abType" TEXT,
ADD COLUMN     "applications" TEXT,
ADD COLUMN     "brand" TEXT,
ADD COLUMN     "casNumber" TEXT,
ADD COLUMN     "elisaChineseName" TEXT,
ADD COLUMN     "elisaDetectionRange" TEXT,
ADD COLUMN     "elisaReactivity" TEXT,
ADD COLUMN     "elisaSampleType" TEXT,
ADD COLUMN     "elisaSensitivity" TEXT,
ADD COLUMN     "histoPrimaryCategory" TEXT,
ADD COLUMN     "mediaExpiry" TEXT,
ADD COLUMN     "packSize" TEXT,
ADD COLUMN     "price" DECIMAL(65,30) DEFAULT 0,
ADD COLUMN     "primaryCategory" TEXT,
ADD COLUMN     "productLine" TEXT,
ADD COLUMN     "purity" TEXT,
ADD COLUMN     "section" TEXT,
ADD COLUMN     "sku" TEXT,
ADD COLUMN     "solarbioCategoryId" TEXT,
ADD COLUMN     "storage" TEXT,
ADD COLUMN     "subCategory" TEXT,
ADD COLUMN     "unit" TEXT;

-- =============================================
-- 4. Migrate SolarbioProduct data into products
-- =============================================
INSERT INTO "products" ("id", "catalogNumber", "name", "size", "image", "section", "solarbioCategoryId", "brand", "productLine", "sortOrder", "isActive", "isFeatured", "createdAt", "updatedAt")
SELECT
  "id",
  "catNumber",
  "name",
  "size",
  "image",
  "section",
  "categoryId",
  'Solarbio',
  'Solarbio Life Sciences',
  "sortOrder",
  "isActive",
  false,
  "createdAt",
  "updatedAt"
FROM "solarbio_products";

-- =============================================
-- 5. Migrate best SKU data into existing products
--    (take lowest-priced active SKU per product)
-- =============================================
UPDATE "products" p
SET
  "sku" = s."sku",
  "packSize" = s."packSize",
  "price" = s."price"
FROM (
  SELECT DISTINCT ON ("productId") *
  FROM "product_skus"
  WHERE "isActive" = true
  ORDER BY "productId", "price" ASC
) s
WHERE p."id" = s."productId";

-- =============================================
-- 6. Drop old tables
-- =============================================
DROP TABLE "product_skus";
DROP TABLE "solarbio_products";

-- =============================================
-- 7. Add foreign key for solarbioCategoryId
-- =============================================
ALTER TABLE "products" ADD CONSTRAINT "products_solarbioCategoryId_fkey" FOREIGN KEY ("solarbioCategoryId") REFERENCES "solarbio_categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;
