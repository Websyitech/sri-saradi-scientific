import type { Metadata } from 'next';
import SolarbioClient from './SolarbioClient';

export const metadata: Metadata = {
  alternates: { canonical: '/genomic' },
  title: 'Solarbio D1800 | Blood Genomic DNA Extraction Kit 100T | Sri Saradi Scientific',
  description:
    'Explore Solarbio D1800 Blood Genomic DNA Extraction Kit (100T): specifications, real gel image, protocol, batch certificates, published research, and India quotation support.',
  icons: {
    icon: '/uploads/1774236052207-favicon-32x32.png',
    shortcut: '/uploads/1774236052207-favicon-32x32.png',
    apple: '/uploads/1774236052207-favicon-32x32.png',
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
  offers: {
    "@type": "Offer",
    url: "https://srisaradiscientific.com/genomic",
    priceCurrency: "INR",
    price: "22420.00",
    availability: "https://schema.org/InStock",
    seller: { "@type": "Organization", name: "Sri Saradi Scientific Private Limited" },
  },
};

export default function SolarBioPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }} />
      <SolarbioClient />
    </>
  );
}
