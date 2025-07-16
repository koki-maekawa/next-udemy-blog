import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
      {
        protocol: 'https',
        hostname: 'iptphizotklvhwfqkodc.supabase.co'
        
      }
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '5mb',
    },
  },
  eslint: {
    ignoreDuringBuilds: false,
    dirs: ['src']
  },
  typescript: {
    ignoreBuildErrors: false
  }
};

export default nextConfig;
