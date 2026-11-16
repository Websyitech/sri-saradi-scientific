-- Merge SolarbioCategory into Category
-- Add hierarchy support (parentId, icon, color) to categories table
-- Remove solarbioCategoryId from products
-- Drop solarbio_categories table

-- Step 1: Add new columns to categories
ALTER TABLE "categories" ADD COLUMN "icon" TEXT;
ALTER TABLE "categories" ADD COLUMN "color" TEXT DEFAULT '#2D2B7F';
ALTER TABLE "categories" ADD COLUMN "parentId" TEXT;

-- Step 2: Add self-referential FK for category hierarchy
ALTER TABLE "categories" ADD CONSTRAINT "categories_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- Step 3: Remove solarbioCategoryId FK from products
ALTER TABLE "products" DROP CONSTRAINT IF EXISTS "products_solarbioCategoryId_fkey";
ALTER TABLE "products" DROP COLUMN IF EXISTS "solarbioCategoryId";

-- Step 4: Drop solarbio_categories table
DROP TABLE IF EXISTS "solarbio_categories";
