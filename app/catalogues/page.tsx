"use client";

import { useState, useEffect } from "react";
import { FaDownload, FaEye } from "react-icons/fa";

interface Catalogue {
  id: string;
  title: string;
  description?: string;
  coverImage?: string;
  pdfUrl?: string;
  sortOrder: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function CataloguesPage() {
  const [catalogues, setCatalogues] = useState<Catalogue[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCatalogues();
  }, []);

  async function fetchCatalogues() {
    try {
      const res = await fetch("/api/catalogues");
      const data = await res.json();
      setCatalogues(Array.isArray(data) ? data.filter((c: Catalogue) => c.isActive) : []);
    } catch (error) {
      console.error("Error fetching catalogues:", error);
      setCatalogues([]);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">Loading catalogues...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <style>{`
        @media (min-width: 1200px) {
          .catalogue-grid {
            grid-template-columns: repeat(4, 1fr) !important;
          }
        }
        @media (min-width: 768px) and (max-width: 1199px) {
          .catalogue-grid {
            grid-template-columns: repeat(3, 1fr) !important;
          }
        }
        @media (min-width: 576px) and (max-width: 767px) {
          .catalogue-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 575px) {
          .catalogue-grid {
            grid-template-columns: repeat(1, 1fr) !important;
          }
        }
      `}</style>
      <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section style={{ 
        background: 'linear-gradient(135deg, #2D2B7F 0%, #1a1a2e 100%)', 
        color: 'white',
        padding: '80px 0'
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 40px' }}>
          <div style={{ textAlign: 'center' }}>
            <h1 style={{ 
              fontSize: '48px', 
              fontWeight: 700, 
              marginBottom: '24px',
              lineHeight: '1.1'
            }}>
              Product Catalogues
            </h1>
            <p style={{ 
              fontSize: '20px', 
              opacity: 0.9, 
              maxWidth: '800px', 
              margin: '0 auto',
              lineHeight: '1.6'
            }}>
              Browse and download our comprehensive product catalogues featuring the latest life sciences solutions
            </p>
            <div style={{ 
              marginTop: '40px', 
              display: 'flex', 
              gap: '24px', 
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}>
              <div style={{ 
                background: 'rgba(255,255,255,0.1)', 
                padding: '20px', 
                borderRadius: '12px',
                backdropFilter: 'blur(10px)'
              }}>
                <h3 style={{ fontSize: '24px', fontWeight: 600, margin: '0 0 8px 0' }}>
                  {catalogues.length}
                </h3>
                <p style={{ fontSize: '14px', opacity: 0.8, margin: 0 }}>
                  Catalogues Available
                </p>
              </div>
              <div style={{ 
                background: 'rgba(255,255,255,0.1)', 
                padding: '20px', 
                borderRadius: '12px',
                backdropFilter: 'blur(10px)'
              }}>
                <h3 style={{ fontSize: '24px', fontWeight: 600, margin: '0 0 8px 0' }}>
                  PDF
                </h3>
                <p style={{ fontSize: '14px', opacity: 0.8, margin: 0 }}>
                  Download Format
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Catalogues Grid */}
      <section style={{ padding: '80px 0', background: '#f9fafb' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 40px' }}>
          {catalogues.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '80px 0' }}>
              <div style={{ fontSize: '64px', marginBottom: '24px', opacity: 0.3 }}>📚</div>
              <h3 style={{ fontSize: '28px', fontWeight: 600, color: '#374151', marginBottom: '16px' }}>
                No Catalogues Available
              </h3>
              <p style={{ fontSize: '16px', color: '#6b7280' }}>
                Please check back later for our product catalogues.
              </p>
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '24px',
              marginTop: '40px'
            }}
            className="catalogue-grid"
            >
              {catalogues.map((catalogue) => (
                <div
                  key={catalogue.id}
                  style={{
                    background: '#fff',
                    borderRadius: '16px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                    overflow: 'hidden',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
                  }}
                >
                  {/* Cover Image */}
                  <div style={{ position: 'relative', height: '350px', background: '#f3f4f6' }}>
                    {catalogue.coverImage ? (
                      <img
                        src={catalogue.coverImage}
                        alt={catalogue.title}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover'
                        }}
                      />
                    ) : (
                      <div style={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#9ca3af'
                      }}>
                        <div style={{ textAlign: 'center' }}>
                          <div style={{ fontSize: '64px', marginBottom: '8px' }}>📚</div>
                          <p style={{ fontSize: '14px', margin: 0 }}>Catalogue Cover</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div style={{ padding: '24px' }}>
                    {catalogue.description && (
                      <p style={{
                        color: '#6b7280',
                        marginBottom: '20px',
                        fontSize: '14px',
                        lineHeight: '1.5'
                      }}>
                        {catalogue.description}
                      </p>
                    )}

                    {/* Title and Download Button */}
                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'space-between',
                      gap: '16px'
                    }}>
                      <h3 style={{
                        fontSize: '18px',
                        fontWeight: 700,
                        color: '#111827',
                        margin: 0,
                        lineHeight: '1.3',
                        flex: 1
                      }}>
                        {catalogue.title}
                      </h3>
                      
                      {catalogue.pdfUrl && (
                        <a
                          href={catalogue.pdfUrl}
                          download
                          title="Download PDF"
                          style={{
                            width: '40px',
                            height: '40px',
                            background: '#2D2B7F',
                            color: 'white',
                            borderRadius: '50%',
                            textDecoration: 'none',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '16px',
                            transition: 'all 0.2s',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                            flexShrink: 0
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = '#1a1a2e';
                            e.currentTarget.style.transform = 'translateY(-2px)';
                            e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.15)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = '#2D2B7F';
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
                          }}
                        >
                          <FaDownload />
                        </a>
                      )}
                      {!catalogue.pdfUrl && (
                        <div style={{
                          background: '#9ca3af',
                          color: 'white',
                          padding: '8px 12px',
                          borderRadius: '20px',
                          fontSize: '12px',
                          fontWeight: 500,
                          flexShrink: 0
                        }}>
                          Coming Soon
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ background: '#f3f4f6', padding: '80px 0' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 40px', textAlign: 'center' }}>
          <h2 style={{ 
            fontSize: '36px', 
            fontWeight: 700, 
            color: '#111827', 
            marginBottom: '16px' 
          }}>
            Need a Custom Solution?
          </h2>
          <p style={{ 
            fontSize: '18px', 
            color: '#6b7280', 
            marginBottom: '40px', 
            maxWidth: '600px', 
            margin: '0 auto 40px auto',
            lineHeight: '1.6' 
          }}>
            Can't find what you're looking for? Contact our experts for personalized product recommendations and custom solutions.
          </p>
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '16px', 
            justifyContent: 'center',
            alignItems: 'center',
            maxWidth: '400px',
            margin: '0 auto'
          }}>
            <a
              href="/contact"
              style={{
                background: '#2D2B7F',
                color: 'white',
                padding: '16px 32px',
                borderRadius: '8px',
                textDecoration: 'none',
                fontWeight: 600,
                fontSize: '16px',
                transition: 'background 0.2s',
                width: '100%',
                textAlign: 'center'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#1a1a2e';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#2D2B7F';
              }}
            >
              Contact Us
            </a>
            <a
              href="/products"
              style={{
                background: 'white',
                color: '#2D2B7F',
                border: '2px solid #2D2B7F',
                padding: '14px 32px',
                borderRadius: '8px',
                textDecoration: 'none',
                fontWeight: 600,
                fontSize: '16px',
                transition: 'all 0.2s',
                width: '100%',
                textAlign: 'center'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#f8fafc';
                e.currentTarget.style.borderColor = '#1a1a2e';
                e.currentTarget.style.color = '#1a1a2e';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'white';
                e.currentTarget.style.borderColor = '#2D2B7F';
                e.currentTarget.style.color = '#2D2B7F';
              }}
            >
              Browse Products
            </a>
          </div>
        </div>
      </section>
      </div>
    </>
  );
}