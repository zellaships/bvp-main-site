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
      // Images: self + data URIs + common image CDNs + Sanity
      "img-src 'self' data: blob: https: http: https://cdn.sanity.io",
      // Fonts: self + Google Fonts
      "font-src 'self' https://fonts.gstatic.com data:",
      // Connect: self + analytics + Vercel + Sanity
      "connect-src 'self' https://www.google-analytics.com https://vitals.vercel-insights.com https://*.vercel.app https://*.sanity.io https://*.api.sanity.io",
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
  // Image optimization configuration
  images: {
    // Enable modern image formats
    formats: ['image/avif', 'image/webp'],
    // Allow remote images from these domains
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'substackcdn.com',
      },
      {
        protocol: 'https',
        hostname: '*.substackcdn.com',
      },
      {
        protocol: 'https',
        hostname: 'substack-post-media.s3.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 'substack-video.s3.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 'bucketeer-e05bbc84-baa3-437e-9518-adb32be77984.s3.amazonaws.com',
      },
    ],
    // Device sizes for responsive images
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    // Image sizes for smaller images
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  // Apply security headers to non-studio routes only
  async headers() {
    return [
      {
        source: '/',
        headers: securityHeaders,
      },
      {
        source: '/:path((?!studio).*)',
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
