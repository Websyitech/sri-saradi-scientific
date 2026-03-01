import HeroSlider from "./components/HeroSlider";
import TopCategories from "./components/TopCategories";
import KitProducts from "./components/KitProducts";
import FeaturedProducts from "./components/FeaturedProducts";

export default function Home() {
  return (
    <main>
      <HeroSlider />
      <TopCategories />
      <KitProducts />
      <FeaturedProducts />
    </main>
  );
}
