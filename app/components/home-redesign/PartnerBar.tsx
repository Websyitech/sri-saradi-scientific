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
          <img
            src="/assets/solarbio_life_sciences_logo.webp"
            alt="Solarbio"
            className="partner-logo"
            width={213}
            height={85}
            style={{
              height: '30px',
              width: 'auto',
              objectFit: 'contain',
              display: 'block',
              marginBottom: '3px',
            }}
          />
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
