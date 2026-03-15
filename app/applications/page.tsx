"use client";

import { useState, useRef, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { cleanText } from "../utils/textUtils";

interface ApplicationItem {
  id: string;
  name: string;
}

interface ApplicationCategory {
  id: string;
  title: string;
  items: ApplicationItem[];
}

interface SolarbioProduct {
  id: string;
  catalogNumber: string;
  name: string;
  image: string | null;
}

const breadcrumbs = [
  { label: "Home", href: "/" },
  { label: "Applications", href: "/applications" },
  { label: "Solarbio Products", href: "/applications/solarbio" },
  { label: "Applications", href: "" },
];

export default function ApplicationsPage() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [applicationCategories, setApplicationCategories] = useState<ApplicationCategory[]>([]);
  const [relatedProducts, setRelatedProducts] = useState<SolarbioProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesRes, productsRes] = await Promise.all([
          fetch("/api/applications"),
          fetch("/api/solarbio/products?limit=6"),
        ]);

        const categories: ApplicationCategory[] = await categoriesRes.json();
        const products: SolarbioProduct[] = await productsRes.json();

        setApplicationCategories(categories);
        setRelatedProducts(products);

        if (categories.length > 0 && categories[0].items.length > 0) {
          setSelectedCategory(categories[0].items[0].name);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
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

  return (
    <div style={{ minHeight: "100vh", background: "#fff" }}>
      {/* ═══════════════════ */}
      {/* BREADCRUMB          */}
      {/* ═══════════════════ */}
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

      {/* ═══════════════════════════════════ */}
      {/* MAIN CONTENT                        */}
      {/* ═══════════════════════════════════ */}
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
        {/* ── Sidebar ── */}
        <aside
          style={{
            width: "260px",
            flexShrink: 0,
            borderRight: "1px solid #eee",
            paddingRight: "24px",
          }}
        >
          {applicationCategories.map((cat) => (
            <div key={cat.id} style={{ marginBottom: "24px" }}>
              <h3
                style={{
                  fontSize: "15px",
                  fontWeight: 700,
                  color: "#171717",
                  margin: "0 0 10px 0",
                  paddingBottom: "8px",
                  borderBottom: "2px solid var(--primary)",
                }}
              >
                {cat.title}
              </h3>
              <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
                {cat.items.map((item) => (
                  <li key={item.id}>
                    <a
                      href={`/applications/${cat.title.toLowerCase().replace(/ /g, "-")}/${item.name.toLowerCase().replace(/ /g, "-")}`}
                      onClick={(e) => {
                        e.preventDefault();
                        setSelectedCategory(item.name);
                      }}
                      style={{
                        display: "block",
                        padding: "8px 12px",
                        fontSize: "14px",
                        color: selectedCategory === item.name ? "var(--primary)" : "#555",
                        fontWeight: selectedCategory === item.name ? 700 : 400,
                        textDecoration: "none",
                        borderLeft:
                          selectedCategory === item.name
                            ? "3px solid var(--primary)"
                            : "3px solid transparent",
                        background:
                          selectedCategory === item.name ? "#f0f0ff" : "transparent",
                        borderRadius: "0 4px 4px 0",
                        transition: "all 0.2s",
                      }}
                      className="app-sidebar-link"
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </aside>

        {/* ── Main Content ── */}
        <div style={{ flex: 1, minWidth: 0 }}>
          {/* Overview Title */}
          <h1
            style={{
              fontSize: "32px",
              fontWeight: 800,
              color: "#171717",
              margin: "0 0 30px 0",
            }}
          >
            {selectedCategory || "Solarbio Products"} Overview
          </h1>

          {/* Overview Content */}
          <div
            style={{
              display: "flex",
              gap: "40px",
              alignItems: "flex-start",
              marginBottom: "40px",
            }}
          >
            {/* Diagram Image Placeholder */}
            <div
              style={{
                width: "380px",
                height: "200px",
                flexShrink: 0,
                background: "#f0f8ff",
                border: "2px solid #b3d9f2",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
              }}
            >
              {/* Simplified diagram placeholder */}
              <svg
                viewBox="0 0 380 160"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ width: "90%", height: "70%" }}
              >
                {/* Light source */}
                <rect x="10" y="50" width="50" height="60" rx="4" fill="#0288D1" />
                <text x="35" y="130" textAnchor="middle" fontSize="10" fill="#333">
                  Light source
                </text>

                {/* Arrow */}
                <line x1="65" y1="80" x2="100" y2="80" stroke="#0288D1" strokeWidth="2" />
                <polygon points="100,75 110,80 100,85" fill="#0288D1" />

                {/* Atomizer */}
                <rect x="115" y="45" width="55" height="70" rx="4" fill="#0288D1" />
                <text x="142" y="135" textAnchor="middle" fontSize="10" fill="#333">
                  Atomizer
                </text>

                {/* Arrow */}
                <line x1="175" y1="80" x2="210" y2="80" stroke="#0288D1" strokeWidth="2" />
                <polygon points="210,75 220,80 210,85" fill="#0288D1" />

                {/* Monochromator */}
                <polygon points="225,40 285,55 285,105 225,120" fill="#0288D1" />
                <text x="255" y="140" textAnchor="middle" fontSize="10" fill="#333">
                  Monochromator
                </text>

                {/* Arrow */}
                <line x1="290" y1="80" x2="320" y2="80" stroke="#0288D1" strokeWidth="2" />
                <polygon points="320,75 330,80 320,85" fill="#0288D1" />

                {/* Detector */}
                <circle cx="350" cy="80" r="25" fill="#0288D1" />
                <text x="350" y="125" textAnchor="middle" fontSize="10" fill="#333">
                  Detector
                </text>
              </svg>
            </div>

            {/* Description */}
            <div style={{ flex: 1 }}>
              <p
                style={{
                  fontSize: "15px",
                  lineHeight: 1.75,
                  color: "#333",
                  margin: "0 0 16px 0",
                }}
              >
                Atomic spectroscopy uses the electromagnetic radiation or mass spectrum
                of a sample to determine elemental composition. The wavelength of energy
                absorbed or emitted by atoms is characteristic to each element and can be
                used for element identification and quantification.
              </p>
              <p
                style={{
                  fontSize: "15px",
                  lineHeight: 1.75,
                  color: "#333",
                  margin: 0,
                }}
              >
                Analytical techniques based on atomic spectroscopy are widely used in
                environmental chemistry, geology and soil science, mining and metallurgy,
                food sciences, and medicine.
              </p>
            </div>
          </div>

          <hr style={{ border: "none", borderTop: "1px solid #e8e8e8", margin: "0 0 40px 0" }} />

          {/* ═══════════════════════════════ */}
          {/* RELATED PRODUCTS               */}
          {/* ═══════════════════════════════ */}
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
              className="carousel-arrow"
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
                  className="related-product-card"
                >
                  {/* Card Content */}
                  <div
                    style={{
                      display: "flex",
                      gap: "14px",
                      padding: "20px 16px",
                      alignItems: "flex-start",
                    }}
                  >
                    {/* Product Image */}
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
                          alt={cleanText(product.name)}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />
                      ) : (
                        <div
                          style={{
                            width: "50%",
                            height: "60%",
                            background: "#ddd",
                            borderRadius: "4px",
                          }}
                        />
                      )}
                    </div>

                    {/* Product Info */}
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
                          color: "#1976D2",
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
                        {cleanText(product.name)}
                      </span>
                    </div>
                  </div>

                  {/* Quick View Button */}
                  <a
                    href={`/products/${product.catalogNumber}`}
                    style={{
                      display: "block",
                      textAlign: "center",
                      padding: "12px 0",
                      fontSize: "14px",
                      fontWeight: 700,
                      color: "#1976D2",
                      textDecoration: "none",
                      borderTop: "1px solid #eee",
                      transition: "all 0.2s",
                      background: "#fff",
                    }}
                    className="quick-view-btn"
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
              className="carousel-arrow"
            >
              <FaChevronRight />
            </button>
          </div>
              )}
            </>
          )}

          {loading && (
            <div
              style={{
                padding: "60px",
                textAlign: "center",
                color: "#999",
              }}
            >
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  border: "4px solid #e0e0e0",
                  borderTopColor: "#2D2B7F",
                  borderRadius: "50%",
                  margin: "0 auto 16px",
                  animation: "spin 0.8s linear infinite",
                }}
              />
              <div>Loading products...</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
