import React from "react";

export default function AboutPage() {
  return (
    <div style={{ background: "#FAFAF7", color: "#1A1A1A" }}>
      {/* Hero Section */}
      <section style={{ background: "#0B1D33", color: "#fff", padding: "80px 24px 70px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "-40%", right: "-10%", width: 500, height: 500, background: "radial-gradient(circle, rgba(15,123,108,0.15) 0%, transparent 70%)", borderRadius: "50%" }} />
        <div style={{ maxWidth: 800, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div style={{ fontSize: "0.8rem", letterSpacing: 3, textTransform: "uppercase", color: "#0F7B6C", marginBottom: 20, fontWeight: 600 }}>
            About Sri Saradi Scientific
          </div>
          <h1 style={{ fontSize: "clamp(2rem, 5vw, 3rem)", lineHeight: 1.25, fontWeight: 400, marginBottom: 24, color: "#fff" }}>
            Your lab deserves a supplier who <em style={{ color: "#C4983A", fontStyle: "normal" }}>understands your science</em>
          </h1>
          <p style={{ fontSize: "1.15rem", color: "rgba(255,255,255,0.7)", maxWidth: 620, lineHeight: 1.8, fontWeight: 300 }}>
            We're a life sciences distribution company built on pharmaceutical quality standards. We bring globally validated products to Indian labs — at prices that make sense, with documentation and support you can rely on.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div style={{ maxWidth: 780, margin: "0 auto", padding: "60px 24px 80px" }}>
        {/* The Problem We Saw */}
        <section style={{ marginBottom: 56 }}>
          <div style={{ fontSize: "0.75rem", letterSpacing: 2.5, textTransform: "uppercase", color: "#0F7B6C", fontWeight: 600, marginBottom: 14 }}>
            What We Noticed
          </div>
          <h2 style={{ fontSize: "1.6rem", fontWeight: 400, marginBottom: 18, color: "#0B1D33" }}>
            Indian labs are stuck between two bad options
          </h2>
          <p style={{ color: "#4A5568", fontSize: "1.05rem", marginBottom: 16, lineHeight: 1.8 }}>
            If you run a research lab or a pharma R&D facility in India today, procuring reagents, kits, and consumables usually means choosing between overpriced international brands that strain your budget, or unverified alternatives where you gamble with your data.
          </p>
          <p style={{ color: "#4A5568", fontSize: "1.05rem", marginBottom: 16, lineHeight: 1.8 }}>
            The person delivering your ELISA kit probably can't tell you what's in the certificate of analysis — or whether one even exists. Your procurement team processes dozens of vendors with no way to verify product quality upfront. And when something goes wrong, there's no one between you and an unresponsive overseas manufacturer.
          </p>
        </section>

        {/* Problem / Solution Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32, margin: "48px 0" }}>
          <div style={{ padding: 32, borderRadius: 8, background: "#FDF6F0", borderLeft: "3px solid #D4845A" }}>
            <h3 style={{ fontSize: "1.15rem", marginBottom: 12, fontWeight: 400, color: "#9C5A33" }}>The old way</h3>
            <p style={{ fontSize: "0.95rem", color: "#4A5568", lineHeight: 1.75, margin: 0 }}>
              Opaque pricing. Generic sales reps who can't discuss your application. No clarity on product quality until you've spent your grant money. Long lead times with no visibility.
            </p>
          </div>
          <div style={{ padding: 32, borderRadius: 8, background: "#E8F5F2", borderLeft: "3px solid #0F7B6C" }}>
            <h3 style={{ fontSize: "1.15rem", marginBottom: 12, fontWeight: 400, color: "#0F7B6C" }}>Our approach</h3>
            <p style={{ fontSize: "0.95rem", color: "#4A5568", lineHeight: 1.75, margin: 0 }}>
              Transparent pricing on validated products. A supplier with pharmaceutical QC experience who understands documentation standards. Complete COA, MSDS, and validation data with every order. Direct access to manufacturer technical teams for application questions.
            </p>
          </div>
        </div>

        <div style={{ width: 48, height: 2, background: "#0F7B6C", margin: "48px 0", opacity: 0.4 }} />

        {/* What We Actually Do */}
        <section style={{ marginBottom: 56 }}>
          <div style={{ fontSize: "0.75rem", letterSpacing: 2.5, textTransform: "uppercase", color: "#0F7B6C", fontWeight: 600, marginBottom: 14 }}>
            What We Do
          </div>
          <h2 style={{ fontSize: "1.6rem", fontWeight: 400, marginBottom: 18, color: "#0B1D33" }}>
            Globally validated products, locally accessible
          </h2>
          <p style={{ color: "#4A5568", fontSize: "1.05rem", marginBottom: 16, lineHeight: 1.8 }}>
            Sri Saradi Scientific is the exclusive Indian distributor for select international manufacturers of research reagents, ELISA kits, laboratory instruments, consumables, and filtration products. We source directly from our principals — no middlemen, no unnecessary markups.
          </p>
          <p style={{ color: "#4A5568", fontSize: "1.05rem", marginBottom: 16, lineHeight: 1.8 }}>
            Our product lines serve academic research institutions, pharmaceutical R&D labs, and diagnostic facilities across India. Every product we carry has been evaluated not just for price, but for analytical performance, lot-to-lot consistency, and documentation quality.
          </p>
        </section>

        <div style={{ width: 48, height: 2, background: "#0F7B6C", margin: "48px 0", opacity: 0.4 }} />

        {/* Values */}
        <section style={{ marginBottom: 56 }}>
          <div style={{ fontSize: "0.75rem", letterSpacing: 2.5, textTransform: "uppercase", color: "#0F7B6C", fontWeight: 600, marginBottom: 14 }}>
            How We Work
          </div>
          <h2 style={{ fontSize: "1.6rem", fontWeight: 400, marginBottom: 18, color: "#0B1D33" }}>
            Built on three commitments
          </h2>
        </section>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24, margin: "48px 0" }}>
          <div style={{ textAlign: "center", padding: "32px 20px", border: "1px solid #E2E0DB", borderRadius: 8, transition: "border-color 0.3s ease" }}>
            <div style={{ width: 44, height: 44, margin: "0 auto 16px", background: "#E8F5F2", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem" }}>🔬</div>
            <h4 style={{ fontSize: "1.05rem", fontWeight: 400, marginBottom: 8, color: "#0B1D33" }}>Technical honesty</h4>
            <p style={{ fontSize: "0.88rem", color: "#4A5568", lineHeight: 1.65 }}>
              We'll tell you if a product fits your application — and we'll tell you if it doesn't. Your results matter more than our invoice.
            </p>
          </div>
          <div style={{ textAlign: "center", padding: "32px 20px", border: "1px solid #E2E0DB", borderRadius: 8, transition: "border-color 0.3s ease" }}>
            <div style={{ width: 44, height: 44, margin: "0 auto 16px", background: "#E8F5F2", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem" }}>📋</div>
            <h4 style={{ fontSize: "1.05rem", fontWeight: 400, marginBottom: 8, color: "#0B1D33" }}>Full transparency</h4>
            <p style={{ fontSize: "0.88rem", color: "#4A5568", lineHeight: 1.65 }}>
              Published pricing. Complete documentation. No hidden costs. You see exactly what you're getting and what you're paying.
            </p>
          </div>
          <div style={{ textAlign: "center", padding: "32px 20px", border: "1px solid #E2E0DB", borderRadius: 8, transition: "border-color 0.3s ease" }}>
            <div style={{ width: 44, height: 44, margin: "0 auto 16px", background: "#E8F5F2", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem" }}>🤝</div>
            <h4 style={{ fontSize: "1.05rem", fontWeight: 400, marginBottom: 8, color: "#0B1D33" }}>Quality-first mindset</h4>
            <p style={{ fontSize: "0.88rem", color: "#4A5568", lineHeight: 1.65 }}>
              We come from a pharmaceutical background and understand what proper documentation and quality systems look like. We apply that same scrutiny when selecting and evaluating our suppliers.
            </p>
          </div>
        </div>

        <div style={{ width: 48, height: 2, background: "#0F7B6C", margin: "48px 0", opacity: 0.4 }} />

        {/* Founder */}
        <div style={{ background: "#0B1D33", borderRadius: 10, padding: "44px 40px", color: "#fff", margin: "48px 0" }}>
          <div style={{ fontSize: "0.75rem", letterSpacing: 2.5, textTransform: "uppercase", color: "#C4983A", fontWeight: 600, marginBottom: 14 }}>
            Founded By
          </div>
          <h3 style={{ fontSize: "1.4rem", fontWeight: 400, marginBottom: 6 }}>
            Praveen Gadde
          </h3>
          <div style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.5)", marginBottom: 18 }}>
            B.Pharm & M.Pharm, Manipal University · MBA, Lund University · Former Analytical R&D, Novartis
          </div>
          <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "1rem", lineHeight: 1.8, marginBottom: 14 }}>
            Before starting Sri Saradi Scientific, I worked in analytical R&D at Novartis — running HPLC methods, stability studies, and dissolution testing in a GMP environment. I've worked with analytical documentation first-hand and I understand what rigorous quality systems look like from the inside.
          </p>
          <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "1rem", lineHeight: 1.8, marginBottom: 14 }}>
            I'm not a life sciences researcher — and I won't pretend to be one. But I've spent enough time in regulated labs to know the difference between proper documentation and a rubber stamp. That perspective shapes how I evaluate the products and suppliers we work with.
          </p>
          <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "1rem", lineHeight: 1.8, marginBottom: 14 }}>
            I started this company because most lab suppliers in India are sales operations — they move boxes. I wanted to build something different: a supplier that cares about what's inside the box and whether the paperwork behind it is solid. When you need application-specific technical support, I connect you directly with our manufacturers' science teams — not a call centre.
          </p>
        </div>

        <div style={{ width: 48, height: 2, background: "#0F7B6C", margin: "48px 0", opacity: 0.4 }} />

        {/* Partnership Section */}
        <section style={{ marginBottom: 56 }}>
          <div style={{ fontSize: "0.75rem", letterSpacing: 2.5, textTransform: "uppercase", color: "#0F7B6C", fontWeight: 600, marginBottom: 14 }}>
            Our Partnerships
          </div>
          <h2 style={{ fontSize: "1.6rem", fontWeight: 400, marginBottom: 18, color: "#0B1D33" }}>
            Direct relationships, not middlemen
          </h2>
          <p style={{ color: "#4A5568", fontSize: "1.05rem", marginBottom: 16, lineHeight: 1.8 }}>
            We don't resell through trading companies or brokers. We work directly with our manufacturers — visiting their facilities, understanding their quality processes, and signing formal distribution agreements in person. When we say "authorized distributor," we can show you exactly what that means.
          </p>
        </section>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, margin: "32px 0 48px" }}>
          <div style={{ borderRadius: 8, overflow: "hidden", border: "1px solid #E2E0DB", background: "#fff" }}>
            <img src="/solarbio-signing.jpg" alt="Praveen Gadde signing the authorized distribution agreement at Solarbio headquarters in Beijing" style={{ width: "100%", height: 280, objectFit: "cover", display: "block" }} />
            <div style={{ padding: "16px 20px", display: "flex", flexDirection: "column", gap: 4 }}>
              <strong style={{ fontSize: "0.92rem", color: "#0B1D33", fontWeight: 600 }}>Signing our exclusive distribution agreement</strong>
              <span style={{ fontSize: "0.82rem", color: "#4A5568" }}>Solarbio Life Sciences headquarters, Beijing</span>
            </div>
          </div>
          <div style={{ borderRadius: 8, overflow: "hidden", border: "1px solid #E2E0DB", background: "#fff" }}>
            <img src="/solarbio-team.jpg" alt="Praveen Gadde with the Solarbio team at their Beijing office" style={{ width: "100%", height: 280, objectFit: "cover", display: "block" }} />
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
            Whether you're setting up a new assay or looking for a reliable long-term supplier — we're here to help.
          </p>
          <a href="/contact" style={{ display: "inline-block", background: "#0F7B6C", color: "#fff", padding: "14px 36px", borderRadius: 6, textDecoration: "none", fontWeight: 600, fontSize: "0.95rem", letterSpacing: 0.5, transition: "background 0.3s ease" }}>
            Get in Touch
          </a>
        </div>
      </div>
    </div>
  );
}
