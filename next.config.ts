import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'standalone',
  turbopack: {
    root: __dirname,
  },

  sassOptions: {
    silenceDeprecations: ['legacy-js-api'],
  },
  transpilePackages: ['reshaped'],
  cacheLife: {
    carousel: {
      stale: 60,
      revalidate: 300,
      expire: 3600,
    },
  },
  experimental: {
    useCache: true,
    optimizePackageImports: ['reshaped'],
  },
  reactStrictMode: true,
  compress: true,
  poweredByHeader: false,
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337',
        pathname: '/uploads/**',
      },
      {
        protocol: 'http',
        hostname: 'dev.api.legacy',
        port: '1337',
        pathname: '/uploads/**',
      },
    ],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
};

export default nextConfig;
