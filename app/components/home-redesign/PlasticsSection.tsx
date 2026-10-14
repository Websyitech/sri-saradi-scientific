'use client';

import React from 'react';

interface PlasticsSectionProps {
  onOpenEnquiry: (category?: string) => void;
}

export const PlasticsSection: React.FC<PlasticsSectionProps> = ({ onOpenEnquiry }) => {
  return (
    <section className="section plastics-section" id="biological-plasticware">
      <div className="wrap">
        <div className="section-head">
          <div>
            <div className="eyebrow">Plasticware with a biological purpose</div>
            <h2>
              The experiment determines
              <br />
              the plasticware.
            </h2>
          </div>
          <p>
            Our focus is specialist consumables for advanced biological work. Ask for the specifications of the exact product your application needs.
          </p>
        </div>

        <div className="specialist-grid">
          <article>
            <span className="specialist-number">01 / MOLECULAR BIOLOGY</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M7 2c0 8 10 12 10 20M17 2C17 10 7 14 7 22M8 5h8m-6 4h4m-4 6h4m-6 4h8" />
            </svg>
            <h3>Application-specific tips & consumables</h3>
            <p>
              Discuss pipette compatibility, volume, filter or barrier needs, sample retention and contamination-control specifications for your molecular biology workflow.
            </p>
          </article>

          <article>
            <span className="specialist-number">02 / CELL CULTURE</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M9 3h6m-5 0v7L4 19q-1 2 2 2h12q3 0 2-2l-6-9V3M8 15h8" />
              <circle cx="10" cy="18" r=".5" />
            </svg>
            <h3>Formats that fit the culture</h3>
            <p>
              Discuss the cell type, vessel or plate format, surface treatment, culture conditions and product-specific sterility requirements.
            </p>
          </article>

          <article>
            <span className="specialist-number">03 / SPECIALIST FORMATS</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="12" cy="12" r="9" />
              <circle cx="12" cy="12" r="5" />
              <circle cx="12" cy="12" r="1" />
            </svg>
            <h3>Harder-to-source biological labware</h3>
            <p>
              Bring the unusual format, instrument requirement or demanding sample application. We’ll clarify the specification and check available product options.
            </p>
          </article>
        </div>

        <div className="plastic-footer">
          <p>
            Properties such as DNase/RNase status, low retention, sterility and surface treatment are checked for the selected SKU. The application comes first.
          </p>
          <button
            type="button"
            className="btn"
            onClick={() => onOpenEnquiry('plasticware')}
          >
            Find biological plasticware <span aria-hidden="true">↗</span>
          </button>
        </div>
      </div>
    </section>
  );
};
