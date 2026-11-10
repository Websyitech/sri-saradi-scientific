'use client';

import React, { useState } from 'react';
import { documentsData, DocumentItem } from './documents-data';

interface DocumentationSectionProps {
  onOpenEnquiry: (category?: string) => void;
}

const TAB_ICONS: Record<'datasheet' | 'coa' | 'citations', React.ReactNode> = {
  datasheet: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
      <polyline points="14 2 14 8 20 8"/>
      <line x1="16" y1="13" x2="8" y2="13"/>
      <line x1="16" y1="17" x2="8" y2="17"/>
      <line x1="10" y1="9" x2="8" y2="9"/>
    </svg>
  ),
  coa: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
      <polyline points="22 4 12 14.01 9 11.01"/>
    </svg>
  ),
  citations: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 20h9"/>
      <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
    </svg>
  ),
};

const CHECK_ICON = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#009FE3" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

export const DocumentationSection: React.FC<DocumentationSectionProps> = ({ onOpenEnquiry }) => {
  const [activeDoc, setActiveDoc] = useState<'datasheet' | 'coa' | 'citations'>('datasheet');

  const currentDoc: DocumentItem = documentsData[activeDoc];
  const tabs: ('datasheet' | 'coa' | 'citations')[] = ['datasheet', 'coa', 'citations'];
  const tabLabels: Record<'datasheet' | 'coa' | 'citations', string> = {
    datasheet: 'Datasheet',
    coa: 'COA',
    citations: 'Citations',
  };

  return (
    <section className="section docs-evidence-section" id="documentation">
      <div className="wrap docs-evidence-grid">

        {/* LEFT — Interactive Document Card */}
        <div className="docs-card-col reveal">
          <div className="docs-card">
            {/* Card header bar */}
            <div className="docs-card-header">
              <div className="docs-card-header-left">
                <div className="docs-card-dot docs-card-dot--red" />
                <div className="docs-card-dot docs-card-dot--yellow" />
                <div className="docs-card-dot docs-card-dot--green" />
              </div>
              <span className="docs-card-title-label">Product evidence pack</span>
              <span className="docs-card-counter">{currentDoc.number} / 03</span>
            </div>

            {/* Tab pills */}
            <div className="docs-tab-pills" role="tablist" aria-label="Documentation types">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  type="button"
                  role="tab"
                  id={`doc-tab-${tab}`}
                  aria-selected={activeDoc === tab}
                  aria-controls="doc-panel"
                  className={`docs-tab-pill${activeDoc === tab ? ' active' : ''}`}
                  onClick={() => setActiveDoc(tab)}
                >
                  <span className="docs-tab-icon">{TAB_ICONS[tab]}</span>
                  {tabLabels[tab]}
                </button>
              ))}
            </div>

            {/* Tab content panel */}
            <div className="docs-panel" id="doc-panel" role="tabpanel" aria-labelledby={`doc-tab-${activeDoc}`}>
              <div className="docs-panel-kicker">{currentDoc.label}</div>
              <h3 className="docs-panel-title">{currentDoc.title}</h3>
              <p className="docs-panel-desc">{currentDoc.description}</p>

              <ul className="docs-check-list">
                {currentDoc.checks.map((check, idx) => (
                  <li key={idx} className="docs-check-item">
                    <span className="docs-check-icon">{CHECK_ICON}</span>
                    <span>{check}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Card footer */}
            <div className="docs-card-footer">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="8" x2="12" y2="12"/>
                <line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              Document availability and batch information are product-specific.
            </div>
          </div>
        </div>

        {/* RIGHT — Copy */}
        <div className="docs-copy-col reveal">
          <div className="eyebrow">Evidence before commitment</div>
          <h2>
            Evidence to review.
            <br />
            <span className="blue">Questions to resolve.</span>
          </h2>
          <p className="docs-lead">
            For reagents, antibodies and molecular biology kits, request manufacturer datasheets, the relevant COA and available product citations through Sri Saradi.
          </p>
          <p className="docs-lead" style={{ marginTop: '16px' }}>
            We help identify the relevant information and take open product questions back to the manufacturer. Your team assesses suitability for its method.
          </p>

          <div className="docs-features">
            <div className="docs-feature-item">
              <div className="docs-feature-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#009FE3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
              </div>
              <div>
                <strong>Manufacturer datasheets</strong>
                <span>Specifications, applications &amp; protocols</span>
              </div>
            </div>
            <div className="docs-feature-item">
              <div className="docs-feature-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#009FE3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
              </div>
              <div>
                <strong>Certificate of Analysis</strong>
                <span>Batch-level quality &amp; lot reports</span>
              </div>
            </div>
            <div className="docs-feature-item">
              <div className="docs-feature-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#009FE3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
              </div>
              <div>
                <strong>Published citations</strong>
                <span>Peer-reviewed experimental context</span>
              </div>
            </div>
          </div>

          <button
            type="button"
            className="btn docs-cta-btn"
            onClick={() => onOpenEnquiry('documentation')}
          >
            Request product documents
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </button>
        </div>
      </div>
    </section>
  );
};
