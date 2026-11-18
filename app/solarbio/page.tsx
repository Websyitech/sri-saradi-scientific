import type { Metadata } from 'next';
import BrandView from './BrandView';
import { BRAND, displayCategory, getBrandCategories, getBrandProducts, getBrandTotal } from './brandData';

export const revalidate = 3600;

const title = `${BRAND} Distributor in India | Sri Saradi Scientific`;
const description = `Buy ${BRAND} antibodies, ELISA kits, recombinant proteins, peptides and reagents in India. GST quotations and pan-India delivery from Hyderabad.`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: '/solarbio' },
  openGraph: { title, description, url: '/solarbio', images: ['/assets/solarbio/hero-product.webp'] },
};

export default async function SolarbioBrandPage() {
  const [categories, products, total] = await Promise.all([getBrandCategories(), getBrandProducts(null, 24), getBrandTotal()]);
  const top = categories.slice(0, 5).map((c) => displayCategory(c.name).toLowerCase());

  return (
    <BrandView
      heading={`${BRAND} Distributor in India`}
      path="/solarbio"
      total={total}
      categories={categories}
      products={products}
      browseHref="/products"
      browseLabel={`Browse all ${BRAND} products`}
      intro={[
        `Beijing Solarbio Science & Technology is a life science reagent manufacturer whose catalogue covers ${top.join(', ')} and more. Sri Saradi Scientific Private Limited supplies the ${BRAND} range to universities, research institutes, hospitals and pharma and biotech labs across India.`,
        `Every ${BRAND} product on this site has its own page with the catalogue number, pack sizes and specifications. Add products to an enquiry or call us for a quotation with GST invoice, and we arrange import, cold-chain handling where needed, and delivery to your lab.`,
        `Based in Hyderabad, we serve labs across Telangana and Andhra Pradesh, including Genome Valley biotech companies, university and institute research groups, hospitals and pharma R&D centres, with local support, fast quotations and quick delivery within the city.`,
        `Popular items include the ${BRAND} D1800 Blood Genomic DNA Extraction Kit, primary antibodies for western blot and IHC, ELISA kits for human, mouse and rat samples, and analytical reference standards.`,
      ]}
      faqs={[
        { q: `Where can I buy ${BRAND} products in India?`, a: `Sri Saradi Scientific in Hyderabad supplies the ${BRAND} catalogue across India. Search a catalogue number on this site or send us your list for a quotation.` },
        { q: `Is there a ${BRAND} supplier in Hyderabad?`, a: `Yes. Sri Saradi Scientific Private Limited is based in Hyderabad, Telangana, and supplies ${BRAND} products to labs in Hyderabad, Secunderabad, Genome Valley and across India. Call +91 72076 07444.` },
        { q: `How long does delivery of ${BRAND} reagents take?`, a: 'Delivery time depends on the product and current stock. Our team confirms the timeline and storage conditions with every quotation.' },
        { q: 'Do you provide GST invoices and support for institutional purchases?', a: 'Yes. We quote and invoice in INR with GST and work with university, government and company purchase processes.' },
        { q: `Can I get datasheets and protocols for ${BRAND} products?`, a: 'Yes. Product pages list key specifications, and we can share manufacturer datasheets, protocols and certificates on request.' },
      ]}
    />
  );
}
