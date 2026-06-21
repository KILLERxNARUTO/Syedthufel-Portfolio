import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Hide the X-Powered-By header to prevent technology fingerprinting
  poweredByHeader: false,
  
  async headers() {
    return [
      {
        // Apply these headers to all routes in your application.
        source: '/(.*)',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            // Enforce HTTPS
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            // Protect against cross-site scripting (XSS)
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            // Prevent the site from being framed/embedded on malicious sites (Clickjacking)
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            // Prevent browsers from sniffing MIME types
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            // Control how much referrer information is sent
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          },
          {
            // Disable access to camera, microphone, and geolocation by default
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), browsing-topics=()'
          }
        ],
      },
    ];
  },
};

export default nextConfig;
