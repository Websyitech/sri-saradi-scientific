"use client";

import { useState, useEffect } from "react";
import { FaPlus, FaEdit, FaTrash, FaImage, FaSave, FaTimes, FaUpload, FaFolder, FaSearch, FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface Certificate {
  id: string;
  title: string;
  image?: string;
  sortOrder: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface MediaFile {
  id: string;
  name: string;
  url: string;
  size: number;
  type: string;
  uploadedAt: string;
}

export default function CertificatesPage() {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [filteredCertificates, setFilteredCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingCertificate, setEditingCertificate] = useState<Certificate | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    image: "",
    sortOrder: 0,
    isActive: true
  });
  const [uploading, setUploading] = useState(false);
  const [showMediaModal, setShowMediaModal] = useState(false);
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([]);
  const [loadingMedia, setLoadingMedia] = useState(false);
  const [imageSelectionMode, setImageSelectionMode] = useState<"upload" | "media">("upload");
  
  // Search and pagination
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  
  // Media pagination
  const [mediaCurrentPage, setMediaCurrentPage] = useState(1);
  const [mediaItemsPerPage] = useState(12);
  const [mediaSearchQuery, setMediaSearchQuery] = useState("");

  useEffect(() => {
    fetchCertificates();
  }, []);

  // Filter certificates based on search query
  useEffect(() => {
    let filtered = certificates;
    
    if (searchQuery.trim()) {
      filtered = certificates.filter(cert =>
        cert.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    setFilteredCertificates(filtered);
    setCurrentPage(1); // Reset to first page when search changes
  }, [certificates, searchQuery]);

  const fetchCertificates = async () => {
    try {
      const response = await fetch("/api/admin/certificates");
      const data = await response.json();
      setCertificates(data.certificates || []);
    } catch (error) {
      console.error("Error fetching certificates:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchMediaFiles = async () => {
    setLoadingMedia(true);
    try {
      const response = await fetch("/api/admin/media");
      const data = await response.json();
      // Filter only image files and sort by upload date (newest first)
      const imageFiles = (data.files || [])
        .filter((file: MediaFile) => file.type.startsWith('image/'))
        .sort((a: MediaFile, b: MediaFile) => 
          new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime()
        );
      setMediaFiles(imageFiles);
    } catch (error) {
      console.error("Error fetching media files:", error);
    } finally {
      setLoadingMedia(false);
    }
  };

  // Calculate pagination for certificates
  const totalPages = Math.ceil(filteredCertificates.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCertificates = filteredCertificates.slice(startIndex, endIndex);

  // Calculate pagination for media files
  const filteredMediaFiles = mediaFiles.filter(file =>
    file.name.toLowerCase().includes(mediaSearchQuery.toLowerCase())
  );
  const totalMediaPages = Math.ceil(filteredMediaFiles.length / mediaItemsPerPage);
  const mediaStartIndex = (mediaCurrentPage - 1) * mediaItemsPerPage;
  const mediaEndIndex = mediaStartIndex + mediaItemsPerPage;
  const currentMediaFiles = filteredMediaFiles.slice(mediaStartIndex, mediaEndIndex);

  const handleCreate = () => {
    setEditingCertificate(null);
    setFormData({
      title: "",
      image: "",
      sortOrder: certificates.length,
      isActive: true
    });
    setImageSelectionMode("upload");
    setShowModal(true);
  };

  const handleEdit = (certificate: Certificate) => {
    setEditingCertificate(certificate);
    setFormData({
      title: certificate.title,
      image: certificate.image || "",
      sortOrder: certificate.sortOrder,
      isActive: certificate.isActive
    });
    setImageSelectionMode("upload");
    setShowModal(true);
  };

  const handleSelectFromMedia = () => {
    fetchMediaFiles();
    setShowMediaModal(true);
  };

  const handleSelectImage = (imageUrl: string) => {
    setFormData(prev => ({ ...prev, image: imageUrl }));
    setShowMediaModal(false);
  };

  const handleImageUpload = async (file: File) => {
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData
      });

      const data = await response.json();
      if (data.url) {
        setFormData(prev => ({ ...prev, image: data.url }));
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to upload image");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const url = editingCertificate 
        ? `/api/admin/certificates/${editingCertificate.id}`
        : "/api/admin/certificates";
      
      const method = editingCertificate ? "PUT" : "POST";
      
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        await fetchCertificates();
        setShowModal(false);
      } else {
        const errorData = await response.json();
        alert(errorData.error || "Failed to save certificate");
      }
    } catch (error) {
      console.error("Error saving certificate:", error);
      alert("Failed to save certificate");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this certificate?")) return;

    try {
      const response = await fetch(`/api/admin/certificates/${id}`, {
        method: "DELETE"
      });

      if (response.ok) {
        await fetchCertificates();
      } else {
        alert("Failed to delete certificate");
      }
    } catch (error) {
      console.error("Error deleting certificate:", error);
      alert("Failed to delete certificate");
    }
  };

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "400px" }}>
        <div>Loading certificates...</div>
      </div>
    );
  }

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
        <h1 style={{ fontSize: "24px", fontWeight: 600, margin: 0 }}>Certificates</h1>
        <button
          onClick={handleCreate}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            backgroundColor: "#2D2B7F",
            color: "#fff",
            border: "none",
            padding: "10px 16px",
            borderRadius: "6px",
            fontSize: "14px",
            cursor: "pointer"
          }}
        >
          <FaPlus /> Add Certificate
        </button>
      </div>

      {/* Search Bar */}
      <div style={{ marginBottom: "20px", display: "flex", gap: "16px", alignItems: "center" }}>
        <div style={{ position: "relative", flexGrow: 1, maxWidth: "400px" }}>
          <FaSearch style={{
            position: "absolute",
            left: "12px",
            top: "50%",
            transform: "translateY(-50%)",
            color: "#666",
            fontSize: "14px"
          }} />
          <input
            type="text"
            placeholder="Search certificates..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: "100%",
              padding: "10px 12px 10px 36px",
              border: "1px solid #ddd",
              borderRadius: "6px",
              fontSize: "14px",
              outline: "none"
            }}
          />
        </div>
        <div style={{ color: "#666", fontSize: "14px", whiteSpace: "nowrap" }}>
          {filteredCertificates.length} certificate{filteredCertificates.length !== 1 ? 's' : ''} found
        </div>
      </div>

      <div style={{ backgroundColor: "#fff", borderRadius: "8px", overflow: "hidden", boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}>
        {filteredCertificates.length === 0 ? (
          <div style={{ padding: "40px", textAlign: "center", color: "#666" }}>
            {searchQuery ? "No certificates found matching your search." : "No certificates found. Create your first certificate to get started."}
          </div>
        ) : (
          <>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead style={{ backgroundColor: "#f8f9fa", borderBottom: "1px solid #e9ecef" }}>
                <tr>
                  <th style={{ padding: "12px", textAlign: "left", fontWeight: 600, fontSize: "14px" }}>Image</th>
                  <th style={{ padding: "12px", textAlign: "left", fontWeight: 600, fontSize: "14px" }}>Title</th>
                  <th style={{ padding: "12px", textAlign: "left", fontWeight: 600, fontSize: "14px" }}>Sort Order</th>
                  <th style={{ padding: "12px", textAlign: "left", fontWeight: 600, fontSize: "14px" }}>Status</th>
                  <th style={{ padding: "12px", textAlign: "right", fontWeight: 600, fontSize: "14px" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentCertificates.map((certificate) => (
                <tr key={certificate.id} style={{ borderBottom: "1px solid #e9ecef" }}>
                  <td style={{ padding: "12px" }}>
                    {certificate.image ? (
                      <img 
                        src={certificate.image} 
                        alt={certificate.title}
                        style={{ width: "60px", height: "40px", objectFit: "cover", borderRadius: "4px" }}
                      />
                    ) : (
                      <div style={{ 
                        width: "60px", 
                        height: "40px", 
                        backgroundColor: "#f8f9fa", 
                        borderRadius: "4px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#666"
                      }}>
                        <FaImage />
                      </div>
                    )}
                  </td>
                  <td style={{ padding: "12px", fontSize: "14px" }}>{certificate.title}</td>
                  <td style={{ padding: "12px", fontSize: "14px" }}>{certificate.sortOrder}</td>
                  <td style={{ padding: "12px", fontSize: "14px" }}>
                    <span style={{
                      padding: "4px 8px",
                      borderRadius: "12px",
                      fontSize: "12px",
                      fontWeight: 500,
                      backgroundColor: certificate.isActive ? "#d4edda" : "#f8d7da",
                      color: certificate.isActive ? "#155724" : "#721c24"
                    }}>
                      {certificate.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td style={{ padding: "12px", textAlign: "right" }}>
                    <div style={{ display: "flex", gap: "8px", justifyContent: "flex-end" }}>
                      <button
                        onClick={() => handleEdit(certificate)}
                        style={{
                          padding: "6px 12px",
                          backgroundColor: "#0F7B6C",
                          color: "#fff",
                          border: "none",
                          borderRadius: "4px",
                          cursor: "pointer",
                          fontSize: "12px"
                        }}
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(certificate.id)}
                        style={{
                          padding: "6px 12px",
                          backgroundColor: "#dc3545",
                          color: "#fff",
                          border: "none",
                          borderRadius: "4px",
                          cursor: "pointer",
                          fontSize: "12px"
                        }}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {/* Pagination */}
          {totalPages > 1 && (
            <div style={{ 
              padding: "16px 20px", 
              borderTop: "1px solid #e9ecef",
              display: "flex", 
              justifyContent: "space-between", 
              alignItems: "center",
              backgroundColor: "#f8f9fa"
            }}>
              <div style={{ fontSize: "14px", color: "#666" }}>
                Showing {startIndex + 1} to {Math.min(endIndex, filteredCertificates.length)} of {filteredCertificates.length} certificates
              </div>
              <div style={{ display: "flex", gap: "4px", alignItems: "center" }}>
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  style={{
                    padding: "6px 12px",
                    backgroundColor: currentPage === 1 ? "#f8f9fa" : "#fff",
                    color: currentPage === 1 ? "#ccc" : "#333",
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                    cursor: currentPage === 1 ? "not-allowed" : "pointer",
                    fontSize: "14px",
                    display: "flex",
                    alignItems: "center"
                  }}
                >
                  <FaChevronLeft />
                </button>
                
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    style={{
                      padding: "6px 12px",
                      backgroundColor: currentPage === page ? "#2D2B7F" : "#fff",
                      color: currentPage === page ? "#fff" : "#333",
                      border: "1px solid #ddd",
                      borderRadius: "4px",
                      cursor: "pointer",
                      fontSize: "14px",
                      minWidth: "36px"
                    }}
                  >
                    {page}
                  </button>
                ))}
                
                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  style={{
                    padding: "6px 12px",
                    backgroundColor: currentPage === totalPages ? "#f8f9fa" : "#fff",
                    color: currentPage === totalPages ? "#ccc" : "#333",
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                    cursor: currentPage === totalPages ? "not-allowed" : "pointer",
                    fontSize: "14px",
                    display: "flex",
                    alignItems: "center"
                  }}
                >
                  <FaChevronRight />
                </button>
              </div>
            </div>
          )}
          </>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0,0,0,0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: "#fff",
            borderRadius: "8px",
            padding: "24px",
            width: "500px",
            maxHeight: "90vh",
            overflow: "auto"
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <h3 style={{ margin: 0, fontSize: "18px", fontWeight: 600 }}>
                {editingCertificate ? "Edit Certificate" : "Add Certificate"}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                style={{
                  background: "none",
                  border: "none",
                  fontSize: "18px",
                  cursor: "pointer",
                  color: "#666"
                }}
              >
                <FaTimes />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: "16px" }}>
                <label style={{ display: "block", marginBottom: "6px", fontSize: "14px", fontWeight: 500 }}>
                  Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                  style={{
                    width: "100%",
                    padding: "10px 12px",
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                    fontSize: "14px"
                  }}
                />
              </div>

              <div style={{ marginBottom: "16px" }}>
                <label style={{ display: "block", marginBottom: "6px", fontSize: "14px", fontWeight: 500 }}>
                  Certificate Image
                </label>
                
                {formData.image && (
                  <div style={{ marginBottom: "12px" }}>
                    <img
                      src={formData.image}
                      alt="Certificate preview"
                      style={{ width: "200px", height: "120px", objectFit: "cover", borderRadius: "4px" }}
                    />
                  </div>
                )}

                <div style={{ display: "flex", gap: "8px", marginBottom: "12px" }}>
                  <button
                    type="button"
                    onClick={() => setImageSelectionMode("upload")}
                    style={{
                      padding: "8px 16px",
                      backgroundColor: imageSelectionMode === "upload" ? "#2D2B7F" : "#f8f9fa",
                      color: imageSelectionMode === "upload" ? "#fff" : "#666",
                      border: "1px solid #ddd",
                      borderRadius: "4px",
                      cursor: "pointer",
                      fontSize: "14px",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px"
                    }}
                  >
                    <FaUpload /> Upload New
                  </button>
                  <button
                    type="button"
                    onClick={() => setImageSelectionMode("media")}
                    style={{
                      padding: "8px 16px",
                      backgroundColor: imageSelectionMode === "media" ? "#2D2B7F" : "#f8f9fa",
                      color: imageSelectionMode === "media" ? "#fff" : "#666",
                      border: "1px solid #ddd",
                      borderRadius: "4px",
                      cursor: "pointer",
                      fontSize: "14px",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px"
                    }}
                  >
                    <FaFolder /> Select from Media
                  </button>
                </div>

                {imageSelectionMode === "upload" ? (
                  <>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleImageUpload(file);
                      }}
                      disabled={uploading}
                      style={{
                        width: "100%",
                        padding: "8px",
                        border: "1px solid #ddd",
                        borderRadius: "4px",
                        fontSize: "14px"
                      }}
                    />
                    {uploading && <div style={{ marginTop: "8px", color: "#666", fontSize: "14px" }}>Uploading...</div>}
                  </>
                ) : (
                  <button
                    type="button"
                    onClick={handleSelectFromMedia}
                    style={{
                      width: "100%",
                      padding: "12px",
                      backgroundColor: "#f8f9fa",
                      color: "#666",
                      border: "2px dashed #ddd",
                      borderRadius: "4px",
                      cursor: "pointer",
                      fontSize: "14px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "8px"
                    }}
                  >
                    <FaFolder /> Browse Media Library
                  </button>
                )}
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
                <div>
                  <label style={{ display: "block", marginBottom: "6px", fontSize: "14px", fontWeight: 500 }}>
                    Sort Order
                  </label>
                  <input
                    type="number"
                    value={formData.sortOrder}
                    onChange={(e) => setFormData({ ...formData, sortOrder: parseInt(e.target.value) || 0 })}
                    style={{
                      width: "100%",
                      padding: "10px 12px",
                      border: "1px solid #ddd",
                      borderRadius: "4px",
                      fontSize: "14px"
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", marginBottom: "6px", fontSize: "14px", fontWeight: 500 }}>
                    Status
                  </label>
                  <select
                    value={formData.isActive ? "true" : "false"}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.value === "true" })}
                    style={{
                      width: "100%",
                      padding: "10px 12px",
                      border: "1px solid #ddd",
                      borderRadius: "4px",
                      fontSize: "14px"
                    }}
                  >
                    <option value="true">Active</option>
                    <option value="false">Inactive</option>
                  </select>
                </div>
              </div>

              <div style={{ display: "flex", gap: "12px", justifyContent: "flex-end" }}>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  style={{
                    padding: "10px 16px",
                    backgroundColor: "#6c757d",
                    color: "#fff",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                    fontSize: "14px"
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={uploading}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "10px 16px",
                    backgroundColor: "#2D2B7F",
                    color: "#fff",
                    border: "none",
                    borderRadius: "4px",
                    cursor: uploading ? "not-allowed" : "pointer",
                    fontSize: "14px",
                    opacity: uploading ? 0.6 : 1
                  }}
                >
                  <FaSave /> Save Certificate
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Media Selection Modal */}
      {showMediaModal && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0,0,0,0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1100
        }}>
          <div style={{
            backgroundColor: "#fff",
            borderRadius: "8px",
            padding: "24px",
            width: "800px",
            maxHeight: "90vh",
            overflow: "auto"
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <h3 style={{ margin: 0, fontSize: "18px", fontWeight: 600 }}>
                Select Image from Media Library
              </h3>
              <button
                onClick={() => setShowMediaModal(false)}
                style={{
                  background: "none",
                  border: "none",
                  fontSize: "18px",
                  cursor: "pointer",
                  color: "#666"
                }}
              >
                <FaTimes />
              </button>
            </div>

            {/* Media Search */}
            <div style={{ marginBottom: "20px", display: "flex", gap: "16px", alignItems: "center" }}>
              <div style={{ position: "relative", flexGrow: 1 }}>
                <FaSearch style={{
                  position: "absolute",
                  left: "12px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "#666",
                  fontSize: "14px"
                }} />
                <input
                  type="text"
                  placeholder="Search media files..."
                  value={mediaSearchQuery}
                  onChange={(e) => {
                    setMediaSearchQuery(e.target.value);
                    setMediaCurrentPage(1); // Reset to first page when search changes
                  }}
                  style={{
                    width: "100%",
                    padding: "10px 12px 10px 36px",
                    border: "1px solid #ddd",
                    borderRadius: "6px",
                    fontSize: "14px",
                    outline: "none"
                  }}
                />
              </div>
              <div style={{ color: "#666", fontSize: "14px", whiteSpace: "nowrap" }}>
                {filteredMediaFiles.length} image{filteredMediaFiles.length !== 1 ? 's' : ''} found
              </div>
            </div>

            {loadingMedia ? (
              <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "200px" }}>
                <div>Loading media files...</div>
              </div>
            ) : filteredMediaFiles.length === 0 ? (
              <div style={{ 
                textAlign: "center", 
                color: "#666", 
                padding: "40px",
                border: "2px dashed #ddd",
                borderRadius: "8px"
              }}>
                <FaImage style={{ fontSize: "48px", marginBottom: "16px", opacity: 0.5 }} />
                <p>{mediaSearchQuery ? "No images found matching your search." : "No images found in media library"}</p>
                <p style={{ fontSize: "14px", margin: 0 }}>
                  {mediaSearchQuery ? "Try a different search term." : "Upload some images first to select them here"}
                </p>
              </div>
            ) : (
              <>
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
                  gap: "16px",
                  marginBottom: "20px"
                }}>
                  {currentMediaFiles.map((file) => (
                  <div
                    key={file.id}
                    onClick={() => handleSelectImage(file.url)}
                    style={{
                      border: "2px solid #ddd",
                      borderRadius: "8px",
                      overflow: "hidden",
                      cursor: "pointer",
                      transition: "border-color 0.2s"
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.borderColor = "#2D2B7F"}
                    onMouseLeave={(e) => e.currentTarget.style.borderColor = "#ddd"}
                  >
                    <img
                      src={file.url}
                      alt={file.name}
                      style={{
                        width: "100%",
                        height: "120px",
                        objectFit: "cover",
                        display: "block"
                      }}
                    />
                    <div style={{
                      padding: "8px",
                      backgroundColor: "#f8f9fa",
                      borderTop: "1px solid #ddd"
                    }}>
                      <div style={{
                        fontSize: "12px",
                        fontWeight: 500,
                        color: "#333",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap"
                      }}>
                        {file.name}
                      </div>
                      <div style={{
                        fontSize: "11px",
                        color: "#666",
                        marginTop: "2px"
                      }}>
                        {Math.round(file.size / 1024)} KB
                      </div>
                    </div>
                  </div>
                ))}
              </div>
                
              {/* Media Pagination */}
              {totalMediaPages > 1 && (
                <div style={{ 
                  padding: "16px 0",
                  borderTop: "1px solid #e9ecef",
                  display: "flex", 
                  justifyContent: "space-between", 
                  alignItems: "center"
                }}>
                  <div style={{ fontSize: "14px", color: "#666" }}>
                    Showing {mediaStartIndex + 1} to {Math.min(mediaEndIndex, filteredMediaFiles.length)} of {filteredMediaFiles.length} images
                  </div>
                  <div style={{ display: "flex", gap: "4px", alignItems: "center" }}>
                    <button
                      onClick={() => setMediaCurrentPage(Math.max(1, mediaCurrentPage - 1))}
                      disabled={mediaCurrentPage === 1}
                      style={{
                        padding: "6px 12px",
                        backgroundColor: mediaCurrentPage === 1 ? "#f8f9fa" : "#fff",
                        color: mediaCurrentPage === 1 ? "#ccc" : "#333",
                        border: "1px solid #ddd",
                        borderRadius: "4px",
                        cursor: mediaCurrentPage === 1 ? "not-allowed" : "pointer",
                        fontSize: "14px",
                        display: "flex",
                        alignItems: "center"
                      }}
                    >
                      <FaChevronLeft />
                    </button>
                    
                    {Array.from({ length: totalMediaPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => setMediaCurrentPage(page)}
                        style={{
                          padding: "6px 12px",
                          backgroundColor: mediaCurrentPage === page ? "#2D2B7F" : "#fff",
                          color: mediaCurrentPage === page ? "#fff" : "#333",
                          border: "1px solid #ddd",
                          borderRadius: "4px",
                          cursor: "pointer",
                          fontSize: "14px",
                          minWidth: "36px"
                        }}
                      >
                        {page}
                      </button>
                    ))}
                    
                    <button
                      onClick={() => setMediaCurrentPage(Math.min(totalMediaPages, mediaCurrentPage + 1))}
                      disabled={mediaCurrentPage === totalMediaPages}
                      style={{
                        padding: "6px 12px",
                        backgroundColor: mediaCurrentPage === totalMediaPages ? "#f8f9fa" : "#fff",
                        color: mediaCurrentPage === totalMediaPages ? "#ccc" : "#333",
                        border: "1px solid #ddd",
                        borderRadius: "4px",
                        cursor: mediaCurrentPage === totalMediaPages ? "not-allowed" : "pointer",
                        fontSize: "14px",
                        display: "flex",
                        alignItems: "center"
                      }}
                    >
                      <FaChevronRight />
                    </button>
                  </div>
                </div>
              )}
              </>
            )}

            <div style={{ 
              display: "flex", 
              justifyContent: "flex-end", 
              marginTop: "20px",
              paddingTop: "20px",
              borderTop: "1px solid #e9ecef"
            }}>
              <button
                onClick={() => setShowMediaModal(false)}
                style={{
                  padding: "10px 16px",
                  backgroundColor: "#6c757d",
                  color: "#fff",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontSize: "14px"
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}