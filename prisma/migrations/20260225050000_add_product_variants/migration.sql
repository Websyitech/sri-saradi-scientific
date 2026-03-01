-- CreateTable: product_variants
CREATE TABLE "product_variants" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "sku" TEXT,
    "packSize" TEXT,
    "price" DECIMAL(65,30) DEFAULT 0,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "product_variants_pkey" PRIMARY KEY ("id")
);

-- Migrate existing product data into product_variants
-- Only create a variant row if the product has at least one variant-level field populated
INSERT INTO "product_variants" ("id", "productId", "sku", "packSize", "price", "sortOrder", "isActive", "createdAt", "updatedAt")
SELECT
    gen_random_uuid()::text,
    "id",
    "sku",
    "packSize",
    "price",
    0,
    true,
    "createdAt",
    "updatedAt"
FROM "products"
WHERE "sku" IS NOT NULL
   OR "packSize" IS NOT NULL
   OR ("price" IS NOT NULL AND "price" > 0);

-- Drop only variant-level columns from products (keep casNumber, purity, storage on products)
ALTER TABLE "products" DROP COLUMN IF EXISTS "sku";
ALTER TABLE "products" DROP COLUMN IF EXISTS "packSize";
ALTER TABLE "products" DROP COLUMN IF EXISTS "unit";
ALTER TABLE "products" DROP COLUMN IF EXISTS "price";

-- CreateIndex
CREATE INDEX "product_variants_productId_idx" ON "product_variants"("productId");

-- AddForeignKey
ALTER TABLE "product_variants" ADD CONSTRAINT "product_variants_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;
