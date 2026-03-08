"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface CROService {
  id: string;
  title: string;
  slug: string;
  heading?: string;
  subheading?: string;
  banner?: string;
  content?: string;
  isActive: boolean;
  sortOrder: number;
}

const breadcrumbs = [
  { label: "Home", href: "/" },
  { label: "CRO Services", href: "/cro-services" },
];

export default function CROServicesPage() {
  const [services, setServices] = useState<CROService[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch("/api/cro-services");
        const data = await res.json();
        setServices(data);
      } catch (error) {
        console.error("Error fetching services:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

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
            {crumb.href ? (
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
            ) : (
              <span style={{ color: "#666" }}>{crumb.label}</span>
            )}
          </span>
        ))}
      </div>

      <hr style={{ border: "none", borderTop: "1px solid #e0e0e0", margin: "0" }} />

      {/* HEADER SECTION */}
      <section style={{ width: "100%", padding: "40px", background: "#f5f5f5" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <h1
            style={{
              fontSize: "36px",
              fontWeight: "800",
              color: "#171717",
              margin: "0 0 16px 0",
            }}
          >
            CRO Services
          </h1>
          <p
            style={{
              fontSize: "16px",
              lineHeight: "1.6",
              color: "#555",
              margin: "0",
            }}
          >
            Comprehensive Contract Research Organization services for your biological and chemical research needs
          </p>
        </div>
      </section>

      <hr style={{ border: "none", borderTop: "1px solid #e0e0e0", margin: "0" }} />

      {/* SERVICES GRID */}
      <section
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "50px 40px",
        }}
      >
        <h2
          style={{
            fontSize: "28px",
            fontWeight: "700",
            color: "#333",
            margin: "0 0 40px 0",
          }}
        >
          Our Services
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "32px",
          }}
        >
          {loading ? (
            <div style={{ gridColumn: "1 / -1", textAlign: "center", padding: "40px" }}>
              Loading services...
            </div>
          ) : services.length === 0 ? (
            <div style={{ gridColumn: "1 / -1", textAlign: "center", padding: "40px", color: "#999" }}>
              No services available. Please add services in the admin panel.
            </div>
          ) : (
            services.map((service) => (
              <Link
                key={service.id}
                href={`/cro-services/${service.slug}`}
                style={{
                  textDecoration: "none",
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: "8px",
                  overflow: "hidden",
                  border: "1px solid #e0e0e0",
                  transition: "all 0.3s",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget;
                  el.style.boxShadow = "0 8px 24px rgba(45, 43, 127, 0.15)";
                  el.style.transform = "translateY(-4px)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget;
                  el.style.boxShadow = "none";
                  el.style.transform = "translateY(0)";
                }}
              >
                {/* Image */}
                <div
                  style={{
                    width: "100%",
                    height: "240px",
                    background: "linear-gradient(135deg, #2D2B7F 0%, #1a1a4d 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    overflow: "hidden",
                  }}
                >
                  {service.banner ? (
                    <img
                      src={service.banner}
                      alt={service.title}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  ) : (
                    <div
                      style={{
                        fontSize: "48px",
                        color: "#fff",
                        opacity: "0.8",
                      }}
                    >
                      {service.title.charAt(0)}
                    </div>
                  )}
                </div>

                {/* Content */}
                <div style={{ padding: "24px", flex: 1, display: "flex", flexDirection: "column" }}>
                  <h3
                    style={{
                      fontSize: "18px",
                      fontWeight: "700",
                      color: "#333",
                      margin: "0 0 12px 0",
                    }}
                  >
                    {service.title}
                  </h3>
                  <p
                    style={{
                      fontSize: "14px",
                      lineHeight: "1.6",
                      color: "#666",
                      margin: "0 0 16px 0",
                      flex: 1,
                    }}
                  >
                    {service.subheading || "Professional CRO services"}
                  </p>
                  <span
                    style={{
                      fontSize: "14px",
                      fontWeight: "600",
                      color: "var(--primary)",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    Learn More →
                  </span>
                </div>
              </Link>
            ))
          )}
        </div>
      </section>
    </div>
  );
}
