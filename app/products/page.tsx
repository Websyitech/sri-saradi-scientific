"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { FaChevronDown, FaChevronUp, FaSearch, FaThList, FaTh, FaCheckCircle } from "react-icons/fa";
import AuthModal from "@/app/components/AuthModal";

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
  primaryCategory?: string;
  applications?: string | null;
  abReactivity?: string | null;
  abTarget?: string | null;
  productLine?: string | null;
  subCategory?: string | null;
  variants?: ProductVariant[];
}

interface Category {
  id: string;
  name: string;
  slug: string;
  image: string | null;
  description: string | null;
  icon: string | null;
  color: string;
  count: number;
}

interface FilterOption {
  label: string;
  count?: number;
}

interface FilterItem {
  title: string;
  key: string;
  options: FilterOption[];
}

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams?.get("category") || "";
  const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || "";

  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategoryName, setSelectedCategoryName] = useState(categoryParam);
  const [selectedCategoryImage, setSelectedCategoryImage] = useState<string | null>(null);
  const [selectedCategoryDescription, setSelectedCategoryDescription] = useState<string | null>(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [filtersLoading, setFiltersLoading] = useState(true);
  const [filters, setFilters] = useState<FilterItem[]>([]);
  const [expandedRow, setExpandedRow] = useState<string | null>(null);
  const [openFilters, setOpenFilters] = useState<Record<string, boolean>>({});
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({});
  const [filterSearch, setFilterSearch] = useState<Record<string, string>>({});
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [keyword, setKeyword] = useState("");
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const pageSize = 20;
  const [categoryImageErrors, setCategoryImageErrors] = useState<Record<string, boolean>>({});

  // Auth & Quote state
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [user, setUser] = useState<{
    id: string;
    name: string;
    email: string;
    company?: string;
    phone?: string;
  } | null>(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [pendingQuoteProduct, setPendingQuoteProduct] = useState<Product | null>(null);

  // Load categories
  useEffect(() => {
    fetch("/api/solarbio/categories")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setCategories(data);
          // If there's a category param, match by slug
          if (categoryParam) {
            const found = data.find((cat: Category) => cat.slug === categoryParam);
            if (found) {
              setSelectedCategoryId(found.id);
              setSelectedCategoryName(found.name);
              setSelectedCategoryImage(found.image);
              setSelectedCategoryDescription(found.description);
            }
          }
        }
      })
      .catch(() => {});
  }, [categoryParam]);

  // Load filters dynamically from products
  useEffect(() => {
    setFiltersLoading(true);
    const params = new URLSearchParams();
    params.set("brand", "Solarbio");
    params.set("limit", "1000");
    // Use category slug/param directly instead of ID since it supports both slugs and IDs
    if (categoryParam) {
      params.set("category", categoryParam);
    }
    if (keyword.trim()) {
      params.set("search", keyword.trim());
    }
    
    // Add filters to params but EXCLUDE subCategory to get all available values
    Object.keys(selectedFilters).forEach((filterKey) => {
      if (filterKey !== "subCategory") {
        const values = selectedFilters[filterKey];
        if (values && values.length > 0) {
          params.append(filterKey, values.join(","));
        }
      }
    });
    
    fetch(`/api/products?${params.toString()}`)
      .then((res) => res.json())
      .then((data) => {
        if (data?.products && Array.isArray(data.products)) {
          const products = data.products as Record<string, unknown>[];
          
          // Extract distinct values from products
          const subCategories = new Set<string>();
          const packSizes = new Set<string>();
          const reactivity = new Set<string>();
          const targets = new Set<string>();
          const applications = new Set<string>();

          products.forEach((product) => {
            // Sub Category - split by "/" and add each as separate item
            if (product.subCategory) {
              const subCatStr = String(product.subCategory).trim();
              if (subCatStr.includes("/")) {
                const subCatItems = subCatStr.split("/").map((item) => item.trim());
                subCatItems.forEach((item) => {
                  if (item) subCategories.add(item);
                });
              } else {
                subCategories.add(subCatStr);
              }
            }
            // Pack sizes from variants
            if (Array.isArray(product.variants)) {
              (product.variants as Record<string, unknown>[]).forEach((v) => {
                if (v.packSize) packSizes.add(String(v.packSize));
              });
            }
            // Reactivity
            if (product.abReactivity) reactivity.add(String(product.abReactivity));
            // Target
            if (product.abTarget) targets.add(String(product.abTarget));
            // Applications - split by "/" and add each as separate item
            if (product.applications) {
              const appStr = String(product.applications).trim();
              if (appStr.includes("/")) {
                const appItems = appStr.split("/").map((item) => item.trim());
                appItems.forEach((item) => {
                  if (item) applications.add(item);
                });
              } else {
                applications.add(appStr);
              }
            }
          });

          const filterList: FilterItem[] = [
            {
              title: "Sub Category",
              key: "subCategory",
              options: Array.from(subCategories)
                .sort()
                .map((label) => ({ label })),
            },
            {
              title: "Pack Size",
              key: "packSize",
              options: Array.from(packSizes)
                .sort()
                .map((label) => ({ label })),
            },
            {
              title: "Reactivity",
              key: "abReactivity",
              options: Array.from(reactivity)
                .sort()
                .map((label) => ({ label })),
            },
            {
              title: "Target",
              key: "abTarget",
              options: Array.from(targets)
                .sort()
                .map((label) => ({ label })),
            },
            {
              title: "Application",
              key: "applications",
              options: Array.from(applications)
                .sort()
                .map((label) => ({ label })),
            },
          ];

          setFilters(filterList);
          // Initialize open filters state
          const openFiltersObj: Record<string, boolean> = {};
          filterList.forEach((f) => {
            openFiltersObj[f.key] = true;
          });
          setOpenFilters(openFiltersObj);
        }
      })
      .catch(() => {})
      .finally(() => setFiltersLoading(false));
  }, [categoryParam, keyword, JSON.stringify(selectedFilters)]);

  // Load products based on selected category slug, search, pagination, and filters
  useEffect(() => {
    setLoading(true);
    setCurrentPage(1);
    const params = new URLSearchParams();
    params.set("limit", pageSize.toString());
    params.set("offset", "0");
    params.set("brand", "Solarbio");
    if (categoryParam) {
      params.set("category", categoryParam);
    }
    if (keyword.trim()) {
      params.set("search", keyword.trim());
    }

    // Add filters to params
    Object.keys(selectedFilters).forEach((filterKey) => {
      const values = selectedFilters[filterKey];
      if (values && values.length > 0) {
        params.append(filterKey, values.join(","));
      }
    });

    fetch(`/api/products?${params.toString()}`)
      .then((res) => res.json())
      .then((data) => {
        if (data?.products && Array.isArray(data.products)) {
          setProducts(
            data.products.map((p: Record<string, unknown>) => ({
              ...p,
              variants: Array.isArray(p.variants)
                ? (p.variants as Record<string, unknown>[]).map((v) => ({
                    ...v,
                    price:
                      typeof v.price === "number" && v.price > 0
                        ? `₹${Number(v.price).toLocaleString("en-IN", { minimumFractionDigits: 2 })}`
                        : typeof v.price === "string" && Number(v.price) > 0
                          ? `₹${Number(v.price).toLocaleString("en-IN", { minimumFractionDigits: 2 })}`
                          : null,
                  }))
                : [],
            }))
          );
          setTotalProducts(data.total || 0);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [categoryParam, selectedFilters, keyword, pageSize]);

  // Load products for pagination
  useEffect(() => {
    setLoading(true);
    const offset = (currentPage - 1) * pageSize;
    const params = new URLSearchParams();
    params.set("limit", pageSize.toString());
    params.set("offset", offset.toString());
    params.set("brand", "Solarbio");
    if (categoryParam) {
      params.set("category", categoryParam);
    }
    if (keyword.trim()) {
      params.set("search", keyword.trim());
    }

    // Add filters to params
    Object.keys(selectedFilters).forEach((filterKey) => {
      const values = selectedFilters[filterKey];
      if (values && values.length > 0) {
        params.append(filterKey, values.join(","));
      }
    });

    fetch(`/api/products?${params.toString()}`)
      .then((res) => res.json())
      .then((data) => {
        if (data?.products && Array.isArray(data.products)) {
          setProducts(
            data.products.map((p: Record<string, unknown>) => ({
              ...p,
              variants: Array.isArray(p.variants)
                ? (p.variants as Record<string, unknown>[]).map((v) => ({
                    ...v,
                    price:
                      typeof v.price === "number" && v.price > 0
                        ? `₹${Number(v.price).toLocaleString("en-IN", { minimumFractionDigits: 2 })}`
                        : typeof v.price === "string" && Number(v.price) > 0
                          ? `₹${Number(v.price).toLocaleString("en-IN", { minimumFractionDigits: 2 })}`
                          : null,
                  }))
                : [],
            }))
          );
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [currentPage, categoryParam, selectedFilters, keyword, pageSize]);

  // Check if user is logged in
  useEffect(() => {
    fetch("/api/auth/verify")
      .then((res) => res.json())
      .then((data) => {
        if (data.authenticated && data.user) {
          setUser(data.user);
        }
      })
      .catch(() => {});
  }, []);

  // Handle Get Quote button click
  const handleGetQuote = (product: Product) => {
    if (user) {
      // User is logged in - submit quote directly
      submitQuote(product);
    } else {
      // User not logged in - show auth modal
      setPendingQuoteProduct(product);
      setAuthModalOpen(true);
    }
  };

  const submitQuote = async (product: Product) => {
    const quoteItems = (product.variants
      ?.map((v) => {
        const quantity = getQuantity(v.id);
        return {
          productId: product.id,
          sku: v.sku || "",
          name: `${product.name} - ${v.packSize || ""}`,
          quantity,
        };
      })
      .filter((item) => item.quantity > 0)) || [];

    if (!user || quoteItems.length === 0) {
      setSuccessMessage("Please select at least one variation");
      setTimeout(() => setSuccessMessage(""), 3000);
      return;
    }

    try {
      const response = await fetch("/api/quotes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: user.name,
          email: user.email,
          phone: user.phone || "",
          company: user.company || "",
          notes: "",
          items: quoteItems,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setSuccessMessage(`Quote request sent successfully! Order ID: ${data.orderId}`);
        setTimeout(() => setSuccessMessage(""), 4000);
      }
    } catch (error) {
      console.error("Quote submission error:", error);
    }
  };

  const handleAuthSuccess = () => {
    // Refresh user info after successful auth
    fetch("/api/auth/verify")
      .then((res) => res.json())
      .then((data) => {
        if (data.authenticated && data.user) {
          setUser(data.user);
          // Submit quote with pending product if available
          if (pendingQuoteProduct) {
            submitQuote(pendingQuoteProduct);
            setPendingQuoteProduct(null);
          }
        }
      })
      .catch(() => {});
  };

  // Build breadcrumbs dynamically
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    { label: "Solarbio", href: "/products?brand=Solarbio" },
    { label: selectedCategoryName || "Products", href: "" },
  ];

  const toggleFilter = (key: string) => {
    setOpenFilters((prev) => {
      // Close all other filters and toggle the current one
      const newOpenFilters: Record<string, boolean> = {};
      Object.keys(prev).forEach((k) => {
        newOpenFilters[k] = k === key ? !prev[key] : false;
      });
      return newOpenFilters;
    });
  };

  const toggleFilterOption = (filterKey: string, option: string) => {
    setSelectedFilters((prev) => {
      const current = prev[filterKey] || [];
      if (current.includes(option)) {
        return { ...prev, [filterKey]: current.filter((o) => o !== option) };
      }
      return { ...prev, [filterKey]: [...current, option] };
    });
  };

  const toggleRow = (id: string) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  const getQuantity = (sku: string) => quantities[sku] || 0;
  const setQuantity = (sku: string, val: number) => {
    if (val < 0) val = 0;
    setQuantities((prev) => ({ ...prev, [sku]: val }));
  };

  // Debounced search with pagination reset
  const handleSearchChange = (value: string) => {
    setKeyword(value);
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(totalProducts / pageSize);
  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalProducts);

  return (
    <div style={{ minHeight: "100vh", background: "#fff" }}>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "Solarbio Products",
            description:
              "Browse Solarbio Life Sciences products including antibodies, ELISA kits, biochemicals, and reagents.",
            url: "http://localhost:3000/products",
            mainEntity: {
              "@type": "Product",
              brand: {
                "@type": "Brand",
                name: "Solarbio",
              },
              offers: {
                "@type": "AggregateOffer",
                priceCurrency: "INR",
                offerCount: products.length,
              },
            },
            breadcrumb: {
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: breadcrumbs.map((crumb, index) => ({
                "@type": "ListItem",
                position: index + 1,
                name: crumb.label,
                item: crumb.href ? `http://localhost:3000${crumb.href}` : undefined,
              })),
            },
          }),
        }}
      />

      {/* Breadcrumb - Only show if a category is selected */}
      {selectedCategoryName && (
        <nav
          aria-label="Breadcrumb"
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
          <ol style={{ display: "flex", alignItems: "center", gap: "6px", margin: 0, padding: 0, listStyle: "none" }}>
            {breadcrumbs.map((crumb, i) => (
              <li key={i} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                {i > 0 && <span style={{ color: "#999", margin: "0 6px" }}>{"/"}</span>}
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
                  <span style={{ color: "#666" }} aria-current="page">{crumb.label}</span>
                )}
              </li>
            ))}
          </ol>
        </nav>
      )}

      {/* Category Hero - Only show if a category is selected */}
      {selectedCategoryName && (
        <>
          <section
            style={{
              width: "100%",
              padding: "30px 40px",
              background: "#f5f5f5",
            }}
          >
            <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
              <h1
                style={{
                  fontSize: "32px",
                  fontWeight: 800,
                  color: "#171717",
                  margin: "0 0 24px 0",
                }}
              >
                {selectedCategoryName || "Solarbio Products"}
              </h1>
              <div style={{ display: "flex", gap: "40px", alignItems: "flex-start" }}>
              {/* Category Image Placeholder */}
              <img
                src={selectedCategoryImage ? `${serverUrl}${selectedCategoryImage}` : "/placeholder-product.svg"}
                alt={`${selectedCategoryName || "Solarbio"} product category image`}
                onError={(e) => {
                  e.currentTarget.src = "/placeholder-product.svg";
                }}
                style={{
                  width: "280px",
                  height: "260px",
                  background: "#f0f0f0",
                  borderRadius: "8px",
                  flexShrink: 0,
                  objectFit: "cover",
                }}
              />
              {/* Description */}
              <p
                style={{
                  fontSize: "15px",
                  lineHeight: 1.75,
                  color: "#444",
                  margin: 0,
                  flex: 1,
                }}
              >
                {selectedCategoryDescription}
               
              </p>
              </div>
            </div>
          </section>

          <hr style={{ border: "none", borderTop: "1px solid #e0e0e0", margin: 0 }} />
        </>
      )}

      {/* Category Selector - Card Grid - Only show if NO category is selected */}
      {categories.length > 0 && !selectedCategoryName && (
        <section
          style={{
            maxWidth: "1400px",
            margin: "0 auto",
            padding: "40px",
            borderBottom: "1px solid #e0e0e0",
          }}
          aria-label="Browse Solarbio sub-categories"
        >
          <h2 style={{ fontSize: "24px", fontWeight: 800, color: "#171717", margin: "0 0 30px 0" }}>
            Solarbio Sub-Categories
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "24px" }} role="group">
            {categories.map((cat) => (
              <a
                key={cat.name}
                href={`/products?brand=Solarbio&category=${cat.slug}`}
                aria-current={selectedCategoryName === cat.name ? "page" : undefined}
                style={{
                  display: "block",
                  textDecoration: "none",
                  borderRadius: "12px",
                  overflow: "hidden",
                  border: selectedCategoryName === cat.name ? "3px solid var(--primary)" : "1px solid #e0e0e0",
                  background: "#fff",
                  transition: "all 0.3s ease",
                  boxShadow: selectedCategoryName === cat.name ? "0 8px 24px rgba(45, 43, 127, 0.15)" : "0 2px 8px rgba(0, 0, 0, 0.08)",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  if (selectedCategoryName !== cat.name) {
                    e.currentTarget.style.boxShadow = "0 8px 24px rgba(0, 0, 0, 0.12)";
                    e.currentTarget.style.transform = "translateY(-4px)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedCategoryName !== cat.name) {
                    e.currentTarget.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.08)";
                    e.currentTarget.style.transform = "translateY(0)";
                  }
                }}
              >
                {/* Card Image - Top */}
                <div style={{ 
                  background: "linear-gradient(135deg, #2D2B7F 0%, #3d3b9f 100%)", 
                  padding: "0", 
                  textAlign: "center",
                  minHeight: "160px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                  overflow: "hidden"
                }}>
                  {cat.image && !categoryImageErrors[cat.id] ? (
                    <img
                      src={`${serverUrl}${cat.image}`}
                      alt={cat.name}
                      onError={() => setCategoryImageErrors(prev => ({ ...prev, [cat.id]: true }))}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover"
                      }}
                    />
                  ) : (
                    <div style={{ fontSize: "40px" }}>🔬</div>
                  )}
                </div>

                {/* Card Header - Title */}
                <div style={{ 
                  padding: "16px 20px", 
                  textAlign: "center",
                  borderBottom: "1px solid #e0e0e0"
                }}>
                  <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#171717", margin: 0 }}>
                    {cat.name}
                  </h3>
                </div>

                {/* Card Body - Description */}
                <div style={{ padding: "16px 20px", textAlign: "center", flex: 1 }}>
                  <p style={{ fontSize: "13px", color: "#666", margin: 0, lineHeight: 1.5 }}>
                    Browse all {cat.name} products from Solarbio Life Sciences
                  </p>
                </div>

                {/* Card Footer - CTA */}
                <div style={{ padding: "12px 20px", textAlign: "center", borderTop: "1px solid #e0e0e0" }}>
                  <div style={{ fontSize: "12px", fontWeight: 600, color: "var(--primary)", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px" }}>
                    View Category →
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>
      )}

      {/* Products Section - Only show if a category is selected */}
      {selectedCategoryName && (
        <section
          style={{
            maxWidth: "1400px",
            margin: "0 auto",
            padding: "30px 40px",
            display: "flex",
            gap: "32px",
            alignItems: "flex-start",
          }}
          aria-label="Product listing"
        >
        {/* Sidebar Filters */}
        <aside style={{ width: "240px", flexShrink: 0 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
            <h2 style={{ fontSize: "22px", fontWeight: 800, margin: 0, color: "#171717" }}>
              Products
            </h2>
            {Object.keys(selectedFilters).some((key) => selectedFilters[key].length > 0) && (
              <button
                onClick={() => setSelectedFilters({})}
                style={{
                  background: "none",
                  border: "none",
                  color: "var(--primary)",
                  fontSize: "12px",
                  fontWeight: 600,
                  cursor: "pointer",
                  padding: "4px 8px",
                  textDecoration: "underline",
                }}
              >
                Clear All
              </button>
            )}
          </div>

          {filters.map((filter) => {
            const isAntibodyCategory = selectedCategoryName?.toLowerCase().includes("antibod");
            const antibodyFilters = ["abReactivity", "abTarget", "applications"];
            const shouldShowFilter = isAntibodyCategory || !antibodyFilters.includes(filter.key);

            return shouldShowFilter ? (
            <div
              key={filter.key}
              style={{
                borderBottom: "1px solid #eee",
                paddingBottom: "14px",
                marginBottom: "14px",
              }}
            >
              {/* Filter Header */}
              <button
                onClick={() => toggleFilter(filter.key)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "100%",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: "0",
                  fontSize: "15px",
                  fontWeight: 700,
                  color: "#171717",
                  marginBottom: openFilters[filter.key] ? "12px" : "0",
                }}
              >
                {filter.title}
                {openFilters[filter.key] ? (
                  <FaChevronUp style={{ fontSize: "12px", color: "var(--primary)" }} />
                ) : (
                  <FaChevronDown style={{ fontSize: "12px", color: "#999" }} />
                )}
              </button>

              {/* Filter Search Input - for all filters with more than 5 options */}
              {openFilters[filter.key] && filter.options.length > 5 && (
                <input
                  type="text"
                  placeholder="Search..."
                  value={filterSearch[filter.key] || ""}
                  onChange={(e) =>
                    setFilterSearch((prev) => ({ ...prev, [filter.key]: e.target.value }))
                  }
                  style={{
                    width: "100%",
                    padding: "8px",
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                    fontSize: "13px",
                    marginBottom: "8px",
                  }}
                />
              )}

              {/* Filter Options */}
              {openFilters[filter.key] && filter.options.length > 0 && (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                    maxHeight: filter.options.length > 5 ? "220px" : "auto",
                    overflowY: filter.options.length > 5 ? "auto" : "visible",
                    paddingRight: filter.options.length > 5 ? "8px" : "0",
                  }}
                >
                  {filter.options
                    .filter((opt) => {
                      const searchTerm = filterSearch[filter.key] || "";
                      return searchTerm === "" || opt.label.toLowerCase().includes(searchTerm.toLowerCase());
                    })
                    .map((opt) => (
                    <label
                      key={opt.label}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        cursor: "pointer",
                        fontSize: "14px",
                        color: "#444",
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={(selectedFilters[filter.key] || []).includes(opt.label)}
                        onChange={() => toggleFilterOption(filter.key, opt.label)}
                        style={{
                          width: "16px",
                          height: "16px",
                          accentColor: "var(--primary)",
                          cursor: "pointer",
                        }}
                      />
                      {opt.label}
                    </label>
                    ))}
                </div>
              )}
            </div>
            ) : null;
          })}
        </aside>

        {/* Product Listing */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <h2 style={{ fontSize: "18px", fontWeight: 700, color: "#333", margin: "0 0 20px 0" }}>
            Available Products ({totalProducts > 0 ? `${startItem}-${endItem} of ${totalProducts}` : 0})
          </h2>

          {/* Toolbar */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              marginBottom: "20px",
              flexWrap: "wrap",
            }}
          >
            {/* Filter by Keyword */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                border: "1px solid #ccc",
                borderRadius: "4px",
                overflow: "hidden",
                height: "40px",
              }}
            >
              <input
                type="text"
                placeholder="Filter by Keyword"
                value={keyword}
                onChange={(e) => handleSearchChange(e.target.value)}
                style={{
                  border: "none",
                  outline: "none",
                  padding: "0 12px",
                  fontSize: "14px",
                  height: "100%",
                  width: "180px",
                  color: "#333",
                }}
              />
              <button
                style={{
                  background: "none",
                  border: "none",
                  borderLeft: "1px solid #ccc",
                  height: "100%",
                  width: "40px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  color: "#666",
                }}
              >
                <FaSearch />
              </button>
            </div>

            {/* Clear Filters Button */}
            {Object.keys(selectedFilters).some((key) => selectedFilters[key].length > 0) && (
              <button
                onClick={() => setSelectedFilters({})}
                style={{
                  height: "40px",
                  padding: "0 14px",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  fontSize: "14px",
                  color: "var(--primary)",
                  background: "#fff",
                  cursor: "pointer",
                  fontWeight: 600,
                }}
              >
                Clear Filters
              </button>
            )}

            {/* Count - Right aligned */}
            <span style={{ fontSize: "14px", color: "#666", marginLeft: "auto" }}>
              Showing {totalProducts > 0 ? startItem : 0}-{endItem} of {totalProducts}
            </span>
          </div>

          {/* Table Header */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: selectedCategoryName?.toLowerCase().includes("antibod") 
                ? "100px 120px 90px 100px 140px 70px 180px 150px 1fr"
                : "100px 120px 90px 100px 140px 70px 180px 1fr",
              borderBottom: "2px solid var(--primary)",
              padding: "12px 8px",
              fontSize: "12px",
              fontWeight: 700,
              color: "#333",
              gap: "8px",
            }}
            role="row"
          >
            <div role="columnheader">Catalog No</div>
            <div role="columnheader">Product Name</div>
            <div role="columnheader">Product Line</div>
            {!selectedCategoryName?.toLowerCase().includes("antibod") && (
              <div role="columnheader">Brand</div>
            )}
            <div role="columnheader">Applications</div>
            <div role="columnheader">Pack Size</div>
            {selectedCategoryName?.toLowerCase().includes("antibod") && (
              <>
                <div role="columnheader">Reactivity</div>
                <div role="columnheader">Target</div>
              </>
            )}
            <div role="columnheader" style={{ textAlign: "center" }}>Quantity</div>
            <div role="columnheader" style={{ textAlign: "center" }}>Action</div>
          </div>

          {/* Loading State */}
          {loading && (
            <div style={{ padding: "40px", textAlign: "center", color: "#999" }}>
              <div style={{ fontSize: "14px", marginBottom: "12px" }}>Loading products...</div>
              <div style={{ width: "36px", height: "36px", border: "3px solid #e0e0e0", borderTopColor: "var(--primary)", borderRadius: "50%", margin: "0 auto", animation: "spin 0.8s linear infinite" }} />
            </div>
          )}

          {/* No Products State */}
          {!loading && products.length === 0 && (
            <div style={{ padding: "40px", textAlign: "center", color: "#999" }}>
              <div style={{ fontSize: "16px", fontWeight: 600, marginBottom: "8px" }}>No products found</div>
              <div style={{ fontSize: "14px" }}>
                {selectedCategoryName ? `No products available in the ${selectedCategoryName} category.` : "No products available."}
              </div>
            </div>
          )}

          {/* Product Rows */}
          {!loading && products.map((product) => (
            <div
              key={product.id}
              style={{
                borderBottom: "1px solid #eee",
              }}
              role="row"
            >
              {/* Main Row */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: selectedCategoryName?.toLowerCase().includes("antibod") 
                    ? "100px 120px 90px 100px 140px 70px 180px 150px 1fr"
                    : "100px 120px 90px 100px 140px 70px 180px 1fr",
                  padding: "12px 8px",
                  alignItems: "left",
                  fontSize: "13px",
                  gap: "8px",
                }}
              >
                <div style={{ color: "#444", fontWeight: 600 }} role="cell">
                  {product.catalogNumber}
                </div>
                <div style={{ color: "#555", fontSize: "12px" }} role="cell">
                  {product.name || "-"}
                </div>
                <div style={{ color: "#555", fontSize: "12px" }} role="cell">
                  {product.productLine || "-"}
                </div>
                {!selectedCategoryName?.toLowerCase().includes("antibod") && (
                  <div style={{ color: "#555", fontSize: "12px" }} role="cell">
                    {product.brand || "-"}
                  </div>
                )}
                <div style={{ color: "#555", fontSize: "12px" }} role="cell">
                  {product.applications ? product.applications.substring(0, 30) + (product.applications.length > 30 ? "..." : "") : "-"}
                </div>
                <div style={{ color: "#555", fontSize: "12px" }} role="cell">
                  {product.variants && product.variants.length > 0
                    ? product.variants[0].packSize || "-"
                    : "-"}
                </div>
                {selectedCategoryName?.toLowerCase().includes("antibod") && (
                  <>
                    <div style={{ color: "#555", fontSize: "12px", wordWrap: "break-word", overflowWrap: "break-word", whiteSpace: "normal" }} role="cell">
                      {product.abReactivity || "-"}
                    </div>
                    <div style={{ color: "#555", fontSize: "12px", wordWrap: "break-word", overflowWrap: "break-word", whiteSpace: "normal" }} role="cell">
                      {product.abTarget || "-"}
                    </div>
                  </>
                )}
                <div style={{ textAlign: "center", width: "100%" }} role="cell">
                  <div
                    style={{
                      display: "flex",
                      alignItems: "left",
                      justifyContent: "left",
                      gap: "0",
                      border: "1px solid #ddd",
                      borderRadius: "4px",
                      overflow: "hidden",
                      height: "32px",
                      width: "70px",
                      margin: "0 auto",
                    }}
                  >
                    <button
                      onClick={() =>
                        setQuantities({
                          ...quantities,
                          [product.id]: Math.max(0, (quantities[product.id] || 0) - 1),
                        })
                      }
                      style={{
                        width: "28px",
                        height: "100%",
                        background: "var(--primary)",
                        color: "#fff",
                        border: "none",
                        fontSize: "16px",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                      title="Decrease quantity"
                    >
                      −
                    </button>
                    <input
                      type="number"
                      min="0"
                      value={quantities[product.id] || 0}
                      onChange={(e) =>
                        setQuantities({
                          ...quantities,
                          [product.id]: Math.max(0, parseInt(e.target.value) || 0),
                        })
                      }
                      style={{
                        width: "34px",
                        height: "100%",
                        border: "none",
                        textAlign: "center",
                        fontSize: "12px",
                        fontWeight: 600,
                        outline: "none",
                        color: "#333",
                      }}
                    />
                    <button
                      onClick={() =>
                        setQuantities({
                          ...quantities,
                          [product.id]: (quantities[product.id] || 0) + 1,
                        })
                      }
                      style={{
                        width: "28px",
                        height: "100%",
                        background: "var(--primary)",
                        color: "#fff",
                        border: "none",
                        fontSize: "16px",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                      title="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                </div>
                <div style={{ display: "flex", gap: "3px", justifyContent: "center" }}>
                  <a
                    href={`/products/${product.catalogNumber}`}
                    style={{
                      background: "#f0f0f0",
                      color: "var(--primary)",
                      border: "1px solid #ddd",
                      padding: "4px 6px",
                      borderRadius: "3px",
                      fontSize: "10px",
                      fontWeight: 600,
                      cursor: "pointer",
                      textDecoration: "none",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Details
                  </a>
                  <button
                    onClick={() => handleGetQuote(product)}
                    style={{
                      background: "var(--primary)",
                      color: "#fff",
                      border: "none",
                      padding: "4px 8px",
                      borderRadius: "3px",
                      fontSize: "10px",
                      fontWeight: 600,
                      cursor: "pointer",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Quote
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* Pagination */}
          {totalProducts > pageSize && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                marginTop: "32px",
                paddingTop: "24px",
                borderTop: "1px solid #eee",
              }}
            >
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                style={{
                  padding: "8px 12px",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  background: currentPage === 1 ? "#f0f0f0" : "#fff",
                  color: currentPage === 1 ? "#999" : "#333",
                  cursor: currentPage === 1 ? "not-allowed" : "pointer",
                  fontSize: "14px",
                  fontWeight: 500,
                }}
              >
                ← Previous
              </button>

              <div style={{ display: "flex", gap: "4px", alignItems: "center" }}>
                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .filter((page) => {
                    const distance = Math.abs(page - currentPage);
                    return distance === 0 || distance === 1 || page === 1 || page === totalPages;
                  })
                  .map((page, index, arr) => (
                    <div key={page}>
                      {index > 0 && arr[index - 1] !== page - 1 && (
                        <span style={{ padding: "0 4px", color: "#999" }}>...</span>
                      )}
                      <button
                        onClick={() => setCurrentPage(page)}
                        style={{
                          padding: "6px 10px",
                          minWidth: "32px",
                          border: page === currentPage ? "2px solid var(--primary)" : "1px solid #ccc",
                          borderRadius: "4px",
                          background: page === currentPage ? "var(--primary)" : "#fff",
                          color: page === currentPage ? "#fff" : "#333",
                          cursor: "pointer",
                          fontSize: "14px",
                          fontWeight: page === currentPage ? 600 : 400,
                        }}
                      >
                        {page}
                      </button>
                    </div>
                  ))}
              </div>

              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                style={{
                  padding: "8px 12px",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  background: currentPage === totalPages ? "#f0f0f0" : "#fff",
                  color: currentPage === totalPages ? "#999" : "#333",
                  cursor: currentPage === totalPages ? "not-allowed" : "pointer",
                  fontSize: "14px",
                  fontWeight: 500,
                }}
              >
                Next →
              </button>
            </div>
          )}
        </div>
      </section>
      )}

      {/* Success Message Toast */}
      {successMessage && (
        <div
          style={{
            position: "fixed",
            bottom: "24px",
            left: "24px",
            background: "#1B7A2E",
            color: "#fff",
            padding: "16px 20px",
            borderRadius: "6px",
            fontSize: "14px",
            fontWeight: 500,
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
            zIndex: 100,
            maxWidth: "400px",
          }}
        >
          ✓ {successMessage}
        </div>
      )}

      {/* Auth Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onSuccess={handleAuthSuccess}
      />
    </div>
  );
}
