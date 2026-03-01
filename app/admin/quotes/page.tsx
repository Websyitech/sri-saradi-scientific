"use client";

import { useState, useEffect } from "react";
import { FaTrash, FaEye, FaFilter } from "react-icons/fa";
import AdminModal from "../components/AdminModal";

interface QuoteItem {
  id: string;
  name: string;
  quantity: number;
  sku?: string;
  productId?: string;
}

interface Quote {
  id: string;
  orderId: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  status: string;
  notes?: string;
  createdAt: string;
  items: QuoteItem[];
}

const statusOptions = [
  { value: "pending", label: "Pending", bg: "#fef3c7", color: "#92400e" },
  { value: "reviewed", label: "Reviewed", bg: "#dbeafe", color: "#1e40af" },
  { value: "quoted", label: "Quoted", bg: "#e0e7ff", color: "#3730a3" },
  { value: "completed", label: "Completed", bg: "#dcfce7", color: "#166534" },
  { value: "cancelled", label: "Cancelled", bg: "#fee2e2", color: "#991b1b" },
];

export default function AdminQuotes() {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState("");
  const [viewQuote, setViewQuote] = useState<Quote | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [updatingStatus, setUpdatingStatus] = useState<string | null>(null);

  const load = () => {
    const params = filterStatus ? `?status=${filterStatus}` : "";
    fetch(`/api/admin/quotes${params}`)
      .then((r) => r.json())
      .then((data) => { setQuotes(data); setLoading(false); })
      .catch(() => setLoading(false));
  };

  useEffect(() => { load(); }, [filterStatus]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleStatusChange = async (id: string, status: string) => {
    setUpdatingStatus(id);
    await fetch("/api/admin/quotes", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    setUpdatingStatus(null);
    load();
    // If viewing this quote, update it
    if (viewQuote?.id === id) {
      setViewQuote({ ...viewQuote, status });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this quote request? This action cannot be undone.")) return;
    await fetch("/api/admin/quotes", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    if (viewQuote?.id === id) { setModalOpen(false); setViewQuote(null); }
    load();
  };

  const openView = (q: Quote) => {
    setViewQuote(q);
    setModalOpen(true);
  };

  const getStatusStyle = (status: string) => {
    const s = statusOptions.find((o) => o.value === status) || statusOptions[0];
    return { background: s.bg, color: s.color };
  };

  const inputStyle: React.CSSProperties = { width: "100%", padding: "10px 12px", border: "1px solid #ddd", borderRadius: "8px", fontSize: "14px", outline: "none", boxSizing: "border-box" };

  if (loading) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "60vh" }}>
        <div style={{ width: "36px", height: "36px", border: "4px solid #e0e0e0", borderTopColor: "#2D2B7F", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
      </div>
    );
  }

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "24px", flexWrap: "wrap", gap: "12px" }}>
        <div>
          <h1 style={{ fontSize: "24px", fontWeight: 700, color: "#1a1a2e", margin: 0 }}>Quote Requests</h1>
          <p style={{ color: "#888", fontSize: "14px", margin: "4px 0 0" }}>{quotes.length} quotes</p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <FaFilter style={{ color: "#888", fontSize: "13px" }} />
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} style={{ ...inputStyle, width: "auto", minWidth: "160px" }}>
            <option value="">All Statuses</option>
            {statusOptions.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
          </select>
        </div>
      </div>

      <div style={{ background: "#fff", borderRadius: "12px", border: "1px solid #f0f0f0", boxShadow: "0 1px 3px rgba(0,0,0,0.06)", overflow: "hidden" }}>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
            <thead>
              <tr style={{ background: "#fafafa" }}>
                <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, color: "#666" }}>Order ID</th>
                <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, color: "#666" }}>Customer</th>
                <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, color: "#666" }}>Email</th>
                <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, color: "#666" }}>Company</th>
                <th style={{ padding: "12px 16px", textAlign: "center", fontWeight: 600, color: "#666" }}>Items</th>
                <th style={{ padding: "12px 16px", textAlign: "center", fontWeight: 600, color: "#666" }}>Status</th>
                <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, color: "#666" }}>Date</th>
                <th style={{ padding: "12px 16px", textAlign: "right", fontWeight: 600, color: "#666" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {quotes.map((q) => (
                <tr key={q.id} style={{ borderBottom: "1px solid #f5f5f5" }}>
                  <td style={{ padding: "12px 16px", fontFamily: "monospace", fontSize: "12px", fontWeight: 500, color: "#2D2B7F" }}>{q.orderId.slice(0, 14)}...</td>
                  <td style={{ padding: "12px 16px", fontWeight: 500, color: "#333" }}>{q.name}</td>
                  <td style={{ padding: "12px 16px", color: "#666" }}>{q.email}</td>
                  <td style={{ padding: "12px 16px", color: "#666" }}>{q.company || "—"}</td>
                  <td style={{ padding: "12px 16px", textAlign: "center", color: "#666" }}>{q.items.length}</td>
                  <td style={{ padding: "12px 16px", textAlign: "center" }}>
                    <select
                      value={q.status}
                      onChange={(e) => handleStatusChange(q.id, e.target.value)}
                      disabled={updatingStatus === q.id}
                      style={{
                        padding: "4px 8px",
                        borderRadius: "8px",
                        fontSize: "11px",
                        fontWeight: 600,
                        border: "1px solid transparent",
                        cursor: "pointer",
                        ...getStatusStyle(q.status),
                        opacity: updatingStatus === q.id ? 0.6 : 1,
                      }}
                    >
                      {statusOptions.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
                    </select>
                  </td>
                  <td style={{ padding: "12px 16px", color: "#888", fontSize: "12px" }}>{new Date(q.createdAt).toLocaleDateString()}</td>
                  <td style={{ padding: "12px 16px", textAlign: "right" }}>
                    <button onClick={() => openView(q)} style={{ background: "none", border: "none", color: "#2D2B7F", cursor: "pointer", padding: "6px", fontSize: "14px", marginRight: "4px" }}><FaEye /></button>
                    <button onClick={() => handleDelete(q.id)} style={{ background: "none", border: "none", color: "#dc2626", cursor: "pointer", padding: "6px", fontSize: "14px" }}><FaTrash /></button>
                  </td>
                </tr>
              ))}
              {quotes.length === 0 && (
                <tr><td colSpan={8} style={{ padding: "40px", textAlign: "center", color: "#999" }}>No quote requests found</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quote Detail Modal */}
      <AdminModal title="Quote Request Details" isOpen={modalOpen} onClose={() => setModalOpen(false)} width="640px">
        {viewQuote && (
          <div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "20px" }}>
              <div>
                <label style={{ fontSize: "11px", fontWeight: 600, color: "#888", textTransform: "uppercase", letterSpacing: "0.5px" }}>Order ID</label>
                <p style={{ margin: "4px 0 0", fontSize: "14px", fontWeight: 500, color: "#333", fontFamily: "monospace" }}>{viewQuote.orderId}</p>
              </div>
              <div>
                <label style={{ fontSize: "11px", fontWeight: 600, color: "#888", textTransform: "uppercase", letterSpacing: "0.5px" }}>Date</label>
                <p style={{ margin: "4px 0 0", fontSize: "14px", color: "#333" }}>{new Date(viewQuote.createdAt).toLocaleString()}</p>
              </div>
              <div>
                <label style={{ fontSize: "11px", fontWeight: 600, color: "#888", textTransform: "uppercase", letterSpacing: "0.5px" }}>Customer Name</label>
                <p style={{ margin: "4px 0 0", fontSize: "14px", fontWeight: 500, color: "#333" }}>{viewQuote.name}</p>
              </div>
              <div>
                <label style={{ fontSize: "11px", fontWeight: 600, color: "#888", textTransform: "uppercase", letterSpacing: "0.5px" }}>Email</label>
                <p style={{ margin: "4px 0 0", fontSize: "14px", color: "#333" }}>{viewQuote.email}</p>
              </div>
              <div>
                <label style={{ fontSize: "11px", fontWeight: 600, color: "#888", textTransform: "uppercase", letterSpacing: "0.5px" }}>Phone</label>
                <p style={{ margin: "4px 0 0", fontSize: "14px", color: "#333" }}>{viewQuote.phone || "—"}</p>
              </div>
              <div>
                <label style={{ fontSize: "11px", fontWeight: 600, color: "#888", textTransform: "uppercase", letterSpacing: "0.5px" }}>Company</label>
                <p style={{ margin: "4px 0 0", fontSize: "14px", color: "#333" }}>{viewQuote.company || "—"}</p>
              </div>
            </div>

            <div style={{ marginBottom: "20px" }}>
              <label style={{ fontSize: "11px", fontWeight: 600, color: "#888", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "8px", display: "block" }}>Status</label>
              <select
                value={viewQuote.status}
                onChange={(e) => handleStatusChange(viewQuote.id, e.target.value)}
                style={inputStyle}
              >
                {statusOptions.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
              </select>
            </div>

            {/* Items */}
            <div style={{ marginBottom: "20px" }}>
              <label style={{ fontSize: "11px", fontWeight: 600, color: "#888", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "8px", display: "block" }}>Requested Items ({viewQuote.items.length})</label>
              <div style={{ border: "1px solid #eee", borderRadius: "8px", overflow: "hidden" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
                  <thead>
                    <tr style={{ background: "#fafafa" }}>
                      <th style={{ padding: "8px 12px", textAlign: "left", fontWeight: 600, color: "#666" }}>Product</th>
                      <th style={{ padding: "8px 12px", textAlign: "left", fontWeight: 600, color: "#666" }}>SKU</th>
                      <th style={{ padding: "8px 12px", textAlign: "center", fontWeight: 600, color: "#666" }}>Qty</th>
                    </tr>
                  </thead>
                  <tbody>
                    {viewQuote.items.map((item) => (
                      <tr key={item.id} style={{ borderTop: "1px solid #f0f0f0" }}>
                        <td style={{ padding: "8px 12px", color: "#333" }}>{item.name}</td>
                        <td style={{ padding: "8px 12px", color: "#888", fontFamily: "monospace", fontSize: "12px" }}>{item.sku || "—"}</td>
                        <td style={{ padding: "8px 12px", textAlign: "center", color: "#333", fontWeight: 500 }}>{item.quantity}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {viewQuote.notes && (
              <div style={{ marginBottom: "20px" }}>
                <label style={{ fontSize: "11px", fontWeight: 600, color: "#888", textTransform: "uppercase", letterSpacing: "0.5px" }}>Notes</label>
                <p style={{ margin: "4px 0 0", fontSize: "13px", color: "#555", lineHeight: 1.5, background: "#f9f9f9", padding: "12px", borderRadius: "8px" }}>{viewQuote.notes}</p>
              </div>
            )}

            <div style={{ display: "flex", gap: "12px", justifyContent: "flex-end", paddingTop: "8px", borderTop: "1px solid #eee" }}>
              <button onClick={() => handleDelete(viewQuote.id)} style={{ padding: "10px 20px", border: "1px solid #fca5a5", borderRadius: "8px", fontSize: "13px", background: "#fff", color: "#dc2626", cursor: "pointer", fontWeight: 500 }}>Delete Quote</button>
              <button onClick={() => setModalOpen(false)} style={{ padding: "10px 20px", background: "#2D2B7F", color: "#fff", border: "none", borderRadius: "8px", fontSize: "13px", fontWeight: 600, cursor: "pointer" }}>Close</button>
            </div>
          </div>
        )}
      </AdminModal>
    </div>
  );
}
