"use client";

export default function TermsOfServicePage() {
  const sections = [
    {
      title: "1. Acceptance of Terms",
      content: `By accessing and using the Sri Saradi Scientific website (www.srisaradiscientific.com), you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our website or services. These terms apply to all visitors, users, and customers of Sri Saradi Scientific.`,
    },
    {
      title: "2. Products & Services",
      content: `Sri Saradi Scientific supplies laboratory equipment, scientific instruments, chemicals, reagents, and related consumables. All products listed on our website are subject to availability. We reserve the right to modify, discontinue, or update our product listings without prior notice. Product specifications, images, and descriptions are provided for informational purposes and may vary slightly from actual products.`,
    },
    {
      title: "3. Quotation & Pricing",
      content: `All prices displayed on our website are indicative and subject to change without notice. To receive a formal quotation, customers must submit a "Get the Quote" request. Quotations are valid for 15 business days unless otherwise stated. Prices are exclusive of applicable taxes (GST) unless explicitly mentioned. We reserve the right to correct any pricing errors that may occur on the website.`,
    },
    {
      title: "4. Orders & Payment",
      content: `Orders are confirmed only upon receipt of a valid purchase order and agreed payment terms. Payment terms vary based on customer type and will be communicated in the quotation. Sri Saradi Scientific accepts payments via bank transfer (NEFT/RTGS), demand drafts, and other approved methods. For institutional buyers, credit terms may be extended upon approval. All payments must be made in Indian Rupees (INR).`,
    },
    {
      title: "5. Shipping & Delivery",
      content: `We ship products across India using reputable courier and logistics partners. Estimated delivery times are provided at the time of order confirmation and may vary based on location and product availability. Shipping charges, if applicable, will be communicated in the quotation. Risk of loss and title for products pass to the buyer upon delivery to the carrier. For hazardous materials, special shipping regulations and surcharges may apply.`,
    },
    {
      title: "6. Returns & Warranty",
      content: `Products may be returned within 7 days of delivery if they are defective, damaged during transit, or do not match the ordered specifications. Returns must be pre-approved by our customer service team. Products must be returned in their original packaging and unused condition. Warranty terms vary by product and manufacturer; specific warranty information will be provided with each product. Custom-ordered or special items are non-returnable unless defective.`,
    },
    {
      title: "7. Intellectual Property",
      content: `All content on the Sri Saradi Scientific website, including text, graphics, logos, images, product descriptions, and software, is the property of Sri Saradi Scientific or its content suppliers and is protected by Indian and international copyright laws. You may not reproduce, distribute, modify, or create derivative works from any content on this website without express written consent.`,
    },
    {
      title: "8. Limitation of Liability",
      content: `Sri Saradi Scientific shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from the use of our website or products. Our total liability for any claim shall not exceed the amount paid by the customer for the specific product or service giving rise to the claim. We are not responsible for delays caused by circumstances beyond our control, including but not limited to natural disasters, government actions, or supply chain disruptions.`,
    },
    {
      title: "9. User Account",
      content: `When creating an account on our website, you are responsible for maintaining the confidentiality of your login credentials. You agree to provide accurate and complete information during registration. You are responsible for all activities that occur under your account. Sri Saradi Scientific reserves the right to suspend or terminate accounts that violate these terms or engage in fraudulent activity.`,
    },
    {
      title: "10. Governing Law",
      content: `These Terms of Service are governed by and construed in accordance with the laws of India. Any disputes arising from these terms or your use of the website shall be subject to the exclusive jurisdiction of the courts in Hyderabad, Telangana, India.`,
    },
    {
      title: "11. Changes to Terms",
      content: `Sri Saradi Scientific reserves the right to update or modify these Terms of Service at any time without prior notice. Changes will be effective immediately upon posting on the website. Your continued use of the website after any changes constitutes acceptance of the modified terms. We encourage you to review these terms periodically.`,
    },
    {
      title: "12. Contact Information",
      content: `If you have any questions about these Terms of Service, please contact us:\n\nSri Saradi Scientific\nEmail: info@srisaradiscientific.com\nPhone: +91 97424 43809\nAddress: Hyderabad, Telangana, India`,
    },
  ];

  return (
    <div style={{ background: "#fff" }}>
      {/* Breadcrumb */}
      <div
        style={{
          background: "#fff",
          borderBottom: "1px solid #e8e8e8",
          padding: "14px 0",
        }}
      >
        <div
          style={{
            maxWidth: "1400px",
            margin: "0 auto",
            padding: "0 40px",
            fontSize: "13px",
            color: "#888",
          }}
        >
          <a href="/" style={{ color: "#2D2B7F", textDecoration: "none" }}>
            Home
          </a>
          <span style={{ margin: "0 8px" }}>/</span>
          <span style={{ color: "#444" }}>Terms of Service</span>
        </div>
      </div>

      {/* Header */}
      <div
        style={{
          background: "linear-gradient(135deg, #2D2B7F 0%, #1a1a2e 100%)",
          padding: "50px 0",
          textAlign: "center",
        }}
      >
        <h1
          style={{
            fontSize: "32px",
            fontWeight: 800,
            color: "#fff",
            margin: "0 0 8px 0",
          }}
        >
          Terms &amp; Conditions
        </h1>
        <p
          style={{
            fontSize: "14px",
            color: "rgba(255,255,255,0.6)",
            margin: 0,
          }}
        >
          Last updated: January 1, 2025
        </p>
      </div>

      {/* Content */}
      <div
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          padding: "50px 40px 80px",
        }}
      >
        <p
          style={{
            fontSize: "15px",
            lineHeight: 1.8,
            color: "#666",
            marginBottom: "40px",
            paddingBottom: "24px",
            borderBottom: "1px solid #f0f0f0",
          }}
        >
          Please read these Terms and Conditions carefully before using the Sri Saradi Scientific
          website and services. These terms govern your relationship with Sri Saradi Scientific and
          outline the rules and regulations for the use of our website.
        </p>

        {sections.map((section, idx) => (
          <div key={idx} style={{ marginBottom: "32px" }}>
            <h2
              style={{
                fontSize: "18px",
                fontWeight: 700,
                color: "#1a1a2e",
                margin: "0 0 12px 0",
              }}
            >
              {section.title}
            </h2>
            <p
              style={{
                fontSize: "14px",
                lineHeight: 1.8,
                color: "#666",
                margin: 0,
                whiteSpace: "pre-line",
              }}
            >
              {section.content}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
