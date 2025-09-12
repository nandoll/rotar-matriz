import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Optimizaciones para producción
  compress: true,
  // Reducir uso de memoria
  experimental: {
    // Desactivar características que consumen memoria
    optimizeCss: false,
    optimizePackageImports: [],
  },
  // Configuración de webpack para menos memoria
  webpack: (config, { isServer, dev }) => {
    // Solo en producción
    if (!dev && !isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true,
          },
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            priority: -10,
            chunks: 'all',
          },
        },
      };
    }
    
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
