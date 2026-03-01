"use client";

import { useState, useEffect } from "react";
import { FaPlus, FaEdit, FaTrash, FaFileAlt } from "react-icons/fa";
import AdminModal from "../components/AdminModal";

interface PageItem {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  content?: unknown;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

const emptyForm = { slug: "", title: "", subtitle: "", content: "", isActive: true };

export default function AdminPages() {
  const [pages, setPages] = useState<PageItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<PageItem | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  const load = () => {
    fetch("/api/admin/pages")
      .then((r) => r.json())
      .then((data) => { setPages(data); setLoading(false); })
      .catch(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const openCreate = () => { setEditing(null); setForm(emptyForm); setModalOpen(true); };

  const openEdit = (p: PageItem) => {
    setEditing(p);
    let contentStr = "";
    if (p.content) {
      try {
        contentStr = typeof p.content === "string" ? p.content : JSON.stringify(p.content, null, 2);
      } catch {
        contentStr = String(p.content);
      }
    }
    setForm({
      slug: p.slug, title: p.title, subtitle: p.subtitle || "",
      content: contentStr, isActive: p.isActive,
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    let contentJson: unknown = null;
    if (form.content.trim()) {
      try {
        contentJson = JSON.parse(form.content);
      } catch {
        // If not valid JSON, store as a simple object with text
        contentJson = { text: form.content };
      }
    }

    const method = editing ? "PUT" : "POST";
    const body = {
      ...(editing ? { id: editing.id } : {}),
      slug: form.slug,
      title: form.title,
      subtitle: form.subtitle || null,
      content: contentJson,
      isActive: form.isActive,
    };
    await fetch("/api/admin/pages", { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
    setSaving(false);
    setModalOpen(false);
    load();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this page?")) return;
    await fetch("/api/admin/pages", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) });
    load();
  };

  const handleSlug = (title: string) => title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

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
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "24px" }}>
        <div>
          <h1 style={{ fontSize: "24px", fontWeight: 700, color: "#1a1a2e", margin: 0 }}>Pages (CMS)</h1>
          <p style={{ color: "#888", fontSize: "14px", margin: "4px 0 0" }}>Manage About, Terms, Privacy and other pages</p>
        </div>
        <button onClick={openCreate} style={{ display: "flex", alignItems: "center", gap: "8px", padding: "10px 20px", background: "#2D2B7F", color: "#fff", border: "none", borderRadius: "8px", fontSize: "13px", fontWeight: 600, cursor: "pointer" }}>
          <FaPlus /> Add Page
        </button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "16px" }}>
        {pages.map((p) => (
          <div key={p.id} style={{ background: "#fff", borderRadius: "12px", border: "1px solid #f0f0f0", boxShadow: "0 1px 3px rgba(0,0,0,0.06)", padding: "20px" }}>
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "12px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div style={{ width: "36px", height: "36px", borderRadius: "8px", background: "#2D2B7F15", display: "flex", alignItems: "center", justifyContent: "center", color: "#2D2B7F", fontSize: "14px", flexShrink: 0 }}>
                  <FaFileAlt />
                </div>
                <div>
                  <h3 style={{ margin: 0, fontSize: "15px", fontWeight: 600, color: "#333" }}>{p.title}</h3>
                  <p style={{ margin: "2px 0 0", fontSize: "12px", color: "#888", fontFamily: "monospace" }}>/{p.slug}</p>
                </div>
              </div>
              <span style={{ padding: "3px 10px", borderRadius: "12px", fontSize: "11px", fontWeight: 600, background: p.isActive ? "#dcfce7" : "#fee2e2", color: p.isActive ? "#166534" : "#991b1b", flexShrink: 0 }}>
                {p.isActive ? "Active" : "Draft"}
              </span>
            </div>
            {p.subtitle && <p style={{ margin: "0 0 12px", fontSize: "13px", color: "#666" }}>{p.subtitle}</p>}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "1px solid #f0f0f0", paddingTop: "12px" }}>
              <span style={{ fontSize: "11px", color: "#aaa" }}>Updated {new Date(p.updatedAt).toLocaleDateString()}</span>
              <div style={{ display: "flex", gap: "4px" }}>
                <button onClick={() => openEdit(p)} style={{ background: "none", border: "none", color: "#2D2B7F", cursor: "pointer", padding: "6px", fontSize: "14px" }}><FaEdit /></button>
                <button onClick={() => handleDelete(p.id)} style={{ background: "none", border: "none", color: "#dc2626", cursor: "pointer", padding: "6px", fontSize: "14px" }}><FaTrash /></button>
              </div>
            </div>
          </div>
        ))}
        {pages.length === 0 && (
          <div style={{ gridColumn: "1/-1", padding: "60px", textAlign: "center", color: "#999", background: "#fff", borderRadius: "12px" }}>No pages yet. Create About Us, Terms of Service, or Privacy Policy pages.</div>
        )}
      </div>

      <AdminModal title={editing ? "Edit Page" : "Add Page"} isOpen={modalOpen} onClose={() => setModalOpen(false)} width="700px">
        <form onSubmit={handleSubmit}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
            <div>
              <label style={{ display: "block", fontSize: "13px", fontWeight: 500, color: "#555", marginBottom: "6px" }}>Title *</label>
              <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value, slug: editing ? form.slug : handleSlug(e.target.value) })} required style={inputStyle} />
            </div>
            <div>
              <label style={{ display: "block", fontSize: "13px", fontWeight: 500, color: "#555", marginBottom: "6px" }}>Slug *</label>
              <input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} required style={{ ...inputStyle, fontFamily: "monospace" }} />
            </div>
          </div>
          <div style={{ marginBottom: "16px" }}>
            <label style={{ display: "block", fontSize: "13px", fontWeight: 500, color: "#555", marginBottom: "6px" }}>Subtitle</label>
            <input value={form.subtitle} onChange={(e) => setForm({ ...form, subtitle: e.target.value })} style={inputStyle} />
          </div>
          <div style={{ marginBottom: "16px" }}>
            <label style={{ display: "block", fontSize: "13px", fontWeight: 500, color: "#555", marginBottom: "6px" }}>Content (JSON)</label>
            <textarea
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
              rows={14}
              style={{ ...inputStyle, resize: "vertical", fontFamily: "monospace", fontSize: "13px", lineHeight: 1.5 }}
              placeholder={'{\n  "sections": [\n    {\n      "heading": "About Us",\n      "body": "Sri Saradi Scientific is a leading..."\n    }\n  ]\n}'}
            />
            <p style={{ margin: "4px 0 0", fontSize: "11px", color: "#aaa" }}>Enter valid JSON. If plain text is provided, it will be wrapped automatically.</p>
          </div>
          <div style={{ marginBottom: "16px" }}>
            <label style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", color: "#555", cursor: "pointer" }}>
              <input type="checkbox" checked={form.isActive} onChange={(e) => setForm({ ...form, isActive: e.target.checked })} /> Published (visible on site)
            </label>
          </div>
          <div style={{ display: "flex", gap: "12px", justifyContent: "flex-end", paddingTop: "8px" }}>
            <button type="button" onClick={() => setModalOpen(false)} style={{ padding: "10px 20px", border: "1px solid #ddd", borderRadius: "8px", fontSize: "13px", background: "#fff", cursor: "pointer" }}>Cancel</button>
            <button type="submit" disabled={saving} style={{ padding: "10px 24px", background: "#2D2B7F", color: "#fff", border: "none", borderRadius: "8px", fontSize: "13px", fontWeight: 600, cursor: "pointer", opacity: saving ? 0.7 : 1 }}>
              {saving ? "Saving..." : editing ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </AdminModal>
    </div>
  );
}
