import React from 'react';
import Image from 'next/image';

export const TeamSection: React.FC = () => {
  return (
    <section className="section team-section" id="scientific-team">
      <div className="wrap">
        <div className="section-head">
          <div>
            <div className="eyebrow">Built by people who have worked at the bench</div>
            <h2>
              Scientific experience.
              <br />
              A practical understanding
              <br />
              of procurement friction.
            </h2>
          </div>
          <p>
            Our three co-founders bring nearly a decade of combined bench experience, with complementary strengths in analytical research, scientific coordination and molecular biology.
          </p>
        </div>

        <div className="team-grid">
          {/* Praveen */}
          <article className="team-card">
            <div className="portrait">
              <img
                src="/assets/praveen.jpg"
                alt="Kali Krishna Praveen Gadde"
                loading="lazy"
                width={1174}
                height={1577}
              />
            </div>
            <div className="team-copy">
              <small>CO-FOUNDER / ANALYTICAL SCIENCE & STRATEGY</small>
              <h3>
                Kali Krishna
                <br />
                Praveen Gadde
              </h3>
              <p>
                Experience in analytical R&D, method development, validation and scientific documentation, combined with management and value-chain work.
              </p>
            </div>
          </article>

          {/* Srilatha */}
          <article className="team-card">
            <div className="portrait">
              <img
                src="/assets/srilatha.jpg"
                alt="Srilatha Kolla"
                loading="lazy"
                width={1216}
                height={913}
              />
            </div>
            <div className="team-copy">
              <small>CO-FOUNDER / ANALYTICAL SCIENCE & COORDINATION</small>
              <h3>Srilatha Kolla</h3>
              <p>
                Experience in NMR and analytical research, scientific query resolution, documentation and coordination across QC, QA and R&D teams.
              </p>
            </div>
          </article>

          {/* Prasanna */}
          <article className="team-card">
            <div className="portrait">
              <img
                src="/assets/prasanna.jpeg"
                alt="Gayam Prasanna Kumar Reddy"
                loading="lazy"
                width={1195}
                height={896}
              />
            </div>
            <div className="team-copy">
              <small>CO-FOUNDER / MOLECULAR & COMPUTATIONAL BIOLOGY</small>
              <h3>
                Gayam Prasanna
                <br />
                Kumar Reddy
              </h3>
              <p>
                Experience spanning cell culture, molecular biology, computational screening and experimental research in pharmaceutical biotechnology.
              </p>
            </div>
          </article>
        </div>

        <div className="team-note">
          <strong>We understand the scientific conversation.</strong>
          <p>
            That helps us ask useful questions, preserve the application detail and connect your team with the manufacturer’s product expertise.
          </p>
        </div>
      </div>
    </section>
  );
};
