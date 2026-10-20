'use client';

import React, { useState } from 'react';
import { audienceBenefits, collaborationRoles } from './audience-data';
import { SvgIcon } from './SvgIcon';

interface AudienceSectionProps {
  onOpenEnquiry: (category?: string) => void;
}

export const AudienceSection: React.FC<AudienceSectionProps> = ({ onOpenEnquiry }) => {
  const [activeAudience, setActiveAudience] = useState<'enduser' | 'dealer'>('enduser');

  const benefits = audienceBenefits[activeAudience];
  const roles = collaborationRoles[activeAudience];

  return (
    <section className="section audience-section" id="benefits">
      <div className="wrap audience-grid">
        <div className="audience-copy reveal visible">
          <div className="eyebrow">The value of collaboration</div>
          <h2>
            Less procurement coordination.
            <br />
            More focus on your work.
          </h2>
          <p className="lead">
            Your scientists keep the application decisions. Your procurement team gets a clearer requirement and supply proposal. We coordinate product questions, evidence and logistics so both teams can move forward together.
          </p>

          <div className="tab-bar" role="tablist" aria-label="Benefits for your organisation">
            <button
              id="audience-tab-enduser"
              role="tab"
              aria-selected={activeAudience === 'enduser'}
              aria-controls="audience-panel"
              onClick={() => setActiveAudience('enduser')}
            >
              Labs & industries
            </button>
            <button
              id="audience-tab-dealer"
              role="tab"
              aria-selected={activeAudience === 'dealer'}
              aria-controls="audience-panel"
              onClick={() => setActiveAudience('dealer')}
            >
              Dealers
            </button>
          </div>

          <button
            type="button"
            className="text-link"
            onClick={() => onOpenEnquiry(activeAudience === 'dealer' ? 'dealer' : 'product')}
          >
            {activeAudience === 'dealer' ? 'Discuss dealer collaboration ↗' : 'Discuss your requirement ↗'}
          </button>
        </div>

        <div
          className="audience-benefits"
          id="audience-panel"
          role="tabpanel"
          aria-labelledby={`audience-tab-${activeAudience}`}
          aria-live="polite"
        >
          {benefits.map((b, i) => (
            <article key={i} className="benefit">
              <SvgIcon name={b.icon} />
              <h3>{b.title}</h3>
              <p>{b.description}</p>
            </article>
          ))}
        </div>
      </div>

      <div className="wrap">
        <div className="collaboration-model" id="collaboration-model">
          <div className="model-caption">
            <div className="eyebrow">How collaboration works</div>
            <p>Application knowledge and product expertise, connected through Sri Saradi.</p>
          </div>

          <div id="role-map" className="role-map">
            {roles.map((r, n) => (
              <React.Fragment key={n}>
                {n > 0 && (
                  <div className="role-link" aria-hidden="true">
                    <span>↔</span>
                  </div>
                )}
                <article
                  className={`role-card ${n === 1 ? 'role-centre' : ''}`}
                  style={n === 1 ? { backgroundColor: '#34398A', borderColor: '#34398A', color: '#ffffff' } : undefined}
                >
                  <div
                    className="role-heading"
                    style={n === 1 ? { color: '#e2e6ff' } : undefined}
                  >
                    <SvgIcon name={r.icon} />
                    <span style={n === 1 ? { color: '#e2e6ff' } : undefined}>{r.label}</span>
                  </div>
                  <h3 style={n === 1 ? { color: '#ffffff' } : undefined}>{r.title}</h3>
                  <div className="role-details">
                    {r.items.map((item, idx) => (
                      <div
                        key={idx}
                        style={n === 1 ? { color: '#ffffff', borderColor: 'rgba(255, 255, 255, 0.22)' } : undefined}
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </article>
              </React.Fragment>
            ))}
          </div>

          <div className="model-foot" id="role-foot">
            {activeAudience === 'dealer'
              ? 'Commercial terms and customer-contact arrangements are agreed for the collaboration. The customer’s technical team assesses application suitability.'
              : 'Your team assesses and approves suitability. Supply and evaluation arrangements are agreed for the requirement.'}
          </div>
        </div>
      </div>
    </section>
  );
};
