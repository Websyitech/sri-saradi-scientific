import React from 'react';

export const FaqSection: React.FC = () => {
  return (
    <section className="section faq-section">
      <div className="wrap faq-grid">
        <div>
          <div className="eyebrow">Working with your team</div>
          <h2>
            Why work
            <br />
            with Sri Saradi?
          </h2>
          <p className="lead">
            Discuss the requirement and the work you want us to coordinate. Your team retains the application assessment and approval.
          </p>
        </div>

        <div className="faq-list">
          <details open>
            <summary>We already have a technical team. How do you help?</summary>
            <p>
              Your team defines the application and acceptance criteria. We coordinate product-specific questions with our principals, gather relevant documents and connect the agreed specification with a quotation and supply follow-up. Your team retains the decision on suitability and any required qualification.
            </p>
          </details>

          <details>
            <summary>Why work with Sri Saradi if we can import directly?</summary>
            <p>
              You can import directly. Sri Saradi adds a scientist-led contact who turns the application into a sourcing brief, coordinates product answers and documents, and connects the agreed order with integrated logistics. Compare the complete delivered cost and the work your team must do in each route. We earn the collaboration when that combination is valuable for your requirement.
            </p>
          </details>

          <details>
            <summary>What support is available to dealers?</summary>
            <p>
              Dealers can work with us on principal portfolio access, product options, quotations, documents and manufacturer questions for their customers. Discuss account handling, customer-contact permissions and commercial terms at the outset. Direct end-user supply and dealer collaboration are separate arrangements.
            </p>
          </details>

          <details>
            <summary>How do we compare cost and delivery?</summary>
            <p>
              Product price and availability can vary between countries. Compare the identical product and pack size where possible, then freight, handling, applicable charges and the coordination effort. A different product for the same application is a candidate for technical assessment, not an automatic equivalent. Our quotation makes the proposed product, included costs and delivery plan explicit.
            </p>
          </details>

          <details>
            <summary>How does your 15-working-day worldwide delivery offer work?</summary>
            <p>
              We coordinate product availability, handling requirements, documentation and the shipping route through an integrated logistics approach. The 15-working-day offer applies to product orders accepted under that delivery commitment; the start date, destination and any order-specific exceptions are confirmed in the quotation. Custom synthesis, expression and discovery services have separately agreed project timelines.
            </p>
          </details>

          <details>
            <summary>Who establishes whether a product is suitable?</summary>
            <p>
              The manufacturer provides product specifications and available technical evidence. Sri Saradi coordinates questions and documentation. Your technical team assesses suitability and defines any evaluation or qualification needed for its application. We remain available for product questions and manufacturer follow-up.
            </p>
          </details>
        </div>
      </div>
    </section>
  );
};
