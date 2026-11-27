import type { Metadata } from 'next';
import HomeRedesign from "./components/home-redesign/HomeRedesign";

export const metadata: Metadata = {
  alternates: { canonical: '/' },
  title: 'Solarbio Reagents & Lab Filters in India | Sri Saradi Scientific',
  description: 'Solarbio antibodies, ELISA kits and reagents plus Orient Filtr lab filters, supplied across India from Hyderabad. INR quotes with GST invoice.',
  openGraph: {
    title: 'Solarbio Reagents & Lab Filters in India | Sri Saradi Scientific',
    description: 'Solarbio antibodies, ELISA kits and reagents plus Orient Filtr lab filters, supplied across India from Hyderabad. INR quotes with GST invoice.',
    url: 'https://srisaradiscientific.com',
    siteName: 'Sri Saradi Scientific',
    images: [
      {
        url: 'https://srisaradiscientific.com/assets/sri-saradi-logo.png',
        width: 1200,
        height: 630,
        alt: 'Sri Saradi Scientific Research Solutions',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};

export default function Home() {
  return (
    <main id="main">
      <HomeRedesign />
    </main>
  );
}
