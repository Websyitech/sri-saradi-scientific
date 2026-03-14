'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface PageSummary {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  updatedAt: string;
}

export default function PagesList() {
  const [pages, setPages] = useState<PageSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPages = async () => {
      try {
        const response = await fetch('/api/pages');
        if (response.ok) {
          const pagesData = await response.json();
          setPages(pagesData);
        } else {
          setError('Failed to load pages');
        }
      } catch (err) {
        setError('Failed to load pages');
        console.error('Error fetching pages:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPages();
  }, []);

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '40px' }}>
        <div style={{ 
          width: '32px', 
          height: '32px', 
          border: '3px solid #e0e0e0', 
          borderTopColor: '#2D2B7F', 
          borderRadius: '50%', 
          animation: 'spin 0.8s linear infinite', 
          margin: '0 auto 12px' 
        }} />
        <p style={{ color: '#888', fontSize: '14px' }}>Loading pages...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
        <p>{error}</p>
      </div>
    );
  }

  if (pages.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
        <p>No pages available yet.</p>
      </div>
    );
  }

  return (
    <div style={{ 
      maxWidth: '1200px', 
      margin: '0 auto', 
      padding: '40px 20px' 
    }}>
      <h2 style={{ 
        fontSize: '28px', 
        fontWeight: 700, 
        color: '#1a1a2e', 
        textAlign: 'center',
        marginBottom: '32px' 
      }}>
        Our Pages
      </h2>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', 
        gap: '24px' 
      }}>
        {pages.map((page) => (
          <Link 
            href={`/${page.slug}`} 
            key={page.id}
            style={{ textDecoration: 'none' }}
          >
            <div style={{
              background: '#fff',
              borderRadius: '12px',
              border: '1px solid #f0f0f0',
              padding: '24px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
              transition: 'all 0.2s ease',
              cursor: 'pointer',
              height: '100%',
              display: 'flex',
              flexDirection: 'column'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.08)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.04)';
            }}
            >
              <h3 style={{ 
                fontSize: '18px', 
                fontWeight: 600, 
                color: '#1a1a2e',
                margin: '0 0 12px 0',
                lineHeight: '1.3'
              }}>
                {page.title}
              </h3>
              
              {page.subtitle && (
                <p style={{ 
                  fontSize: '14px', 
                  color: '#666',
                  margin: '0 0 16px 0',
                  lineHeight: '1.5',
                  flex: 1
                }}>
                  {page.subtitle}
                </p>
              )}
              
              <div style={{
                fontSize: '12px',
                color: '#aaa',
                marginTop: 'auto'
              }}>
                Updated {new Date(page.updatedAt).toLocaleDateString()}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}