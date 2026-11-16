"use client";

import { useState, useEffect } from "react";
import { FaPlus, FaEdit, FaTrash, FaBriefcase } from "react-icons/fa";
import AdminModal from "../components/AdminModal";

interface JobOpening {
  id: string;
  title: string;
  department?: string;
  location?: string;
  type?: string;
  description?: string;
  responsibilities: string[];
  requirements: string[];
  isActive: boolean;
  postedAt: string;
}

const emptyForm = {
  title: "", department: "", location: "", type: "Full-Time",
  description: "", isActive: true,
};

export default function AdminCareers() {
  const [jobs, setJobs] = useState<JobOpening[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<JobOpening | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [responsibilities, setResponsibilities] = useState<string[]>([""]);
  const [requirements, setRequirements] = useState<string[]>([""]);
  const [saving, setSaving] = useState(false);

  const load = () => {
    fetch("/api/admin/job-openings")
      .then((r) => r.json())
      .then((data) => { setJobs(data); setLoading(false); })
      .catch(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const openCreate = () => {
    setEditing(null);
    setForm(emptyForm);
    setResponsibilities([""]);
    setRequirements([""]);
    setModalOpen(true);
  };

  const openEdit = (job: JobOpening) => {
    setEditing(job);
    setForm({
      title: job.title, department: job.department || "", location: job.location || "",
      type: job.type || "Full-Time", description: job.description || "", isActive: job.isActive,
    });
    setResponsibilities(job.responsibilities.length > 0 ? [...job.responsibilities] : [""]);
    setRequirements(job.requirements.length > 0 ? [...job.requirements] : [""]);
    setModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const method = editing ? "PUT" : "POST";
    const body = {
      ...(editing ? { id: editing.id } : {}),
      ...form,
      responsibilities: responsibilities.filter((r) => r.trim()),
      requirements: requirements.filter((r) => r.trim()),
    };
    await fetch("/api/admin/job-openings", { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
    setSaving(false);
    setModalOpen(false);
    load();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this job opening?")) return;
    await fetch("/api/admin/job-openings", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) });
    load();
  };

  const updateListItem = (list: string[], setList: (v: string[]) => void, index: number, value: string) => {
    const updated = [...list];
    updated[index] = value;
    setList(updated);
  };

  const addListItem = (list: string[], setList: (v: string[]) => void) => setList([...list, ""]);
  const removeListItem = (list: string[], setList: (v: string[]) => void, index: number) => setList(list.filter((_, i) => i !== index));

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
          <h1 style={{ fontSize: "24px", fontWeight: 700, color: "#1a1a2e", margin: 0 }}>Careers / Job Openings</h1>
          <p style={{ color: "#888", fontSize: "14px", margin: "4px 0 0" }}>{jobs.length} job openings</p>
        </div>
        <button onClick={openCreate} style={{ display: "flex", alignItems: "center", gap: "8px", padding: "10px 20px", background: "#2D2B7F", color: "#fff", border: "none", borderRadius: "8px", fontSize: "13px", fontWeight: 600, cursor: "pointer" }}>
          <FaPlus /> Add Job Opening
        </button>
      </div>

      <div style={{ background: "#fff", borderRadius: "12px", border: "1px solid #f0f0f0", boxShadow: "0 1px 3px rgba(0,0,0,0.06)", overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
          <thead>
            <tr style={{ background: "#fafafa" }}>
              <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, color: "#666" }}>Title</th>
              <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, color: "#666" }}>Department</th>
              <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, color: "#666" }}>Location</th>
              <th style={{ padding: "12px 16px", textAlign: "center", fontWeight: 600, color: "#666" }}>Type</th>
              <th style={{ padding: "12px 16px", textAlign: "center", fontWeight: 600, color: "#666" }}>Status</th>
              <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, color: "#666" }}>Posted</th>
              <th style={{ padding: "12px 16px", textAlign: "right", fontWeight: 600, color: "#666" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job) => (
              <tr key={job.id} style={{ borderBottom: "1px solid #f5f5f5" }}>
                <td style={{ padding: "12px 16px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <div style={{ width: "32px", height: "32px", borderRadius: "8px", background: "#2D2B7F15", display: "flex", alignItems: "center", justifyContent: "center", color: "#2D2B7F", fontSize: "13px", flexShrink: 0 }}>
                      <FaBriefcase />
                    </div>
                    <span style={{ fontWeight: 500, color: "#333" }}>{job.title}</span>
                  </div>
                </td>
                <td style={{ padding: "12px 16px", color: "#666" }}>{job.department || "—"}</td>
                <td style={{ padding: "12px 16px", color: "#666" }}>{job.location || "—"}</td>
                <td style={{ padding: "12px 16px", textAlign: "center" }}>
                  <span style={{ padding: "3px 10px", borderRadius: "12px", fontSize: "11px", fontWeight: 600, background: "#e0e7ff", color: "#3730a3" }}>
                    {job.type}
                  </span>
                </td>
                <td style={{ padding: "12px 16px", textAlign: "center" }}>
                  <span style={{ padding: "3px 10px", borderRadius: "12px", fontSize: "11px", fontWeight: 600, background: job.isActive ? "#dcfce7" : "#fee2e2", color: job.isActive ? "#166534" : "#991b1b" }}>
                    {job.isActive ? "Active" : "Closed"}
                  </span>
                </td>
                <td style={{ padding: "12px 16px", color: "#888", fontSize: "12px" }}>{new Date(job.postedAt).toLocaleDateString()}</td>
                <td style={{ padding: "12px 16px", textAlign: "right" }}>
                  <button onClick={() => openEdit(job)} style={{ background: "none", border: "none", color: "#2D2B7F", cursor: "pointer", padding: "6px", fontSize: "14px", marginRight: "4px" }}><FaEdit /></button>
                  <button onClick={() => handleDelete(job.id)} style={{ background: "none", border: "none", color: "#dc2626", cursor: "pointer", padding: "6px", fontSize: "14px" }}><FaTrash /></button>
                </td>
              </tr>
            ))}
            {jobs.length === 0 && (
              <tr><td colSpan={7} style={{ padding: "40px", textAlign: "center", color: "#999" }}>No job openings yet</td></tr>
            )}
          </tbody>
        </table>
      </div>

      <AdminModal title={editing ? "Edit Job Opening" : "Add Job Opening"} isOpen={modalOpen} onClose={() => setModalOpen(false)} width="680px">
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "16px" }}>
            <label style={{ display: "block", fontSize: "13px", fontWeight: 500, color: "#555", marginBottom: "6px" }}>Job Title *</label>
            <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required style={inputStyle} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px", marginBottom: "16px" }}>
            <div>
              <label style={{ display: "block", fontSize: "13px", fontWeight: 500, color: "#555", marginBottom: "6px" }}>Department</label>
              <input value={form.department} onChange={(e) => setForm({ ...form, department: e.target.value })} style={inputStyle} />
            </div>
            <div>
              <label style={{ display: "block", fontSize: "13px", fontWeight: 500, color: "#555", marginBottom: "6px" }}>Location</label>
              <input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} style={inputStyle} placeholder="e.g. Hyderabad" />
            </div>
            <div>
              <label style={{ display: "block", fontSize: "13px", fontWeight: 500, color: "#555", marginBottom: "6px" }}>Type</label>
              <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} style={inputStyle}>
                <option value="Full-Time">Full-Time</option>
                <option value="Part-Time">Part-Time</option>
                <option value="Contract">Contract</option>
                <option value="Internship">Internship</option>
              </select>
            </div>
          </div>
          <div style={{ marginBottom: "16px" }}>
            <label style={{ display: "block", fontSize: "13px", fontWeight: 500, color: "#555", marginBottom: "6px" }}>Description</label>
            <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} style={{ ...inputStyle, resize: "vertical" }} />
          </div>

          {/* Responsibilities */}
          <div style={{ marginBottom: "16px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
              <label style={{ fontSize: "13px", fontWeight: 500, color: "#555" }}>Responsibilities</label>
              <button type="button" onClick={() => addListItem(responsibilities, setResponsibilities)} style={{ fontSize: "12px", color: "#2D2B7F", background: "none", border: "none", cursor: "pointer", fontWeight: 600 }}>+ Add</button>
            </div>
            {responsibilities.map((item, i) => (
              <div key={i} style={{ display: "flex", gap: "8px", marginBottom: "6px" }}>
                <input value={item} onChange={(e) => updateListItem(responsibilities, setResponsibilities, i, e.target.value)} style={{ ...inputStyle, padding: "8px 10px", fontSize: "13px" }} placeholder={`Responsibility ${i + 1}`} />
                {responsibilities.length > 1 && (
                  <button type="button" onClick={() => removeListItem(responsibilities, setResponsibilities, i)} style={{ background: "none", border: "none", color: "#dc2626", cursor: "pointer", fontSize: "13px", padding: "4px 8px", flexShrink: 0 }}><FaTrash /></button>
                )}
              </div>
            ))}
          </div>

          {/* Requirements */}
          <div style={{ marginBottom: "16px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
              <label style={{ fontSize: "13px", fontWeight: 500, color: "#555" }}>Requirements</label>
              <button type="button" onClick={() => addListItem(requirements, setRequirements)} style={{ fontSize: "12px", color: "#2D2B7F", background: "none", border: "none", cursor: "pointer", fontWeight: 600 }}>+ Add</button>
            </div>
            {requirements.map((item, i) => (
              <div key={i} style={{ display: "flex", gap: "8px", marginBottom: "6px" }}>
                <input value={item} onChange={(e) => updateListItem(requirements, setRequirements, i, e.target.value)} style={{ ...inputStyle, padding: "8px 10px", fontSize: "13px" }} placeholder={`Requirement ${i + 1}`} />
                {requirements.length > 1 && (
                  <button type="button" onClick={() => removeListItem(requirements, setRequirements, i)} style={{ background: "none", border: "none", color: "#dc2626", cursor: "pointer", fontSize: "13px", padding: "4px 8px", flexShrink: 0 }}><FaTrash /></button>
                )}
              </div>
            ))}
          </div>

          <div style={{ marginBottom: "16px" }}>
            <label style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", color: "#555", cursor: "pointer" }}>
              <input type="checkbox" checked={form.isActive} onChange={(e) => setForm({ ...form, isActive: e.target.checked })} /> Active (visible on careers page)
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
