'use client';

import React, { useState, useId } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import type { SanityFAQ } from '@/sanity/lib/types';

// ============================================
// ACCORDION ITEM COMPONENT
// ============================================
interface AccordionItemProps {
  item: SanityFAQ;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
  sectionIndex: number;
}

function AccordionItem({ item, isOpen, onToggle, index, sectionIndex }: AccordionItemProps) {
  const id = useId();
  const headerId = `faq-header-${sectionIndex}-${index}-${id}`;
  const panelId = `faq-panel-${sectionIndex}-${index}-${id}`;

  // Simple markdown-like link parser: [text](url) -> <a>text</a>
  const parseLinks = (text: string) => {
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    const parts: (string | React.ReactElement)[] = [];
    let lastIndex = 0;
    let match;

    while ((match = linkRegex.exec(text)) !== null) {
      // Add text before the link
      if (match.index > lastIndex) {
        parts.push(text.slice(lastIndex, match.index));
      }

      const [, linkText, url] = match;
      const isExternal = url.startsWith('http');

      if (isExternal) {
        parts.push(
          <a
            key={match.index}
            href={url}
            className="text-black font-semibold underline underline-offset-2 hover:text-bvp-navy"
            target="_blank"
            rel="noopener noreferrer"
          >
            {linkText}
          </a>
        );
      } else {
        parts.push(
          <Link
            key={match.index}
            href={url}
            className="text-black font-semibold underline underline-offset-2 hover:text-bvp-navy"
          >
            {linkText}
          </Link>
        );
      }

      lastIndex = match.index + match[0].length;
    }

    // Add remaining text
    if (lastIndex < text.length) {
      parts.push(text.slice(lastIndex));
    }

    return parts.length > 0 ? parts : text;
  };

  return (
    <div className="border-b border-gray-300">
      <h3>
        <button
          id={headerId}
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={onToggle}
          className="w-full flex items-center justify-between gap-6 py-6 text-left focus-visible:ring-2 focus-visible:ring-bvp-gold focus-visible:ring-offset-2 group"
        >
          <span className="text-lg md:text-xl font-bold group-hover:text-black transition-colors">
            {item.question}
          </span>
          <span
            className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
              isOpen
                ? "bg-black rotate-180 group-hover:bg-[#FDC500] group-hover:text-black group-active:bg-[#FDC500] group-active:text-black"
                : "bg-gray-500 group-hover:bg-black group-active:bg-[#FDC500] group-active:text-black"
            }`}
            aria-hidden="true"
          >
            <svg
              className="w-4 h-4 text-white"
              viewBox="0 0 14 14"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <polyline points="2 5 7 10 12 5" />
            </svg>
          </span>
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={panelId}
            role="region"
            aria-labelledby={headerId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="pb-6 max-w-2xl text-lg text-gray-600 leading-relaxed">
              <p>{parseLinks(item.answer)}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ============================================
// FAQ CATEGORY SECTION
// ============================================
interface FAQCategorySectionProps {
  title: string;
  items: SanityFAQ[];
  sectionIndex: number;
  openItems: Set<string>;
  onToggle: (key: string) => void;
}

function FAQCategorySection({
  title,
  items,
  sectionIndex,
  openItems,
  onToggle,
}: FAQCategorySectionProps) {
  return (
    <div className="mb-16">
      <h2 className="max-w-[816px] text-xs font-bold uppercase tracking-widest text-gray-500 mb-6 pb-4 border-b-2 border-black">
        {title}
      </h2>

      <div className="max-w-[816px]">
        {items.map((item, index) => {
          const key = `${sectionIndex}-${index}`;
          return (
            <AccordionItem
              key={item._id}
              item={item}
              isOpen={openItems.has(key)}
              onToggle={() => onToggle(key)}
              index={index}
              sectionIndex={sectionIndex}
            />
          );
        })}
      </div>
    </div>
  );
}

// ============================================
// MAIN FAQ SECTION (EXPORTED)
// ============================================
interface FAQSectionProps {
  faqs: SanityFAQ[];
}

const categoryTitles: Record<string, string> = {
  about: 'About BVP',
  involvement: 'Get Involved',
  donations: 'Donations',
  programs: 'Programs',
};

export function FAQSection({ faqs }: FAQSectionProps) {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  const handleToggle = (key: string) => {
    setOpenItems((prev) => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        const sectionIndex = key.split("-")[0];
        next.forEach((k) => {
          if (k.startsWith(sectionIndex + "-")) {
            next.delete(k);
          }
        });
        next.add(key);
      }
      return next;
    });
  };

  // Group FAQs by category
  const groupedFaqs = faqs.reduce((acc, faq) => {
    const cat = faq.category || 'about';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(faq);
    return acc;
  }, {} as Record<string, SanityFAQ[]>);

  const categories = Object.keys(groupedFaqs);

  if (faqs.length === 0) {
    return (
      <div className="py-16 text-center text-gray-500">
        No FAQs available yet. Add some in the Sanity Studio.
      </div>
    );
  }

  return (
    <>
      {categories.map((category, sectionIndex) => (
        <FAQCategorySection
          key={category}
          title={categoryTitles[category] || category}
          items={groupedFaqs[category]}
          sectionIndex={sectionIndex}
          openItems={openItems}
          onToggle={handleToggle}
        />
      ))}
    </>
  );
}
