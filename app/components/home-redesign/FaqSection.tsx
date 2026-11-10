'use client';

import React, { useState } from 'react';

interface FaqItem {
  id: string;
  number: string;
  question: string;
  answer: string;
}

const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'faq-1',
    number: '01',
    question: 'We already have a technical team. How do you help?',
    answer:
      'Your team defines the application and acceptance criteria. We coordinate product-specific questions with our principals, gather relevant documents and connect the agreed specification with a quotation and supply follow-up. Your team retains the decision on suitability and any required qualification.',
  },
  {
    id: 'faq-2',
    number: '02',
    question: 'Why work with Sri Saradi if we can import directly?',
    answer:
      'You can import directly. Sri Saradi adds a scientist-led contact who turns the application into a sourcing brief, coordinates product answers and documents, and connects the agreed order with integrated logistics. Compare the complete delivered cost and the work your team must do in each route. We earn the collaboration when that combination is valuable for your requirement.',
  },
  {
    id: 'faq-3',
    number: '03',
    question: 'What support is available to dealers?',
    answer:
      'Dealers can work with us on principal portfolio access, product options, quotations, documents and manufacturer questions for their customers. Discuss account handling, customer-contact permissions and commercial terms at the outset. Direct end-user supply and dealer collaboration are separate arrangements.',
  },
  {
    id: 'faq-4',
    number: '04',
    question: 'How do we compare cost and delivery?',
    answer:
      'Product price and availability can vary between countries. Compare the identical product and pack size where possible, then freight, handling, applicable charges and the coordination effort. A different product for the same application is a candidate for technical assessment, not an automatic equivalent. Our quotation makes the proposed product, included costs and delivery plan explicit.',
  },
  {
    id: 'faq-5',
    number: '05',
    question: 'How does your 15-working-day worldwide delivery offer work?',
    answer:
      'We coordinate product availability, handling requirements, documentation and the shipping route through an integrated logistics approach. The 15-working-day offer applies to product orders accepted under that delivery commitment; the start date, destination and any order-specific exceptions are confirmed in the quotation. Custom synthesis, expression and discovery services have separately agreed project timelines.',
  },
  {
    id: 'faq-6',
    number: '06',
    question: 'Who establishes whether a product is suitable?',
    answer:
      'The manufacturer provides product specifications and available technical evidence. Sri Saradi coordinates questions and documentation. Your technical team assesses suitability and defines any evaluation or qualification needed for its application. We remain available for product questions and manufacturer follow-up.',
  },
];

interface FaqSectionProps {
  onOpenEnquiry?: (category?: string) => void;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ onOpenEnquiry }) => {
  const [openIds, setOpenIds] = useState<string[]>(['faq-1']);

  const toggleItem = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <section className="section faq-section" id="faq">
      <div className="wrap faq-grid">
        {/* Left Column: Sticky Header & Trust Highlights */}
        <div className="faq-sidebar reveal visible">
          <div className="faq-eyebrow">
            <span>Working with your team</span>
          </div>

          <h2 className="faq-main-heading">
            Why work
            <br />
            <span className="faq-heading-accent">with Sri Saradi?</span>
          </h2>

          <p className="faq-lead-text">
            Discuss the requirement and the work you want us to coordinate. Your team retains the application assessment and approval.
          </p>

          <div className="faq-trust-card">
            <div className="faq-trust-header">
              <span className="faq-trust-badge">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
                Collaboration Guarantee
              </span>
            </div>

            <ul className="faq-trust-list">
              <li>
                <span className="faq-trust-icon">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#009fe3" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </span>
                <span>Your team retains application assessment &amp; final approval</span>
              </li>
              <li>
                <span className="faq-trust-icon">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#009fe3" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </span>
                <span>Direct manufacturer coordination &amp; lot-specific COA documents</span>
              </li>
              <li>
                <span className="faq-trust-icon">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#009fe3" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </span>
                <span>Transparent quotes with itemized landed costs &amp; timeline</span>
              </li>
            </ul>

            {onOpenEnquiry && (
              <button
                type="button"
                className="faq-cta-btn"
                onClick={() => onOpenEnquiry('technical')}
              >
                <span>Discuss your requirement</span>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Right Column: Redesigned Accordion Items */}
        <div className="faq-accordion-list reveal visible" role="region" aria-label="Frequently Asked Questions">
          {FAQ_ITEMS.map((item) => {
            const isOpen = openIds.includes(item.id);
            return (
              <div
                key={item.id}
                className={`faq-card ${isOpen ? 'is-open' : ''}`}
              >
                <button
                  type="button"
                  className="faq-card-header"
                  onClick={() => toggleItem(item.id)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${item.id}`}
                  id={`faq-btn-${item.id}`}
                >
                  <span className="faq-card-num">{item.number}</span>
                  <span className="faq-card-question">{item.question}</span>
                  <span className={`faq-card-icon-pill ${isOpen ? 'active' : ''}`} aria-hidden="true">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="faq-icon-svg"
                    >
                      <line x1="12" y1="5" x2="12" y2="19" className="faq-line-v" />
                      <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                  </span>
                </button>

                <div
                  id={`faq-answer-${item.id}`}
                  role="region"
                  aria-labelledby={`faq-btn-${item.id}`}
                  className={`faq-card-collapse ${isOpen ? 'is-expanded' : ''}`}
                >
                  <div className="faq-card-body">
                    <div className="faq-card-divider" />
                    <p>{item.answer}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
