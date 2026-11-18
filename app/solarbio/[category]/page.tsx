import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import BrandView from '../BrandView';
import { BRAND, displayCategory, getBrandCategories, getBrandCategory, getBrandProducts } from '../brandData';

export const revalidate = 3600;

interface Props {
  params: Promise<{ category: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const cat = await getBrandCategory(category);
  if (!cat) return { title: 'Page Not Found | Sri Saradi Scientific', robots: { index: false } };
  const name = displayCategory(cat.name);
  const title = `${BRAND} ${name} Supplier in India | Sri Saradi Scientific`;
  const description = `Buy ${cat.count.toLocaleString('en-IN')} ${BRAND} ${name} in India. Catalogue numbers, pack sizes, quotations with GST invoice and pan-India delivery from Sri Saradi Scientific, Hyderabad.`;
  return {
    title,
    description,
    alternates: { canonical: `/solarbio/${cat.slug}` },
    openGraph: { title, description, url: `/solarbio/${cat.slug}`, images: ['/assets/sri-saradi-logo.png'] },
  };
}

export default async function SolarbioCategoryPage({ params }: Props) {
  const { category } = await params;
  const cat = await getBrandCategory(category);
  if (!cat) notFound();
  const [categories, products] = await Promise.all([getBrandCategories(), getBrandProducts(cat.slug, 24)]);
  const name = displayCategory(cat.name);
  const lower = name.toLowerCase();
  const desc = cat.description?.replace(/<[^>]*>/g, '').trim();

  return (
    <BrandView
      heading={`${BRAND} ${name} in India`}
      path={`/solarbio/${cat.slug}`}
      total={cat.count}
      categories={categories}
      products={products}
      currentSlug={cat.slug}
      browseHref={`/products?category=${cat.slug}`}
      browseLabel={`See all ${cat.count.toLocaleString('en-IN')} ${BRAND} ${lower}`}
      intro={[
        ...(desc ? [desc] : []),
        `Sri Saradi Scientific supplies ${cat.count.toLocaleString('en-IN')} ${BRAND} ${lower} to research labs, universities, hospitals and industry across India. Each product has its own page with the catalogue number, pack sizes and specifications.`,
        `Send us catalogue numbers or add products to an enquiry for a quotation in INR with GST invoice. We handle import and delivery to your lab anywhere in India.`,
      ]}
      faqs={[
        { q: `Where can I buy ${BRAND} ${lower} in Hyderabad?`, a: `Sri Saradi Scientific Private Limited, Hyderabad, Telangana, supplies ${BRAND} ${lower} to labs in Hyderabad, Secunderabad and Genome Valley, and ships across India. Search by catalogue number or request a quotation.` },
        { q: `How do I get a price for ${BRAND} ${lower}?`, a: 'Open any product and request a quote, or send your list through the contact page. We reply with price, pack size and delivery time.' },
        { q: 'Can I get datasheets before ordering?', a: 'Yes. We can share manufacturer datasheets, protocols and certificates on request.' },
      ]}
    />
  );
}
