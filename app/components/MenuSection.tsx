"use client";

import { useState, useEffect, useLayoutEffect, useRef, useCallback } from "react";
import { FaBars, FaTimes, FaChevronDown } from "react-icons/fa";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { cleanText } from "../utils/textUtils";
import { getImageUrl } from "../utils/getImageUrl";

interface MainMenuItem {
  label: string;
  href: string;
  active?: boolean;
  hasMegaMenu?: boolean;
  hasDropdown?: boolean;
}

interface ResourceMenuItem {
  label: string;
  href: string;
}

const leftMenuItems: MainMenuItem[] = [
  { label: "Home", href: "/", active: true },
  { label: "Omni-Search", href: "/omni-search" },
  // { label: "Products", href: "/products", hasMegaMenu: true },
  // { label: "Lab Consumables", href: "#", hasDropdown: true },
  { label: "Services", href: "/services" },
  { label: "Catalogues", href: "/catalogue" },
];

const rightMenuItems: MainMenuItem[] = [
  { label: "About us", href: "/about" },
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

interface MenuSectionProps {
  mobileMenuOpen?: boolean;
  setMobileMenuOpen?: (open: boolean) => void;
}

type MobileMenuLevel =
  | { title: string; type: "main"; items: MainMenuItem[] }
  | { title: string; type: "products"; items: Level2Category[] }
  | { title: string; type: "level2"; items: Level3Category[]; parentId?: string }
  | { title: string; type: "labconsumables"; items: KitProduct[] }
  | { title: string; type: "croservices"; items: CROService[] }
  | { title: string; type: "resources"; items: ResourceMenuItem[] };

const mobileNavLinkStyle: React.CSSProperties = {
  display: "block",
  padding: "16px 20px",
  color: "#fff",
  textDecoration: "none",
  fontSize: "15px",
  borderBottom: "1px solid #3a3d4e",
};

const mobileNavTriggerStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "16px 20px",
  color: "#fff",
  cursor: "pointer",
  borderBottom: "1px solid #3a3d4e",
};

interface MobileMenuDrawerProps {
  categories: Level2Category[];
  kitProducts: KitProduct[];
  croServices: CROService[];
  onClose: () => void;
}

function MobileMenuDrawer({
  categories,
  kitProducts,
  croServices,
  onClose,
}: MobileMenuDrawerProps) {
  const drawerRef = useRef<HTMLDivElement>(null);
  const [mobileMenuLevel, setMobileMenuLevel] = useState(0);
  const [mobileMenuStack, setMobileMenuStack] = useState<MobileMenuLevel[]>(() => [
    {
      title: "Menu",
      type: "main",
      items: [...leftMenuItems, ...rightMenuItems],
    },
  ]);

  useLayoutEffect(() => {
    const updatePosition = () => {
      if (window.innerWidth > 1320) {
        onClose();
        return;
      }
      const el = drawerRef.current;
      if (!el) return;
      const headerEl = document.querySelector(".main-header");
      const top = headerEl
        ? Math.max(0, Math.round(headerEl.getBoundingClientRect().bottom))
        : 0;
      el.style.top = `${top}px`;
    };

    const prevOverflow = document.body.style.overflow;
    if (window.innerWidth <= 1320) {
      document.body.style.overflow = "hidden";
    }
    updatePosition();

    window.addEventListener("resize", updatePosition, { passive: true });
    window.addEventListener("scroll", updatePosition, { passive: true });
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition);
    };
  }, [onClose]);

  const navigateToLevel = (level: MobileMenuLevel) => {
    setMobileMenuStack((prev) => [...prev, level]);
    setMobileMenuLevel((prev) => prev + 1);
  };

  const navigateBack = () => {
    if (mobileMenuLevel > 0) {
      setMobileMenuStack((prev) => prev.slice(0, -1));
      setMobileMenuLevel((prev) => prev - 1);
    }
  };

  const renderMobileMenuItems = (menuLevel: MobileMenuLevel) => {
    switch (menuLevel.type) {
      case "main":
        return menuLevel.items.map((item) => (
          <div key={item.label}>
            {item.hasMegaMenu ? (
              <div
                onClick={() =>
                  navigateToLevel({
                    title: item.label,
                    type: "products",
                    items: categories,
                  })
                }
                style={mobileNavTriggerStyle}
              >
                <span style={{ fontSize: "15px" }}>{cleanText(item.label)}</span>
                <span style={{ color: "#888", fontSize: "14px" }}>→</span>
              </div>
            ) : item.hasDropdown ? (
              <div
                onClick={() => {
                  if (item.label === "Lab Consumables") {
                    navigateToLevel({
                      title: item.label,
                      type: "labconsumables",
                      items: kitProducts,
                    });
                  } else if (item.label === "CRO Services") {
                    navigateToLevel({
                      title: item.label,
                      type: "croservices",
                      items: croServices,
                    });
                  } else if (item.label === "Resources") {
                    navigateToLevel({
                      title: item.label,
                      type: "resources",
                      items: [
                        { label: "Catalogues", href: "/catalogue" },
                        { label: "Signaling Pathways", href: "/signaling-pathways" },
                        { label: "Publications", href: "/publications" },
                        { label: "FAQ", href: "/faq" },
                      ],
                    });
                  }
                }}
                style={mobileNavTriggerStyle}
              >
                <span style={{ fontSize: "15px" }}>{cleanText(item.label)}</span>
                <span style={{ color: "#888", fontSize: "14px" }}>→</span>
              </div>
            ) : (
              <Link href={item.href} onClick={onClose} style={mobileNavLinkStyle}>
                {cleanText(item.label)}
              </Link>
            )}
          </div>
        ));
      case "products":
        return menuLevel.items.map((level2) => (
          <div key={level2.id}>
            {level2.children && level2.children.length > 0 ? (
              <div
                onClick={() =>
                  navigateToLevel({
                    title: level2.name,
                    type: "level2",
                    items: level2.children,
                    parentId: level2.id,
                  })
                }
                style={mobileNavTriggerStyle}
              >
                <span style={{ fontSize: "15px" }}>{cleanText(level2.name)}</span>
                <span style={{ color: "#888", fontSize: "14px" }}>→</span>
              </div>
            ) : (
              <Link
                href={`/products?brand=Solarbio&category=${level2.slug}`}
                onClick={onClose}
                style={mobileNavLinkStyle}
              >
                {cleanText(level2.name)}
              </Link>
            )}
          </div>
        ));
      case "level2":
        return menuLevel.items.map((level3) => (
          <Link
            key={level3.id}
            href={`/products?brand=Solarbio&category=${level3.slug}`}
            onClick={onClose}
            style={mobileNavLinkStyle}
          >
            {cleanText(level3.name)}
          </Link>
        ));
      case "labconsumables":
        return menuLevel.items.map((product) => (
          <Link
            key={product.id}
            href={`/lab-consumables/${product.slug}`}
            onClick={onClose}
            style={mobileNavLinkStyle}
          >
            {cleanText(product.title)}
          </Link>
        ));
      case "croservices":
        return (
          <>
            <Link href="/cro-services" onClick={onClose} style={mobileNavLinkStyle}>
              All CRO Services
            </Link>
            {menuLevel.items.map((service) => (
              <Link
                key={service.id}
                href={`/cro-services/${service.slug}`}
                onClick={onClose}
                style={mobileNavLinkStyle}
              >
                {cleanText(service.title)}
              </Link>
            ))}
          </>
        );
      case "resources":
        return menuLevel.items.map((item) => (
          <Link key={item.label} href={item.href} onClick={onClose} style={mobileNavLinkStyle}>
            {cleanText(item.label)}
          </Link>
        ));
    }
  };

  return (
    <div ref={drawerRef} className="mobile-menu">
      <div
        style={{
          position: "relative",
          height: "100%",
          overflow: "hidden",
          background: "#2a2d3e",
        }}
      >
        {mobileMenuStack.map((menuLevel, index) => {
          const isActive = index === mobileMenuLevel;
          const translateX = (index - mobileMenuLevel) * 100;

          return (
            <div
              key={`${menuLevel.type}-${index}`}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                overflowY: "auto",
                transform: `translateX(${translateX}%)`,
                transition: "transform 0.3s ease-in-out",
                background: "#2a2d3e",
                zIndex: isActive ? 20 : 15,
              }}
            >
              {/* Header with back button and title */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "16px 20px",
                  borderBottom: "1px solid #3a3d4e",
                  background: "#242736",
                }}
              >
                {index > 0 && (
                  <button
                    onClick={navigateBack}
                    style={{
                      background: "none",
                      border: "none",
                      color: "#fff",
                      fontSize: "18px",
                      marginRight: "12px",
                      cursor: "pointer",
                      padding: "4px",
                    }}
                  >
                    ←
                  </button>
                )}
                <h3
                  style={{
                    margin: 0,
                    color: "#fff",
                    fontSize: "16px",
                    fontWeight: 600,
                  }}
                >
                  {menuLevel.title}
                </h3>
              </div>

              {/* Menu Items */}
              <div style={{ padding: "8px 0" }}>{renderMobileMenuItems(menuLevel)}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function MenuSection({ mobileMenuOpen = false, setMobileMenuOpen }: MenuSectionProps = {}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Use external mobile menu state if provided
  const isMenuOpen = setMobileMenuOpen ? mobileMenuOpen : mobileOpen;
  const toggleMenu = setMobileMenuOpen || setMobileOpen;
  const closeMenu = useCallback(() => toggleMenu(false), [toggleMenu]);
  const [showMegaMenu, setShowMegaMenu] = useState<string | null>(null);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  
  // Menu content used to come from the database; the site no longer has one.
  const categories: Level2Category[] = [];
  const applications: ApplicationCategory[] = [];
  const kitProducts: KitProduct[] = [];
  const croServices: CROService[] = [];
  const signalingPathways: SignalingPathway[] = [];
  const faqs: FAQ[] = [];
  const [menuTop, setMenuTop] = useState(0);
  const menuContainerRef = useRef<HTMLDivElement>(null);

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

  const handleViewAllProducts = () => {
    // If we're already on the products page, just update the URL parameters
    if (window.location.pathname === '/products') {
      const currentParams = new URLSearchParams(searchParams?.toString());
      
      // Keep brand parameter but remove category
      currentParams.delete('category');
      
      const newUrl = `/products?${currentParams.toString()}`;
      router.push(newUrl);
    } else {
      // If we're on a different page, navigate to products with brand only
      router.push('/products?brand=Solarbio');
    }
    
    // Close the mega menu
    handleMouseLeave();
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
                {cleanText(item.label)}
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
                    zIndex: 10010,
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
                                    {cleanText(level2.name)}
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
                                          src={getImageUrl(level3.image) || ""}
                                          alt={cleanText(level3.name)}
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
                                      {cleanText(level3.name)}
                                    </div>
                                  </Link>
                                ))}
                            </div>
                          </div>
                        )}
                      </div>
                      <div style={{ marginTop: "12px", paddingTop: "12px", borderTop: "1px solid #eee" }}>
                        <button
                          onClick={handleViewAllProducts}
                          style={{
                            fontSize: "12px",
                            fontWeight: 600,
                            color: "var(--primary)",
                            textDecoration: "none",
                            transition: "color 0.2s",
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                            padding: 0,
                          }}
                          onMouseEnter={(e) => (e.currentTarget.style.textDecoration = "underline")}
                          onMouseLeave={(e) => (e.currentTarget.style.textDecoration = "none")}
                        >
                          View All Products →
                        </button>
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
                                {cleanText(appCat.title)}
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
                                      {cleanText(item.name)}
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
                    zIndex: 10010,
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
                          {cleanText(service.title)}
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
                        href="/catalogue"
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
                        Catalogues
                      </Link>
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
                          {cleanText(product.title)}
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
                {cleanText(item.label)}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile Toggle */}
        <button
          className="menu-mobile-toggle"
          onClick={() => toggleMenu(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>
      </nav>

      {/* Multi-Level Mobile Menu (outside .menu-section so @media max-width: 1320px does not hide it) */}
      {isMenuOpen && (
        <MobileMenuDrawer
          categories={categories}
          kitProducts={kitProducts}
          croServices={croServices}
          onClose={closeMenu}
        />
      )}
    </>
  );
}
