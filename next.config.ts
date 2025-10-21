import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable compression
  compress: true,

  // Add security and performance headers
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          // Cache control for static assets
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      // API endpoints - enable caching for AI platforms
      {
        source: "/api/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, s-maxage=604800",
          },
          {
            key: "Access-Control-Allow-Origin",
            value: "*",
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET, POST, OPTIONS",
          },
          {
            key: "Access-Control-Allow-Headers",
            value: "Content-Type",
          },
          {
            key: "Content-Type",
            value: "application/json",
          },
        ],
      },
      // JSON-LD and schema endpoints
      {
        source: "/api/schema",
        headers: [
          {
            key: "Content-Type",
            value: "application/ld+json",
          },
          {
            key: "Cache-Control",
            value: "public, max-age=604800",
          },
        ],
      },
      // Sitemaps and robots.txt
      {
        source: "/:path(robots.txt|sitemap.xml|sitemap-*.xml)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=604800",
          },
        ],
      },
      // Fonts - aggressive caching
      {
        source: "/:path*/:file\\.(woff|woff2|ttf|otf|eot)$",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      // Images - long cache with validation
      {
        source: "/:path*/:file\\.(jpg|jpeg|png|gif|webp|svg|ico)$",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },

  // Add redirects for legacy URLs if needed
  async redirects() {
    return [
      {
        source: "/api/openapi.json",
        destination: "/api/specs",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
