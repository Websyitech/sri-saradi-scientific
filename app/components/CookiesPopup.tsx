"use client";

import { useState, useEffect } from "react";
import { FaCookieBite, FaTimes } from "react-icons/fa";

export default function CookiesPopup() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Check if user has already accepted cookies
    const accepted = localStorage.getItem("srisaradi_cookies_accepted");
    if (!accepted) {
      // Show popup after a short delay
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("srisaradi_cookies_accepted", "true");
    setVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem("srisaradi_cookies_accepted", "essential_only");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
        background: "rgba(0,0,0,0.5)",
        backdropFilter: "blur(4px)",
        animation: "slideUp 0.4s ease-out",
      }}
    >
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "0 40px",
        }}
      >
        <div
          style={{
            background: "#1a1a2e",
            borderRadius: "16px 16px 0 0",
            padding: "28px 32px",
            display: "flex",
            alignItems: "flex-start",
            gap: "20px",
            position: "relative",
          }}
        >
          {/* Close button */}
          <button
            onClick={handleDecline}
            style={{
              position: "absolute",
              top: "16px",
              right: "16px",
              background: "none",
              border: "none",
              color: "rgba(255,255,255,0.4)",
              cursor: "pointer",
              fontSize: "16px",
              padding: "4px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <FaTimes />
          </button>

          {/* Cookie Icon */}
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "12px",
              background: "rgba(255,255,255,0.08)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <FaCookieBite style={{ fontSize: "22px", color: "#f0c040" }} />
          </div>

          {/* Content */}
          <div style={{ flex: 1, paddingRight: "24px" }}>
            <h3
              style={{
                fontSize: "16px",
                fontWeight: 700,
                color: "#fff",
                margin: "0 0 8px 0",
              }}
            >
              🍪 We Use Cookies
            </h3>
            <p
              style={{
                fontSize: "13px",
                lineHeight: 1.7,
                color: "rgba(255,255,255,0.6)",
                margin: "0 0 6px 0",
              }}
            >
              We use cookies and similar technologies to enhance your browsing experience, analyze
              website traffic, and personalize content. By clicking "Accept All", you consent to the
              use of all cookies. You can manage your preferences or learn more in our{" "}
              <a
                href="/privacy-policy"
                style={{
                  color: "#a0a0ff",
                  textDecoration: "underline",
                }}
              >
                Privacy Policy
              </a>
              .
            </p>

            {/* Disclaimer */}
            <p
              style={{
                fontSize: "11px",
                color: "rgba(255,255,255,0.35)",
                margin: "0",
                lineHeight: 1.5,
              }}
            >
              <strong>Disclaimer:</strong> Sri Saradi Scientific provides product information for
              reference purposes only. Product specifications and availability are subject to change.
              We are not liable for any discrepancies. Please verify details before placing orders.
            </p>
          </div>

          {/* Buttons */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              flexShrink: 0,
              alignSelf: "center",
            }}
          >
            <button
              onClick={handleAccept}
              className="cookie-accept-btn"
              style={{
                padding: "11px 28px",
                background: "linear-gradient(135deg, #2D2B7F, #3a38a0)",
                color: "#fff",
                fontSize: "13px",
                fontWeight: 700,
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                whiteSpace: "nowrap",
                transition: "all 0.2s",
                boxShadow: "0 2px 12px rgba(45,43,127,0.4)",
              }}
            >
              Accept All
            </button>
            <button
              onClick={handleDecline}
              className="cookie-decline-btn"
              style={{
                padding: "11px 28px",
                background: "transparent",
                color: "rgba(255,255,255,0.6)",
                fontSize: "13px",
                fontWeight: 600,
                border: "1px solid rgba(255,255,255,0.15)",
                borderRadius: "8px",
                cursor: "pointer",
                whiteSpace: "nowrap",
                transition: "all 0.2s",
              }}
            >
              Essential Only
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
