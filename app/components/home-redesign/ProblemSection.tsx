import React from 'react';
import Image from 'next/image';

export const ProblemSection: React.FC = () => {
  return (
    <section className="section problem-section">
      <Image
        className="problem-section-banner"
        src="/assets/laboratory_banner_2.webp"
        alt=""
        fill
        sizes="100vw"
        aria-hidden="true"
        loading="lazy"
        decoding="async"
      />
      <div className="wrap problem-grid">
        <div className="reveal visible">
          <div className="eyebrow">The problem we solve</div>
          <h2>
            Your scientists explain the need.
            <br />
            We help turn it into a purchase.
          </h2>
          <p className="lead">
            A scientific requirement can lose detail as it moves from the bench to procurement, then across suppliers and countries. Your team spends time repeating the application, chasing specifications and checking what can actually be delivered.
          </p>
          <p className="lead">
            We bring the scientific and supply conversations together: an application brief, reviewed product options, relevant evidence and a procurement-ready quotation. Your team can spend less time coordinating the purchase and more time on the work it enables.
          </p>
        </div>

        <div className="problem-list reveal visible">
          <div className="problem-row">
            <span>01</span>
            <div>
              <h3>Which specification fits the application?</h3>
              <p>Discuss the method, sample or process conditions, then clarify the product characteristics that need review.</p>
            </div>
          </div>
          <div className="problem-row">
            <span>02</span>
            <div>
              <h3>What evidence supports the choice?</h3>
              <p>Review relevant product documents and obtain manufacturer answers to the questions your team raises.</p>
            </div>
          </div>
          <div className="problem-row">
            <span>03</span>
            <div>
              <h3>Who connects the technical and supply steps?</h3>
              <p>Bring product queries, quotations, sourcing and delivery follow-up into one working relationship with Sri Saradi.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
