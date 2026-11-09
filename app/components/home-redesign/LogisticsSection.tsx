'use client';

import React from 'react';
import Image from 'next/image';

interface LogisticsSectionProps {
  onOpenEnquiry: (category?: string) => void;
}

export const LogisticsSection: React.FC<LogisticsSectionProps> = ({ onOpenEnquiry }) => {
  return (
    <section className="section logistics-section" id="global-supply">
      <div className="wrap">
        <div className="logistics-heading">
          <div>
            <div className="logistics-eyebrow">
              <span>Integrated logistics / worldwide supply</span>
            </div>
            <h2>
              Scientific products. Across borders. <span className="blue">Within 15 working days.</span>
            </h2>
            <p className="lead">
              One coordinated approach connects product availability, handling requirements, documents and the shipping route to your destination.
            </p>
          </div>
          <button
            type="button"
            className="logistics-header-cta"
            onClick={() => onOpenEnquiry('product')}
          >
            Discuss worldwide supply <span aria-hidden="true">→</span>
          </button>
        </div>

        <div className="logistics-panel">
          <div className="logistics-panel-copy">
            <div className="logistics-top">
              <span className="logistics-route-tag">A coordinated route</span>
              <span className="logistics-badge">Product orders</span>
            </div>
            <p className="logistics-body">
              We discuss the product and delivery together, so your procurement team receives a supply plan grounded in what your scientists need.
            </p>
            <div className="logistics-chain">
              <div className="chain-step">
                <div className="chain-icon-wrap icon-source">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="m3 7 9-4 9 4v10l-9 4-9-4zm0 0 9 4 9-4M12 11v10M8 5l9 4" />
                  </svg>
                </div>
                <div className="chain-step-content">
                  <strong>Source</strong>
                </div>
              </div>

              <div className="chain-divider" aria-hidden="true">
                <span>→</span>
              </div>

              <div className="chain-step">
                <div className="chain-icon-wrap icon-coordinate">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M6 3h8l4 4v14H6zM14 3v5h4M9 12h6m-6 4h6" />
                  </svg>
                </div>
                <div className="chain-step-content">
                  <strong>Coordinate</strong>
                </div>
              </div>

              <div className="chain-divider" aria-hidden="true">
                <span>→</span>
              </div>

              <div className="chain-step">
                <div className="chain-icon-wrap icon-deliver">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <circle cx="12" cy="5" r="3" />
                    <circle cx="5" cy="19" r="3" />
                    <circle cx="19" cy="19" r="3" />
                    <path d="m10 8-4 8m8-8 4 8M8 19h8" />
                  </svg>
                </div>
                <div className="chain-step-content">
                  <strong>Deliver</strong>
                </div>
              </div>
            </div>
          </div>
          <div className="world-route-wrapper">
            <Image
              src="/assets/scientific_global_supply_minimal.webp"
              alt="Global delivery of scientific products"
              fill
              sizes="(max-width: 760px) 100vw, (max-width: 1120px) 50vw, 700px"
              className="world-route-image"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
