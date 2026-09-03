'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Donate Popup Component
 *
 * Shows a donation modal when user scrolls down on the homepage.
 * - Triggers after scrolling ~200px
 * - Only shows once per session
 * - Can be closed via X button or clicking backdrop
 */

interface DonatePopupProps {
  /** Scroll threshold in pixels before showing popup */
  scrollThreshold?: number;
  /** Donation form URL */
  donationFormUrl?: string;
}

const DEFAULT_DONATION_URL = 'https://cdn.donately.com/core/6.0/donate-form.html?form_id=frm_17bf7d7efced&account_id=act_1c9da0501869&stripe_key=pk_live_51EciVsFvVHN4GQU4Cyxh9ZfzIYeJQ9VXDHj4LqCHlU4XCB2cDI8vxhDzxXOJwCw5TjK89kwvuDuXEz3XeugfdcSr00nNgvHMYd';

export function DonatePopup({
  scrollThreshold = 200,
  donationFormUrl = DEFAULT_DONATION_URL,
}: DonatePopupProps) {
  // DISABLED - return null immediately
  return null;

  const [isOpen, setIsOpen] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);
  const [isFormLoaded, setIsFormLoaded] = useState(false);

  // Check if popup was already shown this session
  useEffect(() => {
    const wasShown = sessionStorage.getItem('donatePopupShown');
    if (wasShown) {
      setHasTriggered(true);
    }
  }, []);

  // Scroll listener
  useEffect(() => {
    if (hasTriggered) return;

    const handleScroll = () => {
      if (window.scrollY > scrollThreshold && !hasTriggered) {
        setIsOpen(true);
        setHasTriggered(true);
        sessionStorage.setItem('donatePopupShown', 'true');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasTriggered, scrollThreshold]);

  // Close handler
  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, handleClose]);

  // Prevent body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Fallback: show iframe after 3 seconds
  useEffect(() => {
    if (!isOpen) return;
    const timer = setTimeout(() => {
      setIsFormLoaded(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
            onClick={handleClose}
            aria-hidden="true"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-2xl z-50 flex items-center justify-center"
          >
            <div
              className="relative w-full max-h-[85vh] overflow-y-auto bg-white rounded-2xl shadow-2xl"
              role="dialog"
              aria-modal="true"
              aria-labelledby="donate-popup-title"
            >
              {/* Close Button - aligned to design system */}
              <button
                onClick={handleClose}
                className="absolute top-3 right-3 z-10 w-11 h-11 flex items-center justify-center rounded-full bg-transparent hover:bg-gray-100 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-bvp-gold focus-visible:ring-offset-2"
                aria-label="Close donation popup"
              >
                <svg
                  className="w-6 h-6 text-gray-700"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Header */}
              <div className="px-6 pt-5 pb-3">
                <p className="text-xs uppercase tracking-widest text-gray-500 mb-1">
                  Support Our Mission
                </p>
                <h2
                  id="donate-popup-title"
                  className="font-gunterz font-bold text-lg md:text-xl leading-tight text-gray-900"
                >
                  Help Us Secure the Legacy for Black Veterans
                </h2>
              </div>

              {/* Form Container */}
              <div className="px-6 pb-5">
                {/* Donately Form */}
                <div className="relative min-h-[420px] bg-gray-50 rounded-lg overflow-hidden">
                  {/* Loading skeleton */}
                  {!isFormLoaded && (
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
                    src={donationFormUrl}
                    width="100%"
                    height="420"
                    frameBorder="0"
                    allow="payment *"
                    title="Donation Form"
                    onLoad={() => setIsFormLoaded(true)}
                    style={{
                      backgroundColor: 'transparent',
                      border: 'none',
                      overflow: 'hidden',
                      opacity: isFormLoaded ? 1 : 0,
                      transition: 'opacity 0.3s ease',
                    }}
                  />
                </div>

                {/* Footer row - Tax notice and link */}
                <div className="mt-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <p className="text-xs text-gray-500">
                    <strong>Tax Deductible:</strong> BVP is a 501(c)(3) nonprofit.
                  </p>
                  <a
                    href="/donate"
                    className="text-xs text-gray-600 hover:text-gray-900 hover:underline"
                    onClick={handleClose}
                  >
                    View full donation page →
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
