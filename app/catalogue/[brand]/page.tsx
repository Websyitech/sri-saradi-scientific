import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { catalogues } from "../catalogue-data";
import BrandCatalogueContent from "./BrandCatalogueContent";

interface Props {
  params: Promise<{ brand: string }>;
}

export async function generateStaticParams() {
  return catalogues.map((c) => ({ brand: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { brand } = await params;
  const cat = catalogues.find((c) => c.slug === brand);
  if (!cat) return {};
  return {
    title: `${cat.brand}${cat.subtitle ? " " + cat.subtitle : ""} Catalogue | Sri Saradi Scientific`,
    description: `Browse and download the ${cat.pdfName} catalogue. ${cat.description} Request datasheets, COAs and product citations through Sri Saradi.`,
  };
}

export default async function BrandCataloguePage({ params }: Props) {
  const { brand } = await params;
  const cat = catalogues.find((c) => c.slug === brand);
  if (!cat) notFound();
  return <BrandCatalogueContent current={cat} />;
}

