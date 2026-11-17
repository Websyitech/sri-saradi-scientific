import { cache } from 'react';
import { prisma } from '@/app/lib/prisma';

export const BRAND = 'Solarbio';
export const SITE = 'https://srisaradiscientific.com';

export const stripTags = (s: string) =>
  s
    .replace(/<[^>]*>/g, '')
    .replace(/&times;/g, '×')
    .replace(/&amp;/g, '&')
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

const brandWhere = {
  isActive: true,
  OR: [{ brand: { equals: BRAND, mode: 'insensitive' as const } }, { manufacturer: { equals: BRAND, mode: 'insensitive' as const } }],
};

export type BrandCategory = { name: string; slug: string; description: string | null; count: number };
export type BrandProduct = { catalogNumber: string; name: string; size: string | null };

export const getBrandCategories = cache(async (): Promise<BrandCategory[]> => {
  try {
    const groups = await prisma.product.groupBy({ by: ['categoryId'], where: brandWhere, _count: { _all: true } });
    const ids = groups.map((g) => g.categoryId).filter((x): x is string => !!x);
    const cats = await prisma.category.findMany({
      where: { id: { in: ids }, isActive: true },
      select: { id: true, name: true, slug: true, description: true },
    });
    const counts = new Map(groups.map((g) => [g.categoryId, g._count._all]));
    return cats
      .map((c) => ({ name: c.name, slug: c.slug, description: c.description, count: counts.get(c.id) ?? 0 }))
      .sort((a, b) => b.count - a.count);
  } catch (e) {
    console.error('brand categories', e);
    return [];
  }
});

export const getBrandCategory = cache(async (slug: string) => {
  const cats = await getBrandCategories();
  return cats.find((c) => c.slug === slug) ?? null;
});

export const getBrandProducts = cache(async (categorySlug: string | null, take: number): Promise<BrandProduct[]> => {
  try {
    const rows = await prisma.product.findMany({
      where: { ...brandWhere, ...(categorySlug ? { category: { slug: categorySlug } } : {}) },
      select: { catalogNumber: true, name: true, size: true },
      orderBy: [{ isFeatured: 'desc' }, { sortOrder: 'asc' }, { catalogNumber: 'asc' }],
      take,
    });
    return rows.map((r) => ({ ...r, name: stripTags(r.name) }));
  } catch (e) {
    console.error('brand products', e);
    return [];
  }
});

export const getBrandTotal = cache(async () => {
  try {
    return await prisma.product.count({ where: brandWhere });
  } catch {
    return 0;
  }
});

/** "Recombinant Protiens" in the DB → fix the typo for display. */
export const displayCategory = (name: string) => name.replace(/Protiens/i, 'Proteins');
