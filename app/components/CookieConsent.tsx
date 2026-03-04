"use client";

import { useState, useEffect } from "react";

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const cookieConsent = localStorage.getItem("cookieConsent");
    if (!cookieConsent) {
      setShowBanner(true);
    }
  }, []);

  const handleAllowAll = () => {
    localStorage.setItem("cookieConsent", "all");
    setShowBanner(false);
  };

  const handleAllowSelection = () => {
    localStorage.setItem("cookieConsent", "selection");
    setShowBanner(false);
  };

  const handleDeny = () => {
    localStorage.setItem("cookieConsent", "deny");
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        background: "#fff",
        borderTop: "1px solid #e0e0e0",
        padding: "24px 40px",
        zIndex: 1000,
        boxShadow: "0 -2px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <div style={{ maxWidth: "1400px", margin: "0 auto", display: "flex", alignItems: "center", gap: "40px" }}>
        {/* Content */}
        <div style={{ flex: 1 }}>
          <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#171717", margin: "0 0 12px 0" }}>
            This website uses cookies
          </h3>
          <p style={{ fontSize: "14px", color: "#555", margin: 0, lineHeight: 1.5 }}>
            We use cookies to personalise content and ads, to provide social media features and to analyse our traffic. 
            We also share information about your use of our site with our social media, advertising and analytics partners.
          </p>
        </div>

        {/* Buttons */}
        <div style={{ display: "flex", flexDirection: "column", gap: "12px", minWidth: "180px" }}>
          <button
            onClick={handleAllowAll}
            style={{
              padding: "12px 20px",
              background: "#2D2B7F",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              fontSize: "14px",
              fontWeight: 600,
              cursor: "pointer",
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#1a1a4d")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#2D2B7F")}
          >
            Allow all
          </button>
          <button
            onClick={handleAllowSelection}
            style={{
              padding: "12px 20px",
              background: "#fff",
              color: "#2D2B7F",
              border: "2px solid #2D2B7F",
              borderRadius: "4px",
              fontSize: "14px",
              fontWeight: 600,
              cursor: "pointer",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#f9f9f9")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#fff")}
          >
            Allow selection
          </button>
          <button
            onClick={handleDeny}
            style={{
              padding: "12px 20px",
              background: "#fff",
              color: "#2D2B7F",
              border: "2px solid #2D2B7F",
              borderRadius: "4px",
              fontSize: "14px",
              fontWeight: 600,
              cursor: "pointer",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#f9f9f9")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#fff")}
          >
            Deny
          </button>
        </div>
      </div>
    </div>
  );
}
