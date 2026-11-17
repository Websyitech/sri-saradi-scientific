'use client';

import React, { useEffect, useState } from 'react';

// Asks for contact details once before the protocol / COA PDFs on /genomic open, and sends them to the
// team as a quote request (/api/quotes) so serious buyers who only download documents become leads.
const GATED = 'a[href^="/assets/solarbio/"][href$=".pdf"]';
const STORAGE_KEY = 'sb-docs-unlocked';

function isUnlocked() {
  try {
    return localStorage.getItem(STORAGE_KEY) === '1';
  } catch {
    return false;
  }
}

export default function DownloadGate() {
  const [file, setFile] = useState<{ href: string; label: string } | null>(null);
  const [done, setDone] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({ name: '', email: '', phone: '', organization: '' });

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const link = (e.target as Element | null)?.closest?.(GATED) as HTMLAnchorElement | null;
      if (!link || isUnlocked()) return;
      e.preventDefault();
      e.stopPropagation();
      const href = link.getAttribute('href') || '';
      const label = href.includes('COA') ? 'Certificate of Analysis (COA)' : 'Technical protocol';
      setFile({ href, label });
      setDone(false);
      setError('');
    };
    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, []);

  if (!file) return null;

  const update = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError('');
    try {
      const res = await fetch('/api/quotes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          company: form.organization,
          notes: `Document download: ${file.label} (${file.href}) — lead from /genomic, follow up`,
          pageUrl: window.location.href,
          items: [{ name: 'Solarbio D1800 Blood Genomic DNA Extraction Kit (100T)', quantity: 1 }],
        }),
      });
      if (!res.ok) throw new Error('failed');
      try {
        localStorage.setItem(STORAGE_KEY, '1');
      } catch {}
      setDone(true);
    } catch {
      setError('Could not send your details. Please try again or contact us on WhatsApp.');
    } finally {
      setBusy(false);
    }
  };

  const field: React.CSSProperties = {
    width: '100%',
    padding: '10px 12px',
    border: '1px solid #cfd6e4',
    borderRadius: 8,
    fontSize: 15,
    boxSizing: 'border-box',
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="sb-gate-title"
      onClick={() => setFile(null)}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(15, 23, 42, 0.55)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
        zIndex: 1000,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: '#fff',
          borderRadius: 14,
          padding: '22px 20px',
          width: '100%',
          maxWidth: 420,
          boxShadow: '0 20px 50px rgba(0,0,0,0.25)',
          position: 'relative',
        }}
      >
        <button
          type="button"
          aria-label="Close"
          onClick={() => setFile(null)}
          style={{ position: 'absolute', top: 8, right: 12, border: 0, background: 'none', fontSize: 24, cursor: 'pointer' }}
        >
          ×
        </button>
        {done ? (
          <>
            <h3 id="sb-gate-title" style={{ margin: '0 0 8px' }}>Thank you!</h3>
            <p style={{ margin: '0 0 16px', color: '#475569' }}>
              Your {file.label} is ready. Our team may contact you with pricing and support.
            </p>
            <a
              className="sb-btn blue"
              href={file.href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setFile(null)}
              style={{ display: 'inline-block' }}
            >
              Download now →
            </a>
          </>
        ) : (
          <form onSubmit={submit}>
            <h3 id="sb-gate-title" style={{ margin: '0 0 6px' }}>Get the {file.label}</h3>
            <p style={{ margin: '0 0 14px', color: '#475569', fontSize: 14 }}>
              Tell us where to send updates and pricing. You only need to do this once.
            </p>
            <div style={{ display: 'grid', gap: 10 }}>
              <input style={field} name="name" placeholder="Your name *" required value={form.name} onChange={update} />
              <input style={field} name="email" type="email" placeholder="Email *" required value={form.email} onChange={update} />
              <input style={field} name="phone" type="tel" placeholder="Phone / WhatsApp *" required value={form.phone} onChange={update} />
              <input style={field} name="organization" placeholder="Institute / company" value={form.organization} onChange={update} />
            </div>
            {error && <p style={{ color: '#b91c1c', fontSize: 14, margin: '10px 0 0' }}>{error}</p>}
            <button className="sb-btn blue" type="submit" disabled={busy} style={{ marginTop: 14, width: '100%', border: 0, cursor: 'pointer' }}>
              {busy ? 'Please wait…' : 'Get the document →'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
