'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import type { SanityTeamMember } from '@/sanity/lib/types';

// ============================================
// TEAM CARD COMPONENT
// ============================================
function TeamCard({
  member,
  index,
  onClick,
  isActive
}: {
  member: SanityTeamMember;
  index: number;
  onClick: () => void;
  isActive: boolean;
}) {
  const teaser = member.bio?.split('\n\n')[0] || '';

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
      tabIndex={0}
      role="button"
      aria-label={`${member.name}, ${member.role} — tap to read full bio`}
      className={`
        relative aspect-[2/3] md:aspect-[3/4] overflow-hidden cursor-pointer bg-black
        group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FDC500] focus-visible:ring-inset
        ${isActive ? 'ring-2 ring-[#FDC500] ring-inset' : ''}
      `}
    >
      {/* Photo */}
      <div className="absolute inset-0 overflow-hidden">
        {member.photo ? (
          <Image
            src={member.photo}
            alt={member.name}
            fill
            className="object-cover object-top grayscale-[15%] group-hover:grayscale-0 group-hover:scale-[1.04] transition-all duration-[600ms] ease-out"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-[#141414]">
            <span className="font-gunterz text-[clamp(36px,8vw,80px)] text-[#252525] tracking-wider">
              {member.initials || member.name.split(' ').map(n => n[0]).join('')}
            </span>
          </div>
        )}
      </div>

      {/* Info Panel */}
      <div className="
        absolute bottom-0 left-0 right-0 bg-black z-10
        p-4 md:p-5
        transition-all duration-500 ease-out
        group-hover:pb-6
      ">
        <h3 className="font-gunterz font-bold text-white text-[clamp(17px,3.5vw,22px)] uppercase tracking-wide leading-tight min-h-[2.4em]">
          {member.name.split(' ').slice(0, -1).join(' ')}<br/>
          {member.name.split(' ').slice(-1)[0]}
        </h3>
        <div className="w-6 h-px bg-[#FDC500]/60 my-1.5 md:my-2" />
        <p className="text-[clamp(11px,1.6vw,12px)] md:text-xs uppercase tracking-[0.13em] text-[#FDC500] leading-tight">
          {member.role}
        </p>

        {/* Teaser - hidden by default, shows on hover */}
        <div className="
          overflow-hidden transition-all duration-500 ease-out
          max-h-0 opacity-0 group-hover:max-h-[120px] group-hover:opacity-100 group-hover:mt-3
        ">
          <p className="text-[12px] leading-[1.65] text-gray-400 font-light line-clamp-4">
            {teaser}
          </p>
        </div>

        {/* CTA - hidden by default, shows on hover */}
        <div className="
          flex items-center gap-1.5 text-[11px] uppercase tracking-[0.14em] text-[#FDC500]
          overflow-hidden transition-all duration-500 ease-out
          max-h-0 opacity-0 group-hover:max-h-[30px] group-hover:opacity-100 group-hover:mt-3
        ">
          <svg className="w-[11px] h-[11px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6"/>
          </svg>
          Full bio
        </div>
      </div>

      {/* Gold accent bar */}
      <div className={`
        absolute bottom-0 left-0 right-0 h-[3px] bg-[#FDC500] z-20
        origin-left transition-transform duration-400 ease-out
        ${isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}
      `} />
    </motion.article>
  );
}

// ============================================
// TEAM DRAWER COMPONENT
// ============================================
function TeamDrawer({
  member,
  index,
  totalCount,
  isOpen,
  onClose,
  onPrev,
  onNext,
}: {
  member: SanityTeamMember | null;
  index: number;
  totalCount: number;
  isOpen: boolean;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const bodyRef = useRef<HTMLDivElement>(null);
  const [dragY, setDragY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartY = useRef(0);
  const swipeStartX = useRef(0);
  const swipeStartY = useRef(0);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && index > 0) onPrev();
      if (e.key === 'ArrowRight' && index < totalCount - 1) onNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, index, totalCount, onClose, onPrev, onNext]);

  useEffect(() => {
    if (bodyRef.current && isOpen) {
      bodyRef.current.scrollTop = 0;
    }
  }, [member, isOpen]);

  const handleDragStart = useCallback((clientY: number) => {
    if (window.innerWidth >= 768) return;
    setIsDragging(true);
    dragStartY.current = clientY;
  }, []);

  const handleDragMove = useCallback((clientY: number) => {
    if (!isDragging || window.innerWidth >= 768) return;
    const delta = Math.max(0, clientY - dragStartY.current);
    setDragY(delta > 60 ? 60 + (delta - 60) * 0.4 : delta);
  }, [isDragging]);

  const handleDragEnd = useCallback(() => {
    if (!isDragging || window.innerWidth >= 768) return;
    setIsDragging(false);
    if (dragY > 100) onClose();
    setDragY(0);
  }, [isDragging, dragY, onClose]);

  const handleSwipeStart = useCallback((e: React.TouchEvent) => {
    if (window.innerWidth >= 768) return;
    swipeStartX.current = e.touches[0].clientX;
    swipeStartY.current = e.touches[0].clientY;
  }, []);

  const handleSwipeEnd = useCallback((e: React.TouchEvent) => {
    if (window.innerWidth >= 768) return;
    const dx = e.changedTouches[0].clientX - swipeStartX.current;
    const dy = Math.abs(e.changedTouches[0].clientY - swipeStartY.current);
    if (Math.abs(dx) > 60 && dy < 40) {
      if (dx < 0 && index < totalCount - 1) onNext();
      if (dx > 0 && index > 0) onPrev();
    }
  }, [index, totalCount, onNext, onPrev]);

  if (!member) return null;

  const bioParagraphs = member.bio?.split('\n\n') || [];

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/45 backdrop-blur-[8px] md:backdrop-blur-none"
          />
        )}
      </AnimatePresence>

      <div
        onTouchStart={handleSwipeStart}
        onTouchEnd={handleSwipeEnd}
        className={`
          fixed z-[100] bg-black flex flex-col overflow-hidden
          transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
          left-0 right-0 bottom-0 h-[88vh] rounded-t-[20px]
          shadow-[0_-4px_40px_rgba(0,0,0,0.4)]
          md:left-auto md:top-0 md:right-0 md:bottom-0 md:h-auto md:w-[480px] md:max-w-[95vw] md:rounded-none md:shadow-xl
          ${isOpen ? 'translate-y-0 md:translate-x-0' : 'translate-y-full md:translate-y-0 md:translate-x-full'}
        `}
        style={{
          transform: isDragging ? `translateY(${dragY}px)` : undefined,
          transition: isDragging ? 'none' : undefined,
          paddingBottom: 'env(safe-area-inset-bottom, 20px)',
        }}
        role="dialog"
        aria-modal="true"
        aria-label="Team member bio"
      >
        {/* Mobile drag handle */}
        <div
          className="flex md:hidden justify-center py-3 cursor-grab active:cursor-grabbing touch-none"
          onTouchStart={(e) => handleDragStart(e.touches[0].clientY)}
          onTouchMove={(e) => handleDragMove(e.touches[0].clientY)}
          onTouchEnd={handleDragEnd}
        >
          <div className="w-9 h-1 bg-white/10 rounded-full" />
        </div>

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 md:top-5 right-4 md:right-5 w-9 h-9 bg-white/5 hover:bg-white/10 rounded-full flex items-center justify-center transition-colors z-10"
          aria-label="Close"
        >
          <svg className="w-3.5 h-3.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>

        {/* Photo */}
        <div
          className="relative w-full bg-[#181818] shrink-0 overflow-hidden"
          style={{ height: 'calc(75% - 200px)' }}
          onTouchStart={(e) => handleDragStart(e.touches[0].clientY)}
          onTouchMove={(e) => handleDragMove(e.touches[0].clientY)}
          onTouchEnd={handleDragEnd}
        >
          {member.photo ? (
            <Image
              src={member.photo}
              alt={member.name}
              fill
              className="object-cover object-top"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="font-gunterz text-[clamp(64px,14vw,110px)] text-[#222]">
                {member.initials || member.name.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
          )}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-[1px] bg-[#FDC500]" />
        </div>

        {/* Header */}
        <div className="px-5 md:px-7 py-4 md:py-5 border-b border-[#1c1c1c] shrink-0">
          <h2 className="font-display font-bold text-white text-[clamp(24px,5vw,32px)] uppercase tracking-wide leading-tight mb-2">
            {member.name}
          </h2>
          <p className="text-[11px] uppercase tracking-[0.15em] text-[#FDC500]">
            {member.role}
          </p>
        </div>

        {/* Scrollable body */}
        <div
          ref={bodyRef}
          className="flex-1 overflow-y-auto px-5 md:px-7 py-5 md:py-6 overscroll-contain"
          style={{ scrollbarWidth: 'thin', scrollbarColor: '#222 transparent' }}
        >
          <div className="space-y-4">
            {bioParagraphs.map((p, i) => (
              <p key={i} className="text-[17px] leading-[1.75] text-gray-400">
                {p}
              </p>
            ))}
          </div>

          {member.linkedin && (
            <a
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-7 text-[11px] uppercase tracking-[0.13em] text-[#FDC500] border-b border-[#FDC500]/25 hover:border-[#FDC500] pb-0.5 transition-colors"
            >
              <svg className="w-[13px] h-[13px]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/>
                <rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
              </svg>
              LinkedIn
            </a>
          )}

          {/* Navigation */}
          <div className="flex items-center gap-2 mt-6 pt-5 border-t border-[#1c1c1c]">
            <button
              onClick={onPrev}
              disabled={index === 0}
              className="w-10 h-10 border border-[#252525] hover:border-[#FDC500] hover:bg-[#FDC500]/5 disabled:opacity-30 disabled:hover:border-[#252525] disabled:hover:bg-transparent rounded-full flex items-center justify-center transition-all"
              aria-label="Previous"
            >
              <svg className="w-3.5 h-3.5 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6"/>
              </svg>
            </button>
            <button
              onClick={onNext}
              disabled={index === totalCount - 1}
              className="w-10 h-10 border border-[#252525] hover:border-[#FDC500] hover:bg-[#FDC500]/5 disabled:opacity-30 disabled:hover:border-[#252525] disabled:hover:bg-transparent rounded-full flex items-center justify-center transition-all"
              aria-label="Next"
            >
              <svg className="w-3.5 h-3.5 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6"/>
              </svg>
            </button>
            <span className="text-[11px] tracking-widest text-[#3a3a3a] ml-2">
              {index + 1} of {totalCount}
            </span>
          </div>

          <div
            className="flex md:hidden items-center justify-center gap-1.5 pt-4 text-[11px] uppercase tracking-[0.12em] text-[#2a2a2a]"
            style={{ animation: 'fadeHint 3s ease 1s forwards' }}
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <path d="M18 8l-6 6-6-6"/>
            </svg>
            Swipe down to close
          </div>
          <style jsx>{`
            @keyframes fadeHint {
              0% { opacity: 1; }
              70% { opacity: 1; }
              100% { opacity: 0; }
            }
          `}</style>
        </div>
      </div>
    </>
  );
}

// ============================================
// TEAM SECTION COMPONENT (EXPORTED)
// ============================================
interface TeamSectionProps {
  team: SanityTeamMember[];
}

export function TeamSection({ team }: TeamSectionProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const openDrawer = (index: number) => setActiveIndex(index);
  const closeDrawer = () => setActiveIndex(null);
  const prevMember = () => {
    if (activeIndex !== null && activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
    }
  };
  const nextMember = () => {
    if (activeIndex !== null && activeIndex < team.length - 1) {
      setActiveIndex(activeIndex + 1);
    }
  };

  if (!team || team.length === 0) {
    return null;
  }

  return (
    <section
      id="founders"
      className="bg-[#f0ede8] scroll-mt-20"
      style={{ padding: 'clamp(3rem, 8vw, 5rem) clamp(1rem, 4vw, 5.75rem)' }}
    >
      <div className="max-w-[1400px] mx-auto">
        <div className="mb-10 md:mb-12 px-2 md:px-4">
          <h2
            className="font-gunterz font-bold uppercase"
            style={{ fontSize: 'clamp(1.75rem, 1rem + 3vw, 2.5rem)' }}
          >
            Our Team
          </h2>
        </div>

        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1">
            {team.map((member, index) => (
              <TeamCard
                key={member._id}
                member={member}
                index={index}
                onClick={() => openDrawer(index)}
                isActive={activeIndex === index}
              />
            ))}
          </div>
        </div>
      </div>

      <TeamDrawer
        member={activeIndex !== null ? team[activeIndex] : null}
        index={activeIndex ?? 0}
        totalCount={team.length}
        isOpen={activeIndex !== null}
        onClose={closeDrawer}
        onPrev={prevMember}
        onNext={nextMember}
      />
    </section>
  );
}
