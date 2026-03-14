'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface CategoryForm {
  name: string;
  description: string;
  image: string;
  icon: string;
  color: string;
  sortOrder: number;
  isActive: boolean;
}

export default function NewCategory() {
  const router = useRouter();
  const [form, setForm] = useState<CategoryForm>({
    name: '',
    description: '',
    image: '',
    icon: '',
    color: '#2D2B7F',
    sortOrder: 0,
    isActive: true
  });
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [error, setError] = useState('');

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/admin/upload", { method: "POST", body: formData });
      const data = await response.json();
      if (response.ok && data.url) {
        setForm({ ...form, image: data.url });
        setImagePreview(data.url);
      }
    } catch (error) {
      setError("Upload failed");
      console.error("Upload failed:", error);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      const response = await fetch("/api/admin/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      if (response.ok) {
        router.push("/admin/kit-products");
      } else {
        setError("Failed to create category");
      }
    } catch (error) {
      setError("An error occurred");
      console.error(error);
    } finally {
      setSaving(false);
    }
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

  return (
    <div>
      <div style={{ marginBottom: "24px" }}>
        <h1 style={{ fontSize: "24px", fontWeight: 700, color: "#1a1a2e", margin: "0 0 8px 0" }}>
          Create Category
        </h1>
        <p style={{ color: "#888", fontSize: "14px", margin: 0 }}>
          Add a new category for organizing products
        </p>
      </div>

      <div style={{ background: "#fff", borderRadius: "12px", border: "1px solid #f0f0f0", padding: "24px" }}>
        <form onSubmit={handleSubmit} style={{ maxWidth: "600px" }}>
          {error && (
            <div style={{ padding: "12px", background: "#fee2e2", color: "#991b1b", borderRadius: "8px", marginBottom: "20px" }}>
              {error}
            </div>
          )}

          <div style={{ marginBottom: "16px" }}>
            <label style={{ display: "block", fontSize: "13px", fontWeight: 500, color: "#555", marginBottom: "6px" }}>
              Category Name *
            </label>
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
              style={inputStyle}
              placeholder="e.g., Lab Consumables"
            />
          </div>

          <div style={{ marginBottom: "16px" }}>
            <label style={{ display: "block", fontSize: "13px", fontWeight: 500, color: "#555", marginBottom: "6px" }}>
              Description
            </label>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              rows={3}
              style={{ ...inputStyle, resize: "vertical" }}
              placeholder="Brief description of this category"
            />
          </div>

          <div style={{ marginBottom: "16px" }}>
            <label style={{ display: "block", fontSize: "13px", fontWeight: 500, color: "#555", marginBottom: "6px" }}>
              Icon/Emoji
            </label>
            <input
              value={form.icon}
              onChange={(e) => setForm({ ...form, icon: e.target.value })}
              style={inputStyle}
              placeholder="🧪 (emoji or icon class)"
            />
          </div>

          <div style={{ marginBottom: "16px" }}>
            <label style={{ display: "block", fontSize: "13px", fontWeight: 500, color: "#555", marginBottom: "6px" }}>
              Color
            </label>
            <input
              type="color"
              value={form.color}
              onChange={(e) => setForm({ ...form, color: e.target.value })}
              style={{ ...inputStyle, height: "45px" }}
            />
          </div>

          <div style={{ marginBottom: "16px" }}>
            <label style={{ display: "block", fontSize: "13px", fontWeight: 500, color: "#555", marginBottom: "6px" }}>
              Image
            </label>
            <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
              <div style={{ flex: 1, position: "relative" }}>
                <input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  style={{ display: "none" }}
                  disabled={uploading}
                />
                <button
                  type="button"
                  onClick={() => document.getElementById("image-upload")?.click()}
                  disabled={uploading}
                  style={{
                    width: "100%",
                    padding: "12px",
                    border: "2px dashed #ddd",
                    borderRadius: "8px",
                    textAlign: "center",
                    cursor: uploading ? "not-allowed" : "pointer",
                    background: "#fafafa",
                    fontSize: "13px",
                    color: "#666",
                    transition: "all 0.2s",
                    opacity: uploading ? 0.7 : 1,
                  }}
                >
                  {uploading ? "Uploading..." : "Click to upload image"}
                </button>
              </div>
              {imagePreview && (
                <div style={{ width: "100px", height: "100px", borderRadius: "8px", overflow: "hidden", border: "1px solid #ddd", flexShrink: 0 }}>
                  <img src={imagePreview} alt="Preview" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
              )}
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
            <div>
              <label style={{ display: "block", fontSize: "13px", fontWeight: 500, color: "#555", marginBottom: "6px" }}>
                Sort Order
              </label>
              <input
                type="number"
                value={form.sortOrder}
                onChange={(e) => setForm({ ...form, sortOrder: parseInt(e.target.value) || 0 })}
                style={inputStyle}
              />
            </div>
            <div>
              <label style={{ display: "block", fontSize: "13px", fontWeight: 500, color: "#555", marginBottom: "6px" }}>
                Status
              </label>
              <select
                value={form.isActive ? "true" : "false"}
                onChange={(e) => setForm({ ...form, isActive: e.target.value === "true" })}
                style={inputStyle}
              >
                <option value="true">Active</option>
                <option value="false">Inactive</option>
              </select>
            </div>
          </div>

          <div style={{ display: "flex", gap: "12px", justifyContent: "flex-start", paddingTop: "8px" }}>
            <button
              type="button"
              onClick={() => router.back()}
              style={{
                padding: "10px 20px",
                border: "1px solid #ddd",
                borderRadius: "8px",
                fontSize: "13px",
                background: "#fff",
                cursor: "pointer"
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              style={{
                padding: "10px 24px",
                background: "#2D2B7F",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                fontSize: "13px",
                fontWeight: 600,
                cursor: "pointer",
                opacity: saving ? 0.7 : 1
              }}
            >
              {saving ? "Creating..." : "Create Category"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}