import type { Metadata } from "next";
import { cache } from "react";
import { notFound } from "next/navigation";
import prisma from "@/app/lib/prisma";
import Client, { type ServiceContent } from "./ServiceClient";

type Props = { params: Promise<{ service: string }> };

const load = cache(async (slug: string): Promise<ServiceContent | null> => {
  try {
    const row = await prisma.cROService.findUnique({ where: { slug } });
    return row && row.isActive !== false ? (JSON.parse(JSON.stringify(row)) as ServiceContent) : null;
  } catch (error) {
    console.error("Lookup failed:", error);
    return null;
  }
});

const plain = (s?: string | null) => (s || "").replace(/<[^>]*>/g, " ").replace(/&nbsp;/g, " ").replace(/\s+/g, " ").trim();

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { service } = await params;
  const item = await load(decodeURIComponent(service));
  if (!item) return { title: "Not found | Sri Saradi Scientific", robots: { index: false } };
  const name = plain(item.heading) || plain(item.title);
  const title = `${name} | CRO Services | Sri Saradi Scientific`;
  const description = (plain(item.subheading) || plain(item.content).slice(0, 200) || `${name} from Sri Saradi Scientific, Hyderabad.`).slice(0, 160);
  const url = `/cro-services/${item.slug}`;
  return { title, description, alternates: { canonical: url }, openGraph: { title, description, url, images: ["/assets/sri-saradi-logo.png"] } };
}

export default async function Page({ params }: Props) {
  const { service } = await params;
  const item = await load(decodeURIComponent(service));
  if (!item) notFound();
  return <Client initial={item} />;
}
