import type { Metadata } from 'next';
import SolarbioClient from './SolarbioClient';

export const metadata: Metadata = {
  title: 'Solarbio D1800 | Blood Genomic DNA Extraction Kit 100T | Sri Saradi Scientific',
  description:
    'Explore Solarbio D1800 Blood Genomic DNA Extraction Kit (100T): specifications, real gel image, protocol, batch certificates, published research, and India quotation support.',
  icons: {
    icon: [
      {
        url: '/assets/solarbio/solarbio-favicon.webp',
        type: 'image/webp',
      },
    ],
    shortcut: '/assets/solarbio/solarbio-favicon.webp',
    apple: '/assets/solarbio/solarbio-favicon.webp',
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
