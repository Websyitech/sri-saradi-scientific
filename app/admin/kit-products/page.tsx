"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";

interface KitProduct {
  id: string;
  title: string;
  description?: string;
  image?: string;
  href?: string;
  sortOrder: number;
  isActive: boolean;
}

export default function AdminKitProducts() {
  const [items, setItems] = useState<KitProduct[]>([]);
  const [loading, setLoading] = useState(true);

  const load = () => {
    fetch("/api/admin/kit-products")
      .then((r) => r.json())
      .then((data) => { 
        if (Array.isArray(data)) {
          setItems(data);
        } else if (data?.error) {
          console.error("API Error:", data.error);
          setItems([]);
        } else {
          setItems([]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setItems([]);
        setLoading(false);
      });
  };

  useEffect(() => { load(); }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this kit product?")) return;
    await fetch("/api/admin/kit-products", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) });
    load();
  };

  if (loading) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "60vh" }}>
        <div style={{ width: "36px", height: "36px", border: "4px solid #e0e0e0", borderTopColor: "#2D2B7F", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
      </div>
    );
  }

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "24px" }}>
        <div>
          <h1 style={{ fontSize: "24px", fontWeight: 700, color: "#1a1a2e", margin: 0 }}>Lab Consumables</h1>
          <p style={{ color: "#888", fontSize: "14px", margin: "4px 0 0" }}>{items.length} lab consumables (homepage section)</p>
        </div>
        <Link href="/admin/kit-products/new" style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "10px 20px", background: "#2D2B7F", color: "#fff", border: "none", borderRadius: "8px", fontSize: "13px", fontWeight: 600, cursor: "pointer", textDecoration: "none" }}>
          <FaPlus /> Add Lab Consumable
        </Link>
      </div>

      {/* Cards Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "16px" }}>
        {items.map((item) => (
          <div key={item.id} style={{ background: "#fff", borderRadius: "12px", border: "1px solid #f0f0f0", boxShadow: "0 1px 3px rgba(0,0,0,0.06)", overflow: "hidden" }}>
            {item.image && (
              <div style={{ height: "140px", background: "#f8f8f8", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
                <img src={item.image} alt={item.title} style={{ maxHeight: "100%", maxWidth: "100%", objectFit: "contain" }} />
              </div>
            )}
            <div style={{ padding: "16px" }}>
              <h3 style={{ margin: "0 0 6px", fontSize: "15px", fontWeight: 600, color: "#333" }}>{item.title}</h3>
              {item.description && <p style={{ margin: "0 0 8px", fontSize: "12px", color: "#888", lineHeight: 1.4 }}>{item.description.slice(0, 100)}{item.description.length > 100 ? "..." : ""}</p>}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ padding: "3px 10px", borderRadius: "12px", fontSize: "11px", fontWeight: 600, background: item.isActive ? "#dcfce7" : "#fee2e2", color: item.isActive ? "#166534" : "#991b1b" }}>
                    {item.isActive ? "Active" : "Inactive"}
                  </span>
                  <span style={{ fontSize: "11px", color: "#aaa" }}>Order: {item.sortOrder}</span>
                </div>
                <div style={{ display: "flex", gap: "4px" }}>
                  <Link href={`/admin/kit-products/${item.id}`} style={{ background: "none", border: "none", color: "#2D2B7F", cursor: "pointer", padding: "6px", fontSize: "14px", display: "flex", alignItems: "center", textDecoration: "none" }}><FaEdit /></Link>
                  <button onClick={() => handleDelete(item.id)} style={{ background: "none", border: "none", color: "#dc2626", cursor: "pointer", padding: "6px", fontSize: "14px" }}><FaTrash /></button>
                </div>
              </div>
            </div>
          </div>
        ))}
        {items.length === 0 && (
          <div style={{ gridColumn: "1/-1", padding: "60px", textAlign: "center", color: "#999", background: "#fff", borderRadius: "12px" }}>No lab consumables yet</div>
        )}
      </div>
    </div>
  );
}
