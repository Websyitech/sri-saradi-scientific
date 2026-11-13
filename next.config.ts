import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: '',
  async redirects() {
    // These sections were database-driven and have been removed; send old links home.
    const removed = [
      'products', 'kit-products', 'lab-consumables', 'applications', 'cro-services',
      'signaling-pathways', 'faq', 'careers', 'certificates',
      'publications', 'pages', 'track-order', 'login', 'admin',
    ];
    return [
      { source: '/catalogues', destination: '/catalogue', permanent: true },
      ...removed.flatMap((p) => [
        { source: `/${p}`, destination: '/', permanent: true },
        { source: `/${p}/:path*`, destination: '/', permanent: true },
      ]),
    ];
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '150mb',
    },
  },
};

export default nextConfig;
