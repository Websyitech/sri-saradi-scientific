"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { FaArrowLeft, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { cleanText } from "../../../products/page";

interface ApplicationCategory {
  id: string;
  title: string;
  items: Array<{
    id: string;
    name: string;
  }>;
}

interface SolarbioProduct {
  id: string;
  catalogNumber: string;
  name: string;
  image: string | null;
}

export default function ApplicationDetailPage() {
  const params = useParams();
  const category = params?.category as string;
  const application = params?.application as string;

  const [applications, setApplications] = useState<ApplicationCategory[]>([]);
  const [relatedProducts, setRelatedProducts] = useState<SolarbioProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentCategory, setCurrentCategory] = useState<ApplicationCategory | null>(null);
  const [currentApplication, setCurrentApplication] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [appRes, prodRes] = await Promise.all([
          fetch("/api/applications"),
          fetch("/api/solarbio/products?limit=6"),
        ]);

        const apps: ApplicationCategory[] = await appRes.json();
        const products: SolarbioProduct[] = await prodRes.json();

        setApplications(apps);
        setRelatedProducts(products);

        const decodedCategory = category?.replace(/-/g, " ");
        const decodedApp = application?.replace(/-/g, " ");

        const foundCategory = apps.find(
          (cat) => cat.title.toLowerCase() === decodedCategory?.toLowerCase()
        );
        setCurrentCategory(foundCategory || null);
        setCurrentApplication(decodedApp || "");
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (category && application) {
      fetchData();
    }
  }, [category, application]);

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f5f5f5" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ width: "40px", height: "40px", border: "4px solid #e0e0e0", borderTopColor: "var(--primary)", borderRadius: "50%", margin: "0 auto 16px", animation: "spin 0.8s linear infinite" }} />
          <div style={{ color: "#666", fontSize: "16px" }}>Loading application details...</div>
        </div>
      </div>
    );
  }

  if (!currentCategory) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f5f5f5" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: "24px", fontWeight: 700, color: "#333", marginBottom: "12px" }}>
            Application Not Found
          </div>
          <p style={{ fontSize: "16px", color: "#666", marginBottom: "20px" }}>
            The application you're looking for doesn't exist.
          </p>
          <a
            href="/applications"
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
            Back to Applications
          </a>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#fff" }}>
      {/* Header */}
      <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "20px 40px", borderBottom: "1px solid #eee" }}>
        <a
          href="/applications"
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
          Back to Applications
        </a>
        <h1 style={{ fontSize: "32px", fontWeight: 800, color: "#171717", margin: 0 }}>
          {currentApplication}
        </h1>
        <p style={{ fontSize: "14px", color: "#666", margin: "8px 0 0 0" }}>
          Category: {currentCategory.title}
        </p>
      </div>

      {/* Main Content */}
      <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "40px" }}>
        {/* Overview Section */}
        <div style={{ marginBottom: "60px" }}>
          <h2 style={{ fontSize: "24px", fontWeight: 800, color: "#171717", margin: "0 0 20px 0" }}>
            Overview
          </h2>
          <div
            style={{
              background: "#f9f9f9",
              border: "1px solid #e0e0e0",
              borderRadius: "8px",
              padding: "24px",
              lineHeight: 1.7,
              color: "#555",
              fontSize: "15px",
            }}
          >
            <p>
              {currentApplication} is an important analytical technique used in {currentCategory.title.toLowerCase()}. 
              This application enables precise measurement, analysis, and characterization of samples across various scientific and industrial fields.
            </p>
            <p>
              Explore our comprehensive range of reagents, chemicals, and tools designed specifically for {currentApplication.toLowerCase()} applications. 
              Whether you're in research, quality control, or process optimization, we have the products you need.
            </p>
          </div>
        </div>

        {/* Related Products Section */}
        <div>
          <h2 style={{ fontSize: "24px", fontWeight: 800, color: "#171717", margin: "0 0 24px 0" }}>
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
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                gap: "24px",
              }}
            >
              {relatedProducts.map((product) => (
                <div
                  key={product.id}
                  style={{
                    border: "1px solid #eee",
                    borderRadius: "8px",
                    overflow: "hidden",
                    transition: "box-shadow 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  {/* Product Image */}
                  <div
                    style={{
                      width: "100%",
                      height: "200px",
                      background: "#f5f5f5",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderBottom: "1px solid #eee",
                    }}
                  >
                    {product.image ? (
                      <img
                        src={product.image}
                        alt={cleanText(product.name)}
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      />
                    ) : (
                      <div style={{ fontSize: "60px", color: "#ddd" }}>📦</div>
                    )}
                  </div>

                  {/* Product Info */}
                  <div style={{ padding: "20px" }}>
                    <div style={{ fontSize: "12px", color: "#999", fontWeight: 600, marginBottom: "4px" }}>
                      {product.catalogNumber}
                    </div>
                    <h3 style={{ fontSize: "15px", fontWeight: 700, color: "#171717", margin: "0 0 12px 0", lineHeight: 1.3 }}>
                      {cleanText(product.name)}
                    </h3>
                    <a
                      href={`/products/${product.catalogNumber}`}
                      style={{
                        display: "inline-block",
                        padding: "10px 16px",
                        background: "var(--primary)",
                        color: "#fff",
                        textDecoration: "none",
                        borderRadius: "4px",
                        fontSize: "13px",
                        fontWeight: 600,
                        transition: "opacity 0.2s",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.9")}
                      onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                    >
                      View Details
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Other Applications in Category */}
        {currentCategory.items.length > 1 && (
          <div style={{ marginTop: "60px" }}>
            <h2 style={{ fontSize: "24px", fontWeight: 800, color: "#171717", margin: "0 0 24px 0" }}>
              Other Applications in {currentCategory.title}
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "16px" }}>
              {currentCategory.items.map((item) => (
                <a
                  key={item.id}
                  href={`/applications/${currentCategory.title.toLowerCase().replace(/\s+/g, "-")}/${item.name.toLowerCase().replace(/\s+/g, "-")}`}
                  style={{
                    padding: "16px",
                    border: "1px solid #ddd",
                    borderRadius: "6px",
                    background: item.name === currentApplication ? "var(--primary)" : "#fff",
                    color: item.name === currentApplication ? "#fff" : "#333",
                    textDecoration: "none",
                    fontSize: "14px",
                    fontWeight: 600,
                    transition: "all 0.2s",
                    textAlign: "center",
                  }}
                  onMouseEnter={(e) => {
                    if (item.name !== currentApplication) {
                      e.currentTarget.style.background = "#f5f5f5";
                      e.currentTarget.style.borderColor = "var(--primary)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (item.name !== currentApplication) {
                      e.currentTarget.style.background = "#fff";
                      e.currentTarget.style.borderColor = "#ddd";
                    }
                  }}
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
