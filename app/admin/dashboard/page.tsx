"use client";

import { useState, useEffect } from "react";
import { FaBoxes, FaFolderOpen, FaClipboardList, FaClock, FaImages, FaBriefcase, FaEye } from "react-icons/fa";

interface DashboardStats {
  totalProducts: number;
  totalCategories: number;
  totalQuotes: number;
  pendingQuotes: number;
  activeSlides: number;
  totalJobs: number;
}

interface QuoteItem {
  id: string;
  name: string;
  quantity: number;
  sku?: string;
}

interface Quote {
  id: string;
  orderId: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  status: string;
  createdAt: string;
  items: QuoteItem[];
}

const statCards = [
  { key: "totalProducts", label: "Total Products", icon: <FaBoxes />, color: "#2D2B7F" },
  { key: "totalCategories", label: "Categories", icon: <FaFolderOpen />, color: "#16a34a" },
  { key: "totalQuotes", label: "Total Quotes", icon: <FaClipboardList />, color: "#ea580c" },
  { key: "pendingQuotes", label: "Pending Quotes", icon: <FaClock />, color: "#dc2626" },
  { key: "activeSlides", label: "Active Slides", icon: <FaImages />, color: "#7c3aed" },
  { key: "totalJobs", label: "Active Jobs", icon: <FaBriefcase />, color: "#0891b2" },
];

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentQuotes, setRecentQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/dashboard")
      .then((r) => r.json())
      .then((data) => {
        setStats(data.stats);
        setRecentQuotes(data.recentQuotes || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const statusBadge = (status: string) => {
    const colors: Record<string, { bg: string; text: string }> = {
      pending: { bg: "#fef3c7", text: "#92400e" },
      reviewed: { bg: "#dbeafe", text: "#1e40af" },
      quoted: { bg: "#e0e7ff", text: "#3730a3" },
      completed: { bg: "#dcfce7", text: "#166534" },
      cancelled: { bg: "#fee2e2", text: "#991b1b" },
    };
    const c = colors[status] || colors.pending;
    return (
      <span
        style={{
          padding: "3px 10px",
          borderRadius: "12px",
          fontSize: "11px",
          fontWeight: 600,
          background: c.bg,
          color: c.text,
          textTransform: "capitalize",
        }}
      >
        {status}
      </span>
    );
  };

  if (loading) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "60vh" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ width: "36px", height: "36px", border: "4px solid #e0e0e0", borderTopColor: "#2D2B7F", borderRadius: "50%", animation: "spin 0.8s linear infinite", margin: "0 auto 12px" }} />
          <p style={{ color: "#888", fontSize: "13px" }}>Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div style={{ marginBottom: "28px" }}>
        <h1 style={{ fontSize: "24px", fontWeight: 700, color: "#1a1a2e", margin: 0 }}>Dashboard</h1>
        <p style={{ color: "#888", fontSize: "14px", margin: "4px 0 0" }}>Welcome to Sri Saradi Scientific Admin Panel</p>
      </div>

      {/* Stats Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "16px", marginBottom: "32px" }}>
        {statCards.map((card) => (
          <div
            key={card.key}
            style={{
              background: "#fff",
              borderRadius: "12px",
              padding: "20px",
              boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
              border: "1px solid #f0f0f0",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
              <span style={{ fontSize: "13px", color: "#888", fontWeight: 500 }}>{card.label}</span>
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "10px",
                  background: card.color + "15",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: card.color,
                  fontSize: "15px",
                }}
              >
                {card.icon}
              </div>
            </div>
            <div style={{ fontSize: "28px", fontWeight: 700, color: "#1a1a2e" }}>
              {stats ? (stats as unknown as Record<string, number>)[card.key] : 0}
            </div>
          </div>
        ))}
      </div>

      {/* Recent Quotes */}
      <div
        style={{
          background: "#fff",
          borderRadius: "12px",
          boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
          border: "1px solid #f0f0f0",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            padding: "18px 24px",
            borderBottom: "1px solid #f0f0f0",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <h2 style={{ margin: 0, fontSize: "16px", fontWeight: 600, color: "#1a1a2e" }}>Recent Quote Requests</h2>
          <a
            href="/admin/quotes"
            style={{
              fontSize: "13px",
              color: "#2D2B7F",
              textDecoration: "none",
              fontWeight: 500,
              display: "flex",
              alignItems: "center",
              gap: "4px",
            }}
          >
            <FaEye style={{ fontSize: "12px" }} /> View All
          </a>
        </div>

        {recentQuotes.length === 0 ? (
          <div style={{ padding: "40px", textAlign: "center", color: "#999", fontSize: "14px" }}>
            No quote requests yet
          </div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
              <thead>
                <tr style={{ background: "#fafafa" }}>
                  <th style={{ padding: "10px 16px", textAlign: "left", fontWeight: 600, color: "#666", borderBottom: "1px solid #f0f0f0" }}>Order ID</th>
                  <th style={{ padding: "10px 16px", textAlign: "left", fontWeight: 600, color: "#666", borderBottom: "1px solid #f0f0f0" }}>Customer</th>
                  <th style={{ padding: "10px 16px", textAlign: "left", fontWeight: 600, color: "#666", borderBottom: "1px solid #f0f0f0" }}>Email</th>
                  <th style={{ padding: "10px 16px", textAlign: "left", fontWeight: 600, color: "#666", borderBottom: "1px solid #f0f0f0" }}>Items</th>
                  <th style={{ padding: "10px 16px", textAlign: "left", fontWeight: 600, color: "#666", borderBottom: "1px solid #f0f0f0" }}>Status</th>
                  <th style={{ padding: "10px 16px", textAlign: "left", fontWeight: 600, color: "#666", borderBottom: "1px solid #f0f0f0" }}>Date</th>
                </tr>
              </thead>
              <tbody>
                {recentQuotes.map((q) => (
                  <tr key={q.id} style={{ borderBottom: "1px solid #f5f5f5" }}>
                    <td style={{ padding: "12px 16px", fontWeight: 500, color: "#2D2B7F" }}>{q.orderId.slice(0, 12)}...</td>
                    <td style={{ padding: "12px 16px", color: "#333" }}>{q.name}</td>
                    <td style={{ padding: "12px 16px", color: "#666" }}>{q.email}</td>
                    <td style={{ padding: "12px 16px", color: "#666" }}>{q.items.length} items</td>
                    <td style={{ padding: "12px 16px" }}>{statusBadge(q.status)}</td>
                    <td style={{ padding: "12px 16px", color: "#888" }}>{new Date(q.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
