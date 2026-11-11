import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { POLICIES } from "../lib/policies";

// Only the policy slugs are served here; anything else is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return POLICIES.map((p) => ({ slug: p.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const policy = POLICIES.find((p) => p.slug === slug);
  if (!policy) return {};
  return {
    title: `${policy.title} | Sri Saradi Scientific`,
    description: policy.subtitle,
    alternates: { canonical: `/${policy.slug}` },
  };
}

export default async function PolicyPage({ params }: Props) {
  const { slug } = await params;
  const policy = POLICIES.find((p) => p.slug === slug);
  if (!policy) notFound();

  return (
    <div className="bg-white">
      <div className="border-b border-gray-200 py-3.5">
        <div className="mx-auto max-w-[1400px] px-4 text-[13px] text-gray-500 sm:px-10">
          <Link href="/" className="text-[#2D2B7F] hover:underline">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-700">{policy.title}</span>
        </div>
      </div>

      <div className="bg-gradient-to-br from-[#2D2B7F] to-[#1a1a2e] px-4 py-12 text-center">
        <h1 className="text-3xl font-extrabold text-white">{policy.title}</h1>
        {policy.subtitle && <p className="mt-2 text-sm text-white/70">{policy.subtitle}</p>}
      </div>

      <article
        className="policy-content mx-auto max-w-[900px] px-4 py-12 text-[15px] leading-7 text-gray-700 sm:px-6"
        dangerouslySetInnerHTML={{ __html: policy.html }}
      />
    </div>
  );
}
