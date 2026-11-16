"use client";

import React, { useState, useEffect } from "react";

interface Certificate {
  id: string;
  title: string;
  image?: string;
  sortOrder: number;
}

export default function CertificatesPage() {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCertificates();
  }, []);

  const fetchCertificates = async () => {
    try {
      const response = await fetch("/api/certificates");
      const data = await response.json();
      setCertificates(data.certificates || []);
    } catch (error) {
      console.error("Error fetching certificates:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ color: "#1A1A1A", background: "#fff" }}>
      {/* Hero Section */}
      <section style={{ background: "#0B1D33", color: "#fff", padding: "80px 24px 70px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "-40%", right: "-10%", width: 500, height: 500, background: "radial-gradient(circle, rgba(15,123,108,0.15) 0%, transparent 70%)", borderRadius: "50%" }} />
        <div style={{ maxWidth: 800, margin: "0", position: "relative", zIndex: 1, textAlign: "left", padding: "0px 40px" }}>
          <div style={{ fontSize: "0.8rem", letterSpacing: 3, textTransform: "uppercase", color: "#0F7B6C", marginBottom: 20, fontWeight: 600 }}>
            Certifications & Quality Assurance
          </div>
          <h1 style={{ fontSize: "clamp(2rem, 5vw, 3rem)", lineHeight: 1.25, fontWeight: 400, marginBottom: 24, color: "#fff" }}>
            Quality standards you can <em style={{ color: "#C4983A", fontStyle: "normal" }}>trust and verify</em>
          </h1>
          <p style={{ fontSize: "1.15rem", color: "rgba(255,255,255,0.75)", maxWidth: 620, lineHeight: 1.8, fontWeight: 300 }}>
            Our certifications and quality standards ensure that every product meets international pharmaceutical and research-grade requirements. Transparency in documentation, validation, and compliance.
          </p>
        </div>
      </section>

      {/* Main Certificates Section */}
      <section style={{ background: "#fff", padding: "80px 0" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 40px" }}>
          {/* Section Header */}
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <div style={{ fontSize: "0.75rem", letterSpacing: 2.5, textTransform: "uppercase", color: "#0F7B6C", fontWeight: 600, marginBottom: 14 }}>
              Quality Certifications
            </div>
            <h2 style={{ fontSize: "2.2rem", fontWeight: 400, marginBottom: 24, color: "#0B1D33", maxWidth: 800, margin: "0 auto 24px" }}>
              International standards, documented compliance
            </h2>
            <p style={{ color: "#4A5568", fontSize: "1.1rem", lineHeight: 1.8, maxWidth: 700, margin: "0 auto" }}>
              Every certificate represents our commitment to quality, traceability, and regulatory compliance. These standards ensure that our products meet the rigorous requirements of modern research and pharmaceutical applications.
            </p>
          </div>

          {/* Loading State */}
          {loading ? (
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "400px" }}>
              <div style={{
                width: "40px",
                height: "40px",
                border: "4px solid #e0e0e0",
                borderTopColor: "#2D2B7F",
                borderRadius: "50%",
                animation: "spin 0.8s linear infinite"
              }} />
            </div>
          ) : certificates.length === 0 ? (
            /* Empty State */
            <div style={{
              textAlign: "center",
              padding: "80px 40px",
              color: "#666",
              backgroundColor: "#f8f9fa",
              borderRadius: "12px",
              border: "2px dashed #ddd"
            }}>
              <div style={{
                fontSize: "48px",
                marginBottom: "24px",
                opacity: 0.5
              }}>
                📜
              </div>
              <h3 style={{
                fontSize: "1.5rem",
                marginBottom: "16px",
                color: "#333"
              }}>
                Certificates Coming Soon
              </h3>
              <p style={{
                fontSize: "1.1rem",
                lineHeight: 1.6,
                maxWidth: "500px",
                margin: "0 auto"
              }}>
                We're currently updating our certification documentation. Please check back soon or contact us directly for specific quality and compliance information.
              </p>
            </div>
          ) : (
            /* Certificates Grid */
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
              gap: "32px",
              marginBottom: 64
            }}>
              {certificates.map((certificate) => (
                <div
                  key={certificate.id}
                  style={{
                    backgroundColor: "#fff",
                    borderRadius: "12px",
                    overflow: "hidden",
                    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
                    border: "1px solid #e9ecef",
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    cursor: "pointer"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-4px)";
                    e.currentTarget.style.boxShadow = "0 8px 30px rgba(0, 0, 0, 0.12)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.08)";
                  }}
                >
                  {/* Certificate Image */}
                  <div style={{ position: "relative" }}>
                    {certificate.image ? (
                      <img
                        src={certificate.image}
                        alt={certificate.title}
                        style={{
                          width: "100%",
                          height: "250px",
                          objectFit: "cover",
                          display: "block"
                        }}
                      />
                    ) : (
                      <div style={{
                        width: "100%",
                        height: "250px",
                        backgroundColor: "#f8f9fa",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#666",
                        fontSize: "48px"
                      }}>
                        📄
                      </div>
                    )}
                    
                    {/* Certificate Badge */}
                    <div style={{
                      position: "absolute",
                      top: "16px",
                      right: "16px",
                      backgroundColor: "rgba(45, 43, 127, 0.9)",
                      color: "#fff",
                      padding: "6px 12px",
                      borderRadius: "20px",
                      fontSize: "0.8rem",
                      fontWeight: 600,
                      letterSpacing: "0.5px"
                    }}>
                      CERTIFIED
                    </div>
                  </div>

                  {/* Certificate Info */}
                  <div style={{ padding: "24px 28px" }}>
                    <h3 style={{
                      fontSize: "1.3rem",
                      fontWeight: 600,
                      marginBottom: "12px",
                      color: "#0B1D33",
                      lineHeight: 1.4
                    }}>
                      {certificate.title}
                    </h3>
                    
                    {/* View Certificate Button */}
                    <button
                      onClick={() => certificate.image && window.open(certificate.image, '_blank')}
                      disabled={!certificate.image}
                      style={{
                        width: "100%",
                        padding: "12px 20px",
                        backgroundColor: certificate.image ? "#0F7B6C" : "#ccc",
                        color: "#fff",
                        border: "none",
                        borderRadius: "6px",
                        fontSize: "0.95rem",
                        fontWeight: 600,
                        cursor: certificate.image ? "pointer" : "not-allowed",
                        transition: "background-color 0.3s ease",
                        marginTop: "16px"
                      }}
                      onMouseEnter={(e) => {
                        if (certificate.image) {
                          e.currentTarget.style.backgroundColor = "#0d6b5d";
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (certificate.image) {
                          e.currentTarget.style.backgroundColor = "#0F7B6C";
                        }
                      }}
                    >
                      {certificate.image ? "View Certificate" : "Certificate Unavailable"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Quality Assurance Section */}
          <div style={{
            backgroundColor: "#f8f9fa",
            borderRadius: "16px",
            padding: "60px 40px",
            textAlign: "center",
            marginTop: 64
          }}>
            <div style={{ fontSize: "0.75rem", letterSpacing: 2.5, textTransform: "uppercase", color: "#0F7B6C", fontWeight: 600, marginBottom: 14 }}>
              Quality Assurance
            </div>
            <h3 style={{
              fontSize: "1.8rem",
              fontWeight: 400,
              marginBottom: "24px",
              color: "#0B1D33"
            }}>
              Compliance you can count on
            </h3>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "32px",
              marginTop: "48px"
            }}>
              <div style={{ textAlign: "center" }}>
                <div style={{
                  width: "60px",
                  height: "60px",
                  backgroundColor: "#0F7B6C",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 16px",
                  fontSize: "24px"
                }}>
                  ✓
                </div>
                <h4 style={{ fontSize: "1.1rem", fontWeight: 600, marginBottom: "8px", color: "#0B1D33" }}>
                  ISO Compliance
                </h4>
                <p style={{ color: "#666", fontSize: "0.95rem", lineHeight: 1.6 }}>
                  International Organization for Standardization guidelines for quality management systems
                </p>
              </div>

              <div style={{ textAlign: "center" }}>
                <div style={{
                  width: "60px",
                  height: "60px",
                  backgroundColor: "#2D2B7F",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 16px",
                  fontSize: "24px"
                }}>
                  🔬
                </div>
                <h4 style={{ fontSize: "1.1rem", fontWeight: 600, marginBottom: "8px", color: "#0B1D33" }}>
                  GMP Standards
                </h4>
                <p style={{ color: "#666", fontSize: "0.95rem", lineHeight: 1.6 }}>
                  Good Manufacturing Practice guidelines for pharmaceutical-grade product handling
                </p>
              </div>

              <div style={{ textAlign: "center" }}>
                <div style={{
                  width: "60px",
                  height: "60px",
                  backgroundColor: "#C4983A",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 16px",
                  fontSize: "24px"
                }}>
                  📋
                </div>
                <h4 style={{ fontSize: "1.1rem", fontWeight: 600, marginBottom: "8px", color: "#0B1D33" }}>
                  Documentation
                </h4>
                <p style={{ color: "#666", fontSize: "0.95rem", lineHeight: 1.6 }}>
                  Complete traceability documentation and certificates of analysis for every product
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}