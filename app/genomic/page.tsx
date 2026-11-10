import type { Metadata } from 'next';
import SolarbioClient from './SolarbioClient';

export const metadata: Metadata = {
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

export default function SolarBioPage() {
  return <SolarbioClient />;
}
