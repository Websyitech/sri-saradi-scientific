import type { Metadata } from "next";
import { cache } from "react";
import { notFound } from "next/navigation";
import prisma from "@/app/lib/prisma";
import { transformProductsForDisplay } from "@/lib/character-transformer";
import ProductDetailClient, { type Product } from "./ProductDetailClient";

type Props = { params: Promise<{ slug: string[] }> };

const SITE = "https://srisaradiscientific.com";

const stripTags = (s: string | null | undefined) =>
  (s || "").replace(/<[^>]*>/g, " ").replace(/&nbsp;/g, " ").replace(/\s+/g, " ").trim();

/** One product by catalogue number (exact match first, same shape as /api/products). */
type Loaded = { product: Product; raw: { name: string; description: string | null } };

const getProduct = cache(async (catalogNumber: string): Promise<Loaded | null> => {
  try {
    const include = {
      category: true,
      variants: { orderBy: { sortOrder: "asc" as const }, where: { isActive: true } },
    };
    let row = await prisma.product.findFirst({
      where: { catalogNumber: { equals: catalogNumber, mode: "insensitive" } },
      include,
    });
    if (!row) {
      row = await prisma.product.findFirst({
        where: { catalogNumber: { contains: catalogNumber, mode: "insensitive" } },
        include,
        orderBy: { sortOrder: "asc" },
      });
    }
    if (!row) return null;
    // Plain JSON (Decimal/Date to strings), as the API would send it. The display
    // transform turns symbols into HTML entities, so titles/JSON-LD use the raw text.
    return {
      product: JSON.parse(JSON.stringify(transformProductsForDisplay([row])[0])) as Product,
      raw: { name: row.name, description: row.description },
    };
  } catch (error) {
    console.error("Product lookup failed:", error);
    return null;
  }
});

async function productFor(slug: string[] | undefined) {
  if (!slug || slug.length === 0 || slug.length === 2) return null; // 2 segments = brand/category listing
  return getProduct(decodeURIComponent(slug[0]));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const path = `/products/${(slug || []).join("/")}`;

  if (slug?.length === 2) {
    const category = decodeURIComponent(slug[1]).replace(/-/g, " ");
    const brand = decodeURIComponent(slug[0]);
    const title = `${category.replace(/\b\w/g, (c) => c.toUpperCase())} – ${brand} | Sri Saradi Scientific`;
    return { title, alternates: { canonical: path }, openGraph: { title, url: path } };
  }

  const loaded = await productFor(slug);
  if (!loaded) return { title: "Product not found | Sri Saradi Scientific", robots: { index: false } };

  const p = { ...loaded.product, name: loaded.raw.name, description: loaded.raw.description };
  const canonical = `/products/${encodeURIComponent(p.catalogNumber)}`;
  const brand = p.brand || p.manufacturer || "";
  const title = `${stripTags(p.name)} (${p.catalogNumber})${brand ? ` – ${brand}` : ""} | Sri Saradi Scientific`;
  const body = stripTags(p.description);
  const description = (
    body
      ? `${stripTags(p.name)}, cat. no. ${p.catalogNumber}. ${body}`
      : `Buy ${stripTags(p.name)} (cat. no. ${p.catalogNumber})${brand ? ` by ${brand}` : ""} in India. Request a quote from Sri Saradi Scientific, Hyderabad.`
  ).slice(0, 160);
  const images = p.image ? [{ url: p.image }] : undefined;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: { title, description, url: canonical, type: "website", ...(images ? { images } : {}) },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const loaded = await productFor(slug);
  // A single-segment URL that matches no product is a real 404 (not a 200 "not found" page).
  if (!loaded && slug?.length === 1) notFound();
  const product = loaded ? { ...loaded.product, name: loaded.raw.name, description: loaded.raw.description } : null;

  const jsonLd = product
    ? (() => {
        const prices = (product.variants || [])
          .map((v) => Number(v.price))
          .filter((n) => Number.isFinite(n) && n > 0);
        const url = `${SITE}/products/${encodeURIComponent(product.catalogNumber)}`;
        return {
          "@context": "https://schema.org",
          "@type": "Product",
          name: stripTags(product.name),
          sku: product.catalogNumber,
          mpn: product.catalogNumber,
          url,
          ...(product.image ? { image: product.image.startsWith("http") ? product.image : `${SITE}${product.image}` } : {}),
          ...(stripTags(product.description) ? { description: stripTags(product.description).slice(0, 5000) } : {}),
          ...(product.brand || product.manufacturer ? { brand: { "@type": "Brand", name: product.brand || product.manufacturer } } : {}),
          ...(product.category?.name ? { category: product.category.name } : {}),
          ...(prices.length
            ? {
                offers: {
                  "@type": "AggregateOffer",
                  priceCurrency: "INR",
                  lowPrice: Math.min(...prices).toFixed(2),
                  highPrice: Math.max(...prices).toFixed(2),
                  offerCount: prices.length,
                  url,
                  seller: { "@type": "Organization", name: "Sri Saradi Scientific Private Limited" },
                },
              }
            : {}),
        };
      })()
    : null;

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
      )}
      <ProductDetailClient initialProduct={loaded?.product ?? null} />
    </>
  );
}
