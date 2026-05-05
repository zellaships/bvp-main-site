'use client';

import { useState, useMemo } from 'react';
import type { SanityPress } from '@/sanity/lib/types';

// ============================================
// TYPES
// ============================================
type PressType = 'all' | 'news' | 'opinion' | 'broadcast';
type PressTopic = 'all' | 'monk-case' | 'gi-bill' | 'dei' | 'policy' | 'benefits';

// ============================================
// FILTER PILL COMPONENT
// ============================================
interface FilterPillProps {
  label: string;
  active: boolean;
  onClick: () => void;
}

function FilterPill({ label, active, onClick }: FilterPillProps) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2.5 min-h-[44px] text-[17px] font-semibold rounded-md border transition-all duration-200 focus-visible:ring-2 focus-visible:ring-bvp-gold focus-visible:ring-offset-2 ${
        active
          ? 'bg-black text-white border-black hover:bg-gray-800 active:bg-gray-900'
          : 'bg-transparent text-gray-500 border-gray-300 hover:border-bvp-gold hover:text-black hover:bg-bvp-gold/10 active:bg-bvp-gold/20'
      }`}
      aria-pressed={active}
    >
      {label}
    </button>
  );
}

// ============================================
// TAG COMPONENT
// ============================================
function Tag({ label }: { label: string }) {
  return (
    <span className="text-xs font-bold uppercase px-2 py-0.5 border border-gray-300 text-gray-400">
      {label}
    </span>
  );
}

// ============================================
// PRESS ITEM COMPONENT
// ============================================
function PressItemRow({ item }: { item: SanityPress }) {
  const typeLabels: Record<string, string> = {
    news: 'News',
    opinion: 'Opinion',
    broadcast: 'Broadcast',
  };

  const topicLabels: Record<string, string> = {
    'monk-case': 'Monk Case',
    'gi-bill': 'GI Bill',
    dei: 'DEI',
    policy: 'Policy',
    benefits: 'Benefits',
  };

  // Parse date
  const dateObj = new Date(item.date);
  const month = dateObj.toLocaleString('en-US', { month: 'short' });
  const day = dateObj.getDate().toString().padStart(2, '0');
  const year = dateObj.getFullYear().toString();

  const content = (
    <>
      {/* Date */}
      <div>
        <div className="text-xs font-bold uppercase text-gray-400">{month}</div>
        <div className="text-3xl font-black leading-none">{day}</div>
        <div className="text-xs text-gray-300">{year}</div>
      </div>

      {/* Content */}
      <div>
        <div className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">
          {item.source || 'Unknown Source'}
        </div>
        <h3 className="text-lg font-bold mb-1 leading-snug group-hover:text-[#FDC500] transition-colors">
          {item.title}
        </h3>
        {item.author && <div className="text-xs text-gray-400">{item.author}</div>}
        <div className="flex flex-wrap gap-1 mt-2">
          {item.type && item.type !== 'news' && <Tag label={typeLabels[item.type]} />}
          {item.topics?.map((topic) => (
            <Tag key={topic} label={topicLabels[topic] || topic} />
          ))}
        </div>
      </div>
    </>
  );

  if (item.url) {
    return (
      <a
        href={item.url}
        target="_blank"
        rel="noopener noreferrer"
        className="group grid grid-cols-[56px_1fr] md:grid-cols-[80px_1fr] lg:grid-cols-[80px_1fr] gap-4 md:gap-7 py-7 border-b border-gray-200 items-start hover:bg-gray-50 -mx-4 px-4 transition-colors"
      >
        {content}
      </a>
    );
  }

  return (
    <article className="grid grid-cols-[56px_1fr] md:grid-cols-[80px_1fr] lg:grid-cols-[80px_1fr] gap-4 md:gap-7 py-7 border-b border-gray-200 items-start">
      {content}
    </article>
  );
}

// ============================================
// YEAR HEADER COMPONENT
// ============================================
function YearHeader({ year, count }: { year: string; count: number }) {
  return (
    <div className="flex items-center gap-3 pt-12 pb-3 max-w-[608px]">
      <span className="text-sm font-extrabold">{year}</span>
      <span className="flex-1 h-0.5 bg-black" aria-hidden="true" />
      <span className="text-xs text-gray-400">
        {count} item{count !== 1 ? 's' : ''}
      </span>
    </div>
  );
}

// ============================================
// PRESS SECTION (EXPORTED)
// ============================================
interface PressSectionProps {
  pressItems: SanityPress[];
}

export function PressSection({ pressItems }: PressSectionProps) {
  const [typeFilter, setTypeFilter] = useState<PressType>('all');
  const [topicFilter, setTopicFilter] = useState<PressTopic>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter items
  const filteredItems = useMemo(() => {
    return pressItems.filter((item) => {
      if (typeFilter !== 'all' && item.type !== typeFilter) return false;
      if (topicFilter !== 'all' && !item.topics?.includes(topicFilter)) return false;
      if (searchQuery) {
        const searchLower = searchQuery.toLowerCase();
        const searchText = `${item.title} ${item.source || ''} ${item.author || ''}`.toLowerCase();
        if (!searchText.includes(searchLower)) return false;
      }
      return true;
    });
  }, [pressItems, typeFilter, topicFilter, searchQuery]);

  // Group items by year
  const groupedByYear = useMemo(() => {
    const groups: Record<string, SanityPress[]> = {};
    filteredItems.forEach((item) => {
      const year = new Date(item.date).getFullYear().toString();
      if (!groups[year]) groups[year] = [];
      groups[year].push(item);
    });
    return Object.entries(groups).sort(([a], [b]) => parseInt(b) - parseInt(a));
  }, [filteredItems]);

  const typeFilters: { value: PressType; label: string }[] = [
    { value: 'all', label: 'All' },
    { value: 'news', label: 'News' },
    { value: 'opinion', label: 'Opinion' },
    { value: 'broadcast', label: 'Broadcast' },
  ];

  const topicFilters: { value: PressTopic; label: string }[] = [
    { value: 'all', label: 'All' },
    { value: 'monk-case', label: 'Monk Case' },
    { value: 'gi-bill', label: 'GI Bill' },
    { value: 'dei', label: 'DEI' },
    { value: 'policy', label: 'Policy' },
  ];

  return (
    <>
      {/* Filter Bar */}
      <div className="sticky top-[56px] md:top-[60px] z-30 bg-white border-b border-gray-200">
        <div
          className="space-y-4 md:space-y-0 md:flex md:flex-wrap md:items-center md:gap-6"
          style={{ padding: 'clamp(0.75rem, 2vw, 1rem) clamp(1rem, 4vw, 5.75rem)' }}
        >
          {/* Type Filters */}
          <div role="group" aria-label="Filter by type">
            <span className="block mb-2 md:hidden text-[13px] font-bold uppercase tracking-wider text-gray-400">
              Type
            </span>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="hidden md:block text-[13px] font-bold uppercase tracking-wider text-gray-400 mr-1">
                Type
              </span>
              {typeFilters.map((filter) => (
                <FilterPill
                  key={filter.value}
                  label={filter.label}
                  active={typeFilter === filter.value}
                  onClick={() => setTypeFilter(filter.value)}
                />
              ))}
            </div>
          </div>

          {/* Topic Filters */}
          <div role="group" aria-label="Filter by topic">
            <span className="block mb-2 md:hidden text-[13px] font-bold uppercase tracking-wider text-gray-400">
              Topic
            </span>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="hidden md:block text-[13px] font-bold uppercase tracking-wider text-gray-400 mr-1">
                Topic
              </span>
              {topicFilters.map((filter) => (
                <FilterPill
                  key={filter.value}
                  label={filter.label}
                  active={topicFilter === filter.value}
                  onClick={() => setTopicFilter(filter.value)}
                />
              ))}
            </div>
          </div>

          {/* Search */}
          <div className="w-full md:w-auto md:ml-auto">
            <label htmlFor="press-search" className="sr-only">
              Search archive
            </label>
            <input
              id="press-search"
              type="text"
              placeholder="Search archive..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full md:w-56 border border-gray-300 px-4 py-3 min-h-[44px] text-[16px] bg-transparent transition-colors focus:border-black focus:outline-none rounded-md"
            />
          </div>
        </div>

        {/* Results Count */}
        <div
          className="flex justify-between py-3 text-[13px] font-semibold text-gray-400 tracking-wide border-t border-gray-100"
          style={{ padding: '0.75rem clamp(1rem, 4vw, 5.75rem)' }}
        >
          <span>
            {filteredItems.length} RESULT{filteredItems.length !== 1 ? 'S' : ''}
          </span>
          <span>NEWEST FIRST</span>
        </div>
      </div>

      {/* Press Feed */}
      <section className="bg-gray-100">
        <div
          className="max-w-[1400px] mx-auto"
          style={{ padding: '0 clamp(1rem, 4vw, 5.75rem) clamp(3rem, 8vw, 6rem)' }}
        >
          {groupedByYear.length > 0 ? (
            groupedByYear.map(([year, items]) => (
              <div key={year}>
                <YearHeader year={year} count={items.length} />
                {items.map((item) => (
                  <PressItemRow key={item._id} item={item} />
                ))}
              </div>
            ))
          ) : (
            <div className="py-16 text-center">
              <p className="text-gray-500">
                {pressItems.length === 0
                  ? 'No press items yet. Add some in the Sanity Studio.'
                  : 'No press items match your filters.'}
              </p>
              {pressItems.length > 0 && (
                <button
                  onClick={() => {
                    setTypeFilter('all');
                    setTopicFilter('all');
                    setSearchQuery('');
                  }}
                  className="mt-4 text-[17px] font-semibold text-black hover:text-bvp-navy underline underline-offset-2 min-h-[44px] inline-flex items-center"
                >
                  Clear all filters
                </button>
              )}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
