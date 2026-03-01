'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface Product {
  title: string;
  icon: string;
  description: string;
  details: string[];
}

interface ProductCategory {
  id: string;
  title: string;
  icon: string;
  description: string;
  color: string;
  products: Product[];
}

interface AssociatedProduct {
  id?: string;
  productTitle: string;
  categoryId?: string;
  image?: string;
  description?: string;
  details?: string[];
  isCustom?: boolean;
}

interface KitProduct {
  id?: string;
  title: string;
  description?: string;
  image?: string;
  href?: string;
  heroTitle?: string;
  sortOrder: number;
  isActive: boolean;
  associatedProducts?: AssociatedProduct[];
}

const PRODUCT_CATEGORIES: ProductCategory[] = [
  {
    id: 'liquid-handling',
    title: 'Liquid Handling Series',
    icon: '💧',
    description: 'Precision liquid handling consumables for automated and manual pipetting',
    color: '#667eea',
    products: [
      {
        title: 'Automated Pipette Tips - Bravo',
        icon: '🔬',
        description: 'Compatible with: Bravo, AMTK, BGI platforms',
        details: ['10µL: CRAT10-T-TP-P (384pcs/box)', '50µL: CRAT50-T-TP-P (384pcs/box)', '200µL: CRAT200-T-TP variants', '1000µL: CRAT1000-T-TP variants', 'Transparent, Black, Filter options']
      },
      {
        title: 'Automated Pipette Tips - Tecan',
        icon: '🔬',
        description: 'Compatible with: Tecan Freedom EVO, Fluent Air',
        details: ['10µL: Filter & Non-filter (96-480pcs/box)', '50µL: Multiple configurations', '200µL: SBS & Single boxes', '1000µL: Various packings', 'Black conductive & Transparent']
      },
      {
        title: 'Universal Pipette Tips',
        icon: '💧',
        description: 'Compatible with: Rainin, LiteTouch, XLS, Eppendorf',
        details: ['10µL-20µL: 1000pcs/bag', '200µL: Yellow/Transparent', '1000µL: Blue/Transparent', '5mL-10mL: Extended length', 'Filter & Non-filter options']
      },
      {
        title: 'Pasteur Pipettes',
        icon: '🧪',
        description: 'Medical-grade LDPE with scale markings',
        details: ['1mL: 500pcs/bag or 250pcs/box', '3mL: 500pcs/bag', '5mL: 250pcs/bag', '7mL: 100pcs/bag', 'Individually packaged, sterilized']
      }
    ]
  },
  {
    id: 'molecular',
    title: 'Molecular Series',
    icon: '🧬',
    description: 'PCR plates, tubes, and deep well plates for nucleic acid applications',
    color: '#764ba2',
    products: [
      {
        title: 'Square Deep Well Plates',
        icon: '📦',
        description: 'For nucleic acid extraction and sample storage',
        details: ['1.2mL 96-well: U/V/Conical bottom', '2.2mL 96-well: U/V bottom', '10mL 24-well: U/V/Conical', '15mL 24-well: Conical bottom', 'PP material, -80°C to +121°C']
      },
      {
        title: 'Round Deep Well Plates',
        icon: '📦',
        description: 'Optimized for automated liquid handling',
        details: ['240µL 384-well: V bottom', '350µL 96-well: V bottom', '1.2mL 96-well: U/V bottom', '2.0mL 96-well: U bottom', 'Compatible with automated extractors']
      },
      {
        title: 'PCR Plates',
        icon: '🧬',
        description: 'For standard and qPCR applications',
        details: ['0.1mL 96-well: Full/Half/No skirt', '0.2mL 96-well: Multiple skirt options', '40µL 384-well: Full skirt', 'Transparent & White options', 'ABI compatible, Tearable options']
      },
      {
        title: 'PCR Tubes & Strips',
        icon: '🧪',
        description: 'Single tubes and 8-strip formats',
        details: ['0.2mL Single: 1000pcs/bag', '0.5mL Single: 1000pcs/bag', '8-Strip Tubes: With caps', '4-Strip Tubes: 250pcs/bag', 'Flat cap, Domed cap options']
      }
    ]
  },
  {
    id: 'cell-culture',
    title: 'Cell Culture Series',
    icon: '🔬',
    description: 'TC-treated surfaces for adherent and suspension cell culture',
    color: '#667eea',
    products: [
      {
        title: 'Cell Culture Dishes (TC-Treated)',
        icon: '🔬',
        description: 'PS material, TC-treated for adherent cells',
        details: ['35mm: 10pcs/bag, 300pcs/ctn', '60mm: 20pcs/bag, 500pcs/ctn', '90mm: 10pcs/bag, 320pcs/ctn', '100mm: 10pcs/bag, 500pcs/ctn', '150mm: 10pcs/bag, 80pcs/ctn']
      },
      {
        title: 'Cell Culture Plates',
        icon: '📊',
        description: 'Multi-well plates with TC treatment',
        details: ['6-well: 9.5cm² growth area', '12-well: 3.8cm² growth area', '24-well: 1.9cm² growth area', '48-well: 0.8cm² growth area', '96-well: Flat/U/V bottom']
      },
      {
        title: 'Cell Culture Flasks',
        icon: '🧴',
        description: 'T25, T75, T175 with vent or sealed caps',
        details: ['T25: 25cm², 5-10mL', 'T75: 75cm², 15-25mL', 'T175: 175cm², 40-55mL', 'Vent cap (0.22µm filter) or Sealing cap', 'Oblique neck design']
      },
      {
        title: 'Serological Pipettes',
        icon: '💉',
        description: 'PS material with dual scale markings',
        details: ['1mL: Purple (50pcs/bag)', '2mL: Black (50pcs/bag)', '5mL: Yellow (25pcs/bag)', '10mL: Green (25pcs/bag)', '25mL: Orange (20pcs/bag)']
      }
    ]
  },
  {
    id: 'immunoassay',
    title: 'Immunoassay Series',
    icon: '🧪',
    description: 'ELISA plates, chemiluminescence cups, and analyzer consumables',
    color: '#764ba2',
    products: [
      {
        title: 'Chemiluminescence Cups',
        icon: '💡',
        description: 'For automated immunoassay analyzers',
        details: ['33mm Long Tube: 1000pcs/bag', '44mm Long Tube: 1000pcs/bag', 'Reaction Cups: Various sizes', 'Abbott/Hitachi Compatible kits', 'PP material, smooth inner wall']
      },
      {
        title: 'ELISA Plates',
        icon: '📋',
        description: 'High-binding and middle-binding surfaces',
        details: ['Middle-Binding: 200-300ng/cm²', 'High-Binding: 400-500ng/cm²', 'Colors: Transparent, White, Black', 'Bottom Types: Flat, U-bottom, V-bottom', '200pcs/ctn or 100pcs/ctn']
      },
      {
        title: 'Blood Group Plates',
        icon: '🩸',
        description: 'For blood typing and immunohematology',
        details: ['96-well: U-bottom', 'Transparent, detachable', '200µL capacity per well', 'Compatible with automated systems', 'For immunohematology applications']
      },
      {
        title: 'UV Transparent Plate',
        icon: '🔬',
        description: 'For UV spectrophotometry applications',
        details: ['96-well: Flat bottom', 'UV-transparent material', 'Suitable for DNA/RNA quantification', '1pc/pack, 50pcs/ctn', 'Optical clarity guaranteed']
      }
    ]
  },
  {
    id: 'storage',
    title: 'Storage Series',
    icon: '📦',
    description: 'Centrifuge tubes, cryogenic vials, reagent bottles, and reservoirs',
    color: '#667eea',
    products: [
      {
        title: 'Microcentrifuge Tubes',
        icon: '🧪',
        description: '0.2mL - 2.0mL with snap caps',
        details: ['0.2mL: Sharp/Round bottom', '0.5mL: Sharp/Round bottom', '1.5mL: Sharp/Round bottom', '2.0mL: Sharp/Round bottom', 'PP material, -80°C to +121°C']
      },
      {
        title: 'Centrifuge Tubes (15mL & 50mL)',
        icon: '⚗️',
        description: 'Conical, round, and upright bottom options',
        details: ['15mL: Conical/Round bottom', '50mL: Conical/Round/Upright', 'Black scale markings', 'Screw cap or snap cap', '20,000 RCF rated']
      },
      {
        title: 'Cryogenic Vials',
        icon: '❄️',
        description: '-196°C to +90°C temperature range',
        details: ['Volumes: 0.5mL to 2.0mL', 'Colors: White, Red, Blue, Green, Orange', 'Cap Types: High cap or Low cap', '500pcs/bag, 5000pcs/ctn', 'PP material, single thread design']
      },
      {
        title: 'Reagent Bottles & Reservoirs',
        icon: '🍶',
        description: 'PP bottles for reagent storage',
        details: ['30mL-125mL: 100pcs/bag', '250mL-500mL: 50-100pcs/bag', '1000mL: 50pcs/bag', 'Natural or Brown color', 'Autoclavable at 121°C']
      }
    ]
  },
  {
    id: 'sealing',
    title: 'Sealing Series',
    icon: '🔒',
    description: 'Films and mats for plate sealing and sample protection',
    color: '#764ba2',
    products: [
      {
        title: 'Sealing Films',
        icon: '📄',
        description: 'For PCR plates, deep well plates, and ELISA',
        details: ['Aluminum Sealing Film: 125x83mm', 'PCR Adhesive Film: 137x80mm', 'PCR Heat-Sealing: 125x80mm', 'PCR Sealing Film: 140x80mm', 'Deep Well Sealing: 129x86.9mm']
      },
      {
        title: 'Silicone Mats',
        icon: '🔲',
        description: 'Reusable sealing mats for plates',
        details: ['24-well Square: 10pcs/bag', '48-well Square: 10pcs/bag', '96-well Round (7.3mm): 50pcs/bag', '96-well Round (8.3mm): 50pcs/bag', '96-well Square & PCR: 10-50pcs/bag']
      }
    ]
  },
  {
    id: 'mass-spectrometry',
    title: 'Mass Spectrometry Series',
    icon: '📊',
    description: 'Filter vials for sample preparation and LC-MS applications',
    color: '#667eea',
    products: [
      {
        title: 'Filter Vials',
        icon: '🔬',
        description: 'NYLON and PTFE filter materials',
        details: ['NYLON Transparent: 300pcs/bag', 'NYLON Black: 300pcs/bag', 'PTFE Transparent: 300pcs/bag', 'PTFE Black: 300pcs/bag', 'For rapid filtration and sample prep']
      }
    ]
  },
  {
    id: 'poct-custom',
    title: 'POCT & Custom Services',
    icon: '🏥',
    description: 'Custom mold design, product development, and OEM/ODM manufacturing',
    color: '#764ba2',
    products: [
      {
        title: 'POCT Products',
        icon: '🩺',
        description: 'Point-of-Care Testing consumables',
        details: ['Custom mold design services', 'POCT device component manufacturing', 'Rapid test accessories', 'One-stop development and production', 'Consultation for custom requirements']
      },
      {
        title: 'CDMO Services',
        icon: '🏭',
        description: 'Contract Development & Manufacturing',
        details: ['Custom product R&D and design', '3D printing verification', 'High-precision mold manufacturing', 'OEM/ODM production services', 'From concept to mass production']
      }
    ]
  }
];

interface KitProductFormProps {
  initialData?: KitProduct;
  isNew?: boolean;
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "10px 12px",
  border: "1px solid #ddd",
  borderRadius: "8px",
  fontSize: "14px",
  outline: "none",
  boxSizing: "border-box"
};

export default function KitProductForm({ initialData, isNew = false }: KitProductFormProps) {
  const router = useRouter();
  
  const parseAssociatedProducts = (data: any) => {
    if (!data) return { title: "", description: "", image: "", href: "", heroTitle: "", sortOrder: 0, isActive: true, associatedProducts: [] };
    
    let associatedProducts = [];
    if (typeof data.associatedProducts === 'string') {
      try {
        associatedProducts = JSON.parse(data.associatedProducts);
      } catch (e) {
        associatedProducts = [];
      }
    } else if (Array.isArray(data.associatedProducts)) {
      associatedProducts = data.associatedProducts;
    }
    
    return { ...data, associatedProducts };
  };
  
  const [form, setForm] = useState<KitProduct>(
    parseAssociatedProducts(initialData)
  );
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string>(initialData?.image || "");
  const [error, setError] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedProduct, setSelectedProduct] = useState<string>('');
  const [showCustomProductForm, setShowCustomProductForm] = useState(false);
  const [customProduct, setCustomProduct] = useState({
    productTitle: '',
    image: '',
    description: '',
    details: ['']
  });
  const [customProductImagePreview, setCustomProductImagePreview] = useState<string>('');
  const [editingProductIndex, setEditingProductIndex] = useState<number | null>(null);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/admin/upload", { method: "POST", body: formData });
      const data = await response.json();
      if (response.ok && data.url) {
        setForm({ ...form, image: data.url });
        setImagePreview(data.url);
      }
    } catch (error) {
      setError("Upload failed");
      console.error("Upload failed:", error);
    } finally {
      setUploading(false);
    }
  };

  const handleAddProduct = () => {
    if (!selectedCategory || !selectedProduct) return;
    
    const newAssociated: AssociatedProduct = {
      productTitle: selectedProduct,
      categoryId: selectedCategory
    };
    
    setForm({
      ...form,
      associatedProducts: [...(form.associatedProducts || []), newAssociated]
    });
    
    setSelectedCategory('');
    setSelectedProduct('');
  };

  const handleCustomProductImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/admin/upload", { method: "POST", body: formData });
      const data = await response.json();
      if (response.ok && data.url) {
        setCustomProduct({ ...customProduct, image: data.url });
        setCustomProductImagePreview(data.url);
      }
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setUploading(false);
    }
  };

  const handleAddCustomProduct = () => {
    if (!customProduct.productTitle.trim() || !customProduct.image || !customProduct.description.trim()) {
      alert('Please fill in Title, Image, and Description');
      return;
    }

    const filteredDetails = customProduct.details.filter(d => d.trim());
    
    const newCustomProduct: AssociatedProduct = {
      id: `custom-${Date.now()}`,
      productTitle: customProduct.productTitle,
      image: customProduct.image,
      description: customProduct.description,
      details: filteredDetails.length > 0 ? filteredDetails : undefined,
      isCustom: true
    };

    setForm({
      ...form,
      associatedProducts: [...(form.associatedProducts || []), newCustomProduct]
    });

    setCustomProduct({
      productTitle: '',
      image: '',
      description: '',
      details: ['']
    });
    setCustomProductImagePreview('');
    setShowCustomProductForm(false);
  };

  const handleEditProduct = (index: number) => {
    const product = form.associatedProducts![index];
    setCustomProduct({
      productTitle: product.productTitle,
      image: product.image || '',
      description: product.description || '',
      details: product.details || ['']
    });
    setCustomProductImagePreview(product.image || '');
    setEditingProductIndex(index);
    setShowCustomProductForm(true);
  };

  const handleUpdateProduct = () => {
    if (editingProductIndex === null) return;
    
    if (!customProduct.productTitle.trim() || !customProduct.image || !customProduct.description.trim()) {
      alert('Please fill in Title, Image, and Description');
      return;
    }

    const filteredDetails = customProduct.details.filter(d => d.trim());
    const updatedProducts = [...(form.associatedProducts || [])];
    const originalProduct = updatedProducts[editingProductIndex];
    
    updatedProducts[editingProductIndex] = {
      ...originalProduct,
      productTitle: customProduct.productTitle,
      image: customProduct.image,
      description: customProduct.description,
      details: filteredDetails.length > 0 ? filteredDetails : undefined
    };

    setForm({
      ...form,
      associatedProducts: updatedProducts
    });

    setCustomProduct({
      productTitle: '',
      image: '',
      description: '',
      details: ['']
    });
    setCustomProductImagePreview('');
    setEditingProductIndex(null);
    setShowCustomProductForm(false);
  };

  const handleRemoveProduct = (index: number) => {
    setForm({
      ...form,
      associatedProducts: (form.associatedProducts || []).filter((_, i) => i !== index)
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      const method = isNew ? "POST" : "PUT";
      const dataToSend = isNew ? form : { id: form.id, ...form };
      
      const body = {
        ...dataToSend,
        associatedProducts: Array.isArray(dataToSend.associatedProducts) 
          ? JSON.stringify(dataToSend.associatedProducts)
          : dataToSend.associatedProducts
      };
      
      const response = await fetch("/api/admin/kit-products", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });

      if (response.ok) {
        router.push("/admin/kit-products");
      } else {
        setError("Failed to save product");
      }
    } catch (error) {
      setError("An error occurred");
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: "800px" }}>
      {error && (
        <div style={{ padding: "12px", background: "#fee2e2", color: "#991b1b", borderRadius: "8px", marginBottom: "20px" }}>
          {error}
        </div>
      )}

      <div style={{ marginBottom: "16px" }}>
        <label style={{ display: "block", fontSize: "13px", fontWeight: 500, color: "#555", marginBottom: "6px" }}>
          Title *
        </label>
        <input
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
          style={inputStyle}
        />
      </div>

      <div style={{ marginBottom: "16px" }}>
        <label style={{ display: "block", fontSize: "13px", fontWeight: 500, color: "#555", marginBottom: "6px" }}>
          Hero Title (for detail page header)
        </label>
        <input
          value={form.heroTitle || ""}
          onChange={(e) => setForm({ ...form, heroTitle: e.target.value })}
          placeholder="e.g., Advanced Filtration Solutions"
          style={inputStyle}
        />
        <p style={{ fontSize: "12px", color: "#888", margin: "6px 0 0 0" }}>
          This title appears in the hero section when customers view this product. Leave blank to use the product title.
        </p>
      </div>

      <div style={{ marginBottom: "16px" }}>
        <label style={{ display: "block", fontSize: "13px", fontWeight: 500, color: "#555", marginBottom: "6px" }}>
          Description
        </label>
        <textarea
          value={form.description || ""}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          rows={3}
          style={{ ...inputStyle, resize: "vertical" }}
        />
      </div>

      <div style={{ marginBottom: "16px" }}>
        <label style={{ display: "block", fontSize: "13px", fontWeight: 500, color: "#555", marginBottom: "6px" }}>
          Image
        </label>
        <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
          <div style={{ flex: 1, position: "relative" }}>
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              style={{ display: "none" }}
              disabled={uploading}
            />
            <button
              type="button"
              onClick={() => document.getElementById("image-upload")?.click()}
              disabled={uploading}
              style={{
                width: "100%",
                padding: "12px",
                border: "2px dashed #ddd",
                borderRadius: "8px",
                textAlign: "center",
                cursor: uploading ? "not-allowed" : "pointer",
                background: "#fafafa",
                fontSize: "13px",
                color: "#666",
                transition: "all 0.2s",
                opacity: uploading ? 0.7 : 1,
              }}
            >
              {uploading ? "Uploading..." : "Click to upload image"}
            </button>
          </div>
          {imagePreview && (
            <div style={{ width: "100px", height: "100px", borderRadius: "8px", overflow: "hidden", border: "1px solid #ddd", flexShrink: 0 }}>
              <img src={imagePreview} alt="Preview" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
          )}
        </div>
      </div>

      <div style={{ marginBottom: "16px" }}>
        <label style={{ display: "block", fontSize: "13px", fontWeight: 500, color: "#555", marginBottom: "6px" }}>
          Link (href)
        </label>
        <input
          value={form.href || ""}
          onChange={(e) => setForm({ ...form, href: e.target.value })}
          style={inputStyle}
          placeholder="/products?category=kits"
        />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
        <div>
          <label style={{ display: "block", fontSize: "13px", fontWeight: 500, color: "#555", marginBottom: "6px" }}>
            Sort Order
          </label>
          <input
            type="number"
            value={form.sortOrder}
            onChange={(e) => setForm({ ...form, sortOrder: parseInt(e.target.value) || 0 })}
            style={inputStyle}
          />
        </div>
        <div>
          <label style={{ display: "block", fontSize: "13px", fontWeight: 500, color: "#555", marginBottom: "6px" }}>
            Status
          </label>
          <select
            value={form.isActive ? "true" : "false"}
            onChange={(e) => setForm({ ...form, isActive: e.target.value === "true" })}
            style={inputStyle}
          >
            <option value="true">Active</option>
            <option value="false">Inactive</option>
          </select>
        </div>
      </div>

      <div style={{ marginBottom: "16px" }}>
        <label style={{ display: "block", fontSize: "13px", fontWeight: 500, color: "#555", marginBottom: "6px" }}>
          Associated Products
        </label>
        <p style={{ fontSize: "12px", color: "#888", margin: "0 0 12px 0" }}>
          Add products from the catalog that will be shown in the product details page
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr auto", gap: "12px", marginBottom: "16px" }}>
          <div>
            <select
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                setSelectedProduct('');
              }}
              style={{ ...inputStyle, height: "40px" }}
            >
              <option value="">Select Category</option>
              {PRODUCT_CATEGORIES.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.title}</option>
              ))}
            </select>
          </div>

          <div>
            <select
              value={selectedProduct}
              onChange={(e) => setSelectedProduct(e.target.value)}
              disabled={!selectedCategory}
              style={{ ...inputStyle, height: "40px" }}
            >
              <option value="">Select Product</option>
              {selectedCategory && PRODUCT_CATEGORIES.find(c => c.id === selectedCategory)?.products.map(prod => (
                <option key={prod.title} value={prod.title}>{prod.title}</option>
              ))}
            </select>
          </div>

          <button
            type="button"
            onClick={handleAddProduct}
            disabled={!selectedCategory || !selectedProduct}
            style={{
              padding: "10px 16px",
              background: !selectedCategory || !selectedProduct ? "#ccc" : "#2D2B7F",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              fontSize: "13px",
              fontWeight: 600,
              cursor: !selectedCategory || !selectedProduct ? "not-allowed" : "pointer"
            }}
          >
            Add Product
          </button>
        </div>

        <button
          type="button"
          onClick={() => setShowCustomProductForm(!showCustomProductForm)}
          style={{
            padding: "8px 16px",
            background: "#667eea",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            fontSize: "13px",
            fontWeight: 600,
            cursor: "pointer",
            marginTop: "12px"
          }}
        >
          {showCustomProductForm ? '✕ Cancel' : '+ Add New Product'}
        </button>

        {showCustomProductForm && (
          <div style={{ marginTop: "16px", padding: "16px", background: "#f9f9f9", borderRadius: "8px", border: "1px solid #eee" }}>
            <h4 style={{ margin: "0 0 12px 0", fontSize: "14px", fontWeight: 600, color: "#333" }}>Create New Product</h4>

            <div style={{ marginBottom: "12px" }}>
              <label style={{ display: "block", fontSize: "12px", fontWeight: 500, color: "#555", marginBottom: "4px" }}>
                Product Title *
              </label>
              <input
                type="text"
                value={customProduct.productTitle}
                onChange={(e) => setCustomProduct({ ...customProduct, productTitle: e.target.value })}
                placeholder="e.g., Premium Filter Tips"
                style={{ ...inputStyle, fontSize: "13px" }}
              />
            </div>

            <div style={{ marginBottom: "12px" }}>
              <label style={{ display: "block", fontSize: "12px", fontWeight: 500, color: "#555", marginBottom: "4px" }}>
                Image *
              </label>
              <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                <div style={{ flex: 1 }}>
                  <input
                    id="custom-product-image"
                    type="file"
                    accept="image/*"
                    onChange={handleCustomProductImageUpload}
                    style={{ display: "none" }}
                    disabled={uploading}
                  />
                  <button
                    type="button"
                    onClick={() => document.getElementById("custom-product-image")?.click()}
                    disabled={uploading}
                    style={{
                      width: "100%",
                      padding: "10px",
                      border: "2px dashed #ddd",
                      borderRadius: "6px",
                      textAlign: "center",
                      cursor: uploading ? "not-allowed" : "pointer",
                      background: "#fff",
                      fontSize: "12px",
                      color: "#666",
                      opacity: uploading ? 0.7 : 1
                    }}
                  >
                    {uploading ? "Uploading..." : "Click to upload image"}
                  </button>
                </div>
                {customProductImagePreview && (
                  <div style={{ width: "60px", height: "60px", borderRadius: "6px", overflow: "hidden", border: "1px solid #ddd", flexShrink: 0 }}>
                    <img src={customProductImagePreview} alt="Preview" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>
                )}
              </div>
            </div>

            <div style={{ marginBottom: "12px" }}>
              <label style={{ display: "block", fontSize: "12px", fontWeight: 500, color: "#555", marginBottom: "4px" }}>
                Description *
              </label>
              <textarea
                value={customProduct.description}
                onChange={(e) => setCustomProduct({ ...customProduct, description: e.target.value })}
                placeholder="Product description..."
                rows={2}
                style={{ ...inputStyle, fontSize: "13px", resize: "vertical" }}
              />
            </div>

            <div style={{ marginBottom: "12px" }}>
              <label style={{ display: "block", fontSize: "12px", fontWeight: 500, color: "#555", marginBottom: "4px" }}>
                Details (one per line)
              </label>
              {customProduct.details.map((detail, idx) => (
                <div key={idx} style={{ display: "flex", gap: "8px", marginBottom: "6px" }}>
                  <input
                    type="text"
                    value={detail}
                    onChange={(e) => {
                      const newDetails = [...customProduct.details];
                      newDetails[idx] = e.target.value;
                      setCustomProduct({ ...customProduct, details: newDetails });
                    }}
                    placeholder="e.g., 1000pcs/bag"
                    style={{ ...inputStyle, fontSize: "12px", flex: 1 }}
                  />
                  {customProduct.details.length > 1 && (
                    <button
                      type="button"
                      onClick={() => {
                        const newDetails = customProduct.details.filter((_, i) => i !== idx);
                        setCustomProduct({ ...customProduct, details: newDetails });
                      }}
                      style={{
                        padding: "6px 8px",
                        background: "#fee2e2",
                        color: "#991b1b",
                        border: "none",
                        borderRadius: "4px",
                        fontSize: "11px",
                        cursor: "pointer",
                        whiteSpace: "nowrap"
                      }}
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={() => setCustomProduct({ ...customProduct, details: [...customProduct.details, ''] })}
                style={{
                  padding: "4px 12px",
                  background: "#e0e7ff",
                  color: "#667eea",
                  border: "none",
                  borderRadius: "4px",
                  fontSize: "11px",
                  fontWeight: 600,
                  cursor: "pointer",
                  marginTop: "6px"
                }}
              >
                + Add Detail
              </button>
            </div>

            <div style={{ display: "flex", gap: "8px" }}>
              <button
                type="button"
                onClick={() => setShowCustomProductForm(false)}
                style={{
                  flex: 1,
                  padding: "8px 12px",
                  background: "#fff",
                  color: "#333",
                  border: "1px solid #ddd",
                  borderRadius: "6px",
                  fontSize: "12px",
                  fontWeight: 600,
                  cursor: "pointer"
                }}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={editingProductIndex !== null ? handleUpdateProduct : handleAddCustomProduct}
                style={{
                  flex: 1,
                  padding: "8px 12px",
                  background: "#667eea",
                  color: "#fff",
                  border: "none",
                  borderRadius: "6px",
                  fontSize: "12px",
                  fontWeight: 600,
                  cursor: "pointer"
                }}
              >
                {editingProductIndex !== null ? "Update Product" : "Add Product"}
              </button>
            </div>
          </div>
        )}

        {(form.associatedProducts || []).length > 0 && (
          <div style={{ marginTop: "16px" }}>
            <div style={{ fontSize: "12px", fontWeight: 600, color: "#555", marginBottom: "8px" }}>
              Selected Products ({form.associatedProducts!.length})
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {form.associatedProducts!.map((product, idx) => {
                const category = PRODUCT_CATEGORIES.find(c => c.id === product.categoryId);
                return (
                  <div
                    key={idx}
                    style={{
                      display: "flex",
                      gap: "12px",
                      padding: "12px",
                      background: "#f9f9f9",
                      border: "1px solid #eee",
                      borderRadius: "6px"
                    }}
                  >
                    {product.image && (
                      <div style={{ width: "50px", height: "50px", borderRadius: "4px", overflow: "hidden", border: "1px solid #ddd", flexShrink: 0 }}>
                        <img src={product.image} alt={product.productTitle} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      </div>
                    )}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: "13px", fontWeight: 500, color: "#333", marginBottom: "4px" }}>{product.productTitle}</div>
                      <div style={{ fontSize: "11px", color: "#666", marginBottom: "4px" }}>{product.description}</div>
                      {product.details && product.details.length > 0 && (
                        <div style={{ fontSize: "10px", color: "#999" }}>
                          {product.details.slice(0, 2).join(" • ")}
                          {product.details.length > 2 && ` +${product.details.length - 2} more`}
                        </div>
                      )}
                      {product.isCustom && <span style={{ fontSize: "10px", color: "#667eea", fontWeight: 600 }}>Custom</span>}
                      {category && !product.isCustom && <div style={{ fontSize: "11px", color: "#999" }}>{category.title}</div>}
                    </div>
                    <div style={{ display: "flex", gap: "4px", flexShrink: 0 }}>
                      <button
                        type="button"
                        onClick={() => handleEditProduct(idx)}
                        style={{
                          padding: "4px 8px",
                          background: "#dbeafe",
                          color: "#1e40af",
                          border: "none",
                          borderRadius: "4px",
                          fontSize: "12px",
                          cursor: "pointer",
                          fontWeight: 500,
                          whiteSpace: "nowrap"
                        }}
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => handleRemoveProduct(idx)}
                        style={{
                          padding: "4px 8px",
                          background: "#fee2e2",
                          color: "#991b1b",
                          border: "none",
                          borderRadius: "4px",
                          fontSize: "12px",
                          cursor: "pointer",
                          fontWeight: 500,
                          whiteSpace: "nowrap"
                        }}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      <div style={{ display: "flex", gap: "12px", justifyContent: "flex-start", paddingTop: "8px" }}>
        <button
          type="button"
          onClick={() => router.back()}
          style={{
            padding: "10px 20px",
            border: "1px solid #ddd",
            borderRadius: "8px",
            fontSize: "13px",
            background: "#fff",
            cursor: "pointer"
          }}
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={saving}
          style={{
            padding: "10px 24px",
            background: "#2D2B7F",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            fontSize: "13px",
            fontWeight: 600,
            cursor: "pointer",
            opacity: saving ? 0.7 : 1
          }}
        >
          {saving ? "Saving..." : isNew ? "Create" : "Update"}
        </button>
      </div>

    </form>
  );
}
