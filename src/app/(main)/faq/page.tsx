import Link from 'next/link';
import { FAQSection } from '@/components/sections/FAQSection';
import { client } from '@/sanity/lib/client';
import { faqsQuery } from '@/sanity/lib/queries';
import type { SanityFAQ } from '@/sanity/lib/types';

// Revalidate every 60 seconds
export const revalidate = 60;

async function getFAQs(): Promise<SanityFAQ[]> {
  return client.fetch(faqsQuery);
}

export default async function FAQPage() {
  const faqs = await getFAQs();

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-white border-b border-gray-200">
        <div style={{ padding: 'clamp(6rem, 10vw, 6rem) clamp(1rem, 4vw, 5.75rem) clamp(2rem, 5vw, 3rem)' }}>
          <div className="max-w-[1400px] mx-auto">
            <p className="text-sm uppercase tracking-widest text-gray-400 mb-4">
              Frequently Asked Questions
            </p>
            <h1
              className="font-gunterz font-bold text-black leading-tight max-w-4xl"
              style={{ fontSize: 'clamp(1.75rem, 1rem + 3.5vw, 3rem)' }}
            >
              Common questions about BVP and how to get involved.
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
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 text-lg font-bold bg-black text-white hover:bg-gray-800 transition-colors focus-visible:ring-2 focus-visible:ring-bvp-gold focus-visible:ring-offset-2"
              >
                Have More Questions? Contact Us
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
