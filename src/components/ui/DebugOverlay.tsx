'use client';

import { useState, useEffect } from 'react';

/**
 * DebugOverlay - Shows live measurements for design QA
 * Toggle with Ctrl+Shift+D (or Cmd+Shift+D on Mac)
 */
export function DebugOverlay() {
  const [isVisible, setIsVisible] = useState(false);
  const [viewport, setViewport] = useState({ width: 0, height: 0 });
  const [breakpoint, setBreakpoint] = useState('');

  useEffect(() => {
    // Toggle with keyboard shortcut
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'D') {
        e.preventDefault();
        setIsVisible((v) => !v);
      }
    };

    // Track viewport size
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
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('resize', updateViewport);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', updateViewport);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* Fixed info panel */}
      <div className="fixed top-4 right-4 z-[9999] bg-black text-white font-mono text-xs p-4 rounded-lg shadow-2xl border-2 border-bvp-gold">
        <div className="font-bold text-bvp-gold mb-2">🔧 DEBUG MODE</div>
        <div className="space-y-1">
          <div>
            <span className="text-gray-400">Viewport:</span>{' '}
            <span className="text-bvp-gold font-bold">{viewport.width}</span> × {viewport.height}px
          </div>
          <div>
            <span className="text-gray-400">Breakpoint:</span>{' '}
            <span className="text-bvp-gold font-bold">{breakpoint}</span>
          </div>
          <div className="pt-2 border-t border-gray-700 mt-2">
            <span className="text-gray-400">Press Ctrl+Shift+D to close</span>
          </div>
        </div>
      </div>

      {/* Center line */}
      <div className="fixed top-0 left-1/2 w-px h-full bg-red-500/30 z-[9998] pointer-events-none" />

      {/* Container guides - shows max-width boundaries */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-[1400px] h-full border-x border-dashed border-blue-500/30 z-[9998] pointer-events-none">
        <div className="absolute -top-0 left-0 bg-blue-500 text-white text-[10px] px-1">
          max-w: 1400px
        </div>
      </div>

      {/* Padding guides */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-[1400px] h-full z-[9998] pointer-events-none px-6 md:px-12">
        <div className="w-full h-full border-x border-dashed border-green-500/30">
          <div className="absolute top-8 left-6 md:left-12 bg-green-500 text-white text-[10px] px-1">
            px: 24px / md:48px
          </div>
        </div>
      </div>
    </>
  );
}

/**
 * MeasureBox - Wrap any element to show its dimensions
 */
export function MeasureBox({
  children,
  label,
  showPadding = false,
  className = '',
}: {
  children: React.ReactNode;
  label?: string;
  showPadding?: boolean;
  className?: string;
}) {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [padding, setPadding] = useState({ top: 0, right: 0, bottom: 0, left: 0 });

  useEffect(() => {
    const el = document.getElementById(`measure-${label}`);
    if (el) {
      const rect = el.getBoundingClientRect();
      const styles = window.getComputedStyle(el);
      setDimensions({ width: Math.round(rect.width), height: Math.round(rect.height) });
      setPadding({
        top: parseInt(styles.paddingTop),
        right: parseInt(styles.paddingRight),
        bottom: parseInt(styles.paddingBottom),
        left: parseInt(styles.paddingLeft),
      });
    }
  }, [label]);

  return (
    <div id={`measure-${label}`} className={`relative ${className}`}>
      {children}

      {/* Dimension label */}
      <div className="absolute -top-6 left-0 bg-purple-600 text-white text-[10px] px-1 font-mono z-[9999]">
        {label}: {dimensions.width} × {dimensions.height}px
        {showPadding && (
          <span className="ml-2 text-purple-200">
            p: {padding.top}/{padding.right}/{padding.bottom}/{padding.left}
          </span>
        )}
      </div>

      {/* Border outline */}
      <div className="absolute inset-0 border border-purple-500/50 pointer-events-none z-[9998]" />
    </div>
  );
}

/**
 * SpacingMarker - Shows a specific spacing value
 */
export function SpacingMarker({
  value,
  direction = 'vertical',
  className = '',
}: {
  value: number | string;
  direction?: 'vertical' | 'horizontal';
  className?: string;
}) {
  const isVertical = direction === 'vertical';

  return (
    <div
      className={`
        relative flex items-center justify-center
        ${isVertical ? 'w-8 flex-col' : 'h-8 flex-row'}
        ${className}
      `}
      style={{
        [isVertical ? 'height' : 'width']: typeof value === 'number' ? `${value}px` : value,
      }}
    >
      {/* Line */}
      <div
        className={`
          bg-orange-500
          ${isVertical ? 'w-px h-full' : 'h-px w-full'}
        `}
      />

      {/* End caps */}
      <div
        className={`
          absolute bg-orange-500
          ${isVertical ? 'w-3 h-px top-0 left-1/2 -translate-x-1/2' : 'h-3 w-px left-0 top-1/2 -translate-y-1/2'}
        `}
      />
      <div
        className={`
          absolute bg-orange-500
          ${isVertical ? 'w-3 h-px bottom-0 left-1/2 -translate-x-1/2' : 'h-3 w-px right-0 top-1/2 -translate-y-1/2'}
        `}
      />

      {/* Label */}
      <div
        className={`
          absolute bg-orange-500 text-white text-[10px] px-1 font-mono whitespace-nowrap
          ${isVertical ? 'left-4 top-1/2 -translate-y-1/2' : 'top-4 left-1/2 -translate-x-1/2'}
        `}
      >
        {value}px
      </div>
    </div>
  );
}

/**
 * GridOverlay - Shows column grid
 */
export function GridOverlay({ columns = 12, gap = 24 }: { columns?: number; gap?: number }) {
  return (
    <div className="fixed inset-0 z-[9997] pointer-events-none">
      <div className="max-w-[1400px] mx-auto h-full px-6 md:px-12">
        <div
          className="h-full grid"
          style={{
            gridTemplateColumns: `repeat(${columns}, 1fr)`,
            gap: `${gap}px`,
          }}
        >
          {Array.from({ length: columns }).map((_, i) => (
            <div key={i} className="bg-pink-500/10 border-x border-pink-500/20 relative">
              <span className="absolute top-4 left-1/2 -translate-x-1/2 text-[10px] text-pink-500 font-mono">
                {i + 1}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
