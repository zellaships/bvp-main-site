'use client';

import { usePathname } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { BackToTop } from "@/components/ui/BackToTop";
import { NewsletterStrip } from "@/components/sections/NewsletterStrip";

// Pages that should not show the newsletter strip (v2 pages handle their own)
const PAGES_WITHOUT_NEWSLETTER = ['/donate', '/join', '/join-v2', '/our-work-v2', '/home-v2'];

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  // Normalize pathname and check if it's in the exclusion list
  const normalizedPath = pathname?.replace(/\/$/, '') || '/';
  const showNewsletter = !PAGES_WITHOUT_NEWSLETTER.includes(normalizedPath === '' ? '/' : normalizedPath);

  return (
    <>
      <Header />
      <main id="main-content">{children}</main>
      {showNewsletter && <NewsletterStrip />}
      <Footer />
      <BackToTop />
    </>
  );
}
