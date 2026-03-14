import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Redirect /kit-products/* to /lab-consumables/*
      {
        source: '/kit-products/:slug*',
        destination: '/lab-consumables/:slug*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
