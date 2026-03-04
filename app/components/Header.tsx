"use client";

import { useState, useEffect, useRef } from "react";
import { FaSearch } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/navigation";

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
  const router = useRouter();
  const searchRef = useRef<HTMLDivElement>(null);

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
    console.log("🔍 fetchSearchResults called with query:", query);
    
    if (!query.trim()) {
      console.log("⚠️ Empty query, clearing results");
      setSearchResults([]);
      setShowResults(false);
      return;
    }

    setIsLoading(true);
    setShowResults(true);
    console.log("📍 setShowResults(true), setIsLoading(true)");
    
    try {
      const url = `/api/products?search=${encodeURIComponent(query)}&limit=8`;
      console.log("📡 Fetching from URL:", url);
      
      const response = await fetch(url);
      console.log("📥 Response status:", response.status);
      
      const data = await response.json();
      console.log("📦 Response data:", data);
      
      if (data.products && Array.isArray(data.products)) {
        console.log("✅ Found products:", data.products.length);
        const results = data.products.map((product: any) => ({
          id: product.id,
          name: product.name,
          catalogNumber: product.catalogNumber,
          slug: product.catalogNumber || product.id,
        }));
        console.log("📋 Mapped results:", results);
        setSearchResults(results);
      } else {
        console.log("❌ No products in response");
        setSearchResults([]);
      }
    } catch (error) {
      console.error("🚨 Search error:", error);
      setSearchResults([]);
    } finally {
      setIsLoading(false);
      console.log("✋ setIsLoading(false)");
    }
  };

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    console.log("⌨️ Input changed:", value);
    setSearchQuery(value);

    const charCount = value.trim().length;
    console.log("📝 Character count:", charCount);
    
    if (charCount >= 3) {
      console.log("✨ Triggering search - char count >= 3");
      setShowResults(true);
      fetchSearchResults(value);
    } else if (value.trim() === "") {
      console.log("🧹 Clearing results - input empty");
      setSearchResults([]);
      setShowResults(false);
    } else {
      console.log("⏳ Waiting - char count < 3");
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
    <header className="main-header">
      <div className="main-header-container">
        {/* Logo */}
        <Link href="/" className="header-logo-section" style={{ textDecoration: "none" }}>
          {settings.site_logo && (
            <div className="header-logo-icon">
              <img
                src={settings.site_logo}
                alt={settings.site_name || "Logo"}
                style={{ height: "80px", maxWidth: "200px", objectFit: "contain" }}
              />
            </div>
          )}
        </Link>

{/* Right - Search Bar */}
        <div className="header-search-section" ref={searchRef} >
          <div className="header-search-bar" style={{ position: "relative" }}>
            <input
              type="text"
              className="header-search-input"
              placeholder="Type the Product Name , Product id, CAS  N0"
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
      </div>
    </header>
  );
}
