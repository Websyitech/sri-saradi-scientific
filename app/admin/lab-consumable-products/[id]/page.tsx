'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';

interface ProductForm {
  id: string;
  title: string;
  subheading: string;
  content: string;
  image: string;
  categoryId: string;
  kitProductId: string;
  sortOrder: number;
  isActive: boolean;
}

interface Category {
  id: string;
  name: string;
}

interface KitProduct {
  id: string;
  title: string;
}

export default function EditLabConsumableProduct() {
  const router = useRouter();
  const params = useParams();
  const [form, setForm] = useState<ProductForm>({
    id: '',
    title: '',
    subheading: '',
    content: '',
    image: '',
    categoryId: '',
    kitProductId: '',
    sortOrder: 0,
    isActive: true
  });
  const [categories, setCategories] = useState<Category[]>([]);
  const [kitProducts, setKitProducts] = useState<KitProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [error, setError] = useState('');

  useEffect(() => {
    const productId = params.id as string;
    
    // Load product data, categories and kit products
    Promise.all([
      fetch(`/api/admin/lab-consumable-products/${productId}`).then(r => r.json()),
      fetch("/api/admin/categories").then(r => r.json()),
      fetch("/api/admin/kit-products").then(r => r.json())
    ]).then(([productData, categoriesData, kitProductsData]) => {
      if (productData && !productData.error) {
        setForm({
          id: productData.id,
          title: productData.title || '',
          subheading: productData.subheading || '',
          content: productData.content || '',
          image: productData.image || '',
          categoryId: productData.categoryId || '',
          kitProductId: productData.kitProductId || '',
          sortOrder: productData.sortOrder || 0,
          isActive: productData.isActive !== undefined ? productData.isActive : true
        });
        setImagePreview(productData.image || '');
      } else {
        setError("Product not found");
      }
      
      if (Array.isArray(categoriesData)) {
        setCategories(categoriesData.filter(cat => cat.isActive));
      }
      if (Array.isArray(kitProductsData)) {
        setKitProducts(kitProductsData.filter(product => product.isActive));
      }
      
      setLoading(false);
    }).catch(() => {
      setError("Failed to load product data");
      setLoading(false);
    });
  }, [params.id]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/admin/upload", { method: "POST", body: formData });
      const data = await response.json();
      if (response.ok && data.url) {
        setForm({ ...form, image: data.url });
        setImagePreview(data.url);
      }
    } catch (error) {
      setError("Upload failed");
      console.error("Upload failed:", error);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      const response = await fetch("/api/admin/lab-consumable-products", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          categoryId: form.categoryId || null,
          kitProductId: form.kitProductId || null
        })
      });

      if (response.ok) {
        router.push("/admin/kit-products");
      } else {
        setError("Failed to update product");
      }
    } catch (error) {
      setError("An error occurred");
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "60vh" }}>
        <div style={{ width: "36px", height: "36px", border: "4px solid #e0e0e0", borderTopColor: "#2D2B7F", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
      </div>
    );
  }

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "10px 12px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    fontSize: "14px",
    outline: "none",
    boxSizing: "border-box"
  };

  return (
    <div>
      <div style={{ marginBottom: "24px" }}>
        <h1 style={{ fontSize: "24px", fontWeight: 700, color: "#1a1a2e", margin: "0 0 8px 0" }}>
          Edit Product
        </h1>
        <p style={{ color: "#888", fontSize: "14px", margin: 0 }}>
          Update lab consumable product details
        </p>
      </div>

      <div style={{ background: "#fff", borderRadius: "12px", border: "1px solid #f0f0f0", padding: "24px" }}>
        <form onSubmit={handleSubmit} style={{ maxWidth: "800px" }}>
          {error && (
            <div style={{ padding: "12px", background: "#fee2e2", color: "#991b1b", borderRadius: "8px", marginBottom: "20px" }}>
              {error}
            </div>
          )}

          <div style={{ marginBottom: "16px" }}>
            <label style={{ display: "block", fontSize: "13px", fontWeight: 500, color: "#555", marginBottom: "6px" }}>
              Product Title *
            </label>
            <input
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
              style={inputStyle}
              placeholder="e.g., 0.22μm PES Membrane Filter"
            />
          </div>

          <div style={{ marginBottom: "16px" }}>
            <label style={{ display: "block", fontSize: "13px", fontWeight: 500, color: "#555", marginBottom: "6px" }}>
              Subheading
            </label>
            <input
              value={form.subheading}
              onChange={(e) => setForm({ ...form, subheading: e.target.value })}
              style={inputStyle}
              placeholder="Brief product subheading"
            />
          </div>

          <div style={{ marginBottom: "16px" }}>
            <label style={{ display: "block", fontSize: "13px", fontWeight: 500, color: "#555", marginBottom: "6px" }}>
              Image
            </label>
            <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
              <div style={{ flex: 1, position: "relative" }}>
                <input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  style={{ display: "none" }}
                  disabled={uploading}
                />
                <button
                  type="button"
                  onClick={() => document.getElementById("image-upload")?.click()}
                  disabled={uploading}
                  style={{
                    width: "100%",
                    padding: "12px",
                    border: "2px dashed #ddd",
                    borderRadius: "8px",
                    textAlign: "center",
                    cursor: uploading ? "not-allowed" : "pointer",
                    background: "#fafafa",
                    fontSize: "13px",
                    color: "#666",
                    transition: "all 0.2s",
                    opacity: uploading ? 0.7 : 1,
                  }}
                >
                  {uploading ? "Uploading..." : "Click to upload product image"}
                </button>
              </div>
              {imagePreview && (
                <div style={{ width: "100px", height: "100px", borderRadius: "8px", overflow: "hidden", border: "1px solid #ddd", flexShrink: 0 }}>
                  <img src={imagePreview} alt="Preview" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
              )}
            </div>
          </div>

          <div style={{ marginBottom: "16px" }}>
            <label style={{ display: "block", fontSize: "13px", fontWeight: 500, color: "#555", marginBottom: "6px" }}>
              Rich Text Content
            </label>
            <textarea
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
              rows={8}
              style={{ ...inputStyle, resize: "vertical", fontFamily: "monospace" }}
              placeholder="Detailed product description with HTML formatting support"
            />
            <p style={{ fontSize: "12px", color: "#888", margin: "6px 0 0 0" }}>
              Rich text editor (TinyMCE) integration coming soon. For now, you can use HTML formatting.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
            <div>
              <label style={{ display: "block", fontSize: "13px", fontWeight: 500, color: "#555", marginBottom: "6px" }}>
                Category
              </label>
              <select
                value={form.categoryId}
                onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
                style={inputStyle}
              >
                <option value="">Select a category (optional)</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label style={{ display: "block", fontSize: "13px", fontWeight: 500, color: "#555", marginBottom: "6px" }}>
                Page
              </label>
              <select
                value={form.kitProductId}
                onChange={(e) => setForm({ ...form, kitProductId: e.target.value })}
                style={inputStyle}
              >
                <option value="">Select a page (optional)</option>
                {kitProducts.map((product) => (
                  <option key={product.id} value={product.id}>
                    {product.title}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
            <div>
              <label style={{ display: "block", fontSize: "13px", fontWeight: 500, color: "#555", marginBottom: "6px" }}>
                Sort Order
              </label>
              <input
                type="number"
                value={form.sortOrder}
                onChange={(e) => setForm({ ...form, sortOrder: parseInt(e.target.value) || 0 })}
                style={inputStyle}
              />
            </div>
            <div>
              <label style={{ display: "block", fontSize: "13px", fontWeight: 500, color: "#555", marginBottom: "6px" }}>
                Status
              </label>
              <select
                value={form.isActive ? "true" : "false"}
                onChange={(e) => setForm({ ...form, isActive: e.target.value === "true" })}
                style={inputStyle}
              >
                <option value="true">Active</option>
                <option value="false">Inactive</option>
              </select>
            </div>
          </div>

          <div style={{ display: "flex", gap: "12px", justifyContent: "flex-start", paddingTop: "8px" }}>
            <button
              type="button"
              onClick={() => router.back()}
              style={{
                padding: "10px 20px",
                border: "1px solid #ddd",
                borderRadius: "8px",
                fontSize: "13px",
                background: "#fff",
                cursor: "pointer"
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              style={{
                padding: "10px 24px",
                background: "#2D2B7F",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                fontSize: "13px",
                fontWeight: 600,
                cursor: "pointer",
                opacity: saving ? 0.7 : 1
              }}
            >
              {saving ? "Updating..." : "Update Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}