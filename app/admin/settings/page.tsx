"use client";

import { useState, useEffect, useRef } from "react";
import { FaSave, FaImage, FaSearch, FaSitemap, FaRobot, FaCog, FaUpload, FaCheck, FaSync, FaTrash, FaSpinner } from "react-icons/fa";

interface SiteSetting {
  id: string;
  key: string;
  value: string;
  type: string;
}

interface UploadState {
  uploading: boolean;
  error: string | null;
}

// Default settings structure
const DEFAULT_SETTINGS = {
  // Site Identity
  site_name: "Sri Saradi Scientific",
  site_tagline: "Your Trusted Partner in Scientific Excellence",
  site_logo: "",
  site_favicon: "",
  site_url: "https://srisaradiscientific.com",

  // SEO Meta
  seo_title: "Sri Saradi Scientific - Scientific Research Products",
  seo_description: "Leading supplier of scientific research products including antibodies, ELISA kits, biochemical reagents, and lab equipment.",
  seo_keywords: "scientific products, antibodies, ELISA kits, lab equipment, biochemical reagents, research supplies",
  seo_og_image: "",
  seo_twitter_handle: "",

  // Open Graph Meta
  og_title: "",
  og_description: "",
  og_type: "website",
  og_url: "",
  og_site_name: "",

  // Robots.txt
  robots_txt: `User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/
Sitemap: https://srisaradiscientific.com/sitemap.xml`,

  // Sitemap
  sitemap_enabled: "true",
  sitemap_include_products: "true",
  sitemap_include_categories: "true",
  sitemap_change_freq: "weekly",
  sitemap_priority: "0.8",

  // Contact Info
  contact_email: "",
  contact_phone: "",
  contact_address: "",

  // Social Media
  social_facebook: "",
  social_twitter: "",
  social_linkedin: "",
  social_instagram: "",
};

type SettingKey = keyof typeof DEFAULT_SETTINGS;

export default function AdminSettings() {
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [activeTab, setActiveTab] = useState("identity");
  const [sitemapGenerating, setSitemapGenerating] = useState(false);
  const [sitemapStatus, setSitemapStatus] = useState("");

  // Upload states
  const [uploadStates, setUploadStates] = useState<Record<string, UploadState>>({
    logo: { uploading: false, error: null },
    favicon: { uploading: false, error: null },
    og_image: { uploading: false, error: null },
  });

  // File input refs
  const logoInputRef = useRef<HTMLInputElement>(null);
  const faviconInputRef = useRef<HTMLInputElement>(null);
  const ogImageInputRef = useRef<HTMLInputElement>(null);

  const load = () => {
    fetch("/api/admin/settings")
      .then((r) => r.json())
      .then((data: SiteSetting[]) => {
        const settingsMap: Record<string, string> = { ...DEFAULT_SETTINGS };
        data.forEach((s) => {
          settingsMap[s.key] = s.value;
        });
        setSettings(settingsMap);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const updateSetting = (key: string, value: string) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
    setSaved(false);
  };

  // Handle file upload
  const handleFileUpload = async (
    file: File,
    type: "logo" | "favicon" | "og_image",
    settingKey: string
  ) => {
    setUploadStates((prev) => ({
      ...prev,
      [type]: { uploading: true, error: null },
    }));

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("type", type);

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (data.success) {
        updateSetting(settingKey, data.url);
        setUploadStates((prev) => ({
          ...prev,
          [type]: { uploading: false, error: null },
        }));
      } else {
        setUploadStates((prev) => ({
          ...prev,
          [type]: { uploading: false, error: data.error || "Upload failed" },
        }));
      }
    } catch (err) {
      setUploadStates((prev) => ({
        ...prev,
        [type]: { uploading: false, error: "Upload failed" },
      }));
    }
  };

  // Handle file input change
  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "logo" | "favicon" | "og_image",
    settingKey: string
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileUpload(file, type, settingKey);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    const payload = Object.entries(settings).map(([key, value]) => ({
      key,
      value,
      type: key.includes("robots_txt") || key.includes("description") ? "textarea" :
            key.includes("enabled") || key.includes("include") ? "boolean" : "text",
    }));

    await fetch("/api/admin/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ settings: payload }),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleGenerateSitemap = async () => {
    setSitemapGenerating(true);
    setSitemapStatus("Generating sitemap...");
    try {
      const res = await fetch("/api/sitemap/generate", { method: "POST" });
      const data = await res.json();
      if (data.success) {
        setSitemapStatus(`Sitemap generated! ${data.urlCount} URLs included.`);
      } else {
        setSitemapStatus(`Error: ${data.error}`);
      }
    } catch {
      setSitemapStatus("Failed to generate sitemap");
    }
    setSitemapGenerating(false);
    setTimeout(() => setSitemapStatus(""), 5000);
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "10px 12px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    fontSize: "14px",
    outline: "none",
    boxSizing: "border-box"
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontSize: "13px",
    fontWeight: 500,
    color: "#555",
    marginBottom: "6px"
  };

  const tabs = [
    { id: "identity", label: "Site Identity", icon: <FaImage /> },
    { id: "seo", label: "SEO & Meta", icon: <FaSearch /> },
    { id: "sitemap", label: "Sitemap", icon: <FaSitemap /> },
    { id: "robots", label: "Robots.txt", icon: <FaRobot /> },
    { id: "contact", label: "Contact & Social", icon: <FaCog /> },
  ];

  if (loading) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "60vh" }}>
        <div style={{ width: "36px", height: "36px", border: "4px solid #e0e0e0", borderTopColor: "#2D2B7F", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "24px" }}>
        <div>
          <h1 style={{ fontSize: "24px", fontWeight: 700, color: "#1a1a2e", margin: 0 }}>Site Settings</h1>
          <p style={{ color: "#888", fontSize: "14px", margin: "4px 0 0" }}>Configure your website settings, SEO, and more</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          style={{
            display: "flex", alignItems: "center", gap: "8px", padding: "10px 24px",
            background: saved ? "#16a34a" : "#2D2B7F", color: "#fff", border: "none",
            borderRadius: "8px", fontSize: "13px", fontWeight: 600, cursor: "pointer",
            opacity: saving ? 0.7 : 1, transition: "background 0.3s",
          }}
        >
          {saved ? <FaCheck /> : <FaSave />} {saving ? "Saving..." : saved ? "Saved!" : "Save All Settings"}
        </button>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: "8px", marginBottom: "24px", flexWrap: "wrap" }}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              display: "flex", alignItems: "center", gap: "8px", padding: "10px 18px",
              background: activeTab === tab.id ? "#2D2B7F" : "#fff",
              color: activeTab === tab.id ? "#fff" : "#666",
              border: activeTab === tab.id ? "none" : "1px solid #ddd",
              borderRadius: "8px", fontSize: "13px", fontWeight: 500, cursor: "pointer",
              transition: "all 0.2s",
            }}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div style={{ background: "#fff", borderRadius: "12px", border: "1px solid #f0f0f0", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>

        {/* Site Identity Tab */}
        {activeTab === "identity" && (
          <div style={{ padding: "24px" }}>
            <h2 style={{ fontSize: "16px", fontWeight: 600, color: "#333", marginBottom: "20px" }}>Site Identity</h2>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
              <div>
                <label style={labelStyle}>Site Name</label>
                <input
                  value={settings.site_name || ""}
                  onChange={(e) => updateSetting("site_name", e.target.value)}
                  style={inputStyle}
                  placeholder="Your website name"
                />
              </div>
              <div>
                <label style={labelStyle}>Site URL</label>
                <input
                  value={settings.site_url || ""}
                  onChange={(e) => updateSetting("site_url", e.target.value)}
                  style={inputStyle}
                  placeholder="https://example.com"
                />
              </div>
            </div>

            <div style={{ marginTop: "20px" }}>
              <label style={labelStyle}>Tagline</label>
              <input
                value={settings.site_tagline || ""}
                onChange={(e) => updateSetting("site_tagline", e.target.value)}
                style={inputStyle}
                placeholder="Your website tagline"
              />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginTop: "20px" }}>
              {/* Logo Upload */}
              <div>
                <label style={labelStyle}>Site Logo</label>
                <input
                  type="file"
                  ref={logoInputRef}
                  accept="image/png,image/jpeg,image/jpg,image/gif,image/webp,image/svg+xml"
                  style={{ display: "none" }}
                  onChange={(e) => handleFileChange(e, "logo", "site_logo")}
                />
                <div
                  onClick={() => !uploadStates.logo.uploading && logoInputRef.current?.click()}
                  style={{
                    border: "2px dashed #ddd",
                    borderRadius: "8px",
                    padding: "20px",
                    textAlign: "center",
                    cursor: uploadStates.logo.uploading ? "wait" : "pointer",
                    background: "#fafafa",
                    transition: "border-color 0.2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#2D2B7F")}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#ddd")}
                >
                  {uploadStates.logo.uploading ? (
                    <div style={{ color: "#666" }}>
                      <FaSpinner style={{ animation: "spin 1s linear infinite", fontSize: "24px" }} />
                      <p style={{ margin: "8px 0 0", fontSize: "13px" }}>Uploading...</p>
                    </div>
                  ) : settings.site_logo ? (
                    <div>
                      <img src={settings.site_logo} alt="Logo" style={{ maxHeight: "60px", maxWidth: "180px" }} />
                      <p style={{ margin: "8px 0 0", fontSize: "12px", color: "#666" }}>Click to change</p>
                    </div>
                  ) : (
                    <div style={{ color: "#888" }}>
                      <FaUpload style={{ fontSize: "24px" }} />
                      <p style={{ margin: "8px 0 0", fontSize: "13px" }}>Click to upload logo</p>
                      <p style={{ margin: "4px 0 0", fontSize: "11px", color: "#aaa" }}>PNG, JPG, SVG (max 5MB)</p>
                    </div>
                  )}
                </div>
                {uploadStates.logo.error && (
                  <p style={{ color: "#dc2626", fontSize: "12px", marginTop: "6px" }}>{uploadStates.logo.error}</p>
                )}
                {settings.site_logo && (
                  <button
                    onClick={() => updateSetting("site_logo", "")}
                    style={{
                      marginTop: "8px", padding: "6px 12px", background: "#fef2f2", color: "#dc2626",
                      border: "1px solid #fecaca", borderRadius: "6px", fontSize: "12px", cursor: "pointer",
                      display: "flex", alignItems: "center", gap: "6px",
                    }}
                  >
                    <FaTrash /> Remove Logo
                  </button>
                )}
              </div>

              {/* Favicon Upload */}
              <div>
                <label style={labelStyle}>Favicon</label>
                <input
                  type="file"
                  ref={faviconInputRef}
                  accept="image/png,image/jpeg,image/jpg,image/x-icon,image/vnd.microsoft.icon,image/ico"
                  style={{ display: "none" }}
                  onChange={(e) => handleFileChange(e, "favicon", "site_favicon")}
                />
                <div
                  onClick={() => !uploadStates.favicon.uploading && faviconInputRef.current?.click()}
                  style={{
                    border: "2px dashed #ddd",
                    borderRadius: "8px",
                    padding: "20px",
                    textAlign: "center",
                    cursor: uploadStates.favicon.uploading ? "wait" : "pointer",
                    background: "#fafafa",
                    transition: "border-color 0.2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#2D2B7F")}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#ddd")}
                >
                  {uploadStates.favicon.uploading ? (
                    <div style={{ color: "#666" }}>
                      <FaSpinner style={{ animation: "spin 1s linear infinite", fontSize: "24px" }} />
                      <p style={{ margin: "8px 0 0", fontSize: "13px" }}>Uploading...</p>
                    </div>
                  ) : settings.site_favicon ? (
                    <div>
                      <img src={settings.site_favicon} alt="Favicon" style={{ width: "32px", height: "32px" }} />
                      <p style={{ margin: "8px 0 0", fontSize: "12px", color: "#666" }}>Click to change</p>
                    </div>
                  ) : (
                    <div style={{ color: "#888" }}>
                      <FaUpload style={{ fontSize: "24px" }} />
                      <p style={{ margin: "8px 0 0", fontSize: "13px" }}>Click to upload favicon</p>
                      <p style={{ margin: "4px 0 0", fontSize: "11px", color: "#aaa" }}>ICO, PNG (max 5MB)</p>
                    </div>
                  )}
                </div>
                {uploadStates.favicon.error && (
                  <p style={{ color: "#dc2626", fontSize: "12px", marginTop: "6px" }}>{uploadStates.favicon.error}</p>
                )}
                {settings.site_favicon && (
                  <button
                    onClick={() => updateSetting("site_favicon", "")}
                    style={{
                      marginTop: "8px", padding: "6px 12px", background: "#fef2f2", color: "#dc2626",
                      border: "1px solid #fecaca", borderRadius: "6px", fontSize: "12px", cursor: "pointer",
                      display: "flex", alignItems: "center", gap: "6px",
                    }}
                  >
                    <FaTrash /> Remove Favicon
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* SEO & Meta Tab */}
        {activeTab === "seo" && (
          <div style={{ padding: "24px" }}>
            <h2 style={{ fontSize: "16px", fontWeight: 600, color: "#333", marginBottom: "20px" }}>SEO & Meta Tags</h2>

            <div>
              <label style={labelStyle}>Meta Title (for homepage)</label>
              <input
                value={settings.seo_title || ""}
                onChange={(e) => updateSetting("seo_title", e.target.value)}
                style={inputStyle}
                placeholder="Page title for search engines"
                maxLength={60}
              />
              <p style={{ fontSize: "11px", color: "#999", marginTop: "4px" }}>
                {(settings.seo_title || "").length}/60 characters (recommended max)
              </p>
            </div>

            <div style={{ marginTop: "16px" }}>
              <label style={labelStyle}>Meta Description</label>
              <textarea
                value={settings.seo_description || ""}
                onChange={(e) => updateSetting("seo_description", e.target.value)}
                style={{ ...inputStyle, resize: "vertical" }}
                rows={3}
                placeholder="Brief description of your website for search engines"
                maxLength={160}
              />
              <p style={{ fontSize: "11px", color: "#999", marginTop: "4px" }}>
                {(settings.seo_description || "").length}/160 characters (recommended max)
              </p>
            </div>

            <div style={{ marginTop: "16px" }}>
              <label style={labelStyle}>Meta Keywords</label>
              <input
                value={settings.seo_keywords || ""}
                onChange={(e) => updateSetting("seo_keywords", e.target.value)}
                style={inputStyle}
                placeholder="keyword1, keyword2, keyword3"
              />
              <p style={{ fontSize: "11px", color: "#999", marginTop: "4px" }}>
                Comma-separated list of keywords
              </p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginTop: "16px" }}>
              {/* OG Image Upload */}
              <div>
                <label style={labelStyle}>Open Graph Image</label>
                <input
                  type="file"
                  ref={ogImageInputRef}
                  accept="image/png,image/jpeg,image/jpg,image/webp"
                  style={{ display: "none" }}
                  onChange={(e) => handleFileChange(e, "og_image", "seo_og_image")}
                />
                <div
                  onClick={() => !uploadStates.og_image.uploading && ogImageInputRef.current?.click()}
                  style={{
                    border: "2px dashed #ddd",
                    borderRadius: "8px",
                    padding: "16px",
                    textAlign: "center",
                    cursor: uploadStates.og_image.uploading ? "wait" : "pointer",
                    background: "#fafafa",
                    transition: "border-color 0.2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#2D2B7F")}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#ddd")}
                >
                  {uploadStates.og_image.uploading ? (
                    <div style={{ color: "#666" }}>
                      <FaSpinner style={{ animation: "spin 1s linear infinite", fontSize: "20px" }} />
                      <p style={{ margin: "6px 0 0", fontSize: "12px" }}>Uploading...</p>
                    </div>
                  ) : settings.seo_og_image ? (
                    <div>
                      <img src={settings.seo_og_image} alt="OG" style={{ maxHeight: "50px", maxWidth: "100px" }} />
                      <p style={{ margin: "6px 0 0", fontSize: "11px", color: "#666" }}>Click to change</p>
                    </div>
                  ) : (
                    <div style={{ color: "#888" }}>
                      <FaUpload style={{ fontSize: "20px" }} />
                      <p style={{ margin: "6px 0 0", fontSize: "12px" }}>Upload OG image</p>
                      <p style={{ margin: "2px 0 0", fontSize: "10px", color: "#aaa" }}>1200x630px recommended</p>
                    </div>
                  )}
                </div>
                {uploadStates.og_image.error && (
                  <p style={{ color: "#dc2626", fontSize: "11px", marginTop: "4px" }}>{uploadStates.og_image.error}</p>
                )}
                {settings.seo_og_image && (
                  <button
                    onClick={() => updateSetting("seo_og_image", "")}
                    style={{
                      marginTop: "6px", padding: "4px 10px", background: "#fef2f2", color: "#dc2626",
                      border: "1px solid #fecaca", borderRadius: "4px", fontSize: "11px", cursor: "pointer",
                      display: "flex", alignItems: "center", gap: "4px",
                    }}
                  >
                    <FaTrash /> Remove
                  </button>
                )}
              </div>
              <div>
                <label style={labelStyle}>Twitter Handle</label>
                <input
                  value={settings.seo_twitter_handle || ""}
                  onChange={(e) => updateSetting("seo_twitter_handle", e.target.value)}
                  style={inputStyle}
                  placeholder="@yourhandle"
                />
              </div>
            </div>

            {/* Open Graph Section */}
            <div style={{ marginTop: "32px", padding: "20px", background: "#f8fafc", borderRadius: "8px", border: "1px solid #e2e8f0" }}>
              <h3 style={{ fontSize: "14px", fontWeight: 600, color: "#333", marginBottom: "16px", display: "flex", alignItems: "center", gap: "8px" }}>
                🔗 Open Graph Settings
              </h3>
              
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <div>
                  <label style={labelStyle}>OG Title</label>
                  <input
                    value={settings.og_title || ""}
                    onChange={(e) => updateSetting("og_title", e.target.value)}
                    style={inputStyle}
                    placeholder="Custom title for social media (leave empty to use SEO title)"
                  />
                  <p style={{ fontSize: "10px", color: "#666", marginTop: "2px" }}>
                    Used when shared on Facebook, Twitter, etc.
                  </p>
                </div>
                <div>
                  <label style={labelStyle}>OG Site Name</label>
                  <input
                    value={settings.og_site_name || ""}
                    onChange={(e) => updateSetting("og_site_name", e.target.value)}
                    style={inputStyle}
                    placeholder="Your site name (leave empty to use site name)"
                  />
                </div>
              </div>

              <div style={{ marginTop: "12px" }}>
                <label style={labelStyle}>OG Description</label>
                <textarea
                  value={settings.og_description || ""}
                  onChange={(e) => updateSetting("og_description", e.target.value)}
                  style={{ ...inputStyle, resize: "vertical" }}
                  rows={2}
                  placeholder="Custom description for social media (leave empty to use SEO description)"
                  maxLength={200}
                />
                <p style={{ fontSize: "10px", color: "#666", marginTop: "2px" }}>
                  {(settings.og_description || "").length}/200 characters (recommended max for social media)
                </p>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginTop: "12px" }}>
                <div>
                  <label style={labelStyle}>OG Type</label>
                  <select
                    value={settings.og_type || "website"}
                    onChange={(e) => updateSetting("og_type", e.target.value)}
                    style={inputStyle}
                  >
                    <option value="website">Website</option>
                    <option value="article">Article</option>
                    <option value="product">Product</option>
                    <option value="business.business">Business</option>
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>OG URL</label>
                  <input
                    value={settings.og_url || ""}
                    onChange={(e) => updateSetting("og_url", e.target.value)}
                    style={inputStyle}
                    placeholder="Canonical URL (leave empty to use site URL)"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Sitemap Tab */}
        {activeTab === "sitemap" && (
          <div style={{ padding: "24px" }}>
            <h2 style={{ fontSize: "16px", fontWeight: 600, color: "#333", marginBottom: "20px" }}>Sitemap Configuration</h2>

            <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "24px" }}>
              <button
                onClick={handleGenerateSitemap}
                disabled={sitemapGenerating}
                style={{
                  display: "flex", alignItems: "center", gap: "8px", padding: "12px 24px",
                  background: "#16a34a", color: "#fff", border: "none",
                  borderRadius: "8px", fontSize: "14px", fontWeight: 600, cursor: "pointer",
                  opacity: sitemapGenerating ? 0.7 : 1,
                }}
              >
                <FaSync style={{ animation: sitemapGenerating ? "spin 1s linear infinite" : "none" }} />
                {sitemapGenerating ? "Generating..." : "Generate Sitemap Now"}
              </button>
              {sitemapStatus && (
                <span style={{ fontSize: "13px", color: sitemapStatus.includes("Error") ? "#dc2626" : "#16a34a" }}>
                  {sitemapStatus}
                </span>
              )}
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
              <div>
                <label style={labelStyle}>Enable Sitemap</label>
                <select
                  value={settings.sitemap_enabled || "true"}
                  onChange={(e) => updateSetting("sitemap_enabled", e.target.value)}
                  style={inputStyle}
                >
                  <option value="true">Enabled</option>
                  <option value="false">Disabled</option>
                </select>
              </div>
              <div>
                <label style={labelStyle}>Include Products</label>
                <select
                  value={settings.sitemap_include_products || "true"}
                  onChange={(e) => updateSetting("sitemap_include_products", e.target.value)}
                  style={inputStyle}
                >
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </div>
              <div>
                <label style={labelStyle}>Include Categories</label>
                <select
                  value={settings.sitemap_include_categories || "true"}
                  onChange={(e) => updateSetting("sitemap_include_categories", e.target.value)}
                  style={inputStyle}
                >
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </div>
              <div>
                <label style={labelStyle}>Change Frequency</label>
                <select
                  value={settings.sitemap_change_freq || "weekly"}
                  onChange={(e) => updateSetting("sitemap_change_freq", e.target.value)}
                  style={inputStyle}
                >
                  <option value="always">Always</option>
                  <option value="hourly">Hourly</option>
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                  <option value="yearly">Yearly</option>
                  <option value="never">Never</option>
                </select>
              </div>
              <div>
                <label style={labelStyle}>Default Priority</label>
                <select
                  value={settings.sitemap_priority || "0.8"}
                  onChange={(e) => updateSetting("sitemap_priority", e.target.value)}
                  style={inputStyle}
                >
                  <option value="1.0">1.0 (Highest)</option>
                  <option value="0.9">0.9</option>
                  <option value="0.8">0.8</option>
                  <option value="0.7">0.7</option>
                  <option value="0.6">0.6</option>
                  <option value="0.5">0.5 (Medium)</option>
                  <option value="0.4">0.4</option>
                  <option value="0.3">0.3</option>
                  <option value="0.2">0.2</option>
                  <option value="0.1">0.1 (Lowest)</option>
                </select>
              </div>
            </div>

            <div style={{ marginTop: "24px", padding: "16px", background: "#f0f9ff", borderRadius: "8px", border: "1px solid #bae6fd" }}>
              <p style={{ fontSize: "13px", color: "#0369a1", margin: 0 }}>
                <strong>Sitemap URL:</strong> {settings.site_url || "https://yoursite.com"}/sitemap.xml
              </p>
            </div>
          </div>
        )}

        {/* Robots.txt Tab */}
        {activeTab === "robots" && (
          <div style={{ padding: "24px" }}>
            <h2 style={{ fontSize: "16px", fontWeight: 600, color: "#333", marginBottom: "20px" }}>Robots.txt Configuration</h2>

            <div>
              <label style={labelStyle}>Robots.txt Content</label>
              <textarea
                value={settings.robots_txt || ""}
                onChange={(e) => updateSetting("robots_txt", e.target.value)}
                style={{ ...inputStyle, fontFamily: "monospace", fontSize: "13px", resize: "vertical" }}
                rows={12}
                placeholder="User-agent: *
Allow: /
Disallow: /admin/"
              />
              <p style={{ fontSize: "11px", color: "#999", marginTop: "8px" }}>
                This content will be served at /robots.txt. Include your Sitemap URL for search engines.
              </p>
            </div>

            <div style={{ marginTop: "16px", display: "flex", gap: "12px", flexWrap: "wrap" }}>
              <button
                onClick={() => updateSetting("robots_txt", `User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/
Sitemap: ${settings.site_url || "https://yoursite.com"}/sitemap.xml`)}
                style={{
                  padding: "8px 16px", background: "#f3f4f6", color: "#374151",
                  border: "1px solid #d1d5db", borderRadius: "6px", fontSize: "12px", cursor: "pointer",
                }}
              >
                Reset to Default
              </button>
              <button
                onClick={() => updateSetting("robots_txt", `User-agent: *
Disallow: /`)}
                style={{
                  padding: "8px 16px", background: "#fef2f2", color: "#dc2626",
                  border: "1px solid #fecaca", borderRadius: "6px", fontSize: "12px", cursor: "pointer",
                }}
              >
                Block All Crawlers
              </button>
              <button
                onClick={() => updateSetting("robots_txt", `User-agent: *
Allow: /
Sitemap: ${settings.site_url || "https://yoursite.com"}/sitemap.xml`)}
                style={{
                  padding: "8px 16px", background: "#f0fdf4", color: "#16a34a",
                  border: "1px solid #bbf7d0", borderRadius: "6px", fontSize: "12px", cursor: "pointer",
                }}
              >
                Allow All Crawlers
              </button>
            </div>

            <div style={{ marginTop: "24px", padding: "16px", background: "#f0f9ff", borderRadius: "8px", border: "1px solid #bae6fd" }}>
              <p style={{ fontSize: "13px", color: "#0369a1", margin: 0 }}>
                <strong>Robots.txt URL:</strong> {settings.site_url || "https://yoursite.com"}/robots.txt
              </p>
            </div>
          </div>
        )}

        {/* Contact & Social Tab */}
        {activeTab === "contact" && (
          <div style={{ padding: "24px" }}>
            <h2 style={{ fontSize: "16px", fontWeight: 600, color: "#333", marginBottom: "20px" }}>Contact Information</h2>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
              <div>
                <label style={labelStyle}>Email Address</label>
                <input
                  value={settings.contact_email || ""}
                  onChange={(e) => updateSetting("contact_email", e.target.value)}
                  style={inputStyle}
                  placeholder="contact@example.com"
                  type="email"
                />
              </div>
              <div>
                <label style={labelStyle}>Phone Number</label>
                <input
                  value={settings.contact_phone || ""}
                  onChange={(e) => updateSetting("contact_phone", e.target.value)}
                  style={inputStyle}
                  placeholder="+91 9876543210"
                />
              </div>
            </div>

            <div style={{ marginTop: "16px" }}>
              <label style={labelStyle}>Address</label>
              <textarea
                value={settings.contact_address || ""}
                onChange={(e) => updateSetting("contact_address", e.target.value)}
                style={{ ...inputStyle, resize: "vertical" }}
                rows={2}
                placeholder="Your business address"
              />
            </div>

            <h2 style={{ fontSize: "16px", fontWeight: 600, color: "#333", margin: "32px 0 20px" }}>Social Media Links</h2>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
              <div>
                <label style={labelStyle}>Facebook</label>
                <input
                  value={settings.social_facebook || ""}
                  onChange={(e) => updateSetting("social_facebook", e.target.value)}
                  style={inputStyle}
                  placeholder="https://facebook.com/yourpage"
                />
              </div>
              <div>
                <label style={labelStyle}>Twitter / X</label>
                <input
                  value={settings.social_twitter || ""}
                  onChange={(e) => updateSetting("social_twitter", e.target.value)}
                  style={inputStyle}
                  placeholder="https://twitter.com/yourhandle"
                />
              </div>
              <div>
                <label style={labelStyle}>LinkedIn</label>
                <input
                  value={settings.social_linkedin || ""}
                  onChange={(e) => updateSetting("social_linkedin", e.target.value)}
                  style={inputStyle}
                  placeholder="https://linkedin.com/company/yourcompany"
                />
              </div>
              <div>
                <label style={labelStyle}>Instagram</label>
                <input
                  value={settings.social_instagram || ""}
                  onChange={(e) => updateSetting("social_instagram", e.target.value)}
                  style={inputStyle}
                  placeholder="https://instagram.com/yourhandle"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
