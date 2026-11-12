"use client";

import { useState } from "react";
import { EnquiryModal } from "../components/home-redesign/EnquiryModal";
import styles from "./services.module.css";

const services = [
  {
    category: "01 / Synthesis",
    title: "Peptides & peptide libraries",
    description: "Prepare defined material for immunogen development, screening, epitope mapping and functional studies.",
    scope: "Linear, modified and cyclic peptides; carrier conjugation; crude or purified peptide libraries. Discuss sequence, quantity, purity and downstream use. Purified peptides are supplied with HPLC and mass spectrometry reports.",
  },
  {
    category: "02 / Nucleic acids",
    title: "Oligonucleotides & primers",
    description: "Match the sequence, scale and purification route to the application you need to run.",
    scope: "DSL, PAGE and HPLC purification are available. Routine catalogue scope is 11–90 bases at 2, 5 or 10 OD scales. Longer sequences, modifications and probes are assessed on enquiry.",
  },
  {
    category: "03 / Conjugation",
    title: "Antibody & molecule labeling",
    description: "Create a labeled material when the required commercial conjugate is unavailable.",
    scope: "Antibody and protein labeling with HRP, biotin or fluorophores; small-molecule labeling with biotin, fluorophores or stable isotopes; custom small-molecule synthesis. Chemistry and sample compatibility are reviewed before acceptance. Labeling projects include a labeling report.",
  },
  {
    category: "04 / Expression",
    title: "Proteins & recombinant antibodies",
    description: "Commission a complete expression workflow or the individual stages your team needs.",
    scope: "Gene synthesis, construct preparation, pilot expression, production and purification. Recombinant antibody expression in CHO or HEK293; multi-pass transmembrane protein preparation using VLP, detergent or nanodisc approaches. The expression project includes an experimental report.",
  },
];

const stages = [
  ["01 / Understand", "Share the brief.", "Provide the application, sequence or target, quantity, purity and intended use. Request an NDA before confidential disclosure."],
  ["02 / Agree", "Define the project.", "Review a written proposal covering scope, feasibility, deliverables, QC, required material and delivery date."],
  ["03 / Execute", "Stay informed.", "Submit samples where needed. Receive updates at the milestones and intervals agreed for the project."],
  ["04 / Receive", "Material with context.", "Receive the agreed material and quality package. Discuss downstream application questions with our team."],
];

const deliverables = [
  ["Peptide synthesis", "Purified material with HPLC and mass spectrometry reports."],
  ["Labeling projects", "Agreed conjugate or labeled material with a labeling report."],
  ["Expression projects", "Purified material with a written experimental report."],
  ["Discovery projects", "An agreed shortlist and evidence review for the research decision."],
];

const faqs = [
  ["What should I send for a quotation?", "Share the application, sequence, target or compound structure as appropriate; required quantity, purity, format and desired delivery date. For custom small-molecule synthesis, include a proposed route or supporting literature. We will first establish feasibility and the scope of work."],
  ["Do you perform custom biologics work in-house?", "The custom synthesis, labeling and expression projects described here are coordinated by Sri Saradi and executed with an established manufacturing partner. The project proposal identifies the scope and responsibilities. Computational discovery services are discussed separately."],
  ["Can we sign an NDA before sharing information?", "Yes. Request an NDA before sharing confidential sequences, structures or samples. Agree the permitted disclosures and the execution partner’s confidentiality obligations before project information is transferred."],
  ["Is one turnaround time available for all services?", "No. Delivery depends on complexity, scale, feasibility and the agreed QC package. The written proposal states the delivery plan for your project."],
];

const evidenceColors = ["#233d6b", "#3651a1", "#0089bb", "#49b9d5", "#676bb1", "#b2d6e8"];
const dnaRungs = Array.from({ length: 20 }, (_, index) => {
  const y = 50 + index * 16;
  const offset = Math.sin(y / 60) * 92;
  return { y, left: 242 + offset, right: 242 - offset };
});
const dnaStrands = [1, -1].map((direction) =>
  Array.from({ length: 160 }, (_, index) => {
    const y = 50 + index * 2;
    return `${index === 0 ? "M" : "L"}${242 + direction * Math.sin(y / 60) * 92},${y}`;
  }).join(" "),
);

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

export default function ServicesContent() {
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const [enquiryCategory, setEnquiryCategory] = useState("service");

  const handleOpenEnquiry = (category: string) => {
    setEnquiryCategory(category);
    setIsEnquiryOpen(true);
  };

  return (
    <main className={styles.page} id="services-main">
      <section className={styles.hero} aria-labelledby="services-heading">
        <div className={`${styles.wrap} ${styles.heroGrid}`}>
          <div>
            <div className={styles.eyebrow}>Scientific services</div>
            <h1 id="services-heading">Your question.<br />The right expertise.<br /><span className={styles.blue}>A defined deliverable.</span></h1>
            <p className={styles.lead}>Custom synthesis, labeling and expression projects with a clear scope, agreed quality data and a realistic delivery plan.</p>
            <div className={styles.actions}>
              <button className={styles.button} onClick={() => handleOpenEnquiry("service")}>Discuss a project <Arrow /></button>
              <a className={styles.textLink} href="#service-scope">Explore our services <span aria-hidden="true">↓</span></a>
            </div>
            <div className={styles.miniLinks}>
              <a href="#discovery">Omni-Search discovery <Arrow /></a>
              <a href="/assets/services-catalogue.pdf" target="_blank" rel="noopener noreferrer">Download services catalogue <Arrow /><span className={styles.srOnly}> (PDF, opens in a new tab)</span></a>
            </div>
          </div>
          <div className={styles.serviceVisual}>
            <svg viewBox="0 0 500 420" aria-hidden="true">
              <defs>
                <linearGradient id="services-dna" x1="0" x2="1" y2="1">
                  <stop stopColor="#009FE3" /><stop offset="1" stopColor="#34398A" />
                </linearGradient>
              </defs>
              <circle cx="242" cy="215" r="160" fill="#e8f0fc" />
              <circle cx="242" cy="215" r="195" fill="none" stroke="#cdddee" strokeDasharray="3 8" />
              <ellipse cx="242" cy="215" rx="225" ry="88" transform="rotate(-30 242 215)" fill="none" stroke="#c5d8eb" />
              <g>
                {dnaRungs.map(({ y, left, right }) => <line key={y} x1={left} y1={y} x2={right} y2={y} stroke="#87aed6" strokeWidth="4" opacity=".42" />)}
                {dnaStrands.map((path, index) => <path key={index} d={path} fill="none" stroke="url(#services-dna)" strokeWidth={index === 0 ? 13 : 10} />)}
              </g>
              <circle cx="99" cy="85" r="9" fill="#009FE3" />
              <circle cx="399" cy="264" r="6" fill="#5D9D35" />
            </svg>
            <div className={styles.serviceCaption}>
              <small>From brief to material</small>
              <strong>Sequence → scope → execution</strong>
              <span>Material + agreed QC + report</span>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.intro} aria-labelledby="coordination-heading">
        <div className={styles.wrap}>
          <h2 id="coordination-heading">Scientific coordination,<br />from the first discussion.</h2>
          <p>Sri Saradi scopes and coordinates custom biologics projects with an established manufacturing partner. You work with us on specifications, delivery and technical questions while execution follows the agreed project plan.</p>
        </div>
      </section>

      <section className={styles.section} id="service-scope" aria-labelledby="scope-heading">
        <div className={styles.wrap}>
          <div className={styles.sectionHead}>
            <div><div className={styles.eyebrow}>Custom biologics & synthesis</div><h2 id="scope-heading">Choose the capability<br />your project needs.</h2></div>
            <p>Start with the application and intended readout. We’ll help define the material, method and quality package.</p>
          </div>
          <div className={styles.serviceGrid}>
            {services.map((service) => (
              <article className={styles.serviceCard} key={service.title}>
                <div className={styles.serviceNumber}>{service.category}</div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <details><summary>View scope & documentation</summary><p>{service.scope}</p></details>
                <button className={styles.textLink} aria-label={`Discuss ${service.title}`} onClick={() => handleOpenEnquiry("service")}>Discuss this project <Arrow /></button>
              </article>
            ))}
          </div>
          <aside className={styles.notice}>
            <p><strong>Have biological data to interpret?</strong> Our in-house bioinformatics team can discuss the analysis and interpretation your workflow needs. Input data, analysis scope and outputs are agreed for each project.</p>
            <button className={styles.textLink} onClick={() => handleOpenEnquiry("service")}>Discuss an analysis brief <Arrow /></button>
          </aside>
        </div>
      </section>

      <section className={`${styles.section} ${styles.discovery}`} id="discovery" aria-labelledby="discovery-heading">
        <div className={`${styles.wrap} ${styles.splitGrid}`}>
          <div>
            <div className={styles.eyebrow}>Discovery services / Omni-Search</div>
            <h2 id="discovery-heading">Find the next question<br />worth testing.</h2>
            <p>Omni-Search supports drug-repurposing prioritisation by combining transcriptional, genetic, cell-line and network evidence into a ranked shortlist of candidate indications.</p>
            <p>Discuss your molecule portfolio and the depth of evidence review your team needs. The output helps plan further experimental evaluation.</p>
            <button className={`${styles.button} ${styles.lightButton}`} onClick={() => handleOpenEnquiry("discovery")}>Discuss a discovery brief <Arrow /></button>
            <p className={styles.disclaimer}>Computational prioritisation supports research decisions. It does not establish clinical efficacy.</p>
          </div>
          <div className={styles.evidenceVisual}>
            <div className={styles.evidenceTop}><span>Omni-Search / Evidence workflow</span><span>01 → 04</span></div>
            <div className={styles.heatmap} aria-hidden="true">
              {Array.from({ length: 84 }, (_, index) => <i key={index} style={{ background: evidenceColors[(index * 5 + Math.floor(index / 14)) % evidenceColors.length] }} />)}
            </div>
            <div className={styles.evidenceOutput}><span>Molecule portfolio</span><span aria-hidden="true">→</span><span>Candidate shortlist</span></div>
            <p className={styles.evidenceNote}>Illustrative evidence graphic. No live results shown.</p>
            <div className={styles.tags}>{["Transcriptional", "Genetic", "Cell-line", "Network"].map((tag) => <span key={tag}>{tag}</span>)}</div>
          </div>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="workflow-heading">
        <div className={styles.wrap}>
          <div className={styles.sectionHead}>
            <div><div className={styles.eyebrow}>The project workflow</div><h2 id="workflow-heading">Clarity before execution.<br />Support through delivery.</h2></div>
            <p>One agreed project plan connects the brief, execution and the quality data you receive.</p>
          </div>
          <ol className={styles.stages}>{stages.map(([label, title, description]) => <li key={label}><small>{label}</small><h3>{title}</h3><p>{description}</p></li>)}</ol>
        </div>
      </section>

      <section className={`${styles.section} ${styles.deliverables}`} aria-labelledby="deliverables-heading">
        <div className={`${styles.wrap} ${styles.splitGrid}`}>
          <div>
            <div className={styles.eyebrow}>What arrives with the work</div>
            <h2 id="deliverables-heading">The deliverable is<br />more than the material.</h2>
            <p>The QC package is defined in the proposal. It changes with the project, preparation and intended use.</p>
            <div className={styles.actions}><a className={styles.textLink} href="/assets/services-catalogue.pdf" target="_blank" rel="noopener noreferrer">Read the services catalogue <Arrow /><span className={styles.srOnly}> (PDF, opens in a new tab)</span></a></div>
          </div>
          <div className={styles.deliverableList}>{deliverables.map(([title, description]) => <div key={title}><h3>{title}</h3><p>{description}</p></div>)}</div>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="faq-heading">
        <div className={`${styles.wrap} ${styles.splitGrid}`}>
          <div><div className={styles.eyebrow}>Before you begin</div><h2 id="faq-heading">A project starts<br />with the right brief.</h2></div>
          <div className={styles.faqList}>{faqs.map(([question, answer], index) => <details key={question} open={index === 0}><summary>{question}</summary><p>{answer}</p></details>)}</div>
        </div>
      </section>

      <section className={styles.cta} aria-labelledby="cta-heading">
        <div className={styles.wrap}>
          <div><h2 id="cta-heading">A sequence, a target,<br />or a question. Start there.</h2><p>A protocol, a process condition or a project brief is a good place to start.</p></div>
          <button className={`${styles.button} ${styles.lightButton}`} onClick={() => handleOpenEnquiry("service")}>Let’s discuss it <Arrow /></button>
        </div>
      </section>

      <EnquiryModal isOpen={isEnquiryOpen} onClose={() => setIsEnquiryOpen(false)} initialCategory={enquiryCategory} />
    </main>
  );
}
