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

/* ---------------- Category FAQs built from the product data ---------------- */

type Row = { v: string | null; n: bigint | number };
const fmt = (n: number) => n.toLocaleString('en-IN');
/** Lower-case plain words but keep acronyms and mixed case (ELISA, DNA, qPCR). */
const soft = (t: string) => t.replace(/\b([A-Z][a-z]+)\b/g, (w) => w.toLowerCase());
const cap = (t: string) => t.charAt(0).toUpperCase() + t.slice(1);
const listJoin = (xs: string[]) => (xs.length <= 1 ? xs.join('') : `${xs.slice(0, -1).join(', ')} and ${xs[xs.length - 1]}`);

// Column names are fixed literals below, never user input.
async function top(slug: string, column: string, limit = 6): Promise<{ v: string; n: number }[]> {
  const rows = await prisma.$queryRawUnsafe<Row[]>(
    `select p."${column}" as v, count(*) as n from products p join categories c on c.id = p."categoryId"
     where c.slug = $1 and p."isActive" and coalesce(p."${column}", '') <> '' group by 1 order by 2 desc limit ${limit}`,
    slug,
  );
  return rows.map((r) => ({ v: String(r.v).trim(), n: Number(r.n) }));
}

async function firstWordOfName(slug: string, skip = 0, limit = 6) {
  const rows = await prisma.$queryRawUnsafe<Row[]>(
    `select initcap(split_part(regexp_replace(p.name, '<[^>]*>', '', 'g'), ' ', ${skip + 1})) as v, count(*) as n
     from products p join categories c on c.id = p."categoryId"
     where c.slug = $1 and p."isActive" group by 1 order by 2 desc limit ${limit}`,
    slug,
  );
  return rows.map((r) => ({ v: String(r.v), n: Number(r.n) }));
}

const SPECIES = new Set(['Human', 'Mouse', 'Rat', 'Bovine', 'Porcine', 'Chicken', 'Rabbit', 'Canine', 'Monkey', 'Sheep', 'Goat', 'Fish', 'Equine', 'Feline', 'Guinea', 'Plant', 'Hamster']);

function tempBucket(s: string) {
  if (/-80/.test(s)) return '-80 °C';
  if (/-20/.test(s)) return '-20 °C';
  if (/2\s*-\s*8|4\s*℃|4\s*°/.test(s)) return '2–8 °C';
  if (/\bRT\b|room/i.test(s)) return 'room temperature';
  return null;
}

export const getCategoryFaqs = cache(async (slug: string, name: string, total: number) => {
  const faqs: { q: string; a: string }[] = [];
  const lower = soft(name) + (/s$/i.test(name) ? '' : ' products');
  try {
    const [subs, storage, purity] = await Promise.all([top(slug, 'subCategory'), top(slug, 'storage', 40), top(slug, 'purity', 40)]);

    // Types / sub-ranges
    const realSubs = subs.filter((s) => !/uncategori|general/i.test(s.v)).slice(0, 5);
    if (realSubs.length >= 2) {
      faqs.push({
        q: `What types of ${BRAND} ${lower} are available?`,
        a: `The range of ${fmt(total)} products includes ${listJoin(realSubs.map((s) => `${soft(s.v)} (${fmt(s.n)})`))}. Each product has its own page with catalogue number and pack sizes.`,
      });
    }

    // Category-specific questions
    if (slug === 'antibodies') {
      const [hosts, clones, apps] = await Promise.all([top(slug, 'abHost', 4), top(slug, 'abCloneType', 3), top(slug, 'abApplicationType', 200)]);
      const appCount = new Map<string, number>();
      for (const a of apps) for (const k of a.v.split(/[;,/]\s*/)) if (k) appCount.set(k.trim(), (appCount.get(k.trim()) ?? 0) + a.n);
      const label: Record<string, string> = { WB: 'western blot (WB)', 'IHC-P': 'IHC on paraffin sections (IHC-P)', FCM: 'flow cytometry (FCM)', ELISA: 'ELISA', IF: 'immunofluorescence (IF)', ICC: 'ICC', IP: 'IP' };
      const topApps = [...appCount.entries()].sort((a, b) => b[1] - a[1]).slice(0, 5);
      if (hosts.length) faqs.push({ q: `Which host species are ${BRAND} antibodies raised in?`, a: `${cap(listJoin(hosts.map((h) => `${h.v.toLowerCase()} (${fmt(h.n)})`)))}. ${clones.length ? `By type there are ${listJoin(clones.map((c) => `${fmt(c.n)} ${c.v.toLowerCase().replace(/ antibody$/, '')}`))} antibodies.` : ''}`.trim() });
      if (topApps.length) faqs.push({ q: `Which applications are ${BRAND} antibodies validated for?`, a: `Validated applications include ${listJoin(topApps.map(([k, n]) => `${label[k] ?? k} (${fmt(n)})`))}. Recommended dilutions are listed on each antibody's page.` });
    }

    if (slug === 'elisa-kits') {
      const [species, samples] = await Promise.all([firstWordOfName(slug, 0, 10), top(slug, 'elisaSampleType', 3)]);
      const sp = species.filter((s) => SPECIES.has(s.v)).slice(0, 5);
      if (sp.length) faqs.push({ q: `Which species do ${BRAND} ELISA kits cover?`, a: `Kits are available for ${listJoin(sp.map((s) => `${s.v.toLowerCase()} (${fmt(s.n)})`))} samples, among others. Sensitivity and detection range are listed on each kit's page.` });
      if (samples.length) faqs.push({ q: `What sample types can ${BRAND} ELISA kits test?`, a: `Most kits (${fmt(samples[0].n)}) are validated for ${soft(samples[0].v)}. Check the kit page or ask us to confirm a specific sample type.` });
    }

    if (slug === 'recombinant-protiens') {
      const species = (await firstWordOfName(slug, 1, 10)).filter((s) => SPECIES.has(s.v)).slice(0, 5);
      if (species.length) faqs.push({ q: `Which species are ${BRAND} recombinant proteins available for?`, a: `${species[0].n >= 0.9 * species.reduce((t, x) => t + x.n, 0) ? `Nearly all are ${species[0].v.toLowerCase()} proteins (${fmt(species[0].n)})${species.length > 1 ? `, with a few ${listJoin(species.slice(1).map((x) => x.v.toLowerCase()))} proteins` : ''}` : cap(listJoin(species.map((x) => `${x.v.toLowerCase()} (${fmt(x.n)})`)))}. Expression host, tag and purity are shared with the quotation.` });
    }

    // Purity
    let numeric = 0;
    const purityTop = new Map<string, number>();
    for (const p of purity) {
      const v = p.v === '0.98' ? '≥98%' : p.v.replace(/\s+/g, '').replace(/(\d)\.0%/, '$1%');
      if (/\d\s*%|≥/.test(v)) { numeric += p.n; purityTop.set(v, (purityTop.get(v) ?? 0) + p.n); }
    }
    if (numeric >= total * 0.1) {
      const best = [...purityTop.entries()].sort((a, b) => b[1] - a[1]).slice(0, 2);
      faqs.push({ q: `What purity are ${BRAND} ${lower}?`, a: `${listJoin(best.map(([v, n]) => `${fmt(n)} products are ${v.replace('HPLC', 'HPLC ')}`))}. For the others, purity is given on the CoA supplied with the quotation and the product.` });
    }

    // Storage
    const buckets = new Map<string, number>();
    for (const s of storage) { const b = tempBucket(s.v); if (b) buckets.set(b, (buckets.get(b) ?? 0) + s.n); }
    const bs = [...buckets.entries()].sort((a, b) => b[1] - a[1]);
    if (bs.length && bs[0][1] >= total * 0.1) {
      faqs.push({ q: `How should ${BRAND} ${lower} be stored?`, a: `Most are stored at ${listJoin(bs.slice(0, 2).map(([b, n]) => `${b} (${fmt(n)} products)`))}. Exact conditions and shelf life are on each product page and its datasheet; cold-chain items are shipped accordingly.` });
    }
  } catch (e) {
    console.error('category faqs', e);
  }

  faqs.push({ q: `How do I order ${BRAND} ${lower} in India?`, a: `Request a quote on any product page or send us catalogue numbers. Sri Saradi Scientific, Hyderabad, quotes in INR with GST invoice and delivers across India.` });
  return faqs;
});
