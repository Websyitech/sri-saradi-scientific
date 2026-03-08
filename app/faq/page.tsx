"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface FAQ {
  id: string;
  slug: string;
  title: string;
  heading?: string;
  subheading?: string;
  banner?: string;
  isActive: boolean;
  sortOrder: number;
}

export default function FAQPage() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/faqs")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setFaqs(data);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return <div style={{ padding: "40px", textAlign: "center" }}>Loading...</div>;
  }

  return (
    <div style={{ minHeight: "100vh", background: "#fff" }}>
      {/* HEADER SECTION */}
      <section style={{ width: "100%", padding: "50px 40px", background: "#f5f5f5" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <h1
            style={{
              fontSize: "40px",
              fontWeight: "800",
              color: "#171717",
              margin: "0 0 16px 0",
            }}
          >
            Frequently Asked Questions
          </h1>
          <p
            style={{
              fontSize: "16px",
              lineHeight: "1.7",
              color: "#555",
              margin: "0",
              maxWidth: "700px",
            }}
          >
            Find answers to common questions about our services, products, and processes
          </p>
        </div>
      </section>

      <hr style={{ border: "none", borderTop: "1px solid #e0e0e0", margin: "0" }} />

      {/* FAQ GRID */}
      <section style={{ maxWidth: "1400px", margin: "0 auto", padding: "50px 40px" }}>
        {faqs.length > 0 ? (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: "30px",
            }}
          >
            {faqs.map((faq) => (
              <Link
                key={faq.id}
                href={`/faq/${faq.slug}`}
                style={{ textDecoration: "none" }}
              >
                <div
                  style={{
                    background: "#fff",
                    border: "1px solid #e0e0e0",
                    borderRadius: "8px",
                    overflow: "hidden",
                    transition: "all 0.3s ease",
                    cursor: "pointer",
                    height: "100%",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = "0 8px 24px rgba(0, 0, 0, 0.12)";
                    e.currentTarget.style.transform = "translateY(-4px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = "none";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  {faq.banner && (
                    <img
                      src={faq.banner}
                      alt={faq.title}
                      style={{
                        width: "100%",
                        height: "200px",
                        objectFit: "contain",
                        background: "#f5f5f5",
                      }}
                    />
                  )}
                  <div style={{ padding: "24px" }}>
                    <h3
                      style={{
                        margin: "0 0 12px 0",
                        fontSize: "18px",
                        fontWeight: "700",
                        color: "#171717",
                      }}
                    >
                      {faq.title}
                    </h3>
                    {faq.subheading && (
                      <p
                        style={{
                          margin: "0",
                          fontSize: "14px",
                          color: "#666",
                          lineHeight: "1.6",
                        }}
                      >
                        {faq.subheading}
                      </p>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div style={{ textAlign: "center", color: "#999", padding: "40px" }}>
            No FAQs available yet
          </div>
        )}
      </section>
    </div>
  );
}
