"use client";

import React from "react";

export default function ServicesPage() {
  return (
    <>
      <style jsx>{`
        @media (max-width: 768px) {
          .hero-content {
            padding: 0 20px !important;
          }
          
          .hero-stats-grid {
            grid-template-columns: 1fr !important;
            gap: 16px !important;
            margin-bottom: 60px !important;
          }
          
          section {
            padding: 40px 0 !important;
          }
          
          section > div {
            padding: 0 20px !important;
          }
          
          div[style*="gridTemplateColumns"] {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
          }
        }
        
        @media (max-width: 480px) {
          .hero-content {
            padding: 0 16px !important;
          }
          
          section > div {
            padding: 0 16px !important;
          }
          
          .hero-stats-grid {
            gap: 12px !important;
          }
          
          div[style*="gridTemplateColumns"] {
            gap: 16px !important;
          }
        }
      `}</style>
    <div style={{ color: "#1A1A1A", backgroundColor: "#fff" }}>
      {/* Hero Section */}
      <section style={{
        background: `url('https://srisaradiscientific.com/uploads/1773597822715-About_us__background_1.webp')`,
        backgroundSize: "cover",
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
        color: "#C4983A",
        padding: "80px 24px 0",
        position: "relative",
        overflow: "hidden"
      }}>
        <div style={{
          position: "absolute",
          top: "-40%",
          right: "-10%",
          width: 500,
          height: 500,
          background: "radial-gradient(circle, rgba(15,123,108,0.15) 0%, transparent 70%)",
          borderRadius: "50%"
        }} />
        <div style={{
          maxWidth: 1400,
          margin: "0 auto",
          position: "relative",
          zIndex: 1,
          textAlign: "left",
          padding: "0px 40px"
        }} className="hero-content">
          <div className="partner-pill" style={{ marginBottom: 20 }}>
            <div className="partner-dot"></div>
            Drug Discovery Intelligence
          </div>
          <h1 style={{
            fontSize: "clamp(2rem, 5vw, 3rem)",
            lineHeight: 1.25,
            fontWeight: 400,
            marginBottom: 24,
            color: "#fff",
            maxWidth: 800
          }}>
            From <em style={{ color: "#fff", fontStyle: "normal" }}>Target</em> to <em style={{ color: "#fff", fontStyle: "normal" }}>Therapy</em>, Faster.
          </h1>
          <p style={{
            fontSize: "1.15rem",
            color: "rgba(255,255,255,0.75)",
            maxWidth: 620,
            lineHeight: 1.8,
            fontWeight: 300,
            marginBottom: 56
          }}>
            We combine a proprietary database of 5,000+ validated oncology targets with end-to-end NGS bioinformatics — so your team spends less time on literature review and more time advancing candidates.
          </p>

          {/* Hero Stats Grid */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 24,
            marginBottom: 80
          }} className="hero-stats-grid">
            <div style={{
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: 12,
              padding: 32,
              backdropFilter: "blur(8px)"
            }}>
              <div style={{
                fontSize: "2.5rem",
                fontWeight: 700,
                color: "#C4983A",
                marginBottom: 8,
                lineHeight: 1
              }}>
                5,000+
              </div>
              <div style={{
                fontSize: "0.95rem",
                color: "rgba(255,255,255,0.8)",
                lineHeight: 1.5
              }}>
                Curated marker genes across 5 solid tumors
              </div>
            </div>

            <div style={{
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: 12,
              padding: 32,
              backdropFilter: "blur(8px)"
            }}>
              <div style={{
                fontSize: "2.5rem",
                fontWeight: 700,
                color: "#fff",
                marginBottom: 8,
                lineHeight: 1
              }}>
                100%
              </div>
              <div style={{
                fontSize: "0.95rem",
                color: "rgba(255,255,255,0.8)",
                lineHeight: 1.5
              }}>
                Manually validated from published literature
              </div>
            </div>

            <div style={{
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: 12,
              padding: 32,
              backdropFilter: "blur(8px)",
              display: "flex",
              alignItems: "center",
              gap: 16
            }}>
              <div style={{
                fontSize: "2rem"
              }}>
                🧬
              </div>
              <div>
                <div style={{
                  fontSize: "1rem",
                  fontWeight: 600,
                  marginBottom: 4
                }}>
                  Drug Repurposing Maps
                </div>
                <div style={{
                  fontSize: "0.85rem",
                  color: "rgba(255,255,255,0.8)"
                }}>
                  Existing approved drugs mapped to all 5,000 gene targets
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Services Section */}
      <section style={{ background: "#fff", padding: "80px 0" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 40px" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <div style={{ 
              fontSize: "0.75rem", 
              letterSpacing: 2.5, 
              textTransform: "uppercase", 
              color: "#0F7B6C", 
              fontWeight: 600, 
              marginBottom: 14 
            }}>
              What We Offer
            </div>
            <h2 style={{ 
              fontSize: "2.2rem", 
              fontWeight: 400, 
              marginBottom: 18, 
              color: "#0B1D33",
              maxWidth: 800,
              margin: "0 auto 18px" 
            }}>
              Three ways to accelerate<br/>your drug discovery pipeline
            </h2>
            <p style={{ 
              color: "#4A5568", 
              fontSize: "1.05rem", 
              maxWidth: 600, 
              margin: "0 auto", 
              lineHeight: 1.8 
            }}>
              Whether you need a curated database, custom bioinformatics analysis, or a prioritized target report — we deliver research-grade intelligence built on experimentally validated data.
            </p>
          </div>

          {/* Services Grid */}
          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))", 
            gap: 32, 
            marginTop: 48 
          }}>
            {/* Service 1 */}
            <div style={{ 
              background: "#fff", 
              borderRadius: 12, 
              border: "1px solid #E5E5E5", 
              padding: "40px 32px", 
              boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
              transition: "all 0.3s ease",
              position: "relative",
              overflow: "hidden"
            }}>
              <div style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: 4,
                background: "#0F7B6C"
              }} />
              <div style={{ 
                display: "flex", 
                alignItems: "center", 
                marginBottom: 20 
              }}>
                <div style={{ 
                  width: 52, 
                  height: 52, 
                  borderRadius: 12, 
                  background: "rgba(15, 123, 108, 0.1)", 
                  display: "flex", 
                  alignItems: "center", 
                  justifyContent: "center", 
                  marginRight: 16,
                  fontSize: 24
                }}>
                  🗄️
                </div>
                <h3 style={{ 
                  fontSize: "1.3rem", 
                  fontWeight: 600, 
                  color: "#1A1A1A", 
                  margin: 0 
                }}>
                  Target & Drug Repurposing Database
                </h3>
              </div>
              <p style={{ 
                color: "#4A5568", 
                fontSize: "1rem", 
                lineHeight: 1.7, 
                marginBottom: 24 
              }}>
                Access our proprietary database of 5,000+ oncology genes — each manually curated, prioritized by druggability tier, and mapped to existing approved drugs for repurposing.
              </p>
              <ul style={{ 
                listStyle: "none", 
                padding: 0, 
                margin: 0, 
                fontSize: "0.9rem", 
                color: "#4A5568" 
              }}>
                <li style={{ marginBottom: 10, paddingLeft: 20, position: "relative" }}>
                  <span style={{ position: "absolute", left: 0, color: "#0F7B6C", fontWeight: "bold" }}>✓</span>
                  Diamond, Gold, Silver, Bronze target classifications
                </li>
                <li style={{ marginBottom: 10, paddingLeft: 20, position: "relative" }}>
                  <span style={{ position: "absolute", left: 0, color: "#0F7B6C", fontWeight: "bold" }}>✓</span>
                  Druggability annotations with evidence levels
                </li>
                <li style={{ marginBottom: 10, paddingLeft: 20, position: "relative" }}>
                  <span style={{ position: "absolute", left: 0, color: "#0F7B6C", fontWeight: "bold" }}>✓</span>
                  Approved drug ↔ gene target repurposing maps
                </li>
                <li style={{ marginBottom: 10, paddingLeft: 20, position: "relative" }}>
                  <span style={{ position: "absolute", left: 0, color: "#0F7B6C", fontWeight: "bold" }}>✓</span>
                  Targeting mechanism data (small molecule, antibody, etc.)
                </li>
                <li style={{ paddingLeft: 20, position: "relative" }}>
                  <span style={{ position: "absolute", left: 0, color: "#0F7B6C", fontWeight: "bold" }}>✓</span>
                  Searchable by disease area, gene, or drug
                </li>
              </ul>
            </div>

            {/* Service 2 */}
            <div style={{ 
              background: "#fff", 
              borderRadius: 12, 
              border: "1px solid #E5E5E5", 
              padding: "40px 32px", 
              boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
              transition: "all 0.3s ease",
              position: "relative",
              overflow: "hidden"
            }}>
              <div style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: 4,
                background: "#2D2B7F"
              }} />
              <div style={{ 
                display: "flex", 
                alignItems: "center", 
                marginBottom: 20 
              }}>
                <div style={{ 
                  width: 52, 
                  height: 52, 
                  borderRadius: 12, 
                  background: "rgba(45, 43, 127, 0.1)", 
                  display: "flex", 
                  alignItems: "center", 
                  justifyContent: "center", 
                  marginRight: 16,
                  fontSize: 24
                }}>
                  🧬
                </div>
                <h3 style={{ 
                  fontSize: "1.3rem", 
                  fontWeight: 600, 
                  color: "#1A1A1A", 
                  margin: 0 
                }}>
                  NGS Bioinformatics Services
                </h3>
              </div>
              <p style={{ 
                color: "#4A5568", 
                fontSize: "1rem", 
                lineHeight: 1.7, 
                marginBottom: 24 
              }}>
                From raw sequencing data to actionable insights. Our team builds and runs custom NGS pipelines tailored to your research — RNA-seq, WES, WGS, and beyond.
              </p>
              <ul style={{ 
                listStyle: "none", 
                padding: 0, 
                margin: 0, 
                fontSize: "0.9rem", 
                color: "#4A5568" 
              }}>
                <li style={{ marginBottom: 10, paddingLeft: 20, position: "relative" }}>
                  <span style={{ position: "absolute", left: 0, color: "#0F7B6C", fontWeight: "bold" }}>✓</span>
                  End-to-end pipeline design and execution
                </li>
                <li style={{ marginBottom: 10, paddingLeft: 20, position: "relative" }}>
                  <span style={{ position: "absolute", left: 0, color: "#0F7B6C", fontWeight: "bold" }}>✓</span>
                  Differential gene expression analysis
                </li>
                <li style={{ marginBottom: 10, paddingLeft: 20, position: "relative" }}>
                  <span style={{ position: "absolute", left: 0, color: "#0F7B6C", fontWeight: "bold" }}>✓</span>
                  Variant calling and annotation
                </li>
                <li style={{ marginBottom: 10, paddingLeft: 20, position: "relative" }}>
                  <span style={{ position: "absolute", left: 0, color: "#0F7B6C", fontWeight: "bold" }}>✓</span>
                  Pathway and gene ontology enrichment
                </li>
                <li style={{ paddingLeft: 20, position: "relative" }}>
                  <span style={{ position: "absolute", left: 0, color: "#0F7B6C", fontWeight: "bold" }}>✓</span>
                  Publication-ready figures and reports
                </li>
              </ul>
            </div>

            {/* Service 3 */}
            <div style={{ 
              background: "#fff", 
              borderRadius: 12, 
              border: "1px solid #E5E5E5", 
              padding: "40px 32px", 
              boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
              transition: "all 0.3s ease",
              position: "relative",
              overflow: "hidden"
            }}>
              <div style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: 4,
                background: "#C4983A"
              }} />
              <div style={{ 
                display: "flex", 
                alignItems: "center", 
                marginBottom: 20 
              }}>
                <div style={{ 
                  width: 52, 
                  height: 52, 
                  borderRadius: 12, 
                  background: "rgba(196, 152, 58, 0.1)", 
                  display: "flex", 
                  alignItems: "center", 
                  justifyContent: "center", 
                  marginRight: 16,
                  fontSize: 24
                }}>
                  📋
                </div>
                <h3 style={{ 
                  fontSize: "1.3rem", 
                  fontWeight: 600, 
                  color: "#1A1A1A", 
                  margin: 0 
                }}>
                  Custom Target Prioritization Reports
                </h3>
              </div>
              <p style={{ 
                color: "#4A5568", 
                fontSize: "1rem", 
                lineHeight: 1.7, 
                marginBottom: 24 
              }}>
                Tell us your disease area and therapeutic hypothesis. We deliver a curated report with ranked targets, repurposing candidates, and the supporting evidence — ready for your discovery team.
              </p>
              <ul style={{ 
                listStyle: "none", 
                padding: 0, 
                margin: 0, 
                fontSize: "0.9rem", 
                color: "#4A5568" 
              }}>
                <li style={{ marginBottom: 10, paddingLeft: 20, position: "relative" }}>
                  <span style={{ position: "absolute", left: 0, color: "#0F7B6C", fontWeight: "bold" }}>✓</span>
                  Disease-specific target shortlists
                </li>
                <li style={{ marginBottom: 10, paddingLeft: 20, position: "relative" }}>
                  <span style={{ position: "absolute", left: 0, color: "#0F7B6C", fontWeight: "bold" }}>✓</span>
                  Competitive landscape analysis per target
                </li>
                <li style={{ marginBottom: 10, paddingLeft: 20, position: "relative" }}>
                  <span style={{ position: "absolute", left: 0, color: "#0F7B6C", fontWeight: "bold" }}>✓</span>
                  Literature evidence summaries
                </li>
                <li style={{ marginBottom: 10, paddingLeft: 20, position: "relative" }}>
                  <span style={{ position: "absolute", left: 0, color: "#0F7B6C", fontWeight: "bold" }}>✓</span>
                  Repurposing candidates with rationale
                </li>
                <li style={{ paddingLeft: 20, position: "relative" }}>
                  <span style={{ position: "absolute", left: 0, color: "#0F7B6C", fontWeight: "bold" }}>✓</span>
                  Delivered within 2–4 weeks
                </li>
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* Proprietary Classification Section */}
      <section style={{ background: "#F8F9FA", padding: "80px 0" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 40px" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <div style={{
              fontSize: "0.75rem",
              letterSpacing: 2.5,
              textTransform: "uppercase",
              color: "#0F7B6C",
              fontWeight: 600,
              marginBottom: 14
            }}>
              Proprietary Classification
            </div>
            <h2 style={{
              fontSize: "2.2rem",
              fontWeight: 400,
              marginBottom: 18,
              color: "#0B1D33",
              maxWidth: 800,
              margin: "0 auto 18px"
            }}>
              How we rank targets
            </h2>
            <p style={{
              color: "#4A5568",
              fontSize: "1.05rem",
              maxWidth: 600,
              margin: "0 auto",
              lineHeight: 1.8
            }}>
              Every gene in our database is classified into a druggability tier based on experimental validation, published evidence, and existing drug availability.
            </p>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 60,
            marginTop: 56,
            alignItems: "start"
          }}>
            {/* Tier Cards */}
            <div>
              {[
                { emoji: "💎", title: "Diamond Target", desc: "Strong experimental evidence, high druggability, existing approved/pipeline drugs. Highest confidence for therapeutic intervention." },
                { emoji: "🥇", title: "Gold Target", desc: "Solid evidence base, known druggable domains, repurposing opportunities identified from existing pharmacopoeia." },
                { emoji: "🥈", title: "Silver Target", desc: "Emerging evidence, potential druggable features, requires additional validation but showing strong biological rationale." },
                { emoji: "🥉", title: "Bronze Target", desc: "Preliminary associations, early-stage evidence. Included for completeness and to support exploratory research programs." }
              ].map((tier, idx) => (
                <div key={idx} style={{
                  background: "#fff",
                  border: "1px solid #E5E5E5",
                  borderRadius: 12,
                  padding: 24,
                  marginBottom: 16,
                  display: "flex",
                  gap: 16
                }}>
                  <div style={{
                    fontSize: "2rem",
                    minWidth: "50px",
                    textAlign: "center"
                  }}>
                    {tier.emoji}
                  </div>
                  <div>
                    <h4 style={{
                      fontSize: "1rem",
                      fontWeight: 600,
                      color: "#1A1A1A",
                      marginBottom: 6,
                      margin: 0
                    }}>
                      {tier.title}
                    </h4>
                    <p style={{
                      fontSize: "0.9rem",
                      color: "#4A5568",
                      lineHeight: 1.6,
                      margin: 0
                    }}>
                      {tier.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Sample Database Table */}
            <div style={{
              background: "#fff",
              border: "1px solid #E5E5E5",
              borderRadius: 12,
              padding: 32
            }}>
              <h3 style={{
                fontSize: "1.15rem",
                fontWeight: 600,
                marginBottom: 8,
                color: "#1A1A1A"
              }}>
                Sample Database Output
              </h3>
              <p style={{
                fontSize: "0.85rem",
                color: "#4A5568",
                marginBottom: 24
              }}>
                Illustrative example — actual database contains 5,000+ entries
              </p>
              <div style={{ overflowX: "auto" }}>
                <table style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  fontSize: "0.85rem"
                }}>
                  <thead>
                    <tr>
                      <th style={{
                        textAlign: "left",
                        fontWeight: 600,
                        fontSize: "0.75rem",
                        letterSpacing: "0.8px",
                        textTransform: "uppercase",
                        color: "#4A5568",
                        padding: "0 12px 12px 0",
                        borderBottom: "1.5px solid #E5E5E5"
                      }}>Gene</th>
                      <th style={{
                        textAlign: "left",
                        fontWeight: 600,
                        fontSize: "0.75rem",
                        letterSpacing: "0.8px",
                        textTransform: "uppercase",
                        color: "#4A5568",
                        padding: "0 12px 12px",
                        borderBottom: "1.5px solid #E5E5E5"
                      }}>Tier</th>
                      <th style={{
                        textAlign: "left",
                        fontWeight: 600,
                        fontSize: "0.75rem",
                        letterSpacing: "0.8px",
                        textTransform: "uppercase",
                        color: "#4A5568",
                        padding: "0 12px 12px",
                        borderBottom: "1.5px solid #E5E5E5"
                      }}>Druggable</th>
                      <th style={{
                        textAlign: "left",
                        fontWeight: 600,
                        fontSize: "0.75rem",
                        letterSpacing: "0.8px",
                        textTransform: "uppercase",
                        color: "#4A5568",
                        padding: "0 12px 12px",
                        borderBottom: "1.5px solid #E5E5E5"
                      }}>Repurposing</th>
                      <th style={{
                        textAlign: "left",
                        fontWeight: 600,
                        fontSize: "0.75rem",
                        letterSpacing: "0.8px",
                        textTransform: "uppercase",
                        color: "#4A5568",
                        padding: "0 12px 12px",
                        borderBottom: "1.5px solid #E5E5E5"
                      }}>Indication</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { gene: "EGFR", tier: "Diamond", druggable: "Yes", repurposing: "Erlotinib, Gefitinib", indication: "Lung Adeno." },
                      { gene: "KRAS", tier: "Diamond", druggable: "Yes", repurposing: "Sotorasib", indication: "Pancreatic" },
                      { gene: "TP53", tier: "Gold", druggable: "Limited", repurposing: "Under investigation", indication: "Colorectal" },
                      { gene: "FGFR2", tier: "Gold", druggable: "Yes", repurposing: "Erdafitinib", indication: "H&N Carcinoma" },
                      { gene: "CDK12", tier: "Diamond", druggable: "Yes", repurposing: "Dinaciclib", indication: "SCLC" }
                    ].map((row, idx) => (
                      <tr key={idx}>
                        <td style={{
                          padding: "12px 12px 12px 0",
                          borderBottom: "1px solid #E5E5E5",
                          fontWeight: 600,
                          color: "#0F7B6C",
                          fontFamily: "'SF Mono', 'Fira Code', monospace"
                        }}>
                          {row.gene}
                        </td>
                        <td style={{
                          padding: "12px 12px",
                          borderBottom: "1px solid #E5E5E5"
                        }}>
                          <span style={{
                            display: "inline-block",
                            padding: "3px 10px",
                            borderRadius: "100px",
                            fontSize: "0.75rem",
                            fontWeight: 600,
                            background: row.tier === "Diamond" ? "#EEF1FE" : "#FFF8E7",
                            color: row.tier === "Diamond" ? "#4A6CF7" : "#B8860B"
                          }}>
                            {row.tier}
                          </span>
                        </td>
                        <td style={{
                          padding: "12px 12px",
                          borderBottom: "1px solid #E5E5E5"
                        }}>
                          <span style={{
                            display: "inline-block",
                            padding: "3px 10px",
                            borderRadius: "100px",
                            fontSize: "0.75rem",
                            fontWeight: 600,
                            background: row.druggable === "Yes" ? "#E8F5EE" : "#FEF2F2",
                            color: row.druggable === "Yes" ? "#1B6B4A" : "#B91C1C"
                          }}>
                            {row.druggable}
                          </span>
                        </td>
                        <td style={{
                          padding: "12px 12px",
                          borderBottom: "1px solid #E5E5E5",
                          fontSize: "0.8rem"
                        }}>
                          {row.repurposing}
                        </td>
                        <td style={{
                          padding: "12px 12px",
                          borderBottom: "1px solid #E5E5E5",
                          fontSize: "0.8rem"
                        }}>
                          {row.indication}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Disease Areas / Coverage Section */}
      <section style={{ background: "#fff", padding: "80px 0" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 40px" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <div style={{
              fontSize: "0.75rem",
              letterSpacing: 2.5,
              textTransform: "uppercase",
              color: "#0F7B6C",
              fontWeight: 600,
              marginBottom: 14
            }}>
              Coverage
            </div>
            <h2 style={{
              fontSize: "2.2rem",
              fontWeight: 400,
              marginBottom: 18,
              color: "#0B1D33",
              maxWidth: 800,
              margin: "0 auto 18px"
            }}>
              Disease areas in our database
            </h2>
            <p style={{
              color: "#4A5568",
              fontSize: "1.05rem",
              maxWidth: 600,
              margin: "0 auto",
              lineHeight: 1.8
            }}>
              Five high-impact solid tumor types with curated gene sets. Expanding to additional cancer types and therapeutic areas.
            </p>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 24,
            marginTop: 48
          }}>
            {[
              { emoji: "🫁", title: "Lung Adenocarcinoma", count: "1,000+ genes" },
              { emoji: "🫁", title: "Small Cell Lung Cancer", count: "1,000+ genes" },
              { emoji: "🔬", title: "Colorectal Carcinoma", count: "1,000+ genes" },
              { emoji: "🧫", title: "Head & Neck Carcinoma", count: "1,000+ genes" },
              { emoji: "🔬", title: "Pancreatic Ductal Adenocarcinoma", count: "1,000+ genes" }
            ].map((disease, idx) => (
              <div key={idx} style={{
                background: "#fff",
                border: "1px solid #E5E5E5",
                borderRadius: 12,
                padding: 32,
                textAlign: "center",
                transition: "all 0.3s ease",
                cursor: "pointer",
                boxShadow: "0 2px 8px rgba(0,0,0,0.04)"
              }}>
                <div style={{
                  fontSize: "2.5rem",
                  marginBottom: 16,
                  display: "block"
                }}>
                  {disease.emoji}
                </div>
                <h4 style={{
                  fontSize: "1rem",
                  fontWeight: 600,
                  color: "#1A1A1A",
                  marginBottom: 8,
                  lineHeight: 1.4
                }}>
                  {disease.title}
                </h4>
                <p style={{
                  fontSize: "0.85rem",
                  color: "#4A5568",
                  margin: 0
                }}>
                  {disease.count}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section - Timeline Workflow */}
      <section style={{ background: "#F8F9FA", padding: "0" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 40px" }}>
          <div style={{ textAlign: "center", marginBottom: 100 }}>
            <div style={{
              fontSize: "0.75rem",
              letterSpacing: 2.5,
              textTransform: "uppercase",
              color: "#0F7B6C",
              fontWeight: 600,
              marginBottom: 14
            }}>
              NGS Pipeline
            </div>
            <h2 style={{
              fontSize: "2.2rem",
              fontWeight: 400,
              marginBottom: 18,
              color: "#0B1D33",
              maxWidth: 800,
              margin: "0 auto 18px"
            }}>
              Our bioinformatics workflow
            </h2>
            <p style={{
              color: "#4A5568",
              fontSize: "1.05rem",
              maxWidth: 650,
              margin: "0 auto",
              lineHeight: 1.8
            }}>
              End-to-end analysis from raw sequencing files to prioritized therapeutic targets — with human validation at every stage.
            </p>
          </div>

          {/* Timeline Workflow */}
          <div style={{ position: "relative", padding: "80px 0" }}>
            {/* Connecting Line - Between Circles Only */}
            <div style={{
              position: "absolute",
              top: "calc(20% + 45px)",
              left: "calc(5% + 45px)",
              right: "calc(5% + 45px)",
              height: "2px",
              background: "#0F7B6C",
              zIndex: 1,
              pointerEvents: "none"
            }} />

            {/* Steps Container */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(5, 1fr)",
              gap: 48,
              position: "relative",
              zIndex: 2
            }}>
              {[
                { step: "1", title: "Data Intake", desc: "FASTQ files, BAM/CRAM, or raw sequencer output from your NGS platform" },
                { step: "2", title: "QC & Alignment", desc: "Quality control, adapter trimming, and reference genome alignment" },
                { step: "3", title: "Analysis", desc: "Variant calling, differential expression, pathway enrichment" },
                { step: "4", title: "Target Mapping", desc: "Cross-reference with our 5,000-gene database for druggability and tier classification" },
                { step: "5", title: "Deliverables", desc: "Prioritized target list, repurposing candidates, publication-ready report" }
              ].map((item, index) => (
                <div key={index} style={{ textAlign: "center", position: "relative" }}>
                  {/* Circle Number */}
                  <div style={{
                    width: 90,
                    height: 90,
                    borderRadius: "50%",
                    background: "#fff",
                    border: "3px solid #0F7B6C",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 32px",
                    fontSize: "2rem",
                    fontWeight: 700,
                    color: "#0F7B6C",
                    boxShadow: "0 6px 20px rgba(15, 123, 108, 0.15)",
                    transition: "all 0.3s ease",
                    cursor: "pointer",
                    position: "relative",
                    zIndex: 3
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "scale(1.1)";
                    e.currentTarget.style.boxShadow = "0 10px 30px rgba(15, 123, 108, 0.25)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                    e.currentTarget.style.boxShadow = "0 6px 20px rgba(15, 123, 108, 0.15)";
                  }}>
                    {item.step}
                  </div>

                  {/* Title */}
                  <h4 style={{
                    fontSize: "1.1rem",
                    fontWeight: 700,
                    color: "#1A1A1A",
                    marginBottom: 12,
                    lineHeight: 1.4,
                    letterSpacing: "-0.3px"
                  }}>
                    {item.title}
                  </h4>

                  {/* Description */}
                  <p style={{
                    fontSize: "0.85rem",
                    color: "#4A5568",
                    lineHeight: 1.7,
                    margin: 0,
                    minHeight: "60px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}>
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Sri Saradi Section */}
      <section style={{ background: "#fff", padding: "80px 0" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 40px" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <div style={{
              fontSize: "0.75rem",
              letterSpacing: 2.5,
              textTransform: "uppercase",
              color: "#0F7B6C",
              fontWeight: 600,
              marginBottom: 14
            }}>
              Why Sri Saradi
            </div>
            <h2 style={{
              fontSize: "2.2rem",
              fontWeight: 400,
              marginBottom: 18,
              color: "#0B1D33",
              maxWidth: 800,
              margin: "0 auto 18px"
            }}>
              What sets us apart
            </h2>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 32,
            marginTop: 48
          }}>
            {[
              {
                number: "01",
                title: "Manually Curated",
                desc: "Every gene validated against published literature and experimental data. No automated scraping, no unverified predictions."
              },
              {
                number: "02",
                title: "Pharma R&D Lineage",
                desc: "Our team brings hands-on experience from GMP pharmaceutical R&D environments — we understand what drug development teams actually need."
              },
              {
                number: "03",
                title: "Full Stack Capability",
                desc: "From reagent supply to sequencing analysis to target prioritization — a single partner across your entire discovery workflow."
              },
              {
                number: "04",
                title: "Repurposing Focus",
                desc: "Our drug repurposing maps accelerate timelines by identifying existing approved molecules with evidence for new indications."
              }
            ].map((item, idx) => (
              <div key={idx} style={{
                background: "#fff",
                border: "1px solid #E5E5E5",
                borderRadius: 12,
                padding: 40,
                boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                transition: "all 0.3s ease"
              }}>
                <div style={{
                  fontSize: "2.5rem",
                  fontWeight: 300,
                  color: "#D0CFC7",
                  lineHeight: 1,
                  marginBottom: 16
                }}>
                  {item.number}
                </div>
                <h4 style={{
                  fontSize: "1.1rem",
                  fontWeight: 600,
                  color: "#1A1A1A",
                  marginBottom: 12
                }}>
                  {item.title}
                </h4>
                <p style={{
                  fontSize: "0.9rem",
                  color: "#4A5568",
                  lineHeight: 1.7,
                  margin: 0
                }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ background: "#0B1D33", padding: "80px 40px", color: "#fff" }}>
        <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ 
            fontSize: "2.2rem", 
            fontWeight: 400, 
            marginBottom: 20, 
            color: "#fff" 
          }}>
            Ready to accelerate your<br/>target discovery?
          </h2>
          <p style={{ 
            fontSize: "1.15rem", 
            color: "rgba(255,255,255,0.8)", 
            marginBottom: 36, 
            lineHeight: 1.7 
          }}>
            Whether you need database access, a bioinformatics pipeline, or a custom target report — let's discuss how we can support your research.
          </p>
          <div style={{ 
            display: "flex", 
            gap: 16, 
            justifyContent: "center", 
            flexWrap: "wrap" 
          }}>
            <a 
              href="mailto:info@srisaradiscientific.com" 
              style={{ 
                background: "#0F7B6C", 
                color: "#fff", 
                padding: "14px 32px", 
                borderRadius: 8, 
                textDecoration: "none", 
                fontWeight: 600, 
                fontSize: "1rem",
                transition: "all 0.3s ease"
              }}
            >
              Schedule a Call →
            </a>
            <a 
              href="#" 
              style={{ 
                background: "transparent", 
                color: "#fff", 
                padding: "14px 32px", 
                borderRadius: 8, 
                textDecoration: "none", 
                fontWeight: 600, 
                fontSize: "1rem",
                border: "2px solid rgba(255,255,255,0.3)",
                transition: "all 0.3s ease"
              }}
            >
              Download Capability Deck
            </a>
          </div>
        </div>
      </section>
    </div>
    </>
  );
}