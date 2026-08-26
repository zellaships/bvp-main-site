'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/Button';

// ============================================
// JOIN FORM 2.0 — CONSOLIDATED SIGNUP
// Single form, checkbox segmentation, low friction
// ============================================

interface JoinFormProps {
  onSuccess?: () => void;
  className?: string;
}

type MemberType = 'veteran' | 'family' | 'descendant' | 'ally';
type Interest = 'narrative' | 'litigation' | 'mobilization' | 'all';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  zipCode: string;
  phone: string;
  memberTypes: MemberType[];
  interests: Interest[];
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

const INTEREST_OPTIONS: { value: Interest; label: string; description: string }[] = [
  { value: 'narrative', label: 'Narrative Hub / Storytelling', description: 'Stories from the community' },
  { value: 'litigation', label: 'Impact Litigation', description: 'Legal action updates' },
  { value: 'mobilization', label: 'Advocacy & Mobilization', description: 'Events and actions' },
  { value: 'all', label: 'All of the above', description: 'Stay informed on everything' },
];

export function JoinForm({ onSuccess, className = '' }: JoinFormProps) {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    zipCode: '',
    phone: '',
    memberTypes: [],
    interests: [],
    emailConsent: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

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
      // Build Action Network payload
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

      if (!response.ok) {
        throw new Error('Submission failed');
      }

      setIsSuccess(true);
      onSuccess?.();
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
    setFormData(prev => {
      // If selecting "all", clear others and just set "all"
      if (interest === 'all') {
        return {
          ...prev,
          interests: prev.interests.includes('all') ? [] : ['all'],
        };
      }
      // If selecting a specific interest, remove "all" if present
      const newInterests = prev.interests.filter(i => i !== 'all');
      return {
        ...prev,
        interests: newInterests.includes(interest)
          ? newInterests.filter(i => i !== interest)
          : [...newInterests, interest],
      };
    });
  };

  // Success state
  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`bg-black text-white p-8 md:p-12 ${className}`}
      >
        <div className="text-center max-w-lg mx-auto">
          <div className="w-16 h-16 bg-bvp-gold rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="font-display text-2xl md:text-3xl uppercase mb-4">
            Welcome to the Movement
          </h3>
          <p className="font-body text-gray-300 text-lg">
            Thank you for joining us. Together, we&apos;re building a more equitable future for Black veterans and their families.
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={`bg-black text-white p-6 md:p-10 lg:p-12 ${className}`}>
      {/* Form Header */}
      <div className="mb-8">
        <h3 className="font-display text-xl md:text-2xl uppercase tracking-wide text-bvp-gold mb-2">
          Get Involved
        </h3>
        <p className="font-body text-gray-400">
          Join our movement for repair, equity, and justice.
        </p>
      </div>

      {/* Name Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label htmlFor="firstName" className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
            First Name <span className="text-bvp-gold">*</span>
          </label>
          <input
            type="text"
            id="firstName"
            value={formData.firstName}
            onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
            className={`w-full bg-white/10 border ${errors.firstName ? 'border-red-500' : 'border-white/20'} text-white px-4 py-3 min-h-[48px] focus:outline-none focus:border-bvp-gold transition-colors placeholder:text-gray-500`}
            placeholder="Your first name"
          />
          {errors.firstName && <p className="text-red-400 text-sm mt-1">{errors.firstName}</p>}
        </div>

        <div>
          <label htmlFor="lastName" className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
            Last Name <span className="text-bvp-gold">*</span>
          </label>
          <input
            type="text"
            id="lastName"
            value={formData.lastName}
            onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
            className={`w-full bg-white/10 border ${errors.lastName ? 'border-red-500' : 'border-white/20'} text-white px-4 py-3 min-h-[48px] focus:outline-none focus:border-bvp-gold transition-colors placeholder:text-gray-500`}
            placeholder="Your last name"
          />
          {errors.lastName && <p className="text-red-400 text-sm mt-1">{errors.lastName}</p>}
        </div>
      </div>

      {/* Email */}
      <div className="mb-4">
        <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
          Email <span className="text-bvp-gold">*</span>
        </label>
        <input
          type="email"
          id="email"
          value={formData.email}
          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
          className={`w-full bg-white/10 border ${errors.email ? 'border-red-500' : 'border-white/20'} text-white px-4 py-3 min-h-[48px] focus:outline-none focus:border-bvp-gold transition-colors placeholder:text-gray-500`}
          placeholder="you@example.com"
        />
        {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
      </div>

      {/* Zip & Phone Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div>
          <label htmlFor="zipCode" className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
            Zip Code
          </label>
          <input
            type="text"
            id="zipCode"
            value={formData.zipCode}
            onChange={(e) => setFormData(prev => ({ ...prev, zipCode: e.target.value }))}
            className="w-full bg-white/10 border border-white/20 text-white px-4 py-3 min-h-[48px] focus:outline-none focus:border-bvp-gold transition-colors placeholder:text-gray-500"
            placeholder="12345"
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
            Phone <span className="text-gray-500">(optional)</span>
          </label>
          <input
            type="tel"
            id="phone"
            value={formData.phone}
            onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
            className="w-full bg-white/10 border border-white/20 text-white px-4 py-3 min-h-[48px] focus:outline-none focus:border-bvp-gold transition-colors placeholder:text-gray-500"
            placeholder="(555) 123-4567"
          />
        </div>
      </div>

      {/* Member Type Selection */}
      <div className="mb-8">
        <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">
          I am a <span className="text-gray-500">(select all that apply)</span>
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {MEMBER_TYPE_OPTIONS.map((option) => (
            <label
              key={option.value}
              className={`flex items-center gap-3 p-4 border cursor-pointer transition-all ${
                formData.memberTypes.includes(option.value)
                  ? 'border-bvp-gold bg-bvp-gold/10'
                  : 'border-white/20 hover:border-white/40'
              }`}
            >
              <div className={`w-5 h-5 border-2 flex items-center justify-center ${
                formData.memberTypes.includes(option.value)
                  ? 'border-bvp-gold bg-bvp-gold'
                  : 'border-white/40'
              }`}>
                {formData.memberTypes.includes(option.value) && (
                  <svg className="w-3 h-3 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
              <span className="font-body text-white">{option.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Interest Selection */}
      <div className="mb-8">
        <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">
          I&apos;m interested in <span className="text-gray-500">(select all that apply)</span>
        </p>
        <div className="space-y-3">
          {INTEREST_OPTIONS.map((option) => (
            <label
              key={option.value}
              className={`flex items-start gap-3 p-4 border cursor-pointer transition-all ${
                formData.interests.includes(option.value)
                  ? 'border-bvp-gold bg-bvp-gold/10'
                  : 'border-white/20 hover:border-white/40'
              }`}
            >
              <div className={`w-5 h-5 mt-0.5 border-2 flex-shrink-0 flex items-center justify-center ${
                formData.interests.includes(option.value)
                  ? 'border-bvp-gold bg-bvp-gold'
                  : 'border-white/40'
              }`}>
                {formData.interests.includes(option.value) && (
                  <svg className="w-3 h-3 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
              <div>
                <span className="font-body text-white block">{option.label}</span>
                <span className="font-body text-gray-500 text-sm">{option.description}</span>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Email Consent */}
      <div className="mb-8">
        <label
          className={`flex items-start gap-3 p-4 border cursor-pointer transition-all ${
            formData.emailConsent
              ? 'border-bvp-gold bg-bvp-gold/10'
              : errors.emailConsent ? 'border-red-500' : 'border-white/20 hover:border-white/40'
          }`}
        >
          <div className={`w-5 h-5 mt-0.5 border-2 flex-shrink-0 flex items-center justify-center ${
            formData.emailConsent
              ? 'border-bvp-gold bg-bvp-gold'
              : 'border-white/40'
          }`}>
            {formData.emailConsent && (
              <svg className="w-3 h-3 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            )}
          </div>
          <div>
            <span className="font-body text-white block">
              I consent to receive email communications from Black Veterans Project <span className="text-bvp-gold">*</span>
            </span>
            <span className="font-body text-gray-500 text-sm">
              You can unsubscribe at any time. See our <a href="/privacy" className="underline hover:text-white">Privacy Policy</a>.
            </span>
          </div>
          <input
            type="checkbox"
            checked={formData.emailConsent}
            onChange={(e) => setFormData(prev => ({ ...prev, emailConsent: e.target.checked }))}
            className="sr-only"
          />
        </label>
        {errors.emailConsent && <p className="text-red-400 text-sm mt-2">{errors.emailConsent}</p>}
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
          <span className="flex items-center gap-2">
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            Joining...
          </span>
        ) : (
          <>Join the Movement <span className="ml-2">→</span></>
        )}
      </Button>
    </form>
  );
}
