"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface Publication {
  pmid?: string;
  paper_title: string;
  paper_author?: string;
  publish_to?: string;
  paper_url?: string;
  paper_sort?: string;
  paper_abstract?: string;
  id?: string;
  title?: string;
  description?: string;
  authors?: string;
  journal?: string;
  year?: string;
  url?: string;
  image?: string;
  abstract?: string;
}

export default function PublicationsPage() {
  const [publications, setPublications] = useState<Publication[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPublications, setFilteredPublications] = useState<Publication[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const itemsPerPage = 20;

  useEffect(() => {
    fetchPublications();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredPublications(publications);
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = publications.filter(
        (pub) =>
          pub.paper_title?.toLowerCase().includes(query) ||
          pub.paper_author?.toLowerCase().includes(query) ||
          pub.publish_to?.toLowerCase().includes(query) ||
          pub.paper_abstract?.toLowerCase().includes(query) ||
          pub.title?.toLowerCase().includes(query) ||
          pub.authors?.toLowerCase().includes(query) ||
          pub.journal?.toLowerCase().includes(query) ||
          pub.abstract?.toLowerCase().includes(query)
      );
      setFilteredPublications(filtered);
    }
  }, [searchQuery, publications]);

  const fetchPublications = async (page: number = 1) => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`/api/publications?page=${page}`);
      
      if (!response.ok) {
        throw new Error("Failed to fetch publications");
      }

      const data = await response.json();
      
      let pubsArray: Publication[] = [];
      let pageCount = 1;
      let count = 0;

      if (Array.isArray(data)) {
        pubsArray = data;
      } else if (data.data && data.data.data && Array.isArray(data.data.data)) {
        pubsArray = data.data.data;
        pageCount = parseInt(data.data.page_count) || 1;
        count = parseInt(data.data.count) || pubsArray.length;
      } else if (data.data && Array.isArray(data.data)) {
        pubsArray = data.data;
      }
      
      setPublications(pubsArray);
      setFilteredPublications(pubsArray);
      setTotalPages(pageCount);
      setTotalCount(count);
      setCurrentPage(page);
    } catch (err) {
      console.error("Error fetching publications:", err);
      setError("Failed to load publications. Please try again later.");
      setPublications([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "#fff" }}>
      <section style={{ width: "100%", padding: "50px 40px", background: "#f5f5f5" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <h1
            style={{
              fontSize: "40px",
              fontWeight: "800",
              color: "#171717",
              margin: "0 0 16px 0",
            }}
          >
            Publications
          </h1>
          <p
            style={{
              fontSize: "16px",
              lineHeight: "1.7",
              color: "#555",
              margin: "0",
              maxWidth: "700px",
            }}
          >
            Explore our collection of scientific publications and research papers
          </p>
        </div>
      </section>

      <hr style={{ border: "none", borderTop: "1px solid #e0e0e0", margin: "0" }} />

      <section style={{ maxWidth: "1400px", margin: "0 auto", padding: "50px 40px" }}>
        <div style={{ marginBottom: "40px" }}>
          <div style={{ position: "relative", maxWidth: "500px" }}>
            <input
              type="text"
              placeholder="Search publications by title, author, or journal..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: "100%",
                padding: "12px 16px",
                fontSize: "14px",
                border: "1px solid #e0e0e0",
                borderRadius: "6px",
                boxSizing: "border-box",
              }}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                style={{
                  position: "absolute",
                  right: "12px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  fontSize: "18px",
                  cursor: "pointer",
                  color: "#999",
                }}
              >
                ✕
              </button>
            )}
          </div>
          {searchQuery && (
            <p style={{ marginTop: "12px", fontSize: "13px", color: "#666" }}>
              Found {filteredPublications.length} publication{filteredPublications.length !== 1 ? "s" : ""}
            </p>
          )}
        </div>

        {loading ? (
          <div style={{ padding: "40px", textAlign: "center" }}>
            <div
              style={{
                display: "inline-block",
                width: "30px",
                height: "30px",
                border: "3px solid #f0f0f0",
                borderTop: "3px solid var(--primary, #2c3e50)",
                borderRadius: "50%",
                animation: "spin 0.8s linear infinite",
              }}
            />
            <p style={{ marginTop: "16px", color: "#666" }}>Loading publications...</p>
          </div>
        ) : error ? (
          <div
            style={{
              padding: "40px",
              textAlign: "center",
              background: "#fee",
              borderRadius: "6px",
              border: "1px solid #fcc",
              color: "#c33",
            }}
          >
            {error}
          </div>
        ) : filteredPublications.length > 0 ? (
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            {filteredPublications.map((pub) => (
              <a
                key={pub.pmid || pub.id}
                href={pub.paper_url || pub.url || "#"}
                target={pub.paper_url || pub.url ? "_blank" : "_self"}
                rel={pub.paper_url || pub.url ? "noopener noreferrer" : ""}
                style={{
                  background: "#fff",
                  border: "1px solid #e0e0e0",
                  borderRadius: "8px",
                  overflow: "hidden",
                  transition: "all 0.3s ease",
                  display: "flex",
                  gap: "20px",
                  textDecoration: "none",
                  color: "inherit",
                  cursor: (pub.paper_url || pub.url) ? "pointer" : "default",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = "0 8px 24px rgba(0, 0, 0, 0.12)";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = "none";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                {(pub.image) && (
                  <div
                    style={{
                      flex: "0 0 200px",
                      overflow: "hidden",
                      background: "#f5f5f5",
                    }}
                  >
                    <img
                      src={pub.image}
                      alt={pub.paper_title || pub.title}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                )}
                <div style={{ flex: 1, padding: "24px", display: "flex", flexDirection: "column" }}>
                  <h3
                    style={{
                      margin: "0 0 12px 0",
                      fontSize: "18px",
                      fontWeight: "700",
                      color: "#171717",
                      lineHeight: "1.4",
                    }}
                  >
                    {pub.paper_title || pub.title}
                  </h3>

                  {(pub.paper_author || pub.authors) && (
                    <p
                      style={{
                        margin: "0 0 8px 0",
                        fontSize: "13px",
                        color: "#666",
                        fontStyle: "italic",
                      }}
                    >
                      {pub.paper_author || pub.authors}
                    </p>
                  )}

                  {(pub.publish_to || pub.journal || pub.paper_sort) && (
                    <p
                      style={{
                        margin: "0 0 12px 0",
                        fontSize: "13px",
                        color: "#999",
                      }}
                    >
                      {(pub.publish_to || pub.journal) && <span>{pub.publish_to || pub.journal}</span>}
                      {pub.paper_sort && <span> | Impact Factor: {pub.paper_sort}</span>}
                    </p>
                  )}

                  {(pub.paper_abstract || pub.abstract) && (
                    <p
                      style={{
                        margin: "0 0 12px 0",
                        fontSize: "13px",
                        color: "#555",
                        lineHeight: "1.6",
                        flex: 1,
                      }}
                    >
                      {(pub.paper_abstract || pub.abstract || "").length > 200
                        ? `${(pub.paper_abstract || pub.abstract || "").substring(0, 200)}...`
                        : pub.paper_abstract || pub.abstract}
                    </p>
                  )}

                  {(pub.description) && !pub.paper_abstract && !pub.abstract && (
                    <p
                      style={{
                        margin: "0",
                        fontSize: "13px",
                        color: "#555",
                        lineHeight: "1.6",
                        flex: 1,
                      }}
                    >
                      {pub.description.length > 200
                        ? `${pub.description.substring(0, 200)}...`
                        : pub.description}
                    </p>
                  )}
                </div>
              </a>
            ))}
          </div>
        ) : (
          <div style={{ textAlign: "center", color: "#999", padding: "40px" }}>
            {searchQuery
              ? "No publications found matching your search"
              : "No publications available"}
          </div>
        )}

        {filteredPublications.length > 0 && !searchQuery && (
          <div style={{ marginTop: "60px", paddingTop: "40px", borderTop: "1px solid #e0e0e0" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" }}>
              <p style={{ margin: "0", fontSize: "14px", color: "#666" }}>
                Showing page <strong>{currentPage}</strong> of <strong>{totalPages}</strong> | Total publications: <strong>{totalCount}</strong>
              </p>
            </div>

            <div style={{ display: "flex", justifyContent: "center", gap: "8px", flexWrap: "wrap" }}>
              <button
                onClick={() => fetchPublications(1)}
                disabled={currentPage === 1 || loading}
                style={{
                  padding: "10px 16px",
                  fontSize: "13px",
                  border: "1px solid #e0e0e0",
                  background: currentPage === 1 ? "#f5f5f5" : "#fff",
                  borderRadius: "4px",
                  cursor: currentPage === 1 || loading ? "not-allowed" : "pointer",
                  color: currentPage === 1 ? "#999" : "#333",
                  fontWeight: 500,
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  if (currentPage !== 1 && !loading) {
                    e.currentTarget.style.background = "var(--primary, #2c3e50)";
                    e.currentTarget.style.color = "#fff";
                    e.currentTarget.style.borderColor = "var(--primary, #2c3e50)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (currentPage !== 1 && !loading) {
                    e.currentTarget.style.background = "#fff";
                    e.currentTarget.style.color = "#333";
                    e.currentTarget.style.borderColor = "#e0e0e0";
                  }
                }}
              >
                ← First
              </button>

              <button
                onClick={() => fetchPublications(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1 || loading}
                style={{
                  padding: "10px 16px",
                  fontSize: "13px",
                  border: "1px solid #e0e0e0",
                  background: currentPage === 1 ? "#f5f5f5" : "#fff",
                  borderRadius: "4px",
                  cursor: currentPage === 1 || loading ? "not-allowed" : "pointer",
                  color: currentPage === 1 ? "#999" : "#333",
                  fontWeight: 500,
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  if (currentPage !== 1 && !loading) {
                    e.currentTarget.style.background = "var(--primary, #2c3e50)";
                    e.currentTarget.style.color = "#fff";
                    e.currentTarget.style.borderColor = "var(--primary, #2c3e50)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (currentPage !== 1 && !loading) {
                    e.currentTarget.style.background = "#fff";
                    e.currentTarget.style.color = "#333";
                    e.currentTarget.style.borderColor = "#e0e0e0";
                  }
                }}
              >
                ← Previous
              </button>

              <div style={{ display: "flex", gap: "4px", alignItems: "center" }}>
                <span style={{ fontSize: "13px", color: "#666" }}>Page:</span>
                <input
                  type="number"
                  min="1"
                  max={totalPages}
                  value={currentPage}
                  onChange={(e) => {
                    const page = parseInt(e.target.value);
                    if (page >= 1 && page <= totalPages) {
                      fetchPublications(page);
                    }
                  }}
                  style={{
                    width: "60px",
                    padding: "8px 12px",
                    fontSize: "13px",
                    border: "1px solid #e0e0e0",
                    borderRadius: "4px",
                    textAlign: "center",
                  }}
                />
                <span style={{ fontSize: "13px", color: "#666" }}>of {totalPages}</span>
              </div>

              <button
                onClick={() => fetchPublications(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages || loading}
                style={{
                  padding: "10px 16px",
                  fontSize: "13px",
                  border: "1px solid #e0e0e0",
                  background: currentPage === totalPages ? "#f5f5f5" : "#fff",
                  borderRadius: "4px",
                  cursor: currentPage === totalPages || loading ? "not-allowed" : "pointer",
                  color: currentPage === totalPages ? "#999" : "#333",
                  fontWeight: 500,
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  if (currentPage !== totalPages && !loading) {
                    e.currentTarget.style.background = "var(--primary, #2c3e50)";
                    e.currentTarget.style.color = "#fff";
                    e.currentTarget.style.borderColor = "var(--primary, #2c3e50)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (currentPage !== totalPages && !loading) {
                    e.currentTarget.style.background = "#fff";
                    e.currentTarget.style.color = "#333";
                    e.currentTarget.style.borderColor = "#e0e0e0";
                  }
                }}
              >
                Next →
              </button>

              <button
                onClick={() => fetchPublications(totalPages)}
                disabled={currentPage === totalPages || loading}
                style={{
                  padding: "10px 16px",
                  fontSize: "13px",
                  border: "1px solid #e0e0e0",
                  background: currentPage === totalPages ? "#f5f5f5" : "#fff",
                  borderRadius: "4px",
                  cursor: currentPage === totalPages || loading ? "not-allowed" : "pointer",
                  color: currentPage === totalPages ? "#999" : "#333",
                  fontWeight: 500,
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  if (currentPage !== totalPages && !loading) {
                    e.currentTarget.style.background = "var(--primary, #2c3e50)";
                    e.currentTarget.style.color = "#fff";
                    e.currentTarget.style.borderColor = "var(--primary, #2c3e50)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (currentPage !== totalPages && !loading) {
                    e.currentTarget.style.background = "#fff";
                    e.currentTarget.style.color = "#333";
                    e.currentTarget.style.borderColor = "#e0e0e0";
                  }
                }}
              >
                Last →
              </button>
            </div>
          </div>
        )}
      </section>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
