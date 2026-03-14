"use client";

import { useState, useRef, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface ConsumableItem {
  id: string;
  name: string;
  category: string;
  image?: string;
}

interface LabConsumableCategory {
  id: string;
  title: string;
  description: string;
  items: ConsumableItem[];
}

interface SolarbioProduct {
  id: string;
  catalogNumber: string;
  name: string;
  image: string | null;
}

interface KitProduct {
  id: string;
  title: string;
  description: string | null;
  slug: string;
}

const kitProducts: KitProduct[] = [
  { id: "1", title: "Filtration Kits", description: "Complete filtration solutions", slug: "filtration" },
  { id: "2", title: "Analysis Kits", description: "Analytical test kits", slug: "analysis" },
  { id: "3", title: "Extraction Kits", description: "Sample extraction kits", slug: "extraction" },
  { id: "4", title: "Preservation Kits", description: "Sample preservation solutions", slug: "preservation" },
  { id: "5", title: "Detection Kits", description: "Detection and identification kits", slug: "detection" },
];

const labConsumables: LabConsumableCategory[] = [
  {
    id: "1",
    title: "Glassware",
    description: "Essential laboratory glassware for precise measurements and reactions",
    items: [
      { id: "1-1", name: "Beakers", category: "Glassware" },
      { id: "1-2", name: "Flasks", category: "Glassware" },
      { id: "1-3", name: "Graduated Cylinders", category: "Glassware" },
      { id: "1-4", name: "Test Tubes", category: "Glassware" },
      { id: "1-5", name: "Petri Dishes", category: "Glassware" },
    ],
  },
  {
    id: "2",
    title: "Pipettes & Dispensers",
    description: "Precision tools for accurate liquid handling and measurement",
    items: [
      { id: "2-1", name: "Micropipettes", category: "Pipettes" },
      { id: "2-2", name: "Serological Pipettes", category: "Pipettes" },
      { id: "2-3", name: "Transfer Pipettes", category: "Pipettes" },
      { id: "2-4", name: "Bottle Top Dispensers", category: "Pipettes" },
      { id: "2-5", name: "Multi-channel Pipettes", category: "Pipettes" },
    ],
  },
  {
    id: "3",
    title: "Filtration Supplies",
    description: "High-quality filters and filtration materials for laboratory use",
    items: [
      { id: "3-1", name: "Filter Papers", category: "Filtration" },
      { id: "3-2", name: "Syringe Filters", category: "Filtration" },
      { id: "3-3", name: "Membrane Filters", category: "Filtration" },
      { id: "3-4", name: "Vacuum Filters", category: "Filtration" },
      { id: "3-5", name: "Filter Aids", category: "Filtration" },
    ],
  },
  {
    id: "4",
    title: "Safety Equipment",
    description: "Personal protective equipment and safety supplies for the laboratory",
    items: [
      { id: "4-1", name: "Safety Glasses", category: "Safety" },
      { id: "4-2", name: "Gloves", category: "Safety" },
      { id: "4-3", name: "Lab Coats", category: "Safety" },
      { id: "4-4", name: "Face Shields", category: "Safety" },
      { id: "4-5", name: "Respirators", category: "Safety" },
    ],
  },
  {
    id: "5",
    title: "Storage & Containers",
    description: "Reliable containers for safe storage and sample preservation",
    items: [
      { id: "5-1", name: "Sample Bottles", category: "Storage" },
      { id: "5-2", name: "Storage Boxes", category: "Storage" },
      { id: "5-3", name: "Centrifuge Tubes", category: "Storage" },
      { id: "5-4", name: "Culture Plates", category: "Storage" },
      { id: "5-5", name: "Cryogenic Vials", category: "Storage" },
    ],
  },
];

const breadcrumbs = [
  { label: "Home", href: "/" },
  { label: "Lab Consumables", href: "/lab-consumables" },
];

export default function LabConsumablesPage() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>(labConsumables[0]?.id || "");
  const [relatedProducts, setRelatedProducts] = useState<SolarbioProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/solarbio/products?limit=6");
        const products: SolarbioProduct[] = await res.json();
        setRelatedProducts(products);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -340, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 340, behavior: "smooth" });
    }
  };

  const currentCategory = labConsumables.find((cat) => cat.id === selectedCategory);

  return (
    <div style={{ minHeight: "100vh", background: "#fff" }}>
      {/* Breadcrumb */}
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "16px 40px",
          display: "flex",
          alignItems: "center",
          gap: "6px",
          flexWrap: "wrap",
          fontSize: "13px",
        }}
      >
        {breadcrumbs.map((crumb, i) => (
          <span key={i} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            {i > 0 && <span style={{ color: "#999" }}>{">"}</span>}
            {crumb.href ? (
              <a
                href={crumb.href}
                style={{
                  color: "var(--primary)",
                  textDecoration: "none",
                  fontWeight: 500,
                }}
              >
                {crumb.label}
              </a>
            ) : (
              <span style={{ color: "#666" }}>{crumb.label}</span>
            )}
          </span>
        ))}
      </div>

      {/* Main Content */}
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "0 40px 40px",
          display: "flex",
          gap: "40px",
          alignItems: "flex-start",
        }}
      >
        {/* Sidebar */}
        <aside
          style={{
            width: "260px",
            flexShrink: 0,
            borderRight: "1px solid #eee",
            paddingRight: "24px",
          }}
        >
          {/* Lab Consumables Section */}
          <details
            style={{
              marginBottom: "32px",
            }}
          >
            <summary
              style={{
                fontSize: "15px",
                fontWeight: 700,
                color: "#171717",
                paddingBottom: "8px",
                borderBottom: "2px solid var(--primary)",
                cursor: "pointer",
                listStyle: "none",
                userSelect: "none",
                marginBottom: "12px",
              }}
            >
              📦 Lab Consumables
            </summary>
            <ul style={{ listStyle: "none", margin: "12px 0 0 0", padding: 0, display: "flex", flexDirection: "column", gap: "8px" }}>
              {kitProducts.map((kit) => (
                <li key={kit.id}>
                  <a
                    href={`/kit-products/${kit.slug}`}
                    style={{
                      display: "block",
                      padding: "10px 12px",
                      fontSize: "13px",
                      color: "#555",
                      textDecoration: "none",
                      background: "#f9f9f9",
                      border: "1px solid #e0e0e0",
                      borderRadius: "4px",
                      transition: "all 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "var(--primary)";
                      e.currentTarget.style.color = "#fff";
                      e.currentTarget.style.borderColor = "var(--primary)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "#f9f9f9";
                      e.currentTarget.style.color = "#555";
                      e.currentTarget.style.borderColor = "#e0e0e0";
                    }}
                  >
                    {kit.title}
                  </a>
                </li>
              ))}
            </ul>
          </details>

          {/* Lab Consumables Categories Section */}
          <h3
            style={{
              fontSize: "15px",
              fontWeight: 700,
              color: "#171717",
              margin: "0 0 20px 0",
              paddingBottom: "8px",
              borderBottom: "2px solid var(--primary)",
            }}
          >
            Categories
          </h3>
          <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "8px" }}>
            {labConsumables.map((cat) => (
              <li key={cat.id}>
                <button
                  onClick={() => setSelectedCategory(cat.id)}
                  style={{
                    width: "100%",
                    textAlign: "left",
                    padding: "10px 12px",
                    fontSize: "14px",
                    color: selectedCategory === cat.id ? "var(--primary)" : "#555",
                    fontWeight: selectedCategory === cat.id ? 700 : 400,
                    background: selectedCategory === cat.id ? "#f0f0ff" : "transparent",
                    border: "none",
                    borderLeft: selectedCategory === cat.id ? "3px solid var(--primary)" : "3px solid transparent",
                    borderRadius: "0 4px 4px 0",
                    cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    if (selectedCategory !== cat.id) {
                      e.currentTarget.style.background = "#f9f9f9";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (selectedCategory !== cat.id) {
                      e.currentTarget.style.background = "transparent";
                    }
                  }}
                >
                  {cat.title}
                </button>
              </li>
            ))}
          </ul>
        </aside>

        {/* Main Content */}
        <div style={{ flex: 1, minWidth: 0 }}>
          {/* Category Title */}
          <h1
            style={{
              fontSize: "32px",
              fontWeight: 800,
              color: "#171717",
              margin: "0 0 12px 0",
            }}
          >
            {currentCategory?.title}
          </h1>

          {/* Category Description */}
          <p
            style={{
              fontSize: "15px",
              lineHeight: 1.6,
              color: "#555",
              margin: "0 0 30px 0",
            }}
          >
            {currentCategory?.description}
          </p>

          {/* Category Items */}
          {currentCategory && (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
                gap: "16px",
                marginBottom: "60px",
              }}
            >
              {currentCategory.items.map((item) => (
                <div
                  key={item.id}
                  style={{
                    padding: "20px",
                    border: "1px solid #ddd",
                    borderRadius: "6px",
                    textAlign: "center",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)";
                    e.currentTarget.style.borderColor = "var(--primary)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = "none";
                    e.currentTarget.style.borderColor = "#ddd";
                  }}
                >
                  <div style={{ fontSize: "40px", marginBottom: "12px" }}>📦</div>
                  <div
                    style={{
                      fontSize: "14px",
                      fontWeight: 600,
                      color: "#171717",
                      marginBottom: "8px",
                    }}
                  >
                    {item.name}
                  </div>
                  <button
                    style={{
                      padding: "8px 16px",
                      background: "var(--primary)",
                      color: "#fff",
                      border: "none",
                      borderRadius: "4px",
                      fontSize: "12px",
                      fontWeight: 600,
                      cursor: "pointer",
                      transition: "opacity 0.2s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.9")}
                    onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                  >
                    View Products
                  </button>
                </div>
              ))}
            </div>
          )}

          <hr style={{ border: "none", borderTop: "1px solid #e8e8e8", margin: "0 0 40px 0" }} />

          {/* Related Products */}
          {!loading && (
            <>
              <h2
                style={{
                  fontSize: "24px",
                  fontWeight: 800,
                  color: "#171717",
                  margin: "0 0 24px 0",
                }}
              >
                Related Products
              </h2>

              {relatedProducts.length === 0 ? (
                <div
                  style={{
                    padding: "40px",
                    textAlign: "center",
                    color: "#999",
                    background: "#f9f9f9",
                    borderRadius: "8px",
                  }}
                >
                  No products available
                </div>
              ) : (
                <div style={{ position: "relative" }}>
                  {/* Left Arrow */}
                  <button
                    onClick={scrollLeft}
                    style={{
                      position: "absolute",
                      left: "-20px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      zIndex: 5,
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      background: "#fff",
                      border: "1px solid #ddd",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      fontSize: "14px",
                      color: "#666",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                      transition: "all 0.2s",
                    }}
                  >
                    <FaChevronLeft />
                  </button>

                  {/* Product Carousel */}
                  <div
                    ref={scrollRef}
                    style={{
                      display: "flex",
                      gap: "20px",
                      overflowX: "auto",
                      scrollBehavior: "smooth",
                      paddingBottom: "8px",
                      scrollbarWidth: "none",
                    }}
                  >
                    {relatedProducts.map((product) => (
                      <div
                        key={product.id}
                        style={{
                          minWidth: "250px",
                          maxWidth: "250px",
                          background: "#fff",
                          borderRadius: "8px",
                          border: "1px solid #eee",
                          overflow: "hidden",
                          flexShrink: 0,
                          transition: "box-shadow 0.25s",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            gap: "14px",
                            padding: "20px 16px",
                            alignItems: "flex-start",
                          }}
                        >
                          <div
                            style={{
                              width: "80px",
                              height: "90px",
                              background: "#f5f5f5",
                              borderRadius: "6px",
                              flexShrink: 0,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              border: "1px solid #eee",
                              overflow: "hidden",
                            }}
                          >
                            {product.image ? (
                              <img
                                src={product.image}
                                alt={product.name}
                                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                              />
                            ) : (
                              <div style={{ fontSize: "30px", color: "#ddd" }}>📦</div>
                            )}
                          </div>

                          <div style={{ flex: 1, minWidth: 0 }}>
                            <span
                              style={{
                                fontSize: "13px",
                                fontWeight: 600,
                                color: "#555",
                                display: "block",
                                marginBottom: "4px",
                              }}
                            >
                              Solarbio
                            </span>
                            <a
                              href={`/products/${product.catalogNumber}`}
                              style={{
                                fontSize: "15px",
                                fontWeight: 700,
                                color: "var(--primary)",
                                textDecoration: "none",
                                display: "block",
                                marginBottom: "6px",
                              }}
                            >
                              {product.catalogNumber}
                            </a>
                            <span
                              style={{
                                fontSize: "14px",
                                fontWeight: 500,
                                color: "#333",
                                lineHeight: 1.4,
                              }}
                            >
                              {product.name}
                            </span>
                          </div>
                        </div>

                        <a
                          href={`/products/${product.catalogNumber}`}
                          style={{
                            display: "block",
                            textAlign: "center",
                            padding: "12px 0",
                            fontSize: "14px",
                            fontWeight: 700,
                            color: "var(--primary)",
                            textDecoration: "none",
                            borderTop: "1px solid #eee",
                            transition: "all 0.2s",
                            background: "#fff",
                          }}
                        >
                          Quick View
                        </a>
                      </div>
                    ))}
                  </div>

                  {/* Right Arrow */}
                  <button
                    onClick={scrollRight}
                    style={{
                      position: "absolute",
                      right: "-20px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      zIndex: 5,
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      background: "#fff",
                      border: "1px solid #ddd",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      fontSize: "14px",
                      color: "#666",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                      transition: "all 0.2s",
                    }}
                  >
                    <FaChevronRight />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
