import type { Metadata } from 'next';
import HomeRedesign from "./components/home-redesign/HomeRedesign";

export const metadata: Metadata = {
  alternates: { canonical: '/' },
  title: 'Sri Saradi Scientific | From scientific need to global supply',
  description: 'Scientist-led product sourcing, evidence support and integrated worldwide logistics for laboratories, industries and dealers.',
  openGraph: {
    title: 'Sri Saradi Scientific | From scientific need to global supply',
    description: 'Scientist-led product sourcing, evidence support and integrated worldwide logistics for laboratories, industries and dealers.',
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
