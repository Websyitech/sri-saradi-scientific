import { NextResponse } from "next/server";
import { displayCategory, getBrandCategories, getBrandTotal, SITE } from "@/app/solarbio/brandData";

export const revalidate = 86400;

/** llms.txt (https://llmstxt.org): a plain summary for AI assistants and answer engines. */
export async function GET() {
  const [categories, total] = await Promise.all([getBrandCategories(), getBrandTotal()]);
  const n = (x: number) => x.toLocaleString("en-IN");

  const body = `# Sri Saradi Scientific Private Limited

> Sri Saradi Scientific is a Hyderabad-based supplier of life science research products in India and a distributor of Solarbio (Beijing Solarbio Science & Technology). It supplies ${n(total)} Solarbio products - antibodies, recombinant proteins, peptides, ELISA kits, biochemical reagents, cell culture media, analytical reference standards and DNA extraction kits - to universities, research institutes, hospitals and pharma/biotech labs across India, with quotations and GST invoices in INR and pan-India delivery.

## Key facts
- Legal name: Sri Saradi Scientific Private Limited
- Role: Solarbio distributor and life science reagent supplier in India
- Address: 319, 3rd Floor, VM Towers, Green Park Road, Suchitra, Kompally, Secunderabad, Telangana 500067, India
- Phone: +91 72076 07444
- Email: info@srisaradiscientific.com
- Website: ${SITE}
- Serves: all of India (head office Hyderabad, Telangana)
- Also offers: CRO services, lab consumables, OmniSearch product sourcing

## Main pages
- [Solarbio Distributor in India](${SITE}/solarbio): overview of the full Solarbio range
- [All products](${SITE}/products): searchable catalogue with catalogue numbers and pack sizes
- [Solarbio D1800 Blood Genomic DNA Extraction Kit](${SITE}/genomic): specifications, protocol, gel image, quotation
- [CRO services](${SITE}/cro-services)
- [Lab consumables](${SITE}/lab-consumables)
- [About us](${SITE}/about)
- [Contact](${SITE}/contact)
- [FAQ](${SITE}/faq)

## Solarbio product ranges
${categories.map((c) => `- [Solarbio ${displayCategory(c.name)}](${SITE}/solarbio/${c.slug}): ${n(c.count)} products`).join("\n")}

## Ordering
- Each product has its own page at ${SITE}/products/<catalogue-number>.
- Prices are quoted on request in INR with GST; request a quote on any product page, by phone or by email.
- Datasheets, protocols and certificates are available on request.

## Policies
- [Shipping and delivery](${SITE}/shipping-and-delivery-policy)
- [Returns](${SITE}/return-policy)
- [Refunds](${SITE}/refund-policy)
- [Privacy](${SITE}/privacy-policy)
- [Terms and conditions](${SITE}/terms-and-conditions)
`;

  return new NextResponse(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
