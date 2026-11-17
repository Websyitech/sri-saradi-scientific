import type { Metadata } from 'next';
import SolarbioClient from './SolarbioClient';
import { PRICE_ON_REQUEST } from './priceMode';

export const metadata: Metadata = {
  alternates: { canonical: '/genomic' },
  title: 'Solarbio D1800 | Blood Genomic DNA Extraction Kit 100T | Sri Saradi Scientific',
  description:
    'Explore Solarbio D1800 Blood Genomic DNA Extraction Kit (100T): specifications, real gel image, protocol, batch certificates, published research, and India quotation support.',
  icons: {
    icon: [
      { url: '/uploads/1774236052207-favicon-32x32.png' },
      { url: '/assets/brand/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/assets/brand/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    shortcut: '/uploads/1774236052207-favicon-32x32.png',
    apple: '/assets/brand/icon-192.png',
  },
  openGraph: {
    title: 'Solarbio D1800 | Blood Genomic DNA Extraction Kit 100T | Sri Saradi Scientific',
    description:
      'Explore Solarbio D1800 Blood Genomic DNA Extraction Kit (100T): specifications, real gel image, protocol, batch certificates, published research, and India quotation support.',
    images: [
      {
        url: '/assets/solarbio/hero-product.webp',
        width: 1024,
        height: 768,
        alt: 'Solarbio D1800 Blood Genomic DNA Extraction Kit (100T)',
      },
    ],
    type: 'website',
  },
};

const productJsonLd = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Solarbio D1800 Blood Genomic DNA Extraction Kit (100T)",
  sku: "D1800",
  brand: { "@type": "Brand", name: "Solarbio" },
  image: "https://srisaradiscientific.com/assets/solarbio/hero-product.webp",
  description:
    "Spin-column kit for extracting genomic DNA from whole blood, 100 preparations. Supplied in India by Sri Saradi Scientific.",
  // While the price-on-request test runs the page shows no price, so the structured data must not either.
  ...(PRICE_ON_REQUEST ? {} : { offers: {
    "@type": "Offer",
    url: "https://srisaradiscientific.com/genomic",
    priceCurrency: "INR",
    price: "22420.00",
    availability: "https://schema.org/InStock",
    seller: { "@type": "Organization", name: "Sri Saradi Scientific Private Limited" },
  } }),
};

export default function SolarBioPage() {
  return (
    <>
      {/* Google rejects Product data without a price, so it is left out while the price is on request. */}
      {!PRICE_ON_REQUEST && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }} />
      )}
      <SolarbioClient />
    </>
  );
}
