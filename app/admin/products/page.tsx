"use client";

import { useState, useEffect, useCallback } from "react";
import { FaPlus, FaEdit, FaTrash, FaSearch, FaChevronLeft, FaChevronRight, FaBoxes, FaChevronDown, FaChevronUp, FaFileImport } from "react-icons/fa";
import AdminModal from "../components/AdminModal";
import Link from "next/link";
import { cleanProductName } from "@/app/lib/textUtils";

interface Variant {
  id?: string;
  sku: string;
  packSize: string;
  price: number;
}

interface Product {
  id: string;
  catalogNumber: string;
  name: string;
  description?: string;
  productLine?: string;
  brand?: string;
  manufacturer?: string;
  categoryId?: string;
  primaryCategory?: string;
  subCategory?: string;
  applications?: string;
  casNumber?: string;
  purity?: string;
  storage?: string;
  image?: string;
  material?: string;
  volume?: string;
  needleShape?: string;
  size?: string;
  section?: string;
  // Antibody-specific
  abType?: string;
  abHost?: string;
  abReactivity?: string;
  abTarget?: string;
  abCloneType?: string;
  abIsotype?: string;
  abImmunogen?: string;
  abCalculatedMw?: string;
  abPurification?: string;
  abStorageBuffer?: string;
  abGeneId?: string;
  abSubcellularLocation?: string;
  abSwissProt?: string;
  abDilutionRatio?: string;
  abApplicationType?: string;
  // ELISA-specific
  elisaDetectionRange?: string;
  elisaSensitivity?: string;
  elisaReactivity?: string;
  elisaSampleType?: string;
  elisaChineseName?: string;
  // Other specialised
  mediaExpiry?: string;
  histoPrimaryCategory?: string;
  // Flags
  isFeatured: boolean;
  isActive: boolean;
  sortOrder: number;
  category?: { id: string; name: string };
  variants?: Variant[];
}

interface Category {
  id: string;
  name: string;
}

const emptyVariant: Variant = { sku: "", packSize: "", price: 0 };

const emptyForm = {
  catalogNumber: "", name: "", description: "", brand: "", manufacturer: "",
  productLine: "", categoryId: "", primaryCategory: "", subCategory: "",
  applications: "", casNumber: "", purity: "", storage: "",
  material: "", volume: "", needleShape: "", size: "", section: "", image: "",
  // Antibody
  abType: "", abHost: "", abReactivity: "", abTarget: "", abCloneType: "",
  abIsotype: "", abImmunogen: "", abCalculatedMw: "", abPurification: "",
  abStorageBuffer: "", abGeneId: "", abSubcellularLocation: "", abSwissProt: "",
  abDilutionRatio: "", abApplicationType: "",
  // ELISA
  elisaDetectionRange: "", elisaSensitivity: "", elisaReactivity: "",
  elisaSampleType: "", elisaChineseName: "",
  // Other
  mediaExpiry: "", histoPrimaryCategory: "",
  // Flags
  isFeatured: false, isActive: true, sortOrder: 0,
};

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterCat, setFilterCat] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [variants, setVariants] = useState<Variant[]>([{ ...emptyVariant }]);
  const [saving, setSaving] = useState(false);
  const [showAntibody, setShowAntibody] = useState(false);
  const [showElisa, setShowElisa] = useState(false);
  const [importing, setImporting] = useState(false);
  const [importStatus, setImportStatus] = useState("");
  const [importProgress, setImportProgress] = useState(0);
  const [importTotal, setImportTotal] = useState(0);

  const load = useCallback(() => {
    const params = new URLSearchParams({ page: String(page), limit: "15" });
    if (search) params.set("search", search);
    if (filterCat) params.set("categoryId", filterCat);
    fetch(`/api/admin/products?${params}`)
      .then((r) => r.json())
      .then((data) => {
        setProducts(data.products || []);
        setTotalPages(data.totalPages || 1);
        setTotal(data.total || 0);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [page, search, filterCat]);

  useEffect(() => {
    fetch("/api/admin/categories?flat=true").then((r) => r.json()).then((data) => { if (Array.isArray(data)) setCategories(data); }).catch(() => {});
  }, []);

  useEffect(() => { load(); }, [load]);

  const openCreate = () => {
    setEditing(null);
    setForm(emptyForm);
    setVariants([{ ...emptyVariant }]);
    setShowAntibody(false);
    setShowElisa(false);
    setModalOpen(true);
  };

  const openEdit = (p: Product) => {
    setEditing(p);
    setForm({
      catalogNumber: p.catalogNumber, name: cleanProductName(p.name), description: p.description || "",
      brand: p.brand || "", manufacturer: p.manufacturer || "", productLine: p.productLine || "",
      categoryId: p.categoryId || "", primaryCategory: p.primaryCategory || "",
      subCategory: p.subCategory || "", applications: p.applications || "",
      casNumber: p.casNumber || "", purity: p.purity || "", storage: p.storage || "",
      material: p.material || "", volume: p.volume || "", needleShape: p.needleShape || "",
      size: p.size || "", section: p.section || "", image: p.image || "",
      // Antibody
      abType: p.abType || "", abHost: p.abHost || "", abReactivity: p.abReactivity || "",
      abTarget: p.abTarget || "", abCloneType: p.abCloneType || "", abIsotype: p.abIsotype || "",
      abImmunogen: p.abImmunogen || "", abCalculatedMw: p.abCalculatedMw || "",
      abPurification: p.abPurification || "", abStorageBuffer: p.abStorageBuffer || "",
      abGeneId: p.abGeneId || "", abSubcellularLocation: p.abSubcellularLocation || "",
      abSwissProt: p.abSwissProt || "", abDilutionRatio: p.abDilutionRatio || "",
      abApplicationType: p.abApplicationType || "",
      // ELISA
      elisaDetectionRange: p.elisaDetectionRange || "", elisaSensitivity: p.elisaSensitivity || "",
      elisaReactivity: p.elisaReactivity || "", elisaSampleType: p.elisaSampleType || "",
      elisaChineseName: p.elisaChineseName || "",
      // Other
      mediaExpiry: p.mediaExpiry || "", histoPrimaryCategory: p.histoPrimaryCategory || "",
      // Flags
      isFeatured: p.isFeatured, isActive: p.isActive, sortOrder: p.sortOrder,
    });
    const hasAb = !!(p.abType || p.abHost || p.abReactivity || p.abTarget || p.abCloneType || p.abIsotype || p.abImmunogen || p.abCalculatedMw || p.abPurification || p.abStorageBuffer || p.abGeneId || p.abSubcellularLocation || p.abSwissProt || p.abDilutionRatio || p.abApplicationType);
    setShowAntibody(hasAb);
    const hasElisa = !!(p.elisaDetectionRange || p.elisaSensitivity || p.elisaReactivity || p.elisaSampleType || p.elisaChineseName);
    setShowElisa(hasElisa);
    setVariants(
      p.variants && p.variants.length > 0
        ? p.variants.map((v) => ({
            id: v.id,
            sku: v.sku || "",
            packSize: v.packSize || "",
            price: Number(v.price) || 0,
          }))
        : [{ ...emptyVariant }]
    );
    setModalOpen(true);
  };

  const updateVariant = (index: number, field: keyof Variant, value: string | number) => {
    setVariants((prev) => prev.map((v, i) => (i === index ? { ...v, [field]: value } : v)));
  };

  const addVariant = () => setVariants((prev) => [...prev, { ...emptyVariant }]);

  const removeVariant = (index: number) => {
    setVariants((prev) => {
      if (prev.length <= 1) return [{ ...emptyVariant }];
      return prev.filter((_, i) => i !== index);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const method = editing ? "PUT" : "POST";
    const cleanVariants = variants.filter(
      (v) => v.sku || v.packSize || v.price > 0
    );
    const body = {
      ...(editing ? { id: editing.id } : {}),
      ...form,
      variants: cleanVariants,
    };
    await fetch("/api/admin/products", { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
    setSaving(false);
    setModalOpen(false);
    load();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this product and all its variants? This action cannot be undone.")) return;
    await fetch("/api/admin/products", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) });
    load();
  };

  const handleDeleteAllProducts = async () => {
    if (!confirm("⚠️ Delete ALL products and variants? This action CANNOT be undone.")) return;
    if (!confirm("🚨 Are you absolutely sure? This will permanently delete all products.")) return;

    try {
      setSaving(true);
      const response = await fetch("/api/admin/products", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ deleteAll: true }),
      });

      const data = await response.json();

      if (data.success) {
        setImportStatus(`✅ Deleted ${data.deletedProducts} products and ${data.deletedVariants} variants`);
        load();
      } else {
        setImportStatus(`❌ ${data.error || "Failed to delete products"}`);
      }
    } catch (error) {
      setImportStatus(`❌ Error: ${String(error)}`);
    } finally {
      setSaving(false);
    }
  };

  const downloadCSVSample = () => {
    const sampleData = [
      ["catalogNumber", "name", "description", "brand", "productLine", "manufacturer", "categoryId", "primaryCategory", "subCategory", "applications", "casNumber", "purity", "storage", "image", "material", "volume", "needleShape", "size", "section", "abType", "abHost", "abReactivity", "abTarget", "abCloneType", "abIsotype", "abImmunogen", "abCalculatedMw", "abPurification", "abStorageBuffer", "abGeneId", "abSubcellularLocation", "abSwissProt", "abDilutionRatio", "abApplicationType", "elisaDetectionRange", "elisaSensitivity", "elisaReactivity", "elisaSampleType", "elisaChineseName", "mediaExpiry", "histoPrimaryCategory", "isFeatured", "isActive", "sortOrder"],
      ["CAT-001", "Anti-Beta Actin Antibody", "High-quality primary antibody for detection", "Solarbio", "Antibodies", "Solarbio Inc", "", "Antibodies", "Primary Antibodies", "Western Blot/ELISA", "", "≥95%", "-20°C", "", "", "100ul", "", "", "", "Primary", "Rabbit", "Human/Mouse", "Beta Actin", "Monoclonal", "IgG", "Beta Actin protein", "42kDa", "Affinity purification", "PBS with 0.05% Azide", "1234", "Cytoplasm", "P60709", "1:1000", "Detection", "", "", "", "", "", "", "", "true", "true", "1"],
      ["CAT-002", "PCR Master Mix", "Ready-to-use PCR master mix", "Solarbio", "Reagents", "Solarbio Inc", "", "Reagents", "PCR Reagents", "PCR/qPCR", "64339-29-5", "", "2-8°C", "", "", "50ml", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "false", "true", "2"],
    ];

    const csv = sampleData.map((row) => row.map((cell) => `"${cell}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "products_sample.csv";
    link.click();
    window.URL.revokeObjectURL(url);
  };

  const handleCSVFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      setImportStatus("⏳ Uploading CSV file...");
      const response = await fetch("/api/admin/upload-csv", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!data.success) {
        setImportStatus(`❌ ${data.error || "Upload failed"}`);
        return;
      }

      setImportStatus(`✅ CSV uploaded: ${data.recordCount || 0} records queued. Processing in background...`);

      e.target.value = "";
    } catch (error) {
      setImportStatus(`❌ Error: ${String(error)}`);
    }
  };

  const handleImport = async () => {
    if (!confirm("This will DELETE all existing products and re-import from the CSV catalog.\n\n55,000+ products will be imported. This may take a few minutes.\n\nContinue?")) return;
    setImporting(true);
    setImportProgress(0);
    setImportTotal(0);
    setImportStatus("⏳ Parsing CSV & preparing categories...");

    const BATCH_SIZE = 5;

    try {
      // Phase 1: PREPARE — parse CSV, clear DB, create categories, cache products
      const prepRes = await fetch("/api/admin/import-products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "prepare" }),
      });
      const prepData = await prepRes.json();

      if (!prepData.success) {
        setImportStatus(`❌ Prepare failed: ${prepData.error || "Unknown error"}`);
        setImporting(false);
        return;
      }

      const totalProducts = prepData.totalProducts as number;
      setImportTotal(totalProducts);
      setImportStatus(`⏳ Inserting ${totalProducts.toLocaleString()} products...`);

      // Phase 2: BATCH — loop through batches with progress
      let offset = 0;
      let totalInserted = 0;
      let finalStats = null;

      while (offset < totalProducts) {
        const batchRes = await fetch("/api/admin/import-products", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action: "batch", offset, limit: BATCH_SIZE }),
        });
        const batchData = await batchRes.json();

        if (!batchData.success) {
          setImportStatus(`❌ Batch failed at offset ${offset}: ${batchData.error || "Unknown error"}`);
          setImporting(false);
          return;
        }

        totalInserted += batchData.inserted;
        offset += BATCH_SIZE;
        setImportProgress(Math.min(totalInserted, totalProducts));
        setImportStatus(`⏳ Inserted ${Math.min(totalInserted, totalProducts).toLocaleString()} / ${totalProducts.toLocaleString()} products...`);

        // Add delay between batches to prevent overwhelming the database
        if (!batchData.done) {
          await new Promise((resolve) => setTimeout(resolve, 500));
        }

        if (batchData.done) {
          finalStats = batchData.stats;
          break;
        }
      }

      if (finalStats) {
        setImportStatus(`✅ Done! ${finalStats.productsInDb.toLocaleString()} products, ${finalStats.variantsInDb.toLocaleString()} variants, ${finalStats.categoriesInDb} categories.`);
      } else {
        setImportStatus(`✅ Done! ${totalInserted.toLocaleString()} products imported.`);
      }
      setImportProgress(totalProducts);
      load();
    } catch (err) {
      setImportStatus(`❌ Failed: ${String(err)}`);
    } finally {
      setImporting(false);
    }
  };

  const handleResumeImport = async () => {
    const resumeOffset = prompt("Enter the offset to resume from (e.g., 23770):", "23770");
    if (!resumeOffset) return;
    const startOffset = parseInt(resumeOffset, 10);
    if (isNaN(startOffset) || startOffset < 0) {
      alert("Invalid offset number");
      return;
    }

    if (!confirm(`Resume import from offset ${startOffset}?\n\nThis will NOT delete existing products.\nProducts already imported will be skipped (duplicates ignored).`)) return;

    setImporting(true);
    setImportProgress(startOffset);
    setImportTotal(55242);
    setImportStatus("⏳ Preparing to resume import...");

    const BATCH_SIZE = 5;

    try {
      // Phase 1: PREPARE with skipClear=true
      const prepRes = await fetch("/api/admin/import-products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "prepare", skipClear: true }),
      });
      const prepData = await prepRes.json();

      if (!prepData.success) {
        setImportStatus(`❌ Prepare failed: ${prepData.error || "Unknown error"}`);
        setImporting(false);
        return;
      }

      const totalProducts = prepData.totalProducts as number;
      setImportTotal(totalProducts);
      setImportStatus(`⏳ Resuming from offset ${startOffset}...`);

      // Phase 2: BATCH — resume from given offset
      let offset = startOffset;
      let totalInserted = startOffset;
      let finalStats = null;

      while (offset < totalProducts) {
        const batchRes = await fetch("/api/admin/import-products", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action: "batch", offset, limit: BATCH_SIZE }),
        });
        const batchData = await batchRes.json();

        if (!batchData.success) {
          setImportStatus(`❌ Batch failed at offset ${offset}: ${batchData.error || "Unknown error"}`);
          setImporting(false);
          return;
        }

        totalInserted += batchData.inserted;
        offset += BATCH_SIZE;
        setImportProgress(Math.min(totalInserted, totalProducts));
        setImportStatus(`⏳ Inserted ${Math.min(totalInserted, totalProducts).toLocaleString()} / ${totalProducts.toLocaleString()} products...`);

        // Add delay between batches
        if (!batchData.done) {
          await new Promise((resolve) => setTimeout(resolve, 500));
        }

        if (batchData.done) {
          finalStats = batchData.stats;
          break;
        }
      }

      if (finalStats) {
        setImportStatus(`✅ Done! ${finalStats.productsInDb.toLocaleString()} products, ${finalStats.variantsInDb.toLocaleString()} variants, ${finalStats.categoriesInDb} categories.`);
      } else {
        setImportStatus(`✅ Done! ${totalInserted.toLocaleString()} products imported.`);
      }
      setImportProgress(totalProducts);
      load();
    } catch (err) {
      setImportStatus(`❌ Failed: ${String(err)}`);
    } finally {
      setImporting(false);
    }
  };

  const getPrice = (p: Product) => {
    if (!p.variants || p.variants.length === 0) return null;
    const prices = p.variants.map((v) => Number(v.price)).filter((n) => n > 0);
    if (prices.length === 0) return null;
    const min = Math.min(...prices);
    return `₹${min.toLocaleString("en-IN")}`;
  };

  const inputStyle: React.CSSProperties = { width: "100%", padding: "10px 12px", border: "1px solid #ddd", borderRadius: "8px", fontSize: "14px", outline: "none", boxSizing: "border-box" };
  const labelStyle: React.CSSProperties = { display: "block", fontSize: "13px", fontWeight: 500, color: "#555", marginBottom: "6px" };
  const variantInputStyle: React.CSSProperties = { ...inputStyle, padding: "8px 10px", fontSize: "13px" };

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
          <h1 style={{ fontSize: "24px", fontWeight: 700, color: "#1a1a2e", margin: 0 }}>Products</h1>
          <p style={{ color: "#888", fontSize: "14px", margin: "4px 0 0" }}>{total} products total</p>
        </div>
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <Link href="/admin/import-products" style={{ display: "flex", alignItems: "center", gap: "8px", padding: "10px 20px", background: "#16a34a", color: "#fff", border: "none", borderRadius: "8px", fontSize: "13px", fontWeight: 600, cursor: "pointer", textDecoration: "none" }}>
            <FaFileImport /> Bulk Import
          </Link>
          <button onClick={openCreate} style={{ display: "flex", alignItems: "center", gap: "8px", padding: "10px 20px", background: "#2D2B7F", color: "#fff", border: "none", borderRadius: "8px", fontSize: "13px", fontWeight: 600, cursor: "pointer" }}>
            <FaPlus /> Add Product
          </button>
          <button onClick={handleDeleteAllProducts} style={{ display: "flex", alignItems: "center", gap: "8px", padding: "10px 20px", background: "#dc2626", color: "#fff", border: "none", borderRadius: "8px", fontSize: "13px", fontWeight: 600, cursor: "pointer" }}>
            <FaTrash /> Delete All
          </button>
        </div>
      </div>

      {/* Import Status Banner */}
      {importStatus && (
        <div style={{
          padding: "12px 16px",
          marginBottom: "16px",
          borderRadius: "8px",
          fontSize: "13px",
          fontWeight: 500,
          background: importStatus.startsWith("✅") ? "#dcfce7" : importStatus.startsWith("❌") ? "#fee2e2" : "#dbeafe",
          color: importStatus.startsWith("✅") ? "#166534" : importStatus.startsWith("❌") ? "#991b1b" : "#1e40af",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}>
          <span>{importStatus}</span>
          <button onClick={() => setImportStatus("")} style={{ background: "none", border: "none", cursor: "pointer", fontSize: "16px", color: "inherit", padding: "0 4px" }}>×</button>
        </div>
      )}

      {/* Filters */}
      <div style={{ display: "flex", gap: "12px", marginBottom: "16px", flexWrap: "wrap" }}>
        <div style={{ position: "relative", flex: "1 1 300px" }}>
          <FaSearch style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#aaa", fontSize: "13px" }} />
          <input
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            placeholder="Search products..."
            style={{ ...inputStyle, paddingLeft: "36px" }}
          />
        </div>
        <select value={filterCat} onChange={(e) => { setFilterCat(e.target.value); setPage(1); }} style={{ ...inputStyle, width: "auto", minWidth: "180px" }}>
          <option value="">All Categories</option>
          {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
      </div>

      <div style={{ background: "#fff", borderRadius: "12px", border: "1px solid #f0f0f0", boxShadow: "0 1px 3px rgba(0,0,0,0.06)", overflow: "hidden" }}>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
            <thead>
              <tr style={{ background: "#fafafa" }}>
                <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, color: "#666" }}>Catalog #</th>
                <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, color: "#666" }}>Name</th>
                <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, color: "#666" }}>Brand</th>
                <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, color: "#666" }}>Category</th>
                <th style={{ padding: "12px 16px", textAlign: "center", fontWeight: 600, color: "#666" }}>Variants</th>
                <th style={{ padding: "12px 16px", textAlign: "right", fontWeight: 600, color: "#666" }}>Price</th>
                <th style={{ padding: "12px 16px", textAlign: "center", fontWeight: 600, color: "#666" }}>Featured</th>
                <th style={{ padding: "12px 16px", textAlign: "center", fontWeight: 600, color: "#666" }}>Status</th>
                <th style={{ padding: "12px 16px", textAlign: "right", fontWeight: 600, color: "#666" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id} style={{ borderBottom: "1px solid #f5f5f5" }}>
                  <td style={{ padding: "12px 16px", fontFamily: "monospace", fontSize: "12px", color: "#2D2B7F", fontWeight: 500 }}>{p.catalogNumber}</td>
                  <td style={{ padding: "12px 16px", fontWeight: 500, color: "#333", maxWidth: "250px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{cleanProductName(p.name)}</td>
                  <td style={{ padding: "12px 16px", color: "#666" }}>
                    {p.brand ? <span style={{ padding: "2px 8px", borderRadius: "10px", fontSize: "11px", fontWeight: 600, background: p.brand === "Solarbio" ? "#e0f2fe" : "#f3f4f6", color: p.brand === "Solarbio" ? "#0369a1" : "#555" }}>{p.brand}</span> : "—"}
                  </td>
                  <td style={{ padding: "12px 16px", color: "#666" }}>{p.category?.name || "—"}</td>
                  <td style={{ padding: "12px 16px", textAlign: "center" }}>
                    {p.variants && p.variants.length > 0 ? (
                      <span style={{ display: "inline-flex", alignItems: "center", gap: "4px", padding: "2px 8px", borderRadius: "10px", fontSize: "11px", fontWeight: 600, background: "#f0f9ff", color: "#0369a1" }}>
                        <FaBoxes style={{ fontSize: "10px" }} /> {p.variants.length}
                      </span>
                    ) : (
                      <span style={{ color: "#ccc" }}>—</span>
                    )}
                  </td>
                  <td style={{ padding: "12px 16px", textAlign: "right", color: "#333", fontWeight: 500 }}>
                    {getPrice(p) || "—"}
                    {p.variants && p.variants.length > 1 && <span style={{ fontSize: "10px", color: "#999", marginLeft: "2px" }}>+</span>}
                  </td>
                  <td style={{ padding: "12px 16px", textAlign: "center" }}>
                    {p.isFeatured && <span style={{ padding: "3px 8px", borderRadius: "12px", fontSize: "11px", fontWeight: 600, background: "#ede9fe", color: "#6d28d9" }}>Featured</span>}
                  </td>
                  <td style={{ padding: "12px 16px", textAlign: "center" }}>
                    <span style={{ padding: "3px 10px", borderRadius: "12px", fontSize: "11px", fontWeight: 600, background: p.isActive ? "#dcfce7" : "#fee2e2", color: p.isActive ? "#166534" : "#991b1b" }}>
                      {p.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td style={{ padding: "12px 16px", textAlign: "right" }}>
                    <button onClick={() => openEdit(p)} style={{ background: "none", border: "none", color: "#2D2B7F", cursor: "pointer", padding: "6px", fontSize: "14px", marginRight: "4px" }}><FaEdit /></button>
                    <button onClick={() => handleDelete(p.id)} style={{ background: "none", border: "none", color: "#dc2626", cursor: "pointer", padding: "6px", fontSize: "14px" }}><FaTrash /></button>
                  </td>
                </tr>
              ))}
              {products.length === 0 && (
                <tr><td colSpan={9} style={{ padding: "40px", textAlign: "center", color: "#999" }}>No products found</td></tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 16px", borderTop: "1px solid #f0f0f0", fontSize: "13px", color: "#666" }}>
            <span>Page {page} of {totalPages}</span>
            <div style={{ display: "flex", gap: "8px" }}>
              <button disabled={page <= 1} onClick={() => setPage(page - 1)} style={{ padding: "6px 12px", border: "1px solid #ddd", borderRadius: "6px", background: "#fff", cursor: page <= 1 ? "default" : "pointer", opacity: page <= 1 ? 0.4 : 1, display: "flex", alignItems: "center", gap: "4px", fontSize: "12px" }}><FaChevronLeft /> Prev</button>
              <button disabled={page >= totalPages} onClick={() => setPage(page + 1)} style={{ padding: "6px 12px", border: "1px solid #ddd", borderRadius: "6px", background: "#fff", cursor: page >= totalPages ? "default" : "pointer", opacity: page >= totalPages ? 0.4 : 1, display: "flex", alignItems: "center", gap: "4px", fontSize: "12px" }}>Next <FaChevronRight /></button>
            </div>
          </div>
        )}
      </div>

      {/* Product Modal */}
      <AdminModal title={editing ? "Edit Product" : "Add Product"} isOpen={modalOpen} onClose={() => setModalOpen(false)} width="860px">
        <form onSubmit={handleSubmit}>
          {/* ── Identity ── */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
            <div>
              <label style={labelStyle}>Catalog Number *</label>
              <input value={form.catalogNumber} onChange={(e) => setForm({ ...form, catalogNumber: e.target.value })} required style={inputStyle} placeholder="e.g. SE131, HAM-001" />
            </div>
            <div>
              <label style={labelStyle}>Brand</label>
              <input value={form.brand} onChange={(e) => setForm({ ...form, brand: e.target.value })} style={inputStyle} placeholder="e.g. Solarbio, Hamilton" />
            </div>
          </div>
          <div style={{ marginBottom: "16px" }}>
            <label style={labelStyle}>Name *</label>
            <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required style={inputStyle} />
          </div>
          <div style={{ marginBottom: "16px" }}>
            <label style={labelStyle}>Description</label>
            <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} style={{ ...inputStyle, resize: "vertical" }} />
          </div>

          {/* ── Brand & Category ── */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px", marginBottom: "16px" }}>
            <div>
              <label style={labelStyle}>Manufacturer</label>
              <input value={form.manufacturer} onChange={(e) => setForm({ ...form, manufacturer: e.target.value })} style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Product Line</label>
              <input value={form.productLine} onChange={(e) => setForm({ ...form, productLine: e.target.value })} style={inputStyle} placeholder="e.g. Solarbio Life Sciences" />
            </div>
            <div>
              <label style={labelStyle}>Category</label>
              <select value={form.categoryId} onChange={(e) => setForm({ ...form, categoryId: e.target.value })} style={inputStyle}>
                <option value="">No Category</option>
                {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
            <div>
              <label style={labelStyle}>Primary Category (text)</label>
              <input value={form.primaryCategory} onChange={(e) => setForm({ ...form, primaryCategory: e.target.value })} style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Sub Category (text)</label>
              <input value={form.subCategory} onChange={(e) => setForm({ ...form, subCategory: e.target.value })} style={inputStyle} />
            </div>
          </div>

          {/* ── Variants: Pricing & Packaging ── */}
          <div style={{ borderTop: "1px solid #eee", paddingTop: "16px", marginBottom: "16px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <FaBoxes style={{ color: "#2D2B7F", fontSize: "14px" }} />
                <p style={{ fontSize: "14px", fontWeight: 600, color: "#333", margin: 0 }}>Variants (Pack Sizes)</p>
                <span style={{ fontSize: "11px", color: "#999", fontWeight: 400 }}>— Each pack size is a variant with its own SKU &amp; price</span>
              </div>
              <button
                type="button"
                onClick={addVariant}
                style={{ display: "flex", alignItems: "center", gap: "6px", padding: "6px 14px", background: "#f0f9ff", color: "#0369a1", border: "1px solid #bae6fd", borderRadius: "6px", fontSize: "12px", fontWeight: 600, cursor: "pointer" }}
              >
                <FaPlus style={{ fontSize: "10px" }} /> Add Variant
              </button>
            </div>

            {variants.map((v, idx) => (
              <div
                key={idx}
                style={{
                  border: "1px solid #e5e7eb",
                  borderRadius: "10px",
                  padding: "14px 16px",
                  marginBottom: "10px",
                  background: idx % 2 === 0 ? "#fafbff" : "#fff",
                  position: "relative",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "10px" }}>
                  <span style={{ fontSize: "12px", fontWeight: 600, color: "#2D2B7F" }}>
                    Variant {idx + 1} {v.packSize ? `— ${v.packSize}` : ""}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeVariant(idx)}
                    style={{ background: "none", border: "none", color: "#dc2626", cursor: "pointer", padding: "2px 6px", fontSize: "12px" }}
                    title="Remove variant"
                  >
                    <FaTrash />
                  </button>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px" }}>
                  <div>
                    <label style={{ ...labelStyle, fontSize: "11px" }}>SKU</label>
                    <input value={v.sku} onChange={(e) => updateVariant(idx, "sku", e.target.value)} style={variantInputStyle} />
                  </div>
                  <div>
                    <label style={{ ...labelStyle, fontSize: "11px" }}>Pack Size *</label>
                    <input value={v.packSize} onChange={(e) => updateVariant(idx, "packSize", e.target.value)} style={variantInputStyle} placeholder="e.g. 100ml, 500g, 2 ea" />
                  </div>
                  <div>
                    <label style={{ ...labelStyle, fontSize: "11px" }}>Price (₹)</label>
                    <input type="number" step="0.01" value={v.price} onChange={(e) => updateVariant(idx, "price", parseFloat(e.target.value) || 0)} style={variantInputStyle} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ── Scientific Details (product-level) ── */}
          <div style={{ borderTop: "1px solid #eee", paddingTop: "16px", marginBottom: "16px" }}>
            <p style={{ fontSize: "13px", fontWeight: 600, color: "#333", marginBottom: "12px" }}>Scientific Details</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px" }}>
              <div>
                <label style={labelStyle}>CAS Number</label>
                <input value={form.casNumber} onChange={(e) => setForm({ ...form, casNumber: e.target.value })} style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Purity</label>
                <input value={form.purity} onChange={(e) => setForm({ ...form, purity: e.target.value })} style={inputStyle} placeholder="e.g. ≥99%" />
              </div>
              <div>
                <label style={labelStyle}>Storage</label>
                <input value={form.storage} onChange={(e) => setForm({ ...form, storage: e.target.value })} style={inputStyle} placeholder="e.g. -20°C, RT" />
              </div>
            </div>
          </div>

          {/* ── Antibody Details (collapsible) ── */}
          <div style={{ borderTop: "1px solid #eee", paddingTop: "16px", marginBottom: "16px" }}>
            <button
              type="button"
              onClick={() => setShowAntibody(!showAntibody)}
              style={{ display: "flex", alignItems: "center", gap: "8px", background: "none", border: "none", cursor: "pointer", padding: 0, marginBottom: showAntibody ? "12px" : 0, width: "100%" }}
            >
              <span style={{ fontSize: "13px", fontWeight: 600, color: "#333" }}>🧬 Antibody Details</span>
              <span style={{ fontSize: "11px", color: "#999", fontWeight: 400 }}>— Only for antibody products</span>
              <span style={{ marginLeft: "auto", color: "#999", fontSize: "12px" }}>{showAntibody ? <FaChevronUp /> : <FaChevronDown />}</span>
            </button>
            {showAntibody && (
              <div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px", marginBottom: "16px" }}>
                  <div>
                    <label style={labelStyle}>Antibody Type</label>
                    <input value={form.abType} onChange={(e) => setForm({ ...form, abType: e.target.value })} style={inputStyle} placeholder="e.g. Primary, Secondary" />
                  </div>
                  <div>
                    <label style={labelStyle}>Host Species</label>
                    <input value={form.abHost} onChange={(e) => setForm({ ...form, abHost: e.target.value })} style={inputStyle} placeholder="e.g. Rabbit, Mouse" />
                  </div>
                  <div>
                    <label style={labelStyle}>Reactivity</label>
                    <input value={form.abReactivity} onChange={(e) => setForm({ ...form, abReactivity: e.target.value })} style={inputStyle} placeholder="e.g. Human, Mouse, Rat" />
                  </div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px", marginBottom: "16px" }}>
                  <div>
                    <label style={labelStyle}>Target</label>
                    <input value={form.abTarget} onChange={(e) => setForm({ ...form, abTarget: e.target.value })} style={inputStyle} placeholder="e.g. Beta Actin, GAPDH" />
                  </div>
                  <div>
                    <label style={labelStyle}>Clone Type</label>
                    <input value={form.abCloneType} onChange={(e) => setForm({ ...form, abCloneType: e.target.value })} style={inputStyle} placeholder="e.g. Monoclonal, Polyclonal" />
                  </div>
                  <div>
                    <label style={labelStyle}>Isotype</label>
                    <input value={form.abIsotype} onChange={(e) => setForm({ ...form, abIsotype: e.target.value })} style={inputStyle} placeholder="e.g. IgG, IgM" />
                  </div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
                  <div>
                    <label style={labelStyle}>Immunogen</label>
                    <input value={form.abImmunogen} onChange={(e) => setForm({ ...form, abImmunogen: e.target.value })} style={inputStyle} placeholder="Recombinant protein / peptide" />
                  </div>
                  <div>
                    <label style={labelStyle}>Calculated MW</label>
                    <input value={form.abCalculatedMw} onChange={(e) => setForm({ ...form, abCalculatedMw: e.target.value })} style={inputStyle} placeholder="e.g. 42 kDa" />
                  </div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
                  <div>
                    <label style={labelStyle}>Purification</label>
                    <input value={form.abPurification} onChange={(e) => setForm({ ...form, abPurification: e.target.value })} style={inputStyle} placeholder="e.g. Affinity purified" />
                  </div>
                  <div>
                    <label style={labelStyle}>Storage Buffer</label>
                    <input value={form.abStorageBuffer} onChange={(e) => setForm({ ...form, abStorageBuffer: e.target.value })} style={inputStyle} placeholder="e.g. PBS with 0.02% sodium azide" />
                  </div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px", marginBottom: "16px" }}>
                  <div>
                    <label style={labelStyle}>Gene ID</label>
                    <input value={form.abGeneId} onChange={(e) => setForm({ ...form, abGeneId: e.target.value })} style={inputStyle} placeholder="e.g. 60" />
                  </div>
                  <div>
                    <label style={labelStyle}>Subcellular Location</label>
                    <input value={form.abSubcellularLocation} onChange={(e) => setForm({ ...form, abSubcellularLocation: e.target.value })} style={inputStyle} placeholder="e.g. Cytoplasm, Nucleus" />
                  </div>
                  <div>
                    <label style={labelStyle}>SwissProt ID</label>
                    <input value={form.abSwissProt} onChange={(e) => setForm({ ...form, abSwissProt: e.target.value })} style={inputStyle} placeholder="e.g. P60709" />
                  </div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                  <div>
                    <label style={labelStyle}>Dilution Ratio</label>
                    <input value={form.abDilutionRatio} onChange={(e) => setForm({ ...form, abDilutionRatio: e.target.value })} style={inputStyle} placeholder="e.g. WB 1:500-1:2000" />
                  </div>
                  <div>
                    <label style={labelStyle}>Application Type</label>
                    <input value={form.abApplicationType} onChange={(e) => setForm({ ...form, abApplicationType: e.target.value })} style={inputStyle} placeholder="e.g. WB, IHC, IF, ELISA" />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* ── ELISA Details (collapsible) ── */}
          <div style={{ borderTop: "1px solid #eee", paddingTop: "16px", marginBottom: "16px" }}>
            <button
              type="button"
              onClick={() => setShowElisa(!showElisa)}
              style={{ display: "flex", alignItems: "center", gap: "8px", background: "none", border: "none", cursor: "pointer", padding: 0, marginBottom: showElisa ? "12px" : 0, width: "100%" }}
            >
              <span style={{ fontSize: "13px", fontWeight: 600, color: "#333" }}>🧪 ELISA Details</span>
              <span style={{ fontSize: "11px", color: "#999", fontWeight: 400 }}>— Only for ELISA kit products</span>
              <span style={{ marginLeft: "auto", color: "#999", fontSize: "12px" }}>{showElisa ? <FaChevronUp /> : <FaChevronDown />}</span>
            </button>
            {showElisa && (
              <div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
                  <div>
                    <label style={labelStyle}>Detection Range</label>
                    <input value={form.elisaDetectionRange} onChange={(e) => setForm({ ...form, elisaDetectionRange: e.target.value })} style={inputStyle} placeholder="e.g. 31.25-2000 pg/mL" />
                  </div>
                  <div>
                    <label style={labelStyle}>Sensitivity</label>
                    <input value={form.elisaSensitivity} onChange={(e) => setForm({ ...form, elisaSensitivity: e.target.value })} style={inputStyle} placeholder="e.g. 18.75 pg/mL" />
                  </div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px" }}>
                  <div>
                    <label style={labelStyle}>Reactivity</label>
                    <input value={form.elisaReactivity} onChange={(e) => setForm({ ...form, elisaReactivity: e.target.value })} style={inputStyle} placeholder="e.g. Human, Mouse" />
                  </div>
                  <div>
                    <label style={labelStyle}>Sample Type</label>
                    <input value={form.elisaSampleType} onChange={(e) => setForm({ ...form, elisaSampleType: e.target.value })} style={inputStyle} placeholder="e.g. Serum, Plasma" />
                  </div>
                  <div>
                    <label style={labelStyle}>Chinese Name</label>
                    <input value={form.elisaChineseName} onChange={(e) => setForm({ ...form, elisaChineseName: e.target.value })} style={inputStyle} />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* ── Other Details ── */}
          <div style={{ borderTop: "1px solid #eee", paddingTop: "16px", marginBottom: "16px" }}>
            <p style={{ fontSize: "13px", fontWeight: 600, color: "#333", marginBottom: "12px" }}>Other Details</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px", marginBottom: "16px" }}>
              <div>
                <label style={labelStyle}>Applications</label>
                <input value={form.applications} onChange={(e) => setForm({ ...form, applications: e.target.value })} style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Material</label>
                <input value={form.material} onChange={(e) => setForm({ ...form, material: e.target.value })} style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Volume</label>
                <input value={form.volume} onChange={(e) => setForm({ ...form, volume: e.target.value })} style={inputStyle} />
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px", marginBottom: "16px" }}>
              <div>
                <label style={labelStyle}>Size</label>
                <input value={form.size} onChange={(e) => setForm({ ...form, size: e.target.value })} style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Needle Shape</label>
                <input value={form.needleShape} onChange={(e) => setForm({ ...form, needleShape: e.target.value })} style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Section</label>
                <input value={form.section} onChange={(e) => setForm({ ...form, section: e.target.value })} style={inputStyle} placeholder="e.g. Explore Antibodies" />
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px" }}>
              <div>
                <label style={labelStyle}>Media Expiry</label>
                <input value={form.mediaExpiry} onChange={(e) => setForm({ ...form, mediaExpiry: e.target.value })} style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Histo Primary Category</label>
                <input value={form.histoPrimaryCategory} onChange={(e) => setForm({ ...form, histoPrimaryCategory: e.target.value })} style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Sort Order</label>
                <input type="number" value={form.sortOrder} onChange={(e) => setForm({ ...form, sortOrder: parseInt(e.target.value) || 0 })} style={inputStyle} />
              </div>
            </div>
          </div>

          {/* ── Image & Flags ── */}
          <div style={{ marginBottom: "16px" }}>
            <label style={labelStyle}>Image URL</label>
            <input value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} style={inputStyle} />
          </div>
          <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
            <label style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", color: "#555", cursor: "pointer" }}>
              <input type="checkbox" checked={form.isFeatured} onChange={(e) => setForm({ ...form, isFeatured: e.target.checked })} /> Featured Product
            </label>
            <label style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", color: "#555", cursor: "pointer" }}>
              <input type="checkbox" checked={form.isActive} onChange={(e) => setForm({ ...form, isActive: e.target.checked })} /> Active
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
