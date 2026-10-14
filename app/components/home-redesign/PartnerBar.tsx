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
          Solarbio
          <span>Reagents, antibodies & kits</span>
        </div>
        <div className="partner">
          Orient Filtr
          <span>Laboratory & process filtration</span>
        </div>
        <div className="partner">
          Galactics
          <span>Specialist biological plasticware</span>
        </div>
      </div>
    </section>
  );
};
