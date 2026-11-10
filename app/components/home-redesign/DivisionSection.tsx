import React from 'react';
import Link from 'next/link';

export const DivisionSection: React.FC = () => {
  return (
    <section className="section division-section" id="what-we-do">
      <div className="wrap">
        <div className="section-head">
          <div>
            <div className="eyebrow">What we do</div>
            <h2>
              Two ways to support
              <br />
              your next scientific step.
            </h2>
          </div>
        </div>

        <div className="division-grid">
          {/* 01 / Supplies */}
          <article className="division reveal visible">
            <div className="division-art">
              <svg viewBox="0 0 580 250" aria-hidden="true">
                <defs>
                  <linearGradient id="glass" x1="0" x2="1" y2="1">
                    <stop stopColor="#ffffff" stopOpacity=".9" />
                    <stop offset=".4" stopColor="#b9dff9" stopOpacity=".45" />
                    <stop offset="1" stopColor="#6b83ca" stopOpacity=".6" />
                  </linearGradient>
                  <linearGradient id="liquid" x1="0" x2="0" y2="1">
                    <stop stopColor="#3dc5ec" stopOpacity=".6" />
                    <stop offset="1" stopColor="#34398A" stopOpacity=".9" />
                  </linearGradient>
                </defs>
                <ellipse cx="300" cy="221" rx="170" ry="12" fill="#34398A" opacity=".08" />
                <g transform="translate(70 35) rotate(-9 100 100)">
                  <rect x="60" y="42" width="76" height="132" rx="15" fill="url(#glass)" stroke="#90a2cb" />
                  <path d="M65 110h66v50q0 10-12 10H77q-12 0-12-10z" fill="url(#liquid)" />
                  <rect x="58" y="27" width="80" height="30" rx="5" fill="#34398A" />
                  <path d="M69 31v20m9-20v20m9-20v20m9-20v20m9-20v20m9-20v20m9-20v20" stroke="#5968aa" />
                  <rect x="75" y="76" width="49" height="20" rx="2" fill="white" opacity=".6" />
                </g>
                <g transform="translate(280 30)">
                  <rect x="0" y="12" width="85" height="25" rx="8" fill="#34398A" />
                  <path d="M8 37h69v125l-34 44-35-44z" fill="url(#glass)" stroke="#9aaad0" />
                  <path d="M16 122h53v36l-26 34-27-34z" fill="#009FE3" opacity=".6" />
                  <path d="M60 57h9m-9 22h9m-9 22h9" stroke="#677db9" />
                </g>
                <g transform="translate(399 100) rotate(15)">
                  <ellipse cx="35" cy="15" rx="54" ry="19" fill="#ebf7ff" stroke="#93afd8" />
                  <rect x="-19" y="15" width="108" height="18" fill="#b9d8f0" />
                  <ellipse cx="35" cy="33" rx="54" ry="19" fill="url(#glass)" stroke="#93afd8" />
                  <ellipse cx="35" cy="15" rx="40" ry="12" fill="#008bcc" opacity=".2" />
                  <path d="M35-15v70m-68-23h136" stroke="#34398A" opacity=".12" />
                </g>
              </svg>
            </div>
            <div className="division-copy">
              <h3>Source around the application.</h3>
              <p>
                Application-led sourcing of reagents, antibodies, molecular biology kits, specialist biological plasticware and laboratory or process filters, backed by manufacturer input and integrated logistics.
              </p>
              <div className="category-tags">
                <span>Research & analytical labs</span>
                <span>Pharma & biopharma</span>
                <span>Food & beverage</span>
              </div>
              <Link className="text-link" href="/catalogues">
                Explore catalogues <span aria-hidden="true">↗</span>
              </Link>
            </div>
          </article>

          {/* 02 / Scientific services */}
          <article className="division reveal visible">
            <div className="division-art">
              <svg viewBox="0 0 500 420" aria-hidden="true">
                <defs>
                  <linearGradient id="service-dna" x1="0" x2="1" y2="1">
                    <stop stopColor="#009FE3" />
                    <stop offset="1" stopColor="#34398A" />
                  </linearGradient>
                </defs>
                <circle cx="242" cy="215" r="160" fill="#e8f0fc" />
                <circle cx="242" cy="215" r="120" fill="none" stroke="#b4cbf0" strokeDasharray="5 6" />
                <g transform="rotate(-35 242 215)">
                  <path
                    d="M 173.9,50 L 160.0,66 L 153.3,78 L 150.0,94 L 151.7,106 L 157.1,118 L 165.8,130 L 177.6,142 L 191.9,154 L 208.3,166 L 225.9,178 L 244.3,190 L 262.5,202 L 279.9,214 L 295.8,226 L 309.5,238 L 320.6,250 L 328.5,262 L 333.0,274 L 333.9,282 L 332.9,292 L 328.2,304 L 320.2,316 L 309.0,328 L 295.1,340 L 279.2,352 L 261.7,364 L 255.7,368"
                    fill="none"
                    stroke="url(#service-dna)"
                    strokeWidth="13"
                    strokeLinecap="round"
                  />
                  <path
                    d="M 310.1,50 L 324.0,66 L 330.6,78 L 334.0,94 L 332.2,106 L 326.8,118 L 318.1,130 L 306.3,142 L 292.0,154 L 275.6,166 L 258.0,178 L 239.6,190 L 221.4,202 L 204.0,214 L 188.1,226 L 174.4,238 L 163.3,250 L 155.4,262 L 150.9,274 L 150.0,282 L 151.0,292 L 155.7,304 L 163.7,316 L 174.9,328 L 188.8,340 L 204.7,352 L 222.2,364 L 228.2,368"
                    fill="none"
                    stroke="url(#service-dna)"
                    strokeWidth="10"
                    strokeLinecap="round"
                  />
                </g>
                <circle cx="99" cy="85" r="9" fill="#009FE3" />
                <circle cx="399" cy="264" r="6" fill="#5D9D35" />
              </svg>
            </div>
            <div className="division-copy">
              <h3>Move from brief to deliverables.</h3>
              <p>
                Custom synthesis, labeling and expression projects, alongside bioinformatics and computational discovery support through Omni-Search.
              </p>
              <div className="category-tags">
                <span>Custom biologics</span>
                <span>Project-specific QC</span>
                <span>Discovery services</span>
              </div>
              <Link className="text-link" href="/services">
                Explore scientific services <span aria-hidden="true">↗</span>
              </Link>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};
