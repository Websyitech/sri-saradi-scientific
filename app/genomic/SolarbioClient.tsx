'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import './solarbio.css';
import { useZohoCheckout } from '../components/checkout/useZohoCheckout';

const CHECKOUT_SKU = 'solarbio-d1800-100t';

interface EnquiryFormState {
  name: string;
  organization: string;
  email: string;
  phone: string;
  request: string;
  quantity: string;
  message: string;
}

export default function SolarbioClient() {
  const router = useRouter();

  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [lightboxAlt, setLightboxAlt] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const checkout = useZohoCheckout();
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);
  const [buyer, setBuyer] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    address: '',
    gstin: '',
  });

  const [formState, setFormState] = useState<EnquiryFormState>({
    name: '',
    organization: '',
    email: '',
    phone: '',
    request: 'Formal quotation / purchase order',
    quantity: '1 kit',
    message: '',
  });

  const [submitting, setSubmitting] = useState(false);

  // Set Solarbio Favicon and activate standalone header/footer mode
  useEffect(() => {
    document.body.classList.add('solarbio-page-active');

    const iconLinks = Array.from(
      document.querySelectorAll<HTMLLinkElement>("link[rel*='icon']")
    );

    const prevIcons = iconLinks.map((el) => ({
      el,
      href: el.getAttribute('href') || '',
      type: el.getAttribute('type') || '',
    }));

    if (iconLinks.length === 0) {
      const newIcon = document.createElement('link');
      newIcon.rel = 'icon';
      newIcon.type = 'image/webp';
      newIcon.href = '/assets/solarbio/solarbio-favicon.webp';
      document.head.appendChild(newIcon);
    } else {
      iconLinks.forEach((el) => {
        el.href = '/assets/solarbio/solarbio-favicon.webp';
        el.type = 'image/webp';
      });
    }

    return () => {
      document.body.classList.remove('solarbio-page-active');
      prevIcons.forEach(({ el, href, type }) => {
        el.href = href;
        if (type) {
          el.type = type;
        } else {
          el.removeAttribute('type');
        }
      });
    };
  }, []);

  // Close lightbox on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeLightbox();
      }
    };

    if (lightboxImage) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [lightboxImage]);

  const openLightbox = (src: string, alt: string) => {
    setLightboxImage(src);
    setLightboxAlt(alt);
  };

  const closeLightbox = () => {
    setLightboxImage(null);
    setLightboxAlt('');
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10);
    if (!isNaN(val)) {
      const clamped = Math.max(1, Math.min(99, val));
      setQuantity(clamped);
      setFormState((prev) => ({
        ...prev,
        quantity: `${clamped} kit${clamped > 1 ? 's' : ''}`,
      }));
    } else {
      setQuantity(1);
    }
  };

  const stepQuantity = (delta: number) => {
    const next = Math.max(1, Math.min(99, quantity + delta));
    setQuantity(next);
    setFormState((prev) => ({
      ...prev,
      quantity: `${next} kit${next > 1 ? 's' : ''}`,
    }));
  };

  const handleBuyerChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setBuyer((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    checkout.pay({ sku: CHECKOUT_SKU, quantity, customer: buyer });
  };

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch('/api/quotes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formState.name,
          email: formState.email,
          phone: formState.phone,
          company: formState.organization,
          notes: `Request Type: ${formState.request} | Quantity: ${formState.quantity} | Details: ${formState.message}`,
          pageUrl: typeof window !== 'undefined' ? window.location.href : 'https://srisaradiscientific.com/genomic',
          items: [
            {
              name: 'Solarbio D1800 Blood Genomic DNA Extraction Kit (100T)',
              quantity: parseInt(formState.quantity) || quantity || 1,
            },
          ],
        }),
      });

      let orderRef = '';
      if (response.ok) {
        try {
          const data = await response.json();
          orderRef = data.orderId || data.quote?.orderId || '';
        } catch {}
      }

      const query = new URLSearchParams();
      if (orderRef) query.set('ref', orderRef);
      if (formState.name) query.set('name', formState.name);
      if (formState.organization) query.set('org', formState.organization);
      if (formState.email) query.set('email', formState.email);
      if (formState.quantity) query.set('qty', formState.quantity);

      router.push(`/genomic/thank-you?${query.toString()}`);
    } catch {
      const query = new URLSearchParams();
      if (formState.name) query.set('name', formState.name);
      if (formState.organization) query.set('org', formState.organization);
      if (formState.email) query.set('email', formState.email);
      if (formState.quantity) query.set('qty', formState.quantity);

      router.push(`/genomic/thank-you?${query.toString()}`);
    } finally {
      setSubmitting(false);
    }
  };

  const totalAmount = (22420 * quantity).toLocaleString('en-IN');

  return (
    <div className="solarbio-page" id="top">
      {/* Dedicated Navbar for Genomic Page */}
      <header className="sb-nav">
        <div className="sb-wrap sb-nav-in">
          <div className="sb-brand" title="Sri Saradi Scientific">
            <img
              src="/assets/sri-saradi-logo.png"
              alt="Sri Saradi Scientific"
              width={160}
              height={50}
              style={{ height: '48px', width: 'auto', display: 'block' }}
            />
          </div>
          <nav className="sb-nav-links" aria-label="Primary product navigation">
            <a href="#overview">Overview</a>
            <a href="#evidence">Experimental evidence</a>
            <a href="#quality">Quality records</a>
            <a href="#research">Publications</a>
          </nav>
          <a className="sb-btn blue sb-nav-cta" href="#enquire">
            Request a quotation →
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <section className="sb-hero">
        <div className="sb-wrap">
          <div className="sb-hero-grid">
            <div className="sb-hero-left">
              <div className="sb-brand-row">
                <span className="sb-sol-logo">
                  <img
                    src="/assets/solarbio/solarbio-favicon.webp"
                    alt="Solarbio Logo"
                    width={28}
                    height={28}
                    style={{ borderRadius: '50%', display: 'inline-block', verticalAlign: 'middle' }}
                  />{' '}
                  Solarbio
                </span>
                <span className="sb-eyebrow red" style={{ marginBottom: 0 }}>
                  LIFE SCIENCES
                </span>
              </div>
              <div className="sb-eyebrow">
                D1800 &nbsp; / &nbsp; 100 TESTS &nbsp; / &nbsp; RESEARCH USE ONLY
              </div>
              <h1 className="sb-hero-h1">
                Genomic DNA extraction from <span className="sb-text-indigo">whole blood.</span>
              </h1>
              <p className="sb-lead" style={{ marginTop: '14px' }}>
                A spin-column workflow for isolating genomic DNA from whole-blood samples, supported by a detailed
                protocol, batch-specific quality records and published research references.
              </p>
              <div className="sb-hero-actions">
                <a className="sb-btn blue" href="#purchase">
                  Buy now  ₹22,420 →
                </a>
                <a
                  className="sb-btn outline"
                  href="/assets/solarbio/D1800_Protocol.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  ↗ View technical protocol
                </a>
              </div>

              {/* Price Banner */}
              <div className="sb-price-banner">
                <div className="sb-price-banner-row">
                  <span className="sb-price-banner-main">₹22,420</span>
                  <span className="sb-price-banner-sub">₹19,000 + ₹3,420 GST (18%) · per kit (100T)</span>
                </div>
                <div className="sb-price-banner-note">
                  ✓ Free shipping across India · Temperature-controlled cold chain handling
                </div>
              </div>

              {/* Micro Stats */}
              <div className="sb-micro">
                <div>
                  <strong>100T</strong>
                  <small>Preparations per kit</small>
                </div>
                <div>
                  <strong>100–500 µL</strong>
                  <small>Whole-blood sample input</small>
                </div>
                <div>
                  <strong>50–100 µL</strong>
                  <small>Elution volume</small>
                </div>
              </div>

              <p className="sb-quiet-line">
                Manufactured by Solarbio · Supplied by Sri Saradi Scientific Pvt. Ltd.
              </p>
            </div>

            {/* Hero Right Column: Product Image Card */}
            <div className="sb-hero-art">
              <div
                className="sb-hero-img-card"
                onClick={() =>
                  openLightbox(
                    '/assets/solarbio/hero-product.webp',
                    'Actual photographed Solarbio D1800 100T Blood Genomic DNA Extraction Kit packaging'
                  )
                }
              >
                <img
                  src="/assets/solarbio/hero-product.webp"
                  alt="Actual photographed Solarbio D1800 100T Blood Genomic DNA Extraction Kit packaging"
                  width={1024}
                  height={768}
                  loading="eager"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sticky Table of Contents Quick Navigation */}
      <div className="sb-toc-bar">
        <div className="sb-wrap">
          <nav className="sb-toc-list" aria-label="Page navigation">
            <a className="sb-toc-link" href="#overview">
              Overview
            </a>
            <a className="sb-toc-link" href="#photographs">
              Packaging
            </a>
            <a className="sb-toc-link" href="#evidence">
              Gel Evidence
            </a>
            <a className="sb-toc-link" href="#contents">
              Kit Contents
            </a>
            <a className="sb-toc-link" href="#quality">
              Quality (COA)
            </a>
            <a className="sb-toc-link" href="#research">
              Published Research
            </a>
            <a className="sb-toc-link" href="#purchase">
              Purchase
            </a>
            <a className="sb-toc-link" href="#enquire">
              Formal Quotation
            </a>
          </nav>
        </div>
      </div>

      {/* Section 1: Overview */}
      <section id="overview" className="sb-section">
        <div className="sb-wrap">
          <div className="sb-heading">
            <div className="sb-eyebrow">The workflow</div>
            <h2>Designed for routine genomic DNA isolation.</h2>
            <p>
              Solarbio D1800 combines red-blood-cell processing, cell lysis, protein removal, silica-column
              adsorption, washing and elution in a defined extraction protocol.
            </p>
          </div>

          <div className="sb-three-grid">
            <div className="sb-card sb-accent">
              <span className="sb-tile-number">01 / INPUT</span>
              <h3>Defined sample input</h3>
              <p style={{ marginTop: '8px' }}>
                The manufacturer's protocol describes a 100–500 µL whole-blood sample range, including fresh or
                anticoagulated samples.
              </p>
            </div>
            <div className="sb-card sb-accent">
              <span className="sb-tile-number">02 / PURIFICATION</span>
              <h3>Spin-column isolation</h3>
              <p style={{ marginTop: '8px' }}>
                A silica-based adsorption column binds DNA during purification, followed by washing and elution.
              </p>
            </div>
            <div className="sb-card sb-accent">
              <span className="sb-tile-number">03 / DOWNSTREAM</span>
              <h3>Downstream research</h3>
              <p style={{ marginTop: '8px' }}>
                The manufacturer lists PCR, restriction digestion, library construction and Southern hybridization
                among intended workflows.
              </p>
            </div>
          </div>

          <div className="sb-two-cols" style={{ marginTop: '36px' }}>
            <div className="sb-card">
              <h3>Technical specifications</h3>
              <p className="sb-small" style={{ margin: '6px 0 16px' }}>
                Specifications are taken from the supplied manufacturer protocol.
              </p>
              <div className="sb-table-wrap">
                <table className="sb-table clean-zebra">
                  <tbody>
                    <tr>
                      <td>Product</td>
                      <td>Blood Genomic DNA Extraction Kit (Spin Column)</td>
                    </tr>
                    <tr>
                      <td>Catalogue no.</td>
                      <td>D1800</td>
                    </tr>
                    <tr>
                      <td>Pack size</td>
                      <td>100T</td>
                    </tr>
                    <tr>
                      <td>Blood input</td>
                      <td>100–500 µL</td>
                    </tr>
                    <tr>
                      <td>Elution</td>
                      <td>50–100 µL</td>
                    </tr>
                    <tr>
                      <td>Method</td>
                      <td>Silica adsorption / centrifugation</td>
                    </tr>
                    <tr>
                      <td>Classification</td>
                      <td>Research Use Only (RUO)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="sb-card">
              <h3>Considerations before use</h3>
              <p style={{ marginTop: '12px' }}>
                RNase A and Proteinase K are specified for storage at <strong>−20°C</strong>. The remaining components
                are listed for room-temperature storage. Consult the enclosed protocol for all handling and storage
                conditions.
              </p>
              <p style={{ marginTop: '12px' }}>
                Absolute ethanol is added to the wash buffer before first use (45 mL per bottle for the 100T kit). The
                protocol also notes considerations for anticoagulants, sample freezing and elution conditions.
              </p>
              <div style={{ marginTop: '20px' }}>
                <a
                  className="sb-btn link"
                  href="/assets/solarbio/D1800_Protocol.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Read the full protocol ↗
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Product Photographs */}
      <section id="photographs" className="sb-section sb-tint">
        <div className="sb-wrap">
          <div className="sb-heading">
            <div className="sb-eyebrow">Original product photography</div>
            <h2>Inspect the actual packaging.</h2>
            <p>
              Multiple views of the supplied Solarbio D1800 kit. The product label and batch identifiers are presented
              as photographed.
            </p>
          </div>

          <div className="sb-gallery-grid">
            <div
              className="sb-gallery-item"
              onClick={() =>
                openLightbox(
                  '/assets/solarbio/hero-product.webp',
                  'D1800 product front package and label'
                )
              }
              role="button"
              tabIndex={0}
              title="Click to enlarge front label"
            >
              <img
                src="/assets/solarbio/hero-product.webp"
                alt="D1800 product front package and label"
              />
            </div>

            <div
              className="sb-gallery-item"
              onClick={() =>
                openLightbox(
                  '/assets/solarbio/product-red.webp',
                  'Red side of Solarbio product packaging'
                )
              }
              role="button"
              tabIndex={0}
              title="Click to enlarge manufacturer panel"
            >
              <img
                src="/assets/solarbio/product-red.webp"
                alt="Red side of Solarbio product packaging"
              />
            </div>

            <div
              className="sb-gallery-item"
              onClick={() =>
                openLightbox(
                  '/assets/solarbio/product-white.webp',
                  'White side of product packaging'
                )
              }
              role="button"
              tabIndex={0}
              title="Click to enlarge white panel"
            >
              <img
                src="/assets/solarbio/product-white.webp"
                alt="White side of product packaging"
              />
            </div>

            <div
              className="sb-gallery-item"
              onClick={() =>
                openLightbox(
                  '/assets/solarbio/product-side.webp',
                  'Product box side panel'
                )
              }
              role="button"
              tabIndex={0}
              title="Click to enlarge package side"
            >
              <img
                src="/assets/solarbio/product-side.webp"
                alt="Product box side panel"
              />
            </div>

            <div
              className="sb-gallery-item"
              onClick={() =>
                openLightbox(
                  '/assets/solarbio/product-top.webp',
                  'Solarbio box top panel'
                )
              }
              role="button"
              tabIndex={0}
              title="Click to enlarge top panel"
            >
              <img
                src="/assets/solarbio/product-top.webp"
                alt="Solarbio box top panel"
              />
            </div>
          </div>

          <p className="sb-fine" style={{ marginTop: '16px' }}>
            Photos are based on the actual package supplied for this page; white framing and contrast have been adjusted
            for consistency. Lot details must be confirmed for the shipment supplied to each customer.
          </p>
        </div>
      </section>

      {/* Section 3: Experimental Evidence */}
      <section id="evidence" className="sb-section">
        <div className="sb-wrap">
          <div className="sb-heading">
            <div className="sb-eyebrow">Experimental observation</div>
            <h2>See the supplied gel image.</h2>
            <p>
              Rather than generic laboratory imagery, this section presents the actual agarose gel supplied with the
              product materials.
            </p>
          </div>

          <div className="sb-two-cols">
            <div>
              <div
                className="sb-gel-container"
                onClick={() =>
                  openLightbox(
                    '/assets/solarbio/dna-gel.webp',
                    'Original supplied agarose gel image, molecular marker at left and three genomic DNA sample lanes'
                  )
                }
                title="Click to enlarge agarose gel"
                role="button"
                tabIndex={0}
              >
                <img
                  src="/assets/solarbio/dna-gel.webp"
                  alt="Original supplied agarose gel image, molecular marker at left and three genomic DNA sample lanes"
                />
              </div>
              <p className="sb-fine" style={{ marginTop: '12px' }}>
                Supplied agarose gel image: marker lane at left and three sample lanes. The bright DNA signals are
                visible, but this photograph alone does not establish precise yield, purity or DNA fragment sizes.
              </p>
            </div>

            <div className="sb-card">
              <h3>What can be assessed</h3>
              <p style={{ marginTop: '10px' }}>
                The gel shows detectable DNA signals across three sample lanes. For a complete technical comparison,
                laboratories should also consider sample volume, gel conditions, molecular-weight ladder identity,
                loading amount, extraction yield and purity measurements.
              </p>

              <div className="sb-notice-box" style={{ marginTop: '22px' }}>
                <strong>Evidence notes</strong>
                <p className="sb-small" style={{ marginTop: '4px' }}>
                  The gel is shown without artificial recreation of bands. Ask our scientific team for available
                  experimental details and supporting documentation when evaluating suitability for your laboratory.
                </p>
              </div>

              <p className="sb-small" style={{ marginTop: '18px' }}>
                If your application requires a specific concentration or fragment-size range, discuss the workflow before
                ordering.
              </p>

              <div style={{ marginTop: '20px' }}>
                <a className="sb-btn outline" href="#enquire">
                  Ask a technical question →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Pack Configuration */}
      <section id="contents" className="sb-section sb-tint">
        <div className="sb-wrap">
          <div className="sb-heading">
            <div className="sb-eyebrow">Pack configuration</div>
            <h2>What's included in the 100T kit?</h2>
          </div>

          <div className="sb-two-cols">
            <div className="sb-card">
              <div className="sb-table-wrap">
                <table className="sb-table clean-zebra">
                  <tbody>
                    <tr>
                      <td>RNase A</td>
                      <td>100 µL × 2</td>
                    </tr>
                    <tr>
                      <td>Proteinase K</td>
                      <td>1 mL × 2</td>
                    </tr>
                    <tr>
                      <td>Red Blood Cell Lysis Buffer</td>
                      <td>120 mL</td>
                    </tr>
                    <tr>
                      <td>Solution A: Leukocyte Lysate</td>
                      <td>50 mL</td>
                    </tr>
                    <tr>
                      <td>Solution B: Protein Precipitate</td>
                      <td>50 mL</td>
                    </tr>
                    <tr>
                      <td>Wash Buffer</td>
                      <td>15 mL × 2</td>
                    </tr>
                    <tr>
                      <td>Elution Buffer</td>
                      <td>20 mL</td>
                    </tr>
                    <tr>
                      <td>DNA Adsorption Columns</td>
                      <td>100</td>
                    </tr>
                    <tr>
                      <td>Instructions</td>
                      <td>1</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="sb-card">
              <h3>Before you begin</h3>
              <p style={{ marginTop: '12px' }}>
                <strong>Bring your own absolute ethanol.</strong> Add 45 mL to each supplied wash-buffer bottle
                according to the manufacturer label and protocol.
              </p>
              <p style={{ marginTop: '12px' }}>
                <strong>Plan correct enzyme storage.</strong> Store RNase A and Proteinase K at −20°C; the main buffer
                components are designated for room-temperature storage.
              </p>
              <p style={{ marginTop: '12px' }}>
                <strong>Check sample compatibility.</strong> The protocol discusses EDTA, ACD and heparin
                anticoagulants, and notes possible PCR inhibition with heparin-derived samples.
              </p>

              <div className="sb-notice-box" style={{ marginTop: '20px' }}>
                The kit is intended only for research use, not for human or veterinary diagnostic or therapeutic
                applications.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Quality Records */}
      <section id="quality" className="sb-section">
        <div className="sb-wrap">
          <div className="sb-heading">
            <div className="sb-eyebrow">Traceable quality information</div>
            <h2>Batch records for review.</h2>
            <p>
              Manufacturer-issued certificates are available for the two documented lots. Both list qualified results
              for appearance, extraction performance and stability checks as described by Solarbio.
            </p>
          </div>

          <div className="sb-doc-grid">
            <div className="sb-doc-item">
              <div
                className="sb-doc-thumb"
                onClick={() =>
                  openLightbox(
                    '/assets/solarbio/coa-april.webp',
                    'Manufacturer certificate of analysis for lot 2600040002'
                  )
                }
                title="Click to preview COA"
              >
                <img
                  src="/assets/solarbio/coa-april.webp"
                  alt="Manufacturer certificate of analysis for lot 2600040002"
                />
              </div>
              <div className="sb-doc-body">
                <strong>Certificate of Analysis</strong>
                <p className="sb-small">
                  Lot 2600040002
                  <br />
                  Tested 7 April 2026
                </p>
                <a
                  className="sb-doc-link"
                  href="/assets/solarbio/D1800_COA_Lot_2600040002.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View / download PDF ↗
                </a>
              </div>
            </div>

            <div className="sb-doc-item">
              <div
                className="sb-doc-thumb"
                onClick={() =>
                  openLightbox(
                    '/assets/solarbio/coa-may.webp',
                    'Manufacturer certificate of analysis for lot 2600050003'
                  )
                }
                title="Click to preview COA"
              >
                <img
                  src="/assets/solarbio/coa-may.webp"
                  alt="Manufacturer certificate of analysis for lot 2600050003"
                />
              </div>
              <div className="sb-doc-body">
                <strong>Certificate of Analysis</strong>
                <p className="sb-small">
                  Lot 2600050003
                  <br />
                  Tested 25 May 2026
                </p>
                <a
                  className="sb-doc-link"
                  href="/assets/solarbio/D1800_COA_Lot_2600050003.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View / download PDF ↗
                </a>
              </div>
            </div>

            <div className="sb-doc-item">
              <div className="sb-doc-thumb icon-thumb">
                📄
              </div>
              <div className="sb-doc-body">
                <strong>Product Protocol</strong>
                <p className="sb-small">
                  Extraction workflow, reagent preparation, kit contents and handling notes.
                </p>
                <a
                  className="sb-doc-link"
                  href="/assets/solarbio/D1800_Protocol.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View / download PDF ↗
                </a>
              </div>
            </div>
          </div>

          <p className="sb-fine" style={{ marginTop: '20px' }}>
            The COA accompanying any particular order should correspond to the actual lot shipped. A certificate is
            evidence of the listed manufacturer tests; it is not an independent claim of quantified DNA yield or purity.
          </p>
        </div>
      </section>

      {/* Section 6: Published Research */}
      <section id="research" className="sb-section sb-tint">
        <div className="sb-wrap">
          <div className="sb-heading">
            <div className="sb-eyebrow">Scientific literature</div>
            <h2>Published research referencing D1800.</h2>
            <p>
              The following references were supplied and identified as D1800 citations. Researchers can consult the
              full papers and supplementary methods for experimental context.
            </p>
          </div>

          <div className="sb-pub-card">
            <div className="sb-pub-badge">01</div>
            <div>
              <div className="sb-pub-title">
                Sensitive detection of single-nucleotide polymorphisms by conjugated polymers for personalized
                treatment of hypertension
              </div>
              <p className="sb-small">
                Shen et al. · <em>Science Translational Medicine</em> · 2023
              </p>
              <a
                className="sb-pub-doi"
                href="https://doi.org/10.1126/scitranslmed.abq5753"
                target="_blank"
                rel="noopener noreferrer"
              >
                DOI: 10.1126/scitranslmed.abq5753 ↗
              </a>
            </div>
          </div>

          <div className="sb-pub-card">
            <div className="sb-pub-badge">02</div>
            <div>
              <div className="sb-pub-title">
                ROS-induced moderate autophagy of haemocytes confers resistance of Mercenaria mercenaria to air
                exposure stress
              </div>
              <p className="sb-small">
                Zhou et al. · <em>Fish &amp; Shellfish Immunology</em> · 2023
              </p>
              <a
                className="sb-pub-doi"
                href="https://doi.org/10.1016/j.fsi.2023.109084"
                target="_blank"
                rel="noopener noreferrer"
              >
                DOI: 10.1016/j.fsi.2023.109084 ↗
              </a>
            </div>
          </div>

          <p className="sb-fine" style={{ marginTop: '16px' }}>
            Publication associations are supplied by the distributor; access to full-text methods may be required to
            independently check exact D1800 usage and experimental conditions. Citations do not imply journal
            endorsement or independently establish this product's performance.
          </p>
        </div>
      </section>

      {/* Section 7: Purchase */}
      <section id="purchase" className="sb-section sb-tint">
        <div className="sb-wrap">
          <div className="sb-heading">
            <div className="sb-eyebrow">Direct purchase or institutional procurement</div>
            <h2>Choose the buying process that fits your laboratory.</h2>
            <p>Purchase online, or request a formal quotation for institutional approval and purchase-order processing.</p>
          </div>

          <div className="sb-two-cols">
            {/* Online Purchase Card */}
            <div className="sb-card sb-accent">
              <div className="sb-eyebrow">Online purchase</div>
              <h3 style={{ marginTop: '8px' }}>Solarbio D1800 · 100T</h3>
              <p className="sb-small" style={{ marginTop: '8px' }}>
                Free shipping across India. Orders are packed and shipped under temperature-controlled conditions
                appropriate to the manufacturer’s stated storage requirements. RNase A and Proteinase K require −20°C
                storage.
              </p>

              <div className="sb-table-wrap" style={{ margin: '18px 0' }}>
                <table className="sb-table">
                  <tbody>
                    <tr>
                      <td>Product price</td>
                      <td>₹{(19000 * quantity).toLocaleString('en-IN')}</td>
                    </tr>
                    <tr>
                      <td>GST (18%)</td>
                      <td>₹{(3420 * quantity).toLocaleString('en-IN')}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Total (free India shipping)</strong>
                      </td>
                      <td>
                        <strong className="sb-text-indigo">₹{totalAmount}</strong>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <label className="sb-small" htmlFor="buyquantity" style={{ display: 'block', fontWeight: 600 }}>
                Quantity (kits)
              </label>

              <div className="sb-qty-selector">
                <button
                  type="button"
                  className="sb-qty-btn"
                  onClick={() => stepQuantity(-1)}
                  aria-label="Decrease quantity"
                >
                  −
                </button>
                <input
                  id="buyquantity"
                  type="number"
                  min={1}
                  max={99}
                  step={1}
                  value={quantity}
                  onChange={handleQuantityChange}
                  className="sb-qty-input"
                />
                <button
                  type="button"
                  className="sb-qty-btn"
                  onClick={() => stepQuantity(1)}
                  aria-label="Increase quantity"
                >
                  +
                </button>
                <span className="sb-small" id="buytotal" aria-live="polite">
                  Order total: <strong>₹{totalAmount}</strong> ({quantity} kit{quantity === 1 ? '' : 's'})
                </span>
              </div>

              {!showCheckoutForm ? (
                <div style={{ marginTop: '20px' }}>
                  <button
                    id="checkoutBtn"
                    className="sb-btn blue"
                    type="button"
                    onClick={() => setShowCheckoutForm(true)}
                    style={{ width: '100%' }}
                  >
                    Proceed to secure checkout →
                  </button>
                </div>
              ) : (
                <form className="sb-form-grid" onSubmit={handleCheckoutSubmit} style={{ marginTop: '20px' }}>
                  <div className="sb-form-field">
                    <label htmlFor="buyer-name">Your name *</label>
                    <input id="buyer-name" name="name" type="text" autoComplete="name" required maxLength={120} value={buyer.name} onChange={handleBuyerChange} />
                  </div>
                  <div className="sb-form-field">
                    <label htmlFor="buyer-company">Institution / company</label>
                    <input id="buyer-company" name="company" type="text" autoComplete="organization" maxLength={160} value={buyer.company} onChange={handleBuyerChange} />
                  </div>
                  <div className="sb-form-field">
                    <label htmlFor="buyer-email">Email *</label>
                    <input id="buyer-email" name="email" type="email" autoComplete="email" required maxLength={160} value={buyer.email} onChange={handleBuyerChange} />
                  </div>
                  <div className="sb-form-field">
                    <label htmlFor="buyer-phone">Phone *</label>
                    <input id="buyer-phone" name="phone" type="tel" autoComplete="tel" required pattern="\+?[0-9][0-9\s\-]{7,16}" title="Enter a valid phone number" value={buyer.phone} onChange={handleBuyerChange} />
                  </div>
                  <div className="sb-form-field full">
                    <label htmlFor="buyer-address">Delivery address with PIN code *</label>
                    <textarea id="buyer-address" name="address" autoComplete="street-address" required minLength={10} maxLength={600} rows={3} value={buyer.address} onChange={handleBuyerChange} />
                  </div>
                  <div className="sb-form-field full">
                    <label htmlFor="buyer-gstin">GSTIN (optional, for the tax invoice)</label>
                    <input id="buyer-gstin" name="gstin" type="text" maxLength={20} value={buyer.gstin} onChange={handleBuyerChange} />
                  </div>
                  <div className="sb-form-field full">
                    <button id="checkoutBtn" className="sb-btn blue" type="submit" disabled={checkout.busy} style={{ width: '100%' }}>
                      {checkout.busy ? 'Please wait…' : `Pay ₹${totalAmount} securely →`}
                    </button>
                  </div>
                </form>
              )}

              <p
                className="sb-fine"
                id="checkoutNotice"
                role="status"
                style={{ marginTop: '14px', ...(checkout.isError ? { color: '#b42318' } : {}) }}
              >
                {checkout.message ||
                  'Payments are processed securely by Zoho Payments (UPI, cards, net banking). We do not see or store your card details.'}
              </p>
            </div>

            {/* Institutional Purchase Card */}
            <div className="sb-card">
              <div className="sb-eyebrow">Institutional purchase</div>
              <h3 style={{ marginTop: '8px' }}>Need a quotation or purchase order?</h3>
              <p style={{ marginTop: '10px' }}>
                Research institutions and procurement teams can request a formal quotation, GST details, batch
                documentation and delivery confirmation before raising a PO.
              </p>
              <div style={{ margin: '22px 0' }}>
                <a href="#enquire" className="sb-btn outline">
                  Request formal quotation →
                </a>
              </div>
              <p className="sb-fine">
                For research use only. Please review storage requirements for RNase A and Proteinase K in the protocol.
                Provide your institution's billing and GST information when placing an order.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 8: Technical & Commercial Enquiries */}
      <section id="enquire" className="sb-section">
        <div className="sb-wrap">
          <div className="sb-enquiry-card">
            <div>
              <div className="sb-eyebrow">Technical &amp; commercial enquiries</div>
              <h2 style={{ marginTop: '8px' }}>Evaluate D1800 for your laboratory.</h2>
              <p style={{ marginTop: '12px' }}>
                Tell us your sample type, expected number of extractions and any technical questions. Sri Saradi
                Scientific can provide a formal quotation, purchase-order support and supporting documentation.
              </p>

              <div style={{ marginTop: '24px' }}>
                <p className="sb-small">
                  <strong style={{ color: 'var(--ink)' }}>Sri Saradi Scientific Private Limited</strong>
                  <br />
                  Hyderabad, India
                  <br />
                  <a
                    href="https://www.srisaradiscientific.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="sb-text-indigo"
                    style={{ fontWeight: 600 }}
                  >
                    www.srisaradiscientific.com ↗
                  </a>
                </p>
              </div>

              <div style={{ marginTop: '16px' }}>
                <span className="sb-pill">Research-oriented sourcing</span>
                <span className="sb-pill">Documentation support</span>
              </div>
            </div>

            <form id="enquiry" className="sb-form-grid" onSubmit={handleFormSubmit}>
              <div className="sb-form-field">
                <label htmlFor="name">Your name *</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  value={formState.name}
                  onChange={handleFormChange}
                />
              </div>

              <div className="sb-form-field">
                <label htmlFor="org">Institution / company *</label>
                <input
                  id="org"
                  name="organization"
                  type="text"
                  required
                  value={formState.organization}
                  onChange={handleFormChange}
                />
              </div>

              <div className="sb-form-field">
                <label htmlFor="email">Work email *</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formState.email}
                  onChange={handleFormChange}
                />
              </div>

              <div className="sb-form-field">
                <label htmlFor="phone">Phone (optional)</label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  value={formState.phone}
                  onChange={handleFormChange}
                />
              </div>

              <div className="sb-form-field">
                <label htmlFor="req">How can we help?</label>
                <select
                  id="req"
                  name="request"
                  value={formState.request}
                  onChange={handleFormChange}
                >
                  <option value="Formal quotation / purchase order">Formal quotation / purchase order</option>
                  <option value="Technical / protocol question">Technical / protocol question</option>
                  <option value="Request COA / documentation">Request COA / documentation</option>
                  <option value="Bulk or repeat supply">Bulk or repeat supply</option>
                </select>
              </div>

              <div className="sb-form-field">
                <label htmlFor="quantity">Estimated quantity</label>
                <input
                  id="quantity"
                  name="quantity"
                  placeholder="e.g. 2 kits"
                  value={formState.quantity}
                  onChange={handleFormChange}
                />
              </div>

              <div className="sb-form-field full">
                <label htmlFor="msg">Application / other details (optional)</label>
                <textarea
                  id="msg"
                  name="message"
                  placeholder="Sample type, timeline or product questions"
                  value={formState.message}
                  onChange={handleFormChange}
                />
              </div>

              <div className="sb-form-field full">
                <button className="sb-btn blue" type="submit" disabled={submitting} style={{ width: '100%' }}>
                  {submitting ? 'Submitting quotation enquiry...' : 'Submit Quotation Request →'}
                </button>
                <p className="sb-fine" style={{ marginTop: '10px' }}>
                  Our technical and procurement team will prepare your formal quotation and get in touch directly.
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Dedicated Footer for Genomic Page */}
      <footer className="sb-dedicated-footer">
        <div className="sb-wrap sb-footer-in">
          <div className="sb-footer-brands">
            <div className="sb-footer-brand" title="Sri Saradi Scientific">
              <img
                src="/assets/sri-saradi-logo.png"
                alt="Sri Saradi Scientific"
                width={160}
                height={50}
                style={{ height: '48px', width: 'auto', display: 'block' }}
              />
            </div>
          </div>

          <div className="sb-footer-links">
            <a
              href="https://www.srisaradiscientific.com/terms-and-conditions"
              target="_blank"
              rel="noopener noreferrer"
            >
              Terms and Conditions
            </a>
            <span className="sb-footer-dot">•</span>
            <a
              href="https://www.srisaradiscientific.com/privacy-policy"
              target="_blank"
              rel="noopener noreferrer"
            >
              Privacy Policy
            </a>
          </div>

          <div className="sb-footer-right">
            <div className="sb-footer-product">Solarbio D1800 · 100T · Research Use Only</div>
            <p className="sb-footer-copy">© {new Date().getFullYear()} Sri Saradi Scientific Pvt. Ltd.</p>
          </div>
        </div>
      </footer>

      {/* Lightbox Modal */}
      {lightboxImage && (
        <div
          className="solarbio-lightbox-backdrop"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label="Enlarged image preview"
        >
          <div className="solarbio-lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="solarbio-lightbox-close"
              onClick={closeLightbox}
              aria-label="Close image preview"
            >
              ×
            </button>
            <img src={lightboxImage} alt={lightboxAlt} />
            {lightboxAlt && <p className="solarbio-lightbox-caption">{lightboxAlt}</p>}
          </div>
        </div>
      )}
    </div>
  );
}
