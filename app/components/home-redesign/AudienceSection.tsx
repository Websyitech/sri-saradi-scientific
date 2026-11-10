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

          <button
            type="button"
            className="audience-enquiry-btn"
            onClick={() => onOpenEnquiry(activeAudience === 'dealer' ? 'dealer' : 'product')}
          >
            <span>{activeAudience === 'dealer' ? 'Discuss dealer collaboration' : 'Discuss your requirement'}</span>
            <span className="arrow" aria-hidden="true">↗</span>
          </button>
        </div>

        <div className="audience-benefits-col">
          <div className="audience-tabs-bar">
            <div className="tab-bar audience-tabs" role="tablist" aria-label="Benefits for your organisation">
              <button
                id="audience-tab-enduser"
                type="button"
                role="tab"
                aria-selected={activeAudience === 'enduser'}
                aria-controls="audience-panel"
                onClick={() => setActiveAudience('enduser')}
              >
                Labs &amp; industries
              </button>
              <button
                id="audience-tab-dealer"
                type="button"
                role="tab"
                aria-selected={activeAudience === 'dealer'}
                aria-controls="audience-panel"
                onClick={() => setActiveAudience('dealer')}
              >
                Dealers
              </button>
            </div>
          </div>

          <div
            className="audience-benefits"
            id="audience-panel"
            role="tabpanel"
            aria-labelledby={`audience-tab-${activeAudience}`}
            aria-live="polite"
          >
            {benefits.map((b, i) => (
              <article key={i} className="benefit-card">
                <div className="benefit-icon-wrap" aria-hidden="true">
                  <SvgIcon name={b.icon} />
                </div>
                <div className="benefit-content">
                  <h3>{b.title}</h3>
                  <p>{b.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>

      <div className="wrap">
        <div className="collaboration-model" id="collaboration-model">
          <div className="model-caption">
            <div>
              <div className="eyebrow">How collaboration works</div>
              <h3>Connected through scientific understanding</h3>
            </div>
            <p>Application knowledge and product expertise, connected through Sri Saradi.</p>
          </div>

          <div id="role-map" className="role-map">
            {roles.map((r, n) => (
              <React.Fragment key={n}>
                {n > 0 && (
                  <div className="role-link" aria-hidden="true">
                    <span className="role-link-dot"></span>
                    <span className="role-link-arrow">⇄</span>
                  </div>
                )}
                <article className={`role-card ${n === 1 ? 'role-centre' : ''}`}>
                  <div className="role-heading">
                    <div className="role-icon-wrap" aria-hidden="true">
                      <SvgIcon name={r.icon} />
                    </div>
                    <span className="role-label">{r.label}</span>
                  </div>
                  <h3>{r.title}</h3>
                  <div className="role-details">
                    {r.items.map((item, idx) => (
                      <div key={idx} className="role-detail-item">
                        <span className="detail-check" aria-hidden="true">✓</span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </article>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

