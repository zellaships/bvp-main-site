'use client';

import React, { useState, useRef, useEffect, memo } from 'react';
import Image from 'next/image';

interface VideoHoverPlayerProps {
  /** URL of the thumbnail image */
  thumbnailUrl: string | null;
  /** Alt text for the thumbnail */
  alt: string;
  /** Whether this is a video post */
  isVideo: boolean;
  /** Use priority loading for above-fold content */
  priority?: boolean;
  /** Custom aspect ratio class */
  aspectRatio?: string;
}

/**
 * VideoHoverPlayer - Static thumbnail with polished hover effects
 *
 * Features:
 * - Smooth scale effect on hover (1.05x zoom)
 * - Gradient overlay fade-in
 * - VIDEO badge with play icon
 * - Intersection Observer for lazy loading
 */
function VideoHoverPlayerComponent({
  thumbnailUrl,
  alt,
  isVideo,
  priority = false,
  aspectRatio,
}: VideoHoverPlayerProps) {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { rootMargin: '200px', threshold: 0 }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Fallback for no thumbnail
  if (!thumbnailUrl) {
    return (
      <div className={`w-full h-full flex flex-col items-center justify-center bg-black ${aspectRatio || ''}`}>
        <p className="text-2xl font-gunterz font-bold text-white tracking-wide">BVP</p>
        <p className="text-xs tracking-[2px] uppercase text-[#FDC500] mt-2">News</p>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full cursor-pointer overflow-hidden ${aspectRatio || ''}`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Thumbnail Image */}
      <Image
        src={thumbnailUrl}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className={`object-cover transition-transform duration-700 ease-out ${
          isHovering ? 'scale-[1.05]' : 'scale-100'
        }`}
        priority={priority}
      />

      {/* Hover Gradient Overlay */}
      <div
        className={`absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent pointer-events-none transition-opacity duration-500 ${
          isHovering ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Video Badge */}
      {isVideo && (
        <div
          className={`absolute bottom-4 left-4 flex items-center gap-2 px-3 py-2 bg-black/80 backdrop-blur-sm rounded-full transition-all duration-300 ${
            isHovering ? 'bg-[#FDC500] text-black' : 'text-white'
          }`}
        >
          <svg
            className={`w-4 h-4 transition-transform duration-300 ${isHovering ? 'scale-110' : 'scale-100'}`}
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
          <span className="text-xs font-bold uppercase tracking-wider">
            Video
          </span>
        </div>
      )}

      {/* Play Button Overlay (appears on hover) */}
      {isVideo && (
        <div
          className={`absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-300 ${
            isHovering ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="w-16 h-16 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg transform transition-transform duration-300 hover:scale-110">
            <svg className="w-6 h-6 text-black ml-1" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      )}
    </div>
  );
}

export const VideoHoverPlayer = memo(VideoHoverPlayerComponent);
