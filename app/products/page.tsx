import type { Metadata } from "next";
import prisma from "@/app/lib/prisma";
import ProductsClient from "./ProductsClient";

type Props = { searchParams: Promise<Record<string, string | string[] | undefined>> };

const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v) || "";

/** Category listings (/products?category=slug) are indexable pages of their own; other filters point back to them. */
export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const sp = await searchParams;
  const categorySlug = one(sp.category).split(",")[0].trim();

  if (categorySlug) {
    const cat = await prisma.category
      .findFirst({ where: { slug: categorySlug }, select: { name: true, slug: true, description: true } })
      .catch(() => null);
    if (cat) {
      const canonical = `/products?category=${encodeURIComponent(cat.slug)}`;
      const title = `${cat.name} | Research Products | Sri Saradi Scientific`;
      const description = (
        cat.description?.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim() ||
        `Buy ${cat.name} for research in India. Browse the range, compare pack sizes and request a quote from Sri Saradi Scientific, Hyderabad.`
      ).slice(0, 160);
      return { title, description, alternates: { canonical }, openGraph: { title, description, url: canonical, images: ["/assets/sri-saradi-logo.png"] } };
    }
  }

  return { alternates: { canonical: "/products" } };
}

export default function ProductsPage() {
  return <ProductsClient />;
}
