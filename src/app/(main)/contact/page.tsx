"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/Button";

// ============================================
// TYPES
// ============================================
type ContactTopic = "" | "press" | "partnership" | "speaking" | "general" | "other";

interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  topic: ContactTopic;
  message: string;
  // Honeypot field - should always be empty (bots fill it, humans don't see it)
  website: string;
}

// ============================================
// SOCIAL LINK COMPONENT
// ============================================
interface SocialLinkProps {
  platform: string;
  handle: string;
  href: string;
}

function SocialLink({ platform, handle, href }: SocialLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex justify-between items-center group min-h-[44px] py-2"
    >
      <span className="text-[17px] font-bold uppercase tracking-wide group-hover:text-bvp-gold transition-colors">
        {platform}
      </span>
      <span className="text-[17px] text-gray-400 group-hover:text-white transition-colors">
        {handle}
      </span>
    </a>
  );
}

// ============================================
// CUSTOM DROPDOWN COMPONENT
// ============================================
interface TopicDropdownProps {
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
}

function TopicDropdown({ value, onChange, options }: TopicDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find(opt => opt.value === value);
  const displayText = selectedOption?.label || "Select a topic";

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setIsOpen(false);
    }
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  return (
    <div>
      <label
        htmlFor="contact-topic"
        className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2"
      >
        I'm reaching out about
      </label>
      <div className="relative" ref={dropdownRef}>
        <button
          type="button"
          id="contact-topic"
          onClick={() => setIsOpen(!isOpen)}
          className={`w-full py-3 bg-transparent border-b text-left text-base transition-colors focus:outline-none ${
            isOpen ? "border-black" : "border-gray-300"
          } ${!value ? "text-gray-400" : "text-black"}`}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
        >
          {displayText}
        </button>

        <svg
          className={`absolute right-0 top-1/2 -translate-y-1/2 w-3 h-2 pointer-events-none transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
          viewBox="0 0 12 8"
          fill="none"
          aria-hidden="true"
        >
          <path d="M1 1.5L6 6.5L11 1.5" stroke="#999" strokeWidth="1.5" strokeLinecap="round" />
        </svg>

        {isOpen && (
          <div
            className="absolute z-50 top-full left-0 right-0 mt-1 bg-white border border-gray-200 shadow-lg max-h-60 overflow-y-auto"
            role="listbox"
          >
            {options.map((opt) => (
              <div
                key={opt.value}
                className={`px-4 py-3 cursor-pointer transition-colors hover:bg-gray-100 ${
                  value === opt.value ? "bg-gray-50 font-medium" : ""
                }`}
                role="option"
                aria-selected={value === opt.value}
                onClick={() => {
                  onChange(opt.value);
                  setIsOpen(false);
                }}
              >
                {opt.label}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================
// TYPES FOR VALIDATION
// ============================================
type ContactFormErrors = {
  email?: string;
};

// ============================================
// MAIN CONTACT PAGE
// ============================================
export default function ContactPage() {
  const [formData, setFormData] = useState<ContactFormData>({
    firstName: "",
    lastName: "",
    email: "",
    topic: "",
    message: "",
    website: "", // Honeypot - must stay empty
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<ContactFormErrors>({});

  const topicOptions: { value: ContactTopic; label: string }[] = [
    { value: "", label: "Select a topic" },
    { value: "press", label: "Press Inquiry" },
    { value: "partnership", label: "Partnership Opportunity" },
    { value: "speaking", label: "Speaking Request" },
    { value: "general", label: "General Question" },
    { value: "other", label: "Other" },
  ];

  const validateForm = (): boolean => {
    const newErrors: ContactFormErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const clearError = (field: keyof ContactFormErrors) => {
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Honeypot check - if filled, silently reject (bot detected)
    if (formData.website) {
      // Fake success to fool bots
      setIsSubmitting(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setIsSubmitting(false);
      setSubmitted(true);
      return;
    }

    setIsSubmitting(true);

    // Simulate form submission
    // TODO: Connect to Action Network
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsSubmitting(false);
    setErrors({});
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-white">
        {/* Hero */}
        <section className="bg-white border-b border-gray-200">
          <div style={{ padding: 'clamp(6rem, 10vw, 6rem) clamp(1rem, 4vw, 5.75rem) clamp(2rem, 5vw, 4rem)' }}>
            <div className="max-w-[1400px] mx-auto">
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">
                Message Sent
              </p>
              <h1
                className="font-gunterz font-bold leading-tight mb-4"
                style={{ fontSize: 'clamp(1.75rem, 1rem + 3.5vw, 3rem)' }}
              >
                Thank You
              </h1>
            </div>
          </div>
        </section>

        <section style={{ padding: 'clamp(2rem, 6vw, 4rem) clamp(1rem, 4vw, 5.75rem)' }}>
          <div className="max-w-xl">
            <div className="mb-6">
              <svg
                className="w-16 h-16 text-bvp-green"
                viewBox="0 0 64 64"
                fill="none"
                aria-hidden="true"
              >
                <circle
                  cx="32"
                  cy="32"
                  r="30"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  d="M20 32L28 40L44 24"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              We've received your message and will get back to you as soon as
              possible. For urgent matters, please email us directly at{" "}
              <a
                href="mailto:info@blackveteransproject.org"
                className="font-semibold text-black underline underline-offset-2 hover:text-bvp-navy"
              >
                info@blackveteransproject.org
              </a>
              .
            </p>
            <a
              href="/"
              className="inline-flex items-center gap-2 text-[15px] font-bold text-black hover:text-bvp-navy transition-colors"
            >
              Return to Homepage
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero - Compact */}
      <section
        className="bg-white border-b border-gray-200"
        style={{ padding: 'clamp(6rem, 10vw, 8rem) clamp(1rem, 4vw, 5.75rem) clamp(1rem, 2vw, 1.5rem)' }}
      >
        <div className="max-w-[1400px] mx-auto">
          <p className="text-sm uppercase tracking-widest text-gray-400 mb-4">
            Get in touch
          </p>
          <h1
            className="font-gunterz font-bold leading-tight mb-2"
            style={{ fontSize: 'clamp(1.75rem, 1rem + 3.5vw, 3rem)' }}
          >
            Contact Us
          </h1>
          <p className="text-base text-gray-500">
            For press inquiries, partnerships, speaking requests, or general
            questions.
          </p>
        </div>
      </section>

      {/* Content - Two Column Layout */}
      <section>
        <div
          className="grid"
          style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))' }}
        >
          {/* Form Panel - First on mobile, Right on desktop */}
          <div
            className="bg-gray-100 order-1 md:order-2"
            style={{ padding: 'clamp(1.5rem, 4vw, 2.5rem)' }}
          >
            <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-5">
              Send a Message
            </p>

            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              {/* Honeypot field - hidden from humans, bots will fill it */}
              <div className="absolute -left-[9999px]" aria-hidden="true">
                <label htmlFor="website">Website</label>
                <input
                  type="text"
                  id="website"
                  name="website"
                  value={formData.website}
                  onChange={(e) =>
                    setFormData((f) => ({ ...f, website: e.target.value }))
                  }
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              {/* Name Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                <div>
                  <label
                    htmlFor="contact-firstName"
                    className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2"
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    id="contact-firstName"
                    value={formData.firstName}
                    onChange={(e) =>
                      setFormData((f) => ({ ...f, firstName: e.target.value }))
                    }
                    autoComplete="given-name"
                    className="w-full py-3 bg-transparent border-b border-gray-300 text-base transition-colors focus:border-black focus:outline-none"
                    placeholder="First"
                  />
                </div>
                <div>
                  <label
                    htmlFor="contact-lastName"
                    className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2"
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="contact-lastName"
                    value={formData.lastName}
                    onChange={(e) =>
                      setFormData((f) => ({ ...f, lastName: e.target.value }))
                    }
                    autoComplete="family-name"
                    className="w-full py-3 bg-transparent border-b border-gray-300 text-base transition-colors focus:border-black focus:outline-none"
                    placeholder="Last"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="contact-email"
                  className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2"
                >
                  Email *
                </label>
                <input
                  type="email"
                  id="contact-email"
                  value={formData.email}
                  onChange={(e) => {
                    setFormData((f) => ({ ...f, email: e.target.value }));
                    clearError('email');
                  }}
                  autoComplete="email"
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "contact-email-error" : undefined}
                  className={`w-full py-3 bg-transparent border-b text-base transition-colors focus:outline-none ${
                    errors.email ? "border-red-500 focus:border-red-500" : "border-gray-300 focus:border-black"
                  }`}
                  placeholder="you@email.com"
                />
                {errors.email && (
                  <p id="contact-email-error" className="text-red-500 text-xs mt-1">{errors.email}</p>
                )}
              </div>

              {/* Topic */}
              <TopicDropdown
                value={formData.topic}
                onChange={(value) => setFormData((f) => ({ ...f, topic: value as ContactTopic }))}
                options={topicOptions}
              />

              {/* Message */}
              <div>
                <label
                  htmlFor="contact-message"
                  className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2"
                >
                  Message
                </label>
                <textarea
                  id="contact-message"
                  rows={3}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData((f) => ({ ...f, message: e.target.value }))
                  }
                  className="w-full py-3 bg-transparent border-b border-gray-300 text-base transition-colors focus:border-black focus:outline-none resize-y"
                  placeholder="Write a message"
                />
              </div>

              {/* Privacy Notice */}
              <p className="text-xs text-gray-500 leading-relaxed">
                By submitting this form, you agree to our{' '}
                <a href="/privacy" className="underline hover:text-black transition-colors">
                  Privacy Policy
                </a>. We'll use your information only to respond to your inquiry.
              </p>

              {/* Submit */}
              <div className="pt-2">
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Submit →"}
                </Button>
              </div>
            </form>
          </div>

          {/* Dark Panel - Second on mobile, Left on desktop */}
          <div
            className="text-white flex flex-col order-2 md:order-1"
            style={{
              background: "linear-gradient(180deg, #3a3a3a 0%, #1a1a1a 100%)",
              padding: 'clamp(1.5rem, 4vw, 2.5rem)',
            }}
          >
            {/* Email Icon */}
            <div className="mb-5">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>

            {/* Main Text */}
            <div className="mb-4">
              <h2 className="text-xl md:text-2xl font-bold leading-tight mb-4 font-body">
                For press, partnerships, and general inquiries:
              </h2>
              <a
                href="mailto:info@blackveteransproject.org"
                className="text-lg md:text-xl font-bold underline hover:no-underline hover:text-bvp-gold transition-colors"
              >
                info@blackveteransproject.org
              </a>
              <p className="text-sm text-gray-400 mt-3">
                or send a message via the form above ↑
              </p>
            </div>

            {/* Divider */}
            <div className="border-t border-white/20 my-5" aria-hidden="true" />

            {/* Follow Section */}
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4">
                Follow
              </p>
              <div className="space-y-3">
                <SocialLink
                  platform="Instagram"
                  handle="@blackvetsproject"
                  href="https://instagram.com/blackvetsproject"
                />
                <SocialLink
                  platform="Twitter / X"
                  handle="@blackvetsproject"
                  href="https://twitter.com/blackvetsproject"
                />
                <SocialLink
                  platform="LinkedIn"
                  handle="Black Veterans Project"
                  href="https://linkedin.com/company/blackveteransproject"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
