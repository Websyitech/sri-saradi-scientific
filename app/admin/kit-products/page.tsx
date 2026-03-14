"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FaPlus, FaEdit, FaTrash, FaBoxes, FaFolder, FaCube } from "react-icons/fa";

interface KitProduct {
  id: string;
  title: string;
  description?: string;
  subtitle?: string;
  content?: string;
  image?: string;
  href?: string;
  sortOrder: number;
  isActive: boolean;
}

interface Category {
  id: string;
  name: string;
  description?: string;
  isActive: boolean;
  isKitCategory?: boolean;
}

interface LabProduct {
  id: string;
  title: string;
  subheading?: string;
  content?: string;
  image?: string;
  categoryId?: string;
  kitProductId?: string;
  sortOrder: number;
  isActive: boolean;
  category?: { name: string };
  kitProduct?: { title: string };
}

export default function AdminKitProducts() {
  const [activeTab, setActiveTab] = useState<'products' | 'categories' | 'lab-products'>('products');
  const [products, setProducts] = useState<KitProduct[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [labProducts, setLabProducts] = useState<LabProduct[]>([]);
  const [loading, setLoading] = useState(true);

  const loadProducts = () => {
    fetch("/api/admin/kit-products")
      .then((r) => r.json())
      .then((data) => { 
        if (Array.isArray(data)) {
          setProducts(data);
        } else {
          setProducts([]);
        }
      })
      .catch(() => setProducts([]));
  };

  const loadCategories = () => {
    fetch("/api/admin/categories")
      .then((r) => r.json())
      .then((data) => { 
        if (Array.isArray(data)) {
          setCategories(data.filter(cat => cat.isKitCategory));
        } else {
          setCategories([]);
        }
      })
      .catch(() => setCategories([]));
  };

  const loadLabProducts = () => {
    fetch("/api/admin/lab-consumable-products")
      .then((r) => r.json())
      .then((data) => { 
        if (Array.isArray(data)) {
          setLabProducts(data);
        } else {
          setLabProducts([]);
        }
      })
      .catch(() => setLabProducts([]));
  };

  useEffect(() => { 
    setLoading(true);
    Promise.all([loadProducts(), loadCategories(), loadLabProducts()]).finally(() => setLoading(false));
  }, []);

  const handleDeleteProduct = async (id: string) => {
    if (!confirm("Delete this lab consumable page?")) return;
    await fetch("/api/admin/kit-products", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) });
    loadProducts();
  };

  const handleDeleteCategory = async (id: string) => {
    if (!confirm("Delete this category?")) return;
    await fetch("/api/admin/categories", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) });
    loadCategories();
  };

  const handleDeleteLabProduct = async (id: string) => {
    if (!confirm("Delete this product?")) return;
    await fetch("/api/admin/lab-consumable-products", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) });
    loadLabProducts();
  };

  if (loading) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "60vh" }}>
        <div style={{ width: "36px", height: "36px", border: "4px solid #e0e0e0", borderTopColor: "#2D2B7F", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
      </div>
    );
  }

  const tabStyle = (isActive: boolean) => ({
    padding: "12px 24px",
    border: "none",
    background: isActive ? "#2D2B7F" : "#f8f9fa",
    color: isActive ? "#fff" : "#666",
    borderRadius: "8px 8px 0 0",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: 600,
    display: "flex",
    alignItems: "center",
    gap: "8px",
    transition: "all 0.2s",
  });

  return (
    <div>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "24px" }}>
        <div>
          <h1 style={{ fontSize: "24px", fontWeight: 700, color: "#1a1a2e", margin: 0 }}>Lab Consumables Management</h1>
          <p style={{ color: "#888", fontSize: "14px", margin: "4px 0 0" }}>
            {activeTab === 'products' ? `${products.length} pages (Filtration, Liquid Handling, etc.)` : activeTab === 'categories' ? `${categories.length} categories` : `${labProducts.length} individual products`}
          </p>
        </div>
        <Link 
          href={activeTab === 'products' ? "/admin/kit-products/new" : activeTab === 'categories' ? "/admin/categories/new" : "/admin/lab-consumable-products/new"}
          style={{ 
            display: "inline-flex", 
            alignItems: "center", 
            gap: "8px", 
            padding: "10px 20px", 
            background: "#2D2B7F", 
            color: "#fff", 
            border: "none", 
            borderRadius: "8px", 
            fontSize: "13px", 
            fontWeight: 600, 
            cursor: "pointer", 
            textDecoration: "none" 
          }}
        >
          <FaPlus /> 
          {activeTab === 'products' ? 'Add Page' : activeTab === 'categories' ? 'Add Category' : 'Add Product'}
        </Link>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", marginBottom: "24px", borderBottom: "1px solid #e5e5e5" }}>
        <button
          onClick={() => setActiveTab('products')}
          style={tabStyle(activeTab === 'products')}
        >
          <FaBoxes /> Pages
        </button>
        <button
          onClick={() => setActiveTab('categories')}
          style={tabStyle(activeTab === 'categories')}
        >
          <FaFolder /> Categories
        </button>
        <button
          onClick={() => setActiveTab('lab-products')}
          style={tabStyle(activeTab === 'lab-products')}
        >
          <FaCube /> Products
        </button>
      </div>

      {/* Content */}
      {activeTab === 'products' && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "16px" }}>
          {products.map((item) => (
            <div key={item.id} style={{ background: "#fff", borderRadius: "12px", border: "1px solid #f0f0f0", boxShadow: "0 1px 3px rgba(0,0,0,0.06)", overflow: "hidden" }}>
              {item.image && (
                <div style={{ height: "140px", background: "#f8f8f8", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
                  <img src={item.image} alt={item.title} style={{ maxHeight: "100%", maxWidth: "100%", objectFit: "contain" }} />
                </div>
              )}
              <div style={{ padding: "16px" }}>
                <h3 style={{ margin: "0 0 4px", fontSize: "15px", fontWeight: 600, color: "#333" }}>{item.title}</h3>
                {item.subtitle && <p style={{ margin: "0 0 6px", fontSize: "13px", color: "#666", fontStyle: "italic" }}>{item.subtitle}</p>}
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
                    <button onClick={() => handleDeleteProduct(item.id)} style={{ background: "none", border: "none", color: "#dc2626", cursor: "pointer", padding: "6px", fontSize: "14px" }}><FaTrash /></button>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {products.length === 0 && (
            <div style={{ gridColumn: "1/-1", padding: "60px", textAlign: "center", color: "#999", background: "#fff", borderRadius: "12px" }}>No pages yet</div>
          )}
        </div>
      )}

      {activeTab === 'categories' && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "16px" }}>
          {categories.map((category) => (
            <div key={category.id} style={{ background: "#fff", borderRadius: "12px", border: "1px solid #f0f0f0", boxShadow: "0 1px 3px rgba(0,0,0,0.06)", padding: "20px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                <FaFolder style={{ color: "#2D2B7F", fontSize: "16px" }} />
                <h3 style={{ margin: 0, fontSize: "16px", fontWeight: 600, color: "#333" }}>{category.name}</h3>
              </div>
              {category.description && <p style={{ margin: "0 0 12px", fontSize: "13px", color: "#666", lineHeight: 1.4 }}>{category.description}</p>}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ padding: "3px 10px", borderRadius: "12px", fontSize: "11px", fontWeight: 600, background: category.isActive ? "#dcfce7" : "#fee2e2", color: category.isActive ? "#166534" : "#991b1b" }}>
                  {category.isActive ? "Active" : "Inactive"}
                </span>
                <div style={{ display: "flex", gap: "4px" }}>
                  <Link href={`/admin/categories/${category.id}`} style={{ background: "none", border: "none", color: "#2D2B7F", cursor: "pointer", padding: "6px", fontSize: "14px", display: "flex", alignItems: "center", textDecoration: "none" }}><FaEdit /></Link>
                  <button onClick={() => handleDeleteCategory(category.id)} style={{ background: "none", border: "none", color: "#dc2626", cursor: "pointer", padding: "6px", fontSize: "14px" }}><FaTrash /></button>
                </div>
              </div>
            </div>
          ))}
          {categories.length === 0 && (
            <div style={{ gridColumn: "1/-1", padding: "60px", textAlign: "center", color: "#999", background: "#fff", borderRadius: "12px" }}>No categories yet</div>
          )}
        </div>
      )}

      {activeTab === 'lab-products' && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "16px" }}>
          {labProducts.map((product) => (
            <div key={product.id} style={{ background: "#fff", borderRadius: "12px", border: "1px solid #f0f0f0", boxShadow: "0 1px 3px rgba(0,0,0,0.06)", overflow: "hidden" }}>
              {product.image && (
                <div style={{ height: "140px", background: "#f8f8f8", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
                  <img src={product.image} alt={product.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
              )}
              <div style={{ padding: "16px" }}>
                <h3 style={{ margin: "0 0 4px", fontSize: "15px", fontWeight: 600, color: "#333" }}>{product.title}</h3>
                {product.subheading && <p style={{ margin: "0 0 6px", fontSize: "13px", color: "#666", fontStyle: "italic" }}>{product.subheading}</p>}
                {product.content && <p style={{ margin: "0 0 8px", fontSize: "12px", color: "#888", lineHeight: 1.4 }}>{product.content.replace(/<[^>]*>/g, '').slice(0, 100)}{product.content.length > 100 ? "..." : ""}</p>}
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                  {product.category && <span style={{ padding: "2px 8px", borderRadius: "10px", fontSize: "10px", fontWeight: 600, background: "#e0f2fe", color: "#0891b2" }}>{product.category.name}</span>}
                  {product.kitProduct && <span style={{ padding: "2px 8px", borderRadius: "10px", fontSize: "10px", fontWeight: 600, background: "#f3e8ff", color: "#7c3aed" }}>{product.kitProduct.title}</span>}
                </div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ padding: "3px 10px", borderRadius: "12px", fontSize: "11px", fontWeight: 600, background: product.isActive ? "#dcfce7" : "#fee2e2", color: product.isActive ? "#166534" : "#991b1b" }}>
                      {product.isActive ? "Active" : "Inactive"}
                    </span>
                    <span style={{ fontSize: "11px", color: "#aaa" }}>Order: {product.sortOrder}</span>
                  </div>
                  <div style={{ display: "flex", gap: "4px" }}>
                    <Link href={`/admin/lab-consumable-products/${product.id}`} style={{ background: "none", border: "none", color: "#2D2B7F", cursor: "pointer", padding: "6px", fontSize: "14px", display: "flex", alignItems: "center", textDecoration: "none" }}><FaEdit /></Link>
                    <button onClick={() => handleDeleteLabProduct(product.id)} style={{ background: "none", border: "none", color: "#dc2626", cursor: "pointer", padding: "6px", fontSize: "14px" }}><FaTrash /></button>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {labProducts.length === 0 && (
            <div style={{ gridColumn: "1/-1", padding: "60px", textAlign: "center", color: "#999", background: "#fff", borderRadius: "12px" }}>No products yet</div>
          )}
        </div>
      )}
    </div>
  );
}