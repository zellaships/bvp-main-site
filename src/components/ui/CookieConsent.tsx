"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";

// ============================================
// BVP COOKIE CONSENT BANNER + PREFERENCES DRAWER
// ============================================

const COOKIE_CONSENT_KEY = "bvp-cookie-consent";

type ConsentPreferences = {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
};

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [preferences, setPreferences] = useState<ConsentPreferences>({
    necessary: true,
    analytics: true,
    marketing: false,
  });

  useEffect(() => {
    // DEV MODE: Always show on refresh for testing
    const timer = setTimeout(() => setIsVisible(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleAccept = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify({ ...preferences, analytics: true, marketing: true }));
    setIsVisible(false);
  };

  const handleRejectAll = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify({ necessary: true, analytics: false, marketing: false }));
    setIsVisible(false);
  };

  const handleSaveChoices = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(preferences));
    setIsVisible(false);
  };

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      localStorage.setItem(COOKIE_CONSENT_KEY, "declined");
      setIsVisible(false);
      setIsClosing(false);
    }, 300);
  };

  const togglePreference = (key: keyof ConsentPreferences) => {
    if (key === "necessary") return;
    setPreferences((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  if (typeof window === "undefined") return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{
            type: "spring",
            damping: 25,
            stiffness: 200,
          }}
          className="fixed bottom-0 left-0 right-0 z-50"
        >
          {/* Main Banner — text/Accept hide when expanded, bar + X stay */}
          <div
            className={cn(
              "bg-white/50 backdrop-blur-md border-t border-white/40",
              "px-6 md:px-12 py-4",
              "flex items-center justify-between gap-4 md:gap-8"
            )}
          >
            {!isExpanded && (
              <>
                <motion.p
                  className="text-black text-sm md:text-base flex-1 ml-[84px]"
                  animate={{
                    opacity: isClosing ? 0 : 1,
                    x: isClosing ? -20 : 0,
                  }}
                  transition={{ duration: 0.2 }}
                >
                  We use cookies to enhance your experience.{" "}
                  <button
                    onClick={() => setIsExpanded(true)}
                    className="text-black underline underline-offset-2 hover:text-[#FDC500] transition-colors font-bold"
                  >
                    Manage my choices
                  </button>
                </motion.p>

                <motion.button
                  onClick={handleAccept}
                  className={cn(
                    "px-6 py-2.5 text-sm font-bold tracking-wide rounded-full",
                    "bg-white text-black border-2 border-black",
                    "hover:bg-black hover:border-black hover:text-[#FDC500]",
                    "transition-all duration-200",
                    "whitespace-nowrap"
                  )}
                  animate={{
                    opacity: isClosing ? 0 : 1,
                    x: isClosing ? 20 : 0,
                  }}
                  transition={{ duration: 0.2, delay: 0.05 }}
                >
                  Accept
                </motion.button>
              </>
            )}

            {isExpanded && <div className="flex-1" />}

            <motion.button
              onClick={handleClose}
              className="relative p-3 group mr-[54px]"
              aria-label="Close"
              whileTap={{ scale: 0.85, rotate: 90 }}
              animate={{
                opacity: isClosing ? 0 : 1,
                rotate: isClosing ? 90 : 0,
              }}
              transition={{ duration: 0.2 }}
            >
              <span className="absolute inset-0 rounded-full border-2 border-[#FDC500] scale-0 group-hover:scale-100 transition-transform duration-200" />
              <svg
                className="w-5 h-5 text-black relative z-10 group-hover:text-black transition-colors"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </motion.button>
          </div>

          {/* Expanded Preferences Panel */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{
                  duration: 0.4,
                  ease: [0.25, 0.1, 0.25, 1],
                  opacity: { duration: 0.2 }
                }}
                className="bg-white/50 backdrop-blur-md border-t border-white/40 overflow-hidden"
              >
                <div className="px-6 md:px-12 py-8 max-w-4xl mx-auto">
                  {/* Header */}
                  <motion.div
                    className="mb-6"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <h2 className="text-2xl md:text-3xl font-bold text-black">
                      Your Privacy Choices
                    </h2>
                  </motion.div>

                  <motion.p
                    className="text-sm text-black/60 mb-8 max-w-2xl"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }}
                  >
                    You can customize your consent preferences for tracking technologies below.
                    Toggle options on or off, then save your choices.
                    {" "}
                    <Link
                      href="/privacy"
                      className="text-black underline underline-offset-2 hover:text-[#FDC500] transition-colors font-bold"
                    >
                      See full Cookie Policy
                    </Link>
                  </motion.p>

                  {/* Toggles */}
                  <motion.div
                    className="space-y-4 mb-8"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <ToggleRow
                      label="Analytics"
                      description="Help us understand how visitors interact with our website."
                      checked={preferences.analytics}
                      onChange={() => togglePreference("analytics")}
                    />
                    <ToggleRow
                      label="Marketing"
                      description="Used to deliver relevant content and measure campaign effectiveness."
                      checked={preferences.marketing}
                      onChange={() => togglePreference("marketing")}
                    />
                  </motion.div>

                  {/* Action Buttons */}
                  <motion.div
                    className="flex flex-wrap gap-3"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 }}
                  >
                    <button
                      onClick={handleRejectAll}
                      className={cn(
                        "px-6 py-2.5 text-sm font-bold tracking-wide rounded-full",
                        "bg-white text-black border-2 border-black",
                        "hover:bg-black hover:border-black hover:text-[#FDC500]",
                        "transition-all duration-200",
                        "flex items-center gap-2"
                      )}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      Reject all
                    </button>
                    <button
                      onClick={handleAccept}
                      className={cn(
                        "px-6 py-2.5 text-sm font-bold tracking-wide rounded-full",
                        "bg-white text-black border-2 border-black",
                        "hover:bg-black hover:border-black hover:text-[#FDC500]",
                        "transition-all duration-200",
                        "flex items-center gap-2"
                      )}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      Accept all
                    </button>
                    <button
                      onClick={handleSaveChoices}
                      className={cn(
                        "px-6 py-2.5 text-sm font-bold tracking-wide rounded-full",
                        "bg-[#FDC500] text-black border-2 border-black",
                        "hover:bg-black hover:text-white hover:border-black",
                        "transition-all duration-200",
                        "ml-auto"
                      )}
                    >
                      Save and continue
                    </button>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Toggle Row Component
function ToggleRow({
  label,
  description,
  checked,
  onChange,
  disabled = false,
}: {
  label: string;
  description: string;
  checked: boolean;
  onChange?: () => void;
  disabled?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-4 py-4 border-b border-black/10">
      <div className="flex-1">
        <h3 className="text-base font-bold text-black">{label}</h3>
        <p className="text-sm text-black/50">{description}</p>
      </div>
      <div className="flex items-center gap-3">
        <span className={cn(
          "text-xs font-bold uppercase tracking-wider",
          checked ? "text-black" : "text-black/40"
        )}>
          {disabled ? "Always on" : checked ? "On" : "Off"}
        </span>
        <button
          onClick={onChange}
          disabled={disabled}
          className={cn(
            "relative w-14 h-8 rounded-full transition-colors duration-200",
            checked ? "bg-[#FDC500]" : "bg-gray-300",
            disabled && "cursor-not-allowed"
          )}
        >
          <span
            className={cn(
              "absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow transition-transform duration-200 border-2",
              checked ? "translate-x-6 border-[#FDC500]" : "translate-x-0 border-gray-400"
            )}
          />
        </button>
      </div>
    </div>
  );
}
