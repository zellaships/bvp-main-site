'use client';

import { useState } from 'react';
import { Hero } from '@/components/sections/Hero';
import { SpacingDebug } from '@/components/dev/SpacingDebug';

/**
 * DEVELOPMENT PAGE - /dev
 * 
 * Use this page to:
 * 1. Preview components with debug overlays
 * 2. Test responsive breakpoints
 * 3. Verify spacing values
 * 4. Screenshot and annotate for design feedback
 */

export default function DevPage() {
  const [showHeroDebug, setShowHeroDebug] = useState(true);
  const [showSpacingReference, setShowSpacingReference] = useState(true);

  return (
    <main className="bg-gray-100 min-h-screen">
      {/* Global Spacing Debug */}
      <SpacingDebug enabled={true} />

      {/* Dev Controls */}
      <div className="fixed top-4 left-4 z-[10000] bg-black text-white p-4 rounded-lg shadow-2xl font-mono text-xs space-y-2">
        <div className="font-bold text-bvp-gold mb-2">🛠 Dev Controls</div>
        <label className="flex items-center gap-2 cursor-pointer">
          <input 
            type="checkbox" 
            checked={showHeroDebug} 
            onChange={(e) => setShowHeroDebug(e.target.checked)}
          />
          Hero Debug Overlay
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input 
            type="checkbox" 
            checked={showSpacingReference} 
            onChange={(e) => setShowSpacingReference(e.target.checked)}
          />
          Spacing Reference
        </label>
      </div>

      {/* Spacing Reference Sheet */}
      {showSpacingReference && (
        <div className="fixed bottom-4 left-4 z-[10000] bg-white border-4 border-black p-6 rounded shadow-2xl w-96 max-h-[70vh] overflow-y-auto">
          <h2 className="font-bold text-lg mb-4 border-b-2 border-black pb-2">📐 BVP Spacing Reference</h2>
          
          {/* Container Widths */}
          <div className="mb-6">
            <h3 className="font-bold text-sm uppercase text-gray-500 mb-2">Container Widths</h3>
            <div className="space-y-1 text-sm font-mono">
              <div className="flex justify-between">
                <span>Site max-width</span>
                <span className="text-bvp-navy font-bold">1400px</span>
              </div>
              <div className="flex justify-between">
                <span>Content max-width</span>
                <span className="text-bvp-navy font-bold">1304px</span>
              </div>
              <div className="flex justify-between text-gray-500 text-xs">
                <span>(1400 - 48×2 padding)</span>
              </div>
            </div>
          </div>

          {/* Horizontal Padding */}
          <div className="mb-6">
            <h3 className="font-bold text-sm uppercase text-gray-500 mb-2">Horizontal Padding (px-*)</h3>
            <div className="space-y-1 text-sm font-mono">
              <div className="flex justify-between">
                <span>Mobile (&lt;768px)</span>
                <span className="text-blue-600 font-bold">24px (px-6)</span>
              </div>
              <div className="flex justify-between">
                <span>Tablet (768-1024px)</span>
                <span className="text-blue-600 font-bold">32px (px-8)</span>
              </div>
              <div className="flex justify-between">
                <span>Desktop (1024px+)</span>
                <span className="text-blue-600 font-bold">48px (px-12)</span>
              </div>
            </div>
          </div>

          {/* Section Vertical Padding */}
          <div className="mb-6">
            <h3 className="font-bold text-sm uppercase text-gray-500 mb-2">Section Padding (py-*)</h3>
            <div className="space-y-1 text-sm font-mono">
              <div className="flex justify-between">
                <span>Small section</span>
                <span className="text-green-600 font-bold">80px (py-20)</span>
              </div>
              <div className="flex justify-between">
                <span>Medium section</span>
                <span className="text-green-600 font-bold">96px (py-24)</span>
              </div>
              <div className="flex justify-between">
                <span>Large section</span>
                <span className="text-green-600 font-bold">128px (py-32)</span>
              </div>
            </div>
          </div>

          {/* Component Spacing */}
          <div className="mb-6">
            <h3 className="font-bold text-sm uppercase text-gray-500 mb-2">Component Gaps</h3>
            <div className="space-y-1 text-sm font-mono">
              <div className="flex justify-between">
                <span>Button gap</span>
                <span className="text-purple-600 font-bold">16px (gap-4)</span>
              </div>
              <div className="flex justify-between">
                <span>Card grid gap</span>
                <span className="text-purple-600 font-bold">32px (gap-8)</span>
              </div>
              <div className="flex justify-between">
                <span>Section heading → content</span>
                <span className="text-purple-600 font-bold">64px (mb-16)</span>
              </div>
            </div>
          </div>

          {/* Typography Sizes */}
          <div className="mb-6">
            <h3 className="font-bold text-sm uppercase text-gray-500 mb-2">Typography Scale</h3>
            <div className="space-y-1 text-sm font-mono">
              <div className="flex justify-between">
                <span>Hero H1 (desktop)</span>
                <span className="text-orange-600 font-bold">72px (text-7xl)</span>
              </div>
              <div className="flex justify-between">
                <span>Hero H1 (tablet)</span>
                <span className="text-orange-600 font-bold">48px (text-5xl)</span>
              </div>
              <div className="flex justify-between">
                <span>Hero H1 (mobile)</span>
                <span className="text-orange-600 font-bold">30px (text-3xl)</span>
              </div>
              <div className="flex justify-between">
                <span>Section H2</span>
                <span className="text-orange-600 font-bold">48px (text-5xl)</span>
              </div>
              <div className="flex justify-between">
                <span>Card title</span>
                <span className="text-orange-600 font-bold">24px (text-2xl)</span>
              </div>
              <div className="flex justify-between">
                <span>Body text</span>
                <span className="text-orange-600 font-bold">18px (text-lg)</span>
              </div>
              <div className="flex justify-between">
                <span>Small/meta</span>
                <span className="text-orange-600 font-bold">14px (text-sm)</span>
              </div>
            </div>
          </div>

          {/* Borders */}
          <div className="mb-6">
            <h3 className="font-bold text-sm uppercase text-gray-500 mb-2">Borders</h3>
            <div className="space-y-1 text-sm font-mono">
              <div className="flex justify-between">
                <span>Primary (cards, buttons)</span>
                <span className="text-black font-bold">4px solid black</span>
              </div>
              <div className="flex justify-between">
                <span>Secondary (inputs)</span>
                <span className="text-black font-bold">2px solid</span>
              </div>
            </div>
          </div>

          {/* Breakpoints */}
          <div className="mb-6">
            <h3 className="font-bold text-sm uppercase text-gray-500 mb-2">Breakpoints</h3>
            <div className="space-y-1 text-sm font-mono">
              <div className="flex justify-between"><span>sm</span><span>640px</span></div>
              <div className="flex justify-between"><span>md</span><span>768px</span></div>
              <div className="flex justify-between"><span>lg</span><span>1024px</span></div>
              <div className="flex justify-between"><span>xl</span><span>1280px</span></div>
              <div className="flex justify-between"><span>2xl</span><span>1400px</span></div>
            </div>
          </div>
        </div>
      )}

      {/* HERO SECTION */}
      <Hero showDebugSpacing={showHeroDebug} />

      {/* BLOG FEED SECTION - Placeholder */}
      <section 
        className="py-32 px-6 md:px-8 lg:px-12 bg-gray-100"
        data-section="blog-feed"
        data-spacing="py-128 | px-48"
      >
        <div className="max-w-[1400px] mx-auto">
          <h2 className="text-5xl font-bold mb-16">LATEST FROM OUR BLOG</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="border-4 border-black p-8 bg-white">
                <p className="text-sm text-gray-500 mb-4">[DATE]</p>
                <p className="text-2xl font-bold mb-4">[BLOG POST TITLE]</p>
                <p className="text-lg text-gray-600 leading-relaxed">[Preview text from Substack RSS...]</p>
              </div>
            ))}
          </div>
          <div className="mt-12">
            <a href="#" className="inline-block px-8 py-4 text-lg font-bold bg-white text-black border-4 border-black hover:bg-gray-100">
              Subscribe to Newsletter →
            </a>
          </div>
        </div>
      </section>

      {/* EMAIL SIGNUP SECTION - Placeholder */}
      <section 
        className="py-20 px-6 md:px-8 lg:px-12 bg-black"
        data-section="email-signup"
        data-spacing="py-80 | px-48"
      >
        <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row items-center justify-between gap-16">
          <div className="max-w-md">
            <h2 className="text-4xl font-bold leading-tight text-white">
              Join the fight for repair. Get updates straight to your inbox.
            </h2>
          </div>
          <div className="flex-1 max-w-2xl w-full">
            <div className="flex flex-col sm:flex-row gap-4 mb-4">
              <input 
                type="text" 
                placeholder="Your name" 
                className="flex-1 px-8 py-5 text-lg rounded-full border-2 border-white bg-transparent text-white placeholder-gray-400"
              />
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-1 px-8 py-5 text-lg rounded-full border-2 border-white bg-transparent text-white placeholder-gray-400"
              />
              <button className="px-10 py-5 text-lg font-bold bg-white text-black rounded-full hover:bg-gray-200">
                Sign up
              </button>
            </div>
            <p className="text-sm text-gray-400 text-right">
              Unsubscribe at any time. <a href="#" className="underline">Privacy Policy.</a>
            </p>
          </div>
        </div>
      </section>

      {/* Section Spacer - for reference */}
      <div className="bg-white py-8 text-center border-y-2 border-gray-300">
        <p className="text-gray-400 font-mono text-sm">End of Homepage sections</p>
      </div>
    </main>
  );
}
