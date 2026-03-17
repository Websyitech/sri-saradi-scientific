import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: '',
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
  experimental: {
    serverActions: {
      bodySizeLimit: '150mb',
    },
  },
};

export default nextConfig;
