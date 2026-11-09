'use client';

import React from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import '../solarbio.css';

export default function ThankYouContent() {
  const searchParams = useSearchParams();

  const ref = searchParams.get('ref') || '';
  const name = searchParams.get('name') || '';
  const org = searchParams.get('org') || '';
  const email = searchParams.get('email') || '';
  const qty = searchParams.get('qty') || '1 kit';
  const paid = searchParams.get('paid') === '1' && !!ref;

  // Set Solarbio Favicon and activate standalone header/footer mode
  React.useEffect(() => {
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

  return (
    <div className="solarbio-page">
      {/* Dedicated Navbar */}
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
          <nav className="sb-nav-links" aria-label="Primary navigation">
            <Link href="/genomic#overview">Overview</Link>
            <Link href="/genomic#evidence">Experimental evidence</Link>
            <Link href="/genomic#quality">Quality records</Link>
            <Link href="/genomic#research">Publications</Link>
          </nav>
          <Link className="sb-btn blue sb-nav-cta" href="/genomic#enquire">
            Request a quotation →
          </Link>
        </div>
      </header>

      <main className="sb-thank-you-page">
        <div className="sb-wrap">
          <div className="sb-thank-you-card">
          <div className="sb-success-badge" aria-hidden="true">
            ✓
          </div>

          <div className="sb-eyebrow" style={{ color: '#1e7e34', marginBottom: '8px' }}>
            {paid ? 'ORDER PLACED' : 'QUOTATION ENQUIRY RECEIVED'}
          </div>

          <h1>{paid ? 'Thank You for Your Order!' : 'Thank You for Your Enquiry!'}</h1>

          <p className="sb-thank-you-lead">
            {name ? `Dear ${name}, we` : 'We'} have successfully received your{' '}
            {paid ? 'online order' : 'quotation enquiry'} for the{' '}
            <strong>Solarbio D1800 Blood Genomic DNA Extraction Kit (100T)</strong>.{' '}
            {paid
              ? 'A payment confirmation has been emailed to you, and our team will contact you with dispatch details.'
              : 'Our scientific support and procurement team has been notified.'}
          </p>

          {ref && (
            <div className="sb-ref-box">
              <span style={{ fontSize: '0.85rem', color: '#456a87', fontWeight: 600 }}>Reference Order ID:</span>
              <strong>{ref}</strong>
            </div>
          )}

          <div className="sb-summary-grid">
            <div className="sb-summary-item">
              <span>Product Requested</span>
              <strong>Solarbio D1800 (100T)</strong>
            </div>

            <div className="sb-summary-item">
              <span>{paid ? 'Quantity' : 'Estimated Quantity'}</span>
              <strong>{qty}</strong>
            </div>

            {name && (
              <div className="sb-summary-item">
                <span>Contact Name</span>
                <strong>{name}</strong>
              </div>
            )}

            {org && (
              <div className="sb-summary-item">
                <span>Institution / Company</span>
                <strong>{org}</strong>
              </div>
            )}

            {email && (
              <div className="sb-summary-item">
                <span>Notification Email</span>
                <strong>{email}</strong>
              </div>
            )}

            <div className="sb-summary-item">
              <span>Handling & Shipping</span>
              <strong style={{ color: '#145d77' }}>Manufacturer Cold-Chain & Free India Shipping</strong>
            </div>
          </div>

          <div className="sb-next-steps">
            <h3>What Happens Next?</h3>
            <div className="sb-steps-grid">
              <div className="sb-step-card">
                <div className="sb-step-num">1</div>
                <strong>Technical Review</strong>
                <p>
                  Our team reviews your sample type, extraction requirements, and any custom specifications or buffer
                  needs.
                </p>
              </div>

              <div className="sb-step-card">
                <div className="sb-step-num">2</div>
                <strong>Formal Proforma Quotation</strong>
                <p>
                  We issue a formal quote with 18% GST breakdown, batch COA documentation, and institutional PO payment
                  terms.
                </p>
              </div>

              <div className="sb-step-card">
                <div className="sb-step-num">3</div>
                <strong>Cold-Chain Dispatch</strong>
                <p>
                  Orders are packed in temperature-controlled packaging (−20°C for RNase A & Proteinase K) and
                  dispatched across India.
                </p>
              </div>
            </div>
          </div>

          <div className="sb-action-buttons">
            <Link href="/genomic" className="sb-btn blue">
              ← Return to Solarbio D1800 Page
            </Link>

            <a
              href="/assets/solarbio/D1800_Protocol.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="sb-btn outline"
            >
              ↗ Download Technical Protocol (PDF)
            </a>

            <Link href="/kit-products" className="sb-btn outline">
              Browse Lab Consumables
            </Link>
          </div>

          <div className="sb-support-footer">
            Need urgent assistance or an immediate institutional PO confirmation?
            <br />
            Call us directly at <a href="tel:+917207607444">+91 7207607444</a> or email{' '}
            <a href="mailto:praveen.gadde@srisaradiscientific.com">praveen.gadde@srisaradiscientific.com</a>
          </div>
        </div>
      </div>
    </main>

    {/* Dedicated Footer */}
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
  </div>
  );
}

