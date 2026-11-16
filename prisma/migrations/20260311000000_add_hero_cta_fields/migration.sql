-- Add CTA type fields to hero_slides table
ALTER TABLE "hero_slides" ADD COLUMN "ctaType" TEXT DEFAULT 'link';
ALTER TABLE "hero_slides" ADD COLUMN "pdfUrl" TEXT;
ALTER TABLE "hero_slides" ADD COLUMN "pdfLabel" TEXT;
ALTER TABLE "hero_slides" ADD COLUMN "quoteCtaLabel" TEXT;
