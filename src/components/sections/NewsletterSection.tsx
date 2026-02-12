'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export function NewsletterSection() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    errors: { name: '', email: '' },
    touched: { name: false, email: false },
    isSubmitting: false,
    isSuccess: false,
  });
  const [addToSubstack, setAddToSubstack] = useState(false);

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = (e: React.FormEvent) => {
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
    <section className="bg-[#FDC500] relative overflow-hidden py-16 md:py-24 lg:py-[140px] px-6 md:px-[92px]">
      {/* Camo pattern — full width behind content */}
      <img
        src="/images/camo-footer.png"
        alt=""
        aria-hidden="true"
        className="absolute bottom-0 left-0 w-full h-auto pointer-events-none select-none"
      />

      <div className="max-w-[1400px] mx-auto relative z-10">
        <div className="max-w-xl ml-auto">
            <h2 className="font-display font-bold leading-[1.1] mb-4 text-black" style={{ fontSize: 'clamp(2rem, 1rem + 4vw, 3.5rem)' }}>
              Join the Fight for Repair
            </h2>
            <p className="text-black/70 text-lg leading-relaxed mb-8">
              Get updates on our work, stories from the community, and ways to take action.
            </p>

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          {/* Name and Email Fields - Pill style */}
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Name Input */}
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Your name"
                value={formState.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                onBlur={() => handleInputBlur('name')}
                className={`
                  w-full px-6 py-4 bg-transparent border-2 rounded-full text-black placeholder:text-black/50
                  focus:outline-none transition-all duration-300
                  ${formState.touched.name && formState.errors.name
                    ? 'border-[#A63D2F]'
                    : 'border-[#232651]/30 focus:border-[#232651]'
                  }
                `}
              />
              <AnimatePresence>
                {formState.touched.name && formState.errors.name && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="absolute left-6 -bottom-6 text-[#A63D2F] text-sm"
                  >
                    {formState.errors.name}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            {/* Email Input */}
            <div className="flex-1 relative">
              <input
                type="email"
                placeholder="Your email"
                value={formState.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                onBlur={() => handleInputBlur('email')}
                className={`
                  w-full px-6 py-4 bg-transparent border-2 rounded-full text-black placeholder:text-black/50
                  focus:outline-none transition-all duration-300
                  ${formState.touched.email && formState.errors.email
                    ? 'border-[#A63D2F]'
                    : 'border-[#232651]/30 focus:border-[#232651]'
                  }
                `}
              />
              <AnimatePresence>
                {formState.touched.email && formState.errors.email && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="absolute left-6 -bottom-6 text-[#A63D2F] text-sm"
                  >
                    {formState.errors.email}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Substack Checkbox */}
          <label className="flex items-start gap-3 cursor-pointer group mt-8">
            <div className="relative mt-0.5">
              <input
                type="checkbox"
                checked={addToSubstack}
                onChange={(e) => setAddToSubstack(e.target.checked)}
                className="sr-only"
              />
              <div className={`w-5 h-5 border-2 rounded transition-all ${addToSubstack ? 'bg-[#232651] border-[#232651]' : 'border-[#232651]/30 group-hover:border-[#232651]/60'}`}>
                {addToSubstack && (
                  <svg className="w-full h-full text-white p-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
            </div>
            <span className="text-sm text-black/70 leading-relaxed">
              Add me to Substack
            </span>
          </label>

            {/* Button + Privacy note inline */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 mt-4">
              <button
                type="submit"
                disabled={formState.isSubmitting}
                className={`
                  px-10 py-4 text-lg font-bold tracking-wide rounded-full border-2
                  transition-all duration-300 active:scale-95 flex-shrink-0
                  ${formState.isSuccess
                    ? 'bg-[#56C035] border-[#56C035] text-white'
                    : 'bg-black border-black text-white hover:bg-white hover:text-black'
                  }
                  ${formState.isSubmitting ? 'cursor-wait' : ''}
                `}
              >
                {formState.isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                    />
                    Joining...
                  </span>
                ) : formState.isSuccess ? (
                  <span className="flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    You're In!
                  </span>
                ) : (
                  'Sign Up'
                )}
              </button>

              <p className="text-black/60 text-sm">
                By signing up, you agree to receive email updates from Black Veterans Project. Unsubscribe anytime.{' '}
                <Link href="/privacy" className="relative group">
                  Privacy Policy
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#F44708] group-hover:w-full transition-all duration-300" />
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
