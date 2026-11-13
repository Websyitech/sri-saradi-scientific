import "./omni-search.css";
import CalendarWidget from "../components/CalendarWidget";

export const metadata = {
  alternates: { canonical: '/omni-search' },
  title: "Omni-Search | Sri Saradi Scientific",
  description: "Tell us what you need and our scientists will source it: reagents, kits, antibodies and lab equipment from trusted global manufacturers.",
};

export default function OmniSearchPage() {
  return (
    <main className="omni-page">
      <CalendarWidget />
      <section 
        className="omni-hero relative"
        style={{
          background: `url("/uploads/omni_search_banner.webp") right center / cover no-repeat`,
          backgroundColor: '#1E1C5E' /* Fallback color matching the banner's left side */
        }}
      >
        {/* Mobile blur overlay */}
        <div className="absolute inset-0 backdrop-blur-[1px] bg-[#1a1a2e]/20 z-0 md:hidden"></div>
        
        <div className="omni-container relative z-10">
          <p className="omni-eyebrow">Our Product</p>
          <h1 className="omni-hero-title">
            Omni-Search finds the <span className="omni-accent">second indication</span> hiding in your portfolio.
          </h1>
          <p className="omni-hero-sub">
            Submit your molecule portfolio. Omni-Search scans 357,214 drug perturbation signatures and returns a ranked shortlist of new indications for your approved drugs, each with a go/no-go dossier your team can act on.
          </p>
          <div className="omni-hero-actions justify-center md:justify-start w-full">
            <a className="omni-btn omni-btn-primary" href="https://huggingface.co/spaces/PrasannaGayam/FDA-Omni-Search-Engine" target="_blank" rel="noopener noreferrer">Try the live demo</a>
            <a className="omni-btn omni-btn-ghost" href="/contact">Request a dossier</a>
          </div>
        </div>
      </section>

      <section className="omni-stats">
        <div className="omni-container omni-stats-grid">
          <div className="omni-stat"><span className="omni-stat-num">357,214</span><span className="omni-stat-label">Perturbation signatures searched</span></div>
          <div className="omni-stat"><span className="omni-stat-num">164M</span><span className="omni-stat-label">Rows scored per portfolio pass</span></div>
          <div className="omni-stat"><span className="omni-stat-num">1,722</span><span className="omni-stat-label">Drug-cancer pairs scored in our first production run</span></div>
        </div>
      </section>

      <section className="omni-section">
        <div className="omni-container">
          <p className="omni-eyebrow">How it works</p>
          <h2 className="omni-h2">Three steps, weeks of triage removed</h2>
          <div className="omni-steps">
            <div className="omni-step"><span className="omni-step-num">1</span><h3 className="omni-h3">You send the portfolio</h3><p>A list of your approved or off-patent molecules. No structures, no assay data and no confidential chemistry required to start.</p></div>
            <div className="omni-step"><span className="omni-step-num">2</span><h3 className="omni-h3">The engine scores every pairing</h3><p>Each molecule is scored against every candidate indication using transcriptional reversal, selectivity and network evidence, with permutation nulls behind the scores.</p></div>
            <div className="omni-step"><span className="omni-step-num">3</span><h3 className="omni-h3">You get a go/no-go dossier</h3><p>A ranked shortlist with the reasoning, the counter-evidence and a clear recommendation on which candidates deserve wet-lab spend.</p></div>
          </div>
        </div>
      </section>

      <section className="omni-section omni-section-tint">
        <div className="omni-container">
          <p className="omni-eyebrow">What is inside</p>
          <h2 className="omni-h2">Four evidence layers, not one score</h2>
          <p className="omni-lead">A single similarity metric produces plausible-looking nonsense. Every candidate has to survive all four layers before it reaches a dossier.</p>
          <div className="omni-cards">
            <div className="omni-card"><span className="omni-card-icon" aria-hidden="true">🧬</span><h3 className="omni-h3">357,214 perturbation signatures</h3><p>164 million rows of drug-induced transcriptional change, precomputed so a portfolio can be scored in one pass rather than one molecule at a time.</p></div>
            <div className="omni-card"><span className="omni-card-icon" aria-hidden="true">📊</span><h3 className="omni-h3">162,508-record knockdown atlas</h3><p>Genetic perturbation data used to separate signatures that reflect real target engagement from signatures that only look similar.</p></div>
            <div className="omni-card"><span className="omni-card-icon" aria-hidden="true">🧫</span><h3 className="omni-h3">Cell-line selectivity data</h3><p>Response varies by lineage. Candidates are scored against the cell lines that represent the indication, not against a pooled average.</p></div>
            <div className="omni-card"><span className="omni-card-icon" aria-hidden="true">🕸</span><h3 className="omni-h3">Network pharmacology</h3><p>Pathway and interaction context, so a ranked hit comes with a mechanistic argument rather than a correlation alone.</p></div>
          </div>
        </div>
      </section>

      <section className="omni-section">
        <div className="omni-container omni-split">
          <div>
            <p className="omni-eyebrow">Validation</p>
            <h2 className="omni-h2">Run against a real generics portfolio</h2>
            <p className="omni-lead">We ran Omni-Search over a 95-molecule portfolio from an Indian generics manufacturer. It covered 82 of the 95 molecules and scored 1,722 drug-cancer pairs.</p>
            <p className="omni-lead">As a control, we checked whether the engine could recover a repurposing result that is already established. It ranked bortezomib in multiple myeloma first. That is a sanity check on the method rather than a claim about any new candidate, and we report it as such.</p>
          </div>
          <div className="omni-validation-box">
            <div className="omni-vrow"><span className="omni-vnum">95</span><span className="omni-vlabel">molecules submitted</span></div>
            <div className="omni-vrow"><span className="omni-vnum">82</span><span className="omni-vlabel">molecules covered by the engine</span></div>
            <div className="omni-vrow"><span className="omni-vnum">1,722</span><span className="omni-vlabel">drug-cancer pairs scored</span></div>
            <div className="omni-vrow"><span className="omni-vnum">#1</span><span className="omni-vlabel">rank given to the known positive control</span></div>
          </div>
        </div>
      </section>

      <section className="omni-section omni-section-tint">
        <div className="omni-container">
          <p className="omni-eyebrow">What you receive</p>
          <h2 className="omni-h2">The dossier</h2>
          <p className="omni-lead">The output is a decision document, not a spreadsheet of scores. It is written so a lifecycle-management team can take it to a portfolio review unchanged.</p>
          <ul className="omni-check-list">
            <li><span className="omni-check" aria-hidden="true">&#10003;</span>Ranked shortlist of candidate indications per molecule</li>
            <li><span className="omni-check" aria-hidden="true">&#10003;</span>Enrichment scores with the evidence behind each one</li>
            <li><span className="omni-check" aria-hidden="true">&#10003;</span>Mechanistic rationale drawn from pathway and network context</li>
            <li><span className="omni-check" aria-hidden="true">&#10003;</span>Structure checks on shortlisted drug-target pairs</li>
            <li><span className="omni-check" aria-hidden="true">&#10003;</span>Known-competitor and prior-art landscape for the indication</li>
            <li><span className="omni-check" aria-hidden="true">&#10003;</span>An explicit go / no-go recommendation, including the no-gos</li>
          </ul>
        </div>
      </section>

      <section className="omni-section">
        <div className="omni-container">
          <p className="omni-eyebrow">Who it is for</p>
          <h2 className="omni-h2">Built for generics lifecycle management</h2>
          <p className="omni-lead">Indian manufacturers supply a large share of world generic demand but have few tools for lifecycle management. A new indication supported by new clinical study can carry three years of FDA exclusivity. Omni-Search exists to find those candidates early, and to rule out the ones that are not worth the study.</p>
          <p className="omni-lead">Dossiers are priced for Indian lifecycle-management budgets, typically Rs 3-10 lakh depending on portfolio size and the depth of evidence review required.</p>
        </div>
      </section>

      <section className="omni-cta">
        <div className="omni-container">
          <h2 className="omni-cta-title">See it run before you talk to us</h2>
          <p className="omni-cta-sub">The demo is public and searches the live signature set. Bring one of your own molecules.</p>
          <div className="omni-hero-actions">
            <a className="omni-btn omni-btn-light" href="https://huggingface.co/spaces/PrasannaGayam/FDA-Omni-Search-Engine" target="_blank" rel="noopener noreferrer">Open the live demo</a>
            <a className="omni-btn omni-btn-outline" href="/contact">Talk to the team</a>
          </div>
        </div>
      </section>
    </main>
  );
}
