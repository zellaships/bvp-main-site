'use client';

import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { useEffect } from 'react';
import { useCookieConsent } from './CookieConsentContext';
import { captureUTMParams, clearUTMParams } from '@/lib/utm';
import { initScrollTracking } from '@/lib/analytics';

/**
 * Consent-Aware Analytics
 *
 * Only loads tracking scripts after user consents to analytics cookies.
 * This is required for GDPR/CCPA compliance.
 *
 * Components loaded when analytics consent is given:
 * - Vercel Analytics
 * - Vercel Speed Insights
 * - UTM parameter capture
 * - Scroll depth tracking
 */
export function ConsentAwareAnalytics() {
  const { hasAnalyticsConsent } = useCookieConsent();

  useEffect(() => {
    if (!hasAnalyticsConsent) {
      // GDPR: Clear UTM data when consent is revoked
      clearUTMParams();
      return;
    }

    // Initialize analytics tracking only after consent
    captureUTMParams();
    const cleanupScroll = initScrollTracking();

    return () => {
      cleanupScroll();
    };
  }, [hasAnalyticsConsent]);

  // Only render analytics components if user has consented
  if (!hasAnalyticsConsent) {
    return null;
  }

  return (
    <>
      <Analytics />
      <SpeedInsights />
    </>
  );
}
