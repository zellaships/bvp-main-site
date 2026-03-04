'use client';

import { useState } from 'react';
import { Hero } from '@/components/sections/Hero';
import PillarsSection from '@/components/sections/PillarsSection';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

/**
 * HOMEPAGE SPECIFICATIONS
 * =======================
 * 
 * SECTIONS:
 * 1. Hero (100vh) - Mission, CTAs
 * 2. Blog Feed (gray bg) - Substack RSS, 3 posts
 * 3. Newsletter Signup (black bg) - Email capture
 * 4. Footer
 * 
 * DEBUG MODE:
 * Add ?debug=true to URL to show spacing markers
 * Press Ctrl+Shift+D to toggle debug overlay
 */

export default function Home() {
  const prefersReducedMotion = useReducedMotion();

  const [substackModal, setSubstackModal] = useState<{ isOpen: boolean; url: string; title: string }>({
    isOpen: false,
    url: '',
    title: '',
  });
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    errors: { name: '', email: '' },
    touched: { name: false, email: false },
    isSubmitting: false,
    isSuccess: false,
  });
  const showDebug = false;

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const errors = {
      name: formState.name.trim() === '' ? 'Please enter your name' : '',
      email: formState.email.trim() === ''
        ? 'Please enter your email'
        : !validateEmail(formState.email)
          ? 'Please enter a valid email'
          : '',
    };

    setFormState(prev => ({
      ...prev,
      errors,
      touched: { name: true, email: true }
    }));

    if (!errors.name && !errors.email) {
      setFormState(prev => ({ ...prev, isSubmitting: true }));
      // Simulate submission
      setTimeout(() => {
        setFormState(prev => ({
          ...prev,
          isSubmitting: false,
          isSuccess: true,
          name: '',
          email: '',
        }));
        // Reset success after 5s
        setTimeout(() => {
          setFormState(prev => ({ ...prev, isSuccess: false }));
        }, 5000);
      }, 1500);
    }
  };

  const handleInputChange = (field: 'name' | 'email', value: string) => {
    setFormState(prev => ({
      ...prev,
      [field]: value,
      errors: { ...prev.errors, [field]: '' },
    }));
  };

  const handleInputBlur = (field: 'name' | 'email') => {
    setFormState(prev => ({
      ...prev,
      touched: { ...prev.touched, [field]: true },
      errors: {
        ...prev.errors,
        [field]: field === 'name'
          ? (prev.name.trim() === '' ? 'Please enter your name' : '')
          : (prev.email.trim() === ''
              ? 'Please enter your email'
              : !validateEmail(prev.email)
                ? 'Please enter a valid email'
                : ''),
      },
    }));
  };

  return (
    <>
        {/* Hero Section */}
        <Hero
          headline="Defend the Legacy. Fight for Equity. Protect Democracy."
          showDebugSpacing={showDebug}
        />

        {/* Our Work / Pillars Section - immediately after hero */}
        <PillarsSection />

        {/* Content wrapper */}
        <div className="bg-white">
        {/* Media / Stories Section - Compact to fit in viewport */}
        <section
          className="border-t-4 border-[#FDC500]"
          style={{ padding: 'clamp(3rem, 8vw, 8rem) clamp(1rem, 4vw, 5.75rem)' }}
        >
          <div className="max-w-[1400px] mx-auto">
            {/* Featured Story - Grid layout to match cards below */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 items-center">
              {/* Text Content - full width on mobile, left column on desktop */}
              <div className="flex flex-col justify-center">
                <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">
                  From Our Substack
                </p>
                <h2 className="font-gunterz font-bold leading-tight mb-3" style={{ fontSize: 'clamp(1.5rem, 0.75rem + 3vw, 2.5rem)' }}>
                  Turning Conley Monk's fight into a national reckoning toward repair.
                </h2>
                <p className="text-gray-600 mb-4" style={{ fontSize: 'clamp(0.9rem, 1.5vw, 1rem)' }}>
                  Read more about the Conley Monk story
                </p>
                <div>
                  <a
                    href="https://blackveteransproject.substack.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                      inline-flex items-center
                      px-6 py-2.5 text-base font-bold tracking-wide
                      rounded-full border-2 border-black bg-white text-black
                      transition-all duration-300 hover:bg-black hover:text-[#FDC500] hover:border-black active:scale-95
                    "
                  >
                    Read it on Substack
                    <svg className="w-4 h-4 ml-2 -rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </a>
                </div>
              </div>

              {/* Featured Image - full width on mobile, right column on desktop */}
              <div className="relative group cursor-pointer">
                {/* Image container with shadow and lift */}
                <div className="relative aspect-[16/10] overflow-hidden shadow-lg group-hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-1">
                  <img
                    src="/images/monk-hero.jpg"
                    alt="Conley Monk with veterans"
                    className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-105"
                    loading="eager"
                    decoding="async"
                    fetchPriority="high"
                  />
                  {/* Subtle overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                {/* Bottom gold bar accent */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#FDC500] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </div>
            </div>

            {/* Secondary Stories Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Story Card 1 */}
              <button
                onClick={() => setSubstackModal({
                  isOpen: true,
                  url: 'https://legaldefensefund.substack.com/p/mississippi-workshop',
                  title: 'Historic Workshop in Mississippi'
                })}
                className="group bg-white border border-gray-200 rounded-2xl overflow-hidden text-left transition-all duration-300 hover:shadow-lg"
              >
                {/* Gold top accent */}
                <div className="h-1 bg-[#FDC500]" />

                {/* Image */}
                <div className="h-56 overflow-hidden">
                  <img
                    src="/images/mississippi-workshop.png"
                    alt="Historic photo of Black veterans in uniform"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Content */}
                <div className="p-6">
                  <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#FDC500]">Substack</span>
                  <h3 className="font-ontika font-medium text-xl text-black leading-tight mt-3 mb-3 group-hover:text-[#FDC500] transition-colors">
                    Historic Workshop in Mississippi
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    A gathering of Black veterans and their families in the heart of Mississippi — documenting what repair looks like on the ground.
                  </p>

                  {/* Footer */}
                  <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200">
                    <span className="text-sm text-gray-400">Jan 15, 2025</span>
                    <span className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-black group-hover:text-[#FDC500] transition-colors">
                      Read More
                      <svg className="w-4 h-4 -rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </span>
                  </div>
                </div>
              </button>

              {/* Story Card 2 */}
              <button
                onClick={() => setSubstackModal({
                  isOpen: true,
                  url: 'https://legaldefensefund.substack.com/p/lived-experiences',
                  title: 'Voices of Service'
                })}
                className="group bg-white border border-gray-200 rounded-2xl overflow-hidden text-left transition-all duration-300 hover:shadow-lg"
              >
                {/* Gold top accent */}
                <div className="h-1 bg-[#FDC500]" />

                {/* Image */}
                <div className="h-56 bg-gray-100 overflow-hidden">
                  <img
                    src="/images/optimized/conley-monk.webp"
                    alt="Veteran with American Legion certificate"
                    className="w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                </div>

                {/* Content */}
                <div className="p-6">
                  <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#FDC500]">Substack</span>
                  <h3 className="font-ontika font-medium text-xl text-black leading-tight mt-3 mb-3 group-hover:text-[#FDC500] transition-colors">
                    Voices of Service
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Portraits and testimonies from veterans navigating a system that was never built to honor them.
                  </p>

                  {/* Footer */}
                  <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200">
                    <span className="text-sm text-gray-400">Jan 8, 2025</span>
                    <span className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-black group-hover:text-[#FDC500] transition-colors">
                      Read More
                      <svg className="w-4 h-4 -rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </span>
                  </div>
                </div>
              </button>
            </div>

            {/* Debug spacing info */}
            {showDebug && (
              <div className="mt-8 p-4 bg-purple-100 border-2 border-purple-500 font-mono text-xs">
                <p className="font-bold mb-2">📐 Media Section Specs:</p>
                <p>Background: <span className="text-purple-700">white</span></p>
                <p>Border top: <span className="text-purple-700">4px solid gold</span></p>
                <p>Padding Y: <span className="text-purple-700">48px → 64px → 96px</span></p>
                <p>Featured grid: <span className="text-purple-700">1 col → 2 col at lg</span></p>
                <p>Secondary cards: <span className="text-purple-700">2 col grid at md</span></p>
              </div>
            )}
          </div>
        </section>

        </div>

      {/* Substack Redirect Modal */}
      <AnimatePresence>
        {substackModal.isOpen && (
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0 }}
            transition={prefersReducedMotion ? { duration: 0 } : undefined}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            onClick={() => setSubstackModal({ ...substackModal, isOpen: false })}
          >
            {/* Backdrop */}
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={prefersReducedMotion ? { duration: 0 } : undefined}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />

            {/* Modal */}
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.9, y: 20 }}
              transition={prefersReducedMotion ? { duration: 0 } : { type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative bg-black border-4 border-[#FDC500] p-8 md:p-12 max-w-lg w-full text-center"
            >
              {/* Close button */}
              <button
                onClick={() => setSubstackModal({ ...substackModal, isOpen: false })}
                className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Substack Icon */}
              <motion.div
                initial={prefersReducedMotion ? false : { scale: 0 }}
                animate={{ scale: 1 }}
                transition={prefersReducedMotion ? { duration: 0 } : { delay: 0.1, type: "spring", damping: 15 }}
                className="w-20 h-20 mx-auto mb-6 bg-[#FDC500] rounded-full flex items-center justify-center"
              >
                <svg className="w-10 h-10 text-black" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z"/>
                </svg>
              </motion.div>

              {/* Content */}
              <motion.div
                initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={prefersReducedMotion ? { duration: 0 } : { delay: 0.15 }}
              >
                <p className="text-[#FDC500] text-xs font-bold uppercase tracking-widest mb-3">
                  Leaving BVP
                </p>
                <h2 className="text-white text-2xl md:text-3xl font-bold mb-4">
                  {substackModal.title}
                </h2>
                <p className="text-gray-400 mb-8">
                  You're about to visit our Substack where we share stories, updates, and insights from the movement.
                </p>
              </motion.div>

              {/* Buttons */}
              <motion.div
                initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={prefersReducedMotion ? { duration: 0 } : { delay: 0.2 }}
                className="flex flex-col sm:flex-row gap-3 justify-center"
              >
                <a
                  href={substackModal.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    px-8 py-4 text-lg font-bold tracking-wide
                    rounded-full border-4 border-[#FDC500] bg-[#FDC500] text-black
                    hover:bg-white hover:border-white
                    transition-all duration-300 active:scale-95
                    inline-flex items-center justify-center gap-2
                  "
                  onClick={() => setSubstackModal({ ...substackModal, isOpen: false })}
                >
                  Continue to Substack
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
                <button
                  onClick={() => setSubstackModal({ ...substackModal, isOpen: false })}
                  className="
                    px-8 py-4 text-lg font-bold tracking-wide
                    text-gray-400 hover:text-white
                    transition-colors
                  "
                >
                  Stay Here
                </button>
              </motion.div>

              {/* Decorative elements */}
              <div className="absolute -top-2 -left-2 w-4 h-4 border-t-4 border-l-4 border-[#FDC500]" />
              <div className="absolute -top-2 -right-2 w-4 h-4 border-t-4 border-r-4 border-[#FDC500]" />
              <div className="absolute -bottom-2 -left-2 w-4 h-4 border-b-4 border-l-4 border-[#FDC500]" />
              <div className="absolute -bottom-2 -right-2 w-4 h-4 border-b-4 border-r-4 border-[#FDC500]" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </>
  );
}
