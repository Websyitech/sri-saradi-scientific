import Link from 'next/link';
import { BRAND, SITE, displayCategory, type BrandCategory, type BrandProduct } from './brandData';

type Props = {
  heading: string;
  intro: string[];
  path: string;
  total: number;
  categories: BrandCategory[];
  products: BrandProduct[];
  currentSlug?: string;
  browseHref: string;
  browseLabel: string;
  faqs: { q: string; a: string }[];
};

const NAVY = '#2D2B7F';

export default function BrandView({ heading, intro, path, total, categories, products, currentSlug, browseHref, browseLabel, faqs }: Props) {
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: heading,
      url: `${SITE}${path}`,
      about: { '@type': 'Brand', name: BRAND },
      provider: { '@type': 'Organization', name: 'Sri Saradi Scientific Private Limited', url: SITE },
      mainEntity: {
        '@type': 'ItemList',
        numberOfItems: products.length,
        itemListElement: products.map((p, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          url: `${SITE}/products/${encodeURIComponent(p.catalogNumber)}`,
          name: p.name,
        })),
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE },
        { '@type': 'ListItem', position: 2, name: `${BRAND} in Hyderabad & India`, item: `${SITE}/solarbio` },
        ...(currentSlug ? [{ '@type': 'ListItem', position: 3, name: heading, item: `${SITE}${path}` }] : []),
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
    },
  ];

  return (
    <main style={{ background: '#f7f8fc', color: '#1f2937' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section style={{ background: NAVY, color: '#fff', padding: '56px 20px 48px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <nav aria-label="Breadcrumb" style={{ fontSize: 14, opacity: 0.85, marginBottom: 16 }}>
            <Link href="/" style={{ color: '#fff' }}>Home</Link> /{' '}
            {currentSlug ? <Link href="/solarbio" style={{ color: '#fff' }}>{BRAND} in Hyderabad & India</Link> : <span>{BRAND} in Hyderabad & India</span>}
            {currentSlug && <> / <span>{heading}</span></>}
          </nav>
          <h1 style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 700, margin: '0 0 16px', lineHeight: 1.2 }}>{heading}</h1>
          <p style={{ fontSize: 18, maxWidth: 760, margin: 0, opacity: 0.92 }}>
            {total.toLocaleString('en-IN')} {BRAND} products available from Sri Saradi Scientific, Hyderabad, with delivery across India.
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 24 }}>
            <Link href={browseHref} style={{ background: '#fff', color: NAVY, padding: '12px 22px', borderRadius: 8, fontWeight: 600, textDecoration: 'none' }}>
              {browseLabel}
            </Link>
            <Link href="/contact" style={{ border: '1px solid #fff', color: '#fff', padding: '12px 22px', borderRadius: 8, fontWeight: 600, textDecoration: 'none' }}>
              Request a quotation
            </Link>
          </div>
        </div>
      </section>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '40px 20px 64px' }}>
        <section style={{ maxWidth: 820 }}>
          {intro.map((p, i) => (
            <p key={i} style={{ fontSize: 17, lineHeight: 1.7, margin: '0 0 16px' }}>{p}</p>
          ))}
        </section>

        {products.length > 0 && (
          <section style={{ marginTop: 40 }}>
            <h2 style={{ fontSize: 26, color: NAVY, margin: '0 0 20px' }}>
              {currentSlug ? `Popular ${heading.replace(/ in Hyderabad & India$/, '')}` : `Popular ${BRAND} products`}
            </h2>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 14 }}>
              {products.map((p) => (
                <li key={p.catalogNumber}>
                  <Link
                    href={`/products/${encodeURIComponent(p.catalogNumber)}`}
                    style={{ display: 'block', height: '100%', background: '#fff', border: '1px solid #e5e7eb', borderRadius: 10, padding: 16, textDecoration: 'none', color: 'inherit' }}
                  >
                    <span style={{ display: 'block', fontSize: 13, color: '#6b7280' }}>Cat. no. {p.catalogNumber}{p.size ? ` · ${p.size}` : ''}</span>
                    <span style={{ display: 'block', fontWeight: 600, marginTop: 6, color: NAVY }}>{p.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <p style={{ marginTop: 20 }}>
              <Link href={browseHref} style={{ color: NAVY, fontWeight: 600 }}>{browseLabel} →</Link>
            </p>
          </section>
        )}

        <section style={{ marginTop: 48 }}>
          <h2 style={{ fontSize: 26, color: NAVY, margin: '0 0 20px' }}>{currentSlug ? `More ${BRAND} product ranges` : `${BRAND} product ranges in India`}</h2>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))', gap: 12 }}>
            {categories.filter((c) => c.slug !== currentSlug).map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/solarbio/${c.slug}`}
                  style={{ display: 'flex', justifyContent: 'space-between', gap: 8, background: '#fff', border: '1px solid #e5e7eb', borderRadius: 10, padding: '14px 16px', textDecoration: 'none', color: NAVY, fontWeight: 600 }}
                >
                  <span>{BRAND} {displayCategory(c.name)}</span>
                  <span style={{ color: '#6b7280', fontWeight: 400 }}>{c.count.toLocaleString('en-IN')}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section style={{ marginTop: 48, maxWidth: 820 }}>
          <h2 style={{ fontSize: 26, color: NAVY, margin: '0 0 20px' }}>Frequently asked questions</h2>
          {faqs.map((f) => (
            <div key={f.q} style={{ marginBottom: 20 }}>
              <h3 style={{ fontSize: 18, margin: '0 0 6px' }}>{f.q}</h3>
              <p style={{ margin: 0, lineHeight: 1.7 }}>{f.a}</p>
            </div>
          ))}
        </section>
      </div>
    </main>
  );
}
