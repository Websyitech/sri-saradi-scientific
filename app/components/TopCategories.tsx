"use client";

import { useState, useEffect } from "react";

interface SolarbioCategory {
  id: string;
  name: string;
  slug: string;
  image: string | null;
  icon: string | null;
  color: string;
  count: number;
}

export default function TopCategories() {
  const [categories, setCategories] = useState<SolarbioCategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/solarbio/categories")
      .then((res) => res.json())
      .then((data: SolarbioCategory[]) => {
        setCategories((data || []).slice(0, 8));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  /* ── Skeleton ── */
  if (loading) {
    return (
      <section className="top-cat-section">
        <div className="top-cat-container">
          <div className="top-cat-header">
            <div className="top-cat-skel top-cat-skel-badge" />
            <div className="top-cat-skel top-cat-skel-title" />
            <div className="top-cat-skel top-cat-skel-sub" />
          </div>
          <div className="top-cat-grid">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="top-cat-skel top-cat-skel-card" style={{ animationDelay: `${i * 0.07}s` }} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (categories.length === 0) return null;

  return (
    <section className="top-cat-section">
      <div className="top-cat-container">

        {/* ── Header ── */}
        <div className="top-cat-header">
          <span className="top-cat-badge">
            <svg viewBox="0 0 16 16" width="13" height="13" fill="none">
              <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
              <path d="M5 8.5c0-1.66 1.34-3 3-3s3 1.34 3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <circle cx="8" cy="10" r="1" fill="currentColor" />
            </svg>
            Solarbio Life Sciences
          </span>
          <h2 className="top-cat-title">
            Shop by <span className="top-cat-title-accent">Category</span>
          </h2>
          <p className="top-cat-subtitle">
            Browse thousands of Solarbio products across our top categories
          </p>
        </div>

        {/* ── 4-column Grid ── */}
        <div className="top-cat-grid">
          {categories.map((cat) => {
            const color = cat.color || "#2D2B7F";
            return (
              <a
                key={cat.id}
                href={`/products/Solarbio/${cat.name.toLowerCase().replace(/\s+/g, "-")}`}
                className="top-cat-card"
                title={cat.name}
              >
                {/* Image area */}
                <div className="top-cat-img-wrap">
                  {/* Top accent line */}
                  <div className="top-cat-img-bar" style={{ background: color }} />

                  {cat.image ? (
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="top-cat-img"
                    />
                  ) : (
                    <div className="top-cat-placeholder">
                      <span className="top-cat-placeholder-label">Image coming soon</span>
                    </div>
                  )}
                </div>

                {/* Text area */}
                <div className="top-cat-info">
                  <span className="top-cat-name">{cat.name}</span>
                  {cat.count > 0 && (
                    <span className="top-cat-count" style={{ color, background: `${color}12` }}>
                      {cat.count.toLocaleString()} products
                    </span>
                  )}
                  <span className="top-cat-arrow" style={{ color }}>
                    Browse →
                  </span>
                </div>
              </a>
            );
          })}
        </div>

        {/* ── View All ── */}
     

      </div>
    </section>
  );
}
