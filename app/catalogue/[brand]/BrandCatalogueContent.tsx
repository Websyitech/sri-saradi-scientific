"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { catalogues, type Catalogue } from "../catalogue-data";
import { EnquiryModal } from "../../components/home-redesign/EnquiryModal";
import shared from "../../services/services.module.css";
import styles from "./brand.module.css";

interface Props {
  current: Catalogue;
}

export default function BrandCatalogueContent({ current }: Props) {
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const [enquiryCategory, setEnquiryCategory] = useState(current.category);

  const openEnquiry = (category = current.category) => {
    setEnquiryCategory(category);
    setIsEnquiryOpen(true);
  };

  const otherBrands = catalogues.filter((c) => c.slug !== current.slug);

  return (
    <main className={`${shared.page} ${styles.page}`}>
      {/* ── Back breadcrumb ── */}
      <div className={styles.breadcrumb}>
        <div className={shared.wrap}>
          <Link href="/catalogue" className={styles.back}>
            ← All catalogues
          </Link>
        </div>
      </div>

      {/* ── Hero ── */}
      <section className={styles.hero}>
        <div className={shared.wrap}>
          <div className={styles.heroInner}>
            <div
              className={styles.bookLarge}
              style={{ background: current.color }}
            >
              <small>Principal</small>
              {current.brand}
              <br />
              {current.subtitle}
            </div>
            <div className={styles.heroCopy}>
              <div className={shared.eyebrow}>Brand catalogue</div>
              <h1>
                {current.brand}
                {current.subtitle ? ` ${current.subtitle}` : ""}
              </h1>
              <p className={shared.lead}>{current.title}</p>
              <p className={styles.heroDesc}>{current.description}</p>
              <div className={shared.actions}>
                {/* <a
                  className={shared.button}
                  href={current.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View catalogue PDF <span aria-hidden="true">↗</span>
                </a> */}
                <a
                  className={shared.textLink}
                  href={current.pdfUrl}
                  download={`${current.pdfName} Catalogue.pdf`}
                >
                  Download {current.pdfName} catalogue{" "}
                  <span aria-hidden="true">↓</span>
                </a>
                <button
                  className={shared.textLink}
                  onClick={() => openEnquiry()}
                >
                  {current.action} <span aria-hidden="true">↗</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Brand's PDF options ── */}
      <section className={styles.viewerSection}>
        <div className={shared.wrap}>
          <div className={shared.eyebrow}>{current.pdfName} catalogue document</div>
          <ul className={styles.documentGrid} id={`catalogue-${current.slug}`}>
            {[
              { title: `${current.pdfName} Catalogue`, pdfUrl: current.pdfUrl },
              ...(current.documents ?? []),
            ].map((document) => (
              <li key={document.pdfUrl}>
                <a className={styles.documentLink} href={document.pdfUrl} target="_blank" rel="noopener noreferrer">
                  <Image
                    className={styles.documentPreview}
                    src={document.pdfUrl.replace(/\.pdf$/, "-preview.webp")}
                    alt=""
                    width={384}
                    height={384}
                    sizes="(max-width: 760px) 45vw, 180px"
                  />
                  <span>{document.title}</span>
                  <span className={shared.srOnly}> (PDF, opens in a new tab)</span>
                </a>
                <a className={styles.downloadLink} href={document.pdfUrl} download>
                  Download PDF
                  <span className={shared.srOnly}>: {document.title}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Other brands nav ── */}
      <section className={styles.brandsNav}>
        <div className={shared.wrap}>
          <div className={shared.eyebrow}>Explore other brands</div>
          <div className={styles.brandCards}>
            {otherBrands.map((cat) => (
              <Link
                key={cat.slug}
                href={`/catalogue/${cat.slug}`}
                className={styles.brandCard}
              >
                <div
                  className={styles.brandCardBook}
                  style={{ background: cat.color }}
                >
                  <small>Principal</small>
                  {cat.brand}
                  <br />
                  {cat.subtitle}
                </div>
                <div className={styles.brandCardCopy}>
                  <strong>
                    {cat.brand}
                    {cat.subtitle ? ` ${cat.subtitle}` : ""}
                  </strong>
                  <span>{cat.title}</span>
                  <span className={styles.brandCardLink}>
                    View {cat.pdfName} catalogue ↗
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <EnquiryModal
        isOpen={isEnquiryOpen}
        onClose={() => setIsEnquiryOpen(false)}
        initialCategory={enquiryCategory}
      />
    </main>
  );
}
