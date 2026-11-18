import type { Metadata } from "next";
import prisma from "@/app/lib/prisma";
import { cache } from "react";
import ProductsClient from "./ProductsClient";
import { fitTitle } from "@/app/solarbio/brandData";

type Props = { searchParams: Promise<Record<string, string | string[] | undefined>> };

const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v) || "";

const getCategory = cache(async (slug: string) => {
  if (!slug) return null;
  return prisma.category
    .findFirst({
      where: { slug },
      select: {
        name: true,
        slug: true,
        description: true,
        _count: { select: { products: { where: { isActive: true } } } },
        children: { select: { slug: true, _count: { select: { products: { where: { isActive: true } } } } } },
      },
    })
    .catch(() => null);
});

/** Server-rendered Solarbio landing page for a category (/solarbio/slug), or a single child's when the category is only a wrapper. */
function brandPagePath(cat: NonNullable<Awaited<ReturnType<typeof getCategory>>>) {
  if (cat._count.products > 0) return `/solarbio/${cat.slug}`;
  const kids = cat.children.filter((c) => c._count.products > 0);
  return kids.length === 1 ? `/solarbio/${kids[0].slug}` : null;
}

/**
 * Category listings render their products in the browser, so search engines are pointed at the
 * matching server-rendered /solarbio/<category> page, which carries the same range, product links and schema.
 */
export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const sp = await searchParams;
  const cat = await getCategory(one(sp.category).split(",")[0].trim());

  if (cat) {
    const name = cat.name.replace(/Protiens/i, "Proteins");
    const canonical = brandPagePath(cat) ?? `/products?category=${encodeURIComponent(cat.slug)}`;
    const brandPage = brandPagePath(cat);
    // Empty categories (e.g. lab consumables kept for navigation) are not Solarbio ranges and have nothing to index.
    const empty = !brandPage && cat._count.products === 0;
    const title = brandPage ? fitTitle(`Solarbio ${name}`) : fitTitle(name);
    const description = `Buy ${brandPage ? "Solarbio " : ""}${name} in India: catalogue numbers, pack sizes, GST quotations and pan-India delivery from Sri Saradi Scientific.`;
    return { title, description, alternates: { canonical }, ...(empty ? { robots: { index: false, follow: true } } : {}), openGraph: { title, description, url: canonical, images: ["/assets/sri-saradi-logo.png"] } };
  }

  return { alternates: { canonical: "/products" } };
}

export default async function ProductsPage({ searchParams }: Props) {
  const sp = await searchParams;
  const cat = await getCategory(one(sp.category).split(",")[0].trim());
  return <ProductsClient initialCategoryName={cat?.name.replace(/Protiens/i, "Proteins")} />;
}
