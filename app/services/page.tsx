import React from "react";

export default function ServicesPage() {
  return (
    <div style={{ color: "#1A1A1A", backgroundColor: "#fff" }}>
      {/* Hero Section */}
      <section style={{ 
        background: "#0B1D33", 
        color: "#fff", 
        padding: "80px 24px 70px", 
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
          maxWidth: 800, 
          margin: "0", 
          position: "relative", 
          zIndex: 1, 
          textAlign: "left", 
          padding: "0px 40px" 
        }}>
          <div style={{ 
            fontSize: "0.8rem", 
            letterSpacing: 3, 
            textTransform: "uppercase", 
            color: "#0F7B6C", 
            marginBottom: 20, 
            fontWeight: 600 
          }}>
            Drug Discovery Intelligence
          </div>
          <h1 style={{ 
            fontSize: "clamp(2rem, 5vw, 3rem)", 
            lineHeight: 1.25, 
            fontWeight: 400, 
            marginBottom: 24, 
            color: "#fff" 
          }}>
            From <em style={{ color: "#C4983A", fontStyle: "normal" }}>Target</em> to <em style={{ color: "#C4983A", fontStyle: "normal" }}>Therapy</em>, Faster.
          </h1>
          <p style={{ 
            fontSize: "1.15rem", 
            color: "rgba(255,255,255,0.75)", 
            maxWidth: 620, 
            lineHeight: 1.8, 
            fontWeight: 300 
          }}>
            We combine a proprietary database of 5,000+ validated oncology targets with end-to-end NGS bioinformatics — so your team spends less time on literature review and more time advancing candidates.
          </p>
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

      {/* Process Section */}
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
              maxWidth: 600, 
              margin: "0 auto", 
              lineHeight: 1.8 
            }}>
              End-to-end analysis from raw sequencing files to prioritized therapeutic targets — with human validation at every stage.
            </p>
          </div>

          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", 
            gap: 24, 
            marginTop: 48 
          }}>
            {[
              { step: "01", title: "Data Intake", desc: "FASTQ files, BAM/CRAM, or raw sequencer output from your NGS platform" },
              { step: "02", title: "QC & Alignment", desc: "Quality control, adapter trimming, and reference genome alignment" },
              { step: "03", title: "Analysis", desc: "Variant calling, differential expression, pathway enrichment" },
              { step: "04", title: "Target Mapping", desc: "Cross-reference with our 5,000-gene database for druggability and tier classification" },
              { step: "05", title: "Deliverables", desc: "Prioritized target list, repurposing candidates, publication-ready report" }
            ].map((item, index) => (
              <div key={index} style={{ 
                background: "#fff", 
                borderRadius: 12, 
                padding: "32px 24px", 
                textAlign: "center",
                border: "1px solid #E5E5E5",
                position: "relative"
              }}>
                <div style={{ 
                  width: 60, 
                  height: 60, 
                  borderRadius: "50%", 
                  background: index % 2 === 0 ? "#2D2B7F" : "#0F7B6C", 
                  color: "#fff", 
                  display: "flex", 
                  alignItems: "center", 
                  justifyContent: "center", 
                  fontSize: "1.2rem", 
                  fontWeight: 600, 
                  margin: "0 auto 20px" 
                }}>
                  {item.step}
                </div>
                <h4 style={{ 
                  fontSize: "1.1rem", 
                  fontWeight: 600, 
                  marginBottom: 12, 
                  color: "#1A1A1A" 
                }}>
                  {item.title}
                </h4>
                <p style={{ 
                  color: "#4A5568", 
                  fontSize: "0.9rem", 
                  lineHeight: 1.6, 
                  margin: 0 
                }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quality Standards Section */}
      <section style={{ background: "#fff", padding: "80px 0" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 40px" }}>
          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "1fr 1fr", 
            gap: 60, 
            alignItems: "center" 
          }}>
            <div>
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
                fontSize: "2rem", 
                fontWeight: 400, 
                marginBottom: 24, 
                color: "#0B1D33" 
              }}>
                What sets us apart
              </h2>
              <p style={{ 
                color: "#4A5568", 
                fontSize: "1.05rem", 
                lineHeight: 1.8, 
                marginBottom: 32 
              }}>
                Every gene in our database is manually curated against published literature and experimental data. No automated scraping, no unverified predictions.
              </p>
              <div style={{ 
                display: "grid", 
                gridTemplateColumns: "1fr 1fr", 
                gap: 20 
              }}>
                {[
                  "Manually Curated",
                  "Pharma R&D Lineage", 
                  "Full Stack Capability",
                  "Repurposing Focus"
                ].map((item, index) => (
                  <div key={index} style={{ 
                    display: "flex", 
                    alignItems: "center", 
                    gap: 12 
                  }}>
                    <div style={{ 
                      width: 20, 
                      height: 20, 
                      borderRadius: "50%", 
                      background: "#0F7B6C", 
                      display: "flex", 
                      alignItems: "center", 
                      justifyContent: "center", 
                      color: "#fff", 
                      fontSize: "12px", 
                      fontWeight: "bold",
                      flexShrink: 0
                    }}>
                      ✓
                    </div>
                    <span style={{ 
                      fontSize: "0.9rem", 
                      color: "#1A1A1A", 
                      fontWeight: 500 
                    }}>
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ 
              background: "linear-gradient(135deg, #0B1D33 0%, #2D2B7F 100%)", 
              borderRadius: 12, 
              padding: 40, 
              color: "#fff" 
            }}>
              <h3 style={{ 
                fontSize: "1.5rem", 
                fontWeight: 600, 
                marginBottom: 24, 
                color: "#fff" 
              }}>
                Database Statistics
              </h3>
              <div style={{ 
                display: "flex", 
                flexDirection: "column", 
                gap: 16 
              }}>
                {[
                  { metric: "Curated Targets", value: "5,000+" },
                  { metric: "Disease Areas", value: "5 Solid Tumors" },
                  { metric: "Validation", value: "100% Manual" },
                  { metric: "Drug Mapping", value: "Complete" }
                ].map((item, index) => (
                  <div key={index} style={{ 
                    display: "flex", 
                    justifyContent: "space-between", 
                    alignItems: "center", 
                    padding: "12px 0", 
                    borderBottom: "1px solid rgba(255,255,255,0.1)" 
                  }}>
                    <span style={{ fontSize: "0.95rem", opacity: 0.8 }}>{item.metric}</span>
                    <span style={{ fontSize: "0.95rem", fontWeight: 600 }}>{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
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
  );
}