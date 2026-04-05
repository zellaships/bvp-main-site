'use client';

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';

// ============================================
// COOKIE CONSENT CONTEXT
// Provides global consent state for legal compliance
// ============================================

const COOKIE_CONSENT_KEY = 'bvp-cookie-consent';

export type ConsentPreferences = {
  necessary: boolean;  // Always true
  analytics: boolean;
  marketing: boolean;
};

type ConsentState =
  | { status: 'pending' }  // No choice made yet
  | { status: 'declined' } // User dismissed without choosing
  | { status: 'set'; preferences: ConsentPreferences };

interface CookieConsentContextValue {
  consentState: ConsentState;
  hasAnalyticsConsent: boolean;
  hasMarketingConsent: boolean;
  showBanner: boolean;
  setShowBanner: (show: boolean) => void;
  openPreferences: () => void;
  savePreferences: (preferences: ConsentPreferences) => void;
  resetConsent: () => void;
}

const CookieConsentContext = createContext<CookieConsentContextValue | null>(null);

export function CookieConsentProvider({ children }: { children: ReactNode }) {
  const [consentState, setConsentState] = useState<ConsentState>({ status: 'pending' });
  const [showBanner, setShowBanner] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load consent from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(COOKIE_CONSENT_KEY);

    if (!stored) {
      // No consent stored - show banner
      setConsentState({ status: 'pending' });
      setShowBanner(true);
    } else if (stored === 'declined') {
      // User dismissed without choosing
      setConsentState({ status: 'declined' });
      setShowBanner(false);
    } else {
      // User made a choice
      try {
        const preferences = JSON.parse(stored) as ConsentPreferences;
        setConsentState({ status: 'set', preferences });
        setShowBanner(false);
      } catch {
        // Invalid stored data - reset
        localStorage.removeItem(COOKIE_CONSENT_KEY);
        setConsentState({ status: 'pending' });
        setShowBanner(true);
      }
    }

    setIsInitialized(true);
  }, []);

  const savePreferences = useCallback((preferences: ConsentPreferences) => {
    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(preferences));
    setConsentState({ status: 'set', preferences });
    setShowBanner(false);
  }, []);

  const openPreferences = useCallback(() => {
    setShowBanner(true);
  }, []);

  const resetConsent = useCallback(() => {
    localStorage.removeItem(COOKIE_CONSENT_KEY);
    setConsentState({ status: 'pending' });
    setShowBanner(true);
  }, []);

  // Derive consent flags for easy checking
  const hasAnalyticsConsent =
    consentState.status === 'set' && consentState.preferences.analytics;
  const hasMarketingConsent =
    consentState.status === 'set' && consentState.preferences.marketing;

  return (
    <CookieConsentContext.Provider
      value={{
        consentState,
        hasAnalyticsConsent,
        hasMarketingConsent,
        showBanner,
        setShowBanner,
        openPreferences,
        savePreferences,
        resetConsent,
      }}
    >
      {children}
    </CookieConsentContext.Provider>
  );
}

export function useCookieConsent() {
  const context = useContext(CookieConsentContext);
  if (!context) {
    throw new Error('useCookieConsent must be used within CookieConsentProvider');
  }
  return context;
}
