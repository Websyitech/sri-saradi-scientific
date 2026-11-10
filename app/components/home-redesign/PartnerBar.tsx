import React from 'react';

export const PartnerBar: React.FC = () => {
  return (
    <section className="partner-bar" aria-label="Our principals">
      <div className="wrap partner-inner">
        <div className="partner-label">
          Direct access to
          <br />
          our principals
        </div>
        <div className="partner">
          <div className="partner-brand">
            <img
              src="/assets/solarbio_life_sciences_logo.webp"
              alt="Solarbio"
              className="partner-logo"
              width={213}
              height={85}
            />
          </div>
          <span>Reagents, antibodies &amp; kits</span>
        </div>
        <div className="partner">
          <div className="partner-brand">
            <img
              src="/assets/orientfiltr-logo.webp"
              alt="Orient Filtr"
              className="partner-logo"
              width={955}
              height={247}
            />
          </div>
          <span>Laboratory &amp; process filtration</span>
        </div>
        <div className="partner">
          <div className="partner-brand">
            <img
              src="/assets/GenFollower_logo.webp"
              alt="GenFollower"
              className="partner-logo"
              width={2172}
              height={724}
            />
          </div>
          <span>Specialist biological plasticware</span>
        </div>
      </div>
    </section>
  );
};
