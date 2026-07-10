'use client';

import React, {
  useState,
  useRef,
  useCallback,
  useEffect,
  memo,
} from 'react';
import Image from 'next/image';

interface VideoHoverPlayerProps {
  /** URL of the thumbnail image */
  thumbnailUrl: string | null;
  /** Alt text for the thumbnail */
  alt: string;
  /** URL of the preview video (480p or 720p) */
  videoUrl?: string;
  /** Whether this is a video post */
  isVideo: boolean;
  /** Use priority loading for above-fold content */
  priority?: boolean;
  /** Optional preview start time in seconds */
  previewStartTime?: number;
  /** Optional preview end time in seconds */
  previewEndTime?: number;
  /** Custom aspect ratio class */
  aspectRatio?: string;
  /** Called when video starts playing */
  onPlayStart?: () => void;
  /** Called when video fails to play */
  onPlayError?: (error: Error) => void;
}

// Hover delay before starting video (ms) - matches YouTube behavior
const HOVER_DELAY = 400;

// Preload strategy: distance from viewport to start preloading
const PRELOAD_THRESHOLD = '200px';

/**
 * VideoHoverPlayer - Enterprise-grade video hover preview component
 *
 * Features:
 * - Silent autoplay on hover (like YouTube)
 * - Graceful fallback for browsers blocking autoplay
 * - Thumbnail shown while loading/paused
 * - Progress bar indicator
 * - Touch device support (long press to preview)
 * - Intersection Observer for lazy loading
 * - Memory-efficient video loading/unloading
 */
function VideoHoverPlayerComponent({
  thumbnailUrl,
  alt,
  videoUrl,
  isVideo,
  priority = false,
  previewStartTime = 0,
  previewEndTime,
  aspectRatio,
  onPlayStart,
  onPlayError,
}: VideoHoverPlayerProps) {
  // State
  const [isHovering, setIsHovering] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [hasError, setHasError] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);

  // Refs
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const hoverTimerRef = useRef<NodeJS.Timeout | null>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const touchTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Cleanup function
  const cleanup = useCallback(() => {
    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current);
      hoverTimerRef.current = null;
    }
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }
    if (touchTimerRef.current) {
      clearTimeout(touchTimerRef.current);
      touchTimerRef.current = null;
    }
  }, []);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        rootMargin: PRELOAD_THRESHOLD,
        threshold: 0,
      }
    );

    observer.observe(containerRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      cleanup();
      // Ensure video is paused and unloaded
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.src = '';
        videoRef.current.load();
      }
    };
  }, [cleanup]);

  // Handle video time update for progress bar
  const handleTimeUpdate = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    const duration = previewEndTime
      ? previewEndTime - previewStartTime
      : video.duration - previewStartTime;
    const currentTime = video.currentTime - previewStartTime;
    const newProgress = Math.min((currentTime / duration) * 100, 100);
    setProgress(newProgress);

    // Loop back to start if we reach the end
    if (previewEndTime && video.currentTime >= previewEndTime) {
      video.currentTime = previewStartTime;
    }
  }, [previewStartTime, previewEndTime]);

  // Start video playback
  const startPlayback = useCallback(async () => {
    const video = videoRef.current;
    if (!video || !videoUrl || hasError) return;

    setIsLoading(true);

    try {
      // Set start time
      video.currentTime = previewStartTime;

      // Ensure video is muted (required for autoplay)
      video.muted = true;

      // Attempt to play
      await video.play();

      setIsPlaying(true);
      setIsLoading(false);
      onPlayStart?.();

      // Start progress tracking
      progressIntervalRef.current = setInterval(() => {
        handleTimeUpdate();
      }, 100);
    } catch (error) {
      console.warn('Video autoplay failed:', error);
      setIsLoading(false);
      setHasError(true);
      onPlayError?.(error as Error);
    }
  }, [videoUrl, previewStartTime, hasError, onPlayStart, onPlayError, handleTimeUpdate]);

  // Stop video playback
  const stopPlayback = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    cleanup();

    video.pause();
    video.currentTime = previewStartTime;
    setIsPlaying(false);
    setProgress(0);
  }, [cleanup, previewStartTime]);

  // Mouse enter handler
  const handleMouseEnter = useCallback(() => {
    if (!isVideo || !videoUrl || hasError) return;

    setIsHovering(true);

    // Delay before starting playback (like YouTube)
    hoverTimerRef.current = setTimeout(() => {
      startPlayback();
    }, HOVER_DELAY);
  }, [isVideo, videoUrl, hasError, startPlayback]);

  // Mouse leave handler
  const handleMouseLeave = useCallback(() => {
    setIsHovering(false);
    cleanup();
    stopPlayback();
  }, [cleanup, stopPlayback]);

  // Touch start handler (for mobile - long press to preview)
  const handleTouchStart = useCallback(() => {
    if (!isVideo || !videoUrl || hasError) return;

    touchTimerRef.current = setTimeout(() => {
      setIsHovering(true);
      startPlayback();
    }, 500); // 500ms long press
  }, [isVideo, videoUrl, hasError, startPlayback]);

  // Touch end handler
  const handleTouchEnd = useCallback(() => {
    if (touchTimerRef.current) {
      clearTimeout(touchTimerRef.current);
      touchTimerRef.current = null;
    }
    // Don't stop playback on touch end - let user watch
  }, []);

  // Video loaded handler
  const handleVideoLoaded = useCallback(() => {
    setVideoLoaded(true);
  }, []);

  // Video error handler
  const handleVideoError = useCallback(() => {
    setHasError(true);
    setIsLoading(false);
    setIsPlaying(false);
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

  const showVideo = isVisible && isVideo && videoUrl && !hasError;

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full cursor-pointer overflow-hidden ${aspectRatio || ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Thumbnail Image */}
      <Image
        src={thumbnailUrl}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className={`object-cover transition-all duration-500 ${
          isHovering ? 'scale-105' : 'scale-100'
        } ${isPlaying ? 'opacity-0' : 'opacity-100'}`}
        priority={priority}
      />

      {/* Video Element (lazy loaded when visible) */}
      {showVideo && (
        <video
          ref={videoRef}
          src={videoUrl}
          muted
          playsInline
          preload={isVisible ? 'metadata' : 'none'}
          onLoadedData={handleVideoLoaded}
          onError={handleVideoError}
          onEnded={() => {
            if (videoRef.current) {
              videoRef.current.currentTime = previewStartTime;
              videoRef.current.play();
            }
          }}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
            isPlaying && videoLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          aria-hidden="true"
        />
      )}

      {/* Loading Indicator */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-[1px]">
          <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        </div>
      )}

      {/* Video Indicator Badge */}
      {isVideo && (
        <div
          className={`absolute bottom-3 left-3 flex items-center gap-2 px-2.5 py-1.5 bg-black/80 backdrop-blur-sm rounded-full z-10 transition-opacity duration-300 ${
            isPlaying ? 'opacity-0' : 'opacity-100'
          }`}
        >
          <svg className="w-3.5 h-3.5 text-white" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5v14l11-7z" />
          </svg>
          <span className="text-xs font-medium text-white uppercase tracking-wide">
            Video
          </span>
        </div>
      )}

      {/* Progress Bar (shown during playback) */}
      {isPlaying && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/30 z-10">
          <div
            className="h-full bg-[#FDC500] transition-all duration-100 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}

      {/* Hover Gradient Overlay */}
      <div
        className={`absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none transition-opacity duration-300 ${
          isHovering && !isPlaying ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Playing State Indicator (subtle) */}
      {isPlaying && (
        <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2 py-1 bg-black/60 backdrop-blur-sm rounded-full z-10">
          <span className="flex gap-0.5">
            <span className="w-0.5 h-2 bg-white rounded-full animate-pulse" style={{ animationDelay: '0ms' }} />
            <span className="w-0.5 h-3 bg-white rounded-full animate-pulse" style={{ animationDelay: '150ms' }} />
            <span className="w-0.5 h-2 bg-white rounded-full animate-pulse" style={{ animationDelay: '300ms' }} />
          </span>
        </div>
      )}
    </div>
  );
}

// Memoize to prevent unnecessary re-renders
export const VideoHoverPlayer = memo(VideoHoverPlayerComponent);
