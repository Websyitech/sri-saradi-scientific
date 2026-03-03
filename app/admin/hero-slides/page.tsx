"use client";

import { useState, useEffect, useRef } from "react";
import { FaPlus, FaEdit, FaTrash, FaUpload, FaSpinner } from "react-icons/fa";
import AdminModal from "../components/AdminModal";

interface HeroSlide {
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
  ctaText?: string;
  ctaLink?: string;
  bgImage?: string;
  bgGradient?: string;
  accentColor?: string;
  sortOrder: number;
  isActive: boolean;
}

const emptyForm = {
  title: "",
  subtitle: "",
  description: "",
  ctaText: "",
  ctaLink: "",
  bgImage: "",
  bgGradient: "",
  accentColor: "#6C63FF",
  sortOrder: 0,
  isActive: true,
};

export default function AdminHeroSlides() {
  const [items, setItems] = useState<HeroSlide[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<HeroSlide | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const load = () => {
    fetch("/api/admin/hero-slides")
      .then((r) => r.json())
      .then((data) => {
        setItems(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, []);

  const openCreate = () => {
    setEditing(null);
    setForm(emptyForm);
    setModalOpen(true);
  };

  const openEdit = (item: HeroSlide) => {
    setEditing(item);
    setForm({
      title: item.title,
      subtitle: item.subtitle || "",
      description: item.description || "",
      ctaText: item.ctaText || "",
      ctaLink: item.ctaLink || "",
      bgImage: item.bgImage || "",
      bgGradient: item.bgGradient || "",
      accentColor: item.accentColor || "#6C63FF",
      sortOrder: item.sortOrder,
      isActive: item.isActive,
    });
    setModalOpen(true);
  };

  const handleImageUpload = async (file: File) => {
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("type", `hero_${Date.now()}`);

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data.success) {
        setForm((prev) => ({ ...prev, bgImage: data.url }));
      } else {
        alert(data.error || "Upload failed");
      }
    } catch {
      alert("Upload failed");
    }
    setUploading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const method = editing ? "PUT" : "POST";
    const body = editing ? { id: editing.id, ...form } : form;
    await fetch("/api/admin/hero-slides", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    setSaving(false);
    setModalOpen(false);
    load();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this hero slide?")) return;
    await fetch("/api/admin/hero-slides", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    load();
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "10px 12px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    fontSize: "14px",
    outline: "none",
    boxSizing: "border-box",
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontSize: "13px",
    fontWeight: 500,
    color: "#555",
    marginBottom: "6px",
  };

  if (loading) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "60vh" }}>
        <div style={{ width: "36px", height: "36px", border: "4px solid #e0e0e0", borderTopColor: "#2D2B7F", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
      </div>
    );
  }

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "24px" }}>
        <div>
          <h1 style={{ fontSize: "24px", fontWeight: 700, color: "#1a1a2e", margin: 0 }}>Hero Slides</h1>
          <p style={{ color: "#888", fontSize: "14px", margin: "4px 0 0" }}>{items.length} slides</p>
        </div>
        <button
          onClick={openCreate}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "10px 20px",
            background: "#2D2B7F",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            fontSize: "13px",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          <FaPlus /> Add Slide
        </button>
      </div>

      {/* Slides Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: "16px" }}>
        {items.map((item) => (
          <div
            key={item.id}
            style={{
              background: "#fff",
              borderRadius: "12px",
              border: "1px solid #f0f0f0",
              boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
              overflow: "hidden",
            }}
          >
            {/* Preview */}
            <div
              style={{
                height: "120px",
                background: item.bgImage
                  ? `url(${item.bgImage}) center/cover no-repeat`
                  : item.bgGradient || "linear-gradient(135deg, #2D2B7F, #1a1a2e)",
                padding: "20px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <h3 style={{ margin: 0, fontSize: "16px", fontWeight: 700, color: "#fff", textShadow: "0 1px 3px rgba(0,0,0,0.5)" }}>
                {item.title}
              </h3>
              {item.subtitle && (
                <p style={{ margin: "4px 0 0", fontSize: "12px", color: "rgba(255,255,255,0.8)", textShadow: "0 1px 2px rgba(0,0,0,0.5)" }}>
                  {item.subtitle}
                </p>
              )}
            </div>
            <div style={{ padding: "16px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span
                    style={{
                      padding: "3px 10px",
                      borderRadius: "12px",
                      fontSize: "11px",
                      fontWeight: 600,
                      background: item.isActive ? "#dcfce7" : "#fee2e2",
                      color: item.isActive ? "#166534" : "#991b1b",
                    }}
                  >
                    {item.isActive ? "Active" : "Inactive"}
                  </span>
                  <span style={{ fontSize: "12px", color: "#888" }}>Order: {item.sortOrder}</span>
                  {item.bgImage && <span style={{ fontSize: "10px", color: "#2D2B7F", background: "#e8e7ff", padding: "2px 6px", borderRadius: "4px" }}>Has Image</span>}
                </div>
                {item.ctaText && (
                  <p style={{ margin: "6px 0 0", fontSize: "12px", color: "#888" }}>
                    CTA: {item.ctaText} → {item.ctaLink}
                  </p>
                )}
              </div>
              <div style={{ display: "flex", gap: "4px" }}>
                <button onClick={() => openEdit(item)} style={{ background: "none", border: "none", color: "#2D2B7F", cursor: "pointer", padding: "6px", fontSize: "14px" }}>
                  <FaEdit />
                </button>
                <button onClick={() => handleDelete(item.id)} style={{ background: "none", border: "none", color: "#dc2626", cursor: "pointer", padding: "6px", fontSize: "14px" }}>
                  <FaTrash />
                </button>
              </div>
            </div>
          </div>
        ))}
        {items.length === 0 && (
          <div style={{ gridColumn: "1/-1", padding: "60px", textAlign: "center", color: "#999", background: "#fff", borderRadius: "12px" }}>
            No hero slides yet
          </div>
        )}
      </div>

      <AdminModal title={editing ? "Edit Slide" : "Add Slide"} isOpen={modalOpen} onClose={() => setModalOpen(false)} width="700px">
        <form onSubmit={handleSubmit}>
          {/* Background Image Upload */}
          <div style={{ marginBottom: "20px" }}>
            <label style={labelStyle}>Background Image</label>
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              style={{ display: "none" }}
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleImageUpload(file);
              }}
            />
            <div
              onClick={() => !uploading && fileInputRef.current?.click()}
              style={{
                border: "2px dashed #ddd",
                borderRadius: "8px",
                padding: "24px",
                textAlign: "center",
                cursor: uploading ? "wait" : "pointer",
                background: form.bgImage ? `url(${form.bgImage}) center/cover no-repeat` : "#fafafa",
                minHeight: "140px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "border-color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#2D2B7F")}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#ddd")}
            >
              {uploading ? (
                <div style={{ color: "#666" }}>
                  <FaSpinner style={{ animation: "spin 1s linear infinite", fontSize: "28px" }} />
                  <p style={{ margin: "8px 0 0", fontSize: "14px" }}>Uploading...</p>
                </div>
              ) : form.bgImage ? (
                <div style={{ background: "rgba(0,0,0,0.6)", padding: "12px 24px", borderRadius: "8px" }}>
                  <span style={{ color: "#fff", fontSize: "14px" }}>Click to change image</span>
                </div>
              ) : (
                <div style={{ color: "#888" }}>
                  <FaUpload style={{ fontSize: "32px" }} />
                  <p style={{ margin: "10px 0 0", fontSize: "14px" }}>Click to upload background image</p>
                  <p style={{ margin: "4px 0 0", fontSize: "12px", color: "#aaa" }}>Recommended: 1920x520px</p>
                </div>
              )}
            </div>
            {form.bgImage && (
              <button
                type="button"
                onClick={() => setForm({ ...form, bgImage: "" })}
                style={{
                  marginTop: "8px",
                  padding: "6px 12px",
                  background: "#fef2f2",
                  color: "#dc2626",
                  border: "1px solid #fecaca",
                  borderRadius: "6px",
                  fontSize: "12px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <FaTrash /> Remove Image
              </button>
            )}
          </div>

          <div style={{ marginBottom: "16px" }}>
            <label style={labelStyle}>Title *</label>
            <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required style={inputStyle} />
          </div>
          <div style={{ marginBottom: "16px" }}>
            <label style={labelStyle}>Subtitle</label>
            <input value={form.subtitle} onChange={(e) => setForm({ ...form, subtitle: e.target.value })} style={inputStyle} />
          </div>
          <div style={{ marginBottom: "16px" }}>
            <label style={labelStyle}>Description</label>
            <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} style={{ ...inputStyle, resize: "vertical" }} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
            <div>
              <label style={labelStyle}>CTA Text</label>
              <input value={form.ctaText} onChange={(e) => setForm({ ...form, ctaText: e.target.value })} style={inputStyle} placeholder="e.g. Shop Now" />
            </div>
            <div>
              <label style={labelStyle}>CTA Link</label>
              <input value={form.ctaLink} onChange={(e) => setForm({ ...form, ctaLink: e.target.value })} style={inputStyle} placeholder="e.g. /products" />
            </div>
          </div>
          <div style={{ marginBottom: "16px" }}>
            <label style={labelStyle}>Fallback Gradient (if no image)</label>
            <input value={form.bgGradient} onChange={(e) => setForm({ ...form, bgGradient: e.target.value })} style={inputStyle} placeholder="linear-gradient(135deg, #2D2B7F, #1a1a2e)" />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px", marginBottom: "16px" }}>
            <div>
              <label style={labelStyle}>Accent Color</label>
              <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                <input
                  type="color"
                  value={form.accentColor}
                  onChange={(e) => setForm({ ...form, accentColor: e.target.value })}
                  style={{ width: "40px", height: "36px", border: "1px solid #ddd", borderRadius: "6px", padding: "2px", cursor: "pointer" }}
                />
                <input value={form.accentColor} onChange={(e) => setForm({ ...form, accentColor: e.target.value })} style={{ ...inputStyle, flex: 1 }} />
              </div>
            </div>
            <div>
              <label style={labelStyle}>Sort Order</label>
              <input type="number" value={form.sortOrder} onChange={(e) => setForm({ ...form, sortOrder: parseInt(e.target.value) || 0 })} style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Status</label>
              <select value={form.isActive ? "true" : "false"} onChange={(e) => setForm({ ...form, isActive: e.target.value === "true" })} style={inputStyle}>
                <option value="true">Active</option>
                <option value="false">Inactive</option>
              </select>
            </div>
          </div>
          <div style={{ display: "flex", gap: "12px", justifyContent: "flex-end", paddingTop: "8px" }}>
            <button type="button" onClick={() => setModalOpen(false)} style={{ padding: "10px 20px", border: "1px solid #ddd", borderRadius: "8px", fontSize: "13px", background: "#fff", cursor: "pointer" }}>
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving || uploading}
              style={{
                padding: "10px 24px",
                background: "#2D2B7F",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                fontSize: "13px",
                fontWeight: 600,
                cursor: "pointer",
                opacity: saving || uploading ? 0.7 : 1,
              }}
            >
              {saving ? "Saving..." : uploading ? "Uploading..." : editing ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </AdminModal>
    </div>
  );
}
