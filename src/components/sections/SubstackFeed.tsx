'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { VideoHoverPlayer } from '@/components/ui/VideoHoverPlayer';

// Dark Green Report brand colors
const CREAM = "#F0E8D0";
const CREAM_DARK = "#E5DCBF";
const GREEN_DARK = "#1A3A1A";
const GREEN_MID = "#2D5A2D";

interface SubstackPost {
  title: string;
  description: string;
  link: string;
  pubDate: string;
  imageUrl: string | null;
  videoThumbnails?: string[];
  videoUrl?: string;
  youtubeId?: string;
  isVideo?: boolean;
}

interface VideoPreviewData {
  postId: string;
  videoId: string;
  thumbnails: {
    default: string;
    frames: string[];
  };
  video: {
    preview: string;
    standard: string;
    high: string;
  };
  previewStartTime?: number;
  previewEndTime?: number;
}

function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffHours < 1) {
      return 'Just now';
    } else if (diffHours < 24) {
      return `${diffHours} hr${diffHours === 1 ? '' : 's'} ago`;
    } else if (diffDays < 7) {
      return `${diffDays} day${diffDays === 1 ? '' : 's'} ago`;
    } else {
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined,
      });
    }
  } catch {
    return dateString;
  }
}

export function SubstackFeed() {
  const prefersReducedMotion = useReducedMotion();
  const [posts, setPosts] = useState<SubstackPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [modalPost, setModalPost] = useState<SubstackPost | null>(null);
  const [videoPreviewData, setVideoPreviewData] = useState<Record<string, VideoPreviewData | null>>({});

  // Fetch video preview data for all posts
  const fetchVideoPreviewData = useCallback(async (titles: string[]) => {
    try {
      const res = await fetch('/api/video-preview', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ titles }),
      });
      const data = await res.json();
      if (data.videos) {
        setVideoPreviewData(data.videos);
      }
    } catch (err) {
      console.warn('Failed to fetch video preview data:', err);
    }
  }, []);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await fetch('/api/substack');
        const data = await res.json();
        if (data.posts && data.posts.length > 0) {
          setPosts(data.posts);
          // Fetch video preview data for video posts
          const videoPosts = data.posts.filter((p: SubstackPost) => p.isVideo);
          if (videoPosts.length > 0) {
            fetchVideoPreviewData(videoPosts.map((p: SubstackPost) => p.title));
          }
        } else {
          setError(true);
        }
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, [fetchVideoPreviewData]);

  // Show loading skeleton
  if (loading) {
    return (
      <section
        className="border-t-4 border-[#FDC500] bg-white"
        style={{ paddingTop: 'clamp(3rem, 8vw, 8rem)', paddingBottom: 'clamp(3rem, 8vw, 8rem)' }}
      >
        <div
          className="max-w-[1400px] mx-auto"
          style={{
            paddingLeft: 'clamp(1rem, 4vw, 5.75rem)',
            paddingRight: 'clamp(1rem, 4vw, 5.75rem)',
          }}
        >
          <div className="mb-8">
            <div className="h-4 w-32 bg-gray-200 rounded animate-pulse mb-3" />
            <div className="h-10 w-3/4 bg-gray-200 rounded animate-pulse" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
                <div className="h-1 bg-[#FDC500]" />
                <div className="h-56 bg-gray-200 animate-pulse" />
                <div className="p-6">
                  <div className="h-3 w-16 bg-gray-200 rounded animate-pulse mb-3" />
                  <div className="h-6 w-full bg-gray-200 rounded animate-pulse mb-2" />
                  <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Show error fallback
  if (error || posts.length === 0) {
    return (
      <section
        className="border-t-4 border-[#FDC500] bg-white"
        style={{ paddingTop: 'clamp(3rem, 8vw, 8rem)', paddingBottom: 'clamp(3rem, 8vw, 8rem)' }}
      >
        <div
          className="max-w-[1400px] mx-auto text-center"
          style={{
            paddingLeft: 'clamp(1rem, 4vw, 5.75rem)',
            paddingRight: 'clamp(1rem, 4vw, 5.75rem)',
          }}
        >
          <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">
            From Our Substack
          </p>
          <h2 className="font-gunterz font-bold text-2xl mb-4">
            Stories from the Movement
          </h2>
          <a
            href="https://blackveteransproject.substack.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-2.5 text-base font-bold tracking-wide rounded-full border-2 border-black bg-white text-black transition-all duration-300 hover:bg-black hover:text-[#FDC500]"
          >
            Visit Our Substack
            <svg className="w-4 h-4 ml-2 -rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </section>
    );
  }

  // Get thumbnail for a post - use video preview data if available
  const getPostThumbnail = (post: SubstackPost): string | null => {
    // First check if we have video preview data
    const previewData = videoPreviewData[post.title];
    if (previewData?.thumbnails?.default) {
      return previewData.thumbnails.default;
    }

    // Fallback to hardcoded thumbnails for known video posts
    const lowerTitle = post.title.toLowerCase();
    if (lowerTitle.includes('kyle bibby')) {
      return 'https://substack-video.s3.amazonaws.com/video_upload/post/205756958/090a140a-c077-418f-aa37-c54b0c13868a/transcoded-00001.png';
    }
    if (lowerTitle.includes('daniele anderson')) {
      return 'https://substack-video.s3.amazonaws.com/video_upload/post/205701935/9efe6ebe-08bd-4e2e-9794-5f7d7b19fefc/transcoded-00001.png';
    }
    if (lowerTitle.includes('zella vanie')) {
      return 'https://substack-video.s3.amazonaws.com/video_upload/post/205701936/78e36313-dedc-4a36-b9d4-5b72bb91c36b/transcoded-00001.png';
    }
    if (lowerTitle.includes('rich brookshire')) {
      return 'https://substack-video.s3.amazonaws.com/video_upload/post/204565342/e00af18f-de75-4033-b60a-af01beab8968/transcoded-00001.png';
    }
    if (lowerTitle.includes('congressional') || lowerTitle.includes('testimony')) {
      return 'https://substack-video.s3.amazonaws.com/video_upload/post/189895249/bfad24c4-b3be-422f-b983-393f3840145c/transcoded-00001.png';
    }

    // Otherwise use the post's image
    return post.imageUrl;
  };

  // Get video URL for preview playback
  const getVideoPreviewUrl = (post: SubstackPost): string | undefined => {
    const previewData = videoPreviewData[post.title];
    if (previewData?.video?.preview) {
      return previewData.video.preview;
    }

    // Fallback to building URL from known video IDs
    const lowerTitle = post.title.toLowerCase();
    const videoMappings: Record<string, { postId: string; uuid: string }> = {
      'kyle bibby': { postId: '205756958', uuid: '090a140a-c077-418f-aa37-c54b0c13868a' },
      'daniele anderson': { postId: '205701935', uuid: '9efe6ebe-08bd-4e2e-9794-5f7d7b19fefc' },
      'zella vanie': { postId: '205701936', uuid: '78e36313-dedc-4a36-b9d4-5b72bb91c36b' },
      'rich brookshire': { postId: '204565342', uuid: 'e00af18f-de75-4033-b60a-af01beab8968' },
      'congressional': { postId: '189895249', uuid: 'bfad24c4-b3be-422f-b983-393f3840145c' },
    };

    for (const [key, mapping] of Object.entries(videoMappings)) {
      if (lowerTitle.includes(key)) {
        return `https://substack-video.s3.amazonaws.com/video_upload/post/${mapping.postId}/${mapping.uuid}/720p.mp4`;
      }
    }

    return undefined;
  };

  // Use posts in natural order from RSS feed (newest first)
  const [featured, ...rest] = posts;
  const secondaryPosts = rest.slice(0, 2);

  return (
    <>
      <section
        className="border-t-4 border-[#FDC500] bg-white"
        style={{ paddingTop: 'clamp(3rem, 8vw, 8rem)', paddingBottom: 'clamp(3rem, 8vw, 8rem)' }}
      >
        <div
          className="max-w-[1400px] mx-auto"
          style={{
            paddingLeft: 'clamp(1rem, 4vw, 5.75rem)',
            paddingRight: 'clamp(1rem, 4vw, 5.75rem)',
          }}
        >
          {/* Featured Story */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 items-center">
            <div className="flex flex-col justify-center order-2 md:order-1">
              <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">
                From Our Substack
              </p>
              <h2
                className="font-gunterz font-bold leading-tight mb-3"
                style={{ fontSize: 'clamp(1.5rem, 0.75rem + 3vw, 2.5rem)' }}
              >
                {featured.title}
              </h2>
              <p className="text-gray-600 mb-4" style={{ fontSize: 'clamp(0.9rem, 1.5vw, 1rem)' }}>
                {featured.description}
              </p>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setModalPost(featured)}
                  className="inline-flex items-center px-6 py-2.5 text-base font-bold tracking-wide rounded-full border-2 border-black bg-white text-black transition-all duration-300 hover:bg-black hover:text-[#FDC500] hover:border-black active:scale-95"
                >
                  Read Article
                  <svg className="w-4 h-4 ml-2 -rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
                <span className="text-sm text-gray-400">{formatDate(featured.pubDate)}</span>
              </div>
            </div>

            {/* Featured Image with Video Hover */}
            <button
              onClick={() => setModalPost(featured)}
              className="relative group cursor-pointer text-left order-1 md:order-2"
            >
              <div className="relative aspect-[16/10] overflow-hidden rounded-2xl shadow-lg group-hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-1">
                <div className="w-full h-full">
                  <VideoHoverPlayer
                    thumbnailUrl={getPostThumbnail(featured)}
                    alt={featured.title}
                    isVideo={featured.isVideo || false}
                    priority
                  />
                </div>
              </div>
            </button>
          </div>

          {/* Secondary Stories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {secondaryPosts.map((post, index) => (
              <div
                key={post.link || index}
                onClick={() => setModalPost(post)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && setModalPost(post)}
                className="group cursor-pointer transition-all duration-300 hover:-translate-y-1"
              >
                {/* Image section with Video Hover */}
                <div className="relative overflow-hidden rounded-t-2xl shadow-lg group-hover:shadow-2xl transition-shadow duration-500">
                  <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#FDC500] z-10" />
                  <div className="relative w-full h-72">
                    <VideoHoverPlayer
                      thumbnailUrl={getPostThumbnail(post)}
                      alt={post.title}
                      isVideo={post.isVideo || false}
                    />
                  </div>
                </div>
                {/* Content section - separate container */}
                <div className="bg-white p-6 rounded-b-2xl border border-t-0 border-gray-100">
                  <span
                    className="inline-block text-[0.55rem] font-bold uppercase tracking-[0.2em] px-2 py-1 rounded-sm"
                    style={{ backgroundColor: '#0D0D0B', color: '#FFFFFF' }}
                  >
                    Substack
                  </span>
                  <h3 className="font-ontika font-medium text-xl leading-tight mt-3 mb-3" style={{ color: '#0D0D0B' }}>
                    {post.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {post.description}
                  </p>
                  <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200">
                    <span className="text-sm" style={{ color: '#767670' }}>{formatDate(post.pubDate)}</span>
                    <span className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-black group-hover:text-[#FDC500] transition-colors">
                      Read More
                      <svg className="w-4 h-4 -rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* View All Link */}
          <div className="text-center mt-8">
            <a
              href="https://blackveteransproject.substack.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-sm font-bold uppercase tracking-wide text-gray-500 hover:text-black transition-colors"
            >
              View all posts on Substack
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Dark Green Report Modal */}
      <AnimatePresence>
        {modalPost && (
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            onClick={() => setModalPost(null)}
          >
            {/* Backdrop */}
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            />

            {/* Modal */}
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 28, stiffness: 350 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-md w-full rounded-xl overflow-hidden shadow-2xl"
              style={{
                backgroundColor: CREAM,
                boxShadow: `0 32px 80px rgba(0,0,0,0.5), 0 0 0 1px ${CREAM_DARK}`,
              }}
            >
              {/* Top green gradient bar */}
              <div
                className="h-1"
                style={{ background: `linear-gradient(90deg, ${GREEN_DARK}, ${GREEN_MID}, ${GREEN_DARK})` }}
              />

              <div className="p-8 md:p-10">
                {/* Close button */}
                <button
                  onClick={() => setModalPost(null)}
                  className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full transition-colors"
                  style={{ color: GREEN_MID }}
                >
                  <svg className="w-5 h-5 opacity-50 hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                {/* Publication Header */}
                <motion.div
                  initial={prefersReducedMotion ? false : { scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.1, type: "spring", damping: 20 }}
                  className="flex flex-col items-center mb-6"
                >
                  <p className="text-xl font-gunterz font-bold text-black tracking-wide">BVP</p>
                  <p className="text-sm tracking-[2px] uppercase text-gray-500 mt-1">News</p>
                </motion.div>

                {/* Divider */}
                <div
                  className="w-10 h-px mx-auto mb-6"
                  style={{ backgroundColor: GREEN_DARK, opacity: 0.15 }}
                />

                {/* Article title */}
                <h2
                  className="text-center text-2xl md:text-[26px] leading-tight mb-3"
                  style={{
                    color: GREEN_DARK,
                    fontFamily: "'Georgia', 'Times New Roman', serif",
                    fontWeight: 400,
                  }}
                >
                  {modalPost.title}
                </h2>

                {/* Description */}
                <p
                  className="text-center text-sm leading-relaxed mb-8 opacity-70"
                  style={{ color: GREEN_MID }}
                >
                  This article lives on our Substack publication.
                  <br />
                  You'll be taken there to continue reading.
                </p>

                {/* Actions */}
                <div className="flex flex-col items-center gap-3">
                  <motion.a
                    href={modalPost.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setModalPost(null)}
                    className="w-full px-8 py-4 text-base font-bold tracking-wide rounded-full inline-flex items-center justify-center gap-3"
                    style={{ backgroundColor: GREEN_DARK, color: CREAM }}
                    whileHover={{ backgroundColor: GREEN_MID }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    Read on Dark Green Report
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                      <polyline points="15 3 21 3 21 9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                  </motion.a>

                  <motion.button
                    onClick={() => setModalPost(null)}
                    className="px-6 py-3 text-sm"
                    style={{ color: GREEN_MID }}
                    initial={{ opacity: 0.5 }}
                    whileHover={{ opacity: 0.8, color: GREEN_DARK }}
                    transition={{ duration: 0.2 }}
                  >
                    Stay on BVP
                  </motion.button>
                </div>
              </div>

              {/* Bottom subtle gradient */}
              <div
                className="h-0.5"
                style={{ background: `linear-gradient(90deg, transparent, ${GREEN_DARK}15, transparent)` }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
