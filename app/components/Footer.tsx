"use client";

import { useState, useEffect } from "react";
import { FaFacebookF, FaLinkedinIn, FaTwitter } from "react-icons/fa";

interface SiteSettings {
  site_name?: string;
  site_logo?: string;
}

const footerLinks = {
  navigation: {
    title: "NAVIGATION",
    links: [
      { label: "Home", href: "/" },
      { label: "About Us", href: "/about" },
      { label: "What We Do", href: "/what-we-do" },
      { label: "To The Power of 10", href: "/power-of-10" },
      { label: "Donate", href: "/donate" },
    ],
  },
  whatWeDo: {
    title: "WHAT WE DO",
    links: [
      { label: "Encouraging Testing", href: "/encouraging-testing" },
      { label: "Strengthening Advocacy", href: "/strengthening-advocacy" },
      { label: "Sharing Information", href: "/sharing-information" },
      { label: "Building Leadership", href: "/building-leadership" },
      { label: "Engaging With Global Fund", href: "/engaging-global-fund" },
      { label: "Shining a Light", href: "/shining-a-light" },
    ],
  },
  legal: {
    title: "LEGAL",
    links: [
      { label: "General Info", href: "/general-info" },
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms of Service", href: "/terms-of-service" },
    ],
  },
  talkToUs: {
    title: "TALK TO US",
    links: [
      { label: "support@ercom.com", href: "mailto:support@ercom.com" },
      { label: "+66 2399 1145", href: "tel:+6623991145" },
      { label: "Contact Us", href: "/contact" },
      { label: "Facebook", href: "https://facebook.com" },
      { label: "Linkedin", href: "https://linkedin.com" },
      { label: "Twitter", href: "https://twitter.com" },
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
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "40px",
          }}
        >
          {Object.values(footerLinks).map((section) => (
            <div key={section.title}>
              <h4
                style={{
                  fontSize: "14px",
                  fontWeight: 700,
                  color: "#1a1a2e",
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
                        color: "#555",
                        fontSize: "14px",
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
