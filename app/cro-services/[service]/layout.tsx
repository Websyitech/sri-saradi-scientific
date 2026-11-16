import type { Metadata } from "next";

type Props = { params: Promise<{ service: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { service } = await params;
  const name = decodeURIComponent(service).replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()).replace(/\b(And|Of|The)\b/g, (w) => w.toLowerCase());
  const title = `${name} | CRO Services | Sri Saradi Scientific`;
  const description = `${name} service from Sri Saradi Scientific, Hyderabad: scope, workflow and turnaround. Request a quote for your project.`;
  const url = `/cro-services/${service}`;
  return { title, description, alternates: { canonical: url }, openGraph: { title, description, url, images: ["/assets/sri-saradi-logo.png"] } };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
