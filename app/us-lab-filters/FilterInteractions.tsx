"use client";

import Script from "next/script";

declare global {
  interface Window {
    initializeUsLabFilters?: () => void;
  }
}

export default function FilterInteractions() {
  return (
    <Script
      src="/us-lab-filters/filters.js"
      strategy="afterInteractive"
      onReady={() => window.initializeUsLabFilters?.()}
    />
  );
}
