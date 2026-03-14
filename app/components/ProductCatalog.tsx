'use client';

import { useState } from 'react';
import { cleanText } from "../products/page";

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
  products: Array<{
    title: string;
    icon: string;
    description: string;
    details: string[];
  }>;
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

interface ProductCatalogProps {
  initialTab?: string;
  showSeries?: string[];
}

export default function ProductCatalog({ initialTab = 'liquid-handling', showSeries }: ProductCatalogProps) {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const categoriesToShow = showSeries && showSeries.length > 0 
    ? PRODUCT_CATEGORIES.filter(cat => showSeries.includes(cat.id))
    : PRODUCT_CATEGORIES.filter(cat => !['molecular', 'immunoassay', 'sealing'].includes(cat.id));
  
  const activeCategory = categoriesToShow.find(cat => cat.id === activeTab);

  const handleRequestQuote = (product: Product) => {
    setSelectedProduct(product);
    setFormData({ name: '', email: '', company: '', phone: '', message: '' });
    setSuccess(false);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      console.log('Quote request for:', selectedProduct?.title);
      console.log('Form data:', formData);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        handleCloseModal();
      }, 2000);
    } catch (error) {
      console.error('Error submitting quote request:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section style={{ padding: '60px 40px', background: '#f8f9fc' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '36px', fontWeight: 800, color: '#1a1a2e', textAlign: 'center', marginBottom: '12px' }}>
          Complete Product Catalog
        </h2>
        <p style={{ textAlign: 'center', fontSize: '1.1rem', color: '#666', marginBottom: '48px', maxWidth: '800px', margin: '0 auto' }}>
          Browse our comprehensive range of laboratory consumables. Click "Request Quote" on any product to get started.
        </p>

        {/* Tab Navigation */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '32px', flexWrap: 'nowrap', justifyContent: 'center', overflowX: 'auto', paddingBottom: '8px', position: 'sticky', top: '50px', background: '#f8f9fc', zIndex: 100, paddingTop: '8px' }}>
          {categoriesToShow.map(category => (
            <button
              key={category.id}
              onClick={() => setActiveTab(category.id)}
              style={{
                padding: '8px 16px',
                borderRadius: '6px',
                fontSize: '13px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.3s',
                background: activeTab === category.id ? category.color : '#fff',
                color: activeTab === category.id ? '#fff' : '#333',
                boxShadow: activeTab === category.id ? `0 4px 12px rgba(102, 126, 234, 0.4)` : '0 1px 3px rgba(0,0,0,0.1)',
                border: activeTab === category.id ? 'none' : '1px solid #e0e0e0',
                whiteSpace: 'nowrap',
                flexShrink: 0
              }}
            >
              {category.title}
            </button>
          ))}
        </div>

        {/* Category Header */}
        {activeCategory && (
          <div style={{
            background: `linear-gradient(135deg, ${activeCategory.color} 0%, ${activeCategory.color}dd 100%)`,
            color: 'white',
            padding: '24px',
            borderRadius: '12px',
            marginBottom: '32px'
          }}>
            <h2 style={{ color: 'white', margin: '0 0 8px 0', fontSize: '24px', fontWeight: 700 }}>
              {activeCategory.title}
            </h2>
            <p style={{ opacity: 0.95, margin: 0, fontSize: '14px' }}>
              {activeCategory.description}
            </p>
          </div>
        )}

        {/* Products Grid */}
        {activeCategory && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '24px'
          }}>
            {activeCategory.products.map((product, idx) => (
              <div
                key={idx}
                style={{
                  background: '#fff',
                  borderRadius: '12px',
                  border: '1px solid #e0e0e0',
                  padding: '24px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                  transition: 'all 0.3s',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.12)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.06)';
                }}
              >
                <div style={{ width: '100%', height: '180px', background: '#fafafa', border: '1px solid #e0e0e0', borderRadius: '8px', marginBottom: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#999', flexDirection: 'column', gap: '8px' }}>
                  <div style={{ fontSize: '40px' }}>🖼️</div>
                  <div style={{ fontSize: '12px', color: '#aaa' }}>No image</div>
                </div>
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: 700,
                  color: '#1a1a2e',
                  margin: '0 0 8px 0'
                }}>
                  {cleanText(product.title)}
                </h3>
                <p style={{
                  fontSize: '14px',
                  color: '#666',
                  margin: '0 0 16px 0',
                  fontWeight: 500
                }}>
                  {product.description}
                </p>
                <ul style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: '0 0 16px 0'
                }}>
                  {product.details.map((detail, detailIdx) => (
                    <li
                      key={detailIdx}
                      style={{
                        fontSize: '13px',
                        color: '#555',
                        margin: '6px 0',
                        paddingLeft: '16px',
                        position: 'relative'
                      }}
                    >
                      <span style={{
                        position: 'absolute',
                        left: 0,
                        color: activeCategory.color
                      }}>
                        •
                      </span>
                      {detail}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => handleRequestQuote(product)}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    background: activeCategory.color,
                    color: '#fff',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    marginTop: 'auto'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.opacity = '0.9';
                    e.currentTarget.style.transform = 'scale(1.02)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.opacity = '1';
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                >
                  Request Quote
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Request Quote Modal */}
        {selectedProduct && (
          <>
            {/* Overlay */}
            <div
              onClick={handleCloseModal}
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'rgba(0, 0, 0, 0.5)',
                zIndex: 999,
                backdropFilter: 'blur(4px)'
              }}
            />

            {/* Modal */}
            <div
              style={{
                position: 'fixed',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                background: '#fff',
                borderRadius: '12px',
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
                zIndex: 1000,
                maxWidth: '500px',
                width: '90%',
                maxHeight: '90vh',
                overflow: 'auto',
                padding: '32px'
              }}
            >
              {/* Close Button */}
              <button
                onClick={handleCloseModal}
                style={{
                  position: 'absolute',
                  top: '16px',
                  right: '16px',
                  background: 'none',
                  border: 'none',
                  fontSize: '24px',
                  cursor: 'pointer',
                  color: '#666',
                  width: '32px',
                  height: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                ✕
              </button>

              {success ? (
                <div style={{ textAlign: 'center', padding: '40px 0' }}>
                  <div style={{ fontSize: '48px', marginBottom: '16px' }}>✓</div>
                  <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#1a1a2e', marginBottom: '8px' }}>
                    Quote Request Received!
                  </h3>
                  <p style={{ fontSize: '14px', color: '#666' }}>
                    We'll contact you soon with a quote for {cleanText(selectedProduct.title)}
                  </p>
                </div>
              ) : (
                <>
                  <h2 style={{ fontSize: '24px', fontWeight: 700, color: '#1a1a2e', margin: '0 0 8px 0' }}>
                    Request a Quote
                  </h2>
                  <p style={{ fontSize: '14px', color: '#666', margin: '0 0 8px 0' }}>
                    Product: <strong>{cleanText(selectedProduct.title)}</strong>
                  </p>
                  <p style={{ fontSize: '13px', color: '#999', margin: '0 0 24px 0' }}>
                    Fill in your details and we'll send you a quote
                  </p>

                  <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: '#555', marginBottom: '6px' }}>
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleFormChange}
                        required
                        placeholder="John Doe"
                        style={{
                          width: '100%',
                          padding: '10px 12px',
                          border: '1px solid #ddd',
                          borderRadius: '8px',
                          fontSize: '14px',
                          outline: 'none',
                          boxSizing: 'border-box',
                          transition: 'border-color 0.2s'
                        }}
                        onFocus={(e) => e.target.style.borderColor = '#2D2B7F'}
                        onBlur={(e) => e.target.style.borderColor = '#ddd'}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: '#555', marginBottom: '6px' }}>
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleFormChange}
                        required
                        placeholder="john@example.com"
                        style={{
                          width: '100%',
                          padding: '10px 12px',
                          border: '1px solid #ddd',
                          borderRadius: '8px',
                          fontSize: '14px',
                          outline: 'none',
                          boxSizing: 'border-box',
                          transition: 'border-color 0.2s'
                        }}
                        onFocus={(e) => e.target.style.borderColor = '#2D2B7F'}
                        onBlur={(e) => e.target.style.borderColor = '#ddd'}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: '#555', marginBottom: '6px' }}>
                        Company *
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleFormChange}
                        required
                        placeholder="Your Company"
                        style={{
                          width: '100%',
                          padding: '10px 12px',
                          border: '1px solid #ddd',
                          borderRadius: '8px',
                          fontSize: '14px',
                          outline: 'none',
                          boxSizing: 'border-box',
                          transition: 'border-color 0.2s'
                        }}
                        onFocus={(e) => e.target.style.borderColor = '#2D2B7F'}
                        onBlur={(e) => e.target.style.borderColor = '#ddd'}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: '#555', marginBottom: '6px' }}>
                        Phone
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleFormChange}
                        placeholder="+91 XXXXX XXXXX"
                        style={{
                          width: '100%',
                          padding: '10px 12px',
                          border: '1px solid #ddd',
                          borderRadius: '8px',
                          fontSize: '14px',
                          outline: 'none',
                          boxSizing: 'border-box',
                          transition: 'border-color 0.2s'
                        }}
                        onFocus={(e) => e.target.style.borderColor = '#2D2B7F'}
                        onBlur={(e) => e.target.style.borderColor = '#ddd'}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: '#555', marginBottom: '6px' }}>
                        Message
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleFormChange}
                        placeholder="Tell us about your requirements..."
                        rows={3}
                        style={{
                          width: '100%',
                          padding: '10px 12px',
                          border: '1px solid #ddd',
                          borderRadius: '8px',
                          fontSize: '14px',
                          outline: 'none',
                          boxSizing: 'border-box',
                          resize: 'vertical',
                          fontFamily: 'inherit',
                          transition: 'border-color 0.2s'
                        }}
                        onFocus={(e) => e.target.style.borderColor = '#2D2B7F'}
                        onBlur={(e) => e.target.style.borderColor = '#ddd'}
                      />
                    </div>

                    <div style={{ display: 'flex', gap: '12px', paddingTop: '8px' }}>
                      <button
                        type="button"
                        onClick={handleCloseModal}
                        style={{
                          flex: 1,
                          padding: '10px 20px',
                          border: '1px solid #ddd',
                          borderRadius: '8px',
                          fontSize: '13px',
                          background: '#fff',
                          cursor: 'pointer',
                          fontWeight: 600,
                          transition: 'all 0.2s'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.background = '#f5f5f5'}
                        onMouseLeave={(e) => e.currentTarget.style.background = '#fff'}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={loading}
                        style={{
                          flex: 1,
                          padding: '10px 24px',
                          background: loading ? '#ccc' : '#2D2B7F',
                          color: '#fff',
                          border: 'none',
                          borderRadius: '8px',
                          fontSize: '13px',
                          fontWeight: 600,
                          cursor: loading ? 'not-allowed' : 'pointer',
                          transition: 'all 0.2s'
                        }}
                        onMouseEnter={(e) => {
                          if (!loading) e.currentTarget.style.background = '#1e1c5e';
                        }}
                        onMouseLeave={(e) => {
                          if (!loading) e.currentTarget.style.background = '#2D2B7F';
                        }}
                      >
                        {loading ? 'Sending...' : 'Request Quote'}
                      </button>
                    </div>
                  </form>
                </>
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
