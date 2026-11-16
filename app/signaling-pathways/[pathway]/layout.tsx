import type { Metadata } from "next";

type Props = { params: Promise<{ pathway: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { pathway } = await params;
  const name = decodeURIComponent(pathway).replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()).replace(/\b(And|Of|The)\b/g, (w) => w.toLowerCase());
  const title = `${name} | Signaling Pathways | Sri Saradi Scientific`;
  const description = `${name}: pathway overview with related antibodies, ELISA kits and reagents for research, from Sri Saradi Scientific.`;
  const url = `/signaling-pathways/${pathway}`;
  return { title, description, alternates: { canonical: url }, openGraph: { title, description, url, images: ["/assets/sri-saradi-logo.png"] } };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
