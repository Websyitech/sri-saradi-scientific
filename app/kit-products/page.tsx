"use client";

import { useState, useEffect } from "react";
import { FaLeaf, FaMicrochip, FaFlask, FaCheckCircle } from "react-icons/fa";
import Hero from "@/app/components/Hero";
import USPBar from "@/app/components/USPBar";
import ProductCatalog from "@/app/components/ProductCatalog";
import { cleanText } from "../products/page";

interface KitProduct {
  id: string;
  title: string;
  description: string | null;
  image: string | null;
  href: string | null;
  sortOrder: number;
  isActive: boolean;
}

interface FeaturedProduct {
  id: string;
  name: string;
  catalogNumber: string;
  image: string | null;
  price?: string;
  isFeatured: boolean;
}

export default function KitProductsPage() {
  const [kitProducts, setKitProducts] = useState<KitProduct[]>([]);
  const [hotProducts, setHotProducts] = useState<FeaturedProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load kit products
    fetch("/api/kit-products")
      .then((res) => res.json())
      .then((data: KitProduct[]) => {
        if (data && data.length > 0) {
          setKitProducts(data.filter((p) => p.isActive));
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));

    // Load featured/hot products for sidebar
    fetch("/api/featured-products")
      .then((res) => res.json())
      .then((data: FeaturedProduct[]) => {
        if (data && data.length > 0) {
          setHotProducts(data.slice(0, 5));
        }
      })
      .catch(() => {});
  }, []);

  return (
    <div style={{ minHeight: "100vh", background: "#fff" }}>
      <Hero 
        title="Lab Solutions & Consumables"
        heading="Lab Consumables & Solutions"
        description="Advanced research solutions for your laboratory. From eco-friendly essentials to precision optical equipment, we have everything you need."
        showPartnerPill={true}
        showActions={true}
      />

      <USPBar />

      <ProductCatalog />

      {/* Main Content */}
      <section style={{ maxWidth: "1400px", margin: "0 auto", padding: "40px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: "32px", alignItems: "flex-start" }}>
          {/* Products Grid */}
          <div>
            {/* Heading */}
            <div style={{ marginBottom: "32px" }}>
              <h2 style={{ fontSize: "32px", fontWeight: 800, color: "#171717", margin: "0 0 12px 0" }}>
                All Products
              </h2>
              <p style={{ fontSize: "15px", color: "#666", margin: 0 }}>
                Browse our complete selection of laboratory consumables and equipment
              </p>
            </div>

            {/* Loading State */}
            {loading && (
              <div style={{ padding: "60px", textAlign: "center", color: "#999" }}>
                <div style={{ width: "40px", height: "40px", border: "4px solid #e0e0e0", borderTopColor: "#2D2B7F", borderRadius: "50%", margin: "0 auto 16px", animation: "spin 0.8s linear infinite" }} />
                <div>Loading products...</div>
              </div>
            )}

            {/* Product Cards Grid */}
            {!loading && (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                  gap: "24px",
                }}
              >
                {kitProducts.map((product) => {
                  const slug = cleanText(product.title)
                    .toLowerCase()
                    .trim()
                    .replace(/[^\w\s-]/g, "")
                    .replace(/\s+/g, "-")
                    .replace(/-+/g, "-");
                  return (
                  <a
                    key={product.id}
                    href={`/kit-products/${slug}`}
                    style={{
                      textDecoration: "none",
                      color: "inherit",
                      display: "flex",
                      flexDirection: "column",
                      background: "#fff",
                      borderRadius: "12px",
                      overflow: "hidden",
                      border: "1px solid #eee",
                      transition: "all 0.3s",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.12)";
                      e.currentTarget.style.transform = "translateY(-4px)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.06)";
                      e.currentTarget.style.transform = "translateY(0)";
                    }}
                  >
                    {/* Image */}
                    <div
                      style={{
                        width: "100%",
                        aspectRatio: "1",
                        background: "#f0f0f0",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        overflow: "hidden",
                      }}
                    >
                      {product.image ? (
                        <img
                          src={product.image}
                          alt={cleanText(product.title)}
                          style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        />
                      ) : (
                        <FaFlask style={{ fontSize: "48px", color: "#ddd" }} />
                      )}
                    </div>

                    {/* Content */}
                    <div style={{ padding: "16px", flex: 1, display: "flex", flexDirection: "column" }}>
                      <h3
                        style={{
                          fontSize: "16px",
                          fontWeight: 700,
                          color: "#171717",
                          margin: "0 0 8px 0",
                          lineHeight: 1.3,
                        }}
                      >
                        {cleanText(product.title)}
                      </h3>
                      <p
                        style={{
                          fontSize: "13px",
                          lineHeight: 1.5,
                          color: "#666",
                          margin: "0 0 12px 0",
                          flex: 1,
                        }}
                      >
                        {product.description && product.description.length > 80
                          ? product.description.slice(0, 80) + "..."
                          : product.description}
                      </p>
                      <button
                        style={{
                          padding: "10px 16px",
                          background: "var(--primary)",
                          color: "#fff",
                          border: "none",
                          borderRadius: "6px",
                          fontSize: "12px",
                          fontWeight: 600,
                          cursor: "pointer",
                          marginTop: "auto",
                        }}
                      >
                        Explore
                      </button>
                    </div>
                  </a>
                );
                })}
              </div>
            )}

            {!loading && kitProducts.length === 0 && (
              <div
                style={{
                  padding: "60px",
                  textAlign: "center",
                  background: "#f9f9f9",
                  borderRadius: "12px",
                  color: "#999",
                }}
              >
                No products available
              </div>
            )}
          </div>

          {/* Sidebar - Hot Products */}
          <aside style={{ position: "sticky", top: "100px" }}>
            <div
              style={{
                background: "#f9f9f9",
                borderRadius: "12px",
                padding: "24px",
                border: "1px solid #eee",
              }}
            >
              <h3
                style={{
                  fontSize: "16px",
                  fontWeight: 700,
                  color: "#171717",
                  margin: "0 0 20px 0",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <span style={{ color: "var(--primary)", fontSize: "18px" }}>🔥</span> Hot Products
              </h3>

              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {hotProducts.map((product) => (
                  <a
                    key={product.id}
                    href={`/products?category=antibodies`}
                    style={{
                      display: "flex",
                      gap: "12px",
                      padding: "12px",
                      background: "#fff",
                      borderRadius: "8px",
                      border: "1px solid #eee",
                      textDecoration: "none",
                      color: "inherit",
                      transition: "all 0.2s",
                      cursor: "pointer",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "#f0f0f0";
                      e.currentTarget.style.borderColor = "var(--primary)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "#fff";
                      e.currentTarget.style.borderColor = "#eee";
                    }}
                  >
                    {/* Small Image */}
                    <div
                      style={{
                        width: "60px",
                        height: "60px",
                        background: "#e0e0e0",
                        borderRadius: "6px",
                        flexShrink: 0,
                        overflow: "hidden",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {product.image ? (
                        <img
                          src={product.image}
                          alt={cleanText(product.name)}
                          style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        />
                      ) : (
                        <FaMicrochip style={{ fontSize: "24px", color: "#ccc" }} />
                      )}
                    </div>

                    {/* Product Info */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <h4
                        style={{
                          fontSize: "12px",
                          fontWeight: 600,
                          color: "#171717",
                          margin: "0 0 4px 0",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {cleanText(product.name)}
                      </h4>
                      <p
                        style={{
                          fontSize: "11px",
                          color: "#999",
                          margin: "0",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {product.catalogNumber}
                      </p>
                      <div
                        style={{
                          fontSize: "11px",
                          color: "#1B7A2E",
                          marginTop: "4px",
                          display: "flex",
                          alignItems: "center",
                          gap: "4px",
                        }}
                      >
                        <FaCheckCircle style={{ fontSize: "10px" }} /> In Stock
                      </div>
                    </div>
                  </a>
                ))}
              </div>

              {/* Featured Badge */}
              <div
                style={{
                  marginTop: "20px",
                  padding: "16px",
                  background: "linear-gradient(135deg, #2D2B7F 0%, #3d3b9f 100%)",
                  borderRadius: "8px",
                  color: "#fff",
                  textAlign: "center",
                  fontSize: "12px",
                }}
              >
                <div style={{ fontWeight: 700, marginBottom: "6px" }}>Featured Collections</div>
                <p style={{ margin: 0, fontSize: "11px", opacity: 0.9 }}>
                  Discover our curated selection of premium laboratory solutions.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
