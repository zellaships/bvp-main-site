'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

// ============================================
// OUR WORK PAGE
// Sections: Hero, Sticky Sub-Nav, Case for Repair (with Venn diagram),
// Impact Litigation, Narrative Hub, Movement Building
// ============================================

const sections = [
  { id: 'case-for-repair', label: 'The Case for Repair' },
  { id: 'litigation', label: 'Impact Litigation' },
  { id: 'narrative', label: 'Narrative Hub' },
  { id: 'movement-building', label: 'Movement Building' },
];

// Stats data
const stats = [
  {
    value: '$100 Billion',
    label: 'denied',
    description:
      "Since World War II, disparities in veterans' benefits have cost Black veterans and their families an estimated $100 Billion.",
  },
  {
    value: '32x',
    label: 'wealth gap',
    description:
      'White veterans hold 32 times more wealth than Black veterans—a gap of $164,000.',
  },
  {
    value: '33%',
    label: 'homeless',
    description:
      "An alarming 33% of Black veterans account for 1/3 of our nation's homeless veteran population and face a 44% greater likelihood of unemployment.",
  },
];

// Sticky Sub-Nav Component with scroll spy
function StickySubNav({
  activeSection,
  onSectionClick,
}: {
  activeSection: string;
  onSectionClick: (id: string) => void;
}) {
  const navRef = useRef<HTMLDivElement>(null);

  // Auto-scroll active link into view on mobile
  useEffect(() => {
    if (navRef.current && window.innerWidth <= 960) {
      const activeLink = navRef.current.querySelector(`[data-section="${activeSection}"]`);
      if (activeLink) {
        activeLink.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      }
    }
  }, [activeSection]);

  return (
    <nav
      className="sticky top-0 z-40 bg-white shadow-md flex flex-col"
      style={{ boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)' }}
    >
      {/* Spacer for header */}
      <div className="h-12 md:h-[60px] bg-white" />
      <div
        ref={navRef}
        className="max-w-[900px] mx-auto w-full flex px-4 lg:px-6 overflow-x-auto scrollbar-hide"
        style={{ WebkitOverflowScrolling: 'touch' }}
      >
        {sections.map((section, index) => (
          <button
            key={section.id}
            data-section={section.id}
            onClick={() => onSectionClick(section.id)}
            className={`relative px-3 lg:px-5 min-h-[56px] text-[17px] lg:text-[15px] font-bold tracking-[0.06em] uppercase whitespace-nowrap transition-colors flex-shrink-0 flex items-center ${
              index === 0 ? 'pl-0' : ''
            } ${activeSection === section.id ? 'text-gray-900' : 'text-gray-400 hover:text-gray-900'}`}
            aria-current={activeSection === section.id ? 'true' : undefined}
          >
            {section.label}
            <span
              className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900 transition-transform duration-200 ${
                activeSection === section.id ? 'scale-x-100' : 'scale-x-0'
              }`}
            />
          </button>
        ))}
      </div>
    </nav>
  );
}

// Venn Diagram Component
function VennDiagram() {
  const [hoveredPillar, setHoveredPillar] = useState<string | null>(null);

  const pillars = [
    {
      id: 'narrative',
      href: '#narrative',
      name: 'Narrative\nBuilding',
      description:
        "Carries the evidence and stories into public understanding, shifting the nation's imagination so repair becomes thinkable.",
      position: 'top-0 left-1/2 -translate-x-1/2',
    },
    {
      id: 'litigation',
      href: '#litigation',
      name: 'Impact\nLitigation',
      description:
        'Builds the case for repair through data and law, turning fragmented evidence into a shared record that compels accountability.',
      position: 'bottom-0 left-0',
    },
    {
      id: 'movement-building',
      href: '#movement-building',
      name: 'Movement\nBuilding',
      description:
        'Organizes communities as stewards of repair, rebuilding collective power into coordinated action.',
      position: 'bottom-0 right-0',
    },
  ];

  const handlePillarClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    const targetId = href.substring(1);
    const target = document.getElementById(targetId);
    if (target) {
      const offset = window.innerWidth <= 960 ? 130 : 160;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative w-[500px] h-[480px] mx-auto my-12">
      {pillars.map((pillar) => (
        <a
          key={pillar.id}
          href={pillar.href}
          onClick={(e) => handlePillarClick(e, pillar.href)}
          onMouseEnter={() => setHoveredPillar(pillar.id)}
          onMouseLeave={() => setHoveredPillar(null)}
          onFocus={() => setHoveredPillar(pillar.id)}
          onBlur={() => setHoveredPillar(null)}
          className={`absolute w-[290px] h-[290px] rounded-full border-2 cursor-pointer transition-all duration-300 flex items-center justify-center flex-col text-center p-8 ${
            pillar.position
          } ${
            hoveredPillar === pillar.id
              ? 'bg-[#1a1a1a] border-[#1a1a1a] z-10'
              : 'bg-white border-[#1a1a1a] z-[1]'
          }`}
          aria-label={pillar.name.replace('\n', ' ')}
        >
          <span
            className={`text-xs font-extrabold tracking-[0.18em] uppercase leading-[1.4] whitespace-pre-line transition-colors duration-300 ${
              hoveredPillar === pillar.id ? 'text-white' : 'text-[#1a1a1a]'
            }`}
          >
            {pillar.name}
          </span>
          <span
            className={`text-xs leading-[1.55] max-w-[190px] mt-3 transition-all duration-300 ${
              hoveredPillar === pillar.id
                ? 'opacity-100 translate-y-0 text-white/55'
                : 'opacity-0 translate-y-2 text-transparent'
            }`}
          >
            {pillar.description}
          </span>
          <span
            className={`text-[11px] font-bold tracking-[0.05em] text-white mt-3 transition-all duration-300 ${
              hoveredPillar === pillar.id ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
            }`}
          >
            Learn more →
          </span>
        </a>
      ))}

      {/* Center intersection arcs - forming the "REPAIR" triangle */}
      <svg
        className="absolute inset-0 w-full h-full z-[15] pointer-events-none"
        viewBox="0 0 500 480"
      >
        {/* Bottom arc: follows Narrative circle's bottom curve (center 250,145 r=145) */}
        <path
          d="M 220 287 A 145 145 0 0 0 280 287"
          fill="none"
          stroke="#999"
          strokeWidth="2"
          strokeDasharray="6 4"
        />
        {/* Left arc: follows Litigation circle's right edge (center 145,335 r=145) */}
        <path
          d="M 220 287 A 145 145 0 0 1 250 235"
          fill="none"
          stroke="#999"
          strokeWidth="2"
          strokeDasharray="6 4"
        />
        {/* Right arc: follows Movement circle's left edge (center 355,335 r=145) */}
        <path
          d="M 280 287 A 145 145 0 0 0 250 235"
          fill="none"
          stroke="#999"
          strokeWidth="2"
          strokeDasharray="6 4"
        />
      </svg>

      {/* Center label */}
      <div
        className={`absolute top-[58%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none text-[13px] font-extrabold tracking-[0.15em] uppercase transition-colors duration-300 ${
          hoveredPillar ? 'text-white' : 'text-[#1a1a1a]'
        }`}
      >
        Repair
      </div>
    </div>
  );
}

// CTA Box Component
function CTABox({
  title,
  buttonText,
  href,
  external,
}: {
  title: string;
  buttonText: string;
  href: string;
  external?: boolean;
}) {
  return (
    <div
      className="relative overflow-hidden text-white"
      style={{ padding: 'clamp(1.5rem, 4vw, 2rem)' }}
    >
      {/* Gold camo background */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: 'url(/images/camo-gold-bg.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-black/70" />
      {/* Content */}
      <div className="relative z-10">
        <h3
          className="font-display font-bold"
          style={{ fontSize: 'clamp(1.125rem, 0.9rem + 1vw, 1.5rem)', marginBottom: 'clamp(0.75rem, 2vw, 1rem)' }}
        >
          {title}
        </h3>
        {external ? (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block font-bold px-6 py-3 text-base tracking-wide rounded-full border-2 bg-white text-black border-white hover:bg-black hover:text-white transition-all duration-300 active:scale-95 min-h-[44px] whitespace-normal"
          >
            {buttonText}
          </a>
        ) : (
          <Button href={href} variant="white" size="md" className="whitespace-normal">
            {buttonText}
          </Button>
        )}
      </div>
    </div>
  );
}

export default function OurWorkPage() {
  const [activeSection, setActiveSection] = useState('case-for-repair');

  // Scroll spy effect
  useEffect(() => {
    const handleScroll = () => {
      const trigger = window.innerWidth <= 960 ? 140 : 170;
      let current = 'case-for-repair';

      sections.forEach(({ id }) => {
        const section = document.getElementById(id);
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= trigger) {
            current = id;
          }
        }
      });

      // Force last section active at bottom of page
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
        current = sections[sections.length - 1].id;
      }

      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle hash on page load
  useEffect(() => {
    if (window.location.hash) {
      const targetId = window.location.hash.substring(1);
      const target = document.getElementById(targetId);
      if (target) {
        setTimeout(() => {
          const offset = window.innerWidth <= 960 ? 130 : 160;
          const top = target.getBoundingClientRect().top + window.scrollY - offset;
          window.scrollTo({ top, behavior: 'auto' });
          setActiveSection(targetId);
        }, 100);
      }
    }
  }, []);

  const handleSectionClick = (id: string) => {
    const target = document.getElementById(id);
    if (target) {
      const offset = window.innerWidth <= 960 ? 130 : 160;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <>
        {/* ============================================== */}
        {/* HERO */}
        {/* ============================================== */}
        <section
          className="relative flex items-end"
          style={{ height: 'clamp(50vh, 60vw, 70vh)' }}
        >
          <img
            src="/images/our-work-banner.jpg"
            alt="Navy sailors in formation representing the service and sacrifice of Black veterans"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/70" />
          <div
            className="relative z-10 max-w-[1400px] mx-auto w-full"
            style={{ padding: 'clamp(2rem, 5vw, 4rem) clamp(1.5rem, 5vw, 6rem)' }}
          >
            <p className="text-sm uppercase tracking-widest mb-4 text-white/60">Our Work</p>
            <h1
              className="font-gunterz font-bold text-white"
              style={{ fontSize: 'clamp(1.75rem, 1rem + 4vw, 3.75rem)' }}
            >
              Research. Litigation. Narrative. Movement Building.
            </h1>
          </div>
        </section>

        {/* ============================================== */}
        {/* STICKY SUB-NAV */}
        {/* ============================================== */}
        <StickySubNav activeSection={activeSection} onSectionClick={handleSectionClick} />

        {/* ============================================== */}
        {/* WORK CONTENT */}
        {/* ============================================== */}
        <section style={{ padding: 'clamp(1rem, 2vw, 1rem) clamp(1.5rem, 5vw, 6rem) clamp(3rem, 8vw, 5rem)' }}>
          <div className="max-w-[900px] mx-auto">
            {/* ============================================== */}
            {/* CASE FOR REPAIR */}
            {/* ============================================== */}
            <div id="case-for-repair" className="scroll-mt-40" style={{ marginBottom: 'clamp(4rem, 10vw, 8rem)' }}>
              <h2
                className="font-gunterz font-bold uppercase"
                style={{ fontSize: 'clamp(1.75rem, 1rem + 3vw, 2.5rem)', marginBottom: 'clamp(1.5rem, 4vw, 2rem)' }}
              >
                The Case for Repair
              </h2>

              <p
                className="leading-relaxed"
                style={{ fontSize: 'clamp(1.125rem, 0.9rem + 1vw, 1.25rem)', marginBottom: 'clamp(1.5rem, 4vw, 2rem)' }}
              >
                Since the Revolutionary War, Black veterans have been serving this country with honor
                and courage. Yet today, despite unyielding loyalty and patriotism, they continue to be
                systematically shut out from the very benefits and opportunities they fought for:
              </p>

              {/* Stats Data Vis */}
              <div
                className="bg-gray-100"
                style={{ padding: 'clamp(1.5rem, 4vw, 3rem)', marginBottom: 'clamp(2rem, 5vw, 3rem)' }}
              >
                {stats.map((stat, index) => (
                  <div
                    key={stat.value}
                    className={`grid items-center ${
                      index !== stats.length - 1 ? 'border-b border-gray-300' : ''
                    }`}
                    style={{
                      padding: 'clamp(1.5rem, 3vw, 2rem) 0',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
                      gap: 'clamp(1.5rem, 4vw, 3rem)',
                    }}
                  >
                    <div>
                      <p
                        className="font-gunterz font-black"
                        style={{ fontSize: 'clamp(1.75rem, 1.5rem + 2vw, 3rem)' }}
                      >
                        <span className="bg-[#FDC500] px-2">{stat.value}</span> {stat.label}
                      </p>
                    </div>
                    <div>
                      <p
                        className="leading-relaxed"
                        style={{ fontSize: 'clamp(1rem, 0.9rem + 0.5vw, 1.125rem)' }}
                      >
                        {stat.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <p
                className="leading-relaxed"
                style={{ fontSize: 'clamp(1.125rem, 0.9rem + 1vw, 1.25rem)', marginBottom: 'clamp(1rem, 3vw, 1.5rem)' }}
              >
                After World War II, Jim Crow policies, redlining, and discriminatory college admissions
                blocked Black military members from receiving GI Bill benefits like disability
                compensation, home loans, and academic opportunity. Years later these exclusions have
                cost Black communities billions of dollars and continue to fuel the disproportionate
                rates of Black veteran homelessness, unemployment, and incarceration we're seeing today.
              </p>

              <p
                className="leading-relaxed"
                style={{ fontSize: 'clamp(1.125rem, 0.9rem + 1vw, 1.25rem)', marginBottom: 'clamp(1rem, 3vw, 1.5rem)' }}
              >
                <span className="font-bold">This denial is by design.</span> We have the evidence to
                prove it.
              </p>

              <p
                className="leading-relaxed"
                style={{ fontSize: 'clamp(1.125rem, 0.9rem + 1vw, 1.25rem)', marginBottom: 'clamp(1rem, 3vw, 1.5rem)' }}
              >
                Starting in 2020, BVP has been collecting millions of government records documenting
                America's mistreatment of Black veterans, alongside a host of racially discriminatory
                policies and practices spanning decades. This research equips educators, policymakers,
                artists, and the public with the facts, stories, and legal grounding needed to chart the
                path towards recompensation and repair.
              </p>

              <p
                className="leading-relaxed font-bold"
                style={{ fontSize: 'clamp(1.125rem, 0.9rem + 1vw, 1.25rem)', marginBottom: 'clamp(1rem, 3vw, 1.5rem)' }}
              >
                America's democracy has reached its tipping point, making the fight for Black veterans'
                rights more urgent than ever.
              </p>

              <p
                className="leading-relaxed"
                style={{ fontSize: 'clamp(1.125rem, 0.9rem + 1vw, 1.25rem)', marginBottom: 'clamp(1rem, 3vw, 1.5rem)' }}
              >
                In January 2025, the federal government instituted executive orders that dismantled
                equity programs and revoked critical protections. At the U.S. Department of Veteran
                Affairs (VA), offices that monitored racial disparities in veterans' benefits were
                completely eliminated. The very systems built to measure inequity are being stripped at
                a time when they are most needed.
              </p>

              <p
                className="leading-relaxed font-bold"
                style={{ fontSize: 'clamp(1.125rem, 0.9rem + 1vw, 1.25rem)', marginBottom: 'clamp(2rem, 5vw, 3rem)' }}
              >
                The Black Veterans Project was built for this moment.
              </p>

              {/* Theory of Change */}
              <div style={{ marginBottom: 'clamp(2rem, 5vw, 3rem)' }}>
                <h3
                  className="font-gunterz font-bold uppercase"
                  style={{ fontSize: 'clamp(1.25rem, 0.9rem + 1.5vw, 1.5rem)', marginBottom: '0.25rem' }}
                >
                  How Repair Happens
                </h3>
                <p
                  className="leading-relaxed"
                  style={{ fontSize: 'clamp(1.125rem, 0.9rem + 1vw, 1.25rem)', marginBottom: 'clamp(1rem, 3vw, 1.5rem)' }}
                >
                  The Black Veterans Project's approach to repair is multi-pronged and includes:
                </p>

                <ul
                  className="list-disc list-inside pl-4"
                  style={{ marginBottom: 'clamp(1.5rem, 4vw, 2rem)' }}
                >
                  <li
                    className="leading-relaxed"
                    style={{ fontSize: 'clamp(1rem, 0.9rem + 0.5vw, 1.125rem)', marginBottom: '1rem' }}
                  >
                    Returning benefits to veterans and military families – including housing, education,
                    disability compensation, home loans and survivor benefits.
                  </li>
                  <li
                    className="leading-relaxed"
                    style={{ fontSize: 'clamp(1rem, 0.9rem + 0.5vw, 1.125rem)', marginBottom: '1rem' }}
                  >
                    Ensuring transparent reporting, measurable standards, and protections codified in
                    law.
                  </li>
                  <li
                    className="leading-relaxed"
                    style={{ fontSize: 'clamp(1rem, 0.9rem + 0.5vw, 1.125rem)' }}
                  >
                    Maintaining a historical record that is preserved and accessible to scholars,
                    policymakers, and the general public.
                  </li>
                </ul>

                <p
                  className="leading-relaxed"
                  style={{ fontSize: 'clamp(1.125rem, 0.9rem + 1vw, 1.25rem)', marginBottom: 'clamp(1.5rem, 4vw, 2rem)' }}
                >
                  BVP's "Theory of Change" centers on our five year priorities along three core pillars:
                </p>

                {/* Venn Diagram */}
                <div className="hidden md:block">
                  <VennDiagram />
                  <p className="text-xs text-gray-400 text-center italic mb-8">
                    Hover to explore each pillar
                  </p>
                </div>

                {/* Mobile: Simple list instead of diagram */}
                <div className="md:hidden space-y-4 mb-8">
                  {[
                    { name: 'Narrative Building', href: '#narrative' },
                    { name: 'Impact Litigation', href: '#litigation' },
                    { name: 'Movement Building', href: '#movement-building' },
                  ].map((pillar) => (
                    <a
                      key={pillar.name}
                      href={pillar.href}
                      onClick={(e) => {
                        e.preventDefault();
                        handleSectionClick(pillar.href.substring(1));
                      }}
                      className="block p-4 border-2 border-black hover:bg-black hover:text-white transition-colors"
                    >
                      <span className="font-bold">{pillar.name}</span>
                      <span className="ml-2">→</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* ============================================== */}
            {/* IMPACT LITIGATION */}
            {/* ============================================== */}
            <div id="litigation" className="scroll-mt-40" style={{ marginBottom: 'clamp(4rem, 10vw, 8rem)' }}>
              <h2
                className="font-gunterz font-bold uppercase"
                style={{ fontSize: 'clamp(1.75rem, 1rem + 3vw, 2.5rem)', marginBottom: 'clamp(1.5rem, 4vw, 2rem)' }}
              >
                Impact Litigation
              </h2>
              <p
                className="leading-relaxed"
                style={{ fontSize: 'clamp(1.125rem, 0.9rem + 1vw, 1.25rem)', marginBottom: 'clamp(1rem, 3vw, 1.5rem)' }}
              >
                Since 2020, BVP has been working to hold the Department of Veteran Affairs federally
                liable for its racist and discriminatory treatment of Black service members. We are
                using coordinated impact litigation to secure reparations for Black veterans and their
                families.
              </p>
              <p
                className="leading-relaxed"
                style={{ fontSize: 'clamp(1.125rem, 0.9rem + 1vw, 1.25rem)', marginBottom: 'clamp(1rem, 3vw, 1.5rem)' }}
              >
                Through collaborative partnerships with Yale Law School, Harvard Law School, and Quinn
                Emanuel LLP, we help prepare Black veterans to participate in reparative litigation. BVP
                functions as a hub for community movement building and uses a membership-based model to
                organize Black veterans, maximizing their ability to pursue legal recourse.
              </p>
              <p
                className="leading-relaxed"
                style={{ fontSize: 'clamp(1.125rem, 0.9rem + 1vw, 1.25rem)', marginBottom: 'clamp(1.5rem, 4vw, 2rem)' }}
              >
                In 2021, BVP built the legal foundation for Monk v. United States, a landmark lawsuit
                against the VA that alleges systemic racial discrimination and seeks accountability for
                decades of unequal access to education, housing, and disability benefits. The outcomes
                of Monk v United States could set a precedent for Black veterans impacted by decades of
                racially-biased practices and policies dating back to World War II.{' '}
                <Link href="/faq" className="font-bold underline hover:no-underline">
                  Learn More About Monk v. U.S. →
                </Link>
              </p>

              <CTABox
                title="Are you a veteran who's experienced benefit barriers or delays?"
                buttonText="Become a member →"
                href="/join"
              />

            </div>

            {/* ============================================== */}
            {/* NARRATIVE HUB */}
            {/* ============================================== */}
            <div id="narrative" className="scroll-mt-40" style={{ marginBottom: 'clamp(4rem, 10vw, 8rem)' }}>
              <h2
                className="font-gunterz font-bold uppercase"
                style={{ fontSize: 'clamp(1.75rem, 1rem + 3vw, 2.5rem)', marginBottom: 'clamp(1.5rem, 4vw, 2rem)' }}
              >
                Narrative Hub
              </h2>
              <p
                className="leading-relaxed"
                style={{ fontSize: 'clamp(1.125rem, 0.9rem + 1vw, 1.25rem)', marginBottom: 'clamp(1rem, 3vw, 1.5rem)' }}
              >
                At BVP, one of our "North Star" goals is to shift national consciousness towards
                believing that true repair is not only imaginable, but achievable.
              </p>
              <p
                className="leading-relaxed"
                style={{ fontSize: 'clamp(1.125rem, 0.9rem + 1vw, 1.25rem)', marginBottom: 'clamp(1rem, 3vw, 1.5rem)' }}
              >
                Through our Narrative Hub, BVP works with advocates, scholars, artists, communities and
                cultural institutions to collect and preserve Black veterans' stories.
              </p>
              <p
                className="leading-relaxed"
                style={{ fontSize: 'clamp(1.125rem, 0.9rem + 1vw, 1.25rem)', marginBottom: 'clamp(1.5rem, 4vw, 2rem)' }}
              >
                By championing the voices and lived experiences of Black veterans through art, education
                and the media, we are building a public body of evidence that will shape how future
                generations understand the history and legacy of Black military service in America.
              </p>

              <CTABox
                title="Connect with stories, research, and dispatches from the movement for reparative justice"
                buttonText="Explore/Sign up to our Substack →"
                href="https://blackveteransproject.substack.com"
                external
              />
            </div>

            {/* ============================================== */}
            {/* MOVEMENT BUILDING */}
            {/* ============================================== */}
            <div id="movement-building" className="scroll-mt-40">
              <h2
                className="font-gunterz font-bold uppercase"
                style={{ fontSize: 'clamp(1.75rem, 1rem + 3vw, 2.5rem)', marginBottom: 'clamp(1.5rem, 4vw, 2rem)' }}
              >
                Movement Building
              </h2>
              <p
                className="leading-relaxed"
                style={{ fontSize: 'clamp(1.125rem, 0.9rem + 1vw, 1.25rem)', marginBottom: 'clamp(1rem, 3vw, 1.5rem)' }}
              >
                There are three million Black veterans in the U.S. today, and an estimated 15 million
                Americans come from Black military families. BVP is channeling this collective power to
                build a national network that drives advocacy and advances racial equity within and
                outside of the Armed forces.
              </p>
              <p
                className="leading-relaxed"
                style={{ fontSize: 'clamp(1.125rem, 0.9rem + 1vw, 1.25rem)', marginBottom: 'clamp(1rem, 3vw, 1.5rem)' }}
              >
                BVP maintains critical relationships with key members of the House and Senate Veterans
                Affairs Committees and provides routine expert testimony at hearings. The strength of
                this work is further multiplied through our relationships with organizations at the
                intersection of civil rights, racial justice, disability justice, and veterans advocacy.
              </p>
              <p
                className="leading-relaxed"
                style={{ fontSize: 'clamp(1.125rem, 0.9rem + 1vw, 1.25rem)', marginBottom: 'clamp(1rem, 3vw, 1.5rem)' }}
              >
                By mobilizing our communities as stewards of repair, we can translate collective power
                into coordinated action that grows leadership, drives policy, and redirects resources.
              </p>
              <p
                className="leading-relaxed"
                style={{ fontSize: 'clamp(1.125rem, 0.9rem + 1vw, 1.25rem)', marginBottom: 'clamp(1.5rem, 4vw, 2rem)' }}
              >
                Veterans who share their stories join our membership corps, which can be activated to
                support future advocacy campaigns.
              </p>

              <CTABox
                title="Are you a veteran or from a military family?"
                buttonText="Join the movement →"
                href="/join"
              />
            </div>
          </div>
        </section>
    </>
  );
}
