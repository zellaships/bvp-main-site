"use client";

import { useState, useMemo } from "react";

// ============================================
// TYPES
// ============================================
type PressType = "all" | "news" | "opinion" | "broadcast";
type PressTopic = "all" | "monk-case" | "gi-bill" | "dei" | "policy" | "benefits";

interface PressItem {
  id: string;
  date: { month: string; day: string; year: string };
  source: string;
  headline: string;
  author: string;
  type: Exclude<PressType, "all">;
  topics: Exclude<PressTopic, "all">[];
  url?: string;
}

// ============================================
// PRESS DATA
// ============================================
const pressItems: PressItem[] = [
  // 2025
  {
    id: "1",
    date: { month: "May", day: "29", year: "2025" },
    source: "The Grio",
    headline: "Marine Corps' new grooming policy slammed for targeting Black men",
    author: "By Kyle Bibby",
    type: "opinion",
    topics: ["policy"],
  },
  {
    id: "2",
    date: { month: "May", day: "28", year: "2025" },
    source: "CNN",
    headline: "The Pentagon's DEI purge ignores lessons from America's biggest military disasters",
    author: "By Kyle Bibby",
    type: "opinion",
    topics: ["dei"],
  },
  {
    id: "3",
    date: { month: "Apr", day: "05", year: "2025" },
    source: "The Hill",
    headline: "Black veterans sound the alarm over military DEI purge",
    author: "By Kyle Bibby",
    type: "opinion",
    topics: ["dei"],
  },
  {
    id: "4",
    date: { month: "Mar", day: "21", year: "2025" },
    source: "USA Today",
    headline: "'Appalled': Pentagon restores web pages on Navajo code talkers, Jackie Robinson",
    author: "Featuring Kyle Bibby",
    type: "news",
    topics: ["dei"],
  },
  {
    id: "5",
    date: { month: "Mar", day: "20", year: "2025" },
    source: "CNN",
    headline: "Co-founder of Black Veterans Project slams Trump administration for DEI purge",
    author: "Featuring Richard Brookshire",
    type: "broadcast",
    topics: ["dei"],
  },
  {
    id: "6",
    date: { month: "Mar", day: "11", year: "2025" },
    source: "ProPublica",
    headline: "The Office That Investigates Disparities in Veterans' Care Is Being \"Liquidated\"",
    author: "Featuring Richard Brookshire",
    type: "news",
    topics: ["dei", "benefits"],
  },
  // 2024
  {
    id: "7",
    date: { month: "May", day: "27", year: "2024" },
    source: "Yes! Magazine",
    headline: "The Military's Myth of Black Freedom",
    author: "By Kyle Bibby",
    type: "opinion",
    topics: ["gi-bill"],
  },
  // 2023
  {
    id: "8",
    date: { month: "Mar", day: "20", year: "2023" },
    source: "Meet the Press: Now",
    headline: "New Report Proves Disparities in PTSD Care for Black Veterans",
    author: "By Lucy Bustamante",
    type: "broadcast",
    topics: ["benefits"],
  },
  {
    id: "9",
    date: { month: "Mar", day: "17", year: "2023" },
    source: "NBC News",
    headline: "Black Veterans Were More Often Denied VA Benefits Than White Veterans",
    author: "Featuring Richard Brookshire · By Laura Stickler",
    type: "news",
    topics: ["benefits"],
  },
  {
    id: "10",
    date: { month: "Mar", day: "03", year: "2023" },
    source: "Al Jazeera English",
    headline: "Upfront with Marc Lamont Hill: What Is Behind the US Military's Recruitment Crisis?",
    author: "Featuring Richard Brookshire · By Marc Lamont Hill",
    type: "broadcast",
    topics: ["policy"],
  },
  {
    id: "11",
    date: { month: "Feb", day: "27", year: "2023" },
    source: "NBC News",
    headline: "American Vets: Benefits, Race & Inequality",
    author: "Featuring Richard Brookshire · By Lucy Bustamante",
    type: "broadcast",
    topics: ["benefits"],
  },
  // 2022
  {
    id: "12",
    date: { month: "Dec", day: "03", year: "2022" },
    source: "PBS NewsHour",
    headline: "Black Veterans Sue VA Over Racial Disparities",
    author: "Featuring Richard Brookshire & Conley Monk · By Geoff Bennett",
    type: "broadcast",
    topics: ["monk-case"],
  },
  {
    id: "13",
    date: { month: "Nov", day: "28", year: "2022" },
    source: "NBC News",
    headline: "Veterans Affairs Has Denied Benefits to Black People at Higher Rates for Years, Lawsuit Alleges",
    author: "Featuring Richard Brookshire · By Victoria Ebner",
    type: "news",
    topics: ["monk-case", "benefits"],
  },
  {
    id: "14",
    date: { month: "Oct", day: "18", year: "2022" },
    source: "NPR",
    headline: "Black Vets Were Excluded from GI Bill Benefits",
    author: "Featuring Richard Brookshire · By Quil Lawrence",
    type: "broadcast",
    topics: ["gi-bill"],
  },
  // 2021
  {
    id: "15",
    date: { month: "Oct", day: "21", year: "2021" },
    source: "New York Times",
    headline: "Veterans Struggle With Issues That Are Often Invisible to Others",
    author: "Featuring Richard Brookshire · By Jennifer Steinhauer",
    type: "news",
    topics: ["benefits"],
  },
  {
    id: "16",
    date: { month: "Feb", day: "01", year: "2021" },
    source: "New York Times",
    headline: "'Mind Boggling' and 'Deadly.' This Is the Trump V.A.'s Racist Legacy.",
    author: "By Jasper Craven",
    type: "opinion",
    topics: ["benefits"],
  },
  // 2020
  {
    id: "17",
    date: { month: "Sep", day: "15", year: "2020" },
    source: "Reuters",
    headline: "U.S. Troops Battling Racism Report High Barrier to Justice",
    author: "By Phil Stewart",
    type: "news",
    topics: ["policy"],
  },
  {
    id: "18",
    date: { month: "Jun", day: "04", year: "2020" },
    source: "New York Times",
    headline: "Serving in the Army as a Queer Black Man Opened My Eyes to Racism in America",
    author: "By Richard Brookshire · As told to Jon Ismay",
    type: "opinion",
    topics: ["policy"],
  },
  // 2019
  {
    id: "19",
    date: { month: "May", day: "27", year: "2019" },
    source: "BBC",
    headline: "America's Strained Salute to Its Black Veterans",
    author: "Featuring Richard Brookshire · By James Jeffrey",
    type: "news",
    topics: ["benefits"],
  },
];

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
      className={`px-3 py-1.5 text-[11px] font-semibold rounded-[3px] border transition-colors focus-visible:ring-2 focus-visible:ring-bvp-gold focus-visible:ring-offset-2 ${
        active
          ? "bg-[#1a1a1a] text-white border-[#1a1a1a]"
          : "bg-transparent text-gray-400 border-gray-300 hover:border-gray-500 hover:text-gray-600"
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
interface TagProps {
  label: string;
}

function Tag({ label }: TagProps) {
  return (
    <span className="text-xs font-bold uppercase px-2 py-0.5 border border-gray-300 text-gray-400">
      {label}
    </span>
  );
}

// ============================================
// PRESS ITEM COMPONENT
// ============================================
interface PressItemRowProps {
  item: PressItem;
}

function PressItemRow({ item }: PressItemRowProps) {
  const typeLabels: Record<Exclude<PressType, "all">, string> = {
    news: "News",
    opinion: "Opinion",
    broadcast: "Broadcast",
  };

  const topicLabels: Record<Exclude<PressTopic, "all">, string> = {
    "monk-case": "Monk Case",
    "gi-bill": "GI Bill",
    dei: "DEI",
    policy: "Policy",
    benefits: "Benefits",
  };

  return (
    <article className="grid grid-cols-[56px_1fr] md:grid-cols-[80px_1fr] lg:grid-cols-[80px_500px] gap-4 md:gap-7 py-7 border-b border-gray-200 items-start">
      {/* Date */}
      <div>
        <div className="text-xs font-bold uppercase text-gray-400">
          {item.date.month}
        </div>
        <div className="text-3xl font-black leading-none">{item.date.day}</div>
        <div className="text-xs text-gray-300">{item.date.year}</div>
      </div>

      {/* Content */}
      <div>
        <div className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">
          {item.source}
        </div>
        <h3 className="text-lg font-bold mb-1 leading-snug">{item.headline}</h3>
        <div className="text-xs text-gray-400">{item.author}</div>
        <div className="flex flex-wrap gap-1 mt-2">
          {item.type !== "news" && <Tag label={typeLabels[item.type]} />}
          {item.topics.map((topic) => (
            <Tag key={topic} label={topicLabels[topic]} />
          ))}
        </div>
      </div>
    </article>
  );
}

// ============================================
// YEAR HEADER COMPONENT
// ============================================
interface YearHeaderProps {
  year: string;
  count: number;
}

function YearHeader({ year, count }: YearHeaderProps) {
  return (
    <div className="flex items-center gap-3 pt-12 pb-3 max-w-[608px]">
      <span className="text-sm font-extrabold">{year}</span>
      <span className="flex-1 h-0.5 bg-black" aria-hidden="true" />
      <span className="text-xs text-gray-400">
        {count} item{count !== 1 ? "s" : ""}
      </span>
    </div>
  );
}

// ============================================
// MAIN PRESS PAGE
// ============================================
export default function PressPage() {
  const [typeFilter, setTypeFilter] = useState<PressType>("all");
  const [topicFilter, setTopicFilter] = useState<PressTopic>("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Filter items
  const filteredItems = useMemo(() => {
    return pressItems.filter((item) => {
      // Type filter
      if (typeFilter !== "all" && item.type !== typeFilter) {
        return false;
      }

      // Topic filter
      if (topicFilter !== "all" && !item.topics.includes(topicFilter)) {
        return false;
      }

      // Search filter
      if (searchQuery) {
        const searchLower = searchQuery.toLowerCase();
        const searchText =
          `${item.headline} ${item.source} ${item.author}`.toLowerCase();
        if (!searchText.includes(searchLower)) {
          return false;
        }
      }

      return true;
    });
  }, [typeFilter, topicFilter, searchQuery]);

  // Group items by year
  const groupedByYear = useMemo(() => {
    const groups: Record<string, PressItem[]> = {};

    filteredItems.forEach((item) => {
      const year = item.date.year;
      if (!groups[year]) {
        groups[year] = [];
      }
      groups[year].push(item);
    });

    // Sort years descending
    return Object.entries(groups).sort(([a], [b]) => parseInt(b) - parseInt(a));
  }, [filteredItems]);

  const typeFilters: { value: PressType; label: string }[] = [
    { value: "all", label: "All" },
    { value: "news", label: "News" },
    { value: "opinion", label: "Opinion" },
    { value: "broadcast", label: "Broadcast" },
  ];

  const topicFilters: { value: PressTopic; label: string }[] = [
    { value: "all", label: "All" },
    { value: "monk-case", label: "Monk Case" },
    { value: "gi-bill", label: "GI Bill" },
    { value: "dei", label: "DEI" },
    { value: "policy", label: "Policy" },
  ];

  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="pt-24 bg-white border-b border-gray-200">
        <div className="py-12 md:py-16 px-6 md:px-24">
          <div className="max-w-[1400px] mx-auto">
            <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">
              External coverage
            </p>
            <h1 className="text-4xl md:text-5xl font-black leading-tight mb-4 font-display">
              Archived Press
            </h1>
            <p className="text-lg text-gray-500 max-w-2xl">
              Coverage of Black Veterans Project's advocacy, litigation, and the
              movement for repair.
            </p>
          </div>
        </div>
      </section>

      {/* Filter Bar */}
      <div className="sticky top-[56px] md:top-[60px] z-30 bg-white border-b border-gray-200">
        <div className="flex flex-wrap items-center gap-4 md:gap-6 px-6 md:px-24 py-4">
          {/* Type Filters */}
          <div
            className="flex items-center gap-2 flex-wrap"
            role="group"
            aria-label="Filter by type"
          >
            <span className="text-xs font-bold uppercase tracking-widest text-gray-300">
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

          {/* Topic Filters */}
          <div
            className="flex items-center gap-2 flex-wrap"
            role="group"
            aria-label="Filter by topic"
          >
            <span className="text-xs font-bold uppercase tracking-widest text-gray-300">
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

          {/* Search */}
          <div className="ml-auto">
            <label htmlFor="press-search" className="sr-only">
              Search archive
            </label>
            <input
              id="press-search"
              type="text"
              placeholder="Search archive..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border border-gray-300 px-4 py-2 text-sm w-48 bg-transparent transition-colors focus:border-black focus:outline-none"
            />
          </div>
        </div>

        {/* Results Count */}
        <div className="flex justify-between px-6 md:px-24 py-3 text-xs font-semibold text-gray-400 tracking-wide border-t border-gray-100">
          <span>
            {filteredItems.length} RESULT
            {filteredItems.length !== 1 ? "S" : ""}
          </span>
          <span>NEWEST FIRST</span>
        </div>
      </div>

      {/* Press Feed */}
      <section className="bg-gray-100">
        <div className="max-w-[1400px] mx-auto px-6 md:px-24 pb-24">
          {groupedByYear.length > 0 ? (
            groupedByYear.map(([year, items]) => (
              <div key={year}>
                <YearHeader year={year} count={items.length} />
                {items.map((item) => (
                  <PressItemRow key={item.id} item={item} />
                ))}
              </div>
            ))
          ) : (
            <div className="py-16 text-center">
              <p className="text-gray-500">
                No press items match your filters.
              </p>
              <button
                onClick={() => {
                  setTypeFilter("all");
                  setTopicFilter("all");
                  setSearchQuery("");
                }}
                className="mt-4 text-sm font-semibold text-black hover:text-bvp-navy underline underline-offset-2"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
