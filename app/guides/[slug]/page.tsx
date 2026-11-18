import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ARTICLES, getArticle, type Block } from '../articles';

const SITE = 'https://srisaradiscientific.com';
const NAVY = '#2D2B7F';

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const a = getArticle((await params).slug);
  if (!a) return {};
  const url = `/guides/${a.slug}`;
  return {
    title: `${a.metaTitle} | Sri Saradi Scientific`.length <= 65 ? `${a.metaTitle} | Sri Saradi Scientific` : a.metaTitle,
    description: a.description,
    alternates: { canonical: url },
    openGraph: { type: 'article', title: a.title, description: a.description, url, images: ['/assets/sri-saradi-logo.png'], publishedTime: a.published, modifiedTime: a.updated },
  };
}

const td = { border: '1px solid #e5e7eb', padding: '10px 12px', verticalAlign: 'top' as const, textAlign: 'left' as const };

function RenderBlock({ b }: { b: Block }) {
  if ('p' in b) return <p style={{ lineHeight: 1.75, margin: '0 0 16px' }}>{b.p}</p>;
  if ('h3' in b) return <h3 style={{ fontSize: 19, margin: '20px 0 8px' }}>{b.h3}</h3>;
  if ('note' in b) return <p style={{ background: '#eef0fb', borderLeft: `4px solid ${NAVY}`, padding: '12px 16px', borderRadius: 6, lineHeight: 1.6, margin: '0 0 16px' }}>{b.note}</p>;
  if ('ul' in b) return <ul style={{ lineHeight: 1.7, margin: '0 0 16px', paddingLeft: 22, listStyle: 'disc' }}>{b.ul.map((x) => <li key={x} style={{ marginBottom: 6 }}>{x}</li>)}</ul>;
  if ('ol' in b) return <ol style={{ lineHeight: 1.7, margin: '0 0 16px', paddingLeft: 22, listStyle: 'decimal' }}>{b.ol.map((x) => <li key={x} style={{ marginBottom: 6 }}>{x}</li>)}</ol>;
  return (
    <div style={{ overflowX: 'auto', margin: '0 0 18px' }}>
      <table style={{ borderCollapse: 'collapse', width: '100%', background: '#fff', fontSize: 15 }}>
        <thead><tr>{b.table.head.map((h, i) => <th key={i} style={{ ...td, background: '#f3f4f6' }}>{h}</th>)}</tr></thead>
        <tbody>{b.table.rows.map((r, i) => <tr key={i}>{r.map((c, j) => <td key={j} style={{ ...td, fontWeight: j === 0 ? 600 : 400 }}>{c}</td>)}</tr>)}</tbody>
      </table>
    </div>
  );
}

export default async function GuidePage({ params }: Props) {
  const a = getArticle((await params).slug);
  if (!a) notFound();
  const url = `${SITE}/guides/${a.slug}`;
  const others = ARTICLES.filter((x) => x.slug !== a.slug);

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: a.title,
      description: a.description,
      datePublished: a.published,
      dateModified: a.updated,
      mainEntityOfPage: url,
      image: `${SITE}/assets/sri-saradi-logo.png`,
      author: { '@type': 'Organization', name: 'Sri Saradi Scientific', url: SITE },
      publisher: { '@id': `${SITE}/#organization` },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE },
        { '@type': 'ListItem', position: 2, name: 'Guides', item: `${SITE}/guides` },
        { '@type': 'ListItem', position: 3, name: a.title, item: url },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: a.faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
    },
  ];

  return (
    <main style={{ background: '#fff', color: '#1f2937' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <header style={{ background: NAVY, color: '#fff', padding: '48px 20px 40px' }}>
        <div style={{ maxWidth: 820, margin: '0 auto' }}>
          <nav aria-label="Breadcrumb" style={{ fontSize: 14, opacity: 0.85, marginBottom: 14 }}>
            <Link href="/" style={{ color: '#fff' }}>Home</Link> / <Link href="/guides" style={{ color: '#fff' }}>Guides</Link>
          </nav>
          <h1 style={{ fontSize: 'clamp(26px, 4vw, 38px)', lineHeight: 1.25, margin: '0 0 12px' }}>{a.title}</h1>
          <p style={{ margin: 0, opacity: 0.85, fontSize: 15 }}>
            Sri Saradi Scientific · Updated {new Date(a.updated).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })} · {a.readMinutes} min read
          </p>
        </div>
      </header>

      <article style={{ maxWidth: 820, margin: '0 auto', padding: '36px 20px 24px', fontSize: 17 }}>
        <p style={{ fontSize: 19, lineHeight: 1.7, color: '#374151', margin: '0 0 28px' }}>{a.summary}</p>
        {a.sections.map((s) => (
          <section key={s.h2} style={{ marginBottom: 28 }}>
            <h2 style={{ fontSize: 25, color: NAVY, margin: '0 0 14px' }}>{s.h2}</h2>
            {s.blocks.map((b, i) => <RenderBlock key={i} b={b} />)}
          </section>
        ))}

        <section style={{ marginBottom: 28 }}>
          <h2 style={{ fontSize: 25, color: NAVY, margin: '0 0 14px' }}>Frequently asked questions</h2>
          {a.faqs.map((f) => (
            <div key={f.q} style={{ marginBottom: 16 }}>
              <h3 style={{ fontSize: 18, margin: '0 0 6px' }}>{f.q}</h3>
              <p style={{ margin: 0, lineHeight: 1.7 }}>{f.a}</p>
            </div>
          ))}
        </section>

        <aside style={{ background: '#f7f8fc', border: '1px solid #e5e7eb', borderRadius: 12, padding: 22, marginBottom: 28 }}>
          <h2 style={{ fontSize: 20, color: NAVY, margin: '0 0 12px' }}>Products for this guide</h2>
          <ul style={{ margin: '0 0 14px', paddingLeft: 20, lineHeight: 1.9, listStyle: 'disc' }}>
            {a.related.map((r) => <li key={r.href}><Link href={r.href} style={{ color: NAVY, fontWeight: 600 }}>{r.label}</Link></li>)}
          </ul>
          <p style={{ margin: 0 }}>
            Need help choosing? <Link href="/contact" style={{ color: NAVY, fontWeight: 600 }}>Contact our team</Link> or call +91 72076 07444 for a quotation in INR with GST invoice.
          </p>
        </aside>

        {others.length > 0 && (
          <nav aria-label="More guides" style={{ marginBottom: 40 }}>
            <h2 style={{ fontSize: 20, margin: '0 0 10px' }}>More guides</h2>
            <ul style={{ paddingLeft: 20, lineHeight: 1.9, margin: 0, listStyle: 'disc' }}>
              {others.map((o) => <li key={o.slug}><Link href={`/guides/${o.slug}`} style={{ color: NAVY }}>{o.title}</Link></li>)}
            </ul>
          </nav>
        )}
      </article>
    </main>
  );
}
