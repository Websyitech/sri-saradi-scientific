'use client';

import React from 'react';

interface TeamMember {
  name: string;
  role: string;
  image: string;
  imageWidth: number;
  imageHeight: number;
  description: string;
}

const TEAM_MEMBERS: TeamMember[] = [
  {
    name: 'Kali Krishna Praveen Gadde',
    role: 'CO-FOUNDER / ANALYTICAL SCIENCE & STRATEGY',
    image: '/assets/praveen.jpg',
    imageWidth: 1174,
    imageHeight: 1577,
    description:
      'Experience in analytical R&D, method development, validation and scientific documentation, combined with management and value-chain work.',
  },
  {
    name: 'Srilatha Kolla',
    role: 'CO-FOUNDER / ANALYTICAL SCIENCE & COORDINATION',
    image: '/assets/srilatha.jpg',
    imageWidth: 1216,
    imageHeight: 913,
    description:
      'Experience in NMR and analytical research, scientific query resolution, documentation and coordination across QC, QA and R&D teams.',
  },
  {
    name: 'Gayam Prasanna Kumar Reddy',
    role: 'CO-FOUNDER / MOLECULAR & COMPUTATIONAL BIOLOGY',
    image: '/assets/prasanna.jpeg',
    imageWidth: 1195,
    imageHeight: 896,
    description:
      'Experience spanning cell culture, molecular biology, computational screening and experimental research in pharmaceutical biotechnology.',
  },
];

export const TeamSection: React.FC = () => {
  return (
    <section className="section team-section" id="scientific-team">
      <div className="wrap team-wrap">
        {/* Section Header */}
        <div className="team-section-head reveal visible">
          <div className="team-head-left">
            <div className="eyebrow team-eyebrow">
              Built by people who have worked at the bench
            </div>
            <h2 className="team-main-heading">
              Scientific experience.
              <br />
              A practical understanding
              <br />
              <span className="team-heading-accent">of procurement friction.</span>
            </h2>
          </div>
          <div className="team-head-right">
          </div>
        </div>

        {/* 3 Co-Founder Cards */}
        <div className="team-grid reveal visible">
          {TEAM_MEMBERS.map((member, idx) => (
            <article key={idx} className="team-card">
              <div className="team-portrait-wrapper">
                <img
                  src={member.image}
                  alt={member.name}
                  loading="lazy"
                  width={member.imageWidth}
                  height={member.imageHeight}
                  className="team-portrait-img"
                />
                <div className="team-portrait-overlay" />
                <span className="team-founder-badge">Co-Founder</span>
              </div>

              <div className="team-copy">
                <span className="team-role-tag">{member.role}</span>
                <h3 className="team-member-name">{member.name}</h3>
                <p className="team-member-desc">{member.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
