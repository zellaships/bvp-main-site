'use client';

import { useState, useEffect } from 'react';

interface SpacingDebugProps {
  enabled?: boolean;
}

/**
 * SpacingDebug - Visual debugging overlay for designers
 * 
 * Shows pixel measurements for:
 * - Container widths
 * - Section padding
 * - Element margins
 * - Grid gaps
 * - Typography sizes
 * 
 * Toggle with keyboard shortcut: Ctrl+Shift+D
 */
export function SpacingDebug({ enabled = false }: SpacingDebugProps) {
  const [isEnabled, setIsEnabled] = useState(enabled);
  const [showGrid, setShowGrid] = useState(true);
  const [showSpacing, setShowSpacing] = useState(true);
  const [showTypography, setShowTypography] = useState(true);
  const [hoveredElement, setHoveredElement] = useState<HTMLElement | null>(null);
  const [measurements, setMeasurements] = useState<{
    width: number;
    height: number;
    padding: string;
    margin: string;
    fontSize: string;
    lineHeight: string;
  } | null>(null);

  // Keyboard shortcut: Ctrl+Shift+D
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'D') {
        e.preventDefault();
        setIsEnabled(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Track hovered element measurements
  useEffect(() => {
    if (!isEnabled) return;

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('[data-debug-panel]')) return;
      
      setHoveredElement(target);
      const styles = window.getComputedStyle(target);
      const rect = target.getBoundingClientRect();
      
      setMeasurements({
        width: Math.round(rect.width),
        height: Math.round(rect.height),
        padding: `${styles.paddingTop} ${styles.paddingRight} ${styles.paddingBottom} ${styles.paddingLeft}`,
        margin: `${styles.marginTop} ${styles.marginRight} ${styles.marginBottom} ${styles.marginLeft}`,
        fontSize: styles.fontSize,
        lineHeight: styles.lineHeight,
      });
    };

    document.addEventListener('mouseover', handleMouseOver);
    return () => document.removeEventListener('mouseover', handleMouseOver);
  }, [isEnabled]);

  if (!isEnabled) {
    return (
      <button
        onClick={() => setIsEnabled(true)}
        className="fixed bottom-4 right-4 z-[9999] bg-black text-white px-3 py-2 text-xs font-mono rounded shadow-lg hover:bg-gray-800"
      >
        Debug: OFF (Ctrl+Shift+D)
      </button>
    );
  }

  return (
    <>
      {/* Debug Control Panel */}
      <div 
        data-debug-panel
        className="fixed top-20 right-4 z-[9999] bg-black text-white p-4 rounded-lg shadow-2xl font-mono text-xs w-72"
      >
        <div className="flex items-center justify-between mb-4 pb-2 border-b border-white/20">
          <span className="font-bold text-sm">🔧 Spacing Debug</span>
          <button 
            onClick={() => setIsEnabled(false)}
            className="text-white/60 hover:text-white"
          >
            ✕
          </button>
        </div>

        {/* Toggle Options */}
        <div className="space-y-2 mb-4 pb-4 border-b border-white/20">
          <label className="flex items-center gap-2 cursor-pointer">
            <input 
              type="checkbox" 
              checked={showGrid} 
              onChange={(e) => setShowGrid(e.target.checked)}
              className="rounded"
            />
            <span>Show Grid Overlay</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input 
              type="checkbox" 
              checked={showSpacing} 
              onChange={(e) => setShowSpacing(e.target.checked)}
              className="rounded"
            />
            <span>Show Spacing Labels</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input 
              type="checkbox" 
              checked={showTypography} 
              onChange={(e) => setShowTypography(e.target.checked)}
              className="rounded"
            />
            <span>Show Typography</span>
          </label>
        </div>

        {/* Hovered Element Info */}
        {measurements && (
          <div className="space-y-2">
            <div className="text-yellow-400 font-bold mb-2">Hovered Element:</div>
            <div className="grid grid-cols-2 gap-1">
              <span className="text-white/60">Width:</span>
              <span className="text-green-400">{measurements.width}px</span>
              <span className="text-white/60">Height:</span>
              <span className="text-green-400">{measurements.height}px</span>
              <span className="text-white/60">Padding:</span>
              <span className="text-blue-400 text-[10px]">{measurements.padding}</span>
              <span className="text-white/60">Margin:</span>
              <span className="text-purple-400 text-[10px]">{measurements.margin}</span>
              <span className="text-white/60">Font Size:</span>
              <span className="text-orange-400">{measurements.fontSize}</span>
              <span className="text-white/60">Line Height:</span>
              <span className="text-orange-400">{measurements.lineHeight}</span>
            </div>
          </div>
        )}

        {/* Design System Reference */}
        <div className="mt-4 pt-4 border-t border-white/20">
          <div className="text-yellow-400 font-bold mb-2">BVP Spacing Scale:</div>
          <div className="grid grid-cols-2 gap-1 text-[10px]">
            <span className="text-white/60">4px</span><span>spacing-1 (base)</span>
            <span className="text-white/60">8px</span><span>spacing-2</span>
            <span className="text-white/60">16px</span><span>spacing-4</span>
            <span className="text-white/60">24px</span><span>spacing-6</span>
            <span className="text-white/60">32px</span><span>spacing-8</span>
            <span className="text-white/60">48px</span><span>spacing-12</span>
            <span className="text-white/60">64px</span><span>spacing-16</span>
            <span className="text-white/60">80px</span><span>spacing-20</span>
            <span className="text-white/60">128px</span><span>spacing-32</span>
          </div>
        </div>

        {/* Breakpoints Reference */}
        <div className="mt-4 pt-4 border-t border-white/20">
          <div className="text-yellow-400 font-bold mb-2">Breakpoints:</div>
          <div className="grid grid-cols-2 gap-1 text-[10px]">
            <span className="text-white/60">sm</span><span>640px</span>
            <span className="text-white/60">md</span><span>768px</span>
            <span className="text-white/60">lg</span><span>1024px</span>
            <span className="text-white/60">xl</span><span>1280px</span>
            <span className="text-white/60">2xl</span><span>1400px (max)</span>
          </div>
          <div className="mt-2 text-green-400">
            Current: {typeof window !== 'undefined' ? window.innerWidth : 0}px
          </div>
        </div>
      </div>

      {/* Grid Overlay */}
      {showGrid && (
        <div className="fixed inset-0 z-[9990] pointer-events-none">
          {/* Max-width container guides */}
          <div className="h-full max-w-[1400px] mx-auto relative">
            <div className="absolute inset-y-0 left-0 w-px bg-red-500/30" />
            <div className="absolute inset-y-0 right-0 w-px bg-red-500/30" />
            {/* Padding guides (48px = px-12) */}
            <div className="absolute inset-y-0 left-12 w-px bg-blue-500/30" />
            <div className="absolute inset-y-0 right-12 w-px bg-blue-500/30" />
            {/* Labels */}
            <div className="absolute top-24 left-0 bg-red-500 text-white text-[10px] px-1">
              max-w: 1400px
            </div>
            <div className="absolute top-24 left-12 bg-blue-500 text-white text-[10px] px-1">
              px-12: 48px
            </div>
          </div>
        </div>
      )}

      {/* Hovered Element Highlight */}
      {hoveredElement && showSpacing && (
        <ElementHighlight element={hoveredElement} />
      )}
    </>
  );
}

// Highlight box around hovered element
function ElementHighlight({ element }: { element: HTMLElement }) {
  const [rect, setRect] = useState<DOMRect | null>(null);
  const [styles, setStyles] = useState<CSSStyleDeclaration | null>(null);

  useEffect(() => {
    setRect(element.getBoundingClientRect());
    setStyles(window.getComputedStyle(element));
  }, [element]);

  if (!rect || !styles) return null;

  const padding = {
    top: parseFloat(styles.paddingTop),
    right: parseFloat(styles.paddingRight),
    bottom: parseFloat(styles.paddingBottom),
    left: parseFloat(styles.paddingLeft),
  };

  return (
    <div className="fixed z-[9995] pointer-events-none" style={{
      top: rect.top + window.scrollY,
      left: rect.left + window.scrollX,
      width: rect.width,
      height: rect.height,
    }}>
      {/* Content box */}
      <div className="absolute inset-0 border-2 border-green-500/50 bg-green-500/5" />
      
      {/* Padding visualization */}
      {padding.top > 0 && (
        <div 
          className="absolute left-0 right-0 top-0 bg-blue-500/20 flex items-center justify-center"
          style={{ height: padding.top }}
        >
          <span className="text-[10px] text-blue-600 font-mono bg-white/80 px-1 rounded">
            {padding.top}px
          </span>
        </div>
      )}
      {padding.bottom > 0 && (
        <div 
          className="absolute left-0 right-0 bottom-0 bg-blue-500/20 flex items-center justify-center"
          style={{ height: padding.bottom }}
        >
          <span className="text-[10px] text-blue-600 font-mono bg-white/80 px-1 rounded">
            {padding.bottom}px
          </span>
        </div>
      )}
      {padding.left > 0 && (
        <div 
          className="absolute left-0 top-0 bottom-0 bg-blue-500/20 flex items-center justify-center"
          style={{ width: padding.left }}
        >
          <span className="text-[10px] text-blue-600 font-mono bg-white/80 px-1 rounded rotate-90">
            {padding.left}px
          </span>
        </div>
      )}
      {padding.right > 0 && (
        <div 
          className="absolute right-0 top-0 bottom-0 bg-blue-500/20 flex items-center justify-center"
          style={{ width: padding.right }}
        >
          <span className="text-[10px] text-blue-600 font-mono bg-white/80 px-1 rounded -rotate-90">
            {padding.right}px
          </span>
        </div>
      )}

      {/* Dimension labels */}
      <div className="absolute -top-5 left-1/2 -translate-x-1/2 text-[10px] text-green-600 font-mono bg-white/90 px-1 rounded shadow">
        {Math.round(rect.width)}px
      </div>
      <div className="absolute top-1/2 -right-8 -translate-y-1/2 text-[10px] text-green-600 font-mono bg-white/90 px-1 rounded shadow">
        {Math.round(rect.height)}px
      </div>
    </div>
  );
}

export default SpacingDebug;
