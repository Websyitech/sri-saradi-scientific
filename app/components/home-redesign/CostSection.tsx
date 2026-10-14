'use client';

import React from 'react';

interface CostSectionProps {
  onOpenEnquiry: (category?: string) => void;
}

export const CostSection: React.FC<CostSectionProps> = ({ onOpenEnquiry }) => {
  return (
    <section className="section cost-section" id="procurement-value">
      <div className="wrap cost-grid">
        <div>
          <div className="eyebrow">A clearer buying decision</div>
          <h2>
            Compare the full purchase.
            <br />
            <span className="blue">Protect the application.</span>
          </h2>
          <p className="lead">
            Availability and prices can differ across countries. We help explore the sourcing route, check the product specification and compare the complete supply proposal.
          </p>
          <p>
            An alternative for the same application still needs your technical review. A lower unit price becomes useful only when the product, evidence and delivery meet the requirement.
          </p>
          <button
            type="button"
            className="text-link"
            onClick={() => onOpenEnquiry('product')}
          >
            Review my sourcing requirement <span aria-hidden="true">↗</span>
          </button>
        </div>

        <div className="comparison-card">
          <div className="comparison-header">WHAT TO COMPARE</div>
          <div>
            <strong>Product & specification</strong>
            <p>Identical catalogue number and pack size, or an explicitly identified candidate alternative.</p>
          </div>
          <div>
            <strong>Total delivered cost</strong>
            <p>Product, freight, handling and applicable charges — with inclusions and exclusions clear in the quote.</p>
          </div>
          <div>
            <strong>Your team’s coordination time</strong>
            <p>Requirement translation, manufacturer questions, document requests and supply follow-up.</p>
          </div>
          <div>
            <strong>Delivery & evidence</strong>
            <p>Confirmed availability, delivery commitment and the documents needed for your review.</p>
          </div>
        </div>
      </div>
    </section>
  );
};
