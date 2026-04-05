import type { NextConfig } from "next";

// Security headers configuration
const securityHeaders = [
  // Strict Transport Security - force HTTPS for 1 year
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=31536000; includeSubDomains; preload'
  },
  // Prevent clickjacking - don't allow site to be embedded in iframes
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN'
  },
  // Prevent MIME type sniffing
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  // Control referrer information
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin'
  },
  // Permissions Policy - disable unnecessary browser features
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()'
  },
  // XSS Protection (legacy but still useful)
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block'
  },
  // Content Security Policy
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      // Scripts: self + inline (needed for Next.js) + Google Analytics
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com",
      // Styles: self + inline (needed for Tailwind/Framer Motion)
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      // Images: self + data URIs + common image CDNs
      "img-src 'self' data: blob: https: http:",
      // Fonts: self + Google Fonts
      "font-src 'self' https://fonts.gstatic.com data:",
      // Connect: self + analytics + Vercel
      "connect-src 'self' https://www.google-analytics.com https://vitals.vercel-insights.com https://*.vercel.app",
      // Frames: allow YouTube, Vimeo, and Donately embeds
      "frame-src 'self' https://www.youtube.com https://youtube.com https://player.vimeo.com https://cdn.donately.com",
      // Form actions: self only
      "form-action 'self'",
      // Base URI: self only
      "base-uri 'self'",
      // Object/embed: none
      "object-src 'none'",
      // Upgrade insecure requests
      "upgrade-insecure-requests"
    ].join('; ')
  }
];

const nextConfig: NextConfig = {
  // Apply security headers to all routes
  async headers() {
    return [
      {
        // Apply to all routes
        source: '/:path*',
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
