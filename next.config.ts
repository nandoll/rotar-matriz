import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Optimizaciones para Vercel
  compress: true,
  // Limitar el uso de memoria
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      };
    }
    return config;
  },
};

export default nextConfig;
