import skus from "../../public/us-lab-filters/skus.json";

/**
 * India landing pages for Orient Filtr lab and process filters.
 * Syringe, disc and gridded SKUs come from public/us-lab-filters/skus.json.
 * Cartridge and capsule ranges come from the Orient Filtr process catalogue
 * (public/assets/orientfiltr-catalogue.pdf), which lists series, not SKUs.
 */

export type Sku = { id: string; description: string; family: string; pack: number };
export const SKUS = skus as Sku[];

export type FilterPage = {
  slug: string;
  keyword: string;
  title: string;
  description: string;
  h1: string;
  intro: string[];
  skus?: (s: Sku) => boolean;
  ranges?: { name: string; detail: string }[];
  specs?: [string, string][];
  faqs: { q: string; a: string }[];
  related: string[];
};

const has = (s: Sku, re: RegExp) => re.test(s.description);

const ORDER = "Sri Saradi Scientific, Hyderabad, quotes in INR with GST invoice and delivers across India. Send the part number and quantity for a quotation.";

export const PAGES: FilterPage[] = [
  {
    slug: "syringe-filters",
    keyword: "Syringe filters",
    title: "Syringe Filters Supplier in India | Nylon, PVDF, PES, PTFE",
    description: "Syringe filters in Nylon, PVDF, PES, PTFE and CA, 13 and 25 mm, 0.22 and 0.45 µm, sterile and non-sterile. Orient Filtr, supplied across India with GST invoice.",
    h1: "Syringe Filters in India",
    intro: [
      "Orient Filtr syringe filters for HPLC sample preparation, sterile filtration of buffers and media, and clarification of aqueous and organic samples. Available in Nylon, hydrophilic and hydrophobic PVDF, PES, hydrophilic and hydrophobic PTFE and cellulose acetate.",
      "Choose 13 mm for sample volumes up to about 10 mL and 25 mm for up to about 100 mL. Use 0.22 µm for sterilisation and UHPLC columns, 0.45 µm for routine clarification and HPLC. Standard (injection-moulded) and welded housings are both available, in packs of 100.",
    ],
    skus: (s) => s.family === "syringe" || s.family === "sterile",
    specs: [
      ["Membranes", "Nylon, PVDF (hydrophilic / hydrophobic), PES, PTFE (hydrophilic / hydrophobic), CA"],
      ["Diameters", "13 mm, 25 mm, 30 mm (sterile CA)"],
      ["Pore sizes", "0.22 µm, 0.45 µm"],
      ["Housing", "Medical-grade polypropylene; standard or welded"],
      ["Sterility", "Non-sterile and gamma-sterilised, individually packed"],
      ["Pack size", "100 filters"],
    ],
    faqs: [
      { q: "Which syringe filter membrane should I use?", a: "Nylon for most aqueous and organic HPLC samples; hydrophilic PVDF or PES for protein and biological samples (low protein binding); hydrophobic PTFE for aggressive organic solvents and gases; CA for aqueous solutions and culture media." },
      { q: "0.22 µm or 0.45 µm?", a: "0.22 µm removes bacteria and is used for sterile filtration and for UHPLC columns with sub-2 µm particles. 0.45 µm is enough for routine particle removal before HPLC." },
      { q: "What is the difference between standard and welded syringe filters?", a: "Welded filters have the two housing halves ultrasonically sealed with no adhesive, which lowers extractables and lets them take higher pressure. Standard filters are injection-moulded and cost less." },
      { q: "How do I order syringe filters in India?", a: ORDER },
    ],
    related: ["nylon-syringe-filters", "pvdf-syringe-filters", "uplc-certified-syringe-filters", "membrane-filters-for-lcms"],
  },
  {
    slug: "nylon-syringe-filters",
    keyword: "Nylon syringe filters",
    title: "Nylon Syringe Filters 0.22 / 0.45 µm, 13 & 25 mm | India",
    description: "Nylon syringe filters for HPLC sample prep: 13 and 25 mm, 0.22 and 0.45 µm, standard and welded housings, packs of 100. Orient Filtr, supplied across India.",
    h1: "Nylon Syringe Filters",
    intro: [
      "Nylon is naturally hydrophilic, so it wets with water and most organic solvents without pre-wetting. That makes Nylon syringe filters the usual first choice for HPLC sample preparation and for filtering mixed aqueous–organic samples.",
      "Avoid Nylon for protein samples, as it binds protein, and for strong acids. For those, use PVDF or PES.",
    ],
    skus: (s) => has(s, /Nylon/),
    specs: [
      ["Membrane", "Hydrophilic Nylon 66"],
      ["Diameters", "13 mm, 25 mm"],
      ["Pore sizes", "0.22 µm, 0.45 µm"],
      ["Housing", "Polypropylene; standard or welded"],
      ["Typical use", "HPLC sample prep, dissolution testing, aqueous and organic solvents"],
    ],
    faqs: [
      { q: "Do Nylon syringe filters need pre-wetting?", a: "No. Nylon 66 is hydrophilic and wets directly with aqueous and most organic samples." },
      { q: "Can I use Nylon filters for protein samples?", a: "Not recommended: Nylon has high protein binding. Use hydrophilic PVDF or PES for proteins and peptides." },
      { q: "How do I order Nylon syringe filters in India?", a: ORDER },
    ],
    related: ["syringe-filters", "pvdf-syringe-filters", "uplc-certified-syringe-filters"],
  },
  {
    slug: "pvdf-syringe-filters",
    keyword: "PVDF syringe filters",
    title: "PVDF Syringe Filters, Hydrophilic & Hydrophobic | India",
    description: "Hydrophilic and hydrophobic PVDF syringe filters, 13 and 25 mm, 0.22 and 0.45 µm, sterile and non-sterile. Low protein binding. Orient Filtr, supplied across India.",
    h1: "PVDF Syringe Filters",
    intro: [
      "Hydrophilic PVDF has very low protein binding and broad chemical resistance, so it suits protein and peptide samples, biological fluids and dissolution testing as well as general HPLC.",
      "Hydrophobic PVDF is used for gases, venting and organic solvents; pre-wet it with alcohol before filtering aqueous samples. Both types come sterile (gamma-irradiated, individually packed) or non-sterile.",
    ],
    skus: (s) => has(s, /PVDF/),
    specs: [
      ["Membrane", "Hydrophilic PVDF, hydrophobic PVDF"],
      ["Diameters", "13 mm, 25 mm"],
      ["Pore sizes", "0.22 µm, 0.45 µm"],
      ["Sterility", "Non-sterile and gamma-sterilised"],
      ["Typical use", "Protein samples, biological fluids, HPLC, venting (hydrophobic)"],
    ],
    faqs: [
      { q: "Hydrophilic or hydrophobic PVDF?", a: "Hydrophilic PVDF for aqueous and biological samples; hydrophobic PVDF for gases, air venting and organic solvents." },
      { q: "Are PVDF syringe filters good for proteins?", a: "Yes. Hydrophilic PVDF has among the lowest protein binding of syringe filter membranes, giving high sample recovery." },
      { q: "How do I order PVDF syringe filters in India?", a: ORDER },
    ],
    related: ["syringe-filters", "nylon-syringe-filters", "membrane-filters-for-lcms"],
  },
  {
    slug: "uplc-certified-syringe-filters",
    keyword: "UPLC certified syringe filters",
    title: "Syringe Filters for UPLC & HPLC, 0.22 µm | India",
    description: "0.22 µm syringe filters for UPLC and UHPLC sample prep: Nylon, PVDF, PES and PTFE, welded low-extractable housings. HPLC-certified options. Supplied across India.",
    h1: "Syringe Filters for UPLC and HPLC",
    intro: [
      "UPLC and UHPLC columns packed with sub-2 µm particles need samples filtered at 0.22 µm to protect the column frit and extend column life. Orient Filtr offers 0.22 µm syringe filters in Nylon, PVDF, PES and PTFE, with HPLC-certified (low-UV-extractable) membranes.",
      "For the lowest background, choose welded syringe filters: the housing is sealed without adhesive. Ask us for the certificate of analysis and certification details for the specific part number you need.",
    ],
    skus: (s) => /0\.22/.test(s.description) && (s.family === "syringe" || s.family === "sterile"),
    specs: [
      ["Pore size", "0.22 µm (recommended for sub-2 µm columns)"],
      ["Membranes", "Nylon, PVDF, PES, PTFE"],
      ["Diameters", "13 mm (≤10 mL), 25 mm (≤100 mL)"],
      ["Low extractables", "Welded housings, no adhesive"],
      ["Certification", "HPLC-certified membranes; CoA on request"],
    ],
    faqs: [
      { q: "Which pore size do I need for UPLC?", a: "0.22 µm. UPLC/UHPLC columns use sub-2 µm particles and tighter frits, so 0.45 µm filters may let through particles that block the column." },
      { q: "Are these filters UPLC certified?", a: "The membranes are certified for HPLC (low UV extractables). Ask us for the certificate for your part number before ordering for a validated UPLC method." },
      { q: "How do I order in India?", a: ORDER },
    ],
    related: ["syringe-filters", "membrane-filters-for-lcms", "nylon-syringe-filters"],
  },
  {
    slug: "membrane-filters-for-lcms",
    keyword: "Membrane filters for LCMS application",
    title: "Membrane & Syringe Filters for LC-MS | India",
    description: "Low-extractable filters for LC-MS sample and mobile-phase prep: PTFE, PVDF, PES and Nylon syringe filters and 47 mm membrane discs. Orient Filtr, supplied across India.",
    h1: "Membrane Filters for LC-MS Applications",
    intro: [
      "LC-MS is sensitive to anything a filter adds to the sample: extractables from adhesives or housings show up as background ions. For LC-MS, use welded syringe filters (no adhesive) with PTFE, PVDF or PES membranes, and filter mobile phases through 47 mm membrane discs.",
      "Hydrophilic PTFE handles both aqueous and organic samples without pre-wetting; PVDF and PES give low protein binding for bioanalytical work. Ask us for extractables data and the CoA for the part numbers you shortlist.",
    ],
    skus: (s) => (s.family === "syringe" && /Welded/.test(s.description) && /PTFE|PVDF|PES/.test(s.description)) || (s.family === "disc" && /47 mm/.test(s.description)),
    specs: [
      ["Syringe filters", "Welded PTFE, PVDF and PES, 13 and 25 mm, 0.22 / 0.45 µm"],
      ["Membrane discs", "PES, CA and MCE, 47 mm and 142 mm"],
      ["Why welded", "No adhesive, lower extractables and background ions"],
    ],
    faqs: [
      { q: "Which filter is best for LC-MS?", a: "Welded hydrophilic PTFE or PVDF syringe filters at 0.22 µm are a safe default. They work with aqueous and organic samples and add very little background." },
      { q: "How should I filter LC-MS mobile phases?", a: "Use 47 mm membrane discs in a vacuum filtration setup: PTFE or Nylon for organic solvents, PES or CA for aqueous buffers." },
      { q: "How do I order in India?", a: ORDER },
    ],
    related: ["uplc-certified-syringe-filters", "syringe-filters", "gridded-membrane-filters"],
  },
  {
    slug: "gridded-membrane-filters",
    keyword: "Gridded membrane filters",
    title: "Gridded MCE Membrane Filters 47 mm 0.45 µm | India",
    description: "Sterile MCE gridded membrane filters, 47 mm, 0.45 µm, black/white or white/black grid, individual or continuous packing. For colony counting. Supplied across India.",
    h1: "Gridded Membrane Filters",
    intro: [
      "Gridded MCE (mixed cellulose ester) membranes are used for microbiological testing of water, beverages and pharmaceutical products: filter the sample, place the membrane on agar, and count colonies against the printed grid.",
      "Orient Filtr gridded membranes are 47 mm, 0.45 µm, gamma-sterilised, with a black grid on white or a white grid on black (for light-coloured colonies). Individual or continuous (dispenser) packing, 100 per pack.",
    ],
    skus: (s) => s.family === "grid",
    specs: [
      ["Membrane", "Mixed cellulose ester (MCE)"],
      ["Diameter / pore", "47 mm, 0.45 µm"],
      ["Grid", "Black grid on white, or white grid on black"],
      ["Sterility", "Sterile, individually or continuously packed"],
      ["Pack size", "100 membranes"],
    ],
    faqs: [
      { q: "What are gridded membrane filters used for?", a: "Membrane filtration microbiology: total coliforms, E. coli and total viable counts in water, food and beverage, and pharmaceutical bioburden testing." },
      { q: "Black or white grid?", a: "A white membrane with a black grid suits most coloured colonies. A black membrane with a white grid makes white or light colonies easier to count." },
      { q: "How do I order gridded membranes in India?", a: ORDER },
    ],
    related: ["membrane-filters-for-lcms", "capsule-filters", "syringe-filters"],
  },
  {
    slug: "cartridge-filters",
    keyword: "Cartridge filters",
    title: "Cartridge Filters: Pleated, Membrane & High Flow | India",
    description: "Orient Filtr cartridge filters: PES, PTFE, PVDF and Nylon membrane, PP pleated, melt blown, high-flow and stainless steel. For pharma, water and chemicals, across India.",
    h1: "Cartridge Filters",
    intro: [
      "Orient Filtr makes cartridge filters for process filtration in pharmaceuticals, biotech, fermentation, food and beverage, fine chemicals and water treatment. Ranges cover final sterile filtration, pre-filtration and high-flow clarification.",
      "Cartridges come in standard lengths with a choice of end caps and O-ring materials such as silicone and Viton. Send us your flow rate, fluid, length and housing type and we will recommend a cartridge and quote it.",
    ],
    ranges: [
      { name: "PES membrane cartridges", detail: "Sterilising-grade, low protein binding; for liquids, media and buffers" },
      { name: "PTFE membrane cartridges", detail: "Hydrophobic; for gas, air and vent filtration and aggressive solvents" },
      { name: "Hydrophilic PVDF cartridges", detail: "Low protein binding and high flow" },
      { name: "Nylon 66 / charged Nylon cartridges", detail: "For water and chemical filtration; positively charged option" },
      { name: "PP pleated and multi-layer PP cartridges", detail: "Pre-filtration and clarification" },
      { name: "Melt blown and string wound cartridges", detail: "Economical depth filtration for water and sediment" },
      { name: "Glass fibre cartridges", detail: "High dirt-holding pre-filters" },
      { name: "High-flow cartridges", detail: "Large-diameter, fewer cartridges per housing" },
      { name: "Stainless steel cartridges", detail: "Reusable, high temperature" },
    ],
    faqs: [
      { q: "Which cartridge filter do I need for sterile filtration?", a: "A 0.22 µm PES membrane cartridge for liquids, and a hydrophobic PTFE cartridge for air and gas venting. Both are integrity-testable." },
      { q: "Are the materials pharma-compliant?", a: "Orient Filtr states that its cartridge materials meet NSF and FDA requirements and have low extractables. Ask for the validation guide and CoA for your part number." },
      { q: "How do I order cartridge filters in India?", a: "Send the length, micron rating, end-cap code, O-ring material and quantity. " + ORDER },
    ],
    related: ["capsule-filters", "syringe-filters", "gridded-membrane-filters"],
  },
  {
    slug: "capsule-filters",
    keyword: "Capsule filters",
    title: "Capsule Filters: PES, PTFE, PVDF, Nylon & PP | India",
    description: "Single-use capsule filters in sterile-grade PES, PTFE, PVDF, Nylon 66 and PP, each integrity tested. Plus 50 mm PTFE venting filters. Orient Filtr, supplied across India.",
    h1: "Capsule Filters",
    intro: [
      "Capsule filters are single-use, self-contained units: the membrane is sealed in a polypropylene housing, so there is no stainless housing to clean or validate. They suit small-batch pharmaceutical and biotech work, media and buffer filtration, and lab-scale process steps.",
      "Every Orient Filtr capsule is integrity tested. For venting bioreactors, fermenters and carboys there is also a 50 mm hydrophobic PTFE disc capsule (venting filter), sterile or non-sterile, in 0.22 and 0.45 µm.",
    ],
    skus: (s) => /Venting/.test(s.description),
    ranges: [
      { name: "Sterile-grade PES capsules", detail: "Media, buffers and biological liquids; low protein binding" },
      { name: "Hydrophobic PTFE capsules", detail: "Air, gas and solvent filtration; venting" },
      { name: "Hydrophilic PVDF capsules", detail: "Low protein binding, high flow" },
      { name: "Nylon 66 / charged Nylon capsules", detail: "Water and chemical filtration" },
      { name: "Absolute PP capsules", detail: "Pre-filtration and clarification" },
      { name: "50 mm PTFE venting filter (VPTB series)", detail: "0.22 / 0.45 µm, sterile or non-sterile, packs of 20" },
    ],
    faqs: [
      { q: "Capsule filter or cartridge filter?", a: "Capsules are disposable and need no housing, so they suit small batches and avoid cleaning validation. Cartridges are cheaper per litre for large, repeated runs." },
      { q: "Are capsule filters integrity tested?", a: "Yes. Orient Filtr integrity tests 100% of its capsule filters." },
      { q: "How do I order capsule filters in India?", a: "Send the membrane, pore size, connection type and quantity. " + ORDER },
    ],
    related: ["cartridge-filters", "gridded-membrane-filters", "syringe-filters"],
  },
];

// The capsule page lists the 50 mm venting filters from the lab catalogue.
export const VENTING: Sku[] = [
  { id: "VPTB5022N", description: "Non-Sterile Venting Filter, PTFE, 50 mm, 0.22 µm", family: "venting", pack: 20 },
  { id: "VPTB5045N", description: "Non-Sterile Venting Filter, PTFE, 50 mm, 0.45 µm", family: "venting", pack: 20 },
  { id: "VPTB5022S", description: "Sterile Venting Filter, PTFE, 50 mm, 0.22 µm", family: "venting", pack: 20 },
  { id: "VPTB5045S", description: "Sterile Venting Filter, PTFE, 50 mm, 0.45 µm", family: "venting", pack: 20 },
];

export const getPage = (slug: string) => PAGES.find((p) => p.slug === slug);
export const skusFor = (p: FilterPage) => (p.skus ? [...SKUS, ...VENTING].filter(p.skus) : []);
