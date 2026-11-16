'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import KitProductForm from '../components/KitProductForm';

interface KitProduct {
  id: string;
  title: string;
  description?: string;
  image?: string;
  href?: string;
  sortOrder: number;
  isActive: boolean;
  heroTitle?: string;
}

export default function EditKitProduct() {
  const params = useParams();
  const id = Array.isArray(params?.id) ? params.id[0] : params?.id;
  const [product, setProduct] = useState<KitProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) {
      setError("Page ID not found");
      setLoading(false);
      return;
    }

    const fetchProduct = async () => {
      try {
        const response = await fetch("/api/admin/kit-products");
        if (response.ok) {
          const products: KitProduct[] = await response.json();
          const found = products.find(p => p.id === id);
          if (found) {
            setProduct(found);
          } else {
            setError("Page not found");
          }
        } else {
          setError("Failed to load page");
        }
      } catch (err) {
        setError("An error occurred while loading the page");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "60vh" }}>
        <div style={{ width: "36px", height: "36px", border: "4px solid #e0e0e0", borderTopColor: "#2D2B7F", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: "24px" }}>
        <div style={{ padding: "12px", background: "#fee2e2", color: "#991b1b", borderRadius: "8px" }}>
          {error}
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div style={{ padding: "24px" }}>
        <div style={{ padding: "12px", background: "#fee2e2", color: "#991b1b", borderRadius: "8px" }}>
          Page not found
        </div>
      </div>
    );
  }

  return (
    <div>
      <div style={{ marginBottom: "24px" }}>
        <h1 style={{ fontSize: "24px", fontWeight: 700, color: "#1a1a2e", margin: "0 0 8px 0" }}>
          Edit Lab Consumables Page
        </h1>
        <p style={{ color: "#888", fontSize: "14px", margin: 0 }}>
          Update the page details and content
        </p>
      </div>

      {/* Hero Title Section */}
      <div style={{ background: "linear-gradient(135deg, #2D2B7F 0%, #3d3b9f 100%)", borderRadius: "12px", padding: "32px", marginBottom: "24px" }}>
        <h2 style={{ fontSize: "18px", fontWeight: 700, color: "#fff", margin: "0 0 12px 0" }}>
          Hero Section Title
        </h2>
        <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.8)", margin: "0 0 16px 0" }}>
          This title appears in the Hero section when visitors view this page
        </p>
        <input
          type="text"
          value={product?.heroTitle || product?.title || ""}
          readOnly
          style={{
            width: "100%",
            padding: "12px 16px",
            border: "1px solid rgba(255,255,255,0.2)",
            borderRadius: "8px",
            background: "rgba(255,255,255,0.1)",
            color: "#fff",
            fontSize: "14px",
            fontWeight: 600,
            boxSizing: "border-box"
          }}
        />
        <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.7)", margin: "12px 0 0 0" }}>
          💡 Customize this in the form below
        </p>
      </div>

      <div style={{ background: "#fff", borderRadius: "12px", border: "1px solid #f0f0f0", padding: "24px" }}>
        <KitProductForm initialData={product} isNew={false} />
      </div>
    </div>
  );
}
