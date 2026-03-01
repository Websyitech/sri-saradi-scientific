"use client";

export default function PrivacyPolicyPage() {
  const sections = [
    {
      title: "1. Information We Collect",
      content: `We collect the following types of information when you use our website and services:

• Personal Information: Name, email address, phone number, shipping address, and billing information provided during registration, ordering, or contacting us.
• Business Information: Company name, GST number, institutional affiliation, and purchase order details for B2B transactions.
• Usage Data: Browser type, IP address, pages visited, time spent on pages, and referring website URLs collected automatically through cookies and analytics tools.
• Communication Data: Records of your correspondence with us, including emails, phone calls, and chat interactions for support purposes.`,
    },
    {
      title: "2. How We Use Your Information",
      content: `We use your information for the following purposes:

• To process and fulfill your orders and quotation requests
• To communicate with you about orders, products, and promotions
• To provide customer support and technical assistance
• To improve our website, products, and services
• To send marketing communications (with your consent)
• To comply with legal obligations and enforce our terms
• To analyze website usage and optimize user experience
• To detect and prevent fraudulent activities`,
    },
    {
      title: "3. Information Sharing",
      content: `Sri Saradi Scientific does not sell, trade, or rent your personal information to third parties. We may share your information with:

• Logistics Partners: To facilitate product delivery and shipment tracking
• Payment Processors: To process secure transactions
• Manufacturer Partners: When required for warranty claims or technical support
• Legal Authorities: When required by law, regulation, or legal proceedings
• Service Providers: Third-party services that assist in website hosting, analytics, and email communications, bound by confidentiality agreements`,
    },
    {
      title: "4. Data Security",
      content: `We implement industry-standard security measures to protect your personal information, including:

• SSL/TLS encryption for all data transmission
• Secure storage of sensitive data with access controls
• Regular security audits and vulnerability assessments
• Employee training on data protection best practices
• Firewall protection and intrusion detection systems

While we strive to protect your information, no method of electronic transmission or storage is 100% secure. We cannot guarantee absolute security of your data.`,
    },
    {
      title: "5. Cookies & Tracking",
      content: `Our website uses cookies and similar tracking technologies to enhance your browsing experience. Types of cookies we use:

• Essential Cookies: Required for website functionality (login, shopping cart, etc.)
• Analytics Cookies: Help us understand how visitors use our website (Google Analytics)
• Preference Cookies: Remember your settings and preferences
• Marketing Cookies: Used to deliver relevant advertisements

You can manage cookie preferences through your browser settings. Disabling certain cookies may affect website functionality. Please see our Cookie Policy for more details.`,
    },
    {
      title: "6. Your Rights",
      content: `Under applicable data protection laws, you have the following rights:

• Right to Access: Request a copy of your personal data held by us
• Right to Correction: Request correction of inaccurate or incomplete data
• Right to Deletion: Request deletion of your personal data (subject to legal obligations)
• Right to Object: Object to processing of your data for marketing purposes
• Right to Data Portability: Request your data in a structured, machine-readable format
• Right to Withdraw Consent: Withdraw consent for data processing at any time

To exercise any of these rights, please contact us at info@srisaradiscientific.com.`,
    },
    {
      title: "7. Data Retention",
      content: `We retain your personal information for as long as necessary to fulfill the purposes outlined in this policy, including:

• Transaction records: 8 years (as required by Indian tax laws)
• Customer account data: Until account deletion is requested
• Marketing preferences: Until consent is withdrawn
• Website analytics data: 26 months
• Support correspondence: 3 years after resolution

After the retention period, data is securely deleted or anonymized.`,
    },
    {
      title: "8. Third-Party Links",
      content: `Our website may contain links to third-party websites, including manufacturer websites, partner portals, and social media platforms. We are not responsible for the privacy practices or content of these external sites. We encourage you to review the privacy policies of any third-party websites you visit.`,
    },
    {
      title: "9. Children's Privacy",
      content: `Our website and services are not intended for individuals under the age of 18. We do not knowingly collect personal information from children. If you believe we have inadvertently collected data from a minor, please contact us immediately, and we will take steps to delete such information.`,
    },
    {
      title: "10. Changes to This Policy",
      content: `Sri Saradi Scientific reserves the right to update this Privacy Policy at any time. Changes will be posted on this page with an updated "Last Modified" date. We encourage you to review this policy periodically. Continued use of our website after changes constitutes acceptance of the updated policy.`,
    },
    {
      title: "11. Contact Us",
      content: `For any questions, concerns, or requests regarding this Privacy Policy or your personal data, please contact us:

Sri Saradi Scientific
Email: info@srisaradiscientific.com
Phone: +91 97424 43809
Address: Hyderabad, Telangana, India

For data protection related inquiries, please include "Privacy" in the subject line of your email.`,
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
          <span style={{ color: "#444" }}>Privacy Policy</span>
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
          Privacy Policy
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
          At Sri Saradi Scientific, we are committed to protecting your privacy and ensuring the
          security of your personal information. This Privacy Policy explains how we collect, use,
          store, and protect your data when you visit our website or use our services.
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
