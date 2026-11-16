'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface KitProduct {
  id?: string;
  title: string;
  subtitle?: string;
  description?: string;
  content?: string;
  image?: string;
  href?: string;
  heroTitle?: string;
  catalogId?: string;
  sortOrder: number;
  isActive: boolean;
}

interface Catalogue {
  id: string;
  title: string;
  description?: string;
  isActive: boolean;
}

interface KitProductFormProps {
  initialData?: KitProduct;
  isNew?: boolean;
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "10px 12px",
  border: "1px solid #ddd",
  borderRadius: "8px",
  fontSize: "14px",
  outline: "none",
  boxSizing: "border-box"
};

export default function KitProductForm({ initialData, isNew = false }: KitProductFormProps) {
  const router = useRouter();
  
  const parseData = (data: any) => {
    if (!data) return { title: "", subtitle: "", description: "", content: "", image: "", href: "", heroTitle: "", catalogId: "", sortOrder: 0, isActive: true };
    return data;
  };
  
  const [form, setForm] = useState<KitProduct>(
    parseData(initialData)
  );
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string>(initialData?.image || "");
  const [error, setError] = useState("");
  const [catalogues, setCatalogues] = useState<Catalogue[]>([]);

  useEffect(() => {
    // Fetch catalogues
    fetch("/api/catalogues")
      .then((res) => res.json())
      .then((data: Catalogue[]) => {
        if (Array.isArray(data)) {
          setCatalogues(data.filter(cat => cat.isActive));
        }
      })
      .catch(() => {});
  }, []);

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
      const method = isNew ? "POST" : "PUT";
      const dataToSend = isNew ? form : { id: form.id, ...form };
      
      const body = dataToSend;
      
      const response = await fetch("/api/admin/kit-products", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });

      if (response.ok) {
        router.push("/admin/kit-products");
      } else {
        setError("Failed to save page");
      }
    } catch (error) {
      setError("An error occurred");
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: "800px" }}>
      {error && (
        <div style={{ padding: "12px", background: "#fee2e2", color: "#991b1b", borderRadius: "8px", marginBottom: "20px" }}>
          {error}
        </div>
      )}

      <div style={{ marginBottom: "16px" }}>
        <label style={{ display: "block", fontSize: "13px", fontWeight: 500, color: "#555", marginBottom: "6px" }}>
          Page Title *
        </label>
        <input
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
          style={inputStyle}
        />
      </div>

      <div style={{ marginBottom: "16px" }}>
        <label style={{ display: "block", fontSize: "13px", fontWeight: 500, color: "#555", marginBottom: "6px" }}>
          Subtitle
        </label>
        <input
          value={form.subtitle || ""}
          onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
          placeholder="Brief subtitle for the page"
          style={inputStyle}
        />
      </div>

      <div style={{ marginBottom: "16px" }}>
        <label style={{ display: "block", fontSize: "13px", fontWeight: 500, color: "#555", marginBottom: "6px" }}>
          Hero Title (for detail page header)
        </label>
        <input
          value={form.heroTitle || ""}
          onChange={(e) => setForm({ ...form, heroTitle: e.target.value })}
          placeholder="e.g., Advanced Filtration Solutions"
          style={inputStyle}
        />
        <p style={{ fontSize: "12px", color: "#888", margin: "6px 0 0 0" }}>
          This title appears in the hero section when customers view this product. Leave blank to use the product title.
        </p>
      </div>

      <div style={{ marginBottom: "16px" }}>
        <label style={{ display: "block", fontSize: "13px", fontWeight: 500, color: "#555", marginBottom: "6px" }}>
          Catalogue
        </label>
        <select
          value={form.catalogId || ""}
          onChange={(e) => setForm({ ...form, catalogId: e.target.value || undefined })}
          style={inputStyle}
        >
          <option value="">Select a catalogue (optional)</option>
          {catalogues.map((catalogue) => (
            <option key={catalogue.id} value={catalogue.id}>
              {catalogue.title}
            </option>
          ))}
        </select>
        <p style={{ fontSize: "12px", color: "#888", margin: "6px 0 0 0" }}>
          Associate this kit product with a specific catalogue.
        </p>
      </div>

      <div style={{ marginBottom: "16px" }}>
        <label style={{ display: "block", fontSize: "13px", fontWeight: 500, color: "#555", marginBottom: "6px" }}>
          Description
        </label>
        <textarea
          value={form.description || ""}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          rows={3}
          style={{ ...inputStyle, resize: "vertical" }}
          placeholder="Short description for page cards and listings"
        />
      </div>

      <div style={{ marginBottom: "16px" }}>
        <label style={{ display: "block", fontSize: "13px", fontWeight: 500, color: "#555", marginBottom: "6px" }}>
          Rich Text Content
        </label>
        <textarea
          value={form.content || ""}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
          rows={8}
          style={{ ...inputStyle, resize: "vertical", fontFamily: "monospace" }}
          placeholder="Detailed page content with rich text formatting (HTML supported)"
        />
        <p style={{ fontSize: "12px", color: "#888", margin: "6px 0 0 0" }}>
          This content will be displayed on the page. You can use HTML formatting.
        </p>
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

      <div style={{ marginBottom: "16px" }}>
        <label style={{ display: "block", fontSize: "13px", fontWeight: 500, color: "#555", marginBottom: "6px" }}>
          Link (href)
        </label>
        <input
          value={form.href || ""}
          onChange={(e) => setForm({ ...form, href: e.target.value })}
          style={inputStyle}
          placeholder="/lab-consumables/filtration"
        />
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
          {saving ? "Saving..." : isNew ? "Create" : "Update"}
        </button>
      </div>

    </form>
  );
}
