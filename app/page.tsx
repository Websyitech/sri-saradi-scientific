import type { Metadata } from 'next';
import HeroSlider from "./components/HeroSlider";
import OmniSearchFeature from "./components/OmniSearchFeature";
import TopCategories from "./components/TopCategories";
import KitProducts from "./components/KitProducts";

export const metadata: Metadata = {
  title: 'Sri Saradi Scientific | Integrated Solutions for Life Science Research',
  description: 'Empower your workflows with Solarbio\'s expansive portfolio of premium research reagents. Featuring rigorously validated antibodies, ELISA kits, recombinant proteins, and biochemical assay kits.',
  openGraph: {
    title: 'Sri Saradi Scientific | Integrated Solutions for Life Science Research',
    description: 'Empower your workflows with Solarbio\'s expansive portfolio of premium research reagents. Featuring rigorously validated antibodies, ELISA kits, recombinant proteins, and biochemical assay kits.',
    url: 'https://srisaradiscientific.com',
    siteName: 'Sri Saradi Scientific',
    images: [
      {
        url: 'https://srisaradiscientific.com/uploads/1772435096175-logo.png',
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
    <main>
      <HeroSlider />
      <OmniSearchFeature />
      <TopCategories />
      <KitProducts />
    </main>
  );
}
