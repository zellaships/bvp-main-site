import type { Metadata } from "next";
import { draftMode } from "next/headers";
import "./globals.css";
import { DebugOverlay } from "@/components/ui/DebugOverlay";
import { CookieConsent } from "@/components/ui/CookieConsent";
import { CookieConsentProvider } from "@/components/providers/CookieConsentContext";
import { ConsentAwareAnalytics } from "@/components/providers/ConsentAwareAnalytics";
import { SanityLive } from "@/sanity/lib/live";
import { VisualEditing } from "next-sanity/visual-editing";
import { DisableDraftMode } from "@/components/sanity/DisableDraftMode";

export const metadata: Metadata = {
  title: "Black Veterans Project — Reparative Justice for Black Veterans",
  description:
    "Advancing reparative justice for Black veterans and military families through litigation, narrative, and mobilization.",
  metadataBase: new URL("https://blackveteransproject.org"),
  openGraph: {
    title: "Black Veterans Project",
    description: "Advancing reparative justice for Black veterans and military families.",
    type: "website",
    url: "https://blackveteransproject.org",
    siteName: "Black Veterans Project",
    images: [
      {
        url: "/images/hero-home.jpg",
        width: 1200,
        height: 630,
        alt: "Black Veterans Project",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Black Veterans Project",
    description: "Advancing reparative justice for Black veterans and military families.",
    images: ["/images/hero-home.jpg"],
  },
  // Preconnect to CDN for faster resource loading
  other: {
    "link": [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: "anonymous" },
    ].map(l => JSON.stringify(l)).join(","),
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isDraftMode = (await draftMode()).isEnabled;

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Preload critical fonts for faster LCP - these are on the critical render path */}
        <link
          rel="preload"
          href="/fonts/linear-grotesk/LinearGrotesk-Regular.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/gunterz/Gunterz-Bold.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/gunterz/Gunterz-Medium.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/ontika/TBJOntika-Medium.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body className="antialiased bg-white text-black">
        <CookieConsentProvider>
          {children}
          <CookieConsent />
          <ConsentAwareAnalytics />
        </CookieConsentProvider>
        <DebugOverlay />
        {/* Sanity Live Content API for real-time updates */}
        <SanityLive />
        {/* Visual Editing overlay when in draft mode */}
        {isDraftMode && (
          <>
            <DisableDraftMode />
            <VisualEditing />
          </>
        )}
      </body>
    </html>
  );
}
