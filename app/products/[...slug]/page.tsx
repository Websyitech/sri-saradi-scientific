"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { FaArrowLeft, FaCheckCircle, FaShoppingCart } from "react-icons/fa";
import { cleanText } from "../../utils/textUtils";
import { formatForScientificDisplay } from "../../utils/scientific-formatter";

interface ProductVariant {
  id: string;
  sku: string | null;
  packSize: string | null;
  price: number | string | null;
}

interface Product {
  id: string;
  catalogNumber: string;
  name: string;
  description: string | null;
  brand: string | null;
  manufacturer: string | null;
  image?: string | null;
  primaryCategory?: string;
  applications?: string | null;
  abReactivity?: string | null;
  abTarget?: string | null;
  purity?: string | null;
  storage?: string | null;
  casNumber?: string | null;
  variants?: ProductVariant[];
  category?: {
    slug: string;
    name: string;
    color?: string;
    image?: string | null;
  };
}

interface CategoryView {
  type: "category";
  brand: string;
  category: string;
  products: Product[];
  categoryName: string;
}

interface ProductView {
  type: "product";
  product: Product;
}

type PageView = CategoryView | ProductView;

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params?.slug as string[];
  const [view, setView] = useState<PageView | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [selectedVariant, setSelectedVariant] = useState<string | null>(null);
  const [showQuoteForm, setShowQuoteForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleQuoteSubmit = async () => {
    if (!formData.name || !formData.email) {
      setSubmitError("Name and email are required");
      return;
    }

    setSubmitting(true);
    setSubmitError("");

    try {
      // Create items array from selected quantities and variants
      const items = product.variants
        ?.filter(variant => quantities[variant.id] > 0)
        .map(variant => ({
          productId: product.id,
          sku: variant.sku || "",
          name: `${product.name} - ${variant.packSize || ""}`,
          quantity: quantities[variant.id] || 1,
        })) || [];

      console.log("Individual product page quote submission:", {
        formData,
        items,
        product: product.catalogNumber
      });

      const response = await fetch("/api/quotes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          notes: `Quote request for ${product.catalogNumber} - ${product.name}`,
          items,
        }),
      });

      const data = await response.json();
      console.log("Individual product page quote response:", { status: response.status, data });

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit quote");
      }

      setSubmitSuccess(true);
      // Reset form after 2 seconds
      setTimeout(() => {
        setShowQuoteForm(false);
        setSubmitSuccess(false);
        setFormData({ name: "", email: "", company: "", phone: "" });
        setQuantities({});
      }, 2000);
    } catch (error) {
      console.error("Quote submission error:", error);
      setSubmitError(error instanceof Error ? error.message : "Failed to submit quote");
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    if (!slug || slug.length === 0) return;

    if (slug.length === 2) {
      const [brand, category] = slug;
      const decodedBrand = decodeURIComponent(brand);
      const decodedCategory = decodeURIComponent(category);

      fetch(`/api/products?brand=${encodeURIComponent(decodedBrand)}&limit=1000`)
        .then((res) => res.json())
        .then((data) => {
          if (data?.products) {
            const filtered = data.products.filter((p: Product) => {
              const categorySlug = decodedCategory.toLowerCase().replace(/\s+/g, "-");
              const categoryName = p.category?.slug || p.primaryCategory?.toLowerCase().replace(/\s+/g, "-") || "";
              return categoryName.includes(categorySlug) || categorySlug.includes(categoryName);
            });

            setView({
              type: "category",
              brand: decodedBrand,
              category: decodedCategory,
              products: filtered,
              categoryName: filtered.length > 0 ? filtered[0].category?.name || filtered[0].primaryCategory || "Products" : "Products",
            });
          }
        })
        .catch((error) => console.error("Error fetching products:", error))
        .finally(() => setLoading(false));
    } else {
      const catalogNumber = slug[0];

      fetch(`/api/products?search=${encodeURIComponent(catalogNumber)}&limit=1`)
        .then((res) => res.json())
        .then((data) => {
          if (data?.products && data.products.length > 0) {
            const prod = data.products[0];
            setView({
              type: "product",
              product: prod,
            });
            if (prod.variants && prod.variants.length > 0) {
              setSelectedVariant(prod.variants[0].id);
            }
          }
        })
        .catch((error) => console.error("Error fetching product:", error))
        .finally(() => setLoading(false));
    }
  }, [slug]);

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f5f5f5" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ width: "40px", height: "40px", border: "4px solid #e0e0e0", borderTopColor: "var(--primary)", borderRadius: "50%", margin: "0 auto 16px", animation: "spin 0.8s linear infinite" }} />
          <div style={{ color: "#666", fontSize: "16px" }}>Loading product details...</div>
        </div>
      </div>
    );
  }

  if (!view) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f5f5f5" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: "24px", fontWeight: 700, color: "#333", marginBottom: "12px" }}>Not Found</div>
          <p style={{ fontSize: "16px", color: "#666", marginBottom: "20px" }}>The page you're looking for doesn't exist.</p>
          <a
            href="/products"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              color: "var(--primary)",
              textDecoration: "none",
              fontWeight: 600,
              fontSize: "16px",
            }}
          >
            <FaArrowLeft style={{ fontSize: "14px" }} />
            Back to Products
          </a>
        </div>
      </div>
    );
  }

  if (view.type === "category") {
    return (
      <div style={{ minHeight: "100vh", background: "#fff" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "20px 40px", borderBottom: "1px solid #eee" }}>
          <a
            href="/products"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              color: "var(--primary)",
              textDecoration: "none",
              fontWeight: 600,
              fontSize: "14px",
              marginBottom: "16px",
            }}
          >
            <FaArrowLeft style={{ fontSize: "12px" }} />
            Back to Products
          </a>
          <h1 style={{ fontSize: "32px", fontWeight: 800, color: "#171717", margin: 0 }}>
            {view.categoryName}
          </h1>
        </div>

        <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "40px" }}>
          <div style={{ marginBottom: "24px", color: "#666", fontSize: "14px" }}>
            Showing {view.products.length} products
          </div>

          {view.products.length === 0 ? (
            <div style={{ padding: "60px 40px", textAlign: "center", color: "#999", background: "#f9f9f9", borderRadius: "8px" }}>
              No products found
            </div>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                gap: "24px",
              }}
            >
              {view.products.map((product) => (
                <a
                  key={product.id}
                  href={`/products/${product.catalogNumber}`}
                  style={{
                    textDecoration: "none",
                    color: "inherit",
                    border: "1px solid #eee",
                    borderRadius: "8px",
                    padding: "20px",
                    background: "#fff",
                    transition: "all 0.2s",
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px",
                  }}
                >
                  <div
                    style={{
                      width: "100%",
                      aspectRatio: "1",
                      background: "#f5f5f5",
                      borderRadius: "6px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      overflow: "hidden",
                    }}
                  >
                    {product.image ? (
                      <img
                        src={product.image}
                        alt={product.name}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "contain",
                          padding: "8px",
                        }}
                      />
                    ) : product.category?.image ? (
                      <img
                        src={product.category.image}
                        alt={product.category.name}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "contain",
                          padding: "8px",
                        }}
                      />
                    ) : (
                      <div style={{ fontSize: "40px", color: "#ddd" }}>📦</div>
                    )}
                  </div>
                  <div>
                    <div style={{ fontSize: "12px", color: "#999", fontWeight: 600, marginBottom: "4px" }}>
                      {product.catalogNumber}
                    </div>
                    <div style={{ fontSize: "15px", fontWeight: 700, color: "#171717", lineHeight: 1.3 }}>
                      {product.name}
                    </div>
                  </div>
                  {product.description && (
                    <p style={{ fontSize: "13px", color: "#666", margin: "0", lineHeight: 1.4 }}>
                      {product.description.substring(0, 100)}...
                    </p>
                  )}
                  {product.variants && product.variants.length > 0 && (
                    <div style={{ fontSize: "12px", color: "#999" }}>
                      {product.variants.length} pack size{product.variants.length > 1 ? "s" : ""}
                    </div>
                  )}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  const product = view.product;
  const selectedVariantObj = product.variants?.find((v) => v.id === selectedVariant);

  return (
    <div style={{ minHeight: "100vh", background: "#fff" }}>
      {/* Header */}
      <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "20px 40px", borderBottom: "1px solid #eee" }}>
        <a
          href="/products"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            color: "var(--primary)",
            textDecoration: "none",
            fontWeight: 600,
            fontSize: "14px",
            marginBottom: "16px",
          }}
        >
          <FaArrowLeft style={{ fontSize: "12px" }} />
          Back to Products
        </a>
      </div>

      {/* Product Details */}
      <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "40px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "60px", alignItems: "flex-start" }}>
          {/* Left Column - Product Image & Basic Info */}
          <div>
            {/* Image */}
            <div
              style={{
                width: "100%",
                aspectRatio: "1",
                background: "#f0f0f0",
                borderRadius: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "32px",
                border: "1px solid #eee",
                overflow: "hidden",
              }}
            >
              {product.image ? (
                <img
                  src={product.image}
                  alt={product.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                    padding: "20px",
                  }}
                />
              ) : product.category?.image ? (
                <img
                  src={product.category.image}
                  alt={product.category.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                    padding: "20px",
                  }}
                />
              ) : (
                <div style={{ fontSize: "60px", color: "#ddd" }}>📦</div>
              )}
            </div>

            {/* Product Catalog & Brand */}
            <div style={{ marginBottom: "20px" }}>
              <div style={{ fontSize: "12px", color: "#999", fontWeight: 600, marginBottom: "4px" }}>CATALOG NUMBER</div>
              <div style={{ fontSize: "24px", fontWeight: 800, color: "#171717" }}>{product.catalogNumber}</div>
            </div>

            {product.brand && (
              <div style={{ marginBottom: "20px" }}>
                <div style={{ fontSize: "12px", color: "#999", fontWeight: 600, marginBottom: "4px" }}>BRAND</div>
                <div style={{ fontSize: "16px", fontWeight: 600, color: "#444" }}>{product.brand}</div>
              </div>
            )}

            {product.manufacturer && (
              <div style={{ marginBottom: "20px" }}>
                <div style={{ fontSize: "12px", color: "#999", fontWeight: 600, marginBottom: "4px" }}>MANUFACTURER</div>
                <div style={{ fontSize: "16px", fontWeight: 600, color: "#444" }}>{product.manufacturer}</div>
              </div>
            )}
          </div>

          {/* Right Column - Details */}
          <div>
            {/* Product Name */}
            <h1 style={{ fontSize: "32px", fontWeight: 800, color: "#171717", margin: "0 0 24px 0" }}>
              <span dangerouslySetInnerHTML={{ __html: formatForScientificDisplay(cleanText(product.name)) }} />
            </h1>

            {/* Description */}
            {product.description && (
              <div style={{ marginBottom: "32px" }}>
                <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#171717", marginBottom: "12px" }}>Description</h3>
                <p style={{ fontSize: "15px", lineHeight: 1.6, color: "#555" }}>{product.description}</p>
              </div>
            )}

            {/* Product Details Grid */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "32px" }}>
              {product.abReactivity && (
                <div>
                  <div style={{ fontSize: "12px", color: "#999", fontWeight: 600, marginBottom: "6px" }}>REACTIVITY</div>
                  <div style={{ fontSize: "14px", fontWeight: 600, color: "#444" }}>{product.abReactivity}</div>
                </div>
              )}

              {product.abTarget && (
                <div>
                  <div style={{ fontSize: "12px", color: "#999", fontWeight: 600, marginBottom: "6px" }}>TARGET</div>
                  <div style={{ fontSize: "14px", fontWeight: 600, color: "#444" }}>{product.abTarget}</div>
                </div>
              )}

              {product.purity && (
                <div>
                  <div style={{ fontSize: "12px", color: "#999", fontWeight: 600, marginBottom: "6px" }}>PURITY</div>
                  <div style={{ fontSize: "14px", fontWeight: 600, color: "#444" }}>{product.purity}</div>
                </div>
              )}

              {product.storage && (
                <div>
                  <div style={{ fontSize: "12px", color: "#999", fontWeight: 600, marginBottom: "6px" }}>STORAGE</div>
                  <div style={{ fontSize: "14px", fontWeight: 600, color: "#444" }}>
                    <span dangerouslySetInnerHTML={{ __html: formatForScientificDisplay(cleanText(product.storage)) }} />
                  </div>
                </div>
              )}

              {product.casNumber && (
                <div>
                  <div style={{ fontSize: "12px", color: "#999", fontWeight: 600, marginBottom: "6px" }}>CAS NUMBER</div>
                  <div style={{ fontSize: "14px", fontWeight: 600, color: "#444" }}>{product.casNumber}</div>
                </div>
              )}

              {product.applications && (
                <div>
                  <div style={{ fontSize: "12px", color: "#999", fontWeight: 600, marginBottom: "6px" }}>APPLICATIONS</div>
                  <div style={{ fontSize: "14px", fontWeight: 600, color: "#444" }}>
                    <span dangerouslySetInnerHTML={{ __html: formatForScientificDisplay(cleanText(product.applications)) }} />
                  </div>
                </div>
              )}
            </div>

            {/* Variants / Pack Sizes */}
            {product.variants && product.variants.length > 0 && (
              <div style={{ marginBottom: "32px" }}>
                <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#171717", marginBottom: "16px" }}>Select Pack Size</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  {product.variants.map((variant) => (
                    <div
                      key={variant.id}
                      style={{
                        padding: "16px",
                        border: "1px solid #ddd",
                        borderRadius: "8px",
                        background: "#fff",
                        transition: "all 0.2s",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: "16px",
                      }}
                    >
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: "15px", fontWeight: 700, color: "#171717" }}>{variant.packSize || "Pack"}</div>
                        {variant.sku && <div style={{ fontSize: "12px", color: "#999", marginTop: "4px" }}>SKU: {variant.sku}</div>}
                      </div>

                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          gap: "4px",
                          border: "1px solid #ddd",
                          borderRadius: "4px",
                          overflow: "visible",
                          height: "36px",
                          width: "270px",
                          flexShrink: 0,
                          padding: "0 4px",
                          background: "#fff",
                        }}
                      >
                        <button
                          onClick={() =>
                            setQuantities({
                              ...quantities,
                              [variant.id]: Math.max(0, (quantities[variant.id] || 0) - 1),
                            })
                          }
                          style={{
                            width: "28px",
                            height: "28px",
                            background: "var(--primary)",
                            color: "#fff",
                            border: "none",
                            borderRadius: "3px",
                            fontSize: "16px",
                            cursor: "pointer",
                            fontWeight: 700,
                            padding: 0,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                          }}
                          title="Decrease quantity"
                        >
                          −
                        </button>
                        <input
                          type="number"
                          min="0"
                          value={quantities[variant.id] || 0}
                          onChange={(e) =>
                            setQuantities({
                              ...quantities,
                              [variant.id]: Math.max(0, parseInt(e.target.value) || 0),
                            })
                          }
                          style={{
                            flex: 1,
                            height: "100%",
                            border: "none",
                            textAlign: "center",
                            fontSize: "14px",
                            fontWeight: 600,
                            outline: "none",
                            background: "transparent",
                          }}
                        />
                        <button
                          onClick={() =>
                            setQuantities({
                              ...quantities,
                              [variant.id]: (quantities[variant.id] || 0) + 1,
                            })
                          }
                          style={{
                            width: "28px",
                            height: "28px",
                            background: "var(--primary)",
                            color: "#fff",
                            border: "none",
                            borderRadius: "3px",
                            fontSize: "16px",
                            cursor: "pointer",
                            fontWeight: 700,
                            padding: 0,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                          }}
                          title="Increase quantity"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Get Quote Button */}
            {product.variants && (
              <button
                onClick={() => setShowQuoteForm(true)}
                style={{
                  background: "var(--primary)",
                  color: "#fff",
                  border: "none",
                  padding: "14px 40px",
                  borderRadius: "6px",
                  fontSize: "15px",
                  fontWeight: 700,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  marginTop: "20px",
                  width: "100%",
                  justifyContent: "center",
                  opacity: Object.values(quantities).some((q) => q > 0) ? 1 : 0.5,
                  pointerEvents: Object.values(quantities).some((q) => q > 0) ? "auto" : "none",
                }}
                disabled={!Object.values(quantities).some((q) => q > 0)}
              >
                <FaShoppingCart style={{ fontSize: "16px" }} />
                Get Quote
              </button>
            )}

            {/* Quote Form Modal */}
            {showQuoteForm && (
              <div
                style={{
                  position: "fixed",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: "rgba(0, 0, 0, 0.5)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  zIndex: 1000,
                }}
                onClick={() => setShowQuoteForm(false)}
              >
                <div
                  style={{
                    background: "#fff",
                    borderRadius: "12px",
                    padding: "40px",
                    maxWidth: "500px",
                    width: "90%",
                    boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
                  }}
                  onClick={(e) => e.stopPropagation()}
                >
                  {submitSuccess ? (
                    <div style={{ textAlign: "center", padding: "40px 0" }}>
                      <div style={{ fontSize: "48px", marginBottom: "16px", color: "#22c55e" }}>✓</div>
                      <h3 style={{ fontSize: "20px", fontWeight: 700, color: "#171717", marginBottom: "8px" }}>
                        Quote Request Submitted!
                      </h3>
                      <p style={{ fontSize: "14px", color: "#666" }}>
                        We'll send you a detailed quotation soon.
                      </p>
                    </div>
                  ) : (
                    <>
                      <h2 style={{ fontSize: "24px", fontWeight: 800, margin: "0 0 24px 0", color: "#171717" }}>
                        Request Quote
                      </h2>

                  <div style={{ marginBottom: "16px" }}>
                    <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "#666", marginBottom: "6px" }}>
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      style={{
                        width: "100%",
                        padding: "10px 12px",
                        border: "1px solid #ddd",
                        borderRadius: "6px",
                        fontSize: "14px",
                        boxSizing: "border-box",
                      }}
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div style={{ marginBottom: "16px" }}>
                    <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "#666", marginBottom: "6px" }}>
                      Email *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      style={{
                        width: "100%",
                        padding: "10px 12px",
                        border: "1px solid #ddd",
                        borderRadius: "6px",
                        fontSize: "14px",
                        boxSizing: "border-box",
                      }}
                      placeholder="Enter your email"
                    />
                  </div>

                  <div style={{ marginBottom: "16px" }}>
                    <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "#666", marginBottom: "6px" }}>
                      Company
                    </label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      style={{
                        width: "100%",
                        padding: "10px 12px",
                        border: "1px solid #ddd",
                        borderRadius: "6px",
                        fontSize: "14px",
                        boxSizing: "border-box",
                      }}
                      placeholder="Enter your company"
                    />
                  </div>

                  <div style={{ marginBottom: "24px" }}>
                    <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "#666", marginBottom: "6px" }}>
                      Phone
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      style={{
                        width: "100%",
                        padding: "10px 12px",
                        border: "1px solid #ddd",
                        borderRadius: "6px",
                        fontSize: "14px",
                        boxSizing: "border-box",
                      }}
                      placeholder="Enter your phone number"
                    />
                  </div>

                  {submitError && (
                    <div style={{
                      background: "#fef2f2",
                      color: "#dc2626",
                      padding: "12px",
                      borderRadius: "6px",
                      fontSize: "14px",
                      marginBottom: "16px",
                      border: "1px solid #fecaca"
                    }}>
                      {submitError}
                    </div>
                  )}

                  <div style={{ display: "flex", gap: "12px" }}>
                    <button
                      onClick={() => setShowQuoteForm(false)}
                      style={{
                        flex: 1,
                        padding: "12px",
                        border: "1px solid #ddd",
                        background: "#fff",
                        borderRadius: "6px",
                        fontSize: "14px",
                        fontWeight: 600,
                        cursor: "pointer",
                        color: "#666",
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleQuoteSubmit}
                      disabled={submitting}
                      style={{
                        flex: 1,
                        padding: "12px",
                        background: submitting ? "#ccc" : "var(--primary)",
                        color: "#fff",
                        border: "none",
                        borderRadius: "6px",
                        fontSize: "14px",
                        fontWeight: 600,
                        cursor: submitting ? "not-allowed" : "pointer",
                      }}
                    >
                      {submitting ? "Submitting..." : "Submit Quote"}
                    </button>
                  </div>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
