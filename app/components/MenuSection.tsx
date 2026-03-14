"use client";

import { useState, useEffect, useRef } from "react";
import { FaBars, FaTimes, FaChevronDown } from "react-icons/fa";
import Link from "next/link";

const leftMenuItems = [
  { label: "Home", href: "/", active: true },
  { label: "Products", href: "/products", hasMegaMenu: true },
  { label: "Lab Consumables", href: "#", hasDropdown: true },
  { label: "CRO Services", href: "/cro-services", hasDropdown: true },
  { label: "Resources", href: "/resources", hasDropdown: true },
];

const rightMenuItems = [
  { label: "About us", href: "/about" },
  { label: "Carrers", href: "/careers" },
  { label: "Contact Us", href: "/contact" },
];

interface Level3Category {
  id: string;
  name: string;
  slug: string;
  color: string;
  image: string | null;
}

interface Level2Category {
  id: string;
  name: string;
  slug: string;
  color: string;
  image: string | null;
  children: Level3Category[];
}

interface Category {
  id: string;
  name: string;
  slug: string;
  color: string;
}

interface ApplicationCategory {
  id: string;
  title: string;
  items: Array<{
    id: string;
    name: string;
  }>;
}

interface KitProduct {
  id: string;
  title: string;
  slug: string;
  image: string;
  href: string;
}

interface CROService {
  id: string;
  slug: string;
  title: string;
  heading?: string;
}

interface SignalingPathway {
  id: string;
  slug: string;
  title: string;
  heading?: string;
}

interface FAQ {
  id: string;
  slug: string;
  title: string;
  heading?: string;
}

export default function MenuSection() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showMegaMenu, setShowMegaMenu] = useState<string | null>(null);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const [mobileSubmenu, setMobileSubmenu] = useState<string | null>(null);
  const [categories, setCategories] = useState<Level2Category[]>([]);
  const [applications, setApplications] = useState<ApplicationCategory[]>([]);
  const [kitProducts, setKitProducts] = useState<KitProduct[]>([]);
  const [croServices, setCroServices] = useState<CROService[]>([]);
  const [signalingPathways, setSignalingPathways] = useState<SignalingPathway[]>([]);
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [menuTop, setMenuTop] = useState(0);
  const menuContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/api/solarbio/categories-hierarchical")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setCategories(data);
        }
      })
      .catch(() => {});

    fetch("/api/applications")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setApplications(data);
        }
      })
      .catch(() => {});

    fetch("/api/kit-products")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setKitProducts(data);
        }
      })
      .catch(() => {});

    fetch("/api/cro-services")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setCroServices(data);
        }
      })
      .catch(() => {});

    fetch("/api/signaling-pathways")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setSignalingPathways(data);
        }
      })
      .catch(() => {});

    fetch("/api/faqs")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setFaqs(data);
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (menuContainerRef.current && showMegaMenu) {
      const rect = menuContainerRef.current.getBoundingClientRect();
      setMenuTop(rect.bottom);
    }
  }, [showMegaMenu]);

  const handleMouseEnter = (itemLabel: string) => {
    setShowMegaMenu(itemLabel);
  };

  const handleMouseLeave = () => {
    setShowMegaMenu(null);
  };

  return (
    <>
      <style>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
      <nav className="menu-section">
        <div className="menu-container" ref={menuContainerRef}>
        {/* Left Menu Items */}
        <ul className="menu-list menu-list-left">
          {leftMenuItems.map((item: any) => (
            <li
              key={item.label}
              className={`menu-item ${item.active ? "menu-item-active" : ""}`}
              style={{ position: "relative" }}
              onMouseEnter={() => (item.hasMegaMenu || item.hasDropdown) && handleMouseEnter(item.label)}
              onMouseLeave={() => (item.hasMegaMenu || item.hasDropdown) && handleMouseLeave()}
            >
              <a href={item.href} className="menu-link" style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                {item.label}
                {(item.hasMegaMenu || item.hasDropdown) && <FaChevronDown style={{ fontSize: "11px" }} />}
              </a>

              {/* Mega Menu Dropdown */}
              {item.hasMegaMenu && showMegaMenu === item.label && (
                <div
                  style={{
                    position: "fixed",
                    top: `${menuTop}px`,
                    left: 0,
                    right: 0,
                    background: "#fff",
                    border: "1px solid #e0e0e0",
                    borderTop: "none",
                    borderRadius: "0",
                    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.12)",
                    padding: "20px 24px",
                    zIndex: 1000,
                    animation: "slideDown 0.3s ease-out forwards",
                  }}
                  onAnimationEnd={(e) => {
                    e.currentTarget.style.animation = "none";
                  }}
                >
                  {item.label === "Products" ? (
                    <>
                      <h4 style={{ margin: "0 0 14px 0", fontSize: "12px", fontWeight: 700, color: "#666", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                        Solarbio Categories
                      </h4>
                      <div 
                        style={{ display: "flex", gap: "30px", maxHeight: "400px", overflowY: "auto" }}
                        onMouseLeave={() => setActiveSubmenu(null)}
                      >
                        {/* Left Vertical List - Level 2 Categories */}
                        <div style={{ width: "200px", flex: "0 0 auto", overflowY: "auto" }}>
                          {categories.length > 0 ? (
                            categories.map((level2) => (
                              <div
                                key={level2.id}
                                onMouseEnter={() => setActiveSubmenu(level2.id)}
                                style={{
                                  position: "relative",
                                  marginBottom: "0",
                                }}
                              >
                                <Link
                                  href={`/products?brand=Solarbio&category=${level2.slug}`}
                                  onClick={() => handleMouseLeave()}
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "10px",
                                    padding: "12px 12px",
                                    borderRadius: "0",
                                    background: activeSubmenu === level2.id ? "#f5f5f5" : "transparent",
                                    borderLeft: activeSubmenu === level2.id ? `3px solid ${level2.color}` : "3px solid transparent",
                                    textDecoration: "none",
                                    transition: "all 0.2s",
                                    cursor: "pointer",
                                    fontSize: "13px",
                                    fontWeight: 500,
                                    color: "#333",
                                  }}
                                  onMouseEnter={(e) => {
                                    e.currentTarget.style.background = "#f5f5f5";
                                  }}
                                  onMouseLeave={(e) => {
                                    e.currentTarget.style.background = activeSubmenu === level2.id ? "#f5f5f5" : "transparent";
                                  }}
                                >
                                  <span style={{ flex: 1 }}>
                                    {level2.name}
                                  </span>
                                  {level2.children.length > 0 && (
                                    <span style={{ fontSize: "10px", color: "#999" }}>▶</span>
                                  )}
                                </Link>
                              </div>
                            ))
                          ) : (
                            <div style={{ padding: "16px", textAlign: "center", color: "#999", fontSize: "13px" }}>
                              Loading...
                            </div>
                          )}
                        </div>

                        {/* Right Grid - Level 3 Categories (appears on hover) */}
                        {activeSubmenu && (categories.find(c => c.id === activeSubmenu)?.children?.length ?? 0) > 0 && (
                          <div style={{ flex: 1, minWidth: "400px" }}>
                            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: "16px" }}>
                              {categories
                                .find(c => c.id === activeSubmenu)
                                ?.children?.map((level3) => (
                                  <Link
                                    key={level3.id}
                                    href={`/products?brand=Solarbio&category=${level3.slug}`}
                                    onClick={() => handleMouseLeave()}
                                    style={{
                                      display: "flex",
                                      flexDirection: "column",
                                      alignItems: "flex-start",
                                      gap: "0",
                                      padding: "0",
                                      background: "#f9f9f9",
                                      border: `1px solid #e0e0e0`,
                                      borderRadius: "6px",
                                      textDecoration: "none",
                                      transition: "all 0.2s",
                                      fontSize: "12px",
                                      color: "#555",
                                      overflow: "hidden",
                                    }}
                                    onMouseEnter={(e) => {
                                      e.currentTarget.style.background = "#fff";
                                      e.currentTarget.style.borderColor = "var(--primary)";
                                      e.currentTarget.style.color = "var(--primary)";
                                      e.currentTarget.style.boxShadow = "0 2px 8px rgba(45, 43, 127, 0.1)";
                                    }}
                                    onMouseLeave={(e) => {
                                      e.currentTarget.style.background = "#f9f9f9";
                                      e.currentTarget.style.borderColor = "#e0e0e0";
                                      e.currentTarget.style.color = "#555";
                                      e.currentTarget.style.boxShadow = "none";
                                    }}
                                  >
                                    {/* Image Area */}
                                    <div
                                      style={{
                                        width: "100%",
                                        aspectRatio: "1/1",
                                        background: level3.color ? `${level3.color}15` : "#e0e0e0",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        overflow: "hidden",
                                        borderBottom: `2px solid ${level3.color}`,
                                      }}
                                    >
                                      {level3.image ? (
                                        <img
                                          src={level3.image}
                                          alt={level3.name}
                                          style={{
                                            width: "100%",
                                            height: "100%",
                                            objectFit: "cover",
                                          }}
                                        />
                                      ) : (
                                        <span style={{ fontSize: "10px", color: "#999", textAlign: "center", padding: "8px" }}>
                                          No image
                                        </span>
                                      )}
                                    </div>
                                    
                                    {/* Text Area */}
                                    <div style={{ padding: "10px 12px", width: "100%" }}>
                                      {level3.name}
                                    </div>
                                  </Link>
                                ))}
                            </div>
                          </div>
                        )}
                      </div>
                      <div style={{ marginTop: "12px", paddingTop: "12px", borderTop: "1px solid #eee" }}>
                        <Link
                          href="/products?brand=Solarbio"
                          onClick={() => handleMouseLeave()}
                          style={{
                            fontSize: "12px",
                            fontWeight: 600,
                            color: "var(--primary)",
                            textDecoration: "none",
                            transition: "color 0.2s",
                          }}
                          onMouseEnter={(e) => (e.currentTarget.style.textDecoration = "underline")}
                          onMouseLeave={(e) => (e.currentTarget.style.textDecoration = "none")}
                        >
                          View All Products →
                        </Link>
                      </div>
                    </>
                  ) : item.label === "Applications" ? (
                    <>
                      <h4 style={{ margin: "0 0 14px 0", fontSize: "12px", fontWeight: 700, color: "#666", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                        Applications
                      </h4>
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "20px" }}>
                        {applications.length > 0 ? (
                          applications.map((appCat) => (
                            <div key={appCat.id}>
                              <div style={{ fontSize: "12px", fontWeight: 700, color: "#333", marginBottom: "8px" }}>
                                {appCat.title}
                              </div>
                              <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "4px" }}>
                                {appCat.items.map((item) => (
                                  <li key={item.id}>
                                    <a
                                      href={`/applications/${appCat.title.toLowerCase().replace(/\s+/g, "-")}/${item.name.toLowerCase().replace(/\s+/g, "-")}`}
                                      onClick={() => handleMouseLeave()}
                                      style={{
                                        fontSize: "12px",
                                        color: "#555",
                                        textDecoration: "none",
                                        transition: "color 0.2s",
                                      }}
                                      onMouseEnter={(e) => (e.currentTarget.style.color = "var(--primary)")}
                                      onMouseLeave={(e) => (e.currentTarget.style.color = "#555")}
                                    >
                                      {item.name}
                                    </a>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))
                        ) : (
                          <div style={{ padding: "16px", textAlign: "center", color: "#999", fontSize: "13px", gridColumn: "1 / -1" }}>
                            Loading...
                          </div>
                        )}
                      </div>
                      <div style={{ marginTop: "12px", paddingTop: "12px", borderTop: "1px solid #eee" }}>
                        <Link
                          href="/applications"
                          onClick={() => handleMouseLeave()}
                          style={{
                            fontSize: "12px",
                            fontWeight: 600,
                            color: "var(--primary)",
                            textDecoration: "none",
                            transition: "color 0.2s",
                          }}
                          onMouseEnter={(e) => (e.currentTarget.style.textDecoration = "underline")}
                          onMouseLeave={(e) => (e.currentTarget.style.textDecoration = "none")}
                        >
                          View All Applications →
                        </Link>
                      </div>
                    </>
                  ) : null}
                </div>
              )}

              {/* Simple Dropdown for Lab Consumables/CRO Services */}
              {item.hasDropdown && showMegaMenu === item.label && (
                <div
                  style={{
                    position: "absolute",
                    top: "100%",
                    left: 0,
                    background: "#fff",
                    border: "1px solid #e0e0e0",
                    borderRadius: "4px",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                    padding: "8px 0",
                    zIndex: 1000,
                    animation: "slideDown 0.3s ease-out forwards",
                    minWidth: "180px",
                  }}
                  onAnimationEnd={(e) => {
                    e.currentTarget.style.animation = "none";
                  }}
                >
                  {item.label === "CRO Services" ? (
                    croServices.length > 0 ? (
                      croServices.map((service) => (
                        <Link
                          key={service.id}
                          href={`/cro-services/${service.slug}`}
                          onClick={() => handleMouseLeave()}
                          style={{
                            display: "block",
                            padding: "10px 16px",
                            fontSize: "13px",
                            color: "#333",
                            textDecoration: "none",
                            transition: "all 0.2s",
                            cursor: "pointer",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = "#f5f5f5";
                            e.currentTarget.style.color = "var(--primary)";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = "transparent";
                            e.currentTarget.style.color = "#333";
                          }}
                        >
                          {service.title}
                        </Link>
                      ))
                    ) : (
                      <div style={{ padding: "10px 16px", textAlign: "center", color: "#999", fontSize: "12px" }}>
                        Loading...
                      </div>
                    )
                  ) : item.label === "Resources" ? (
                    <>
                      <Link
                        href="/signaling-pathways"
                        onClick={() => handleMouseLeave()}
                        style={{
                          display: "block",
                          padding: "10px 16px",
                          fontSize: "13px",
                          color: "#333",
                          textDecoration: "none",
                          transition: "all 0.2s",
                          cursor: "pointer",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = "#f5f5f5";
                          e.currentTarget.style.color = "var(--primary)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = "transparent";
                          e.currentTarget.style.color = "#333";
                        }}
                      >
                        Signaling Pathways
                      </Link>
                      <Link
                        href="/publications"
                        onClick={() => handleMouseLeave()}
                        style={{
                          display: "block",
                          padding: "10px 16px",
                          fontSize: "13px",
                          color: "#333",
                          textDecoration: "none",
                          transition: "all 0.2s",
                          cursor: "pointer",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = "#f5f5f5";
                          e.currentTarget.style.color = "var(--primary)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = "transparent";
                          e.currentTarget.style.color = "#333";
                        }}
                      >
                        Publications
                      </Link>
                      <Link
                        href="/faq"
                        onClick={() => handleMouseLeave()}
                        style={{
                          display: "block",
                          padding: "10px 16px",
                          fontSize: "13px",
                          color: "#333",
                          textDecoration: "none",
                          transition: "all 0.2s",
                          cursor: "pointer",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = "#f5f5f5";
                          e.currentTarget.style.color = "var(--primary)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = "transparent";
                          e.currentTarget.style.color = "#333";
                        }}
                      >
                        FAQ
                      </Link>
                    </>
                  ) : (
                    kitProducts.length > 0 ? (
                      kitProducts.map((product) => (
                        <Link
                          key={product.id}
                          href={`/lab-consumables/${product.slug}`}
                          onClick={() => handleMouseLeave()}
                          style={{
                            display: "block",
                            padding: "10px 16px",
                            fontSize: "13px",
                            color: "#333",
                            textDecoration: "none",
                            transition: "all 0.2s",
                            cursor: "pointer",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = "#f5f5f5";
                            e.currentTarget.style.color = "var(--primary)";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = "transparent";
                            e.currentTarget.style.color = "#333";
                          }}
                        >
                          {product.title}
                        </Link>
                      ))
                    ) : (
                      <div style={{ padding: "10px 16px", textAlign: "center", color: "#999", fontSize: "12px" }}>
                        Loading...
                      </div>
                    )
                  )}
                </div>
              )}
            </li>
          ))}
        </ul>

        {/* Right Menu Items */}
        <ul className="menu-list menu-list-right">
          {rightMenuItems.map((item) => (
            <li key={item.label} className="menu-item">
              <a href={item.href} className="menu-link">
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile Toggle */}
        <button
          className="menu-mobile-toggle"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="mobile-menu">
          <ul className="mobile-menu-list">
            {[...leftMenuItems, ...rightMenuItems].map((item: any) => (
              <li key={item.label} className="mobile-menu-item">
                {item.hasMegaMenu ? (
                  <>
                    <a href={item.href} className="mobile-menu-link" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      {item.label}
                      <FaChevronDown style={{ fontSize: "11px" }} />
                    </a>
                    {/* Mobile Mega Menu */}
                    <div style={{ marginTop: "8px", paddingBottom: "8px" }}>
                      {categories.length > 0 ? (
                        categories.map((level2) => (
                          <div key={level2.id}>
                            <div
                              onClick={() => setMobileSubmenu(mobileSubmenu === level2.id ? null : level2.id)}
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                padding: "10px 0",
                                fontSize: "13px",
                                color: "#333",
                                borderBottom: "1px solid #d0d0d0",
                                cursor: "pointer",
                              }}
                            >
                              <span>{level2.name}</span>
                              {level2.children.length > 0 && (
                                <span style={{ fontSize: "10px" }}>
                                  {mobileSubmenu === level2.id ? "▼" : "▶"}
                                </span>
                              )}
                            </div>
                            {mobileSubmenu === level2.id && level2.children.length > 0 && (
                              <div style={{ marginLeft: "16px", backgroundColor: "#f9f9f9" }}>
                                {level2.children.map((level3) => (
                                  <Link
                                    key={level3.id}
                                    href={`/products?brand=Solarbio&category=${level3.slug}`}
                                    onClick={() => setMobileOpen(false)}
                                    style={{
                                      display: "block",
                                      padding: "8px 0",
                                      fontSize: "12px",
                                      color: "#666",
                                      textDecoration: "none",
                                      borderBottom: "1px solid #e0e0e0",
                                    }}
                                  >
                                    {level3.name}
                                  </Link>
                                ))}
                              </div>
                            )}
                          </div>
                        ))
                      ) : (
                        <div style={{ fontSize: "12px", color: "#999", padding: "10px 0" }}>Loading...</div>
                      )}
                    </div>
                  </>
                ) : item.hasDropdown ? (
                  <>
                    <a href={item.href} className="mobile-menu-link" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      {item.label}
                      <FaChevronDown style={{ fontSize: "11px" }} />
                    </a>
                    {/* Mobile Simple Dropdown */}
                    <div style={{ marginTop: "8px", paddingBottom: "8px" }}>
                      {item.label === "CRO Services" ? (
                        croServices.length > 0 ? (
                          croServices.map((service) => (
                            <Link
                              key={service.id}
                              href={`/cro-services/${service.slug}`}
                              onClick={() => setMobileOpen(false)}
                              style={{
                                display: "block",
                                padding: "10px 0",
                                fontSize: "13px",
                                color: "#333",
                                textDecoration: "none",
                                borderBottom: "1px solid #d0d0d0",
                              }}
                            >
                              {service.title}
                            </Link>
                          ))
                        ) : (
                          <div style={{ fontSize: "12px", color: "#999", padding: "10px 0" }}>Loading...</div>
                        )
                      ) : item.label === "Resources" ? (
                        <>
                          <Link
                            href="/signaling-pathways"
                            onClick={() => setMobileOpen(false)}
                            style={{
                              display: "block",
                              padding: "10px 0",
                              fontSize: "13px",
                              color: "#333",
                              textDecoration: "none",
                              borderBottom: "1px solid #d0d0d0",
                            }}
                          >
                            Signaling Pathways
                          </Link>
                          <Link
                            href="/publications"
                            onClick={() => setMobileOpen(false)}
                            style={{
                              display: "block",
                              padding: "10px 0",
                              fontSize: "13px",
                              color: "#333",
                              textDecoration: "none",
                              borderBottom: "1px solid #d0d0d0",
                            }}
                          >
                            Publications
                          </Link>
                          <Link
                            href="/faq"
                            onClick={() => setMobileOpen(false)}
                            style={{
                              display: "block",
                              padding: "10px 0",
                              fontSize: "13px",
                              color: "#333",
                              textDecoration: "none",
                              borderBottom: "1px solid #d0d0d0",
                            }}
                          >
                            FAQ
                          </Link>
                        </>
                      ) : (
                        kitProducts.length > 0 ? (
                          kitProducts.map((product) => (
                            <Link
                              key={product.id}
                              href={`/lab-consumables/${product.slug}`}
                              onClick={() => setMobileOpen(false)}
                              style={{
                                display: "block",
                                padding: "10px 0",
                                fontSize: "13px",
                                color: "#333",
                                textDecoration: "none",
                                borderBottom: "1px solid #d0d0d0",
                              }}
                            >
                              {product.title}
                            </Link>
                          ))
                        ) : (
                          <div style={{ fontSize: "12px", color: "#999", padding: "10px 0" }}>Loading...</div>
                        )
                      )}
                    </div>
                  </>
                ) : (
                  <a href={item.href} className="mobile-menu-link">
                    {item.label}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
      </nav>
    </>
  );
}
