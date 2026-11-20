import Link from "next/link";
import { cache } from "react";
import prisma from "@/app/lib/prisma";

/**
 * Server-rendered extra content for a product page: full specification table,
 * an overview built from the product's own data, related products and links.
 * Gives each of the ~60k product pages its own crawlable text.
 */

const NAVY = "#2D2B7F";

const clean = (s: string | null | undefined) =>
  (s || "")
    .replace(/<[^>]*>/g, " ")
    .replace(/&times;/g, "×")
    .replace(/&amp;/g, "&")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const SPEC_FIELDS: [string, string][] = [
  ["catalogNumber", "Catalogue number"],
  ["brand", "Brand"],
  ["manufacturer", "Manufacturer"],
  ["subCategory", "Product type"],
  ["size", "Size"],
  ["volume", "Volume"],
  ["material", "Material"],
  ["abTarget", "Target"],
  ["abHost", "Host"],
  ["abCloneType", "Clonality"],
  ["abIsotype", "Isotype"],
  ["abReactivity", "Reactivity"],
  ["abApplicationType", "Applications"],
  ["abDilutionRatio", "Recommended dilution"],
  ["abImmunogen", "Immunogen"],
  ["abPurification", "Purification"],
  ["abCalculatedMw", "Calculated MW"],
  ["abSubcellularLocation", "Subcellular location"],
  ["abGeneId", "Gene ID"],
  ["abSwissProt", "UniProt / Swiss-Prot"],
  ["abStorageBuffer", "Storage buffer"],
  ["elisaReactivity", "Species reactivity"],
  ["elisaSampleType", "Sample type"],
  ["elisaSensitivity", "Sensitivity"],
  ["elisaDetectionRange", "Detection range"],
  ["casNumber", "CAS number"],
  ["purity", "Purity"],
  ["applications", "Applications"],
  ["storage", "Storage"],
  ["mediaExpiry", "Shelf life"],
];

type Row = Record<string, unknown> & {
  id: string;
  catalogNumber: string;
  name: string;
  categoryId: string | null;
  subCategory: string | null;
  category: { name: string; slug: string } | null;
};

const getFull = cache(async (catalogNumber: string) => {
  try {
    return (await prisma.product.findFirst({
      where: { catalogNumber: { equals: catalogNumber, mode: "insensitive" } },
      include: { category: { select: { name: true, slug: true } } },
    })) as unknown as Row | null;
  } catch (e) {
    console.error("product seo details", e);
    return null;
  }
});

const getRelated = cache(async (id: string, categoryId: string | null, subCategory: string | null) => {
  if (!categoryId) return [];
  try {
    const select = { catalogNumber: true, name: true };
    const base = { isActive: true, categoryId, id: { not: id } };
    const same = subCategory
      ? await prisma.product.findMany({ where: { ...base, subCategory }, select, orderBy: [{ isFeatured: "desc" }, { catalogNumber: "asc" }], take: 8 })
      : [];
    if (same.length >= 8) return same;
    const more = await prisma.product.findMany({
      where: { ...base, catalogNumber: { notIn: same.map((s) => s.catalogNumber) } },
      select,
      orderBy: [{ isFeatured: "desc" }, { catalogNumber: "asc" }],
      take: 8 - same.length,
    });
    return [...same, ...more];
  } catch {
    return [];
  }
});

const GUIDES: Record<string, { title: string; href: string }> = {
  "elisa-kits": { title: "How to choose an ELISA kit", href: "/guides/how-to-choose-an-elisa-kit" },
  "biochemical-assay-kits": { title: "How to choose an ELISA kit", href: "/guides/how-to-choose-an-elisa-kit" },
  antibodies: { title: "Polyclonal vs monoclonal vs recombinant antibodies", href: "/guides/polyclonal-vs-monoclonal-vs-recombinant-antibodies" },
  "protein-immunity": { title: "Polyclonal vs monoclonal vs recombinant antibodies", href: "/guides/polyclonal-vs-monoclonal-vs-recombinant-antibodies" },
  "molecular-biology": { title: "Blood genomic DNA extraction with spin columns", href: "/guides/blood-genomic-dna-extraction-spin-column" },
};


function overview(p: Row, name: string, brand: string, categoryName: string) {
  const v = (k: string) => clean(p[k] as string | null);
  const parts: string[] = [];
  const range = v("subCategory") && !/uncategori|general/i.test(v("subCategory")) ? v("subCategory") : "";
  parts.push(`${name} (catalogue no. ${p.catalogNumber}) is ${brand ? `a ${brand} product` : "a research product"}${categoryName ? ` in our ${categoryName.toLowerCase()} range` : ""}${range && range.toLowerCase() !== categoryName.toLowerCase() ? ` (${range})` : ""}, supplied in India by Sri Saradi Scientific, Hyderabad.`);
  if (v("abHost") || v("abCloneType")) {
    parts.push(
      `It is ${[v("abHost") && `raised in ${v("abHost").toLowerCase()}`, v("abCloneType") && `${v("abCloneType").toLowerCase().replace(/ antibody$/, "")} antibody`].filter(Boolean).join(", ")}${v("abReactivity") ? ` and reacts with ${v("abReactivity")} samples` : ""}.`,
    );
  }
  if (v("abApplicationType")) parts.push(`Validated applications: ${v("abApplicationType")}${v("abDilutionRatio") ? ` (recommended dilution ${v("abDilutionRatio")})` : ""}.`);
  if (v("elisaSampleType") || v("elisaSensitivity")) {
    parts.push(
      [v("elisaSampleType") && `The kit is validated for ${v("elisaSampleType")}.`, v("elisaSensitivity") && `Sensitivity is ${v("elisaSensitivity")}${v("elisaDetectionRange") ? ` with a detection range of ${v("elisaDetectionRange")}` : ""}.`]
        .filter(Boolean)
        .join(" "),
    );
  }
  if (v("casNumber") || v("purity")) parts.push([v("casNumber") && `CAS number ${v("casNumber")}.`, v("purity") && `Purity: ${v("purity")}.`].filter(Boolean).join(" "));
  if (v("storage")) parts.push(`Storage: ${v("storage").replace(/^store\s*(at)?\s*/i, "")}`);
  parts.push("A datasheet and certificate of analysis are available on request. We quote in INR with a GST invoice and deliver across India, with cold-chain shipping where required.");
  return parts.map((t) => t.replace(/\.{2,}/g, ".").replace(/([^.!?])$/, "$1."));
}

const td = { border: "1px solid #e5e7eb", padding: "10px 12px", verticalAlign: "top" as const, textAlign: "left" as const, fontSize: 14 };

export default async function ProductSeoDetails({ catalogNumber }: { catalogNumber: string }) {
  const p = await getFull(catalogNumber);
  if (!p) return null;
  const name = clean(p.name);
  const brand = clean((p.brand as string) || (p.manufacturer as string));
  const categoryName = p.category ? p.category.name.replace(/Protiens/i, "Proteins") : "";
  const specs = SPEC_FIELDS.map(([k, label]) => [label, clean(p[k] as string | null)] as const).filter(([, val]) => val && val.length < 400);
  const seen = new Set<string>();
  const uniqueSpecs = specs.filter(([label, val]) => (seen.has(label + val) ? false : (seen.add(label + val), true)));
  const related = await getRelated(p.id, p.categoryId, p.subCategory);
  const slug = p.category?.slug;
  const isSolarbio = /solarbio/i.test(brand);
  const guide = slug ? GUIDES[slug] : undefined;

  return (
    <section style={{ maxWidth: 1200, margin: "0 auto", padding: "8px 20px 56px", color: "#1f2937" }}>
      <div style={{ display: "grid", gap: 32, gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))" }}>
        <div>
          <h2 style={{ fontSize: 22, color: NAVY, margin: "0 0 14px" }}>About {name}</h2>
          {overview(p, name, brand, categoryName).map((t, i) => (
            <p key={i} style={{ lineHeight: 1.7, margin: "0 0 12px", fontSize: 15 }}>{t}</p>
          ))}
          {(isSolarbio && slug) || guide ? (
            <ul style={{ paddingLeft: 20, lineHeight: 1.9, margin: "12px 0 0", listStyle: "disc", fontSize: 15 }}>
              {isSolarbio && slug && (
                <li><Link href={`/solarbio/${slug}`} style={{ color: NAVY, fontWeight: 600 }}>All Solarbio {categoryName} in India</Link></li>
              )}
              {guide && (
                <li>Buyer’s guide: <Link href={guide.href} style={{ color: NAVY, fontWeight: 600 }}>{guide.title}</Link></li>
              )}
            </ul>
          ) : null}
        </div>
        {uniqueSpecs.length > 0 && (
          <div>
            <h2 style={{ fontSize: 22, color: NAVY, margin: "0 0 14px" }}>Specifications</h2>
            <div style={{ overflowX: "auto" }}>
              <table style={{ borderCollapse: "collapse", width: "100%", background: "#fff" }}>
                <tbody>
                  {uniqueSpecs.map(([label, val]) => (
                    <tr key={label + val}>
                      <th scope="row" style={{ ...td, background: "#f3f4f6", width: "38%", fontWeight: 600 }}>{label}</th>
                      <td style={td}>{val}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {related.length > 0 && (
        <div style={{ marginTop: 40 }}>
          <h2 style={{ fontSize: 22, color: NAVY, margin: "0 0 14px" }}>Related products</h2>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: 12 }}>
            {related.map((r) => (
              <li key={r.catalogNumber}>
                <Link
                  href={`/products/${encodeURIComponent(r.catalogNumber)}`}
                  style={{ display: "block", height: "100%", background: "#fff", border: "1px solid #e5e7eb", borderRadius: 10, padding: 14, textDecoration: "none", color: "inherit" }}
                >
                  <span style={{ display: "block", fontSize: 12, color: "#6b7280" }}>Cat. no. {r.catalogNumber}</span>
                  <span style={{ display: "block", fontWeight: 600, marginTop: 4, color: NAVY, fontSize: 14 }}>{clean(r.name)}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
