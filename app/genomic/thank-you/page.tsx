import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import ThankYouContent from './ThankYouContent';

export const metadata: Metadata = {
  title: 'Quotation Request Received | Solarbio D1800 | Sri Saradi Scientific',
  description:
    'Thank you for your quotation request for the Solarbio D1800 Blood Genomic DNA Extraction Kit (100T). Our scientific support team will be in touch shortly.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function SolarbioThankYouPage() {
  return (
    <Suspense
      fallback={
        <div style={{ minHeight: '60vh', display: 'grid', placeItems: 'center' }}>
          <p style={{ color: '#607384', fontSize: '1.1rem' }}>Loading confirmation...</p>
        </div>
      }
    >
      <ThankYouContent />
    </Suspense>
  );
}

