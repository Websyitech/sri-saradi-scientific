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
              <img
                src="/assets/Source_Around_the_Application_1100x420.webp"
                alt="Source around the application"
                className="division-img"
                loading="lazy"
                width={1024}
                height={390}
              />
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
              <img
                src="/assets/Move_From_Brief_to_Deliverables_1100x420.webp"
                alt="Move from brief to deliverables"
                className="division-img"
                loading="lazy"
                width={1024}
                height={390}
              />
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
