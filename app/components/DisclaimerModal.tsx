"use client";

import { useState, useEffect } from "react";

interface DisclaimerData {
  id: string | null;
  title: string;
  content: string;
  isActive: boolean;
  acceptButtonText: string;
  declineButtonText: string;
}

export default function DisclaimerModal() {
  const [disclaimer, setDisclaimer] = useState<DisclaimerData | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const hasAccepted = localStorage.getItem("disclaimerAccepted");
    
    if (!hasAccepted) {
      fetch("/api/disclaimer")
        .then((r) => r.json())
        .then((data: DisclaimerData) => {
          setDisclaimer(data);
          if (data.isActive) {
            setShowModal(true);
          }
        })
        .catch(() => {})
        .finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("disclaimerAccepted", "true");
    setShowModal(false);
  };

  const handleDecline = () => {
    setShowModal(false);
  };

  if (isLoading || !showModal || !disclaimer) {
    return null;
  }

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        width: "100%",
        background: "#1a1a2e",
        color: "#fff",
        padding: "20px 0",
        zIndex: 9999,
        boxShadow: "0 -2px 10px rgba(0, 0, 0, 0.2)",
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
          gap: "20px",
        }}
      >
        <div style={{ flex: 1 }}>
          <h3
            style={{
              fontSize: "16px",
              fontWeight: 700,
              margin: "0 0 8px 0",
              color: "#fff",
            }}
          >
            {disclaimer.title}
          </h3>
          <p
            style={{
              fontSize: "13px",
              lineHeight: "1.5",
              color: "#ccc",
              margin: 0,
              whiteSpace: "pre-wrap",
            }}
          >
            {disclaimer.content}
          </p>
        </div>

        <div
          style={{
            display: "flex",
            gap: "10px",
            flexShrink: 0,
          }}
        >
          <button
            onClick={handleDecline}
            style={{
              padding: "10px 18px",
              border: "1px solid rgba(255, 255, 255, 0.3)",
              background: "transparent",
              color: "#fff",
              borderRadius: "4px",
              fontSize: "13px",
              fontWeight: 600,
              cursor: "pointer",
              transition: "all 0.2s",
              whiteSpace: "nowrap",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
            }}
          >
            {disclaimer.declineButtonText}
          </button>
          <button
            onClick={handleAccept}
            style={{
              padding: "10px 18px",
              border: "none",
              background: "var(--primary, #6C63FF)",
              color: "#fff",
              borderRadius: "4px",
              fontSize: "13px",
              fontWeight: 600,
              cursor: "pointer",
              transition: "all 0.2s",
              whiteSpace: "nowrap",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = "0.9";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = "1";
            }}
          >
            {disclaimer.acceptButtonText}
          </button>
        </div>
      </div>
    </div>
  );
}
