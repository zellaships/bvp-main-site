import Link from 'next/link';
import { FAQSection } from '@/components/sections/FAQSection';
import { safeFetch } from '@/sanity/lib/client';
import { faqsQuery, faqPageSettingsQuery } from '@/sanity/lib/queries';
import type { SanityFAQ } from '@/sanity/lib/types';

// Revalidate every 60 seconds
export const revalidate = 60;

interface FAQPageSettings {
  heroSubtitle: string;
  heroTitle: string;
  contactCTAText: string;
  contactCTAHref: string;
}

async function getFAQs(): Promise<SanityFAQ[]> {
  return (await safeFetch<SanityFAQ[]>(faqsQuery)) ?? [];
}

async function getFAQPageSettings(): Promise<FAQPageSettings | null> {
  return safeFetch<FAQPageSettings>(faqPageSettingsQuery);
}

export default async function FAQPage() {
  const [faqs, settings] = await Promise.all([
    getFAQs(),
    getFAQPageSettings(),
  ]);

  // Use Sanity data with fallbacks
  const heroSubtitle = settings?.heroSubtitle ?? 'Frequently Asked Questions';
  const heroTitle = settings?.heroTitle ?? 'Common questions about BVP and how to get involved.';
  const contactCTAText = settings?.contactCTAText ?? 'Have More Questions? Contact Us';
  const contactCTAHref = settings?.contactCTAHref ?? '/contact';

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-white border-b border-gray-200">
        <div style={{ padding: 'clamp(6rem, 10vw, 6rem) clamp(1rem, 4vw, 5.75rem) clamp(2rem, 5vw, 3rem)' }}>
          <div className="max-w-[1400px] mx-auto">
            <p className="text-sm uppercase tracking-widest text-gray-400 mb-4">
              {heroSubtitle}
            </p>
            <h1
              className="font-gunterz font-bold text-black leading-tight max-w-4xl"
              style={{ fontSize: 'clamp(1.75rem, 1rem + 3.5vw, 3rem)' }}
            >
              {heroTitle}
            </h1>
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="bg-gray-100">
        <div style={{ padding: 'clamp(2rem, 5vw, 4rem) clamp(1rem, 4vw, 5.75rem)' }}>
          <div className="max-w-[1400px] mx-auto">
            <FAQSection faqs={faqs} />

            {/* Contact CTA */}
            <div className="mt-12">
              <Link
                href={contactCTAHref}
                className="inline-flex items-center gap-2 px-8 py-4 text-lg font-bold bg-black text-white hover:bg-gray-800 transition-colors focus-visible:ring-2 focus-visible:ring-bvp-gold focus-visible:ring-offset-2"
              >
                {contactCTAText}
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
