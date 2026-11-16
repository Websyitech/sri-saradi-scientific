"use client";

import { useState, useEffect } from "react";
import { FaTrash, FaDownload, FaImage, FaUpload } from "react-icons/fa";
import { FaRegCopy } from "react-icons/fa";

interface MediaFile {
  id: string;
  name: string;
  url: string;
  size: number;
  type: string;
  uploadedAt: string;
  uploadedBy?: string;
}

// Utility to copy text to clipboard
const copyToClipboard = (text: string) => {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text);
  } else {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
  }
};

export default function MediaPage() {
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    fetchMediaFiles();
  }, []);

  const fetchMediaFiles = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/admin/media");
      if (response.ok) {
        const data = await response.json();
        setMediaFiles(data.files || []);
      }
    } catch (error) {
      console.error("Failed to fetch media files:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files;
    if (!files) return;

    setUploading(true);
    const formData = new FormData();
    
    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }

    try {
      const response = await fetch("/api/admin/media", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        await fetchMediaFiles();
      }
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this file?")) return;

    try {
      const response = await fetch(`/api/admin/media/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setMediaFiles(mediaFiles.filter((f) => f.id !== id));
      }
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  const showCopiedToast = (id: string) => {
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1200);
  };

  const filteredFiles = mediaFiles.filter((file) =>
    file.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100000) / 100000 + " " + sizes[i];
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ fontSize: "28px", fontWeight: 700, color: "#171717", marginBottom: "30px" }}>
        Media Library
      </h1>

      {/* Upload Section */}
      <div
        style={{
          background: "#f5f5f5",
          border: "2px dashed #2D2B7F",
          borderRadius: "8px",
          padding: "40px",
          textAlign: "center",
          marginBottom: "30px",
          cursor: "pointer",
          transition: "all 0.2s",
        }}
        onDragOver={(e) => {
          e.preventDefault();
          e.currentTarget.style.background = "#ede9ff";
        }}
        onDragLeave={(e) => {
          e.currentTarget.style.background = "#f5f5f5";
        }}
        onDrop={(e) => {
          e.preventDefault();
          e.currentTarget.style.background = "#f5f5f5";
          const files = e.dataTransfer.files;
          if (files.length > 0) {
            const input = document.getElementById("file-input") as HTMLInputElement;
            const dataTransfer = new DataTransfer();
            for (let i = 0; i < files.length; i++) {
              dataTransfer.items.add(files[i]);
            }
            input.files = dataTransfer.files;
            handleFileUpload({ currentTarget: input } as any);
          }
        }}
      >
        <FaUpload style={{ fontSize: "32px", color: "#2D2B7F", marginBottom: "16px" }} />
        <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#171717", margin: "0 0 8px 0" }}>
          Drop files here or click to upload
        </h3>
        <p style={{ fontSize: "14px", color: "#666", margin: 0 }}>
          Upload images, documents, and other media files
        </p>
        <input
          id="file-input"
          type="file"
          multiple
          accept="image/*,.pdf,.doc,.docx"
          onChange={handleFileUpload}
          disabled={uploading}
          style={{ display: "none" }}
          onClick={(e) => {
            e.currentTarget.value = "";
          }}
        />
        <label
          htmlFor="file-input"
          style={{
            display: "inline-block",
            marginTop: "16px",
            padding: "10px 20px",
            background: "#2D2B7F",
            color: "#fff",
            borderRadius: "4px",
            cursor: uploading ? "not-allowed" : "pointer",
            fontSize: "14px",
            fontWeight: 600,
            opacity: uploading ? 0.6 : 1,
          }}
        >
          {uploading ? "Uploading..." : "Select Files"}
        </label>
      </div>

      {/* Toolbar */}
      <div
        style={{
          display: "flex",
          gap: "16px",
          alignItems: "center",
          marginBottom: "20px",
          flexWrap: "wrap",
        }}
      >
        <input
          type="text"
          placeholder="Search files..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: "10px 12px",
            border: "1px solid #ddd",
            borderRadius: "4px",
            fontSize: "14px",
            flex: 1,
            minWidth: "200px",
          }}
        />
        <div style={{ display: "flex", gap: "8px" }}>
          <button
            onClick={() => setViewMode("grid")}
            style={{
              padding: "8px 16px",
              border: viewMode === "grid" ? "2px solid #2D2B7F" : "1px solid #ddd",
              background: viewMode === "grid" ? "#2D2B7F" : "#fff",
              color: viewMode === "grid" ? "#fff" : "#333",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "13px",
              fontWeight: 600,
            }}
          >
            Grid
          </button>
          <button
            onClick={() => setViewMode("list")}
            style={{
              padding: "8px 16px",
              border: viewMode === "list" ? "2px solid #2D2B7F" : "1px solid #ddd",
              background: viewMode === "list" ? "#2D2B7F" : "#fff",
              color: viewMode === "list" ? "#fff" : "#333",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "13px",
              fontWeight: 600,
            }}
          >
            List
          </button>
        </div>
        <span style={{ fontSize: "14px", color: "#666" }}>
          {filteredFiles.length} file{filteredFiles.length !== 1 ? "s" : ""}
        </span>
      </div>

      {/* Loading State */}
      {loading && (
        <div style={{ padding: "40px", textAlign: "center", color: "#999" }}>
          Loading media files...
        </div>
      )}

      {/* Grid View */}
      {!loading && viewMode === "grid" && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
            gap: "16px",
          }}
        >
          {filteredFiles.map((file) => (
            <div
              key={file.id}
              style={{
                border: "1px solid #ddd",
                borderRadius: "8px",
                overflow: "hidden",
                background: "#fff",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              {file.type.startsWith("image/") ? (
                <img
                  src={file.url}
                  alt={file.name}
                  style={{
                    width: "100%",
                    height: "120px",
                    objectFit: "cover",
                  }}
                />
              ) : (
                <div
                  style={{
                    width: "100%",
                    height: "120px",
                    background: "#f0f0f0",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <FaImage style={{ fontSize: "32px", color: "#ccc" }} />
                </div>
              )}
              <div style={{ padding: "12px" }}>
                <p
                  style={{
                    fontSize: "12px",
                    fontWeight: 600,
                    color: "#171717",
                    margin: "0 0 8px 0",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                  title={file.name}
                >
                  {file.name}
                </p>
                <p style={{ fontSize: "11px", color: "#999", margin: 0 }}>
                  {formatFileSize(file.size)}
                </p>
                <div style={{ display: "flex", gap: "6px", marginTop: "8px" }}>
                  <a
                    href={file.url}
                    download
                    style={{
                      flex: 1,
                      padding: "4px",
                      background: "#f0f0f0",
                      border: "none",
                      borderRadius: "3px",
                      cursor: "pointer",
                      fontSize: "12px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#666",
                    }}
                  >
                    <FaDownload style={{ fontSize: "10px" }} />
                  </a>
                  <button
                    onClick={() => handleDelete(file.id)}
                    style={{
                      flex: 1,
                      padding: "4px",
                      background: "#fee",
                      border: "none",
                      borderRadius: "3px",
                      cursor: "pointer",
                      fontSize: "12px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#d32f2f",
                    }}
                  >
                    <FaTrash style={{ fontSize: "10px" }} />
                  </button>
                  <button
                    onClick={() => {
                      copyToClipboard(
                        file.url.replace(/^https?:\/\/[\w\.-]+(:\d+)?/, "")
                      );
                      showCopiedToast(file.id);
                    }}
                    style={{
                      flex: 1,
                      padding: "4px",
                      background: copiedId === file.id ? "#c8e6c9" : "#e0f7fa",
                      border: "none",
                      borderRadius: "3px",
                      cursor: "pointer",
                      fontSize: "12px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: copiedId === file.id ? "#388e3c" : "#00796b",
                      fontWeight: copiedId === file.id ? 700 : 400,
                      transition: "all 0.2s"
                    }}
                    title="Copy relative URL"
                  >
                    {copiedId === file.id ? "Copied!" : "Copy"}
                  </button>
                  {file.type.startsWith("image/") && (
                    <button
                      onClick={() => window.open(file.url, "_blank")}
                      style={{
                        flex: 1,
                        padding: "4px",
                        background: "#f5f5f5",
                        border: "none",
                        borderRadius: "3px",
                        cursor: "pointer",
                        fontSize: "12px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#2D2B7F",
                      }}
                      title="Preview image"
                    >
                      Preview
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* List View */}
      {!loading && viewMode === "list" && (
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            background: "#fff",
          }}
        >
          <thead>
            <tr style={{ background: "#f5f5f5", borderBottom: "2px solid #ddd" }}>
              <th style={{ padding: "12px", textAlign: "left", fontSize: "13px", fontWeight: 700 }}>
                Name
              </th>
              <th style={{ padding: "12px", textAlign: "left", fontSize: "13px", fontWeight: 700 }}>
                Type
              </th>
              <th style={{ padding: "12px", textAlign: "left", fontSize: "13px", fontWeight: 700 }}>
                Size
              </th>
              <th style={{ padding: "12px", textAlign: "left", fontSize: "13px", fontWeight: 700 }}>
                Uploaded
              </th>
              <th style={{ padding: "12px", textAlign: "center", fontSize: "13px", fontWeight: 700 }}>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredFiles.map((file) => (
              <tr key={file.id} style={{ borderBottom: "1px solid #eee" }}>
                <td style={{ padding: "12px", fontSize: "13px", color: "#333" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    {file.type.startsWith("image/") ? (
                      <img
                        src={file.url}
                        alt={file.name}
                        style={{
                          width: "32px",
                          height: "32px",
                          borderRadius: "4px",
                          objectFit: "cover",
                        }}
                      />
                    ) : (
                      <FaImage style={{ fontSize: "16px", color: "#ccc" }} />
                    )}
                    <span style={{ fontWeight: 500 }}>{file.name}</span>
                  </div>
                </td>
                <td style={{ padding: "12px", fontSize: "13px", color: "#666" }}>
                  {file.type}
                </td>
                <td style={{ padding: "12px", fontSize: "13px", color: "#666" }}>
                  {formatFileSize(file.size)}
                </td>
                <td style={{ padding: "12px", fontSize: "13px", color: "#666" }}>
                  {formatDate(file.uploadedAt)}
                </td>
                <td
                  style={{
                    padding: "12px",
                    textAlign: "center",
                    display: "flex",
                    gap: "8px",
                    justifyContent: "center",
                  }}
                >
                  <a
                    href={file.url}
                    download
                    style={{
                      padding: "6px 12px",
                      background: "#f0f0f0",
                      border: "none",
                      borderRadius: "3px",
                      cursor: "pointer",
                      fontSize: "12px",
                      color: "#666",
                      textDecoration: "none",
                    }}
                  >
                    <FaDownload />
                  </a>
                  <button
                    onClick={() => handleDelete(file.id)}
                    style={{
                      padding: "6px 12px",
                      background: "#fee",
                      border: "none",
                      borderRadius: "3px",
                      cursor: "pointer",
                      fontSize: "12px",
                      color: "#d32f2f",
                    }}
                  >
                    <FaTrash />
                  </button>
                  <button
                    onClick={() => {
                      copyToClipboard(
                        file.url.replace(/^https?:\/\/[\w\.-]+(:\d+)?/, "")
                      );
                      showCopiedToast(file.id);
                    }}
                    style={{
                      padding: "6px 12px",
                      background: copiedId === file.id ? "#c8e6c9" : "#e0f7fa",
                      border: "none",
                      borderRadius: "3px",
                      cursor: "pointer",
                      fontSize: "12px",
                      color: copiedId === file.id ? "#388e3c" : "#00796b",
                      fontWeight: copiedId === file.id ? 700 : 400,
                      transition: "all 0.2s"
                    }}
                    title="Copy relative URL"
                  >
                    {copiedId === file.id ? "Copied!" : "Copy"}
                  </button>
                  {file.type.startsWith("image/") && (
                    <button
                      onClick={() => window.open(file.url, "_blank")}
                      style={{
                        padding: "6px 12px",
                        background: "#f5f5f5",
                        border: "none",
                        borderRadius: "3px",
                        cursor: "pointer",
                        fontSize: "12px",
                        color: "#2D2B7F",
                      }}
                      title="Preview image"
                    >
                      Preview
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Empty State */}
      {!loading && filteredFiles.length === 0 && (
        <div
          style={{
            padding: "60px 20px",
            textAlign: "center",
            color: "#999",
          }}
        >
          <FaImage style={{ fontSize: "48px", marginBottom: "16px", opacity: 0.5 }} />
          <h3 style={{ fontSize: "16px", fontWeight: 600, color: "#666", margin: 0 }}>
            No media files found
          </h3>
          <p style={{ fontSize: "14px", margin: "8px 0 0 0" }}>
            {searchTerm ? "Try adjusting your search" : "Upload your first file to get started"}
          </p>
        </div>
      )}

      {copiedId && (
        <div style={{
          position: "fixed",
          bottom: 32,
          left: 0,
          right: 0,
          margin: "0 auto",
          maxWidth: 320,
          background: "#388e3c",
          color: "#fff",
          padding: "14px 32px",
          borderRadius: 8,
          textAlign: "center",
          fontWeight: 600,
          fontSize: 16,
          boxShadow: "0 4px 24px rgba(0,0,0,0.12)",
          zIndex: 9999,
          pointerEvents: "none"
        }}>
          Copied URL to clipboard
        </div>
      )}
    </div>
  );
}
