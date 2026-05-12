"use client";

import { useState } from "react";

interface DonatePageContent {
  heroSubtitle: string;
  heroTitle: string;
  mainParagraphs: string[];
  taxNoticeTitle: string;
  taxNoticeText: string;
  donationFormUrl: string;
  recurringDonationText: string;
}

export function DonatePageClient({ content }: { content: DonatePageContent }) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-white border-b border-gray-200">
        <div style={{ padding: 'clamp(6rem, 10vw, 8rem) clamp(1rem, 4vw, 5.75rem) clamp(2rem, 5vw, 3rem)' }}>
          <div className="max-w-[1400px] mx-auto">
            <p className="text-sm uppercase tracking-widest text-gray-600 mb-4">
              {content.heroSubtitle}
            </p>
            <h1
              className="font-gunterz font-bold leading-tight"
              style={{ fontSize: 'clamp(1.75rem, 1rem + 3.5vw, 3rem)' }}
            >
              {content.heroTitle}
            </h1>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section>
        <div style={{ padding: 'clamp(2rem, 5vw, 4rem) clamp(1rem, 4vw, 5.75rem)' }}>
          <div className="max-w-[1400px] mx-auto">
            <div
              className="grid"
              style={{
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
                gap: 'clamp(2rem, 5vw, 4rem)',
              }}
            >
              {/* Donately Form - First on mobile */}
              <div className="order-1 md:order-2">
                <div className="relative min-h-[600px]">
                  {/* Loading skeleton */}
                  {!isLoaded && (
                    <div
                      className="absolute inset-0 bg-gray-100 flex items-center justify-center"
                      role="status"
                      aria-live="polite"
                      aria-busy="true"
                    >
                      <div className="text-center">
                        <div className="w-8 h-8 border-2 border-gray-300 border-t-gray-600 rounded-full motion-safe:animate-spin mx-auto mb-3" aria-hidden="true" />
                        <p className="text-sm text-gray-600">Loading donation form...</p>
                      </div>
                    </div>
                  )}
                  <iframe
                    src={content.donationFormUrl}
                    width="100%"
                    height="1335"
                    frameBorder="0"
                    allow="payment *"
                    title="Donation Form"
                    loading="lazy"
                    onLoad={() => setIsLoaded(true)}
                    style={{
                      backgroundColor: "transparent",
                      border: "none",
                      overflow: "hidden",
                      opacity: isLoaded ? 1 : 0,
                      transition: "opacity 0.3s ease",
                    }}
                  />
                </div>
              </div>

              {/* Copy - Second on mobile */}
              <div className="order-2 md:order-1">
                <h2 className="sr-only">Why Your Donation Matters</h2>
                <div className="space-y-6">
                  {content.mainParagraphs.map((paragraph, index) => (
                    <p key={index} className="text-lg leading-relaxed text-gray-700">
                      {paragraph}
                    </p>
                  ))}
                </div>

                {/* Tax deductible note */}
                <div className="mt-8 p-4 bg-gray-50 border-l-4 border-bvp-gold">
                  <p className="text-sm text-gray-600">
                    <strong>{content.taxNoticeTitle}</strong> {content.taxNoticeText}
                  </p>
                </div>

                {/* Privacy Notice */}
                <p className="mt-4 text-xs text-gray-500 leading-relaxed">
                  By making a donation, you agree to our{' '}
                  <a href="/privacy" className="underline hover:text-black transition-colors">
                    Privacy Policy
                  </a>. Your payment is processed securely via Stripe through Donately.
                </p>

                {/* Recurring Donation Terms */}
                <p className="mt-3 text-xs text-gray-500 leading-relaxed">
                  <strong>Recurring Donations:</strong> {content.recurringDonationText}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
