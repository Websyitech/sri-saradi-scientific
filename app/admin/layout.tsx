"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  FaTachometerAlt, FaBoxes, FaFolderOpen, FaImages, FaFlask,
  FaBriefcase, FaClipboardList, FaCog, FaSignOutAlt, FaBars,
  FaTimes, FaFileAlt, FaVial, FaBook, FaCertificate,
} from "react-icons/fa";

// Utility to get base URL for admin links
function getAdminBaseUrl() {
  if (typeof window !== "undefined") {
    return process.env.NEXT_PUBLIC_BASE_URL || window.location.origin;
  }
  return process.env.NEXT_PUBLIC_BASE_URL || "";
}

const sidebarLinks = [
  { label: "Dashboard", href: "/admin/dashboard", icon: <FaTachometerAlt /> },
  { label: "Products", href: "/admin/products", icon: <FaBoxes /> },
  { label: "Categories", href: "/admin/categories", icon: <FaFolderOpen /> },
  { label: "Media", href: typeof window !== "undefined" ? (getAdminBaseUrl() + "/admin/media") : "/admin/media", icon: <FaImages /> },
  { label: "Hero Slides", href: "/admin/hero-slides", icon: <FaImages /> },
  { label: "Lab Consumables", href: "/admin/kit-products", icon: <FaFlask /> },
  { label: "CRO Services", href: "/admin/cro-services", icon: <FaVial /> },
  { label: "Signaling Pathways", href: "/admin/signaling-pathways", icon: <FaVial /> },
  { label: "FAQ", href: "/admin/faqs", icon: <FaClipboardList /> },
  { label: "Catalogues", href: "/admin/catalogues", icon: <FaBook /> },
  { label: "Certificates", href: "/admin/certificates", icon: <FaCertificate /> },
  { label: "Careers", href: "/admin/careers", icon: <FaBriefcase /> },
  { label: "Orders", href: "/admin/quotes", icon: <FaClipboardList /> },
  { label: "Pages", href: "/admin/pages", icon: <FaFileAlt /> },
  { label: "Settings", href: "/admin/settings", icon: <FaCog /> },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [loading, setLoading] = useState(true);

  // Skip auth for login page
  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    if (isLoginPage) {
      setLoading(false);
      return;
    }
    fetch("/api/admin/auth/verify")
      .then((r) => {
        if (!r.ok) throw new Error("Not authenticated");
        return r.json();
      })
      .then((data) => {
        setUser(data.user);
        setLoading(false);
      })
      .catch(() => {
        router.push("/admin/login");
      });
  }, [isLoginPage, router]);

  const handleLogout = async () => {
    await fetch("/api/admin/auth/logout", { method: "POST" });
    router.push("/admin/login");
  };

  // Login page — render without sidebar
  if (isLoginPage) {
    return <>{children}</>;
  }

  if (loading) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh", background: "#f0f2f5" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ width: "40px", height: "40px", border: "4px solid #e0e0e0", borderTopColor: "#2D2B7F", borderRadius: "50%", animation: "spin 0.8s linear infinite", margin: "0 auto 16px" }} />
          <p style={{ color: "#888", fontSize: "14px" }}>Loading admin panel...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f0f2f5" }}>
      {/* Sidebar */}
      <aside
        style={{
          width: sidebarOpen ? "260px" : "70px",
          background: "#1a1a2e",
          transition: "width 0.3s",
          flexShrink: 0,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        {/* Logo */}
        <div
          style={{
            padding: sidebarOpen ? "20px 20px" : "20px 12px",
            borderBottom: "1px solid rgba(255,255,255,0.08)",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            minHeight: "64px",
          }}
        >
          <div
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "8px",
              background: "linear-gradient(135deg, #2D2B7F, #3a38a0)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              fontSize: "16px",
              fontWeight: 800,
              flexShrink: 0,
            }}
          >
            SS
          </div>
          {sidebarOpen && (
            <div style={{ overflow: "hidden", whiteSpace: "nowrap" }}>
              <div style={{ fontSize: "14px", fontWeight: 700, color: "#fff" }}>Sri Saradi</div>
              <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)" }}>Admin Panel</div>
            </div>
          )}
        </div>

        {/* Nav Links */}
        <nav style={{ flex: 1, padding: "12px 8px", overflowY: "auto" }}>
          {sidebarLinks.map((link) => {
            const isActive = pathname === link.href || pathname.startsWith(link.href + "/");
            return (
              <a
                key={link.href}
                href={link.href}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: sidebarOpen ? "11px 16px" : "11px 0",
                  marginBottom: "2px",
                  borderRadius: "8px",
                  color: isActive ? "#fff" : "rgba(255,255,255,0.55)",
                  background: isActive ? "rgba(45,43,127,0.5)" : "transparent",
                  textDecoration: "none",
                  fontSize: "14px",
                  fontWeight: isActive ? 600 : 400,
                  transition: "all 0.15s",
                  justifyContent: sidebarOpen ? "flex-start" : "center",
                }}
              >
                <span style={{ fontSize: "16px", flexShrink: 0, width: "20px", textAlign: "center" }}>
                  {link.icon}
                </span>
                {sidebarOpen && <span>{link.label}</span>}
              </a>
            );
          })}
        </nav>

        {/* Logout */}
        <div style={{ padding: "12px 8px", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
          <button
            onClick={handleLogout}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: sidebarOpen ? "11px 16px" : "11px 0",
              width: "100%",
              borderRadius: "8px",
              color: "rgba(255,255,255,0.55)",
              background: "transparent",
              border: "none",
              cursor: "pointer",
              fontSize: "14px",
              transition: "all 0.15s",
              justifyContent: sidebarOpen ? "flex-start" : "center",
            }}
          >
            <FaSignOutAlt style={{ fontSize: "16px" }} />
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        {/* Top Bar */}
        <header
          style={{
            height: "64px",
            background: "#fff",
            borderBottom: "1px solid #e8e8e8",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 24px",
            flexShrink: 0,
          }}
        >
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            style={{
              background: "none",
              border: "none",
              fontSize: "18px",
              color: "#666",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              padding: "8px",
              borderRadius: "6px",
            }}
          >
            {sidebarOpen ? <FaTimes /> : <FaBars />}
          </button>

          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div
              style={{
                width: "34px",
                height: "34px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #2D2B7F, #3a38a0)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                fontSize: "13px",
                fontWeight: 700,
              }}
            >
              {user?.name?.charAt(0) || "A"}
            </div>
            <div>
              <div style={{ fontSize: "13px", fontWeight: 600, color: "#333" }}>{user?.name || "Admin"}</div>
              <div style={{ fontSize: "11px", color: "#999" }}>{user?.email || ""}</div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main style={{ flex: 1, overflow: "auto", padding: "24px" }}>
          {children}
        </main>
      </div>
    </div>
  );
}
