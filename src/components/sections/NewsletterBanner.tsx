'use client';

import { useState } from 'react';

export function NewsletterBanner() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsSubmitting(true);
    // TODO: Connect to Zapier/Substack backend
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setEmail('');
      setTimeout(() => setIsSuccess(false), 3000);
    }, 1000);
  };

  return (
    <section className="bg-[#FDC500] py-16 md:py-20 lg:py-24 px-6 md:px-[92px]">
      <div className="max-w-[800px] mx-auto text-center">
        <h3 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-black mb-4">
          Stay in the loop
        </h3>
        <p className="text-black/70 text-lg mb-8">
          No spam. Only updates on our work, stories from the community, and ways to take action.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-lg mx-auto">
          <input
            type="email"
            placeholder="Your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full sm:flex-1 px-6 py-4 rounded-full border-2 border-black/20 bg-white text-black placeholder:text-black/50 focus:outline-none focus:border-black transition-colors"
          />
          <button
            type="submit"
            disabled={isSubmitting || isSuccess}
            className={`w-full sm:w-auto px-8 py-4 rounded-full font-bold transition-all ${
              isSuccess
                ? 'bg-[#56C035] text-white'
                : 'bg-black text-white hover:bg-white hover:text-black border-2 border-black'
            }`}
          >
            {isSubmitting ? '...' : isSuccess ? 'Subscribed!' : 'Sign up'}
          </button>
        </form>
      </div>
    </section>
  );
}
