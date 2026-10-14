'use client';

import React from 'react';

interface LogisticsSectionProps {
  onOpenEnquiry: (category?: string) => void;
}

export const LogisticsSection: React.FC<LogisticsSectionProps> = ({ onOpenEnquiry }) => {
  return (
    <section className="section logistics-section" id="global-supply">
      <div className="wrap logistics-grid">
        <div>
          <div className="eyebrow">Integrated logistics / worldwide supply</div>
          <h2>
            Scientific products.
            <br />
            Across borders.
            <br />
            <span className="blue">Within 15 working days.*</span>
          </h2>
          <p className="lead">
            One coordinated approach connects product availability, handling requirements, documents and the shipping route to your destination.
          </p>
          <p>
            We discuss the product and the delivery together, so your procurement team receives a supply plan grounded in what your scientists need.
          </p>
          <button
            type="button"
            className="text-link"
            onClick={() => onOpenEnquiry('product')}
          >
            Discuss worldwide supply <span aria-hidden="true">↗</span>
          </button>
          <p className="delivery-terms">
            *For product orders accepted under this delivery offer. The quotation confirms the delivery start date, destination and any order-specific exceptions. Custom scientific services follow an agreed project timeline.
          </p>
        </div>

        <div className="logistics-visual">
          <div className="logistics-top">
            <span>A COORDINATED ROUTE</span>
            <span>PRODUCT ORDERS</span>
          </div>

          <svg className="world-route" viewBox="0 0 520 310" aria-hidden="true">
            <defs>
              <radialGradient id="globe-light">
                <stop stopColor="#334e8f" />
                <stop offset="1" stopColor="#111c43" />
              </radialGradient>
            </defs>
            <circle cx="260" cy="154" r="128" fill="url(#globe-light)" stroke="#7ba6db55" />
            <ellipse cx="260" cy="154" rx="128" ry="45" fill="none" stroke="#93b8eb33" />
            <ellipse cx="260" cy="154" rx="70" ry="128" fill="none" stroke="#93b8eb33" />
            <ellipse cx="260" cy="154" rx="28" ry="128" fill="none" stroke="#93b8eb22" />
            <path d="M136 123h248M132 154h256M140 190h240" stroke="#93b8eb33" />
            <path className="route-dash" d="M112 220Q245-20 423 104M112 220Q298 277 423 104" stroke="#5ccfff" strokeWidth="2" fill="none" />
            <circle cx="112" cy="220" r="8" fill="#78ddff" />
            <circle cx="423" cy="104" r="8" fill="#8dddba" />
            <circle cx="260" cy="154" r="44" fill="#1b2b56" stroke="#7cabdc55" />
            <text x="260" y="150" textAnchor="middle" fill="white" fontSize="32" fontFamily="Arial">
              15
            </text>
            <text x="260" y="172" textAnchor="middle" fill="#aecbe9" fontSize="9" fontFamily="Arial">
              WORKING DAYS*
            </text>
          </svg>

          <div className="logistics-chain">
            <div>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="m3 7 9-4 9 4v10l-9 4-9-4zm0 0 9 4 9-4M12 11v10M8 5l9 4" />
              </svg>
              <strong>Source</strong>
              <span>Product & availability</span>
            </div>
            <span aria-hidden="true">→</span>
            <div>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M6 3h8l4 4v14H6zM14 3v5h4M9 12h6m-6 4h6" />
              </svg>
              <strong>Coordinate</strong>
              <span>Handling & documents</span>
            </div>
            <span aria-hidden="true">→</span>
            <div>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="5" r="3" />
                <circle cx="5" cy="19" r="3" />
                <circle cx="19" cy="19" r="3" />
                <path d="m10 8-4 8m8-8 4 8M8 19h8" />
              </svg>
              <strong>Deliver</strong>
              <span>Shipping & follow-up</span>
            </div>
          </div>
          <p className="visual-caption">Illustration of coordination. The physical shipping route is agreed for each order.</p>
        </div>
      </div>
    </section>
  );
};
