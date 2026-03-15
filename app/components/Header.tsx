"use client";

import { useState, useEffect, useRef } from "react";
import { FaSearch, FaBars, FaTimes } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/navigation";
import MenuSection from "./MenuSection";

interface SiteSettings {
  site_name?: string;
  site_logo?: string;
}

interface SearchResult {
  id: string;
  name: string;
  catalogNumber?: string;
  slug?: string;
}

export default function Header() {
  const [settings, setSettings] = useState<SiteSettings>({});
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showResearchModal, setShowResearchModal] = useState(false);
  const [showMobileSearchModal, setShowMobileSearchModal] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();
  const searchRef = useRef<HTMLDivElement>(null);
  const mobileSearchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/api/settings")
      .then((r) => r.json())
      .then((data) => {
        setSettings({
          site_name: data.site_name || "",
          site_logo: data.site_logo || "",
        });
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const fetchSearchResults = async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      setShowResults(false);
      return;
    }

    setIsLoading(true);
    setShowResults(true);
    
    try {
      const url = `/api/products?search=${encodeURIComponent(query)}&limit=8`;
      const response = await fetch(url);
      const data = await response.json();
      
      if (data.products && Array.isArray(data.products)) {
        const results = data.products.map((product: any) => ({
          id: product.id,
          name: product.name,
          catalogNumber: product.catalogNumber,
          slug: product.catalogNumber || product.id,
        }));
        setSearchResults(results);
      } else {
        setSearchResults([]);
      }
    } catch (error) {
      console.error("Search error:", error);
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);

    const charCount = value.trim().length;
    
    if (charCount >= 3) {
      setShowResults(true);
      fetchSearchResults(value);
    } else if (value.trim() === "") {
      setSearchResults([]);
      setShowResults(false);
    }
  };

  const handleSelectResult = (slug: string) => {
    router.push(`/products/${slug}`);
    setShowResults(false);
    setSearchQuery("");
    setSearchResults([]);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setShowResults(false);
      setSearchQuery("");
      setSearchResults([]);
    }
  };

  return (
    <>
    <header className="main-header">
      <div className="main-header-container">
        {/* Logo */}
        <Link href="/" className="header-logo-section" style={{ textDecoration: "none" }}>
          {settings.site_logo && (
            <div className="header-logo-icon">
              <img
                src={settings.site_logo}
                alt={settings.site_name || "Logo"}
                style={{ height: "100px", maxWidth: "250px", objectFit: "contain" }}
              />
            </div>
          )}
        </Link>

{/* Center - Search Bar */}
        <div className="header-search-section" ref={searchRef} >
          <div className="header-search-bar" style={{ position: "relative" }}>
            <input
              type="text"
              className="header-search-input"
              placeholder="Type the Product Name, Product id, CAS No"
              value={searchQuery}
              onChange={handleSearchInputChange}
              onKeyPress={handleKeyPress}
              autoComplete="off"
            />
            <button 
              className="header-search-btn" 
              aria-label="Search"
            >
              <FaSearch />
            </button>

            {/* Search Results Dropdown */}
            {showResults && (
              <div
                style={{
                  position: "absolute",
                  top: "calc(100% + 4px)",
                  left: 0,
                  right: 0,
                  background: "#fff",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  boxShadow: "0 8px 24px rgba(0, 0, 0, 0.2)",
                  zIndex: 10000,
                  maxHeight: "400px",
                  overflowY: "auto",
                  minWidth: "100%",
                  display: "block",
              
                }}
              >
                {isLoading ? (
                  <div style={{ padding: "16px", textAlign: "center" }}>
                    <div style={{ 
                      display: "inline-block",
                      width: "20px",
                      height: "20px",
                      border: "3px solid #f0f0f0",
                      borderTop: "3px solid var(--primary, #2c3e50)",
                      borderRadius: "50%",
                      animation: "spin 0.8s linear infinite",
                    }} />
                    <div style={{ marginTop: "8px", fontSize: "13px", color: "#999" }}>
                      Loading...
                    </div>
                  </div>
                ) : searchResults.length > 0 ? (
                  searchResults.map((result) => (
                    <div
                      key={result.id}
                      onClick={() => handleSelectResult(result.slug || result.id)}
                      style={{
                        padding: "12px 16px",
                        borderBottom: "1px solid #f0f0f0",
                        cursor: "pointer",
                        transition: "background 0.2s",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = "#f5f5f5";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "transparent";
                      }}
                    >
                      <div style={{ fontSize: "13px", fontWeight: 500, color: "#333" }}>
                        {result.name}
                      </div>
                      {result.catalogNumber && (
                        <div style={{ fontSize: "12px", color: "#999", marginTop: "4px" }}>
                          {result.catalogNumber}
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <div style={{ padding: "16px", textAlign: "center", color: "#999", fontSize: "13px" }}>
                    No products found
                  </div>
                )}
              </div>
            )}
            <style>{`
              @keyframes spin {
                to { transform: rotate(360deg); }
              }
            `}</style>
          </div>
        </div>

        {/* Mobile Search Icon - Hidden on desktop */}
        <button
          className="mobile-search-icon"
          onClick={() => setShowMobileSearchModal(true)}
          style={{
            display: "none", // Hidden by default, shown on mobile via CSS
            background: "none",
            border: "2px solid #2D2B7F",
            borderRadius: "6px",
            color: "#2D2B7F",
            padding: "8px",
            cursor: "pointer",
            fontSize: "16px",
            transition: "all 0.2s"
          }}
          aria-label="Open Search"
        >
          <FaSearch />
        </button>

        {/* Mobile Hamburger Menu - Hidden on desktop */}
        <button
          className="mobile-menu-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          style={{
            display: "none", // Hidden by default, shown on mobile via CSS
            background: "none",
            border: "2px solid #2D2B7F",
            borderRadius: "6px",
            color: "#2D2B7F",
            padding: "8px",
            cursor: "pointer",
            fontSize: "16px",
            transition: "all 0.2s",
            position: "relative",
            zIndex: 10000
          }}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Right - Request Research Product Button */}
        <div className="header-action-section">
          <button 
            onClick={() => setShowResearchModal(true)}
            style={{
              background: "#2D2B7F",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              padding: "12px 20px",
              fontSize: "14px",
              fontWeight: 600,
              cursor: "pointer",
              transition: "all 0.3s ease",
              whiteSpace: "nowrap"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#1e1a5c";
              e.currentTarget.style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#2D2B7F";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            Request a Research Product
          </button>
        </div>

        {/* Research Product Modal */}
        {showResearchModal && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              zIndex: 9999,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "20px"
            }}
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setShowResearchModal(false);
              }
            }}
          >
            <div
              style={{
                backgroundColor: "#fff",
                borderRadius: "12px",
                padding: "32px",
                maxWidth: "500px",
                width: "100%",
                maxHeight: "90vh",
                overflowY: "auto",
                boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)"
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
                <h2 style={{ margin: 0, fontSize: "24px", fontWeight: 600, color: "#333" }}>
                  Request a Research Product
                </h2>
                <button
                  onClick={() => setShowResearchModal(false)}
                  style={{
                    background: "none",
                    border: "none",
                    fontSize: "24px",
                    cursor: "pointer",
                    color: "#666",
                    padding: "0",
                    lineHeight: 1
                  }}
                >
                  ×
                </button>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  // Handle form submission
                  setShowResearchModal(false);
                }}
                style={{ display: "flex", flexDirection: "column", gap: "20px" }}
              >



                <div>
                  <label style={{ display: "block", fontSize: "14px", fontWeight: 500, color: "#333", marginBottom: "8px" }}>
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    style={{
                      width: "100%",
                      padding: "12px",
                      border: "1px solid #ddd",
                      borderRadius: "8px",
                      fontSize: "14px",
                      outline: "none",
                      boxSizing: "border-box"
                    }}
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "14px", fontWeight: 500, color: "#333", marginBottom: "8px" }}>
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    style={{
                      width: "100%",
                      padding: "12px",
                      border: "1px solid #ddd",
                      borderRadius: "8px",
                      fontSize: "14px",
                      outline: "none",
                      boxSizing: "border-box"
                    }}
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "14px", fontWeight: 500, color: "#333", marginBottom: "8px" }}>
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    style={{
                      width: "100%",
                      padding: "12px",
                      border: "1px solid #ddd",
                      borderRadius: "8px",
                      fontSize: "14px",
                      outline: "none",
                      boxSizing: "border-box"
                    }}
                    placeholder="Your phone number"
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "14px", fontWeight: 500, color: "#333", marginBottom: "8px" }}>
                    Organization
                  </label>
                  <input
                    type="text"
                    style={{
                      width: "100%",
                      padding: "12px",
                      border: "1px solid #ddd",
                      borderRadius: "8px",
                      fontSize: "14px",
                      outline: "none",
                      boxSizing: "border-box"
                    }}
                    placeholder="Company or institution name"
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "14px", fontWeight: 500, color: "#333", marginBottom: "8px" }}>
                    Additional Details
                  </label>
                  <textarea
                    rows={4}
                    style={{
                      width: "100%",
                      padding: "12px",
                      border: "1px solid #ddd",
                      borderRadius: "8px",
                      fontSize: "14px",
                      outline: "none",
                      resize: "vertical",
                      boxSizing: "border-box"
                    }}
                    placeholder="Any specific requirements, purity level, packaging preferences, or other details"
                  />
                </div>

                <div style={{ display: "flex", gap: "12px", justifyContent: "flex-end", marginTop: "8px" }}>
                  <button
                    type="button"
                    onClick={() => setShowResearchModal(false)}
                    style={{
                      padding: "12px 24px",
                      border: "1px solid #ddd",
                      borderRadius: "8px",
                      fontSize: "14px",
                      background: "#fff",
                      cursor: "pointer",
                      fontWeight: 500
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    style={{
                      padding: "12px 24px",
                      background: "#2D2B7F",
                      color: "#fff",
                      border: "none",
                      borderRadius: "8px",
                      fontSize: "14px",
                      fontWeight: 600,
                      cursor: "pointer"
                    }}
                  >
                    Submit Request
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Mobile Search Modal */}
        {showMobileSearchModal && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              zIndex: 9999,
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "center",
              padding: "20px",
              paddingTop: "60px"
            }}
            onClick={() => setShowMobileSearchModal(false)}
          >
            <div
              ref={mobileSearchRef}
              style={{
                background: "#fff",
                borderRadius: "12px",
                padding: "24px",
                width: "100%",
                maxWidth: "500px",
                boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)"
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                <h2 style={{ margin: 0, fontSize: "20px", fontWeight: 600, color: "#333" }}>
                  Search Products
                </h2>
                <button
                  onClick={() => setShowMobileSearchModal(false)}
                  style={{
                    background: "none",
                    border: "none",
                    fontSize: "24px",
                    cursor: "pointer",
                    color: "#666",
                    padding: "0",
                    lineHeight: 1
                  }}
                >
                  ×
                </button>
              </div>

              <div style={{ position: "relative" }}>
                <input
                  type="text"
                  placeholder="Type the Product Name, Product id, CAS No"
                  value={searchQuery}
                  onChange={handleSearchInputChange}
                  onKeyPress={handleKeyPress}
                  autoComplete="off"
                  autoFocus
                  style={{
                    width: "100%",
                    padding: "16px 50px 16px 16px",
                    border: "2px solid #e0e0e0",
                    borderRadius: "12px",
                    fontSize: "16px",
                    outline: "none",
                    transition: "border-color 0.2s",
                    boxSizing: "border-box"
                  }}
                  onFocus={(e) => e.target.style.borderColor = "#2D2B7F"}
                  onBlur={(e) => e.target.style.borderColor = "#e0e0e0"}
                />
                <button
                  style={{
                    position: "absolute",
                    right: "12px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "none",
                    border: "none",
                    color: "#666",
                    fontSize: "18px",
                    cursor: "pointer",
                    padding: "8px"
                  }}
                  aria-label="Search"
                >
                  <FaSearch />
                </button>

                {/* Mobile Search Results */}
                {showResults && (
                  <div
                    style={{
                      position: "absolute",
                      top: "calc(100% + 8px)",
                      left: 0,
                      right: 0,
                      background: "#fff",
                      border: "1px solid #e0e0e0",
                      borderRadius: "12px",
                      boxShadow: "0 8px 24px rgba(0, 0, 0, 0.15)",
                      zIndex: 10001,
                      maxHeight: "300px",
                      overflowY: "auto"
                    }}
                  >
                    {isLoading ? (
                      <div style={{ padding: "24px", textAlign: "center" }}>
                        <div style={{ 
                          display: "inline-block",
                          width: "24px",
                          height: "24px",
                          border: "3px solid #f0f0f0",
                          borderTop: "3px solid #2D2B7F",
                          borderRadius: "50%",
                          animation: "spin 1s linear infinite"
                        }} />
                        <p style={{ margin: "12px 0 0 0", color: "#666" }}>Searching...</p>
                      </div>
                    ) : searchResults.length > 0 ? (
                      searchResults.map((result) => (
                        <div
                          key={result.id}
                          onClick={() => {
                            handleSelectResult(result.slug || result.id);
                            setShowMobileSearchModal(false);
                          }}
                          style={{
                            padding: "16px",
                            borderBottom: "1px solid #f0f0f0",
                            cursor: "pointer",
                            transition: "background 0.2s"
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.background = "#f8f9fa"}
                          onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
                        >
                          <div style={{ fontWeight: 500, color: "#333", marginBottom: "4px" }}>
                            {result.name}
                          </div>
                          {result.catalogNumber && (
                            <div style={{ fontSize: "12px", color: "#666" }}>
                              Cat. No: {result.catalogNumber}
                            </div>
                          )}
                        </div>
                      ))
                    ) : searchQuery.length > 0 ? (
                      <div style={{ padding: "24px", textAlign: "center", color: "#666" }}>
                        No products found for "{searchQuery}"
                      </div>
                    ) : null}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Mobile Sticky Bottom Button */}
        <button
          className="mobile-sticky-button"
          onClick={() => setShowResearchModal(true)}
          style={{ display: "none" }} // Hidden by default, shown on mobile via CSS
        >
          Request a Research Product
        </button>
      </div>
    </header>

    <MenuSection 
      mobileMenuOpen={mobileMenuOpen} 
      setMobileMenuOpen={setMobileMenuOpen} 
    />
    </>
  );
}
