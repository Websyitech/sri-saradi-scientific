"use client";

import { useState, useEffect } from "react";
import { cleanText } from "../utils/textUtils";

interface FeaturedProduct {
  id: string;
  catalogNumber: string;
  name: string;
  image: string | null;
  category?: {
    id: string;
    name: string;
    image: string | null;
  } | null;
}

const fallbackProducts: FeaturedProduct[] = [
  { id: "1", catalogNumber: "CRM-001", name: "Certified Reference Materials", image: null },
  { id: "2", catalogNumber: "CRM-002", name: "Certified Reference Materials", image: null },
  { id: "3", catalogNumber: "CRM-003", name: "Certified Reference Materials", image: null },
  { id: "4", catalogNumber: "CRM-004", name: "Certified Reference Materials", image: null },
  { id: "5", catalogNumber: "CRM-005", name: "Certified Reference Materials", image: null },
  { id: "6", catalogNumber: "CRM-006", name: "Certified Reference Materials", image: null },
];

export default function FeaturedProducts() {
  const [products, setProducts] = useState<FeaturedProduct[]>(fallbackProducts);

  useEffect(() => {
    fetch("/api/featured-products")
      .then((res) => {
        console.log("Featured products response status:", res.status);
        return res.json();
      })
      .then((data: FeaturedProduct[]) => {
        console.log("Featured products data:", data);
        if (data && data.length > 0) {
          console.log("Setting featured products:", data);
          setProducts(data);
        } else {
          console.log("No featured products found, using fallback");
        }
      })
      .catch((error) => {
        console.error("Error fetching featured products:", error);
      });
  }, []);

  return (
    <section style={{ padding: "60px 0", background: "#fff" }}>
      <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 40px" }}>
        {/* Section Title */}
        <h2
          style={{
            textAlign: "center",
            fontSize: "36px",
            fontWeight: 800,
            margin: "0 0 40px 0",
            color: "#171717",
          }}
        >
          Featured Products
        </h2>

        {/* Products Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(6, 1fr)",
            gap: "24px",
          }}
          className="featured-products-grid"
        >
          {products.map((product) => (
            <a
              key={product.id}
              href={`/products/${product.catalogNumber}`}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textDecoration: "none",
                gap: "12px",
                cursor: "pointer",
              }}
              className="featured-product-card"
            >
              {/* Product Image */}
              <div
                style={{
                  width: "100%",
                  aspectRatio: "3/4",
                  background: "#e8e8e8",
                  borderRadius: "10px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                  transition: "transform 0.3s, box-shadow 0.3s",
                }}
              >
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.name}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    onError={(e) => {
                      const target = e.currentTarget;
                      target.onerror = null;
                      if (product.category?.image) {
                        target.src = product.category.image;
                      } else {
                        target.style.display = "none";
                      }
                    }}
                  />
                ) : product.category?.image ? (
                  <img
                    src={product.category.image}
                    alt={product.category.name}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                ) : (
                  <div
                    style={{
                      width: "60%",
                      height: "70%",
                      background: "#d0d0d0",
                      borderRadius: "6px",
                    }}
                  />
                )}
              </div>
              {/* Product Name */}
              <span
                style={{
                  fontSize: "13px",
                  fontWeight: 600,
                  color: "#333",
                  textAlign: "center",
                  lineHeight: 1.4,
                }}
              >
                {cleanText(product.name)}
              </span>
            </a>
          ))}
        </div>
      </div>
      
      <style jsx>{`
        @media (max-width: 1024px) {
          .featured-products-grid {
            grid-template-columns: repeat(4, 1fr) !important;
          }
        }
        
        @media (max-width: 768px) {
          .featured-products-grid {
            grid-template-columns: repeat(3, 1fr) !important;
            gap: 20px !important;
          }
        }
        
        @media (max-width: 480px) {
          .featured-products-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 16px !important;
          }
        }
      `}</style>
    </section>
  );
}
