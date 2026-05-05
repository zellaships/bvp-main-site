import { Hero } from '@/components/sections/Hero';
import PillarsSection from '@/components/sections/PillarsSection';
import { NewsletterStrip } from '@/components/sections/NewsletterStrip';
import { SubstackFeed } from '@/components/sections/SubstackFeed';
import { client } from '@/sanity/lib/client';
import { siteSettingsQuery } from '@/sanity/lib/queries';
import type { SanitySiteSettings } from '@/sanity/lib/types';

// Revalidate every 60 seconds
export const revalidate = 60;

async function getSiteSettings(): Promise<SanitySiteSettings | null> {
  return client.fetch(siteSettingsQuery);
}

/**
 * HOMEPAGE SPECIFICATIONS
 * =======================
 *
 * SECTIONS:
 * 1. Hero (100vh) - Mission, CTAs
 * 2. Pillars - Our Work
 * 3. Newsletter Strip - Stay Connected
 * 4. Blog Feed (white bg) - Substack RSS, dynamic
 * 5. Footer
 */

export default async function Home() {
  const settings = await getSiteSettings();

  // Use Sanity headline if available, otherwise use default
  const headline = settings?.heroHeadline || "Defend the Legacy. Fight for Equity. Protect Democracy.";

  return (
    <>
      {/* Hero Section */}
      <Hero
        headline={headline}
        showDebugSpacing={false}
      />

      {/* Newsletter Strip - Stay Connected */}
      <NewsletterStrip />

      {/* Our Work / Pillars Section */}
      <PillarsSection />

      {/* Substack Feed - Dynamic RSS */}
      <SubstackFeed />
    </>
  );
}
