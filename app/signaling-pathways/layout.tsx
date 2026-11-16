import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Signaling Pathways | Sri Saradi Scientific",
  description: "Explore cell signaling pathways with related antibodies, ELISA kits and reagents for your research, from Sri Saradi Scientific.",
  alternates: { canonical: "/signaling-pathways" },
  openGraph: { title: "Signaling Pathways | Sri Saradi Scientific", description: "Explore cell signaling pathways with related antibodies, ELISA kits and reagents for your research, from Sri Saradi Scientific.", url: "/signaling-pathways", images: ["/assets/sri-saradi-logo.png"] },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
