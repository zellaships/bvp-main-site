import { Hero } from '@/components/sections/Hero';
import PillarsSection from '@/components/sections/PillarsSection';
import { NewsletterStrip } from '@/components/sections/NewsletterStrip';
import { SubstackFeed } from '@/components/sections/SubstackFeed';
import { client } from '@/sanity/lib/client';
import { homepageSettingsQuery } from '@/sanity/lib/queries';
import type { SanityHomepageSettings } from '@/sanity/lib/types';

// Revalidate every 60 seconds
export const revalidate = 60;

async function getHomepageSettings(): Promise<SanityHomepageSettings | null> {
  return client.fetch(homepageSettingsQuery);
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
  const settings = await getHomepageSettings();

  // Use Sanity data if available, otherwise use defaults
  const heroHeadline = settings?.heroHeadline || "Defend the Legacy. Fight for Equity. Protect Democracy.";
  const heroImage = settings?.heroImage || "/images/hero-home.webp";

  return (
    <>
      {/* Hero Section */}
      <Hero
        headline={heroHeadline}
        backgroundImage={heroImage}
        showDebugSpacing={false}
      />

      {/* Newsletter Strip - Stay Connected */}
      <NewsletterStrip
        headline={settings?.newsletterHeadline || undefined}
        subheadline={settings?.newsletterSubheadline || undefined}
      />

      {/* Our Work / Pillars Section */}
      <PillarsSection
        title={settings?.ourWorkTitle || undefined}
        intro={settings?.ourWorkIntro || undefined}
        pillars={settings?.pillars}
      />

      {/* Substack Feed - Dynamic RSS */}
      <SubstackFeed />
    </>
  );
}
