'use client';

import { useEffect, useState } from 'react';

interface PageData {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  content?: any;
  createdAt: string;
  updatedAt: string;
}

interface PageContentProps {
  slug: string;
}

export default function PageContent({ slug }: PageContentProps) {
  const [page, setPage] = useState<PageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPage = async () => {
      try {
        const response = await fetch(`/api/pages?slug=${slug}`);
        if (response.ok) {
          const pageData = await response.json();
          setPage(pageData);
        } else if (response.status === 404) {
          setError('Page not found');
        } else {
          setError('Failed to load page');
        }
      } catch (err) {
        setError('Failed to load page');
        console.error('Error fetching page:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPage();
  }, [slug]);

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        minHeight: '400px' 
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ 
            width: '40px', 
            height: '40px', 
            border: '4px solid #e0e0e0', 
            borderTopColor: '#2D2B7F', 
            borderRadius: '50%', 
            animation: 'spin 0.8s linear infinite', 
            margin: '0 auto 16px' 
          }} />
          <p style={{ color: '#888', fontSize: '14px' }}>Loading page...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ 
        textAlign: 'center', 
        padding: '60px 20px',
        color: '#666'
      }}>
        <h2 style={{ fontSize: '24px', marginBottom: '16px', color: '#1a1a2e' }}>
          {error === 'Page not found' ? '404 - Page Not Found' : 'Error Loading Page'}
        </h2>
        <p style={{ fontSize: '16px' }}>{error}</p>
      </div>
    );
  }

  if (!page) {
    return null;
  }

  // Extract HTML content from the page data
  let htmlContent = '';
  if (page.content && typeof page.content === 'object') {
    if (page.content.html) {
      htmlContent = page.content.html;
    } else if (page.content.text) {
      htmlContent = page.content.text;
    }
  } else if (typeof page.content === 'string') {
    htmlContent = page.content;
  }

  return (
    <div style={{ 
      maxWidth: '1200px', 
      margin: '0 auto', 
      padding: '40px 20px',
      background: '#fff'
    }}>
      <header style={{ 
        textAlign: 'center', 
        marginBottom: '40px',
        borderBottom: '1px solid #f0f0f0',
        paddingBottom: '32px'
      }}>
        <h1 style={{ 
          fontSize: '36px', 
          fontWeight: 800, 
          color: '#1a1a2e', 
          margin: '0 0 12px 0',
          lineHeight: '1.2'
        }}>
          {page.title}
        </h1>
        {page.subtitle && (
          <p style={{ 
            fontSize: '18px', 
            color: '#666', 
            margin: 0,
            lineHeight: '1.4'
          }}>
            {page.subtitle}
          </p>
        )}
      </header>

      <div 
        style={{ 
          fontSize: '16px', 
          lineHeight: '1.7', 
          color: '#333',
          maxWidth: '900px',
          margin: '0 auto'
        }}
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />

      <style jsx>{`
        :global(.MsoNormal) {
          margin: 0 0 16px 0 !important;
          line-height: 1.6 !important;
        }
        :global(.MsoListParagraph) {
          margin: 0 0 12px 36px !important;
          line-height: 1.6 !important;
        }
        :global(h1) {
          color: #1a1a2e !important;
          font-size: 28px !important;
          font-weight: 700 !important;
          margin: 32px 0 16px 0 !important;
          border-bottom: 2px solid #2D2B7F !important;
          padding-bottom: 8px !important;
        }
        :global(h2) {
          color: #2D2B7F !important;
          font-size: 22px !important;
          font-weight: 600 !important;
          margin: 24px 0 12px 0 !important;
        }
        :global(table) {
          width: 100% !important;
          border-collapse: collapse !important;
          margin: 24px 0 !important;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1) !important;
        }
        :global(td) {
          padding: 12px !important;
          border: 1px solid #ddd !important;
          vertical-align: top !important;
        }
        :global(tr:nth-child(even)) {
          background-color: #f9f9f9 !important;
        }
        :global(strong) {
          color: #1a1a2e !important;
          font-weight: 600 !important;
        }
        :global(.zw-paragraph) {
          text-align: center !important;
          margin: 16px 0 !important;
          color: #666 !important;
          font-style: italic !important;
        }
      `}</style>

      <footer style={{ 
        marginTop: '60px', 
        paddingTop: '24px',
        borderTop: '1px solid #f0f0f0',
        textAlign: 'center'
      }}>
        <p style={{ 
          fontSize: '12px', 
          color: '#aaa', 
          margin: 0 
        }}>
          Last updated: {new Date(page.updatedAt).toLocaleDateString()}
        </p>
      </footer>
    </div>
  );
}