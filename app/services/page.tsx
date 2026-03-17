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
            Our Services
          </div>
          <h1 style={{ 
            fontSize: "clamp(2rem, 5vw, 3rem)", 
            lineHeight: 1.25, 
            fontWeight: 400, 
            marginBottom: 24, 
            color: "#fff" 
          }}>
            Complete laboratory solutions for <em style={{ color: "#C4983A", fontStyle: "normal" }}>modern research</em>
          </h1>
          <p style={{ 
            fontSize: "1.15rem", 
            color: "rgba(255,255,255,0.75)", 
            maxWidth: 620, 
            lineHeight: 1.8, 
            fontWeight: 300 
          }}>
            From product sourcing to custom synthesis, sample preparation to analytical services - we provide end-to-end support for your research needs with pharmaceutical-grade quality standards.
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
              Comprehensive laboratory support services
            </h2>
            <p style={{ 
              color: "#4A5568", 
              fontSize: "1.05rem", 
              maxWidth: 600, 
              margin: "0 auto", 
              lineHeight: 1.8 
            }}>
              We understand that successful research requires more than just quality products. Our integrated service portfolio supports every aspect of your laboratory operations.
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
                  🛒
                </div>
                <h3 style={{ 
                  fontSize: "1.3rem", 
                  fontWeight: 600, 
                  color: "#1A1A1A", 
                  margin: 0 
                }}>
                  Product Procurement
                </h3>
              </div>
              <p style={{ 
                color: "#4A5568", 
                fontSize: "1rem", 
                lineHeight: 1.7, 
                marginBottom: 24 
              }}>
                Direct sourcing from international principals with full documentation and quality validation. No middleman markups, transparent pricing.
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
                  Research reagents & biochemicals
                </li>
                <li style={{ marginBottom: 10, paddingLeft: 20, position: "relative" }}>
                  <span style={{ position: "absolute", left: 0, color: "#0F7B6C", fontWeight: "bold" }}>✓</span>
                  Laboratory consumables
                </li>
                <li style={{ marginBottom: 10, paddingLeft: 20, position: "relative" }}>
                  <span style={{ position: "absolute", left: 0, color: "#0F7B6C", fontWeight: "bold" }}>✓</span>
                  Analytical reference standards
                </li>
                <li style={{ paddingLeft: 20, position: "relative" }}>
                  <span style={{ position: "absolute", left: 0, color: "#0F7B6C", fontWeight: "bold" }}>✓</span>
                  Custom sourcing solutions
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
                  🧪
                </div>
                <h3 style={{ 
                  fontSize: "1.3rem", 
                  fontWeight: 600, 
                  color: "#1A1A1A", 
                  margin: 0 
                }}>
                  Custom Synthesis
                </h3>
              </div>
              <p style={{ 
                color: "#4A5568", 
                fontSize: "1rem", 
                lineHeight: 1.7, 
                marginBottom: 24 
              }}>
                Bespoke chemical synthesis and compound development with pharmaceutical-grade quality control and documentation.
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
                  Small molecule synthesis
                </li>
                <li style={{ marginBottom: 10, paddingLeft: 20, position: "relative" }}>
                  <span style={{ position: "absolute", left: 0, color: "#0F7B6C", fontWeight: "bold" }}>✓</span>
                  Peptide & protein production
                </li>
                <li style={{ marginBottom: 10, paddingLeft: 20, position: "relative" }}>
                  <span style={{ position: "absolute", left: 0, color: "#0F7B6C", fontWeight: "bold" }}>✓</span>
                  Reference standard development
                </li>
                <li style={{ paddingLeft: 20, position: "relative" }}>
                  <span style={{ position: "absolute", left: 0, color: "#0F7B6C", fontWeight: "bold" }}>✓</span>
                  Scale-up capabilities
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
                  📊
                </div>
                <h3 style={{ 
                  fontSize: "1.3rem", 
                  fontWeight: 600, 
                  color: "#1A1A1A", 
                  margin: 0 
                }}>
                  Analytical Services
                </h3>
              </div>
              <p style={{ 
                color: "#4A5568", 
                fontSize: "1rem", 
                lineHeight: 1.7, 
                marginBottom: 24 
              }}>
                Complete analytical testing and characterization services with validated methods and regulatory compliance.
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
                  HPLC/LC-MS analysis
                </li>
                <li style={{ marginBottom: 10, paddingLeft: 20, position: "relative" }}>
                  <span style={{ position: "absolute", left: 0, color: "#0F7B6C", fontWeight: "bold" }}>✓</span>
                  NMR characterization
                </li>
                <li style={{ marginBottom: 10, paddingLeft: 20, position: "relative" }}>
                  <span style={{ position: "absolute", left: 0, color: "#0F7B6C", fontWeight: "bold" }}>✓</span>
                  Purity & impurity profiling
                </li>
                <li style={{ paddingLeft: 20, position: "relative" }}>
                  <span style={{ position: "absolute", left: 0, color: "#0F7B6C", fontWeight: "bold" }}>✓</span>
                  Stability studies
                </li>
              </ul>
            </div>

            {/* Service 4 */}
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
                  📋
                </div>
                <h3 style={{ 
                  fontSize: "1.3rem", 
                  fontWeight: 600, 
                  color: "#1A1A1A", 
                  margin: 0 
                }}>
                  Technical Consulting
                </h3>
              </div>
              <p style={{ 
                color: "#4A5568", 
                fontSize: "1rem", 
                lineHeight: 1.7, 
                marginBottom: 24 
              }}>
                Expert guidance on method development, regulatory compliance, and research optimization from our scientific team.
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
                  Method validation support
                </li>
                <li style={{ marginBottom: 10, paddingLeft: 20, position: "relative" }}>
                  <span style={{ position: "absolute", left: 0, color: "#0F7B6C", fontWeight: "bold" }}>✓</span>
                  Regulatory documentation
                </li>
                <li style={{ marginBottom: 10, paddingLeft: 20, position: "relative" }}>
                  <span style={{ position: "absolute", left: 0, color: "#0F7B6C", fontWeight: "bold" }}>✓</span>
                  Protocol development
                </li>
                <li style={{ paddingLeft: 20, position: "relative" }}>
                  <span style={{ position: "absolute", left: 0, color: "#0F7B6C", fontWeight: "bold" }}>✓</span>
                  Training & support
                </li>
              </ul>
            </div>

            {/* Service 5 */}
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
                  🚚
                </div>
                <h3 style={{ 
                  fontSize: "1.3rem", 
                  fontWeight: 600, 
                  color: "#1A1A1A", 
                  margin: 0 
                }}>
                  Logistics & Storage
                </h3>
              </div>
              <p style={{ 
                color: "#4A5568", 
                fontSize: "1rem", 
                lineHeight: 1.7, 
                marginBottom: 24 
              }}>
                Temperature-controlled storage and specialized shipping for sensitive research materials and biologics.
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
                  Cold chain management
                </li>
                <li style={{ marginBottom: 10, paddingLeft: 20, position: "relative" }}>
                  <span style={{ position: "absolute", left: 0, color: "#0F7B6C", fontWeight: "bold" }}>✓</span>
                  Controlled substance handling
                </li>
                <li style={{ marginBottom: 10, paddingLeft: 20, position: "relative" }}>
                  <span style={{ position: "absolute", left: 0, color: "#0F7B6C", fontWeight: "bold" }}>✓</span>
                  Real-time tracking
                </li>
                <li style={{ paddingLeft: 20, position: "relative" }}>
                  <span style={{ position: "absolute", left: 0, color: "#0F7B6C", fontWeight: "bold" }}>✓</span>
                  Emergency delivery options
                </li>
              </ul>
            </div>

            {/* Service 6 */}
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
                  🤝
                </div>
                <h3 style={{ 
                  fontSize: "1.3rem", 
                  fontWeight: 600, 
                  color: "#1A1A1A", 
                  margin: 0 
                }}>
                  Partnership Programs
                </h3>
              </div>
              <p style={{ 
                color: "#4A5568", 
                fontSize: "1rem", 
                lineHeight: 1.7, 
                marginBottom: 24 
              }}>
                Long-term partnerships with research institutions and pharmaceutical companies for ongoing supply and support.
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
                  Bulk purchase agreements
                </li>
                <li style={{ marginBottom: 10, paddingLeft: 20, position: "relative" }}>
                  <span style={{ position: "absolute", left: 0, color: "#0F7B6C", fontWeight: "bold" }}>✓</span>
                  Dedicated account management
                </li>
                <li style={{ marginBottom: 10, paddingLeft: 20, position: "relative" }}>
                  <span style={{ position: "absolute", left: 0, color: "#0F7B6C", fontWeight: "bold" }}>✓</span>
                  Custom inventory management
                </li>
                <li style={{ paddingLeft: 20, position: "relative" }}>
                  <span style={{ position: "absolute", left: 0, color: "#0F7B6C", fontWeight: "bold" }}>✓</span>
                  Priority support access
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
              How We Work
            </div>
            <h2 style={{ 
              fontSize: "2.2rem", 
              fontWeight: 400, 
              marginBottom: 18, 
              color: "#0B1D33",
              maxWidth: 800,
              margin: "0 auto 18px" 
            }}>
              Our service delivery process
            </h2>
            <p style={{ 
              color: "#4A5568", 
              fontSize: "1.05rem", 
              maxWidth: 600, 
              margin: "0 auto", 
              lineHeight: 1.8 
            }}>
              From initial consultation to project delivery, we follow a structured approach to ensure quality outcomes and transparent communication.
            </p>
          </div>

          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", 
            gap: 24, 
            marginTop: 48 
          }}>
            {[
              { step: "01", title: "Consultation", desc: "Understanding your specific requirements and technical constraints" },
              { step: "02", title: "Proposal", desc: "Detailed project scope, timeline, and transparent pricing" },
              { step: "03", title: "Execution", desc: "Regular updates and quality checkpoints throughout delivery" },
              { step: "04", title: "Delivery", desc: "Complete documentation package and post-delivery support" }
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
                Quality Assurance
              </div>
              <h2 style={{ 
                fontSize: "2rem", 
                fontWeight: 400, 
                marginBottom: 24, 
                color: "#0B1D33" 
              }}>
                Pharmaceutical-grade standards across all services
              </h2>
              <p style={{ 
                color: "#4A5568", 
                fontSize: "1.05rem", 
                lineHeight: 1.8, 
                marginBottom: 32 
              }}>
                Our quality management system ensures every service delivery meets the highest standards of scientific rigor and regulatory compliance.
              </p>
              <div style={{ 
                display: "grid", 
                gridTemplateColumns: "1fr 1fr", 
                gap: 20 
              }}>
                {[
                  "ISO 9001:2015 Certified",
                  "GMP Compliant Processes", 
                  "Validated Analytical Methods",
                  "Full Traceability Documentation"
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
                Service Level Commitments
              </h3>
              <div style={{ 
                display: "flex", 
                flexDirection: "column", 
                gap: 16 
              }}>
                {[
                  { metric: "Response Time", value: "< 24 hours" },
                  { metric: "Project Updates", value: "Weekly reports" },
                  { metric: "Documentation", value: "Complete CoA/CoC" },
                  { metric: "Support Access", value: "Direct scientist contact" }
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
            Ready to discuss your project?
          </h2>
          <p style={{ 
            fontSize: "1.15rem", 
            color: "rgba(255,255,255,0.8)", 
            marginBottom: 36, 
            lineHeight: 1.7 
          }}>
            Our team of scientists and project managers is here to help you achieve your research goals with confidence and efficiency.
          </p>
          <div style={{ 
            display: "flex", 
            gap: 16, 
            justifyContent: "center", 
            flexWrap: "wrap" 
          }}>
            <a 
              href="/contact" 
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
              Start a Conversation
            </a>
            <a 
              href="mailto:services@srisaradiscientific.com" 
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
              Email Our Team
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}