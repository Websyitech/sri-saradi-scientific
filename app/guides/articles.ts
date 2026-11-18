/**
 * Product guide articles. Each block renders as a paragraph, a list, a table or a sub-heading.
 * Keep claims general and verifiable; product-specific numbers come from the manufacturer protocol or live data.
 */
export type Block =
  | { p: string }
  | { ul: string[] }
  | { ol: string[] }
  | { h3: string }
  | { table: { head: string[]; rows: string[][] } }
  | { note: string };

export type Section = { h2: string; blocks: Block[] };

export type Article = {
  slug: string;
  title: string; // <h1> and schema headline
  metaTitle: string; // <title>, kept under ~60 chars
  description: string; // meta description, under 160 chars
  summary: string; // index card text
  published: string; // ISO date
  updated: string;
  readMinutes: number;
  related: { label: string; href: string }[];
  sections: Section[];
  faqs: { q: string; a: string }[];
};

export const ARTICLES: Article[] = [
  {
    slug: 'how-to-choose-an-elisa-kit',
    title: 'How to Choose an ELISA Kit: Species, Sample Type, Sensitivity and Range',
    metaTitle: 'How to Choose an ELISA Kit | Buyer’s Guide',
    description: 'Choose the right ELISA kit for your study: match species and sample type, read sensitivity and detection range, pick the assay format and plan controls.',
    summary: 'A practical checklist for picking an ELISA kit that works the first time: species, sample type, sensitivity, detection range, format and controls.',
    published: '2026-11-18',
    updated: '2026-11-18',
    readMinutes: 7,
    related: [
      { label: 'Solarbio ELISA kits in India', href: '/solarbio/elisa-kits' },
      { label: 'Solarbio antibodies', href: '/solarbio/antibodies' },
      { label: 'Biochemical assay kits', href: '/solarbio/biochemical-assay-kits' },
    ],
    sections: [
      {
        h2: 'Start with the question your experiment asks',
        blocks: [
          { p: 'An ELISA kit is only as good as its fit to your samples. Before comparing catalogue numbers, write down four things: the target (for example IL-6 or CRP), the species the sample came from, the sample matrix (serum, plasma, cell culture supernatant, tissue homogenate) and the concentration you expect to see. Every choice below follows from these.' },
        ],
      },
      {
        h2: '1. Match the species exactly',
        blocks: [
          { p: 'Most ELISA kits are built from antibodies raised against one species’ version of the protein. A human IL-6 kit will often under-read or miss mouse IL-6 because the protein sequences differ. Choose a kit labelled for the same species as your sample, and treat any claimed cross-reactivity as something to verify, not assume.' },
          { ul: ['Human, mouse and rat kits cover most academic and pharma work.', 'Porcine, bovine and chicken kits are common in veterinary and animal-nutrition studies.', 'For less common species, ask the supplier for validation data before ordering.'] },
        ],
      },
      {
        h2: '2. Check the validated sample types',
        blocks: [
          { p: 'Kits are validated for specific matrices. Serum, plasma and cell culture supernatant are the most common; urine, saliva, milk or tissue homogenates may need a different kit or extra sample preparation. If your matrix is not on the list, run a spike-and-recovery test on a few samples first.' },
          { ul: ['Plasma: note the anticoagulant (EDTA, heparin or citrate). Some kits specify one.', 'Cell culture supernatant: serum in the medium can contain the target; include a medium-only blank.', 'Tissue: homogenise in a compatible buffer and normalise to total protein.'] },
        ],
      },
      {
        h2: '3. Read sensitivity and detection range together',
        blocks: [
          { p: 'Sensitivity (the lowest detectable concentration) and detection range (the span of the standard curve) are the two numbers that decide whether your samples will land on the curve.' },
          { table: { head: ['If your expected level is…', 'Choose a kit where…'], rows: [['Close to zero (basal cytokines)', 'Sensitivity is well below the expected level, ideally 3–5× lower'], ['Very high (acute-phase proteins like CRP)', 'The upper end of the range covers it, or plan dilutions'], ['Unknown', 'Run a pilot with 2–3 dilutions of a few samples']] } },
          { note: 'Samples above the top standard must be diluted and re-run; values below the lowest standard should be reported as “below the limit of detection”, not as zero.' },
        ],
      },
      {
        h2: '4. Understand the assay format',
        blocks: [
          { p: 'Sandwich ELISA uses two antibodies that bind different parts of the target. It is the most common format for proteins such as cytokines and gives good specificity. Competitive ELISA is used for small molecules (hormones, drugs, toxins) that are too small for two antibodies to bind at once; there the signal falls as the concentration rises.' },
        ],
      },
      {
        h2: '5. Plan plates, replicates and controls',
        blocks: [
          { ol: ['Count samples × replicates (duplicates are standard) + standards + blanks to see if one 96-well plate is enough.', 'Include a known positive sample or spiked control on every plate.', 'Keep incubation times and temperature consistent across plates.', 'Read the plate promptly after adding stop solution, at the wavelength in the manual (usually 450 nm).'] },
        ],
      },
      {
        h2: '6. Handling and storage',
        blocks: [
          { p: 'Most ELISA kits are stored at 2–8 °C and should not be frozen unless the manual says so. Bring reagents to room temperature before use, and do not mix components between kit lots. For multi-site studies, order enough of one lot for the whole study.' },
        ],
      },
      {
        h2: 'Quick checklist before you order',
        blocks: [
          { ul: ['Target and species match your samples', 'Your sample type is validated', 'Expected concentration sits inside the detection range', 'Format suits the target (sandwich for proteins, competitive for small molecules)', 'Enough wells for samples, standards and replicates', 'One lot for the whole study'] },
        ],
      },
    ],
    faqs: [
      { q: 'Can I use a human ELISA kit for mouse samples?', a: 'Usually not reliably. Kits are designed for one species; unless cross-reactivity is validated by the manufacturer, use a kit made for your sample’s species.' },
      { q: 'What does ELISA kit sensitivity mean?', a: 'It is the lowest concentration the kit can distinguish from a blank. Choose a kit whose sensitivity is comfortably below the levels you expect to measure.' },
      { q: 'What if my samples are above the standard curve?', a: 'Dilute them with the kit’s sample diluent and re-run, then multiply the result by the dilution factor.' },
    ],
  },
  {
    slug: 'polyclonal-vs-monoclonal-vs-recombinant-antibodies',
    title: 'Polyclonal vs Monoclonal vs Recombinant Antibodies: Which Should You Use?',
    metaTitle: 'Polyclonal vs Monoclonal vs Recombinant Antibodies',
    description: 'How polyclonal, monoclonal and recombinant antibodies differ in specificity, consistency and cost, and which to choose for western blot, IHC and flow cytometry.',
    summary: 'The practical differences between the three antibody types, and how to choose one for western blot, IHC, IF and flow cytometry.',
    published: '2026-11-18',
    updated: '2026-11-18',
    readMinutes: 6,
    related: [
      { label: 'Solarbio antibodies in India', href: '/solarbio/antibodies' },
      { label: 'Protein & immunity reagents', href: '/solarbio/protein-immunity' },
      { label: 'Blocking peptides', href: '/solarbio/peptides' },
    ],
    sections: [
      {
        h2: 'The short answer',
        blocks: [
          { table: { head: ['', 'Polyclonal', 'Monoclonal', 'Recombinant'], rows: [['Made from', 'Many B-cell clones in an immunised animal', 'One hybridoma clone', 'Cloned antibody genes expressed in cells'], ['Binds', 'Several epitopes on the target', 'One epitope', 'One epitope'], ['Lot-to-lot consistency', 'Varies between batches', 'Good', 'Best (defined sequence)'], ['Signal strength', 'Often strong', 'Can be lower', 'Comparable to monoclonal'], ['Typical cost', 'Lowest', 'Higher', 'Higher'], ['Good for', 'WB, IHC, detecting denatured or low-abundance targets', 'Specific assays, flow cytometry, diagnostics', 'Long studies needing reproducibility']] } },
        ],
      },
      {
        h2: 'Polyclonal antibodies',
        blocks: [
          { p: 'Polyclonal antibodies are purified from the serum of an immunised animal, most often a rabbit. Because they recognise several epitopes, they tolerate small changes in the protein, such as denaturation in western blot or fixation in IHC, and often give a strong signal. The trade-off is batch variation: a new lot may behave slightly differently, so re-titrate when you switch lots.' },
        ],
      },
      {
        h2: 'Monoclonal antibodies',
        blocks: [
          { p: 'Monoclonal antibodies come from a single clone, so every molecule binds the same epitope. That makes them highly specific and consistent, which suits flow cytometry, quantitative assays and any experiment where background matters. If the one epitope is hidden by fixation or lost on denaturation, the antibody may not work in that application, so check the validated applications.' },
        ],
      },
      {
        h2: 'Recombinant antibodies',
        blocks: [
          { p: 'Recombinant antibodies are produced from a known antibody gene sequence in cell culture. They combine monoclonal specificity with near-identical performance between batches and an assured long-term supply, which is why many labs prefer them for long projects and publications that require reproducibility.' },
        ],
      },
      {
        h2: 'Choosing by application',
        blocks: [
          { ul: ['Western blot (WB): polyclonal or recombinant rabbit antibodies usually give strong, clean bands.', 'IHC on paraffin sections (IHC-P): choose an antibody validated for IHC-P; antigen retrieval may be needed.', 'Immunofluorescence (IF/ICC): check validation and the subcellular location on the datasheet.', 'Flow cytometry (FCM): monoclonal or recombinant, ideally pre-conjugated to a fluorophore.', 'ELISA: matched monoclonal pairs or a ready-made ELISA kit.'] },
        ],
      },
      {
        h2: 'Host species and secondary antibodies',
        blocks: [
          { p: 'The host (rabbit, mouse, rat, goat) decides which secondary antibody you need. Avoid using a mouse primary on mouse tissue without a mouse-on-mouse blocking step, and for double staining pick primaries from two different hosts so the secondaries can tell them apart.' },
        ],
      },
      {
        h2: 'Before you order',
        blocks: [
          { ol: ['Confirm species reactivity covers your samples.', 'Confirm the antibody is validated for your application.', 'Note the recommended dilution and plan a titration.', 'Check storage (most antibodies: −20 °C, avoid repeated freeze–thaw; aliquot on arrival).', 'Consider a blocking peptide as a specificity control.'] },
        ],
      },
    ],
    faqs: [
      { q: 'Are polyclonal antibodies less specific than monoclonal?', a: 'They bind several epitopes, so cross-reactivity is more likely, but a well-validated polyclonal can be very specific. Monoclonal and recombinant antibodies bind one epitope and vary less between lots.' },
      { q: 'Why are most antibodies raised in rabbit?', a: 'Rabbits produce high-affinity antibodies to many targets, including some that are poorly immunogenic in mice, and rabbit antibodies work well in WB and IHC.' },
      { q: 'How should antibodies be stored?', a: 'Most are stored at −20 °C. Aliquot on arrival to avoid repeated freeze–thaw cycles, and follow the datasheet if it says 2–8 °C.' },
    ],
  },
  {
    slug: 'blood-genomic-dna-extraction-spin-column',
    title: 'Blood Genomic DNA Extraction with a Spin Column: Steps, Tips and Troubleshooting',
    metaTitle: 'Blood Genomic DNA Extraction: Spin Column Guide',
    description: 'How spin-column blood genomic DNA extraction works, step by step, with tips on sample volume, RNase and Proteinase K, yield, purity and common problems.',
    summary: 'How spin-column kits extract genomic DNA from whole blood, with practical tips on yield, purity and troubleshooting, using the Solarbio D1800 kit as the example.',
    published: '2026-11-18',
    updated: '2026-11-18',
    readMinutes: 7,
    related: [
      { label: 'Solarbio D1800 Blood Genomic DNA Extraction Kit', href: '/genomic' },
      { label: 'Solarbio molecular biology products', href: '/solarbio/molecular-biology' },
      { label: 'D1800 protocol (PDF)', href: '/assets/solarbio/D1800_Protocol.pdf' },
    ],
    sections: [
      {
        h2: 'How spin-column DNA extraction works',
        blocks: [
          { p: 'A spin-column kit lyses cells, removes proteins and RNA, binds DNA to a silica membrane, washes away impurities and then releases clean DNA in a small volume of elution buffer. The DNA is suitable for PCR, qPCR, restriction digestion, library preparation and Southern blotting.' },
          { p: 'In whole blood, most cells are red blood cells, which in mammals have no nucleus. The DNA comes from the white blood cells, so the first step removes the red cells.' },
        ],
      },
      {
        h2: 'The workflow, step by step',
        blocks: [
          { p: 'This outline follows the Solarbio D1800 kit (spin column, 50T/100T), which processes 100–500 µL of fresh or anticoagulated blood. Always follow the protocol supplied with your lot.' },
          { ol: [
            'Red cell lysis: add 2 volumes of Red Blood Cell Lysis Buffer to the blood, mix by inversion and centrifuge at 12,000 rpm for 1 minute. The pellet should be white or light red; repeat once if lysis is incomplete.',
            'White cell lysis: resuspend the pellet in 500 µL Solution A (leukocyte lysis) and incubate at 65 °C for 10 minutes until the solution is clear.',
            'RNA and protein digestion: cool to room temperature, add 2 µL RNase A and 20 µL Proteinase K, mix and leave for 10 minutes.',
            'Protein precipitation: add 500 µL Solution B, mix, incubate at 65 °C for 5 minutes, centrifuge at 12,000 rpm for 5 minutes at 4 °C and transfer the clear lower liquid.',
            'Bind, wash and elute: load onto the DNA adsorption column, wash with Wash Buffer (with ethanol added) and elute in Elution Buffer.',
          ] },
          { note: 'Before first use, add absolute ethanol to the wash buffer as printed on the bottle label (45 mL per bottle for D1800).' },
        ],
      },
      {
        h2: 'Birds, fish and amphibians',
        blocks: [
          { p: 'Red blood cells in birds, reptiles, amphibians and fish have nuclei and are rich in DNA. Use much less blood (5–20 µL), skip the red-cell lysis step and add Solution A directly. Using mammalian volumes will overload the column.' },
        ],
      },
      {
        h2: 'Getting good yield and purity',
        blocks: [
          { ul: [
            'Use fresh blood or blood stored at 2–8 °C for a few days; for longer storage freeze it, and thaw quickly before use.',
            'EDTA tubes are a good default anticoagulant; heparin can inhibit some downstream PCR.',
            'Do not overload the column; more blood does not always mean more DNA.',
            'Pre-warm the elution buffer and let it sit on the membrane for a few minutes before the final spin.',
            'Check purity by A260/A280 (about 1.8 for clean DNA) and integrity on an agarose gel.',
          ] },
        ],
      },
      {
        h2: 'Troubleshooting',
        blocks: [
          { table: { head: ['Problem', 'Likely cause', 'What to try'], rows: [
            ['Red pellet after lysis', 'Incomplete red-cell lysis', 'Repeat the lysis step once'],
            ['Low yield', 'Low white-cell count, old sample, column overloaded', 'Use fresh blood, the right volume, warm elution buffer'],
            ['A260/A280 below 1.7', 'Protein carry-over', 'Avoid the upper layer after precipitation; spin again if cloudy'],
            ['PCR fails', 'Ethanol or salt carry-over', 'Do an extra dry spin before elution'],
            ['Smeared bands on gel', 'DNA degraded or sheared', 'Use fresh samples; avoid vortexing after lysis'],
          ] } },
        ],
      },
      {
        h2: 'Storage of the kit and the DNA',
        blocks: [
          { p: 'For the D1800 kit, store RNase A and Proteinase K at −20 °C and the other components at room temperature (shelf life 12 months). Store extracted DNA at 2–8 °C for short-term use or −20 °C for long-term storage.' },
        ],
      },
    ],
    faqs: [
      { q: 'How much blood do I need for genomic DNA extraction?', a: 'For mammalian blood with a spin-column kit like Solarbio D1800, 100–500 µL is typical. For nucleated blood (birds, fish, amphibians), use 5–20 µL.' },
      { q: 'Why add RNase A during DNA extraction?', a: 'It removes RNA that would otherwise co-purify with the DNA and inflate concentration readings.' },
      { q: 'What A260/A280 ratio should genomic DNA have?', a: 'Around 1.8. Lower values usually indicate protein contamination.' },
    ],
  },
];

export const getArticle = (slug: string) => ARTICLES.find((a) => a.slug === slug) ?? null;
