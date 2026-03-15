"use client";

import { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaPlus, FaFileDownload, FaEye } from "react-icons/fa";

interface Catalogue {
  id: string;
  title: string;
  description?: string;
  coverImage?: string;
  pdfUrl?: string;
  sortOrder: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function CataloguesAdminPage() {
  const [catalogues, setCatalogues] = useState<Catalogue[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Catalogue>>({});
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadType, setUploadType] = useState<'cover' | 'pdf' | null>(null);

  useEffect(() => {
    fetchCatalogues();
  }, []);

  async function fetchCatalogues() {
    try {
      const res = await fetch("/api/admin/catalogues");
      const data = await res.json();
      setCatalogues(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching catalogues:", error);
      setCatalogues([]);
    } finally {
      setLoading(false);
    }
  }

  async function handleSave() {
    try {
      if (editingId) {
        const res = await fetch(`/api/admin/catalogues/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        if (res.ok) {
          alert("Catalogue updated successfully!");
          setEditingId(null);
        }
      } else {
        const res = await fetch("/api/admin/catalogues", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        if (res.ok) {
          alert("Catalogue created successfully!");
          setShowForm(false);
        }
      }
      setFormData({});
      await fetchCatalogues();
    } catch (error) {
      console.error("Error saving catalogue:", error);
      alert("Failed to save catalogue");
    }
  }

  async function handleDelete(id: string) {
    if (confirm("Are you sure you want to delete this catalogue?")) {
      try {
        const res = await fetch(`/api/admin/catalogues/${id}`, {
          method: "DELETE",
        });
        if (res.ok) {
          alert("Catalogue deleted successfully!");
          await fetchCatalogues();
        }
      } catch (error) {
        console.error("Error deleting catalogue:", error);
        alert("Failed to delete catalogue");
      }
    }
  }

  function handleEdit(catalogue: Catalogue) {
    setFormData(catalogue);
    setEditingId(catalogue.id);
    setShowForm(true);
  }

  function handleCancel() {
    setShowForm(false);
    setEditingId(null);
    setFormData({});
  }

  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>, type: 'cover' | 'pdf') {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file size before upload
    const maxSize = file.type === "application/pdf" ? 150 * 1024 * 1024 : 10 * 1024 * 1024;
    if (file.size > maxSize) {
      const maxSizeMB = file.type === "application/pdf" ? "150MB" : "10MB";
      alert(`File too large. Maximum size allowed: ${maxSizeMB}`);
      return;
    }

    setUploading(true);
    setUploadProgress(0);
    setUploadType(type);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("file", file);

      const xhr = new XMLHttpRequest();

      // Track upload progress
      xhr.upload.addEventListener('progress', (event) => {
        if (event.lengthComputable) {
          const percentComplete = Math.round((event.loaded / event.total) * 100);
          setUploadProgress(percentComplete);
        }
      });

      // Handle response
      xhr.addEventListener('load', () => {
        try {
          const data = JSON.parse(xhr.responseText);
          if (xhr.status === 201 && data.url) {
            if (type === 'cover') {
              setFormData({ ...formData, coverImage: data.url });
            } else {
              setFormData({ ...formData, pdfUrl: data.url });
            }
            alert(`${type === 'cover' ? 'Cover image' : 'PDF'} uploaded successfully!`);
          } else {
            alert("Upload failed: " + (data.error || 'Unknown error'));
          }
        } catch (error) {
          alert("Upload failed: Invalid response");
        } finally {
          setUploading(false);
          setUploadProgress(0);
          setUploadType(null);
        }
      });

      // Handle errors
      xhr.addEventListener('error', () => {
        alert("Upload failed: Network error");
        setUploading(false);
        setUploadProgress(0);
        setUploadType(null);
      });

      // Handle timeout
      xhr.addEventListener('timeout', () => {
        alert("Upload failed: Request timeout");
        setUploading(false);
        setUploadProgress(0);
        setUploadType(null);
      });

      xhr.timeout = 300000; // 5 minutes timeout
      xhr.open('POST', '/api/admin/upload');
      xhr.send(formDataToSend);

    } catch (error) {
      console.error("Upload error:", error);
      alert("Failed to upload file");
      setUploading(false);
      setUploadProgress(0);
      setUploadType(null);
    }
  }

  if (loading) {
    return <div style={{ padding: "20px" }}>Loading...</div>;
  }

  return (
    <div style={{ padding: "40px", maxWidth: "1400px", margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" }}>
        <h1 style={{ margin: "0", fontSize: "28px", fontWeight: "700" }}>Catalogue Management</h1>
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
          <FaPlus /> Add Catalogue
        </button>
      </div>

      {showForm && (
        <div style={{ background: "#f5f5f5", padding: "30px", borderRadius: "8px", marginBottom: "30px" }}>
          <h2 style={{ margin: "0 0 20px 0", fontSize: "20px" }}>
            {editingId ? "Edit Catalogue" : "Add New Catalogue"}
          </h2>

          <div style={{ marginBottom: "20px" }}>
            <label style={{ display: "block", marginBottom: "8px", fontWeight: "600" }}>Title *</label>
            <input
              type="text"
              value={formData.title || ""}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "4px",
                boxSizing: "border-box",
              }}
              placeholder="e.g., Life Sciences Catalogue 2024"
            />
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label style={{ display: "block", marginBottom: "8px", fontWeight: "600" }}>Description</label>
            <textarea
              value={formData.description || ""}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "4px",
                boxSizing: "border-box",
                height: "100px",
                resize: "vertical",
              }}
              placeholder="Brief description of the catalogue..."
            />
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label style={{ display: "block", marginBottom: "8px", fontWeight: "600" }}>Cover Image</label>
            <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
              <div style={{ flex: 1 }}>
                <input
                  type="text"
                  value={formData.coverImage || ""}
                  onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                  style={{
                    width: "100%",
                    padding: "10px",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    boxSizing: "border-box",
                  }}
                  placeholder="Cover image URL or upload below"
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
                {uploading && uploadType === 'cover' ? `Uploading... ${uploadProgress}%` : "Choose Image"}
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileUpload(e, 'cover')}
                  disabled={uploading}
                  style={{ display: "none" }}
                />
              </label>
            </div>
            {uploading && uploadType === 'cover' && (
              <div style={{ marginTop: "8px" }}>
                <div style={{ 
                  width: "100%", 
                  height: "4px", 
                  background: "#f0f0f0", 
                  borderRadius: "2px",
                  overflow: "hidden"
                }}>
                  <div style={{
                    height: "100%",
                    width: `${uploadProgress}%`,
                    background: "var(--primary)",
                    transition: "width 0.3s ease"
                  }} />
                </div>
                <div style={{ fontSize: "12px", color: "#666", marginTop: "4px" }}>
                  Uploading image... {uploadProgress}%
                </div>
              </div>
            )}
            {formData.coverImage && (
              <div style={{ marginTop: "12px" }}>
                <img
                  src={formData.coverImage}
                  alt="Cover preview"
                  style={{
                    maxWidth: "200px",
                    maxHeight: "300px",
                    borderRadius: "4px",
                    border: "1px solid #e0e0e0",
                  }}
                />
              </div>
            )}
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label style={{ display: "block", marginBottom: "8px", fontWeight: "600" }}>PDF File</label>
            <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
              <div style={{ flex: 1 }}>
                <input
                  type="text"
                  value={formData.pdfUrl || ""}
                  onChange={(e) => setFormData({ ...formData, pdfUrl: e.target.value })}
                  style={{
                    width: "100%",
                    padding: "10px",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    boxSizing: "border-box",
                  }}
                  placeholder="PDF URL or upload below"
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
                {uploading && uploadType === 'pdf' ? `Uploading... ${uploadProgress}%` : "Choose PDF"}
                <input
                  type="file"
                  accept=".pdf"
                  onChange={(e) => handleFileUpload(e, 'pdf')}
                  disabled={uploading}
                  style={{ display: "none" }}
                />
              </label>
            </div>
            {uploading && uploadType === 'pdf' && (
              <div style={{ marginTop: "8px" }}>
                <div style={{ 
                  width: "100%", 
                  height: "6px", 
                  background: "#f0f0f0", 
                  borderRadius: "3px",
                  overflow: "hidden"
                }}>
                  <div style={{
                    height: "100%",
                    width: `${uploadProgress}%`,
                    background: "linear-gradient(90deg, #4CAF50, #45a049)",
                    transition: "width 0.3s ease"
                  }} />
                </div>
                <div style={{ fontSize: "13px", color: "#666", marginTop: "4px", fontWeight: "500" }}>
                  Uploading PDF... {uploadProgress}% 
                  {uploadProgress > 0 && uploadProgress < 100 && " (Large files may take several minutes)"}
                </div>
              </div>
            )}
            {formData.pdfUrl && (
              <div style={{ marginTop: "8px", fontSize: "14px", color: "#666" }}>
                PDF: {formData.pdfUrl.split('/').pop()}
              </div>
            )}
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
              <th style={{ padding: "12px", textAlign: "left", fontWeight: "600" }}>Cover</th>
              <th style={{ padding: "12px", textAlign: "left", fontWeight: "600" }}>Title</th>
              <th style={{ padding: "12px", textAlign: "left", fontWeight: "600" }}>Description</th>
              <th style={{ padding: "12px", textAlign: "left", fontWeight: "600" }}>PDF</th>
              <th style={{ padding: "12px", textAlign: "left", fontWeight: "600" }}>Status</th>
              <th style={{ padding: "12px", textAlign: "left", fontWeight: "600" }}>Sort Order</th>
              <th style={{ padding: "12px", textAlign: "center", fontWeight: "600" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {catalogues.map((catalogue) => (
              <tr key={catalogue.id} style={{ borderBottom: "1px solid #e0e0e0" }}>
                <td style={{ padding: "12px" }}>
                  {catalogue.coverImage ? (
                    <img
                      src={catalogue.coverImage}
                      alt={catalogue.title}
                      style={{
                        width: "50px",
                        height: "60px",
                        objectFit: "cover",
                        borderRadius: "4px",
                        border: "1px solid #e0e0e0",
                      }}
                    />
                  ) : (
                    <div
                      style={{
                        width: "50px",
                        height: "60px",
                        background: "#f0f0f0",
                        borderRadius: "4px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "12px",
                        color: "#666",
                      }}
                    >
                      No Image
                    </div>
                  )}
                </td>
                <td style={{ padding: "12px", fontWeight: "600" }}>{catalogue.title}</td>
                <td style={{ padding: "12px", maxWidth: "200px" }}>
                  {catalogue.description ? (
                    <div style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {catalogue.description}
                    </div>
                  ) : (
                    <span style={{ color: "#999", fontStyle: "italic" }}>No description</span>
                  )}
                </td>
                <td style={{ padding: "12px" }}>
                  {catalogue.pdfUrl ? (
                    <a
                      href={catalogue.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                        color: "#1976d2",
                        textDecoration: "none",
                        fontSize: "12px",
                      }}
                    >
                      <FaFileDownload /> PDF
                    </a>
                  ) : (
                    <span style={{ color: "#999", fontStyle: "italic" }}>No PDF</span>
                  )}
                </td>
                <td style={{ padding: "12px" }}>
                  <span
                    style={{
                      padding: "4px 12px",
                      borderRadius: "4px",
                      background: catalogue.isActive ? "#e8f5e9" : "#ffebee",
                      color: catalogue.isActive ? "#2e7d32" : "#c62828",
                      fontSize: "12px",
                      fontWeight: "600",
                    }}
                  >
                    {catalogue.isActive ? "Active" : "Inactive"}
                  </span>
                </td>
                <td style={{ padding: "12px" }}>{catalogue.sortOrder}</td>
                <td style={{ padding: "12px", textAlign: "center" }}>
                  <button
                    onClick={() => handleEdit(catalogue)}
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
                    onClick={() => handleDelete(catalogue.id)}
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