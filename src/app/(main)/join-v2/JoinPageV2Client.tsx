'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/Button';

interface JoinPageV2ClientProps {
  content: {
    heroSubtitle: string;
    heroTitle: string;
    heroDescription: string;
  };
}

type MemberType = 'veteran' | 'family' | 'descendant' | 'ally';
type Interest = 'narrative' | 'litigation' | 'mobilization';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  zipCode: string;
  phone: string;
  memberTypes: MemberType[];
  interests: Interest[];
  subscribeSubstack: boolean;
  emailConsent: boolean;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  emailConsent?: string;
}

const MEMBER_TYPE_OPTIONS: { value: MemberType; label: string }[] = [
  { value: 'veteran', label: 'Black Veteran' },
  { value: 'family', label: 'Military Family Member' },
  { value: 'descendant', label: 'Black Veteran Descendant' },
  { value: 'ally', label: 'Ally / Supporter' },
];

const INTEREST_OPTIONS: { value: Interest; label: string }[] = [
  { value: 'narrative', label: 'Narrative Hub / Storytelling' },
  { value: 'litigation', label: 'Impact Litigation' },
  { value: 'mobilization', label: 'Advocacy & Mobilization' },
];

export function JoinPageV2Client({ content }: JoinPageV2ClientProps) {
  const searchParams = useSearchParams();

  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    zipCode: '',
    phone: '',
    memberTypes: [],
    interests: [],
    subscribeSubstack: true, // Pre-checked
    emailConsent: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Pre-select interest based on URL param (e.g., /join-v2?interest=litigation)
  useEffect(() => {
    const interest = searchParams.get('interest') as Interest | null;
    if (interest && ['narrative', 'litigation', 'mobilization'].includes(interest)) {
      setFormData(prev => ({
        ...prev,
        interests: [interest],
      }));
    }
  }, [searchParams]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.emailConsent) {
      newErrors.emailConsent = 'Please consent to receive emails';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const payload = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        zipCode: formData.zipCode || undefined,
        phone: formData.phone || undefined,
        signupAs: formData.memberTypes.includes('veteran') ? 'veteran' : 'supporter',
        membershipType: formData.memberTypes.join(', '),
        interests: formData.interests.join(', '),
      };

      const response = await fetch('/api/advocate-signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error('Submission failed');

      setIsSuccess(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      console.error('Form submission error:', error);
      setErrors({ email: 'Something went wrong. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleMemberType = (type: MemberType) => {
    setFormData(prev => ({
      ...prev,
      memberTypes: prev.memberTypes.includes(type)
        ? prev.memberTypes.filter(t => t !== type)
        : [...prev.memberTypes, type],
    }));
  };

  const toggleInterest = (interest: Interest) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest],
    }));
  };

  // Success View
  if (isSuccess) {
    return (
      <div className="min-h-screen bg-white">
        <section className="relative h-[50vh] min-h-[400px] flex items-end overflow-hidden bg-black">
          <img
            src="/images/join-us-hero.jpg"
            alt="Black veterans standing together"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/70" />
          <div className="relative z-10 max-w-[1400px] mx-auto w-full px-6 md:px-12 lg:px-[5.75rem] pb-12 md:pb-16">
            <h1 className="font-display font-bold text-white uppercase text-4xl md:text-5xl lg:text-6xl">
              Welcome to the Movement
            </h1>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="max-w-3xl mx-auto px-6 md:px-12 text-center">
            <div className="w-20 h-20 bg-bvp-gold rounded-full flex items-center justify-center mx-auto mb-8">
              <svg className="w-10 h-10 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="font-display text-3xl md:text-4xl uppercase mb-6">Thank You</h2>
            <p className="font-body text-xl text-gray-600 leading-relaxed mb-8">
              Thank you for joining us. Together, we&apos;re building a more equitable future for Black veterans and their families.
            </p>
            <Button href="/" variant="primary" size="lg">
              Return Home
            </Button>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Full height with image */}
      <section className="relative h-screen min-h-[600px] max-h-[1200px] flex items-end overflow-hidden bg-black">
        <img
          src="/images/join-us-hero.jpg"
          alt="Black veterans standing together"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/70" />
        <div className="relative z-10 max-w-[1400px] mx-auto w-full px-6 md:px-12 lg:px-[5.75rem] pb-12 md:pb-16">
          <p className="text-sm uppercase tracking-widest mb-4 text-white/60">
            {content.heroSubtitle}
          </p>
          <h1 className="font-display font-bold text-white uppercase text-4xl md:text-5xl lg:text-6xl">
            {content.heroTitle}
          </h1>
        </div>
      </section>

      {/* Two-Column Layout: Text Left, Form Right */}
      <section className="border-b border-gray-200">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2">

          {/* Left Column - Description */}
          <div className="lg:border-r border-gray-200 px-6 md:px-12 lg:px-[5.75rem] py-12 md:py-16 lg:py-20">
            <div className="max-w-xl space-y-6">
              <p className="font-body text-lg md:text-xl text-gray-800 leading-relaxed">
                BVP is building the first comprehensive movement for reparative justice for Black veterans and military families. This work only moves when the people most affected, and those who stand with them, are organized.
              </p>

              <p className="font-body text-lg md:text-xl text-gray-800 leading-relaxed">
                Our membership corps is the foundation of our work: a growing body of veterans, families, advocates, allies, artists, scholars, and content-creators whose voices we carry into Congress, into the courts, and into public memory.
              </p>

              <p className="font-body text-lg md:text-xl text-gray-800 leading-relaxed">
                When you join BVP, you become <strong className="font-bold text-black">a steward of repair:</strong> someone who helps safeguard the truth, advance accountability, and ensure Black history cannot be erased or ignored.
              </p>

              <p className="font-body text-lg md:text-xl text-gray-800 leading-relaxed">
                Together, we&apos;re building the case, telling the story, and organizing to make repair, equity, and democracy real.
              </p>
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="bg-gray-50 px-6 md:px-12 lg:px-[5.75rem] py-12 md:py-16 lg:py-20">
            <form onSubmit={handleSubmit} className="max-w-lg">
              {/* Form Header */}
              <div className="mb-8">
                <h2 className="font-display text-2xl md:text-3xl uppercase tracking-wide text-bvp-navy mb-2">
                  Get Involved
                </h2>
                <p className="font-body text-gray-600">
                  Join our movement for repair, equity, and justice.
                </p>
              </div>

              {/* Name Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="firstName" className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                    First Name <span className="text-bvp-navy">*</span>
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                    className={`w-full bg-white border ${errors.firstName ? 'border-red-500' : 'border-gray-300'} text-gray-900 px-4 py-3 min-h-[48px] focus:outline-none focus:border-bvp-navy focus:ring-1 focus:ring-bvp-navy transition-colors placeholder:text-gray-400`}
                    placeholder="Your first name"
                  />
                  {errors.firstName && <p className="text-red-600 text-sm mt-1">{errors.firstName}</p>}
                </div>

                <div>
                  <label htmlFor="lastName" className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                    Last Name <span className="text-bvp-navy">*</span>
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                    className={`w-full bg-white border ${errors.lastName ? 'border-red-500' : 'border-gray-300'} text-gray-900 px-4 py-3 min-h-[48px] focus:outline-none focus:border-bvp-navy focus:ring-1 focus:ring-bvp-navy transition-colors placeholder:text-gray-400`}
                    placeholder="Your last name"
                  />
                  {errors.lastName && <p className="text-red-600 text-sm mt-1">{errors.lastName}</p>}
                </div>
              </div>

              {/* Email */}
              <div className="mb-4">
                <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                  Email <span className="text-bvp-navy">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className={`w-full bg-white border ${errors.email ? 'border-red-500' : 'border-gray-300'} text-gray-900 px-4 py-3 min-h-[48px] focus:outline-none focus:border-bvp-navy focus:ring-1 focus:ring-bvp-navy transition-colors placeholder:text-gray-400`}
                  placeholder="you@example.com"
                />
                {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
              </div>

              {/* Zip & Phone Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                <div>
                  <label htmlFor="zipCode" className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                    Zip Code
                  </label>
                  <input
                    type="text"
                    id="zipCode"
                    value={formData.zipCode}
                    onChange={(e) => setFormData(prev => ({ ...prev, zipCode: e.target.value }))}
                    className="w-full bg-white border border-gray-300 text-gray-900 px-4 py-3 min-h-[48px] focus:outline-none focus:border-bvp-navy focus:ring-1 focus:ring-bvp-navy transition-colors placeholder:text-gray-400"
                    placeholder="12345"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                    Phone <span className="text-gray-400">(optional)</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    className="w-full bg-white border border-gray-300 text-gray-900 px-4 py-3 min-h-[48px] focus:outline-none focus:border-bvp-navy focus:ring-1 focus:ring-bvp-navy transition-colors placeholder:text-gray-400"
                    placeholder="(555) 123-4567"
                  />
                </div>
              </div>

              {/* Member Type Selection */}
              <div className="mb-6">
                <p className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">
                  I am a <span className="text-gray-400">(select all that apply)</span>
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {MEMBER_TYPE_OPTIONS.map((option) => {
                    const isSelected = formData.memberTypes.includes(option.value);
                    return (
                      <motion.label
                        key={option.value}
                        whileTap={{ scale: 0.98 }}
                        className={`flex items-center gap-3 p-4 border cursor-pointer transition-all duration-200 bg-white ${
                          isSelected
                            ? 'border-bvp-navy bg-bvp-navy/5'
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        <motion.div
                          animate={{
                            backgroundColor: isSelected ? '#232651' : 'transparent',
                            borderColor: isSelected ? '#232651' : '#d1d5db',
                          }}
                          transition={{ duration: 0.2 }}
                          className="w-5 h-5 border-2 flex items-center justify-center flex-shrink-0"
                        >
                          <AnimatePresence>
                            {isSelected && (
                              <motion.svg
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0, opacity: 0 }}
                                transition={{ duration: 0.15 }}
                                className="w-3 h-3 text-white"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                              </motion.svg>
                            )}
                          </AnimatePresence>
                        </motion.div>
                        <span className="font-body text-gray-800">{option.label}</span>
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => toggleMemberType(option.value)}
                          className="sr-only"
                        />
                      </motion.label>
                    );
                  })}
                </div>
              </div>

              {/* Interest Selection */}
              <div className="mb-6">
                <p className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">
                  I&apos;m interested in <span className="text-gray-400">(select all that apply)</span>
                </p>
                <div className="space-y-3">
                  {INTEREST_OPTIONS.map((option) => {
                    const isSelected = formData.interests.includes(option.value);
                    return (
                      <motion.label
                        key={option.value}
                        whileTap={{ scale: 0.98 }}
                        className={`flex items-center gap-3 p-4 border cursor-pointer transition-all duration-200 bg-white ${
                          isSelected
                            ? 'border-bvp-navy bg-bvp-navy/5'
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        <motion.div
                          animate={{
                            backgroundColor: isSelected ? '#232651' : 'transparent',
                            borderColor: isSelected ? '#232651' : '#d1d5db',
                          }}
                          transition={{ duration: 0.2 }}
                          className="w-5 h-5 border-2 flex items-center justify-center flex-shrink-0"
                        >
                          <AnimatePresence>
                            {isSelected && (
                              <motion.svg
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0, opacity: 0 }}
                                transition={{ duration: 0.15 }}
                                className="w-3 h-3 text-white"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                              </motion.svg>
                            )}
                          </AnimatePresence>
                        </motion.div>
                        <span className="font-body text-gray-800">{option.label}</span>
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => toggleInterest(option.value)}
                          className="sr-only"
                        />
                      </motion.label>
                    );
                  })}
                </div>
              </div>

              {/* Substack Checkbox - Pre-checked */}
              <div className="mb-6">
                <motion.label
                  whileTap={{ scale: 0.98 }}
                  className={`flex items-start gap-3 p-4 border cursor-pointer transition-all duration-200 bg-white ${
                    formData.subscribeSubstack
                      ? 'border-bvp-navy bg-bvp-navy/5'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <motion.div
                    animate={{
                      backgroundColor: formData.subscribeSubstack ? '#232651' : 'transparent',
                      borderColor: formData.subscribeSubstack ? '#232651' : '#d1d5db',
                    }}
                    transition={{ duration: 0.2 }}
                    className="w-5 h-5 mt-0.5 border-2 flex items-center justify-center flex-shrink-0"
                  >
                    <AnimatePresence>
                      {formData.subscribeSubstack && (
                        <motion.svg
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0, opacity: 0 }}
                          transition={{ duration: 0.15 }}
                          className="w-3 h-3 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </motion.svg>
                      )}
                    </AnimatePresence>
                  </motion.div>
                  <div>
                    <span className="font-body text-gray-800 block">Subscribe to our Substack</span>
                    <span className="font-body text-gray-500 text-sm">
                      Get The Dark Green Report — stories, research, and updates from the movement.
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    checked={formData.subscribeSubstack}
                    onChange={(e) => setFormData(prev => ({ ...prev, subscribeSubstack: e.target.checked }))}
                    className="sr-only"
                  />
                </motion.label>
              </div>

              {/* Email Consent */}
              <div className="mb-8">
                <motion.label
                  whileTap={{ scale: 0.98 }}
                  className={`flex items-start gap-3 p-4 border cursor-pointer transition-all duration-200 bg-white ${
                    formData.emailConsent
                      ? 'border-bvp-navy bg-bvp-navy/5'
                      : errors.emailConsent ? 'border-red-500' : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <motion.div
                    animate={{
                      backgroundColor: formData.emailConsent ? '#232651' : 'transparent',
                      borderColor: formData.emailConsent ? '#232651' : '#d1d5db',
                    }}
                    transition={{ duration: 0.2 }}
                    className="w-5 h-5 mt-0.5 border-2 flex items-center justify-center flex-shrink-0"
                  >
                    <AnimatePresence>
                      {formData.emailConsent && (
                        <motion.svg
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0, opacity: 0 }}
                          transition={{ duration: 0.15 }}
                          className="w-3 h-3 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </motion.svg>
                      )}
                    </AnimatePresence>
                  </motion.div>
                  <div>
                    <span className="font-body text-gray-800 block">
                      I consent to receive email communications from Black Veterans Project <span className="text-bvp-navy font-bold">*</span>
                    </span>
                    <span className="font-body text-gray-500 text-sm">
                      You can unsubscribe at any time. See our <a href="/privacy" className="underline hover:text-bvp-navy">Privacy Policy</a>.
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    checked={formData.emailConsent}
                    onChange={(e) => setFormData(prev => ({ ...prev, emailConsent: e.target.checked }))}
                    className="sr-only"
                  />
                </motion.label>
                {errors.emailConsent && <p className="text-red-600 text-sm mt-2">{errors.emailConsent}</p>}
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                variant="primary"
                size="lg"
                fullWidth
                disabled={isSubmitting}
                className="font-display uppercase tracking-wider"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Submitting...
                  </span>
                ) : (
                  <>Get Involved <span className="ml-2">→</span></>
                )}
              </Button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
