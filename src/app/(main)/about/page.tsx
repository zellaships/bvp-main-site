'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

// ============================================
// ABOUT PAGE — WHO WE ARE
// Sections: Hero, Mission, Timeline, Founders, Team, Board, Partners, Press CTA
// ============================================

// Timeline data
const timelineData = [
  {
    year: '2020',
    title: 'Yale Law School collaboration begins',
    summary: 'Yale Law School collaboration begins',
    image: null, // placeholder for future image
    details: [
      '<strong>Yale Law School</strong> collaboration to obtain decades of data proving sustained and <strong>systemic racial inequities in veterans disability compensation</strong> going since 2001',
    ],
  },
  {
    year: '2021',
    title: 'GAO study & coalition building',
    summary: 'GAO study & coalition building',
    image: null,
    details: [
      'Advanced a <strong>Government Accountability Office study of racial disparities in disability compensation</strong>',
      'Helped <strong>organize a national coalition of Black veterans organizations</strong> to interface with the 117th Congress',
    ],
  },
  {
    year: '2022',
    title: 'Congressional testimony',
    summary: 'Congressional testimony',
    image: null,
    details: [
      'Raised national visibility on the <strong>Sgt. Isaac Woodard, Jr. and Sgt. Joseph H. Maddox GI Bill Restoration Act</strong> as central to the coalition\'s policy agenda',
      'Testified before the House Veterans Affairs Committee to support the <strong>VA Housing Loan Forever Act</strong>, draft legislation to extend unused VA home loans to descendants',
    ],
  },
  {
    year: '2023',
    title: 'Monk v. United States filed',
    summary: 'Monk v. United States filed',
    image: null,
    details: [
      '<strong>Monk v. United States</strong> is filed, becoming the first landmark case leveraging internal VA data to allege racial discrimination in the allocation of veterans benefits since 1945',
      'Collaborated with <strong>NBC News</strong> on investigative reporting for the <strong>case for reparations for Black veterans</strong>',
    ],
  },
  {
    year: '2024',
    title: 'Harvard & Quinn Emanuel partnership',
    summary: 'Harvard & Quinn Emanuel partnership',
    image: null,
    details: [
      'Established an impact litigation partnership with <strong>Harvard Law School and Quinn Emanuel LLP</strong>',
      'Began working with <strong>Harvard Kennedy School\'s Trotter Collaborative for Social Justice</strong> formulating a repair and reform legislative strategy',
    ],
  },
];

// Founders data
const founders = [
  {
    name: 'Richard Brookshire',
    role: 'Co-CEO + Co-Founder',
    bio: 'Richard Brookshire is a multi-hyphenate storyteller and reparationist working at the intersection of politics and culture. A nationally recognized political communications strategist, writer, director, and filmmaker, he\'s held previous leadership roles in communications strategy at Iraq & Afghanistan Veterans of America, the Human Rights Campaign, and The New School. He is a former U.S. Army Combat Medic and a veteran of the War in Afghanistan. He is an alumnus of Fordham University, Columbia University School of International & Public Affairs, and New York Film Academy\'s Documentary Filmmaking School.',
    image: null,
  },
  {
    name: 'Kyle Bibby',
    role: 'Co-CEO + Co-Founder',
    bio: 'Kyle Bibby is one of the co-founders of the Black Veterans Project. He also serves as the Chief of Campaigns at Color of Change, and as a Political Partner with the Truman National Security Project. As a former Marine Corps infantry captain and Afghanistan War veteran, Kyle is a proven leader dedicated to equal rights, social justice, and ending wars. Prior to his role at Color of Change, Kyle served as a Deputy Political Director for Common Defense. Previously, Kyle was a Director at the New Jersey Reentry Corporation (NJRC). He\'s served as a Presidential Management Fellow (PMF) assigned to the Office of Management and Budget (OMB) in the Executive Office of the President during the Obama Administration. Kyle has received a Master in Public Administration from Columbia University\'s School of International and Public Affairs, and a Bachelor of Science in Political Science from the United States Naval Academy.',
    image: null,
  },
  {
    name: 'Zella Vanié',
    role: 'Co-Founder + Board Chair',
    bio: 'Zella Vanié is a multidisciplinary artist and designer whose work is at the intersection of strategy and design. Zella has spent their career helping organizations build inclusive products, craft stories, and push creative ideas to their highest potential. Most recently they worked as a Staff Product Designer at the Chan Zuckerberg Initiative. Zella is a veteran of the U.S. Army and earned an MFA in Interaction Design from the School of Visual Arts.',
    image: null,
  },
  {
    name: 'Daniele Anderson',
    role: 'Co-Founder & Board Member',
    bio: 'Daniele D. Anderson is the Co-Founder of the Black Veterans Project. A native of Oklahoma City, OK, she graduated from the United States Naval Academy with a Bachelor of Science in 2013. She then commissioned as a Surface Warfare Officer in the United States Navy where she served for over five years serving onboard two guided-missile cruisers, the USS Normandy and USS Leyte Gulf. In 2018 she resigned her commission to pursue an interdisciplinary Master of Arts focusing on issues of race and ethnicity in Latin America and the United States. She is a member of the National Historical Association, National Naval Officers Association, and Black Veterans Project.',
    image: null,
  },
];

// Team data
const team = [
  {
    name: 'Brianna Fernandez',
    role: '',
    bio: '',
    image: null,
  },
  {
    name: 'Yolanda Hoskey',
    role: '',
    bio: 'Yolanda Hoskey is a Brooklyn-born multidisciplinary artist, storyteller, narrative strategist, and creative producer whose work speaks to the Black experience in America. Across photography, film, and creative production, her practice focuses on shaping and expanding narratives around Black life, identity, and cultural memory, centering stories that are often overlooked, flattened, or misrepresented.\n\nOver the past decade, Yolanda has built a career across the creative arts, working at the intersection of storytelling, cultural production, and visual practice. Her work spans editorial and commercial projects as well as independent artistic practice, moving fluidly between these spaces while bringing culturally grounded, intentional storytelling into every environment she engages.\n\nShe is a Magnum Foundation Fellow (2024), a BRICLab Artist-in-Residence, and the 2025 recipient of the International Photographic Council Rising Star Award, presented at the United Nations.',
    image: null,
  },
];

// Board data
const board = [
  {
    name: 'MaCherie Dunbar',
    title: '',
    bio: '',
    linkedin: 'https://www.linkedin.com/in/macheriedunbar/',
    image: null,
  },
  {
    name: 'Mary L. Tobin',
    title: '',
    bio: '',
    linkedin: 'https://www.linkedin.com/in/maryltobin/',
    image: null,
  },
  {
    name: 'Dr. Ravi K. Perry',
    title: '',
    bio: '',
    linkedin: 'https://www.linkedin.com/in/ravikperry/',
    image: null,
  },
];

// Partners data
const partners = [
  { name: 'Yale Law School', logo: '/images/yale-bw.png', height: 48 },
  { name: 'Harvard Law School', logo: '/images/harvard-bw.png', height: 48 },
  { name: 'Quinn Emanuel', logo: '/images/quinn-emanuel-bw.png', height: 96 },
];

// LinkedIn Icon Component
function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

// Timeline Component with mobile scroll tracking
function Timeline() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!scrollRef.current) return;
      const scrollLeft = scrollRef.current.scrollLeft;
      const cardWidth = 280 + 16; // card width + gap
      const newIndex = Math.round(scrollLeft / cardWidth);
      setActiveIndex(Math.min(newIndex, timelineData.length - 1));
    };

    const scrollEl = scrollRef.current;
    if (scrollEl) {
      scrollEl.addEventListener('scroll', handleScroll, { passive: true });
      return () => scrollEl.removeEventListener('scroll', handleScroll);
    }
  }, []);

  return (
    <section
      className="bg-gray-100"
      style={{
        padding: 'clamp(3rem, 8vw, 5rem) clamp(1.5rem, 5vw, 6rem)',
      }}
    >
      <div className="max-w-[1400px] mx-auto">
        <h2
          className="font-display font-bold uppercase"
          style={{
            fontSize: 'clamp(1.75rem, 1rem + 3vw, 2.5rem)',
            marginBottom: 'clamp(2rem, 5vw, 4rem)',
          }}
        >
          Our History
        </h2>

        {/* Mobile Timeline */}
        <div className="block lg:hidden">
          {/* Timeline dots */}
          <div className="relative mb-8">
            <div className="absolute top-[10px] left-4 right-4 h-[2px] bg-gray-300" />
            <div className="flex justify-between px-4">
              {timelineData.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    if (scrollRef.current) {
                      scrollRef.current.scrollTo({
                        left: index * (280 + 16),
                        behavior: 'smooth',
                      });
                    }
                  }}
                  className={`relative z-10 rounded-full transition-all duration-300 ${
                    index === activeIndex
                      ? 'w-5 h-5 bg-black'
                      : 'w-4 h-4 bg-gray-400 mt-0.5'
                  }`}
                  aria-label={`Go to year ${timelineData[index].year}`}
                />
              ))}
            </div>
          </div>

          {/* Scrollable cards */}
          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto pb-4 -mx-6 px-6 snap-x snap-mandatory scrollbar-hide"
          >
            {timelineData.map((item, index) => (
              <article
                key={item.year}
                className="flex-shrink-0 w-[280px] bg-white rounded-2xl p-8 shadow-sm snap-start"
              >
                <p className="text-4xl font-bold text-black mb-4">{item.year}</p>
                <p className="text-xl font-bold mb-4">{item.title}</p>
                <p className="text-base text-gray-600 leading-relaxed">
                  {item.details[0]?.replace(/<[^>]*>/g, '')}
                </p>
              </article>
            ))}
          </div>
        </div>

        {/* Desktop Timeline */}
        <div className="hidden lg:block relative">
          {/* Timeline Line */}
          <div className="absolute top-[6px] left-0 right-0 h-[1px] bg-black" />

          {/* Timeline Items */}
          <div className="grid grid-cols-5 gap-8">
            {timelineData.map((item, index) => (
              <div
                key={item.year}
                className="relative cursor-pointer group"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                onFocus={() => setHoveredIndex(index)}
                onBlur={() => setHoveredIndex(null)}
                tabIndex={0}
                role="button"
                aria-expanded={hoveredIndex === index}
                aria-label={`${item.year}: ${item.title}`}
              >
                <div className="w-3 h-3 bg-black rounded-full mb-6 relative z-10" />
                <p className="text-2xl font-bold mb-2">{item.year}</p>
                <p className="text-sm leading-snug text-gray-600">{item.summary}</p>

                {/* Hover Content - appears ABOVE the timeline */}
                <div
                  className={`absolute bottom-full mb-6 bg-white border-l-4 border-black w-[min(520px,calc(100vw-3rem))] z-20 shadow-lg transition-all duration-200 ${
                    index >= 3 ? 'right-0' : 'left-0'
                  } ${
                    hoveredIndex === index
                      ? 'opacity-100 translate-y-0 pointer-events-auto'
                      : 'opacity-0 translate-y-2 pointer-events-none'
                  }`}
                >
                  {/* Image area */}
                  <div className="w-full h-40 bg-gray-200 flex items-center justify-center">
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt={`${item.year} - ${item.title}`}
                        width={520}
                        height={160}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-gray-400 text-sm">[IMAGE]</span>
                    )}
                  </div>
                  <div className="p-8 space-y-4">
                    {item.details.map((detail, i) => (
                      <p
                        key={i}
                        className="text-base leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: detail }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function AboutPage() {
  return (
    <>
        {/* ============================================== */}
        {/* HERO */}
        {/* ============================================== */}
        <section
          id="mission"
          className="relative flex items-end scroll-mt-20"
          style={{ height: 'clamp(50vh, 60vw, 70vh)' }}
        >
          <img
            src="/images/who-we-are.jpg"
            alt="Black Army veterans proudly waving American flag"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/70" />
          <div
            className="relative z-10 max-w-[1400px] mx-auto w-full"
            style={{ padding: 'clamp(2rem, 5vw, 4rem) clamp(1.5rem, 5vw, 6rem)' }}
          >
            <p className="text-sm uppercase tracking-widest mb-4 text-white/60">Who We Are</p>
            <h1
              className="font-gunterz font-bold text-white"
              style={{ fontSize: 'clamp(2rem, 1.5rem + 4vw, 3.75rem)' }}
            >
              Building the Case for Repair
            </h1>
          </div>
        </section>

        {/* ============================================== */}
        {/* MISSION */}
        {/* ============================================== */}
        <section style={{ padding: 'clamp(3rem, 8vw, 5rem) clamp(1.5rem, 5vw, 6rem)' }}>
          <div className="max-w-[1400px] mx-auto">
            <div className="max-w-4xl">
              <p
                className="leading-relaxed"
                style={{ fontSize: 'clamp(1.125rem, 0.9rem + 1vw, 1.25rem)', marginBottom: 'clamp(1rem, 3vw, 1.5rem)' }}
              >
                The Black Veterans Project leverages research, narrative storytelling, public
                advocacy, and impact litigation to redress the federal government's long history of
                racism and discrimination against Black veterans and their families.
              </p>
              <p
                className="leading-relaxed"
                style={{ fontSize: 'clamp(1.125rem, 0.9rem + 1vw, 1.25rem)', marginBottom: 'clamp(1rem, 3vw, 1.5rem)' }}
              >
                BVP represents the first comprehensive effort to pursue reparative justice for Black
                service members who have been unjustly denied their civil rights and benefits.
              </p>
              <p
                className="leading-relaxed"
                style={{ fontSize: 'clamp(1.125rem, 0.9rem + 1vw, 1.25rem)', marginBottom: 'clamp(1rem, 3vw, 1.5rem)' }}
              >
                Join us as we build the collective power to demand accountability, advance policy
                change, and achieve reparations for Black veterans in America.
              </p>
              <p
                className="text-gray-600"
                style={{ fontSize: 'clamp(1rem, 0.9rem + 0.5vw, 1.125rem)' }}
              >
                BVP is a 501(c)(3) nonprofit organization.
              </p>
            </div>
          </div>
        </section>

        {/* ============================================== */}
        {/* TIMELINE */}
        {/* ============================================== */}
        <Timeline />

        {/* ============================================== */}
        {/* TEAM */}
        {/* ============================================== */}
        <section
          id="founders"
          className="bg-gray-100 scroll-mt-20"
          style={{ padding: 'clamp(3rem, 8vw, 5rem) clamp(1.5rem, 5vw, 6rem)' }}
        >
          <div className="max-w-[1400px] mx-auto">
            <h2
              className="font-display font-bold uppercase"
              style={{ fontSize: 'clamp(1.75rem, 1rem + 3vw, 2.5rem)', marginBottom: 'clamp(1.5rem, 3vw, 2rem)' }}
            >
              Our Team
            </h2>
            <div className="max-w-4xl" style={{ marginBottom: 'clamp(2rem, 5vw, 4rem)' }}>
              <p
                className="leading-relaxed text-gray-500"
                style={{ fontSize: 'clamp(1.125rem, 0.9rem + 1vw, 1.25rem)' }}
              >
                Four veterans united by a common mission: to secure reparative justice for Black
                service members.
              </p>
            </div>

            <div
              className="grid"
              style={{
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
                gap: 'clamp(2rem, 4vw, 3rem)',
              }}
            >
              {founders.map((founder) => (
                <article key={founder.name}>
                  <div
                    className="bg-gray-200 flex items-center justify-center aspect-square"
                    style={{ maxWidth: '300px', marginBottom: 'clamp(1rem, 3vw, 1.5rem)' }}
                  >
                    {founder.image ? (
                      <Image
                        src={founder.image}
                        alt={founder.name}
                        width={300}
                        height={300}
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <span className="text-gray-500">[HEADSHOT]</span>
                    )}
                  </div>
                  <h3
                    className="font-bold mb-1"
                    style={{ fontSize: 'clamp(1.25rem, 1rem + 1vw, 1.5rem)' }}
                  >
                    {founder.name}
                  </h3>
                  <p className="text-base text-gray-500 mb-4">{founder.role}</p>
                  <p className="text-base leading-relaxed text-gray-700">{founder.bio}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================== */}
        {/* TEAM */}
        {/* ============================================== */}
        <section
          id="team"
          className="scroll-mt-20"
          style={{ padding: 'clamp(3rem, 8vw, 5rem) clamp(1.5rem, 5vw, 6rem)' }}
        >
          <div className="max-w-[1400px] mx-auto">
            <h2
              className="font-display font-bold uppercase"
              style={{ fontSize: 'clamp(1.75rem, 1rem + 3vw, 2.5rem)', marginBottom: 'clamp(0.75rem, 2vw, 1rem)' }}
            >
              Our Team
            </h2>
            <p
              className="text-gray-600"
              style={{ fontSize: 'clamp(1.125rem, 0.9rem + 1vw, 1.25rem)', marginBottom: 'clamp(2rem, 5vw, 3rem)' }}
            >
              The people building the case for repair.
            </p>

            <div
              className="grid"
              style={{
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
                gap: 'clamp(2rem, 4vw, 3rem)',
              }}
            >
              {team.map((member) => (
                <article key={member.name}>
                  <div
                    className="bg-gray-200 flex items-center justify-center aspect-square"
                    style={{ maxWidth: '300px', marginBottom: 'clamp(1rem, 3vw, 1.5rem)' }}
                  >
                    {member.image ? (
                      <Image
                        src={member.image}
                        alt={member.name}
                        width={300}
                        height={300}
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <span className="text-gray-500">[HEADSHOT]</span>
                    )}
                  </div>
                  <h3
                    className="font-bold mb-1"
                    style={{ fontSize: 'clamp(1.25rem, 1rem + 1vw, 1.5rem)' }}
                  >
                    {member.name}
                  </h3>
                  {member.bio && (
                    <div className="mt-4 space-y-4">
                      {member.bio.split('\n\n').map((paragraph, i) => (
                        <p key={i} className="text-base leading-relaxed text-gray-700">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  )}
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================== */}
        {/* BOARD */}
        {/* ============================================== */}
        <section
          id="board"
          className="bg-gray-100 scroll-mt-20"
          style={{ padding: 'clamp(3rem, 8vw, 5rem) clamp(1.5rem, 5vw, 6rem)' }}
        >
          <div className="max-w-[1400px] mx-auto">
            <h2
              className="font-display font-bold uppercase"
              style={{ fontSize: 'clamp(1.75rem, 1rem + 3vw, 2.5rem)', marginBottom: 'clamp(2rem, 5vw, 3rem)' }}
            >
              Board of Directors
            </h2>

            <div
              className="grid"
              style={{
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
                gap: 'clamp(1.5rem, 3vw, 2rem)',
              }}
            >
              {board.map((member) => (
                <article
                  key={member.name}
                  className="flex gap-4 items-start border-2 border-black bg-white"
                  style={{ padding: 'clamp(1rem, 3vw, 1.5rem)' }}
                >
                  <div className="w-24 h-24 bg-gray-200 border-2 border-black flex-shrink-0 flex items-center justify-center">
                    {member.image ? (
                      <Image
                        src={member.image}
                        alt={member.name}
                        width={96}
                        height={96}
                        className="object-cover"
                      />
                    ) : (
                      <span className="text-gray-500 text-xs">[PHOTO]</span>
                    )}
                  </div>
                  <div>
                    <h3
                      className="font-bold mb-1"
                      style={{ fontSize: 'clamp(1rem, 0.9rem + 0.5vw, 1.25rem)' }}
                    >
                      {member.name}
                    </h3>
                    {member.title && (
                      <p className="text-base text-gray-600 mb-2">{member.title}</p>
                    )}
                    {member.bio && (
                      <p className="text-sm leading-relaxed mb-3">{member.bio}</p>
                    )}
                    {member.linkedin && (
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-[17px] font-medium text-gray-500 hover:text-black transition-colors min-h-[44px]"
                      >
                        <LinkedInIcon className="w-4 h-4" />
                        LinkedIn
                      </a>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================== */}
        {/* PARTNERS */}
        {/* ============================================== */}
        <section
          id="partners"
          className="scroll-mt-20"
          style={{ padding: 'clamp(3rem, 8vw, 5rem) clamp(1.5rem, 5vw, 6rem)' }}
        >
          <div className="max-w-[1400px] mx-auto">
            <h2
              className="font-display font-bold uppercase text-center"
              style={{ fontSize: 'clamp(1.75rem, 1rem + 3vw, 2.5rem)', marginBottom: 'clamp(0.75rem, 2vw, 1rem)' }}
            >
              Our Partners
            </h2>
            <p
              className="text-gray-600 text-center"
              style={{ fontSize: 'clamp(1.125rem, 0.9rem + 1vw, 1.25rem)', marginBottom: 'clamp(2rem, 5vw, 3rem)' }}
            >
              Organizations advancing the work alongside us.
            </p>

            <div
              className="flex flex-wrap items-center justify-center"
              style={{ gap: 'clamp(2rem, 5vw, 4rem)' }}
            >
              {partners.map((partner) => (
                <div key={partner.name} className="flex items-center justify-center">
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    width={200}
                    height={partner.height}
                    className="w-auto grayscale opacity-70 hover:opacity-100 transition-opacity"
                    style={{ height: 'clamp(2.5rem, 4vw, 3rem)' }}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================== */}
        {/* PRESS CTA */}
        {/* ============================================== */}
        <section
          className="bg-black text-white"
          style={{ padding: 'clamp(3rem, 8vw, 5rem) clamp(1.5rem, 5vw, 6rem)' }}
        >
          <div className="max-w-[1400px] mx-auto">
            <div
              className="grid items-center"
              style={{
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
                gap: 'clamp(2rem, 5vw, 4rem)',
              }}
            >
              <div>
                <h2
                  className="font-display font-bold"
                  style={{ fontSize: 'clamp(1.75rem, 1rem + 3vw, 2.5rem)', marginBottom: 'clamp(1rem, 3vw, 1.5rem)' }}
                >
                  Press & Media
                </h2>
                <p
                  className="leading-relaxed opacity-80"
                  style={{ fontSize: 'clamp(1.125rem, 0.9rem + 1vw, 1.25rem)', marginBottom: 'clamp(1.5rem, 4vw, 2rem)' }}
                >
                  For press inquiries, interview requests, or media resources.
                </p>
                <Button href="/contact" variant="white" size="lg">
                  Contact Us →
                </Button>
              </div>
              <div>
                <p className="text-sm uppercase tracking-wide mb-4 opacity-60">Featured In</p>
                <div
                  className="grid"
                  style={{
                    gridTemplateColumns: 'repeat(auto-fill, minmax(60px, 1fr))',
                    gap: 'clamp(0.5rem, 1vw, 0.75rem)',
                  }}
                >
                  {['BBC', 'NYT', 'Politico', 'WaPo', 'CBS', 'CNN', 'The Grio', 'Reuters', 'The Root', 'USA Today'].map((outlet) => (
                    <div
                      key={outlet}
                      className="border border-white/30 text-center hover:border-white/60 transition-colors"
                      style={{ padding: 'clamp(0.5rem, 2vw, 0.75rem)' }}
                    >
                      <span className="text-gray-400 text-xs">[{outlet}]</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
    </>
  );
}
