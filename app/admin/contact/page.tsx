"use client";

import { useState, useEffect } from "react";

interface ContactPageData {
  id: string | null;
  title: string;
  subtitle: string;
  description: string;
  email: string;
  phone: string;
  address: string;
  businessHours: string;
  mapEmbedUrl: string;
  isActive: boolean;
}

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  subject: string | null;
  message: string;
  isRead: boolean;
  createdAt: string;
}

export default function AdminContactPage() {
  const [activeTab, setActiveTab] = useState<"settings" | "messages">("settings");
  const [contactData, setContactData] = useState<ContactPageData>({
    id: null,
    title: "Contact Us",
    subtitle: "Get in touch with us",
    description: "",
    email: "",
    phone: "",
    address: "",
    businessHours: "",
    mapEmbedUrl: "",
    isActive: true,
  });
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetchContactData();
    fetchMessages();
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

  const fetchMessages = async () => {
    try {
      const response = await fetch("/api/contact-messages");
      const data = await response.json();
      setMessages(data);
    } catch (err) {
      console.error("Error fetching messages:", err);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setContactData((prev) => ({ ...prev, [name]: value }));
  };

  const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContactData((prev) => ({ ...prev, isActive: e.target.checked }));
  };

  const handleSave = async () => {
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const response = await fetch("/api/contact-page", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contactData),
      });
      if (!response.ok) throw new Error("Failed to save");
      setSuccess("Contact page settings saved successfully!");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError("Error saving settings. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const deleteMessage = async (id: string) => {
    if (!confirm("Are you sure you want to delete this message?")) return;
    try {
      const response = await fetch(`/api/contact-messages/${id}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Failed to delete");
      setMessages(messages.filter((m) => m.id !== id));
      setSuccess("Message deleted successfully!");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError("Error deleting message. Please try again.");
      console.error(err);
    }
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "10px 12px",
    border: "1px solid #ddd",
    borderRadius: "6px",
    fontSize: "14px",
    color: "#333",
    outline: "none",
    boxSizing: "border-box",
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontSize: "13px",
    fontWeight: 600,
    color: "#444",
    marginBottom: "6px",
  };

  return (
    <div style={{ maxWidth: "900px" }}>
      <h1 style={{ fontSize: "24px", fontWeight: 800, color: "#1a1a2e", margin: "0 0 24px 0" }}>
        Contact Page Management
      </h1>

      {success && (
        <div style={{ padding: "12px 16px", background: "#f0fdf4", border: "1px solid #86efac", borderRadius: "8px", color: "#16a34a", fontSize: "13px", marginBottom: "20px" }}>
          {success}
        </div>
      )}
      {error && (
        <div style={{ padding: "12px 16px", background: "#fef2f2", border: "1px solid #fecaca", borderRadius: "8px", color: "#dc2626", fontSize: "13px", marginBottom: "20px" }}>
          {error}
        </div>
      )}

      {/* Tabs */}
      <div style={{ display: "flex", gap: "4px", marginBottom: "24px", borderBottom: "2px solid #e8e8e8" }}>
        {(["settings", "messages"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: "10px 20px",
              background: "none",
              border: "none",
              fontSize: "14px",
              fontWeight: 600,
              color: activeTab === tab ? "#2D2B7F" : "#888",
              borderBottom: activeTab === tab ? "2px solid #2D2B7F" : "2px solid transparent",
              marginBottom: "-2px",
              cursor: "pointer",
              transition: "all 0.2s",
              textTransform: "capitalize",
            }}
          >
            {tab === "messages" ? `Messages (${messages.length})` : "Settings"}
          </button>
        ))}
      </div>

      {activeTab === "settings" && (
        <div style={{ background: "#fff", borderRadius: "10px", padding: "28px", boxShadow: "0 1px 4px rgba(0,0,0,0.08)" }}>
          <div style={{ display: "grid", gap: "18px" }}>
            <div>
              <label style={labelStyle}>Title</label>
              <input type="text" name="title" value={contactData.title} onChange={handleInputChange} placeholder="Page title" style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Subtitle</label>
              <input type="text" name="subtitle" value={contactData.subtitle} onChange={handleInputChange} placeholder="Page subtitle" style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Description</label>
              <textarea name="description" value={contactData.description} onChange={handleInputChange} placeholder="Page description" rows={4} style={{ ...inputStyle, resize: "vertical" }} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "18px" }}>
              <div>
                <label style={labelStyle}>Email</label>
                <input type="email" name="email" value={contactData.email} onChange={handleInputChange} placeholder="contact@example.com" style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Phone</label>
                <input type="tel" name="phone" value={contactData.phone} onChange={handleInputChange} placeholder="+91-XXXXXXXXXX" style={inputStyle} />
              </div>
            </div>
            <div>
              <label style={labelStyle}>Address</label>
              <textarea name="address" value={contactData.address} onChange={handleInputChange} placeholder="Full address" rows={3} style={{ ...inputStyle, resize: "vertical" }} />
            </div>
            <div>
              <label style={labelStyle}>Business Hours</label>
              <input type="text" name="businessHours" value={contactData.businessHours} onChange={handleInputChange} placeholder="Monday - Friday: 9:00 AM - 6:00 PM" style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Google Maps Embed URL (Optional)</label>
              <textarea name="mapEmbedUrl" value={contactData.mapEmbedUrl} onChange={handleInputChange} placeholder="Paste the embed code from Google Maps" rows={3} style={{ ...inputStyle, resize: "vertical" }} />
            </div>
            <div>
              <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
                <input type="checkbox" checked={contactData.isActive} onChange={handleToggle} />
                <span style={{ fontSize: "14px", fontWeight: 600, color: "#444" }}>Active</span>
              </label>
            </div>
          </div>

          <button
            onClick={handleSave}
            disabled={loading}
            style={{
              marginTop: "24px",
              padding: "12px 28px",
              background: loading ? "#999" : "linear-gradient(135deg, #2D2B7F, #3a38a0)",
              color: "#fff",
              fontSize: "14px",
              fontWeight: 700,
              border: "none",
              borderRadius: "8px",
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            {loading ? "Saving..." : "Save Settings"}
          </button>
        </div>
      )}

      {activeTab === "messages" && (
        <div>
          {messages.length === 0 ? (
            <div style={{ padding: "40px", textAlign: "center", color: "#888", background: "#fff", borderRadius: "10px", boxShadow: "0 1px 4px rgba(0,0,0,0.08)" }}>
              No messages received yet.
            </div>
          ) : (
            <div style={{ display: "grid", gap: "16px" }}>
              {messages.map((msg) => (
                <div key={msg.id} style={{ background: "#fff", borderRadius: "10px", padding: "20px", boxShadow: "0 1px 4px rgba(0,0,0,0.08)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
                    <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#1a1a2e", margin: 0 }}>{msg.name}</h3>
                    <span style={{ fontSize: "12px", color: "#999" }}>{new Date(msg.createdAt).toLocaleDateString()}</span>
                  </div>
                  {msg.subject && <p style={{ fontSize: "13px", color: "#555", margin: "0 0 6px 0" }}><strong>Subject:</strong> {msg.subject}</p>}
                  <p style={{ fontSize: "13px", color: "#555", margin: "0 0 6px 0" }}><strong>Email:</strong> {msg.email}</p>
                  {msg.phone && <p style={{ fontSize: "13px", color: "#555", margin: "0 0 6px 0" }}><strong>Phone:</strong> {msg.phone}</p>}
                  <p style={{ fontSize: "13px", color: "#333", margin: "0 0 16px 0", lineHeight: 1.6 }}>{msg.message}</p>
                  <button
                    onClick={() => deleteMessage(msg.id)}
                    style={{ padding: "8px 16px", background: "#fef2f2", color: "#dc2626", border: "1px solid #fecaca", borderRadius: "6px", fontSize: "13px", fontWeight: 600, cursor: "pointer" }}
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
