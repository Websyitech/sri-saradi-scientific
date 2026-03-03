-- Add missing columns to kit_products
ALTER TABLE "kit_products" ADD COLUMN "slug" TEXT;
ALTER TABLE "kit_products" ADD COLUMN "heroTitle" TEXT;
ALTER TABLE "kit_products" ADD COLUMN "associatedProducts" TEXT;

-- Add bgImage to hero_slides
ALTER TABLE "hero_slides" ADD COLUMN "bgImage" TEXT;
