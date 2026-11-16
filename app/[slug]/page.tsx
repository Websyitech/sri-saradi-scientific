import type { Metadata } from 'next';
import { cache } from 'react';
import { notFound } from 'next/navigation';
import PageContent from '../components/PageContent';
import { prisma } from '@/app/lib/prisma';

interface PageProps {
  params: Promise<{ slug: string }>;
}

const getPage = cache(async (slug: string) => {
  try {
    const page = await prisma.page.findFirst({
      where: { slug, isActive: true },
      select: { id: true, slug: true, title: true, subtitle: true, content: true, createdAt: true, updatedAt: true },
    });
    return page ? JSON.parse(JSON.stringify(page)) : null;
  } catch (error) {
    console.error('Error loading page:', error);
    return null;
  }
});

const titleCase = (s: string) => s.trim().toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase()).replace(/\bAnd\b/g, 'and');

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = await getPage(slug);
  if (!page) return { title: 'Page Not Found | Sri Saradi Scientific', robots: { index: false } };

  const title = `${titleCase(page.title)} | Sri Saradi Scientific`;
  const description = page.subtitle
    ? `${page.subtitle.trim()} at Sri Saradi Scientific Private Limited, Hyderabad.`
    : `${titleCase(page.title)} - Sri Saradi Scientific`;
  return {
    title,
    description,
    alternates: { canonical: `/${page.slug}` },
    openGraph: { title, description, url: `/${page.slug}`, images: ['/assets/sri-saradi-logo.png'] },
  };
}

export async function generateStaticParams() {
  try {
    const pages = await prisma.page.findMany({ where: { isActive: true }, select: { slug: true } });
    return pages.map((page) => ({ slug: page.slug }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const page = await getPage(slug);
  if (!page) notFound();
  return <PageContent slug={slug} initialPage={page} />;
}
