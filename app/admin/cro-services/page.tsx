"use client";

import { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import RichTextEditor from "@/app/components/RichTextEditor";

interface CROService {
  id: string;
  slug: string;
  title: string;
  heading?: string;
  subheading?: string;
  banner?: string;
  content?: string;
  isActive: boolean;
  sortOrder: number;
}

export default function CROServicesAdminPage() {
  const [services, setServices] = useState<CROService[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<CROService>>({});
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchServices();
  }, []);

  async function fetchServices() {
    try {
      const res = await fetch("/api/admin/cro-services");
      const data = await res.json();
      setServices(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching services:", error);
      setServices([]);
    } finally {
      setLoading(false);
    }
  }

  async function handleSave() {
    try {
      if (editingId) {
        const res = await fetch(`/api/admin/cro-services/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        if (res.ok) {
          alert("Service updated successfully!");
          setEditingId(null);
        }
      } else {
        const res = await fetch("/api/admin/cro-services", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        if (res.ok) {
          alert("Service created successfully!");
          setShowForm(false);
        }
      }
      setFormData({});
      await fetchServices();
    } catch (error) {
      console.error("Error saving service:", error);
      alert("Failed to save service");
    }
  }

  async function handleDelete(id: string) {
    if (confirm("Are you sure you want to delete this service?")) {
      try {
        const res = await fetch(`/api/admin/cro-services/${id}`, {
          method: "DELETE",
        });
        if (res.ok) {
          alert("Service deleted successfully!");
          await fetchServices();
        }
      } catch (error) {
        console.error("Error deleting service:", error);
        alert("Failed to delete service");
      }
    }
  }

  function handleEdit(service: CROService) {
    setFormData(service);
    setEditingId(service.id);
    setShowForm(true);
  }

  function handleCancel() {
    setShowForm(false);
    setEditingId(null);
    setFormData({});
  }

  async function handleBannerUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("file", file);

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formDataToSend,
      });

      const data = await res.json();
      if (data.url) {
        setFormData({ ...formData, banner: data.url });
        alert("Image uploaded successfully!");
      } else {
        alert("Upload failed: " + data.error);
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("Failed to upload image");
    } finally {
      setUploading(false);
    }
  }

  if (loading) {
    return <div style={{ padding: "20px" }}>Loading...</div>;
  }

  return (
    <div style={{ padding: "40px", maxWidth: "1400px", margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" }}>
        <h1 style={{ margin: "0", fontSize: "28px", fontWeight: "700" }}>CRO Services Management</h1>
        <button
          onClick={() => {
            setFormData({});
            setEditingId(null);
            setShowForm(true);
          }}
          style={{
            padding: "10px 20px",
            background: "var(--primary)",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <FaPlus /> Add Service
        </button>
      </div>

      {showForm && (
        <div style={{ background: "#f5f5f5", padding: "30px", borderRadius: "8px", marginBottom: "30px" }}>
          <h2 style={{ margin: "0 0 20px 0", fontSize: "20px" }}>
            {editingId ? "Edit Service" : "Add New Service"}
          </h2>

          <div style={{ marginBottom: "20px" }}>
            <label style={{ display: "block", marginBottom: "8px", fontWeight: "600" }}>Title *</label>
            <input
              type="text"
              value={formData.title || ""}
              onChange={(e) => {
                const title = e.target.value;
                const slug = title
                  .toLowerCase()
                  .trim()
                  .replace(/[^\w\s-]/g, "")
                  .replace(/\s+/g, "-")
                  .replace(/-+/g, "-");
                setFormData({ ...formData, title, slug });
              }}
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "4px",
                boxSizing: "border-box",
              }}
              placeholder="e.g., Peptide Synthesis"
            />
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label style={{ display: "block", marginBottom: "8px", fontWeight: "600" }}>Slug (Auto-generated)</label>
            <input
              type="text"
              value={formData.slug || ""}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "4px",
                boxSizing: "border-box",
                backgroundColor: "#f9f9f9",
              }}
              placeholder="Auto-generated from title"
            />
            <div style={{ fontSize: "12px", color: "#666", marginTop: "6px" }}>
              Auto-generated from title. Edit if needed.
            </div>
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label style={{ display: "block", marginBottom: "8px", fontWeight: "600" }}>Heading</label>
            <input
              type="text"
              value={formData.heading || ""}
              onChange={(e) => setFormData({ ...formData, heading: e.target.value })}
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "4px",
                boxSizing: "border-box",
              }}
            />
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label style={{ display: "block", marginBottom: "8px", fontWeight: "600" }}>Subheading</label>
            <input
              type="text"
              value={formData.subheading || ""}
              onChange={(e) => setFormData({ ...formData, subheading: e.target.value })}
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "4px",
                boxSizing: "border-box",
              }}
            />
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label style={{ display: "block", marginBottom: "8px", fontWeight: "600" }}>Banner Image</label>
            <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
              <div style={{ flex: 1 }}>
                <input
                  type="text"
                  value={formData.banner || ""}
                  onChange={(e) => setFormData({ ...formData, banner: e.target.value })}
                  style={{
                    width: "100%",
                    padding: "10px",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    boxSizing: "border-box",
                  }}
                  placeholder="Image URL or upload below"
                />
              </div>
              <label
                style={{
                  padding: "10px 16px",
                  background: "var(--primary)",
                  color: "#fff",
                  border: "none",
                  borderRadius: "4px",
                  cursor: uploading ? "not-allowed" : "pointer",
                  fontWeight: "600",
                  fontSize: "14px",
                  opacity: uploading ? 0.6 : 1,
                  whiteSpace: "nowrap",
                }}
              >
                {uploading ? "Uploading..." : "Choose File"}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleBannerUpload}
                  disabled={uploading}
                  style={{ display: "none" }}
                />
              </label>
            </div>
            {formData.banner && (
              <div style={{ marginTop: "12px" }}>
                <img
                  src={formData.banner}
                  alt="Banner preview"
                  style={{
                    maxWidth: "100%",
                    maxHeight: "200px",
                    borderRadius: "4px",
                    border: "1px solid #e0e0e0",
                  }}
                />
              </div>
            )}
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label style={{ display: "block", marginBottom: "8px", fontWeight: "600" }}>Content (HTML/Rich Text)</label>
            <RichTextEditor
              value={formData.content || ""}
              onChange={(content) => setFormData({ ...formData, content })}
              placeholder="Enter content here..."
            />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "20px" }}>
            <div>
              <label style={{ display: "block", marginBottom: "8px", fontWeight: "600" }}>Sort Order</label>
              <input
                type="number"
                value={formData.sortOrder || 0}
                onChange={(e) => setFormData({ ...formData, sortOrder: parseInt(e.target.value) })}
                style={{
                  width: "100%",
                  padding: "10px",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  boxSizing: "border-box",
                }}
              />
            </div>
            <div>
              <label style={{ display: "block", marginBottom: "8px", fontWeight: "600" }}>
                <input
                  type="checkbox"
                  checked={formData.isActive ?? true}
                  onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                  style={{ marginRight: "8px" }}
                />
                Active
              </label>
            </div>
          </div>

          <div style={{ display: "flex", gap: "10px" }}>
            <button
              onClick={handleSave}
              style={{
                padding: "10px 20px",
                background: "var(--primary)",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Save
            </button>
            <button
              onClick={handleCancel}
              style={{
                padding: "10px 20px",
                background: "#ccc",
                color: "#333",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div style={{ background: "#fff", borderRadius: "8px", overflow: "hidden", border: "1px solid #e0e0e0" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#f5f5f5", borderBottom: "2px solid #e0e0e0" }}>
              <th style={{ padding: "12px", textAlign: "left", fontWeight: "600" }}>Slug</th>
              <th style={{ padding: "12px", textAlign: "left", fontWeight: "600" }}>Title</th>
              <th style={{ padding: "12px", textAlign: "left", fontWeight: "600" }}>Status</th>
              <th style={{ padding: "12px", textAlign: "left", fontWeight: "600" }}>Sort Order</th>
              <th style={{ padding: "12px", textAlign: "center", fontWeight: "600" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {services.map((service) => (
              <tr key={service.id} style={{ borderBottom: "1px solid #e0e0e0" }}>
                <td style={{ padding: "12px" }}>{service.slug}</td>
                <td style={{ padding: "12px" }}>{service.title}</td>
                <td style={{ padding: "12px" }}>
                  <span
                    style={{
                      padding: "4px 12px",
                      borderRadius: "4px",
                      background: service.isActive ? "#e8f5e9" : "#ffebee",
                      color: service.isActive ? "#2e7d32" : "#c62828",
                      fontSize: "12px",
                      fontWeight: "600",
                    }}
                  >
                    {service.isActive ? "Active" : "Inactive"}
                  </span>
                </td>
                <td style={{ padding: "12px" }}>{service.sortOrder}</td>
                <td style={{ padding: "12px", textAlign: "center" }}>
                  <button
                    onClick={() => handleEdit(service)}
                    style={{
                      padding: "6px 12px",
                      background: "#1976d2",
                      color: "#fff",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                      marginRight: "8px",
                      fontSize: "12px",
                    }}
                  >
                    <FaEdit /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(service.id)}
                    style={{
                      padding: "6px 12px",
                      background: "#d32f2f",
                      color: "#fff",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                      fontSize: "12px",
                    }}
                  >
                    <FaTrash /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
