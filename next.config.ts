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
  experimental: {
    serverComponentsExternalPackages: [],
  },
  // Increase the maximum request body size for file uploads
  serverRuntimeConfig: {
    maxRequestBodySize: '200mb',
  },
};

export default nextConfig;
