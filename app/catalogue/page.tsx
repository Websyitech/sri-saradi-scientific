import type { Metadata } from "next";
import CataloguesContent from "./CataloguesContent";

export const metadata: Metadata = {
  title: "Catalogues & Product Documentation | Sri Saradi Scientific",
  description:
    "Explore Solarbio, Orient Filtr and Galactics product scope. Request manufacturer datasheets, certificates of analysis and product citations through Sri Saradi.",
};

export default function CataloguesPage() {
  return <CataloguesContent />;
}
