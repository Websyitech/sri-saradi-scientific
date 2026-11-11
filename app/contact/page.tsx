"use client";

import { useState, useEffect } from "react";

interface ContactPageData {
  title: string;
  subtitle: string;
  description: string;
  email: string;
  phone: string;
  offices: { name: string; address: string; mapEmbedUrl: string }[];
  businessHours: string;
  isActive: boolean;
}

export default function ContactPage() {
  const [contactData, setContactData] = useState<ContactPageData>({
    title: "Contact Us",
    subtitle: "Get in touch with us",
    description: "",
    email: "",
    phone: "",
    offices: [],
    businessHours: "",
    isActive: true,
  });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetchContactData();
  }, []);

  const fetchContactData = async () => {
    try {
      const response = await fetch("/api/contact-page");
      const data = await response.json();
      setContactData(data);
    } catch (err) {
      console.error("Error fetching contact data:", err);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch("/api/contact-messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to send message");
      }

      setSuccess("Message sent successfully! We'll get back to you soon.");
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
      setTimeout(() => setSuccess(""), 5000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error sending message");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{ minHeight: "100vh", background: "#fff" }}>
      {/* Hero Section */}
      <section
        style={{
          background: "linear-gradient(135deg, #2D2B7F 0%, #1a1a2e 100%)",
          color: "#fff",
          padding: "60px 40px",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <h1 style={{ fontSize: "48px", fontWeight: 800, margin: "0 0 16px 0" }}>
            {contactData.title}
          </h1>
          <p style={{ fontSize: "18px", margin: "0", opacity: 0.9 }}>
            {contactData.subtitle}
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section style={{ padding: "60px 40px" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          {contactData.description && (
            <p
              style={{
                fontSize: "16px",
                lineHeight: 1.6,
                color: "#555",
                marginBottom: "60px",
                textAlign: "center",
                maxWidth: "800px",
                margin: "0 auto 60px",
              }}
            >
              {contactData.description}
            </p>
          )}

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 420px), 1fr))",
              gap: "60px",
              marginBottom: "60px",
            }}
          >
            {/* Left - Contact Information */}
            <div>
              <h2
                style={{
                  fontSize: "28px",
                  fontWeight: 700,
                  color: "#1a1a2e",
                  marginBottom: "30px",
                }}
              >
                Get In Touch
              </h2>

              {/* Contact Info Cards */}
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                {contactData.email && (
                  <div className="contact-info-card">
                    <h3
                      style={{
                        fontSize: "16px",
                        fontWeight: 700,
                        color: "#1a1a2e",
                        margin: "0 0 8px 0",
                      }}
                    >
                      Email
                    </h3>
                    <a
                      href={`mailto:${contactData.email}`}
                      style={{
                        color: "var(--primary, #2D2B7F)",
                        textDecoration: "none",
                        fontSize: "15px",
                      }}
                    >
                      {contactData.email}
                    </a>
                  </div>
                )}

                {contactData.phone && (
                  <div className="contact-info-card">
                    <h3
                      style={{
                        fontSize: "16px",
                        fontWeight: 700,
                        color: "#1a1a2e",
                        margin: "0 0 8px 0",
                      }}
                    >
                      Phone
                    </h3>
                    <a
                      href={`tel:${contactData.phone}`}
                      style={{
                        color: "var(--primary, #2D2B7F)",
                        textDecoration: "none",
                        fontSize: "15px",
                      }}
                    >
                      {contactData.phone}
                    </a>
                  </div>
                )}

                {contactData.offices.map((office) => (
                  <div className="contact-info-card" key={office.name}>
                    <h3
                      style={{
                        fontSize: "16px",
                        fontWeight: 700,
                        color: "#1a1a2e",
                        margin: "0 0 8px 0",
                      }}
                    >
                      {office.name}
                    </h3>
                    <p
                      style={{
                        margin: 0,
                        fontSize: "15px",
                        color: "#555",
                        lineHeight: 1.6,
                        whiteSpace: "pre-wrap",
                      }}
                    >
                      {office.address}
                    </p>
                  </div>
                ))}

                {contactData.businessHours && (
                  <div className="contact-info-card">
                    <h3
                      style={{
                        fontSize: "16px",
                        fontWeight: 700,
                        color: "#1a1a2e",
                        margin: "0 0 8px 0",
                      }}
                    >
                      Business Hours
                    </h3>
                    <p
                      style={{
                        margin: 0,
                        fontSize: "15px",
                        color: "#555",
                        lineHeight: 1.6,
                        whiteSpace: "pre-wrap",
                      }}
                    >
                      {contactData.businessHours}
                    </p>
                  </div>
                )}
              </div>

              {contactData.offices.map((office) => (
                <div key={office.name} style={{ marginTop: "24px" }}>
                  <h3 style={{ fontSize: "18px", fontWeight: 700, marginBottom: "12px" }}>
                    {office.name} Location
                  </h3>
                  <iframe
                    title={`${office.name} location on Google Maps`}
                    src={office.mapEmbedUrl}
                    width="100%"
                    height="320"
                    style={{ border: 0, borderRadius: "8px", display: "block" }}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    allowFullScreen
                  />
                </div>
              ))}
            </div>

            {/* Right - Contact Form */}
            <div>
              <h2
                style={{
                  fontSize: "28px",
                  fontWeight: 700,
                  color: "#1a1a2e",
                  marginBottom: "30px",
                }}
              >
                Send us a Message
              </h2>

              {success && (
                <div
                  style={{
                    background: "#d4edda",
                    color: "#155724",
                    padding: "16px",
                    borderRadius: "6px",
                    marginBottom: "20px",
                    fontSize: "14px",
                  }}
                >
                  {success}
                </div>
              )}

              {error && (
                <div
                  style={{
                    background: "#f8d7da",
                    color: "#721c24",
                    padding: "16px",
                    borderRadius: "6px",
                    marginBottom: "20px",
                    fontSize: "14px",
                  }}
                >
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: "14px",
                      fontWeight: 600,
                      color: "#1a1a2e",
                      marginBottom: "8px",
                    }}
                  >
                    Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="Your name"
                    style={{
                      width: "100%",
                      padding: "12px",
                      border: "1px solid #ddd",
                      borderRadius: "6px",
                      fontSize: "14px",
                      boxSizing: "border-box",
                    }}
                  />
                </div>

                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: "14px",
                      fontWeight: 600,
                      color: "#1a1a2e",
                      marginBottom: "8px",
                    }}
                  >
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="your@email.com"
                    style={{
                      width: "100%",
                      padding: "12px",
                      border: "1px solid #ddd",
                      borderRadius: "6px",
                      fontSize: "14px",
                      boxSizing: "border-box",
                    }}
                  />
                </div>

                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: "14px",
                      fontWeight: 600,
                      color: "#1a1a2e",
                      marginBottom: "8px",
                    }}
                  >
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+91-XXXXXXXXXX"
                    style={{
                      width: "100%",
                      padding: "12px",
                      border: "1px solid #ddd",
                      borderRadius: "6px",
                      fontSize: "14px",
                      boxSizing: "border-box",
                    }}
                  />
                </div>

                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: "14px",
                      fontWeight: 600,
                      color: "#1a1a2e",
                      marginBottom: "8px",
                    }}
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="What is this about?"
                    style={{
                      width: "100%",
                      padding: "12px",
                      border: "1px solid #ddd",
                      borderRadius: "6px",
                      fontSize: "14px",
                      boxSizing: "border-box",
                    }}
                  />
                </div>

                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: "14px",
                      fontWeight: 600,
                      color: "#1a1a2e",
                      marginBottom: "8px",
                    }}
                  >
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    placeholder="Please mention product details such as Product Name, CAS No. if present, Specifications required etc. If nothing specific to mention, please write NA"
                    rows={6}
                    style={{
                      width: "100%",
                      padding: "12px",
                      border: "1px solid #ddd",
                      borderRadius: "6px",
                      fontSize: "14px",
                      boxSizing: "border-box",
                      fontFamily: "inherit",
                    }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    padding: "14px 28px",
                    background: "var(--primary, #2D2B7F)",
                    color: "#fff",
                    border: "none",
                    borderRadius: "6px",
                    fontSize: "15px",
                    fontWeight: 600,
                    cursor: loading ? "not-allowed" : "pointer",
                    opacity: loading ? 0.7 : 1,
                    transition: "opacity 0.2s",
                  }}
                >
                  {loading ? "Sending..." : "Send Message"}
                </button>
              </form>
            </div>
          </div>

        </div>
      </section>
    </main>
  );
}
