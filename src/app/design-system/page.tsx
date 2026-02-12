'use client';

import { useState, useEffect } from 'react';

/**
 * DESIGN SYSTEM VISUAL REFERENCE
 * 
 * Shows all spacing, typography, colors with exact pixel values
 * Use this page to screenshot and annotate what needs adjustment
 */

export default function DesignSystemPage() {
  const [viewport, setViewport] = useState({ width: 0, height: 0 });
  const [breakpoint, setBreakpoint] = useState('');

  useEffect(() => {
    const updateViewport = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      setViewport({ width, height });
      
      if (width < 640) setBreakpoint('xs (mobile)');
      else if (width < 768) setBreakpoint('sm (large mobile)');
      else if (width < 1024) setBreakpoint('md (tablet)');
      else if (width < 1280) setBreakpoint('lg (laptop)');
      else if (width < 1536) setBreakpoint('xl (desktop)');
      else setBreakpoint('2xl (large desktop)');
    };
    
    updateViewport();
    window.addEventListener('resize', updateViewport);
    return () => window.removeEventListener('resize', updateViewport);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Sticky Header with Live Viewport */}
      <header className="sticky top-0 z-50 bg-black text-white">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-4 flex justify-between items-center">
          <div>
            <h1 className="font-bold text-xl">BVP Design System</h1>
            <p className="text-gray-400 text-sm">Visual Spacing Reference</p>
          </div>
          <div className="text-right">
            <div className="text-bvp-gold font-mono text-lg font-bold">
              {viewport.width} × {viewport.height}
            </div>
            <div className="text-sm text-gray-400">{breakpoint}</div>
          </div>
        </div>
      </header>

      {/* Quick Nav */}
      <nav className="sticky top-[72px] z-40 bg-gray-100 border-b-4 border-black">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-3 flex gap-6 overflow-x-auto">
          <a href="#breakpoints" className="text-sm font-bold hover:text-bvp-gold whitespace-nowrap">Breakpoints</a>
          <a href="#container" className="text-sm font-bold hover:text-bvp-gold whitespace-nowrap">Container</a>
          <a href="#section-padding" className="text-sm font-bold hover:text-bvp-gold whitespace-nowrap">Section Padding</a>
          <a href="#spacing-scale" className="text-sm font-bold hover:text-bvp-gold whitespace-nowrap">Spacing Scale</a>
          <a href="#typography" className="text-sm font-bold hover:text-bvp-gold whitespace-nowrap">Typography</a>
          <a href="#colors" className="text-sm font-bold hover:text-bvp-gold whitespace-nowrap">Colors</a>
          <a href="#components" className="text-sm font-bold hover:text-bvp-gold whitespace-nowrap">Components</a>
        </div>
      </nav>

      <main>
        {/* ===================== BREAKPOINTS ===================== */}
        <section id="breakpoints" className="py-12 md:py-16 lg:py-24 px-6 md:px-12 border-b-4 border-black">
          <div className="max-w-[1400px] mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">Breakpoints</h2>
            
            <div className="overflow-x-auto">
              <table className="w-full border-4 border-black">
                <thead className="bg-black text-white">
                  <tr>
                    <th className="text-left p-4 font-mono">Name</th>
                    <th className="text-left p-4 font-mono">Min Width</th>
                    <th className="text-left p-4 font-mono">Tailwind</th>
                    <th className="text-left p-4 font-mono">Target Devices</th>
                  </tr>
                </thead>
                <tbody className="font-mono text-sm">
                  <tr className="border-b-2 border-black bg-bvp-gold/10">
                    <td className="p-4 font-bold">Default</td>
                    <td className="p-4">0px</td>
                    <td className="p-4 text-gray-500">(no prefix)</td>
                    <td className="p-4">Small phones (iPhone SE)</td>
                  </tr>
                  <tr className="border-b-2 border-black">
                    <td className="p-4 font-bold">sm</td>
                    <td className="p-4 text-bvp-gold">640px</td>
                    <td className="p-4">sm:</td>
                    <td className="p-4">Large phones (iPhone Pro Max)</td>
                  </tr>
                  <tr className="border-b-2 border-black bg-gray-50">
                    <td className="p-4 font-bold">md</td>
                    <td className="p-4 text-bvp-gold">768px</td>
                    <td className="p-4">md:</td>
                    <td className="p-4">Tablets (iPad Mini)</td>
                  </tr>
                  <tr className="border-b-2 border-black">
                    <td className="p-4 font-bold">lg</td>
                    <td className="p-4 text-bvp-gold">1024px</td>
                    <td className="p-4">lg:</td>
                    <td className="p-4">Small laptops, tablets landscape</td>
                  </tr>
                  <tr className="border-b-2 border-black bg-gray-50">
                    <td className="p-4 font-bold">xl</td>
                    <td className="p-4 text-bvp-gold">1280px</td>
                    <td className="p-4">xl:</td>
                    <td className="p-4">Laptops, desktops</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold">2xl</td>
                    <td className="p-4 text-bvp-gold">1536px</td>
                    <td className="p-4">2xl:</td>
                    <td className="p-4">Large monitors</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Current Breakpoint Indicator */}
            <div className="mt-8 p-6 bg-bvp-gold border-4 border-black">
              <p className="font-bold text-sm uppercase tracking-wider mb-2">Current Breakpoint</p>
              <p className="text-4xl font-bold">{breakpoint}</p>
              <p className="font-mono mt-2">{viewport.width}px wide</p>
            </div>
          </div>
        </section>

        {/* ===================== CONTAINER ===================== */}
        <section id="container" className="py-12 md:py-16 lg:py-24 px-6 md:px-12 border-b-4 border-black bg-gray-50">
          <div className="max-w-[1400px] mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">Container</h2>
            
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-white border-4 border-black p-6">
                <p className="text-sm text-gray-500 uppercase tracking-wider mb-2">Max Width</p>
                <p className="text-5xl font-bold text-bvp-gold">1400px</p>
                <code className="text-sm font-mono text-gray-500 mt-2 block">max-w-[1400px] mx-auto</code>
              </div>
              <div className="bg-white border-4 border-black p-6">
                <p className="text-sm text-gray-500 uppercase tracking-wider mb-2">Horizontal Padding</p>
                <div className="flex gap-8">
                  <div>
                    <p className="text-3xl font-bold">24px</p>
                    <p className="text-sm text-gray-500">Mobile (px-6)</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-bvp-gold">48px</p>
                    <p className="text-sm text-gray-500">Desktop (md:px-12)</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Visual Container Demo */}
            <div className="relative bg-bvp-navy">
              {/* Full width background */}
              <div className="py-8">
                {/* Container with padding indicators */}
                <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative">
                  {/* Left padding indicator */}
                  <div className="absolute left-0 top-0 bottom-0 w-6 md:w-12 bg-bvp-gold/40 flex items-center justify-center">
                    <span className="text-xs font-mono font-bold text-black -rotate-90 whitespace-nowrap">
                      <span className="md:hidden">24px</span>
                      <span className="hidden md:inline">48px</span>
                    </span>
                  </div>
                  
                  {/* Content area */}
                  <div className="bg-white/10 border-2 border-dashed border-white p-8 ml-6 md:ml-12 mr-6 md:mr-12">
                    <p className="text-white font-bold">Content Area</p>
                    <p className="text-white/60 text-sm">This is where your content lives</p>
                  </div>

                  {/* Right padding indicator */}
                  <div className="absolute right-0 top-0 bottom-0 w-6 md:w-12 bg-bvp-gold/40 flex items-center justify-center">
                    <span className="text-xs font-mono font-bold text-black -rotate-90 whitespace-nowrap">
                      <span className="md:hidden">24px</span>
                      <span className="hidden md:inline">48px</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===================== SECTION PADDING ===================== */}
        <section id="section-padding" className="py-12 md:py-16 lg:py-24 px-6 md:px-12 border-b-4 border-black">
          <div className="max-w-[1400px] mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">Section Padding</h2>
            
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="bg-white border-4 border-black p-6">
                <p className="text-sm text-gray-500 uppercase tracking-wider mb-2">Mobile</p>
                <p className="text-4xl font-bold">48px</p>
                <code className="text-sm font-mono text-gray-500">py-12</code>
              </div>
              <div className="bg-white border-4 border-black p-6">
                <p className="text-sm text-gray-500 uppercase tracking-wider mb-2">Tablet (md)</p>
                <p className="text-4xl font-bold">64px</p>
                <code className="text-sm font-mono text-gray-500">md:py-16</code>
              </div>
              <div className="bg-white border-4 border-black p-6 bg-bvp-gold/10">
                <p className="text-sm text-gray-500 uppercase tracking-wider mb-2">Desktop (lg+)</p>
                <p className="text-4xl font-bold text-bvp-gold">96px</p>
                <code className="text-sm font-mono text-gray-500">lg:py-24</code>
              </div>
            </div>

            {/* Visual Section Demo */}
            <div className="border-4 border-black">
              {/* Top padding visualization */}
              <div className="bg-bvp-gold/30 relative">
                <div className="h-12 md:h-16 lg:h-24 flex items-center justify-center">
                  <span className="font-mono text-sm font-bold">
                    <span className="md:hidden">48px</span>
                    <span className="hidden md:inline lg:hidden">64px</span>
                    <span className="hidden lg:inline">96px</span>
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="bg-white px-6 md:px-12 py-8 text-center border-y-2 border-dashed border-gray-300">
                <p className="font-bold">Section Content</p>
                <p className="text-gray-500 text-sm">Your content goes here</p>
              </div>

              {/* Bottom padding visualization */}
              <div className="bg-bvp-gold/30 relative">
                <div className="h-12 md:h-16 lg:h-24 flex items-center justify-center">
                  <span className="font-mono text-sm font-bold">
                    <span className="md:hidden">48px</span>
                    <span className="hidden md:inline lg:hidden">64px</span>
                    <span className="hidden lg:inline">96px</span>
                  </span>
                </div>
              </div>
            </div>

            <p className="mt-4 text-sm text-gray-500 font-mono">
              Pattern: py-12 md:py-16 lg:py-24 px-6 md:px-12
            </p>
          </div>
        </section>

        {/* ===================== SPACING SCALE ===================== */}
        <section id="spacing-scale" className="py-12 md:py-16 lg:py-24 px-6 md:px-12 border-b-4 border-black bg-gray-50">
          <div className="max-w-[1400px] mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Spacing Scale</h2>
            <p className="text-gray-600 mb-8">Base unit: 4px. All spacing is multiples of 4.</p>

            <div className="space-y-4">
              {[
                { name: '1', px: 4 },
                { name: '2', px: 8 },
                { name: '3', px: 12 },
                { name: '4', px: 16 },
                { name: '5', px: 20 },
                { name: '6', px: 24 },
                { name: '8', px: 32 },
                { name: '10', px: 40 },
                { name: '12', px: 48 },
                { name: '16', px: 64 },
                { name: '20', px: 80 },
                { name: '24', px: 96 },
              ].map((space) => (
                <div key={space.name} className="flex items-center gap-4 bg-white border-2 border-black p-3">
                  <div className="w-20 font-mono text-sm font-bold">
                    space-{space.name}
                  </div>
                  <div className="w-20 text-bvp-gold font-bold">
                    {space.px}px
                  </div>
                  <div 
                    className="bg-bvp-gold h-6 border border-black"
                    style={{ width: `${Math.min(space.px * 2, 200)}px` }}
                  />
                  <div className="font-mono text-xs text-gray-500">
                    p-{space.name}, m-{space.name}, gap-{space.name}
                  </div>
                </div>
              ))}
            </div>

            {/* Common Spacing Patterns */}
            <div className="mt-12">
              <h3 className="text-xl font-bold mb-4">Common Patterns</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white border-4 border-black p-6">
                  <p className="font-bold mb-2">Card Grid Gap</p>
                  <p className="text-2xl text-bvp-gold font-bold">24px</p>
                  <code className="text-sm font-mono text-gray-500">gap-6</code>
                </div>
                <div className="bg-white border-4 border-black p-6">
                  <p className="font-bold mb-2">Card Padding</p>
                  <p className="text-2xl font-bold">24px → <span className="text-bvp-gold">32px</span></p>
                  <code className="text-sm font-mono text-gray-500">p-6 lg:p-8</code>
                </div>
                <div className="bg-white border-4 border-black p-6">
                  <p className="font-bold mb-2">Section Header to Content</p>
                  <p className="text-2xl font-bold">32px → <span className="text-bvp-gold">48px</span></p>
                  <code className="text-sm font-mono text-gray-500">mb-8 md:mb-12</code>
                </div>
                <div className="bg-white border-4 border-black p-6">
                  <p className="font-bold mb-2">Headline to Body Gap</p>
                  <p className="text-2xl text-bvp-gold font-bold">16px</p>
                  <code className="text-sm font-mono text-gray-500">mb-4</code>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===================== TYPOGRAPHY ===================== */}
        <section id="typography" className="py-12 md:py-16 lg:py-24 px-6 md:px-12 border-b-4 border-black">
          <div className="max-w-[1400px] mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">Typography</h2>

            {/* Font Families */}
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <div className="bg-white border-4 border-black p-6">
                <p className="text-sm text-gray-500 uppercase tracking-wider mb-2">Display</p>
                <p className="text-3xl font-bold" style={{ fontFamily: 'Georgia, serif' }}>Alverata</p>
                <p className="text-sm text-gray-500 mt-2">Headlines, titles</p>
                <code className="text-xs font-mono">font-display</code>
              </div>
              <div className="bg-white border-4 border-black p-6">
                <p className="text-sm text-gray-500 uppercase tracking-wider mb-2">Body</p>
                <p className="text-3xl">Open Sans</p>
                <p className="text-sm text-gray-500 mt-2">Body text, paragraphs</p>
                <code className="text-xs font-mono">font-body</code>
              </div>
              <div className="bg-white border-4 border-black p-6">
                <p className="text-sm text-gray-500 uppercase tracking-wider mb-2">CTA</p>
                <p className="text-3xl font-bold" style={{ fontFamily: 'system-ui' }}>Linear Grotesk</p>
                <p className="text-sm text-gray-500 mt-2">Buttons, labels</p>
                <code className="text-xs font-mono">font-cta</code>
              </div>
            </div>

            {/* Type Scale */}
            <div className="bg-white border-4 border-black">
              <div className="p-6 border-b-2 border-black bg-gray-50">
                <h3 className="font-bold">Type Scale</h3>
              </div>
              
              <div className="divide-y-2 divide-black">
                {/* Hero */}
                <div className="p-6">
                  <div className="flex flex-wrap gap-4 mb-3 text-sm font-mono">
                    <span className="bg-bvp-gold px-2 py-1 font-bold">Display XL</span>
                    <span>Mobile: 48px (text-5xl)</span>
                    <span className="text-bvp-gold">Desktop: 72px (lg:text-7xl)</span>
                    <span className="text-gray-500">line-height: 1.1</span>
                  </div>
                  <p className="text-5xl lg:text-7xl font-bold leading-[1.1]" style={{ fontFamily: 'Georgia, serif' }}>
                    Hero Headlines
                  </p>
                </div>

                {/* Page Title */}
                <div className="p-6">
                  <div className="flex flex-wrap gap-4 mb-3 text-sm font-mono">
                    <span className="bg-gray-200 px-2 py-1 font-bold">Display LG</span>
                    <span>Mobile: 40px (text-4xl)</span>
                    <span className="text-bvp-gold">Desktop: 60px (lg:text-6xl)</span>
                    <span className="text-gray-500">line-height: 1.1</span>
                  </div>
                  <p className="text-4xl lg:text-6xl font-bold leading-[1.1]" style={{ fontFamily: 'Georgia, serif' }}>
                    Page Titles
                  </p>
                </div>

                {/* Section Header */}
                <div className="p-6">
                  <div className="flex flex-wrap gap-4 mb-3 text-sm font-mono">
                    <span className="bg-gray-200 px-2 py-1 font-bold">Display MD</span>
                    <span>Mobile: 28px (text-2xl)</span>
                    <span className="text-bvp-gold">Desktop: 40px (lg:text-4xl)</span>
                    <span className="text-gray-500">line-height: 1.2</span>
                  </div>
                  <p className="text-2xl lg:text-4xl font-bold leading-tight" style={{ fontFamily: 'Georgia, serif' }}>
                    Section Headers
                  </p>
                </div>

                {/* Body XL */}
                <div className="p-6">
                  <div className="flex flex-wrap gap-4 mb-3 text-sm font-mono">
                    <span className="bg-gray-200 px-2 py-1 font-bold">Body XL</span>
                    <span>20px (text-xl)</span>
                    <span className="text-bvp-gold">Desktop: 24px (lg:text-2xl)</span>
                    <span className="text-gray-500">line-height: 1.6</span>
                  </div>
                  <p className="text-xl lg:text-2xl leading-relaxed">
                    Lead paragraphs and important intro text that sets up the content below.
                  </p>
                </div>

                {/* Body MD */}
                <div className="p-6">
                  <div className="flex flex-wrap gap-4 mb-3 text-sm font-mono">
                    <span className="bg-gray-200 px-2 py-1 font-bold">Body MD</span>
                    <span>16px (text-base)</span>
                    <span className="text-gray-500">line-height: 1.6</span>
                  </div>
                  <p className="text-base leading-relaxed">
                    Default body text for general content and paragraphs. This is the most common text size used throughout the site for readable content.
                  </p>
                </div>

                {/* Body SM */}
                <div className="p-6">
                  <div className="flex flex-wrap gap-4 mb-3 text-sm font-mono">
                    <span className="bg-gray-200 px-2 py-1 font-bold">Body SM</span>
                    <span>14px (text-sm)</span>
                    <span className="text-gray-500">line-height: 1.5</span>
                  </div>
                  <p className="text-sm leading-normal text-gray-600">
                    Captions, metadata, timestamps, and secondary information.
                  </p>
                </div>

                {/* Label */}
                <div className="p-6">
                  <div className="flex flex-wrap gap-4 mb-3 text-sm font-mono">
                    <span className="bg-gray-200 px-2 py-1 font-bold">Label</span>
                    <span>12px (text-xs)</span>
                    <span className="text-gray-500">uppercase, tracking-wider</span>
                  </div>
                  <p className="text-xs font-bold uppercase tracking-wider">
                    EYEBROW LABELS AND CATEGORY TAGS
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===================== COLORS ===================== */}
        <section id="colors" className="py-12 md:py-16 lg:py-24 px-6 md:px-12 border-b-4 border-black bg-gray-50">
          <div className="max-w-[1400px] mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">Colors</h2>

            {/* Primary Colors */}
            <h3 className="text-lg font-bold mb-4 text-gray-600">Primary</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
              {/* Insignia Gold */}
              <div>
                <div className="h-32 bg-[#FDC500] border-4 border-black"></div>
                <div className="mt-2">
                  <p className="font-bold">Insignia Gold</p>
                  <p className="font-mono text-sm">#FDC500</p>
                </div>
              </div>

              {/* White */}
              <div>
                <div className="h-32 bg-white border-4 border-black"></div>
                <div className="mt-2">
                  <p className="font-bold">White</p>
                  <p className="font-mono text-sm">#FFFFFF</p>
                </div>
              </div>

              {/* Black Ops */}
              <div>
                <div className="h-32 bg-black border-4 border-[#FDC500]"></div>
                <div className="mt-2">
                  <p className="font-bold">Black Ops</p>
                  <p className="font-mono text-sm">#000000</p>
                </div>
              </div>

              {/* Midnight Navy */}
              <div>
                <div className="h-32 bg-[#232651] border-4 border-black"></div>
                <div className="mt-2">
                  <p className="font-bold">Midnight Navy</p>
                  <p className="font-mono text-sm">#232651</p>
                </div>
              </div>
            </div>

            {/* Accent Colors */}
            <h3 className="text-lg font-bold mb-4 text-gray-600">Accent</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
              {/* Flare Orange */}
              <div>
                <div className="h-24 bg-[#F44708] border-4 border-black"></div>
                <div className="mt-2">
                  <p className="font-bold text-sm">Flare Orange</p>
                  <p className="font-mono text-xs">#F44708</p>
                </div>
              </div>

              {/* Deep Red */}
              <div>
                <div className="h-24 bg-[#720C0C] border-4 border-black"></div>
                <div className="mt-2">
                  <p className="font-bold text-sm">Deep Red</p>
                  <p className="font-mono text-xs">#720C0C</p>
                </div>
              </div>

              {/* Tactical Green */}
              <div>
                <div className="h-24 bg-[#56C035] border-4 border-black"></div>
                <div className="mt-2">
                  <p className="font-bold text-sm">Tactical Green</p>
                  <p className="font-mono text-xs">#56C035</p>
                </div>
              </div>

              {/* Ranger Green */}
              <div>
                <div className="h-24 bg-[#143601] border-4 border-black"></div>
                <div className="mt-2">
                  <p className="font-bold text-sm">Ranger Green</p>
                  <p className="font-mono text-xs">#143601</p>
                </div>
              </div>
            </div>

            {/* Secondary Colors */}
            <h3 className="text-lg font-bold mb-4 text-gray-600">Secondary</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {/* Sky Blue */}
              <div>
                <div className="h-24 bg-[#038BFF] border-4 border-black"></div>
                <div className="mt-2">
                  <p className="font-bold text-sm">Sky Blue</p>
                  <p className="font-mono text-xs">#038BFF</p>
                </div>
              </div>

              {/* Steel Grey */}
              <div>
                <div className="h-24 bg-[#A1A1A4] border-4 border-black"></div>
                <div className="mt-2">
                  <p className="font-bold text-sm">Steel Grey</p>
                  <p className="font-mono text-xs">#A1A1A4</p>
                </div>
              </div>

              {/* Sand */}
              <div>
                <div className="h-24 bg-[#F4E7C3] border-4 border-black"></div>
                <div className="mt-2">
                  <p className="font-bold text-sm">Sand</p>
                  <p className="font-mono text-xs">#F4E7C3</p>
                </div>
              </div>

              {/* Gold Light */}
              <div>
                <div className="h-24 bg-[#FEF3C7] border-4 border-black"></div>
                <div className="mt-2">
                  <p className="font-bold text-sm">Gold Light</p>
                  <p className="font-mono text-xs">#FEF3C7</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===================== COMPONENTS ===================== */}
        <section id="components" className="py-12 md:py-16 lg:py-24 px-6 md:px-12">
          <div className="max-w-[1400px] mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">Components</h2>

            {/* Buttons */}
            <div className="mb-12">
              <h3 className="text-xl font-bold mb-4">Buttons</h3>

              {/* Primary - Gold Pill on Light */}
              <div className="bg-gradient-to-b from-[#FEF7E0] to-white border-4 border-black p-8 mb-4">
                <p className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-4">Primary — Gold Pill (Light BG)</p>
                <div className="flex flex-wrap gap-4 items-center mb-6">
                  <button className="px-10 py-4 text-lg font-bold tracking-wide rounded-full border-4 border-[#FDC500] bg-[#FDC500] text-black transition-all duration-300 hover:bg-white active:scale-95">
                    Donate
                  </button>
                  <button className="px-8 py-3 text-base font-bold tracking-wide rounded-full border-4 border-[#FDC500] bg-[#FDC500] text-black transition-all duration-300 hover:bg-white active:scale-95">
                    Join Us
                  </button>
                  <button className="px-6 py-2.5 text-base font-bold tracking-wide rounded-full border-4 border-[#FDC500] bg-[#FDC500] text-black transition-all duration-300 hover:bg-white active:scale-95">
                    Learn More
                  </button>
                  {/* Arrow Slide */}
                  <button className="text-base font-bold tracking-wide text-black hover:text-[#FDC500] transition-all duration-300 active:scale-95 group flex items-center gap-3 relative">
                    <span>Learn More</span>
                    <span className="inline-block transition-transform duration-300 group-hover:translate-x-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </span>
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-black group-hover:w-full transition-all duration-300" />
                  </button>
                </div>
              </div>

              {/* Primary - Gold Pill on Dark */}
              <div className="bg-gradient-to-b from-[#1a1a1a] to-black border-4 border-black p-8 mb-6">
                <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4">Primary — Gold Pill (Dark BG)</p>
                <div className="flex flex-wrap gap-4 items-center mb-6">
                  <button className="px-10 py-4 text-lg font-bold tracking-wide rounded-full border-4 border-[#FDC500] bg-[#FDC500] text-black transition-all duration-300 hover:bg-black hover:text-[#FDC500] active:scale-95">
                    Donate
                  </button>
                  <button className="px-8 py-3 text-base font-bold tracking-wide rounded-full border-4 border-[#FDC500] bg-[#FDC500] text-black transition-all duration-300 hover:bg-black hover:text-[#FDC500] active:scale-95">
                    Join Us
                  </button>
                  <button className="px-6 py-2.5 text-base font-bold tracking-wide rounded-full border-4 border-[#FDC500] bg-[#FDC500] text-black transition-all duration-300 hover:bg-black hover:text-[#FDC500] active:scale-95">
                    Learn More
                  </button>
                  {/* Arrow Slide */}
                  <button className="text-base font-bold tracking-wide text-white hover:text-[#FDC500] transition-all duration-300 active:scale-95 group flex items-center gap-3 relative">
                    <span>Learn More</span>
                    <span className="inline-block transition-transform duration-300 group-hover:translate-x-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </span>
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#FDC500] group-hover:w-full transition-all duration-300" />
                  </button>
                </div>
              </div>

              <div className="font-mono text-sm space-y-1 text-gray-600 bg-white border-4 border-black p-6">
                <p className="font-bold text-black mb-2">Button Specs:</p>
                <p>Large: <span className="text-[#FDC500]">px-10 py-4 text-lg</span></p>
                <p>Medium: <span className="text-[#FDC500]">px-8 py-3 text-base</span></p>
                <p>Small: <span className="text-[#FDC500]">px-6 py-2.5 text-base</span></p>
                <p>Border: <span className="text-[#FDC500]">4px solid #FDC500</span></p>
                <p>Border-radius: <span className="text-[#FDC500]">rounded-full (9999px)</span></p>
                <p>Hover (Light BG): <span className="text-[#FDC500]">bg-white, keep gold border</span></p>
                <p>Hover (Dark BG): <span className="text-[#FDC500]">bg-black, gold text, keep gold border</span></p>
                <p>Active: <span className="text-[#FDC500]">scale-95</span></p>
              </div>
            </div>

            {/* Cards */}
            <div className="mb-12">
              <h3 className="text-xl font-bold mb-4">Cards</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white border-4 border-black p-6">
                  <p className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Default</p>
                  <p className="text-xl font-bold">Card Title</p>
                  <p className="text-gray-600 mt-2">Card content</p>
                </div>
                <div className="bg-black text-white border-4 border-black p-6">
                  <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Dark</p>
                  <p className="text-xl font-bold">Card Title</p>
                  <p className="text-gray-300 mt-2">Card content</p>
                </div>
                <div className="bg-bvp-gold border-4 border-bvp-gold p-6">
                  <p className="text-xs font-bold uppercase tracking-wider text-black/60 mb-2">Gold</p>
                  <p className="text-xl font-bold">Card Title</p>
                  <p className="text-black/70 mt-2">Card content</p>
                </div>
              </div>
              <div className="mt-4 font-mono text-sm text-gray-600">
                <p>Border: <span className="text-bvp-gold">4px solid</span></p>
                <p>Padding: <span className="text-bvp-gold">24px</span> (p-6) / <span className="text-bvp-gold">32px</span> (lg:p-8)</p>
                <p>Hover: translateY(-4px) + shadow</p>
              </div>
            </div>

            {/* Borders */}
            <div>
              <h3 className="text-xl font-bold mb-4">Borders</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="p-6 border-4 border-black bg-white">
                  <p className="font-bold">Primary</p>
                  <p className="font-mono text-sm text-gray-500">4px solid black</p>
                </div>
                <div className="p-6 border-2 border-black bg-white">
                  <p className="font-bold">Secondary</p>
                  <p className="font-mono text-sm text-gray-500">2px solid black</p>
                </div>
                <div className="p-6 border border-gray-200 bg-white">
                  <p className="font-bold">Subtle</p>
                  <p className="font-mono text-sm text-gray-500">1px solid gray-200</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-black text-white py-8 px-6">
        <div className="max-w-[1400px] mx-auto text-center">
          <p className="text-gray-400 text-sm">
            Press <kbd className="bg-gray-800 px-2 py-1 rounded text-xs">Ctrl+Shift+D</kbd> on any page to toggle debug overlay
          </p>
        </div>
      </footer>
    </div>
  );
}
