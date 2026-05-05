import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { TeamSection } from '@/components/sections/TeamSection';
import { PartnersSection } from '@/components/sections/PartnersSection';
import { Timeline } from '@/components/sections/Timeline';
import { client } from '@/sanity/lib/client';
import { teamMembersQuery, partnersQuery } from '@/sanity/lib/queries';
import type { SanityTeamMember, SanityPartner } from '@/sanity/lib/types';

// Revalidate every 60 seconds
export const revalidate = 60;

async function getTeamMembers(): Promise<SanityTeamMember[]> {
  return client.fetch(teamMembersQuery);
}

async function getPartners(): Promise<SanityPartner[]> {
  return client.fetch(partnersQuery);
}

export default async function AboutPage() {
  const [team, partners] = await Promise.all([
    getTeamMembers(),
    getPartners(),
  ]);

  return (
    <>
      {/* HERO */}
      <section
        id="mission"
        className="relative h-screen min-h-[600px] max-h-[1200px] flex items-end scroll-mt-20 overflow-hidden bg-black"
      >
        <Image
          src="/images/who-we-are.jpg"
          alt="Black Army veterans proudly waving American flag"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/70" />
        <div
          className="relative z-10 max-w-[1400px] mx-auto w-full"
          style={{ padding: 'clamp(2rem, 5vw, 4rem) clamp(1rem, 4vw, 5.75rem)' }}
        >
          <p className="text-sm uppercase tracking-widest mb-4 text-white/60">Who We Are</p>
          <h1
            className="font-gunterz font-bold text-white uppercase"
            style={{ fontSize: 'clamp(2rem, 1.5rem + 4vw, 3.75rem)' }}
          >
            Building a Movement
          </h1>
        </div>
      </section>

      {/* MISSION */}
      <section style={{ padding: 'clamp(3rem, 8vw, 5rem) clamp(1rem, 4vw, 5.75rem)' }}>
        <div className="max-w-[1400px] mx-auto">
          <div className="max-w-4xl">
            <p
              className="leading-relaxed"
              style={{ fontSize: 'clamp(1.125rem, 0.9rem + 1vw, 1.25rem)', marginBottom: 'clamp(1rem, 3vw, 1.5rem)' }}
            >
              Founded in 2018, Black Veterans Project (BVP) leverages research, narrative strategies, and impact litigation to mobilize a movement for repair to redress the federal government's long history of discrimination against Black veterans and their families.
            </p>
            <p
              className="leading-relaxed"
              style={{ fontSize: 'clamp(1.125rem, 0.9rem + 1vw, 1.25rem)', marginBottom: 'clamp(1rem, 3vw, 1.5rem)' }}
            >
              BVP represents the first comprehensive reparative justice effort for Black veterans and military families systematically denied veterans' benefits during and in the aftermath of Jim Crow segregation and through the persistence of institutionalized racism.
            </p>
            <p
              className="leading-relaxed"
              style={{ fontSize: 'clamp(1.125rem, 0.9rem + 1vw, 1.25rem)', marginBottom: 'clamp(1rem, 3vw, 1.5rem)' }}
            >
              Join us as we build the collective power to demand accountability, advance policy change, and achieve reparations for Black veterans in America.
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

      {/* TIMELINE */}
      <Timeline />

      {/* TEAM - Data from Sanity */}
      <TeamSection team={team} />

      {/* PARTNERS - Data from Sanity */}
      <PartnersSection partners={partners} />

      {/* PRESS CTA */}
      <section
        className="bg-black text-white"
        style={{ padding: 'clamp(3rem, 8vw, 5rem) clamp(1rem, 4vw, 5.75rem)' }}
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
                className="font-gunterz font-bold"
                style={{ fontSize: 'clamp(1.75rem, 1rem + 3vw, 2.5rem)', marginBottom: 'clamp(1rem, 3vw, 1.5rem)' }}
              >
                Press & Media
              </h2>
              <p
                className="leading-relaxed opacity-80"
                style={{ fontSize: 'clamp(1.125rem, 0.9rem + 1vw, 1.25rem)', marginBottom: 'clamp(1.5rem, 4vw, 2rem)' }}
              >
                For press inquiries, interview requests, or media resources:
              </p>
              <Button href="/contact" variant="white" size="lg">
                Contact Us →
              </Button>
            </div>
            <div>
              <h3 className="text-sm uppercase tracking-wide mb-6 opacity-70">Featured In</h3>
              <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
                <span className="text-white/80 font-bold text-lg tracking-tight">BBC</span>
                <span className="text-white/80 font-serif text-xl italic">The New York Times</span>
                <span className="text-white/80 font-bold text-lg uppercase tracking-wider">Politico</span>
                <span className="text-white/80 font-serif text-lg italic">The Washington Post</span>
                <span className="text-white/80 font-bold text-xl">CBS</span>
                <span className="text-white/80 font-bold text-xl tracking-tight">CNN</span>
                <span className="text-white/80 font-bold text-lg">TheGrio</span>
                <span className="text-white/80 font-bold text-lg uppercase tracking-widest">Reuters</span>
                <span className="text-white/80 font-bold text-lg italic">The Root</span>
                <span className="text-white/80 font-bold text-lg uppercase">USA Today</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
