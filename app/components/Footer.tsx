"use client";

import { useState, useEffect } from "react";
import { FaFacebookF, FaLinkedinIn, FaTwitter } from "react-icons/fa";

interface SiteSettings {
  site_name?: string;
  site_logo?: string;
  social_facebook?: string;
  social_linkedin?: string;
  social_twitter?: string;
}

interface KitProduct {
  id: string;
  title: string;
  slug: string | null;
  href: string | null;
  isActive: boolean;
}


const footerLinks = {
  quickLinks: {
    title: "Quick Links",
    links: [
      { label: "Home", href: "/" },
      { label: "About Us", href: "/about" },
      { label: "CRO Services", href: "/cro-services" },
      { label: "Signaling Pathways", href: "/signaling-pathways" },
      { label: "FAQ", href: "/faq" },
      { label: "Certificates", href: "/certificates" },
      { label: "Careers", href: "/careers" },
      { label: "Contact", href: "/contact" },
    ],
  },
  solarbioCataegories: {
    title: "Products",
    links: [
      { label: "Analytical Standards", href: "/products?brand=Solarbio&category=analytical-standards" },
      { label: "Molecular Biology", href: "/products?brand=Solarbio&category=molecular-biology" },
      { label: "Protein & Immunity", href: "/products?brand=Solarbio&category=protein-immunity" },
      { label: "ELISA Kit", href: "/products?brand=Solarbio&category=elisa-kit" },
      { label: "Cell Culture Media", href: "/products?brand=Solarbio&category=cell-culture-media" },
      { label: "Antibody", href: "/products?brand=Solarbio&category=antibody" },
    ],
  },
  products2: {
    title: "More Products",
    links: [
      { label: "Biochemical Assay Kit", href: "/products?brand=Solarbio&category=biochemical-assay-kit" },
      { label: "Recombinant Protien", href: "/products?brand=Solarbio&category=recombinant-protien" },
      { label: "Peptide", href: "/products?brand=Solarbio&category=peptide" },
      { label: "Cell Biology", href: "/products?brand=Solarbio&category=cell-biology" },
      { label: "Biochemical Reagent", href: "/products?brand=Solarbio&category=biochemical-reagent" },
    ],
  },
  // labConsumables will be dynamically loaded
  legal: {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms & Conditions", href: "/terms-and-conditions" },
      { label: "Cancellation Policy", href: "/cancellation-policy" },
      { label: "Shipping and Delivery Policy", href: "/shipping-and-delivery-policy" },
      { label: "Returns", href: "/return-policy" },
      { label: "Refund Policy", href: "/refund-policy" },

    ],
  },
};

export default function Footer() {
  const [settings, setSettings] = useState<SiteSettings>({});
  const [labConsumables, setLabConsumables] = useState<KitProduct[]>([]);

  useEffect(() => {
    // Fetch settings
    fetch("/api/settings")
      .then((r) => r.json())
      .then((data) => {
        setSettings({
          site_name: data.site_name || "",
          site_logo: data.site_logo || "",
          social_facebook: data.social_facebook || "",
          social_linkedin: data.social_linkedin || "",
          social_twitter: data.social_twitter || "",
        });
      })
      .catch(() => {});

    // Fetch lab consumables
    fetch("/api/kit-products")
      .then((r) => r.json())
      .then((data: KitProduct[]) => {
        if (Array.isArray(data)) {
          setLabConsumables(data.filter(product => product.isActive));
        }
      })
      .catch(() => {});
  }, []);

  return (
    <footer>
      {/* Main Footer */}
      <div
        style={{
          background: "#f5f5f5",
          padding: "50px 0 40px",
          borderTop: "1px solid #e0e0e0",
        }}
      >
        <div
          style={{
            maxWidth: "1400px",
            margin: "0 auto",
            padding: "0 40px",
            display: "grid",
            gridTemplateColumns: "repeat(5, 1fr)",
            gap: "40px",
          }}
        >
          {/* Quick Links */}
          <div>
            <h4
              style={{
                fontSize: "14px",
                fontWeight: 700,
                color: "#171717",
                margin: "0 0 20px 0",
                letterSpacing: "0.5px",
              }}
            >
              {footerLinks.quickLinks.title}
            </h4>
            <ul
              style={{
                listStyle: "none",
                margin: 0,
                padding: 0,
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              {footerLinks.quickLinks.links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    style={{
                      textDecoration: "none",
                      color: "#666",
                      fontSize: "13px",
                      transition: "color 0.2s",
                    }}
                    className="footer-link"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Solarbio Categories */}
          <div>
            <h4
              style={{
                fontSize: "14px",
                fontWeight: 700,
                color: "#171717",
                margin: "0 0 20px 0",
                letterSpacing: "0.5px",
              }}
            >
              {footerLinks.solarbioCataegories.title}
            </h4>
            <ul
              style={{
                listStyle: "none",
                margin: 0,
                padding: 0,
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              {footerLinks.solarbioCataegories.links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    style={{
                      textDecoration: "none",
                      color: "#666",
                      fontSize: "13px",
                      transition: "color 0.2s",
                    }}
                    className="footer-link"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* More Products */}
          <div>
            <h4
              style={{
                fontSize: "14px",
                fontWeight: 700,
                color: "#171717",
                margin: "0 0 20px 0",
                letterSpacing: "0.5px",
              }}
            >
              {footerLinks.products2.title}
            </h4>
            <ul
              style={{
                listStyle: "none",
                margin: 0,
                padding: 0,
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              {footerLinks.products2.links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    style={{
                      textDecoration: "none",
                      color: "#666",
                      fontSize: "13px",
                      transition: "color 0.2s",
                    }}
                    className="footer-link"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Lab Consumables */}
          <div>
            <h4
              style={{
                fontSize: "14px",
                fontWeight: 700,
                color: "#171717",
                margin: "0 0 20px 0",
                letterSpacing: "0.5px",
              }}
            >
              Lab Consumables
            </h4>
            <ul
              style={{
                listStyle: "none",
                margin: 0,
                padding: 0,
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              {labConsumables.map((product) => {
                const url = product.href || `/lab-consumables/${product.slug}`;
                return (
                  <li key={product.id}>
                    <a
                      href={url}
                      style={{
                        textDecoration: "none",
                        color: "#666",
                        fontSize: "13px",
                        transition: "color 0.2s",
                      }}
                      className="footer-link"
                    >
                      {product.title}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4
              style={{
                fontSize: "14px",
                fontWeight: 700,
                color: "#171717",
                margin: "0 0 20px 0",
                letterSpacing: "0.5px",
              }}
            >
              {footerLinks.legal.title}
            </h4>
            <ul
              style={{
                listStyle: "none",
                margin: 0,
                padding: 0,
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              {footerLinks.legal.links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    style={{
                      textDecoration: "none",
                      color: "#666",
                      fontSize: "13px",
                      transition: "color 0.2s",
                    }}
                    className="footer-link"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Disclaimer Section */}
      <div
        style={{
          background: "#fafafa",
          borderTop: "1px solid #e0e0e0",
          padding: "24px 0",
        }}
      >
        <div
          style={{
            maxWidth: "1400px",
            margin: "0 auto",
            padding: "0 40px",
          }}
        >
          <p
            style={{
              fontSize: "12px",
              color: "#777",
              margin: 0,
              lineHeight: 1.6,
            }}
          >
            <strong>Disclaimer:</strong> Sri Saradi Scientific Private Limited supplies research reagents, laboratory equipment, and consumables for use in academic, pharmaceutical, and diagnostic settings. All products are sold for research and laboratory use only (RUO/IVD as applicable) and are not approved for therapeutic or clinical use unless explicitly stated.
Product images shown on this website are for reference and illustration purposes only. Actual product appearance, packaging, and labelling may vary depending on the manufacturer, batch, or updates made by the principal company.
We make every effort to present accurate product information, including specifications, catalogue numbers, and pricing, but these are subject to change without prior notice at the discretion of the respective manufacturers. Customers are advised to confirm specifications, pricing, lead times, and regulatory classifications directly with our team before placing orders.
Minimum order quantities, import lead times, and product availability may vary as we source products from international manufacturers. All orders are subject to our standard terms and conditions of sale.
It is the buyer's responsibility to ensure that products are used in compliance with applicable local, state, and national regulations, including but not limited to CDSCO, BIS, and FSSAI guidelines where applicable. Proper handling, storage, and disposal of all products must follow the manufacturer's instructions and relevant safety data sheets (SDS/MSDS).
Nothing on this website constitutes medical, diagnostic, or therapeutic advice. Sri Saradi Scientific Private Limited shall not be held liable for any misuse of products or reliance on information presented on this website.
For product-specific documentation, certificates of analysis, safety data sheets, or technical guidance, please contact us directly.</p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div
        style={{
          background: "#fff",
          borderTop: "1px solid #e0e0e0",
          padding: "20px 0",
        }}
      >
        <div
          style={{
            maxWidth: "1400px",
            margin: "0 auto",
            padding: "0 40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            {settings.site_logo ? (
              <img
                src={settings.site_logo}
                alt={settings.site_name || "Logo"}
                style={{ height: "44px", maxWidth: "200px", objectFit: "contain" }}
              />
            ) : (
              <>
                <svg
                  width="36"
                  height="44"
                  viewBox="0 0 50 60"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M25 5C18 5 12 10 12 18C12 26 20 28 25 30C30 32 38 34 38 42C38 50 32 55 25 55"
                    stroke="#2D2B7F"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                  <circle cx="25" cy="12" r="4" fill="#4CAF50" />
                  <circle cx="20" cy="20" r="3" fill="#2196F3" />
                  <circle cx="30" cy="40" r="3" fill="#2D2B7F" />
                  <path
                    d="M15 45C15 45 20 52 25 55"
                    stroke="#4CAF50"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
                <span
                  style={{
                    fontSize: "18px",
                    fontWeight: 700,
                    color: "var(--primary)",
                    fontStyle: "italic",
                  }}
                >
                  Sri Saradi Scientific
                </span>
              </>
            )}
          </div>

          {/* Copyright */}
          <p
            style={{
              fontSize: "13px",
              color: "#888",
              margin: 0,
            }}
          >
            © 2026 Sri Saradi Scientific. All Rights Reserved.
          </p>

          {/* Social Icons */}
          <div style={{ display: "flex", gap: "12px" }}>
            {settings.social_facebook && (
              <a
                href={settings.social_facebook}
                aria-label="Facebook"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  background: "#1a1a2e",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#fff",
                  fontSize: "14px",
                  textDecoration: "none",
                  transition: "background 0.2s",
                }}
                className="footer-social-icon"
              >
                <FaFacebookF />
              </a>
            )}
            {settings.social_linkedin && (
              <a
                href={settings.social_linkedin}
                aria-label="LinkedIn"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  background: "#1a1a2e",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#fff",
                  fontSize: "14px",
                  textDecoration: "none",
                  transition: "background 0.2s",
                }}
                className="footer-social-icon"
              >
                <FaLinkedinIn />
              </a>
            )}
            {settings.social_twitter && (
              <a
                href={settings.social_twitter}
                aria-label="Twitter"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  background: "#1a1a2e",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#fff",
                  fontSize: "14px",
                  textDecoration: "none",
                  transition: "background 0.2s",
                }}
                className="footer-social-icon"
              >
                <FaTwitter />
              </a>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
