'use client';

import React from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { FaWhatsapp, FaPhoneAlt, FaEnvelope, FaBars, FaTimes } from 'react-icons/fa';
import '../solarbio.css';
import { reportAdsConversion } from '@/app/lib/adsConversion';

export default function ThankYouContent() {
  const searchParams = useSearchParams();

  const ref = searchParams.get('ref') || '';
  const name = searchParams.get('name') || '';
  const org = searchParams.get('org') || '';
  const email = searchParams.get('email') || '';
  const qty = searchParams.get('qty') || '1 kit';
  const paid = searchParams.get('paid') === '1' && !!ref;
  const amount = Number(searchParams.get('amt')) || undefined;

  // Google Ads conversion: online order (paid) or quotation enquiry.
  React.useEffect(() => {
    if (!ref) return;
    reportAdsConversion(
      paid
        ? { label: process.env.NEXT_PUBLIC_GOOGLE_ADS_PURCHASE_LABEL, transactionId: ref, value: amount, currency: 'INR' }
        : { label: process.env.NEXT_PUBLIC_GOOGLE_ADS_LEAD_LABEL, transactionId: ref },
    );
  }, [ref, paid, amount]);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  // Activate standalone header/footer mode
  React.useEffect(() => {
    document.body.classList.add('solarbio-page-active');
    return () => {
      document.body.classList.remove('solarbio-page-active');
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
              width={192}
              height={60}
              style={{ height: '60px', width: 'auto', display: 'block' }}
            />
          </div>
          <nav className="sb-nav-links" aria-label="Primary navigation">
            <Link href="/genomic#overview">Overview</Link>
            <Link href="/genomic#evidence">Experimental evidence</Link>
            <Link href="/genomic#quality">Quality records</Link>
            <Link href="/genomic#research">Publications</Link>
          </nav>
          <div className="sb-nav-right">
            <div className="sb-nav-contact">
              <a href="mailto:info@srisaradiscientific.com" className="sb-contact-link" title="Email Sri Saradi Scientific">
                <FaEnvelope className="sb-contact-icon" />
                <span className="sb-email-full">info@srisaradiscientific.com</span>
                <span className="sb-email-short">Email</span>
              </a>
              <span className="sb-contact-sep">|</span>
              <a href="tel:+917207607444" className="sb-contact-link" title="Call Sri Saradi Scientific">
                <FaPhoneAlt className="sb-contact-icon" />
                <span>+917207607444</span>
              </a>
            </div>
            <div className="sb-nav-actions-row">
              <Link className="sb-btn blue sb-nav-cta" href="/genomic#enquire">
                Request a quotation →
              </Link>
              <button
                type="button"
                className="sb-mobile-menu-toggle"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <FaTimes /> : <FaBars />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="sb-mobile-menu">
            <div className="sb-wrap sb-mobile-menu-in">
              <nav className="sb-mobile-links" aria-label="Mobile product navigation">
                <Link href="/genomic#overview" onClick={() => setMobileMenuOpen(false)}>
                  Overview
                </Link>
                <Link href="/genomic#evidence" onClick={() => setMobileMenuOpen(false)}>
                  Experimental evidence
                </Link>
                <Link href="/genomic#quality" onClick={() => setMobileMenuOpen(false)}>
                  Quality records
                </Link>
                <Link href="/genomic#research" onClick={() => setMobileMenuOpen(false)}>
                  Publications
                </Link>
                <Link href="/genomic#purchase" onClick={() => setMobileMenuOpen(false)}>
                  Online purchase
                </Link>
              </nav>

              <div className="sb-mobile-menu-footer">
                <Link
                  className="sb-btn blue sb-mobile-quote-btn"
                  href="/genomic#enquire"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Request a quotation →
                </Link>
                <div className="sb-mobile-contact-list">
                  <a href="mailto:info@srisaradiscientific.com" className="sb-contact-link">
                    <FaEnvelope className="sb-contact-icon" />
                    <span>info@srisaradiscientific.com</span>
                  </a>
                  <a href="tel:+917207607444" className="sb-contact-link">
                    <FaPhoneAlt className="sb-contact-icon" />
                    <span>+91 7207607444</span>
                  </a>
                  <a
                    href="https://wa.me/917207607444?text=Hi%2C%20I%20have%20submitted%20a%20quotation%20request%20for%20Solarbio%20D1800"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="sb-contact-link"
                    style={{ color: '#25d366' }}
                  >
                    <FaWhatsapp className="sb-contact-icon" style={{ color: '#25d366' }} />
                    <span>Chat on WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
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
              width={166}
              height={52}
              style={{ height: '52px', width: 'auto', display: 'block' }}
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
          <div className="sb-footer-contact">
            <a href="mailto:info@srisaradiscientific.com" className="sb-contact-link" title="Email Sri Saradi Scientific">
              <FaEnvelope className="sb-contact-icon" />
              <span>info@srisaradiscientific.com</span>
            </a>
            <span className="sb-contact-sep">|</span>
            <a href="tel:+917207607444" className="sb-contact-link" title="Call Sri Saradi Scientific">
              <FaPhoneAlt className="sb-contact-icon" />
              <span>+917207607444</span>
            </a>
          </div>
        </div>
      </div>
    </footer>

    {/* Floating WhatsApp Action Button */}
    <a
      href="https://wa.me/917207607444?text=Hi%2C%20I%20have%20submitted%20a%20quotation%20request%20for%20Solarbio%20D1800%20and%20would%20like%20to%20connect"
      target="_blank"
      rel="noopener noreferrer"
      className="sb-whatsapp-float"
      aria-label="Chat on WhatsApp"
      title="Chat with our scientific team on WhatsApp"
    >
      <FaWhatsapp />
    </a>
  </div>
  );
}

