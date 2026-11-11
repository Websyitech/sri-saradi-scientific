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
            <div className="specialist-image-wrap">
              <img
                src="/assets/specialist_formats.webp"
                alt="Customised biological labware and specialist formats"
                className="specialist-img"
                loading="lazy"
                width={500}
                height={500}
              />
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
