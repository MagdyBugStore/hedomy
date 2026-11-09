import type { NextConfig } from "next";

// Where hedomy-api listens (server-side only).
const API = process.env.API_URL || "http://127.0.0.1:4100";

const nextConfig: NextConfig = {
  turbopack: {
    rules: { "*.css": { loaders: ["@tailwindcss/turbopack"], as: "*.css" } },
  },
  images: { unoptimized: true },
  async rewrites() {
    return [
      { source: "/api/:path*", destination: `${API}/api/:path*` },
      // Telegram product photos and brand logos live with the API
      { source: "/images/:path*", destination: `${API}/static/images/:path*` },
      { source: "/brand-logos/:path*", destination: `${API}/static/brand-logos/:path*` },
    ];
  },
};

export default nextConfig;
