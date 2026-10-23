'use client';

import React from 'react';

interface CtaSectionProps {
  onOpenEnquiry: (category?: string) => void;
}

export const CtaSection: React.FC<CtaSectionProps> = ({ onOpenEnquiry }) => {
  return (
    <section className="cta" id="cta">
      <div className="wrap cta-inner">
        <div className="cta-copy">
          <h2 className="cta-heading">
            Bring us the requirement.
            <br />
            <span className="cta-heading-highlight">We’ll help connect the next steps.</span>
          </h2>
          <p className="cta-lead">
            A protocol, a process condition or a project brief is a good place to start.
          </p>
        </div>
        <button
          type="button"
          className="btn light cta-action-btn"
          onClick={() => onOpenEnquiry('product')}
        >
          <span>Let’s discuss it</span>
          <span aria-hidden="true">↗</span>
        </button>
      </div>
    </section>
  );
};
