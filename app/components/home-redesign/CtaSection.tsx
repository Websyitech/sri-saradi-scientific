'use client';

import React from 'react';

interface CtaSectionProps {
  onOpenEnquiry: (category?: string) => void;
}

export const CtaSection: React.FC<CtaSectionProps> = ({ onOpenEnquiry }) => {
  return (
    <section className="cta">
      <div className="wrap cta-inner">
        <div>
          <h2 style={{ color: '#ffffff' }}>
            Bring us the requirement.
            <br />
            We’ll help connect the next steps.
          </h2>
          <p style={{ color: '#ffffff', opacity: 0.95 }}>
            A protocol, a process condition or a project brief is a good place to start.
          </p>
        </div>
        <button
          type="button"
          className="btn light"
          onClick={() => onOpenEnquiry('product')}
        >
          Let’s discuss it <span aria-hidden="true">↗</span>
        </button>
      </div>
    </section>
  );
};
