export const catalogues = [
  {
    brand: "Solarbio",
    subtitle: "Life Sciences",
    slug: "solarbio",
    title: "Reagents, antibodies & kits",
    description:
      "Molecular biology, biochemical research and assay products. Ask for the datasheet, relevant COA and available product citations.",
    action: "Discuss a reagent or kit",
    category: "molecular",
    color: "#34398a",
    pdfUrl: "/assets/solarbio-catalogue.pdf",
    pdfName: "Solarbio",
    documents: [
      { title: "Solarbio Hot Sell Products", pdfUrl: "/assets/solarbio hot sell product (1).pdf" },
      { title: "Small Molecular Compounds", pdfUrl: "/assets/small molecular compounds.pdf" },
      { title: "Recombinant Protein", pdfUrl: "/assets/Recombinant protein.pdf" },
      { title: "Peptide", pdfUrl: "/assets/Peptide.pdf" },
      { title: "Molecular Biology", pdfUrl: "/assets/molecular biology.pdf" },
      { title: "Histological Staining", pdfUrl: "/assets/histological staining.pdf" },
      { title: "ELISA Kits", pdfUrl: "/assets/ELISA kits.pdf" },
      { title: "Cell Separation Medium Kits", pdfUrl: "/assets/cell separation medium kits.pdf" },
      { title: "Cell Culture", pdfUrl: "/assets/Cell culture.pdf" },
      { title: "Biochemical Reagent", pdfUrl: "/assets/Biochemical Reagent.pdf" },
      { title: "Biochemical Assay Kits", pdfUrl: "/assets/biochemical assay kits.pdf" },
      { title: "Apoptosis Kits", pdfUrl: "/assets/Apoptosis_Kits.pdf" },
      { title: "Antibody", pdfUrl: "/assets/antibody.pdf" },
    ],
  },
  {
    brand: "Orient",
    subtitle: "Filtr",
    slug: "orientfiltr",
    title: "Lab & process filtration",
    description:
      "Discuss sample preparation or process conditions before selecting a membrane, syringe filter, capsule or cartridge.",
    action: "Discuss filtration",
    category: "filter",
    color: "#006fab",
    pdfUrl: "/assets/orientfiltr-catalogue.pdf",
    pdfName: "Orient Filtr",
    documents: [
      {
        title: "Orientfiltr Lab Filtration Products Catalog 2026",
        pdfUrl: "/assets/Orientfiltr Lab Filtration Products Catalog 2026.pdf",
      },
    ],
  },
  {
    brand: "Galactics",
    subtitle: "GenFollower",
    slug: "galactics",
    title: "Specialist biological plasticware",
    description:
      "Application-specific pipette tips, molecular biology consumables, cell culture formats and harder-to-source biological labware. Review the exact product's compatibility and quality specifications for your experiment.",
    action: "Discuss biological plasticware",
    category: "plasticware",
    color: "#446e37",
    pdfUrl: "/assets/galactics-catalogue.pdf",
    pdfName: "GenFollower",
  },
];

export type Catalogue = (typeof catalogues)[number];
