"use client";

import Script from "next/script";

export default function DonatePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-white border-b border-gray-200">
        <div style={{ padding: 'clamp(6rem, 10vw, 8rem) clamp(1rem, 4vw, 5.75rem) clamp(2rem, 5vw, 3rem)' }}>
          <div className="max-w-[1400px] mx-auto">
            <p className="text-sm uppercase tracking-widest text-gray-400 mb-4">
              Support Our Mission
            </p>
            <h1
              className="font-gunterz font-bold leading-tight"
              style={{ fontSize: 'clamp(1.75rem, 1rem + 3.5vw, 3rem)' }}
            >
              Help Us Secure the Legacy for Black Veterans
            </h1>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section>
        <div style={{ padding: 'clamp(2rem, 5vw, 4rem) clamp(1rem, 4vw, 5.75rem)' }}>
          <div className="max-w-[1400px] mx-auto">
            <div
              className="grid"
              style={{
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
                gap: 'clamp(2rem, 5vw, 4rem)',
              }}
            >
              {/* Left Column: Copy */}
              <div>
                <div className="space-y-6">
                  <p className="text-lg leading-relaxed text-gray-700">
                    Your donation helps Black Veterans Project's mission to
                    advocate for racial inclusion and justice across the United
                    States military while ensuring the welfare of all Black
                    veterans who've served.
                  </p>
                  <p className="text-lg leading-relaxed text-gray-700">
                    By supporting us, you're helping to drive forward vital work
                    that raises public awareness, addresses systemic inequities,
                    and brings us closer to a future where all who have served
                    are empowered with the resources and opportunities they've
                    long been denied.
                  </p>
                  <p className="text-lg leading-relaxed text-gray-700">
                    Every contribution, no matter the size, strengthens our
                    ability to make lasting change and ensure Black veterans'
                    voices are heard.
                  </p>
                </div>

                {/* Tax deductible note */}
                <div className="mt-8 p-4 bg-gray-50 border-l-4 border-bvp-gold">
                  <p className="text-sm text-gray-600">
                    <strong>Tax Deductible:</strong> Black Veterans Project is a
                    501(c)(3) nonprofit organization. Your donation is
                    tax-deductible to the extent allowed by law.
                  </p>
                </div>
              </div>

              {/* Right Column: Donately Form */}
              <div>
                <div
                  id="donately-form-container"
                  className="min-h-[500px]"
                >
                  {/* Donately form will render here */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Donately Script */}
      <Script
        src="https://cdn.donately.com/core/6.0/donately.min.js"
        data-donately-id="act_1c9da0501869"
        data-stripe-publishable-key="pk_live_51EciVsFvVHN4GQU4Cyxh9ZfzIYeJQ9VXDHj4LqCHlU4XCB2cDI8vxhDzxXOJwCw5TjK89kwvuDuXEz3XeugfdcSr00nNgvHMYd"
        data-donately-form-id="frm_17bf7d7efced"
        data-donately-fetch-config="true"
        strategy="afterInteractive"
      />
    </div>
  );
}
