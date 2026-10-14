'use client';

import React, { useState } from 'react';
import { documentsData, DocumentItem } from './documents-data';

interface DocumentationSectionProps {
  onOpenEnquiry: (category?: string) => void;
}

export const DocumentationSection: React.FC<DocumentationSectionProps> = ({ onOpenEnquiry }) => {
  const [activeDoc, setActiveDoc] = useState<'datasheet' | 'coa' | 'citations'>('datasheet');

  const currentDoc: DocumentItem = documentsData[activeDoc];

  return (
    <section className="section" id="documentation">
      <div className="wrap docs-grid">
        <div className="docs-copy reveal visible">
          <div className="eyebrow">Evidence before commitment</div>
          <h2>
            Evidence to review.
            <br />
            <span className="blue">Questions to resolve.</span>
          </h2>
          <p>
            For reagents, antibodies and molecular biology kits, request manufacturer datasheets, the relevant COA and available product citations through Sri Saradi.
          </p>
          <p>
            We help identify the relevant information and take open product questions back to the manufacturer. Your team assesses suitability for its method.
          </p>
          <button
            type="button"
            className="text-link"
            onClick={() => onOpenEnquiry('documentation')}
          >
            Request product documents <span aria-hidden="true">↗</span>
          </button>
        </div>

        <div className="document-stack reveal visible">
          <div className="document-card">
            <div className="doc-top">
              <span>Product evidence pack</span>
              <span>{currentDoc.number} / 03</span>
            </div>

            <div className="doc-tabs" role="tablist" aria-label="Documentation types">
              <button
                type="button"
                role="tab"
                id="doc-tab-datasheet"
                aria-selected={activeDoc === 'datasheet'}
                aria-controls="doc-content"
                onClick={() => setActiveDoc('datasheet')}
              >
                Datasheet
              </button>
              <button
                type="button"
                role="tab"
                id="doc-tab-coa"
                aria-selected={activeDoc === 'coa'}
                aria-controls="doc-content"
                onClick={() => setActiveDoc('coa')}
              >
                COA
              </button>
              <button
                type="button"
                role="tab"
                id="doc-tab-citations"
                aria-selected={activeDoc === 'citations'}
                aria-controls="doc-content"
                onClick={() => setActiveDoc('citations')}
              >
                Citations
              </button>
            </div>

            <div
              className="doc-content"
              id="doc-content"
              role="tabpanel"
              aria-labelledby={`doc-tab-${activeDoc}`}
            >
              <div className="doc-kicker">{currentDoc.label}</div>
              <h3>{currentDoc.title}</h3>
              <p>{currentDoc.description}</p>
              <div style={{ marginTop: '16px' }}>
                {currentDoc.checks.map((check, idx) => (
                  <div key={idx} className="doc-check">
                    {check}
                  </div>
                ))}
              </div>
            </div>

            <div className="doc-foot">Document availability and batch information are product-specific.</div>
          </div>
        </div>
      </div>
    </section>
  );
};
