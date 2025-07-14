import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
    ],
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
