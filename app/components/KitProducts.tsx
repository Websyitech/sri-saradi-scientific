"use client";

import { useState, useEffect } from "react";
import { cleanText } from "../products/page";

interface KitProduct {
  id: string;
  title: string;
  description: string | null;
  image: string | null;
  href: string | null;
}

const fallbackKitProducts: KitProduct[] = [
  {
    id: "1",
    title: "Apoptosis & Cell Viability",
    description:
      "Complete workflows: Annexin V/PI Kits, TUNEL Assays, and mitochondrial membrane potential detection.",
    image: null,
    href: "/products/apoptosis-cell-viability",
  },
  {
    id: "2",
    title: "Eco-Friendly Lab Essentials",
    description:
      "Reduce plastic waste with GenFollower's E-Series Pipette Tip Refill System. Sterile and easy to load",
    image: null,
    href: "/products/eco-friendly-lab",
  },
  {
    id: "3",
    title: "Optical Precision",
    description:
      "From routine Education (EDU-LUX) to Research (BIO-VIEW). Scandinavian design with Plan Apochromatic objectives",
    image: null,
    href: "/products/optical-precision",
  },
];

export default function KitProducts() {
  const [kitProducts, setKitProducts] = useState<KitProduct[]>(fallbackKitProducts);

  useEffect(() => {
    fetch("/api/kit-products")
      .then((res) => res.json())
      .then((data: KitProduct[]) => {
        if (data && data.length > 0) setKitProducts(data);
      })
      .catch(() => {});
  }, []);

  return (
    <section style={{ padding: "0px 0", background: "#f9f9f9" }}>
      <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 40px" }}>
        {/* Section Title */}
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <h2
            style={{
              fontSize: "36px",
              fontWeight: 800,
              margin: "0 0 8px 0",
              color: "#171717",
            }}
          >
            <span style={{ color: "var(--primary)" }}>Lab</span> Consumables
          </h2>
          {/* <p
            style={{
              fontSize: "16px",
              color: "#666",
              margin: 0,
              fontWeight: 600,
            }}
          >
            Advanced Research Solutions
          </p> */}
        </div>

        {/* View All Link */}
        {/* <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "24px" }}>
          <a
            href="/lab-consumables"
            style={{
              color: "var(--primary)",
              textDecoration: "none",
              fontWeight: 600,
              fontSize: "14px",
              padding: "8px 16px",
              border: "1px solid var(--primary)",
              borderRadius: "6px",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "var(--primary)";
              e.currentTarget.style.color = "#fff";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "var(--primary)";
            }}
          >
            View All Products →
          </a>
        </div> */}

        {/* Product Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "80px",
          }}
        >
          {kitProducts.map((product) => (
            <a
              key={product.id}
              href={product.href || "#"}
              style={{
                textDecoration: "none",
                color: "inherit",
                display: "flex",
                flexDirection: "column",
                background: "#fff",
                borderRadius: "12px",
                overflow: "hidden",
                transition: "transform 0.3s, box-shadow 0.3s",
                border: "1px solid #eee",
              }}
              className="kit-product-card"
            >
              {/* Image */}
              <div
                style={{
                  width: "100%",
                  aspectRatio: "16/9",
                  background: "#e0e0e0",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.title}
                    style={{ width: "100%", height: "60%", objectFit: "cover" }}
                  />
                ) : (
                  <div
                    style={{
                      width: "80%",
                      height: "80%",
                      background: "#d0d0d0",
                      borderRadius: "4px",
                    }}
                  />
                )}
              </div>
              {/* Content */}
              <div style={{ padding: "20px" }}>
                <h3
                  style={{
                    fontSize: "18px",
                    fontWeight: 700,
                    color: "#171717",
                    margin: "0 0 8px 0",
                  }}
                >
                  {cleanText(product.title)}
                </h3>
                <p
                  style={{
                    fontSize: "14px",
                    lineHeight: 1.6,
                    color: "#666",
                    margin: 0,
                  }}
                >
                  {product.description}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
