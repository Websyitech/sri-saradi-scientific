"use client";

import { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import Link from "next/link";

interface SiteSettings {
  site_name?: string;
  site_logo?: string;
}

export default function Header() {
  const [settings, setSettings] = useState<SiteSettings>({});

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
        <div className="header-search-section">
          <div className="header-search-bar">
            <input
              type="text"
              className="header-search-input"
              placeholder="Type the Product Name , Product id, CAS  N0"
            />
            <button className="header-search-btn" aria-label="Search">
              <FaSearch />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
