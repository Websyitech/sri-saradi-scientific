import React from "react";

export default function AboutPage() {
  return (
    <div style={{ background: "#FAFAF7", color: "#1A1A1A", backgroundImage: "url('https://srisaradiscientific.com/uploads/1773597822715-About_us__background_1.webp')", backgroundRepeat: "no-repeat", backgroundPosition: "top center" }}>
      {/* Hero Section */}
      <section style={{ background: "#0B1D33", color: "#fff", padding: "80px 24px 70px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "-40%", right: "-10%", width: 500, height: 500, background: "radial-gradient(circle, rgba(15,123,108,0.15) 0%, transparent 70%)", borderRadius: "50%" }} />
        <div style={{ maxWidth: 800, margin: "0", position: "relative", zIndex: 1, textAlign: "left", padding: "0px 40px" }}>
          <div style={{ fontSize: "0.8rem", letterSpacing: 3, textTransform: "uppercase", color: "#0F7B6C", marginBottom: 20, fontWeight: 600 }}>
            About Sri Saradi Scientific
          </div>
          <h1 style={{ fontSize: "clamp(2rem, 5vw, 3rem)", lineHeight: 1.25, fontWeight: 400, marginBottom: 24, color: "#fff" }}>
            Your lab deserves a supplier who <em style={{ color: "#C4983A", fontStyle: "normal" }}>understands your science</em>
          </h1>
          <p style={{ fontSize: "1.15rem", color: "rgba(255,255,255,0.75)", maxWidth: 620, lineHeight: 1.8, fontWeight: 300 }}>
            We bring globally manufactured, quality-validated research products to Indian laboratories. Direct sourcing from international principals, pharmaceutical-grade documentation standards, and honest pricing without the multinational brand premium.
          </p>
        </div>
      </section>

      {/* Section 1 - White Background */}
      <section style={{ background: "#fff", padding: "60px 0" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 40px" }}>
          {/* The Problem We Saw */}
          <div style={{ marginBottom: 56 }}>
          <div style={{ fontSize: "0.75rem", letterSpacing: 2.5, textTransform: "uppercase", color: "#0F7B6C", fontWeight: 600, marginBottom: 14 }}>
            The Reality You Know
          </div>
          <h2 style={{ fontSize: "1.6rem", fontWeight: 400, marginBottom: 18, color: "#0B1D33" }}>
            Procurement shouldn't feel like a gamble
          </h2>
          <p style={{ color: "#4A5568", fontSize: "1.05rem", marginBottom: 16, lineHeight: 1.8 }}>
            You already know this story. Your grant budget gets eaten up by multinational brand markups, or you take a chance on an unknown vendor and spend weeks wondering whether the kit will actually perform. The sales rep who shows up at your lab can quote a catalogue number but can't explain the difference between two ELISA formats. And when a shipment is delayed or a product underperforms, good luck getting someone on the phone who understands the problem.
          </p>
          <p style={{ color: "#4A5568", fontSize: "1.05rem", marginBottom: 16, lineHeight: 1.8 }}>
            It doesn't have to work this way. And frankly, in most countries with mature research ecosystems, it doesn't.
          </p>
          </div>

          {/* Before & After Comparison */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, margin: "48px 0" }}>
            {/* Before Card */}
            <div style={{ 
              position: "relative",
              padding: "40px 32px", 
              borderRadius: 8, 
              background: "#fff", 
              border: "2px solid #E5E5E5",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)"
            }}>
              <div style={{
                position: "absolute",
                top: "-10px",
                left: "24px",
                background: "#000",
                color: "#fff",
                padding: "6px 16px",
                borderRadius: "4px",
                fontSize: "0.75rem",
                fontWeight: 600,
                letterSpacing: "0.5px",
                textTransform: "uppercase"
              }}>
                Before
              </div>
              <div style={{ marginTop: "16px" }}>
                <h3 style={{ fontSize: "1.25rem", marginBottom: 20, fontWeight: 600, color: "#1A1A1A" }}>
                  The procurement challenge
                </h3>
                <ul style={{ 
                  listStyle: "none", 
                  padding: 0, 
                  margin: 0,
                  fontSize: "0.95rem", 
                  color: "#4A5568", 
                  lineHeight: 1.7
                }}>
                  <li style={{ marginBottom: "14px", paddingLeft: "24px", position: "relative" }}>
                    <span style={{ position: "absolute", left: "0", color: "#666", fontWeight: "bold", fontSize: "1.1rem" }}>−</span>
                    Brand premium pricing without transparency
                  </li>
                  <li style={{ marginBottom: "14px", paddingLeft: "24px", position: "relative" }}>
                    <span style={{ position: "absolute", left: "0", color: "#666", fontWeight: "bold", fontSize: "1.1rem" }}>−</span>
                    Sales reps who can't answer technical questions
                  </li>
                  <li style={{ marginBottom: "14px", paddingLeft: "24px", position: "relative" }}>
                    <span style={{ position: "absolute", left: "0", color: "#666", fontWeight: "bold", fontSize: "1.1rem" }}>−</span>
                    Documentation arrives after purchase
                  </li>
                  <li style={{ paddingLeft: "24px", position: "relative" }}>
                    <span style={{ position: "absolute", left: "0", color: "#666", fontWeight: "bold", fontSize: "1.1rem" }}>−</span>
                    Unpredictable delivery timelines
                  </li>
                </ul>
              </div>
            </div>

            {/* After Card */}
            <div style={{ 
              position: "relative",
              padding: "40px 32px", 
              borderRadius: 8, 
              background: "#FAFAFA", 
              border: "2px solid #000",
              boxShadow: "0 4px 16px rgba(0, 0, 0, 0.12)"
            }}>
              <div style={{
                position: "absolute",
                top: "-10px",
                left: "24px",
                background: "#fff",
                color: "#000",
                padding: "6px 16px",
                borderRadius: "4px",
                fontSize: "0.75rem",
                fontWeight: 600,
                letterSpacing: "0.5px",
                textTransform: "uppercase",
                border: "1px solid #000"
              }}>
                With Us
              </div>
              <div style={{ marginTop: "16px" }}>
                <h3 style={{ fontSize: "1.25rem", marginBottom: 20, fontWeight: 600, color: "#000" }}>
                  The Sri Saradi difference
                </h3>
                <ul style={{ 
                  listStyle: "none", 
                  padding: 0, 
                  margin: 0,
                  fontSize: "0.95rem", 
                  color: "#333", 
                  lineHeight: 1.7
                }}>
                  <li style={{ marginBottom: "14px", paddingLeft: "24px", position: "relative" }}>
                    <span style={{ position: "absolute", left: "0", color: "#000", fontWeight: "bold", fontSize: "1.1rem" }}>+</span>
                    Transparent pricing on validated products
                  </li>
                  <li style={{ marginBottom: "14px", paddingLeft: "24px", position: "relative" }}>
                    <span style={{ position: "absolute", left: "0", color: "#000", fontWeight: "bold", fontSize: "1.1rem" }}>+</span>
                    Pharma QC expertise behind every recommendation
                  </li>
                  <li style={{ marginBottom: "14px", paddingLeft: "24px", position: "relative" }}>
                    <span style={{ position: "absolute", left: "0", color: "#000", fontWeight: "bold", fontSize: "1.1rem" }}>+</span>
                    COA, MSDS & validation data upfront
                  </li>
                  <li style={{ paddingLeft: "24px", position: "relative" }}>
                    <span style={{ position: "absolute", left: "0", color: "#000", fontWeight: "bold", fontSize: "1.1rem" }}>+</span>
                    Direct lines to manufacturer technical teams
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2 - Grey Background */}
      <section style={{ background: "#F8F9FA", padding: "60px 0" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 40px" }}>
          {/* What We Actually Do */}
          <div style={{ marginBottom: 56 }}>
          <div style={{ fontSize: "0.75rem", letterSpacing: 2.5, textTransform: "uppercase", color: "#0F7B6C", fontWeight: 600, marginBottom: 14 }}>
            What We Do
          </div>
          <h2 style={{ fontSize: "1.6rem", fontWeight: 400, marginBottom: 18, color: "#0B1D33" }}>
            Direct sourcing from global manufacturers
          </h2>
          <p style={{ color: "#4A5568", fontSize: "1.05rem", marginBottom: 16, lineHeight: 1.8 }}>
            Sri Saradi Scientific holds exclusive and co-exclusive distribution rights in India for a curated portfolio of international life sciences manufacturers. We source directly from these principals. No trading companies. No brokers layering their margins on top of yours.
          </p>
          <p style={{ color: "#4A5568", fontSize: "1.05rem", marginBottom: 16, lineHeight: 1.8 }}>
            Our product lines cover research reagents, ELISA kits, antibodies, biochemicals, molecular biology products, laboratory consumables, plastic labware, filtration systems, and microscopy instruments. We serve academic research institutions, pharmaceutical R&D labs, CSIR and government-funded facilities, and diagnostic laboratories across India.
          </p>
          <p style={{ color: "#4A5568", fontSize: "1.05rem", marginBottom: 16, lineHeight: 1.8 }}>
            Every product in our catalogue has been evaluated for analytical performance, lot-to-lot consistency, and documentation quality. We don't carry everything under the sun. We carry what we can stand behind.
          </p>
          </div>
        </div>
      </section>

      {/* Section 3 - White Background */}
      <section style={{ background: "#fff", padding: "60px 0" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 40px" }}>
          {/* Brands We Represent */}
          <div style={{ marginBottom: 56 }}>
          <div style={{ fontSize: "0.75rem", letterSpacing: 2.5, textTransform: "uppercase", color: "#0F7B6C", fontWeight: 600, marginBottom: 14 }}>
            Our Principals
          </div>
          <h2 style={{ fontSize: "1.6rem", fontWeight: 400, marginBottom: 18, color: "#0B1D33" }}>
            The brands behind our products
          </h2>
          <p style={{ color: "#4A5568", fontSize: "1.05rem", marginBottom: 16, lineHeight: 1.8 }}>
            The companies we represent are established international manufacturers serving global markets, with ISO-certified facilities and product lines validated by research institutions worldwide. We've visited their factories, reviewed their quality systems, and signed formal distribution agreements in person. These aren't catalogue-only relationships. We know the people behind the products.
          </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20, margin: "32px 0 48px" }}>
          <div style={{ padding: "24px 20px", border: "1px solid #E2E0DB", borderRadius: 8, background: "#fff", transition: "border-color 0.3s ease" }}>
            <div style={{ 
              width: "100%", 
              height: "80px", 
              backgroundColor: "#F8F9FA", 
              borderRadius: "6px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "0.75rem",
              color: "#6B7280",
              textAlign: "center",
              border: "1px dashed #D1D5DB",
              marginBottom: "16px"
            }}>
              Solarbio Logo
              <br />
              Placeholder
            </div>
            <h4 style={{ fontSize: "1rem", fontWeight: 400, color: "#0B1D33", marginBottom: 6 }}>Solarbio Life Sciences</h4>
            <p style={{ fontSize: "0.85rem", color: "#4A5568", lineHeight: 1.6 }}>
              Reagents, ELISA kits, antibodies, biochemicals, cell culture media, and molecular biology products.
            </p>
          </div>
          <div style={{ padding: "24px 20px", border: "1px solid #E2E0DB", borderRadius: 8, background: "#fff", transition: "border-color 0.3s ease" }}>
            <div style={{ 
              width: "100%", 
              height: "80px", 
              backgroundColor: "#F8F9FA", 
              borderRadius: "6px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "0.75rem",
              color: "#6B7280",
              textAlign: "center",
              border: "1px dashed #D1D5DB",
              marginBottom: "16px"
            }}>
              GenFollower Logo
              <br />
              Placeholder
            </div>
            <h4 style={{ fontSize: "1rem", fontWeight: 400, color: "#0B1D33", marginBottom: 6 }}>GenFollower</h4>
            <p style={{ fontSize: "0.85rem", color: "#4A5568", lineHeight: 1.6 }}>
              Laboratory consumables for molecular biology, cell culture, and general research applications.
            </p>
          </div>
          <div style={{ padding: "24px 20px", border: "1px solid #E2E0DB", borderRadius: 8, background: "#fff", transition: "border-color 0.3s ease" }}>
            <div style={{ 
              width: "100%", 
              height: "80px", 
              backgroundColor: "#F8F9FA", 
              borderRadius: "6px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "0.75rem",
              color: "#6B7280",
              textAlign: "center",
              border: "1px dashed #D1D5DB",
              marginBottom: "16px"
            }}>
              Orientfiltr Logo
              <br />
              Placeholder
            </div>
            <h4 style={{ fontSize: "1rem", fontWeight: 400, color: "#0B1D33", marginBottom: 6 }}>Orientfiltr</h4>
            <p style={{ fontSize: "0.85rem", color: "#4A5568", lineHeight: 1.6 }}>
              Filtration products including syringe filters, membrane filters, and vacuum filtration units.
            </p>
          </div>
          <div style={{ padding: "24px 20px", border: "1px solid #E2E0DB", borderRadius: 8, background: "#fff", transition: "border-color 0.3s ease" }}>
            <div style={{ 
              width: "100%", 
              height: "80px", 
              backgroundColor: "#F8F9FA", 
              borderRadius: "6px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "0.75rem",
              color: "#6B7280",
              textAlign: "center",
              border: "1px dashed #D1D5DB",
              marginBottom: "16px"
            }}>
              SS Instruments Logo
              <br />
              Placeholder
            </div>
            <h4 style={{ fontSize: "1rem", fontWeight: 400, color: "#0B1D33", marginBottom: 6 }}>SS Instruments</h4>
            <p style={{ fontSize: "0.85rem", color: "#4A5568", lineHeight: 1.6 }}>
              Microscopy instruments for educational, clinical, and research applications.
            </p>
          </div>
          </div>
        </div>
      </section>

      {/* Section 4 - Grey Background */}
      <section style={{ background: "#F8F9FA", padding: "60px 0" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 40px" }}>
          {/* Values */}
          <div style={{ marginBottom: 56 }}>
          <div style={{ fontSize: "0.75rem", letterSpacing: 2.5, textTransform: "uppercase", color: "#0F7B6C", fontWeight: 600, marginBottom: 14 }}>
            How We Work
          </div>
          <h2 style={{ fontSize: "1.6rem", fontWeight: 400, marginBottom: 18, color: "#0B1D33" }}>
            Three things we won't compromise on
          </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24, margin: "48px 0" }}>
          <div style={{ textAlign: "center", padding: "32px 20px", border: "1px solid #E2E0DB", borderRadius: 8, transition: "border-color 0.3s ease" }}>
            <div style={{ width: 44, height: 44, margin: "0 auto 16px", background: "#E8F5F2", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem" }}>🔬</div>
            <h4 style={{ fontSize: "1.05rem", fontWeight: 400, marginBottom: 8, color: "#0B1D33" }}>Technical honesty</h4>
            <p style={{ fontSize: "0.88rem", color: "#4A5568", lineHeight: 1.65 }}>
              If a product fits your application, we'll say so. If it doesn't, we'll say that too. We'd rather lose a sale than have you lose a month of work on the wrong reagent.
            </p>
          </div>
          <div style={{ textAlign: "center", padding: "32px 20px", border: "1px solid #E2E0DB", borderRadius: 8, transition: "border-color 0.3s ease" }}>
            <div style={{ width: 44, height: 44, margin: "0 auto 16px", background: "#E8F5F2", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem" }}>📋</div>
            <h4 style={{ fontSize: "1.05rem", fontWeight: 400, marginBottom: 8, color: "#0B1D33" }}>Full documentation</h4>
            <p style={{ fontSize: "0.88rem", color: "#4A5568", lineHeight: 1.65 }}>
              Published pricing. COAs and MSDS with every order. No hidden fees, no surprise markups. You know exactly what you're buying and what it costs before you commit.
            </p>
          </div>
          <div style={{ textAlign: "center", padding: "32px 20px", border: "1px solid #E2E0DB", borderRadius: 8, transition: "border-color 0.3s ease" }}>
            <div style={{ width: 44, height: 44, margin: "0 auto 16px", background: "#E8F5F2", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem" }}>🤝</div>
            <h4 style={{ fontSize: "1.05rem", fontWeight: 400, marginBottom: 8, color: "#0B1D33" }}>Pharmaceutical rigour</h4>
            <p style={{ fontSize: "0.88rem", color: "#4A5568", lineHeight: 1.65 }}>
              Our founder comes from GMP analytical R&D. That background shapes how we evaluate suppliers, how we handle documentation, and how we think about product quality. It's not just a sales pitch.
            </p>
          </div>
          </div>
        </div>
      </section>

      {/* Section 5 - Dark Background (Founder) */}
      <section style={{ background: "#0B1D33", padding: "60px 0" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 40px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "300px 1fr", gap: 60, alignItems: "start", color: "#fff" }}>
            {/* Founder Image Placeholder */}
            <div style={{ position: "relative" }}>
              <div style={{ 
                width: "100%", 
                height: "360px", 
                backgroundColor: "rgba(255,255,255,0.1)", 
                borderRadius: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "0.9rem",
                color: "rgba(255,255,255,0.6)",
                textAlign: "center",
                border: "2px dashed rgba(255,255,255,0.2)"
              }}>
                Founder Photo
                <br />
                Placeholder
              </div>
            </div>
            
            {/* Founder Content */}
            <div>
              <div style={{ fontSize: "0.75rem", letterSpacing: 2.5, textTransform: "uppercase", color: "#C4983A", fontWeight: 600, marginBottom: 14 }}>
                Founded By
              </div>
              <h3 style={{ fontSize: "1.4rem", fontWeight: 400, marginBottom: 6 }}>
                Praveen Gadde
              </h3>
              <div style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.5)", marginBottom: 18 }}>
                B.Pharm & M.Pharm, Manipal University · MBA, Lund University, Sweden · Former Analytical R&D, Novartis
              </div>
              <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "1rem", lineHeight: 1.8, marginBottom: 14 }}>
                I spent close to four years in analytical R&D at Novartis, running HPLC methods, stability studies, and dissolution testing inside a GMP environment. That work taught me what proper quality documentation looks like when it actually matters, not as a formality but as the backbone of reliable results.
              </p>
              <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "1rem", lineHeight: 1.8, marginBottom: 14 }}>
                When I looked at the lab supply market in India, what I kept seeing was this: most distributors are logistics operations. They move products from point A to point B. They don't evaluate what they're selling, they don't read the COAs they forward, and they can't help you troubleshoot when something doesn't work as expected.
              </p>
              <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "1rem", lineHeight: 1.8, marginBottom: 14 }}>
                I started Sri Saradi Scientific to do things differently. I go to the manufacturers myself. I review their quality systems. I understand the documentation before I put a product in front of you. And when you need technical support that goes beyond what I can personally answer, I connect you directly with our manufacturers' science teams, not a generic helpdesk.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 6 - White Background */}
      <section style={{ background: "#fff", padding: "60px 0" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 40px" }}>
          {/* Partnership Section */}
          <div style={{ marginBottom: 56 }}>
          <div style={{ fontSize: "0.75rem", letterSpacing: 2.5, textTransform: "uppercase", color: "#0F7B6C", fontWeight: 600, marginBottom: 14 }}>
            Our Partnerships
          </div>
          <h2 style={{ fontSize: "1.6rem", fontWeight: 400, marginBottom: 18, color: "#0B1D33" }}>
            We visit our manufacturers. In person.
          </h2>
          <p style={{ color: "#4A5568", fontSize: "1.05rem", marginBottom: 16, lineHeight: 1.8 }}>
            There's a reason we fly to our manufacturers and walk their factory floors instead of just signing contracts over email. We want to see the production lines, meet the quality teams, and understand how our principals actually make the products you'll use in your lab. That's how we know what we're recommending, and it's how we earn the right to put our name behind it.
          </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, margin: "32px 0 48px" }}>
          <div style={{ borderRadius: 8, overflow: "hidden", border: "1px solid #E2E0DB", background: "#fff" }}>
            <img src="solarbio-signing.jpg" alt="Praveen Gadde signing the authorized distribution agreement at Solarbio headquarters" style={{ width: "100%", height: 280, objectFit: "cover", display: "block" }} />
            <div style={{ padding: "16px 20px", display: "flex", flexDirection: "column", gap: 4 }}>
              <strong style={{ fontSize: "0.92rem", color: "#0B1D33", fontWeight: 600 }}>Signing our exclusive distribution agreement</strong>
              <span style={{ fontSize: "0.82rem", color: "#4A5568" }}>Solarbio Life Sciences headquarters</span>
            </div>
          </div>
          <div style={{ borderRadius: 8, overflow: "hidden", border: "1px solid #E2E0DB", background: "#fff" }}>
            <img src="solarbio-team.jpg" alt="Praveen Gadde with the Solarbio team at their office" style={{ width: "100%", height: 280, objectFit: "cover", display: "block" }} />
            <div style={{ padding: "16px 20px", display: "flex", flexDirection: "column", gap: 4 }}>
              <strong style={{ fontSize: "0.92rem", color: "#0B1D33", fontWeight: 600 }}>With the Solarbio team</strong>
              <span style={{ fontSize: "0.82rem", color: "#4A5568" }}>Building a partnership, not just a supply chain</span>
            </div>
          </div>
          </div>

          {/* CTA */}
          <div style={{ textAlign: "center", padding: "48px 24px", borderTop: "1px solid #E2E0DB" }}>
          <h2 style={{ fontSize: "1.5rem", fontWeight: 400, color: "#0B1D33", marginBottom: 12 }}>
            Let's talk about what your lab needs
          </h2>
          <p style={{ color: "#4A5568", marginBottom: 24, fontSize: "1rem" }}>
            Whether you're setting up a new assay, switching suppliers, or looking for quality products without the brand tax, we're here to help.
          </p>
          <a href="mailto:info@srisaradiscientific.com" style={{ display: "inline-block", background: "#0F7B6C", color: "#fff", padding: "14px 36px", borderRadius: 6, textDecoration: "none", fontWeight: 600, fontSize: "0.95rem", letterSpacing: 0.5, transition: "background 0.3s ease" }}>
            Get in Touch
          </a>
          </div>
        </div>
      </section>
    </div>
  );
}
