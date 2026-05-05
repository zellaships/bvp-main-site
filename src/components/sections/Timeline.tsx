'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

// Timeline data (historical - kept as static content)
const timelineData = [
  {
    year: '2020',
    title: 'Obtaining Historical Data',
    summary: 'Obtaining Historical Data',
    image: '/images/timeline-2020.jpg',
    details: [
      'BVP partners with <strong>Yale Law School Jerome N. Franklin Veterans Legal Services Clinic</strong> to obtain decades of government data demonstrating sustained and systemic racial inequities in veterans\' disability rates.',
    ],
  },
  {
    year: '2021',
    title: 'Coalition Building',
    summary: 'Coalition Building',
    image: '/images/timeline-2021.jpg',
    details: [
      'BVP assists in building and convening a <strong>national coalition of Black veterans\' groups</strong> interfacing with the 117th Congress.',
      'BVP\'s work prompts the passage of a historic <strong>Government Accountability Office study</strong> on racial disparities in disability compensation.',
    ],
  },
  {
    year: '2022',
    title: 'Legislative Reform',
    summary: 'Legislative Reform',
    image: '/images/timeline-2022.webp',
    details: [
      'BVP champions <strong>military justice reform</strong>, the <strong>PACT Act</strong>, and testifying before Congress to support the <strong>Sgt. Isaac Woodard, Jr. and Sgt. Joseph H. Maddox GI Bill Restoration Act</strong>.',
      'Advocated for iterative redress legislation to <strong>extend unused VA home loans to descendants</strong> of Black veterans denied access to the G.I. Bill.',
    ],
  },
  {
    year: '2023',
    title: 'Monk v. United States is filed',
    summary: 'Monk v. United States is filed',
    image: '/images/timeline-2023.jpg',
    details: [
      '<strong>Monk v. United States</strong> is filed, becoming the first landmark case leveraging internal VA data to allege racial discrimination in the allocation of veterans\' benefits since 1945.',
    ],
  },
  {
    year: '2024',
    title: 'A New Strategic Vision',
    summary: 'A New Strategic Vision',
    image: '/images/timeline-2024.jpg',
    details: [
      'BVP undertakes a <strong>robust strategic planning process</strong> and collaborates with <strong>Harvard Kennedy School\'s Trotter Collaborative for Social Justice</strong> to develop a repair-and-reform strategy.',
    ],
  },
  {
    year: '2025',
    title: 'Scaling for Impact',
    summary: 'Scaling for Impact',
    image: '/images/timeline-2025.jpg',
    details: [
      'BVP begins <strong>new strategic partnerships to scale impact</strong>, becoming one of the nation\'s preeminent voices on issues facing Black servicemembers, veterans, and military families.',
    ],
  },
];

export function Timeline() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!scrollRef.current) return;
      const scrollLeft = scrollRef.current.scrollLeft;
      const cardWidth = 280 + 16;
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
        padding: 'clamp(3rem, 8vw, 5rem) clamp(1rem, 4vw, 5.75rem)',
      }}
    >
      <div className="max-w-[1400px] mx-auto">
        <h2
          className="font-gunterz font-bold uppercase"
          style={{
            fontSize: 'clamp(1.75rem, 1rem + 3vw, 2.5rem)',
            marginBottom: 'clamp(2rem, 5vw, 4rem)',
          }}
        >
          Our History
        </h2>

        {/* Mobile Timeline */}
        <div className="block lg:hidden">
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

          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto pb-4 -mx-6 px-6 snap-x snap-mandatory scrollbar-hide"
          >
            {timelineData.map((item) => (
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
          <div className="absolute top-[6px] left-0 right-0 h-[1px] bg-[#FDC500]" />

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 lg:gap-8">
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

                <div
                  className={`absolute bottom-full mb-6 bg-white border-t-4 border-[#FDC500] w-[min(520px,calc(100vw-3rem))] z-20 shadow-lg transition-all duration-200 ${
                    index >= 3 ? 'right-0' : 'left-0'
                  } ${
                    hoveredIndex === index
                      ? 'opacity-100 translate-y-0 pointer-events-auto'
                      : 'opacity-0 translate-y-2 pointer-events-none'
                  }`}
                >
                  <div className="w-full h-56 bg-gray-100 flex items-center justify-center overflow-hidden">
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt={`${item.year} - ${item.title}`}
                        width={520}
                        height={224}
                        className="w-full h-full object-cover object-top"
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
