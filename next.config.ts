import type { NextConfig } from "next";

const securityHeaders = [
  // Prevent clickjacking by disallowing framing
  {
    key: "X-Frame-Options",
    value: "DENY",
  },
  // Prevent MIME-sniffing
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  // Referrer policy
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  // Permissions Policy (Camera, Mic, Geolocation, etc. disabled)
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
  // HTTP Strict Transport Security (HSTS)
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  // Cross-Origin policies
  {
    key: "X-DNS-Prefetch-Control",
    value: "on",
  },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
      {
        protocol: "https",
        hostname: "tvpnnitwigmttlomgdmf.supabase.co",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
