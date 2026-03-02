"use client";

import React, { useState, useEffect, useRef } from "react";
import { FaPlus, FaEdit, FaTrash, FaChevronDown, FaChevronRight, FaFlask, FaSyringe, FaAtom, FaVials, FaMicroscope, FaDna, FaFilter, FaShieldAlt, FaTimes } from "react-icons/fa";
import { GiChemicalDrop, GiMolecule } from "react-icons/gi";
import AdminModal from "../components/AdminModal";

/* ── Icon map: DB icon string → React component ── */
const iconMap: Record<string, React.ReactNode> = {
  FaFlask: <FaFlask />,
  FaSyringe: <FaSyringe />,
  FaAtom: <FaAtom />,
  FaVials: <FaVials />,
  FaMicroscope: <FaMicroscope />,
  FaDna: <FaDna />,
  FaFilter: <FaFilter />,
  FaShieldAlt: <FaShieldAlt />,
  GiChemicalDrop: <GiChemicalDrop />,
  GiMolecule: <GiMolecule />,
};

interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  icon?: string;
  color?: string;
  parentId?: string | null;
  sortOrder: number;
  isActive: boolean;
  _count?: { products: number; children: number };
  children?: Category[];
}

const emptyForm = { name: "", slug: "", description: "", image: "", icon: "", color: "#2D2B7F", sortOrder: 0, isActive: true, parentId: "" };

export default function AdminCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Category | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());
  const [allFlat, setAllFlat] = useState<Category[]>([]);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const load = () => {
    // Load hierarchical for display
    fetch("/api/admin/categories")
      .then((r) => r.json())
      .then((data) => { if (Array.isArray(data)) setCategories(data); setLoading(false); })
      .catch(() => setLoading(false));
    // Load flat for parent dropdown
    fetch("/api/admin/categories?flat=true")
      .then((r) => r.json())
      .then((data) => { if (Array.isArray(data)) setAllFlat(data); })
      .catch(() => {});
  };

  useEffect(() => { load(); }, []);

  const handleSlug = (name: string) => name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  const toggleExpand = (id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  const expandAll = () => {
    const ids = new Set<string>();
    const collect = (cats: Category[]) => {
      cats.forEach((c) => { if (c.children && c.children.length > 0) { ids.add(c.id); collect(c.children); } });
    };
    collect(categories);
    setExpandedIds(ids);
  };

  const collapseAll = () => setExpandedIds(new Set());

  const openCreate = (parentId?: string) => {
    setEditing(null);
    setForm({ ...emptyForm, parentId: parentId || "" });
    setModalOpen(true);
  };

  const openEdit = (item: Category) => {
    setEditing(item);
    setForm({
      name: item.name, slug: item.slug, description: item.description || "",
      image: item.image || "", icon: item.icon || "",
      color: item.color || "#2D2B7F", sortOrder: item.sortOrder,
      isActive: item.isActive, parentId: item.parentId || "",
    });
    setModalOpen(true);
  };

  const handleImageUpload = async (file: File) => {
    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("type", `category_${Date.now()}`);
    const res = await fetch("/api/admin/upload", { method: "POST", body: formData });
    const data = await res.json();
    if (data.success) setForm({ ...form, image: data.url });
    setUploading(false);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleImageUpload(file);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files?.[0];
    if (file) handleImageUpload(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const method = editing ? "PUT" : "POST";
    const submitData = {
      ...(editing ? { id: editing.id } : {}),
      name: form.name,
      slug: form.slug,
      description: form.description || null,
      image: form.image || null,
      icon: form.icon || null,
      color: form.color || "#2D2B7F",
      sortOrder: form.sortOrder,
      isActive: form.isActive,
      parentId: form.parentId || null,
    };
    await fetch("/api/admin/categories", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(submitData),
    });
    setSaving(false);
    setModalOpen(false);
    load();
  };

  const handleDelete = async (id: string, name: string, childCount: number) => {
    const msg = childCount > 0
      ? `Delete "${name}" and its ${childCount} sub-categories? Products in them will be unlinked.`
      : `Delete "${name}"? Products in it will be unlinked.`;
    if (!confirm(msg)) return;
    await fetch("/api/admin/categories", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    load();
  };

  const countAll = (cats: Category[]): number => {
    return cats.reduce((sum, c) => sum + 1 + countAll(c.children || []), 0);
  };

  const inputStyle: React.CSSProperties = { width: "100%", padding: "10px 12px", border: "1px solid #ddd", borderRadius: "8px", fontSize: "14px", outline: "none", boxSizing: "border-box" };

  if (loading) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "60vh" }}>
        <div style={{ width: "36px", height: "36px", border: "4px solid #e0e0e0", borderTopColor: "#2D2B7F", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
      </div>
    );
  }

  /* ── Recursive row renderer ── */
  const renderCategoryRow = (cat: Category, depth: number = 0) => {
    const hasChildren = cat.children && cat.children.length > 0;
    const isExpanded = expandedIds.has(cat.id);
    const childCount = cat._count?.children || (cat.children?.length ?? 0);
    const indent = depth * 28;

    return (
      <React.Fragment key={cat.id}>
        <tr style={{ borderBottom: "1px solid #f5f5f5", background: depth === 0 ? "#fff" : depth === 1 ? "#fafbff" : "#f5f7ff" }}>
          <td style={{ padding: "10px 12px", width: "40px" }}>
            {hasChildren ? (
              <button
                onClick={() => toggleExpand(cat.id)}
                style={{ background: "none", border: "none", cursor: "pointer", color: "#888", fontSize: "11px", padding: "4px" }}
              >
                {isExpanded ? <FaChevronDown /> : <FaChevronRight />}
              </button>
            ) : (
              <span style={{ display: "inline-block", width: "20px" }} />
            )}
          </td>
          <td style={{ padding: "10px 12px", fontWeight: depth === 0 ? 600 : 500, color: depth === 0 ? "#1a1a2e" : depth === 1 ? "#333" : "#555" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", paddingLeft: `${indent}px` }}>
              {cat.icon && iconMap[cat.icon] ? (
                <span style={{ fontSize: depth === 0 ? "16px" : "14px", color: cat.color || "#2D2B7F" }}>{iconMap[cat.icon]}</span>
              ) : depth > 0 ? (
                <span style={{ fontSize: "12px", color: "#bbb" }}>•</span>
              ) : null}
              <span>{cat.name}</span>
              {childCount > 0 && (
                <span style={{ fontSize: "11px", color: "#999", fontWeight: 400 }}>({childCount})</span>
              )}
            </div>
          </td>
          <td style={{ padding: "10px 12px", color: "#888", fontFamily: "monospace", fontSize: "12px" }}>{cat.slug}</td>
          <td style={{ padding: "10px 12px", textAlign: "center" }}>
            {cat.color && cat.color !== "#2D2B7F" ? (
              <div style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
                <div style={{ width: "14px", height: "14px", borderRadius: "4px", background: cat.color }} />
                <span style={{ fontSize: "11px", color: "#888", fontFamily: "monospace" }}>{cat.color}</span>
              </div>
            ) : (
              <span style={{ fontSize: "11px", color: "#ccc" }}>—</span>
            )}
          </td>
          <td style={{ padding: "10px 12px", textAlign: "center", color: "#666" }}>{cat._count?.products || 0}</td>
          <td style={{ padding: "10px 12px", textAlign: "center", color: "#666" }}>{cat.sortOrder}</td>
          <td style={{ padding: "10px 12px", textAlign: "center" }}>
            <span style={{ padding: "3px 10px", borderRadius: "12px", fontSize: "11px", fontWeight: 600, background: cat.isActive ? "#dcfce7" : "#fee2e2", color: cat.isActive ? "#166534" : "#991b1b" }}>
              {cat.isActive ? "Active" : "Inactive"}
            </span>
          </td>
          <td style={{ padding: "10px 12px", textAlign: "right", whiteSpace: "nowrap" }}>
            {depth < 2 && (
              <button onClick={() => openCreate(cat.id)} title="Add sub-category" style={{ background: "none", border: "none", color: "#16a34a", cursor: "pointer", padding: "5px", fontSize: "13px", marginRight: "2px" }}>
                <FaPlus />
              </button>
            )}
            <button onClick={() => openEdit(cat)} title="Edit" style={{ background: "none", border: "none", color: "#2D2B7F", cursor: "pointer", padding: "5px", fontSize: "13px", marginRight: "2px" }}>
              <FaEdit />
            </button>
            <button onClick={() => handleDelete(cat.id, cat.name, childCount)} title="Delete" style={{ background: "none", border: "none", color: "#dc2626", cursor: "pointer", padding: "5px", fontSize: "13px" }}>
              <FaTrash />
            </button>
          </td>
        </tr>
        {isExpanded && cat.children?.map((child) => renderCategoryRow(child, depth + 1))}
      </React.Fragment>
    );
  };

  const getParentName = (parentId: string) => {
    const found = allFlat.find((c) => c.id === parentId);
    return found ? found.name : "";
  };

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "24px" }}>
        <div>
          <h1 style={{ fontSize: "24px", fontWeight: 700, color: "#1a1a2e", margin: 0 }}>Categories</h1>
          <p style={{ color: "#888", fontSize: "14px", margin: "4px 0 0" }}>
            {categories.length} main categories · {countAll(categories)} total
          </p>
        </div>
        <div style={{ display: "flex", gap: "8px" }}>
          <button onClick={expandAll} style={{ padding: "8px 14px", border: "1px solid #ddd", borderRadius: "8px", fontSize: "12px", background: "#fff", cursor: "pointer", color: "#555" }}>
            Expand All
          </button>
          <button onClick={collapseAll} style={{ padding: "8px 14px", border: "1px solid #ddd", borderRadius: "8px", fontSize: "12px", background: "#fff", cursor: "pointer", color: "#555" }}>
            Collapse All
          </button>
          <button onClick={() => openCreate()} style={{ display: "flex", alignItems: "center", gap: "8px", padding: "10px 20px", background: "#2D2B7F", color: "#fff", border: "none", borderRadius: "8px", fontSize: "13px", fontWeight: 600, cursor: "pointer" }}>
            <FaPlus /> Add Category
          </button>
        </div>
      </div>

      <div style={{ background: "#fff", borderRadius: "12px", border: "1px solid #f0f0f0", boxShadow: "0 1px 3px rgba(0,0,0,0.06)", overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
          <thead>
            <tr style={{ background: "#fafafa" }}>
              <th style={{ padding: "12px 12px", textAlign: "left", fontWeight: 600, color: "#666", width: "40px" }}></th>
              <th style={{ padding: "12px 12px", textAlign: "left", fontWeight: 600, color: "#666" }}>Name</th>
              <th style={{ padding: "12px 12px", textAlign: "left", fontWeight: 600, color: "#666" }}>Slug</th>
              <th style={{ padding: "12px 12px", textAlign: "center", fontWeight: 600, color: "#666" }}>Color</th>
              <th style={{ padding: "12px 12px", textAlign: "center", fontWeight: 600, color: "#666" }}>Products</th>
              <th style={{ padding: "12px 12px", textAlign: "center", fontWeight: 600, color: "#666" }}>Order</th>
              <th style={{ padding: "12px 12px", textAlign: "center", fontWeight: 600, color: "#666" }}>Status</th>
              <th style={{ padding: "12px 12px", textAlign: "right", fontWeight: 600, color: "#666" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((cat) => renderCategoryRow(cat, 0))}
            {categories.length === 0 && (
              <tr><td colSpan={8} style={{ padding: "40px", textAlign: "center", color: "#999" }}>No categories yet</td></tr>
            )}
          </tbody>
        </table>
      </div>

      <AdminModal title={editing ? "Edit Category" : form.parentId ? `Add Sub-Category under "${getParentName(form.parentId)}"` : "Add Category"} isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <form onSubmit={handleSubmit}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
            <div>
              <label style={{ display: "block", fontSize: "13px", fontWeight: 500, color: "#555", marginBottom: "6px" }}>Name *</label>
              <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value, slug: editing ? form.slug : handleSlug(e.target.value) })} required style={inputStyle} />
            </div>
            <div>
              <label style={{ display: "block", fontSize: "13px", fontWeight: 500, color: "#555", marginBottom: "6px" }}>Slug *</label>
              <input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} required style={{ ...inputStyle, fontFamily: "monospace" }} />
            </div>
          </div>

          <div style={{ marginBottom: "16px" }}>
            <label style={{ display: "block", fontSize: "13px", fontWeight: 500, color: "#555", marginBottom: "6px" }}>Parent Category</label>
            <select
              value={form.parentId}
              onChange={(e) => setForm({ ...form, parentId: e.target.value })}
              style={inputStyle}
            >
              <option value="">— None (Top-Level) —</option>
              {allFlat.filter((c) => c.id !== editing?.id).map((c) => (
                <option key={c.id} value={c.id}>
                  {c.parentId ? "  └ " : ""}{c.name}
                </option>
              ))}
            </select>
          </div>

          <div style={{ marginBottom: "16px" }}>
            <label style={{ display: "block", fontSize: "13px", fontWeight: 500, color: "#555", marginBottom: "6px" }}>Description</label>
            <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} style={{ ...inputStyle, resize: "vertical" }} />
          </div>

          <div style={{ marginBottom: "16px" }}>
            <label style={{ display: "block", fontSize: "13px", fontWeight: 500, color: "#555", marginBottom: "6px" }}>Icon Name</label>
            <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
              <input value={form.icon} onChange={(e) => setForm({ ...form, icon: e.target.value })} style={{ ...inputStyle, flex: 1 }} placeholder="e.g. FaFlask, FaDna, GiMolecule" />
              {form.icon && iconMap[form.icon] && (
                <span style={{ fontSize: "20px", color: form.color || "#2D2B7F", minWidth: "28px", textAlign: "center" }}>{iconMap[form.icon]}</span>
              )}
            </div>
            <span style={{ fontSize: "11px", color: "#999", marginTop: "4px", display: "block" }}>
              Available: FaFlask, FaSyringe, FaAtom, FaVials, FaMicroscope, FaDna, FaFilter, FaShieldAlt, GiChemicalDrop, GiMolecule
            </span>
          </div>

          <div style={{ marginBottom: "16px" }}>
            <label style={{ display: "block", fontSize: "13px", fontWeight: 500, color: "#555", marginBottom: "6px" }}>Category Image</label>
            {form.image ? (
              <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                <img src={form.image} alt="preview" style={{ width: "80px", height: "80px", borderRadius: "8px", objectFit: "cover", border: "1px solid #ddd" }} />
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: "12px", color: "#666", margin: "0 0 8px" }}>Current image:</p>
                  <p style={{ fontSize: "11px", color: "#999", margin: "0 0 12px", wordBreak: "break-all" }}>{form.image}</p>
                  <button type="button" onClick={() => setForm({ ...form, image: "" })} style={{ padding: "6px 12px", background: "#fee2e2", color: "#991b1b", border: "none", borderRadius: "6px", fontSize: "12px", fontWeight: 500, cursor: "pointer", display: "flex", alignItems: "center", gap: "6px" }}>
                    <FaTimes size={12} /> Remove
                  </button>
                </div>
              </div>
            ) : (
              <div onDragOver={handleDragOver} onDrop={handleDrop} style={{ border: "2px dashed #ddd", borderRadius: "8px", padding: "24px", textAlign: "center", cursor: "pointer", background: "#fafbff", transition: "all 0.2s" }}>
                <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageChange} style={{ display: "none" }} />
                <div style={{ fontSize: "28px", marginBottom: "8px" }}>📷</div>
                <p style={{ fontSize: "13px", fontWeight: 500, color: "#333", margin: "0 0 4px" }}>Drag and drop your image</p>
                <p style={{ fontSize: "12px", color: "#999", margin: "0 0 12px" }}>or click to browse</p>
                <button type="button" onClick={() => fileInputRef.current?.click()} style={{ padding: "8px 16px", background: "#2D2B7F", color: "#fff", border: "none", borderRadius: "6px", fontSize: "12px", fontWeight: 600, cursor: "pointer" }}>
                  Choose Image
                </button>
              </div>
            )}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px", marginBottom: "16px" }}>
            <div>
              <label style={{ display: "block", fontSize: "13px", fontWeight: 500, color: "#555", marginBottom: "6px" }}>Color</label>
              <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                <input type="color" value={form.color} onChange={(e) => setForm({ ...form, color: e.target.value })} style={{ width: "40px", height: "36px", border: "1px solid #ddd", borderRadius: "6px", padding: "2px", cursor: "pointer" }} />
                <input value={form.color} onChange={(e) => setForm({ ...form, color: e.target.value })} style={{ ...inputStyle, flex: 1 }} />
              </div>
            </div>
            <div>
              <label style={{ display: "block", fontSize: "13px", fontWeight: 500, color: "#555", marginBottom: "6px" }}>Sort Order</label>
              <input type="number" value={form.sortOrder} onChange={(e) => setForm({ ...form, sortOrder: parseInt(e.target.value) || 0 })} style={inputStyle} />
            </div>
            <div>
              <label style={{ display: "block", fontSize: "13px", fontWeight: 500, color: "#555", marginBottom: "6px" }}>Status</label>
              <select value={form.isActive ? "true" : "false"} onChange={(e) => setForm({ ...form, isActive: e.target.value === "true" })} style={inputStyle}>
                <option value="true">Active</option>
                <option value="false">Inactive</option>
              </select>
            </div>
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
