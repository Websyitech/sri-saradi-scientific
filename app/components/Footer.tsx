"use client";

import { useState, useEffect } from "react";
import { FaFacebookF, FaLinkedinIn, FaTwitter } from "react-icons/fa";

interface SiteSettings {
  site_name?: string;
  site_logo?: string;
}

const footerLinks = {
  quickLinks: {
    title: "Quick Links",
    links: [
      { label: "Home", href: "/" },
      { label: "About Us", href: "/about" },
      { label: "FAQ", href: "/faq" },
      { label: "Certificates", href: "/certificates" },
      { label: "Careers", href: "/careers" },
    ],
  },
  products1: {
    title: "Products",
    links: [
      { label: "Antibodies", href: "/products?category=antibodies" },
      { label: "ELISA Kits", href: "/products?category=elisa-kits" },
      { label: "Proteins", href: "/products?category=proteins" },
      { label: "Peptides", href: "/products?category=peptides" },
      { label: "Enzymes", href: "/products?category=enzymes" },
    ],
  },
  products2: {
    title: "More Products",
    links: [
      { label: "Buffers", href: "/products?category=buffers" },
      { label: "Amino Acids", href: "/products?category=amino-acids" },
      { label: "Reagents", href: "/products?category=reagents" },
      { label: "Standards", href: "/products?category=standards" },
      { label: "Kits", href: "/products?category=kits" },
    ],
  },
  labConsumables: {
    title: "Lab Consumables",
    links: [
      { label: "Filtration", href: "/lab-consumables?type=filtration" },
      { label: "Liquid Handling", href: "/lab-consumables?type=liquid-handling" },
      { label: "PCR Consumables", href: "/lab-consumables?type=pcr-consumables" },
    ],
  },
  legal: {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms & Conditions", href: "/terms-conditions" },
      { label: "Contact Us", href: "/contact" },
      { label: "Shipping Info", href: "/shipping-info" },
      { label: "Returns", href: "/returns" },
    ],
  },
};

export default function Footer() {
  const [settings, setSettings] = useState<SiteSettings>({});

  useEffect(() => {
    fetch("/api/settings")
      .then((r) => r.json())
      .then((data) => {
        setSettings({
          site_name: data.site_name || "",
          site_logo: data.site_logo || "",
        });
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
          {Object.values(footerLinks).map((section) => (
            <div key={section.title}>
              <h4
                style={{
                  fontSize: "14px",
                  fontWeight: 700,
                  color: "#171717",
                  margin: "0 0 20px 0",
                  letterSpacing: "0.5px",
                }}
              >
                {section.title}
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
                {section.links.map((link) => (
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
          ))}
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
            <strong>Disclaimer:</strong> The information provided on this website is for informational purposes only and is not intended as medical advice, diagnosis, or treatment. 
            All products are for research and laboratory use only. Please consult with a qualified professional before using any products for clinical or therapeutic purposes. 
            Sri Saradi Scientific does not guarantee the accuracy, completeness, or reliability of any information on this website.
          </p>
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
            <a
              href="https://facebook.com"
              aria-label="Facebook"
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
            <a
              href="https://linkedin.com"
              aria-label="LinkedIn"
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
            <a
              href="https://twitter.com"
              aria-label="Twitter"
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
          </div>
        </div>
      </div>
    </footer>
  );
}
