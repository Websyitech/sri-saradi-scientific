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
          <article className="specialist-card">
            <div className="specialist-card-header">
              <span className="specialist-number">MOLECULAR BIOLOGY</span>
            </div>
            <div className="specialist-image-wrap">
              <img
                src="/assets/pipette_tips_square.webp"
                alt="Molecular biology tips & consumables"
                className="specialist-img"
                loading="lazy"
                width={500}
                height={500}
              />
            </div>
            <h3>Application-specific tips &amp; consumables</h3>
            <p>
              Discuss pipette compatibility, volume, filter or barrier needs, sample retention and contamination-control specifications for your molecular biology workflow.
            </p>
          </article>

          <article className="specialist-card">
            <div className="specialist-card-header">
              <span className="specialist-number">CELL CULTURE</span>
            </div>
            <div className="specialist-image-wrap">
              <img
                src="/assets/lab_product_1024x1024.webp"
                alt="Cell culture vessels and formats"
                className="specialist-img"
                loading="lazy"
                width={500}
                height={500}
              />
            </div>
            <h3>Formats that fit the culture</h3>
            <p>
              Discuss the cell type, vessel or plate format, surface treatment, culture conditions and product-specific sterility requirements.
            </p>
          </article>

          <article className="specialist-card">
            <div className="specialist-card-header">
              <span className="specialist-number">SPECIALIST FORMATS</span>
            </div>
            <div className="specialist-image-wrap specialist-custom-spec">
              <div className="custom-spec-canvas">
                <div className="custom-spec-icon-ring" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="9" />
                    <circle cx="12" cy="12" r="5" />
                    <circle cx="12" cy="12" r="1.5" />
                    <path d="M12 3v4M12 17v4M3 12h4M17 12h4" />
                  </svg>
                </div>
                <div className="custom-spec-badge">
                  <span className="spec-dot" aria-hidden="true" />
                  <span>On-demand custom specs</span>
                </div>
              </div>
            </div>
            <h3>Customised biological labware</h3>
            <p>
              Bring the unusual format, instrument requirement or demanding sample application. We’ll clarify the specification and check available product options.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
};
