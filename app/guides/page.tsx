import type { Metadata } from 'next';
import Link from 'next/link';
import { ARTICLES } from './articles';

const title = 'Lab Product Guides | Sri Saradi Scientific';
const description = 'Practical guides for researchers in India: choosing ELISA kits and antibodies, DNA extraction and more, from Sri Saradi Scientific.';

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: '/guides' },
  openGraph: { title, description, url: '/guides', images: ['/assets/sri-saradi-logo.png'] },
};

const NAVY = '#2D2B7F';

export default function GuidesIndex() {
  return (
    <main style={{ background: '#f7f8fc', minHeight: '60vh' }}>
      <section style={{ background: NAVY, color: '#fff', padding: '56px 20px 44px' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <h1 style={{ fontSize: 'clamp(28px, 4vw, 40px)', margin: '0 0 12px' }}>Lab Product Guides</h1>
          <p style={{ fontSize: 18, margin: 0, opacity: 0.9, maxWidth: 700 }}>
            Practical advice on choosing and using research reagents, written for labs in India.
          </p>
        </div>
      </section>
      <div style={{ maxWidth: 1000, margin: '0 auto', padding: '40px 20px 64px', display: 'grid', gap: 18 }}>
        {ARTICLES.map((a) => (
          <article key={a.slug} style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 12, padding: 24 }}>
            <h2 style={{ fontSize: 22, margin: '0 0 8px' }}>
              <Link href={`/guides/${a.slug}`} style={{ color: NAVY, textDecoration: 'none' }}>{a.title}</Link>
            </h2>
            <p style={{ margin: '0 0 10px', lineHeight: 1.6, color: '#374151' }}>{a.summary}</p>
            <span style={{ fontSize: 14, color: '#6b7280' }}>{a.readMinutes} min read</span>
          </article>
        ))}
      </div>
    </main>
  );
}
