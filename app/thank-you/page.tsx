import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import ThankYouContent from '../solarbio/thank-you/ThankYouContent';

export const metadata: Metadata = {
  title: 'Thank You | Sri Saradi Scientific',
  description: 'Thank you for contacting Sri Saradi Scientific. Our team will review your request shortly.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function GeneralThankYouPage() {
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

