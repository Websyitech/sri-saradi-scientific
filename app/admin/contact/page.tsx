"use client";

import { useState, useEffect } from "react";
import styles from "@/app/admin/styles/AdminPages.module.css";

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
    setContactData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContactData((prev) => ({
      ...prev,
      isActive: e.target.checked,
    }));
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
      const response = await fetch(`/api/contact-messages/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete");

      setMessages(messages.filter((m) => m.id !== id));
      setSuccess("Message deleted successfully!");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError("Error deleting message. Please try again.");
      console.error(err);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Contact Page Management</h1>

      {success && <div className={styles.successMessage}>{success}</div>}
      {error && <div className={styles.errorMessage}>{error}</div>}

      <div className={styles.tabContainer}>
        <button
          className={`${styles.tabButton} ${activeTab === "settings" ? styles.active : ""}`}
          onClick={() => setActiveTab("settings")}
        >
          Settings
        </button>
        <button
          className={`${styles.tabButton} ${activeTab === "messages" ? styles.active : ""}`}
          onClick={() => setActiveTab("messages")}
        >
          Messages ({messages.length})
        </button>
      </div>

      {activeTab === "settings" && (
        <div className={styles.formContainer}>
          <div className={styles.formGroup}>
            <label>Title</label>
            <input
              type="text"
              name="title"
              value={contactData.title}
              onChange={handleInputChange}
              placeholder="Page title"
            />
          </div>

          <div className={styles.formGroup}>
            <label>Subtitle</label>
            <input
              type="text"
              name="subtitle"
              value={contactData.subtitle}
              onChange={handleInputChange}
              placeholder="Page subtitle"
            />
          </div>

          <div className={styles.formGroup}>
            <label>Description</label>
            <textarea
              name="description"
              value={contactData.description}
              onChange={handleInputChange}
              placeholder="Page description"
              rows={4}
            />
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={contactData.email}
                onChange={handleInputChange}
                placeholder="contact@example.com"
              />
            </div>

            <div className={styles.formGroup}>
              <label>Phone</label>
              <input
                type="tel"
                name="phone"
                value={contactData.phone}
                onChange={handleInputChange}
                placeholder="+91-XXXXXXXXXX"
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label>Address</label>
            <textarea
              name="address"
              value={contactData.address}
              onChange={handleInputChange}
              placeholder="Full address"
              rows={3}
            />
          </div>

          <div className={styles.formGroup}>
            <label>Business Hours</label>
            <input
              type="text"
              name="businessHours"
              value={contactData.businessHours}
              onChange={handleInputChange}
              placeholder="Monday - Friday: 9:00 AM - 6:00 PM"
            />
          </div>

          <div className={styles.formGroup}>
            <label>Google Maps Embed URL (Optional)</label>
            <textarea
              name="mapEmbedUrl"
              value={contactData.mapEmbedUrl}
              onChange={handleInputChange}
              placeholder="Paste the embed code from Google Maps"
              rows={3}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={contactData.isActive}
                onChange={handleToggle}
              />
              <span>Active</span>
            </label>
          </div>

          <button
            className={styles.saveButton}
            onClick={handleSave}
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Settings"}
          </button>
        </div>
      )}

      {activeTab === "messages" && (
        <div className={styles.messagesContainer}>
          {messages.length === 0 ? (
            <p>No messages received yet.</p>
          ) : (
            <div className={styles.messagesGrid}>
              {messages.map((msg) => (
                <div key={msg.id} className={styles.messageCard}>
                  <div className={styles.messageHeader}>
                    <h3>{msg.name}</h3>
                    <span className={styles.date}>
                      {new Date(msg.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  {msg.subject && (
                    <p className={styles.messageSubject}>
                      <strong>Subject:</strong> {msg.subject}
                    </p>
                  )}
                  <p className={styles.messageEmail}>
                    <strong>Email:</strong> {msg.email}
                  </p>
                  {msg.phone && (
                    <p className={styles.messagePhone}>
                      <strong>Phone:</strong> {msg.phone}
                    </p>
                  )}
                  <p className={styles.messageBody}>{msg.message}</p>
                  <button
                    className={styles.deleteButton}
                    onClick={() => deleteMessage(msg.id)}
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
