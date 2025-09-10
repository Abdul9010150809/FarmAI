/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  
  // Environment variables
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
  
  // Image optimization
  images: {
    domains: [
      'localhost',
      'api.farmai.com',
      'storage.googleapis.com',
      'images.unsplash.com',
      'satellite-imagery.com'
    ],
    formats: ['image/webp', 'image/avif'],
  },
  
  // API routes configuration
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: process.env.NODE_ENV === 'production' 
          ? 'https://api.farmai.com/:path*'
          : 'http://localhost:3001/api/:path*',
      },
    ];
  },
  
  // Headers for security and performance
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ];
  },
  
  // Webpack configuration for custom modules
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Handle leaflet CSS imports
    config.module.rules.push({
      test: /\.css$/,
      use: ['style-loader', 'css-loader'],
    });
    
    return config;
  },
  
  // Experimental features
  experimental: {
    appDir: false, // Keep using pages router for now
  },
  
  // Output configuration for static export if needed
  trailingSlash: true,
  
  // Internationalization
  i18n: {
    locales: ['en', 'hi', 'bn', 'te', 'ta', 'mr'],
    defaultLocale: 'en',
    localeDetection: true,
  },
};

module.exports = nextConfig;