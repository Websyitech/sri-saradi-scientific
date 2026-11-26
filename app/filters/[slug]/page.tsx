import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PAGES, getPage, skusFor } from "../data";

const SITE = "https://srisaradiscientific.com";
const NAVY = "#2D2B7F";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export function generateStaticParams() {
  return PAGES.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = getPage((await params).slug);
  if (!p) return {};
  const url = `/filters/${p.slug}`;
  return {
    title: p.title,
    description: p.description,
    alternates: { canonical: url },
    openGraph: { title: p.title, description: p.description, url, type: "website" },
  };
}

const cell = { border: "1px solid #e5e7eb", padding: "9px 12px", textAlign: "left" as const, verticalAlign: "top" as const, fontSize: 14 };

export default async function FilterPage({ params }: Props) {
  const p = getPage((await params).slug);
  if (!p) notFound();
  const items = skusFor(p);
  const url = `${SITE}/filters/${p.slug}`;
  const related = p.related.map(getPage).filter((x): x is NonNullable<typeof x> => !!x);

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: p.h1,
      url,
      description: p.description,
      about: { "@type": "Brand", name: "Orient Filtr" },
      provider: { "@id": `${SITE}/#organization` },
      ...(items.length
        ? {
            mainEntity: {
              "@type": "ItemList",
              numberOfItems: items.length,
              itemListElement: items.map((s, i) => ({ "@type": "ListItem", position: i + 1, name: `${s.description} (${s.id})` })),
            },
          }
        : {}),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE },
        { "@type": "ListItem", position: 2, name: "Lab Filters", item: `${SITE}/filters` },
        { "@type": "ListItem", position: 3, name: p.h1, item: url },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: p.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    },
  ];

  return (
    <main style={{ background: "#f7f8fc", color: "#1f2937" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section style={{ background: NAVY, color: "#fff", padding: "52px 20px 44px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <nav aria-label="Breadcrumb" style={{ fontSize: 14, opacity: 0.85, marginBottom: 14 }}>
            <Link href="/" style={{ color: "#fff" }}>Home</Link> / <Link href="/filters" style={{ color: "#fff" }}>Lab Filters</Link> / <span>{p.h1}</span>
          </nav>
          <h1 style={{ fontSize: "clamp(28px, 4vw, 40px)", margin: "0 0 12px", lineHeight: 1.2 }}>{p.h1}</h1>
          <p style={{ fontSize: 18, margin: 0, opacity: 0.9, maxWidth: 760 }}>
            Orient Filtr filters supplied by Sri Saradi Scientific, Hyderabad — INR quotation with GST invoice and delivery across India.
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 22 }}>
            <Link href="/contact" style={{ background: "#fff", color: NAVY, padding: "12px 22px", borderRadius: 8, fontWeight: 600, textDecoration: "none" }}>Request a quotation</Link>
            <a href="/assets/Orientfiltr Lab Filtration Products Catalog 2026.pdf" style={{ border: "1px solid #fff", color: "#fff", padding: "12px 22px", borderRadius: 8, fontWeight: 600, textDecoration: "none" }}>Download catalogue (PDF)</a>
          </div>
        </div>
      </section>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "36px 20px 64px" }}>
        <section style={{ maxWidth: 820 }}>
          {p.intro.map((t, i) => <p key={i} style={{ fontSize: 17, lineHeight: 1.7, margin: "0 0 16px" }}>{t}</p>)}
        </section>

        {p.specs && (
          <section style={{ marginTop: 32, maxWidth: 820 }}>
            <h2 style={{ fontSize: 24, color: NAVY, margin: "0 0 14px" }}>Specifications</h2>
            <table style={{ borderCollapse: "collapse", width: "100%", background: "#fff" }}>
              <tbody>
                {p.specs.map(([k, v]) => (
                  <tr key={k}><th scope="row" style={{ ...cell, background: "#f3f4f6", width: "32%" }}>{k}</th><td style={cell}>{v}</td></tr>
                ))}
              </tbody>
            </table>
          </section>
        )}

        {p.ranges && (
          <section style={{ marginTop: 32 }}>
            <h2 style={{ fontSize: 24, color: NAVY, margin: "0 0 14px" }}>Available ranges</h2>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 12 }}>
              {p.ranges.map((r) => (
                <li key={r.name} style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 10, padding: 16 }}>
                  <strong style={{ color: NAVY }}>{r.name}</strong>
                  <span style={{ display: "block", marginTop: 4, fontSize: 14, color: "#4b5563" }}>{r.detail}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {items.length > 0 && (
          <section style={{ marginTop: 32 }}>
            <h2 style={{ fontSize: 24, color: NAVY, margin: "0 0 14px" }}>Part numbers ({items.length})</h2>
            <div style={{ overflowX: "auto" }}>
              <table style={{ borderCollapse: "collapse", width: "100%", background: "#fff" }}>
                <thead><tr><th style={{ ...cell, background: "#f3f4f6" }}>Part number</th><th style={{ ...cell, background: "#f3f4f6" }}>Description</th><th style={{ ...cell, background: "#f3f4f6" }}>Pack</th></tr></thead>
                <tbody>
                  {items.map((s) => (
                    <tr key={s.id}><td style={{ ...cell, fontWeight: 600, whiteSpace: "nowrap" }}>{s.id}</td><td style={cell}>{s.description}</td><td style={{ ...cell, whiteSpace: "nowrap" }}>{s.pack} pcs</td></tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        <section style={{ marginTop: 40, maxWidth: 820 }}>
          <h2 style={{ fontSize: 24, color: NAVY, margin: "0 0 16px" }}>Frequently asked questions</h2>
          {p.faqs.map((f) => (
            <div key={f.q} style={{ marginBottom: 18 }}>
              <h3 style={{ fontSize: 18, margin: "0 0 6px" }}>{f.q}</h3>
              <p style={{ margin: 0, lineHeight: 1.7 }}>{f.a}</p>
            </div>
          ))}
        </section>

        <nav aria-label="Related filters" style={{ marginTop: 36 }}>
          <h2 style={{ fontSize: 20, margin: "0 0 12px" }}>Related filters</h2>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexWrap: "wrap", gap: 10 }}>
            {related.map((r) => (
              <li key={r.slug}><Link href={`/filters/${r.slug}`} style={{ display: "inline-block", background: "#fff", border: "1px solid #e5e7eb", borderRadius: 999, padding: "8px 16px", color: NAVY, fontWeight: 600, textDecoration: "none" }}>{r.keyword}</Link></li>
            ))}
            <li><Link href="/filters" style={{ display: "inline-block", padding: "8px 16px", color: NAVY }}>All lab filters →</Link></li>
          </ul>
        </nav>
      </div>
    </main>
  );
}
