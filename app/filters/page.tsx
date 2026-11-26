import type { Metadata } from "next";
import Link from "next/link";
import { PAGES, skusFor } from "./data";

const title = "Lab Filters Supplier in India | Syringe, Membrane, Capsule";
const description = "Orient Filtr syringe filters, membrane and gridded filters, cartridge and capsule filters for labs and process in India. INR quotes with GST invoice.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/filters" },
  openGraph: { title, description, url: "/filters", type: "website" },
};

const NAVY = "#2D2B7F";

export default function FiltersHub() {
  return (
    <main style={{ background: "#f7f8fc", color: "#1f2937", minHeight: "60vh" }}>
      <section style={{ background: NAVY, color: "#fff", padding: "56px 20px 44px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <h1 style={{ fontSize: "clamp(28px, 4vw, 42px)", margin: "0 0 12px" }}>Lab and Process Filters in India</h1>
          <p style={{ fontSize: 18, margin: 0, opacity: 0.9, maxWidth: 760 }}>
            Orient Filtr syringe filters, membrane discs, gridded membranes, cartridge and capsule filters, supplied by Sri Saradi Scientific, Hyderabad, with delivery across India.
          </p>
        </div>
      </section>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "40px 20px 64px" }}>
        <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 16 }}>
          {PAGES.map((p) => {
            const n = skusFor(p).length;
            return (
              <li key={p.slug}>
                <Link href={`/filters/${p.slug}`} style={{ display: "block", height: "100%", background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12, padding: 20, textDecoration: "none", color: "inherit" }}>
                  <h2 style={{ fontSize: 20, color: NAVY, margin: "0 0 8px" }}>{p.h1}</h2>
                  <p style={{ margin: "0 0 8px", lineHeight: 1.6, fontSize: 15 }}>{p.description}</p>
                  {n > 0 && <span style={{ fontSize: 13, color: "#6b7280" }}>{n} part numbers</span>}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </main>
  );
}
