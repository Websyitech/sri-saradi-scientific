"use client";

import { useState } from "react";
import Link from "next/link";
import { catalogues } from "./catalogue-data";
import { DocumentationSection } from "../components/home-redesign/DocumentationSection";
import { EnquiryModal } from "../components/home-redesign/EnquiryModal";
import shared from "../services/services.module.css";
import styles from "./catalogues.module.css";

export default function CataloguesContent() {
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const [enquiryCategory, setEnquiryCategory] = useState("product");

  const openEnquiry = (category = "product") => {
    setEnquiryCategory(category);
    setIsEnquiryOpen(true);
  };

  return (
    <main className={`${shared.page} ${styles.page}`} id="catalogues-main">
      <section className={styles.hero} aria-labelledby="catalogues-heading">
        <div className={shared.wrap}>
          <div className={shared.eyebrow}>Catalogues &amp; documentation</div>
          <h1 id="catalogues-heading">Explore the portfolio.<br /><span className={shared.blue}>Start with your application.</span></h1>
          <p className={shared.lead}>Use a catalogue to explore product scope. When you need to confirm product fit, availability or supporting evidence, bring the requirement to our team.</p>
          <div className={shared.actions}>
            <button className={shared.button} onClick={() => openEnquiry()}>Help me select a product <span aria-hidden="true">↗</span></button>
            <Link className={shared.textLink} href="/">Explore our website <span aria-hidden="true">↗</span></Link>
          </div>
        </div>
      </section>

      <section className={shared.section} aria-label="Principal catalogues">
        <div className={shared.wrap}>
          <div className={styles.grid}>
            {catalogues.map((catalogue) => (
              <article className={styles.card} key={catalogue.category}>
                {/* Book cover opens PDF directly */}
                {catalogue.pdfUrl ? (
                  <a
                    href={catalogue.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.bookLink}
                    aria-label={`View ${catalogue.brand} catalogue PDF`}
                  >
                    <div className={styles.book} style={{ background: catalogue.color }}>
                      <small>Principal</small>
                      {catalogue.brand}<br />{catalogue.subtitle}
                    </div>
                  </a>
                ) : (
                  <div className={styles.book} style={{ background: catalogue.color }}>
                    <small>Principal</small>
                    {catalogue.brand}<br />{catalogue.subtitle}
                  </div>
                )}
                <h2>{catalogue.title}</h2>
                <p>{catalogue.description}</p>
                <div className={styles.cardActions}>
                  <Link className={shared.textLink} href={`/catalogue/${catalogue.slug}`}>
                    Explore all {catalogue.pdfName} catalogues <span aria-hidden="true">→</span>
                  </Link>
                  {/* Enquire */}
                  <button className={shared.textLink} onClick={() => openEnquiry(catalogue.category)}>
                    {catalogue.action} <span aria-hidden="true">↗</span>
                  </button>
                </div>
              </article>
            ))}
          </div>
          <aside className={shared.notice}>Already have a catalogue number? Include it with the application, quantity and required date for a more precise discussion.</aside>
          <div className={shared.actions}>
            <a className={`${shared.button} ${styles.outline}`} href="/assets/services-catalogue.pdf" target="_blank" rel="noopener noreferrer">Download scientific services catalogue <span aria-hidden="true">↗</span><span className={shared.srOnly}> (PDF, opens in a new tab)</span></a>
          </div>
        </div>
      </section>

      <DocumentationSection onOpenEnquiry={openEnquiry} />

      <section className={shared.cta} aria-labelledby="catalogues-cta-heading">
        <div className={shared.wrap}>
          <div>
            <h2 id="catalogues-cta-heading">Bring us the requirement.<br />We&apos;ll help connect the next steps.</h2>
            <p>A protocol, a process condition or a project brief is a good place to start.</p>
          </div>
          <button className={`${shared.button} ${shared.lightButton}`} onClick={() => openEnquiry()}>Let&apos;s discuss it <span aria-hidden="true">↗</span></button>
        </div>
      </section>

      <EnquiryModal isOpen={isEnquiryOpen} onClose={() => setIsEnquiryOpen(false)} initialCategory={enquiryCategory} />
    </main>
  );
}
