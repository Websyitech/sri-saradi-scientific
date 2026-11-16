import type { Metadata } from "next";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const name = decodeURIComponent(slug).replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()).replace(/\b(And|Of|The)\b/g, (w) => w.toLowerCase());
  const title = `${name} | FAQ | Sri Saradi Scientific`;
  const description = `${name}: answers from Sri Saradi Scientific about ordering, delivery and product support.`;
  const url = `/faq/${slug}`;
  return { title, description, alternates: { canonical: url }, openGraph: { title, description, url, images: ["/assets/sri-saradi-logo.png"] } };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
