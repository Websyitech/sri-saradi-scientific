"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

interface FAQContent {
  id: string;
  slug: string;
  title: string;
  heading?: string;
  subheading?: string;
  banner?: string;
  content?: string;
  isActive: boolean;
  sortOrder: number;
}

const breadcrumbs = [
  { label: "Home", href: "/" },
  { label: "FAQ", href: "/faq" },
];

export default function FAQDetailPage() {
  const params = useParams();
  const faqSlug = params?.slug as string;
  const [faq, setFaq] = useState<FAQContent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFAQ = async () => {
      try {
        const res = await fetch(`/api/faqs?slug=${faqSlug}`);
        if (res.ok) {
          const data = await res.json();
          setFaq(data);
        }
      } catch (error) {
        console.error("Error fetching FAQ:", error);
      } finally {
        setLoading(false);
      }
    };

    if (faqSlug) {
      fetchFAQ();
    }
  }, [faqSlug]);

  if (loading) {
    return <div style={{ padding: "40px", textAlign: "center" }}>Loading...</div>;
  }

  if (!faq) {
    return (
      <div style={{ padding: "40px", textAlign: "center", color: "#999" }}>
        FAQ not found. Please go to{" "}
        <a href="/faq" style={{ color: "var(--primary)" }}>
          FAQ
        </a>
        .
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#fff" }}>
      {/* BREADCRUMB */}
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "16px 40px",
          display: "flex",
          alignItems: "center",
          gap: "6px",
          flexWrap: "wrap",
          fontSize: "13px",
        }}
      >
        {breadcrumbs.map((crumb, i) => (
          <span key={i} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            {i > 0 && <span style={{ color: "#999" }}>{">"}</span>}
            <a
              href={crumb.href}
              style={{
                color: "var(--primary)",
                textDecoration: "none",
                fontWeight: "500",
              }}
            >
              {crumb.label}
            </a>
          </span>
        ))}
        <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <span style={{ color: "#999" }}>{">"}</span>
          <span style={{ color: "#666" }}>{faq.title}</span>
        </span>
      </div>

      <hr style={{ border: "none", borderTop: "1px solid #e0e0e0", margin: "0" }} />

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
            {faq.heading || faq.title}
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
            {faq.subheading || faq.title}
          </p>
        </div>
      </section>

      <hr style={{ border: "none", borderTop: "1px solid #e0e0e0", margin: "0" }} />

      {/* CONTENT SECTION */}
      <section
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "50px 40px",
        }}
      >
        {faq.banner && (
          <div
            style={{
              marginBottom: "40px",
              borderRadius: "8px",
              overflow: "hidden",
            }}
          >
            <img
              src={faq.banner}
              alt={faq.title}
              style={{
                width: "100%",
                height: "auto",
                maxHeight: "400px",
                objectFit: "contain",
                background: "#f5f5f5",
              }}
            />
          </div>
        )}

        {faq.content ? (
          <>
            <div
              style={{
                fontSize: "15px",
                lineHeight: "1.8",
                color: "#555",
              }}
              dangerouslySetInnerHTML={{ __html: faq.content }}
            />
            <style>{`
              table, th, td {
                border: 1px solid #999 !important;
                border-collapse: collapse;
              }
              table {
                width: 100%;
                margin: 20px 0;
              }
              th, td {
                padding: 12px 16px;
                text-align: left;
              }
              th {
                background-color: #f5f5f5;
                font-weight: 600;
              }
            `}</style>
          </>
        ) : (
          <div style={{ textAlign: "center", color: "#999", padding: "40px" }}>
            No content available for this FAQ. Please check back later or contact us for more information.
          </div>
        )}
      </section>

      {/* CTA SECTION */}
      <section
        style={{
          maxWidth: "1400px",
          margin: "50px auto 0",
          padding: "50px 40px",
        }}
      >
        <div
          style={{
            background: "linear-gradient(135deg, #2D2B7F 0%, #1a1a4d 100%)",
            padding: "50px",
            borderRadius: "8px",
            textAlign: "center",
            color: "#fff",
          }}
        >
          <h2
            style={{
              fontSize: "28px",
              fontWeight: "700",
              margin: "0 0 16px 0",
            }}
          >
            Still Have Questions?
          </h2>
          <p
            style={{
              fontSize: "16px",
              lineHeight: "1.6",
              margin: "0 0 24px 0",
              opacity: "0.9",
            }}
          >
            Contact our team and we'll be happy to help you
          </p>
          <a
            href="/contact"
            style={{
              display: "inline-block",
              padding: "12px 32px",
              background: "#fff",
              color: "var(--primary)",
              textDecoration: "none",
              fontWeight: "700",
              borderRadius: "4px",
              transition: "all 0.3s",
              fontSize: "14px",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.15)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            Contact Us
          </a>
        </div>
      </section>
    </div>
  );
}
