import type { Metadata } from "next";
import "./globals.css";
import { DebugOverlay } from "@/components/ui/DebugOverlay";
import { CookieConsent } from "@/components/ui/CookieConsent";
import FeedbackWidget from "@/components/FeedbackWidget";

export const metadata: Metadata = {
  title: "Black Veterans Project — Reparative Justice for Black Veterans",
  description:
    "Advancing reparative justice for Black veterans and military families through litigation, narrative, and mobilization.",
  openGraph: {
    title: "Black Veterans Project",
    description: "Advancing reparative justice for Black veterans and military families.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-white text-black">
        {children}
        <CookieConsent />
        <DebugOverlay />
        <FeedbackWidget />
      </body>
    </html>
  );
}
