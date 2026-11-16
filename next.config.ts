import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: '',
  async redirects() {
    return [
      // "Resources" is a menu heading with no page of its own; open its first item.
      { source: '/resources', destination: '/catalogue', permanent: false },
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
