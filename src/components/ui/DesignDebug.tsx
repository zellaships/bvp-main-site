'use client';

import { useState, useEffect } from 'react';

/**
 * DESIGN DEBUG OVERLAY
 * 
 * Toggle with: Ctrl+Shift+D (or Cmd+Shift+D on Mac)
 * 
 * Shows:
 * - Current breakpoint
 * - Viewport dimensions
 * - Grid overlay
 * - Spacing measurements on hover
 */

export function DesignDebug({ children }: { children: React.ReactNode }) {
  const [isEnabled, setIsEnabled] = useState(false);
  const [showGrid, setShowGrid] = useState(true);
  const [showSpacing, setShowSpacing] = useState(true);
  const [viewport, setViewport] = useState({ width: 0, height: 0 });
  const [breakpoint, setBreakpoint] = useState('');

  // Keyboard shortcut: Ctrl/Cmd + Shift + D
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'D') {
        e.preventDefault();
        setIsEnabled(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Track viewport size
  useEffect(() => {
    const updateViewport = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      setViewport({ width, height });

      // Determine breakpoint
      if (width < 640) setBreakpoint('xs (<640)');
      else if (width < 768) setBreakpoint('sm (640-767)');
      else if (width < 1024) setBreakpoint('md (768-1023)');
      else if (width < 1280) setBreakpoint('lg (1024-1279)');
      else if (width < 1536) setBreakpoint('xl (1280-1535)');
      else setBreakpoint('2xl (1536+)');
    };

    updateViewport();
    window.addEventListener('resize', updateViewport);
    return () => window.removeEventListener('resize', updateViewport);
  }, []);

  if (!isEnabled) return <>{children}</>;

  return (
    <div className="relative">
      {/* Debug Panel - Fixed */}
      <div className="fixed top-4 right-4 z-[9999] bg-black text-white p-4 rounded-lg shadow-2xl font-mono text-xs max-w-xs">
        <div className="flex items-center justify-between mb-3">
          <span className="text-bvp-gold font-bold">🎨 DESIGN DEBUG</span>
          <button 
            onClick={() => setIsEnabled(false)}
            className="text-gray-400 hover:text-white"
          >
            ✕
          </button>
        </div>

        {/* Viewport Info */}
        <div className="mb-3 pb-3 border-b border-gray-700">
          <div className="text-gray-400 mb-1">Viewport</div>
          <div className="text-lg font-bold">{viewport.width} × {viewport.height}</div>
          <div className="text-bvp-gold">{breakpoint}</div>
        </div>

        {/* Toggles */}
        <div className="space-y-2 mb-3 pb-3 border-b border-gray-700">
          <label className="flex items-center gap-2 cursor-pointer">
            <input 
              type="checkbox" 
              checked={showGrid} 
              onChange={(e) => setShowGrid(e.target.checked)}
              className="accent-bvp-gold"
            />
            <span>Column Grid</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input 
              type="checkbox" 
              checked={showSpacing} 
              onChange={(e) => setShowSpacing(e.target.checked)}
              className="accent-bvp-gold"
            />
            <span>Spacing Overlay</span>
          </label>
        </div>

        {/* Spacing Reference */}
        <div className="text-gray-400 mb-2">Section Padding</div>
        <div className="grid grid-cols-2 gap-1 text-[10px] mb-3">
          <div>Desktop: <span className="text-bvp-gold">96px</span></div>
          <div>Mobile: <span className="text-bvp-gold">48px</span></div>
        </div>

        <div className="text-gray-400 mb-2">Container</div>
        <div className="grid grid-cols-2 gap-1 text-[10px] mb-3">
          <div>Max: <span className="text-bvp-gold">1400px</span></div>
          <div>Padding: <span className="text-bvp-gold">24-48px</span></div>
        </div>

        <div className="text-gray-400 mb-2">Breakpoints</div>
        <div className="grid grid-cols-3 gap-1 text-[10px]">
          <div>sm: 640</div>
          <div>md: 768</div>
          <div>lg: 1024</div>
          <div>xl: 1280</div>
          <div>2xl: 1536</div>
        </div>

        <div className="mt-3 pt-3 border-t border-gray-700 text-gray-500 text-[10px]">
          Press Ctrl+Shift+D to toggle
        </div>
      </div>

      {/* Grid Overlay */}
      {showGrid && (
        <div className="fixed inset-0 z-[9990] pointer-events-none">
          <div className="max-w-[1400px] mx-auto h-full px-6 md:px-12">
            <div className="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-4 md:gap-6 h-full">
              {Array.from({ length: 12 }).map((_, i) => (
                <div 
                  key={i} 
                  className={`bg-bvp-gold/10 border-x border-bvp-gold/20 h-full ${
                    i >= 4 ? 'hidden md:block' : ''
                  } ${i >= 8 ? 'md:hidden lg:block' : ''}`}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Spacing Indicators */}
      {showSpacing && (
        <style jsx global>{`
          [data-debug-section] {
            position: relative;
          }
          [data-debug-section]::before {
            content: attr(data-debug-section);
            position: absolute;
            top: 0;
            left: 0;
            background: #FDC500;
            color: black;
            padding: 2px 8px;
            font-size: 10px;
            font-family: monospace;
            font-weight: bold;
            z-index: 9991;
          }
          [data-debug-section]::after {
            content: '';
            position: absolute;
            inset: 0;
            border: 1px dashed #FDC500;
            pointer-events: none;
            z-index: 9991;
          }
          [data-debug-spacing] {
            position: relative;
          }
          [data-debug-spacing]::before {
            content: attr(data-debug-spacing);
            position: absolute;
            top: 50%;
            left: -40px;
            transform: translateY(-50%) rotate(-90deg);
            background: rgba(253, 197, 0, 0.9);
            color: black;
            padding: 1px 4px;
            font-size: 9px;
            font-family: monospace;
            white-space: nowrap;
            z-index: 9991;
          }
        `}</style>
      )}

      {children}
    </div>
  );
}

/**
 * SPACING INDICATOR
 * Wrap elements to show their spacing values
 */
export function SpacingIndicator({ 
  children, 
  label,
  padding,
  margin,
  width,
  height,
}: { 
  children: React.ReactNode;
  label?: string;
  padding?: string;
  margin?: string;
  width?: string;
  height?: string;
}) {
  const info = [
    padding && `p:${padding}`,
    margin && `m:${margin}`,
    width && `w:${width}`,
    height && `h:${height}`,
  ].filter(Boolean).join(' ');

  return (
    <div data-debug-section={label || info} className="relative">
      {children}
    </div>
  );
}

/**
 * MEASUREMENT LINE
 * Shows a visual measurement between two points
 */
export function MeasurementLine({
  value,
  direction = 'horizontal',
  className = '',
}: {
  value: string;
  direction?: 'horizontal' | 'vertical';
  className?: string;
}) {
  if (direction === 'vertical') {
    return (
      <div className={`flex flex-col items-center ${className}`}>
        <div className="w-px bg-bvp-gold flex-1" />
        <span className="text-[10px] font-mono text-bvp-gold bg-black px-1 py-0.5 my-1">
          {value}
        </span>
        <div className="w-px bg-bvp-gold flex-1" />
      </div>
    );
  }

  return (
    <div className={`flex items-center ${className}`}>
      <div className="h-px bg-bvp-gold flex-1" />
      <span className="text-[10px] font-mono text-bvp-gold bg-black px-1 py-0.5 mx-1">
        {value}
      </span>
      <div className="h-px bg-bvp-gold flex-1" />
    </div>
  );
}
