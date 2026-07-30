import { PressSection } from '@/components/sections/PressSection';
import { safeFetch } from '@/sanity/lib/client';
import { pressQuery, pressPageSettingsQuery } from '@/sanity/lib/queries';
import type { SanityPress } from '@/sanity/lib/types';

// Revalidate every 60 seconds
export const revalidate = 60;

interface PressPageSettings {
  heroSubtitle: string;
  heroTitle: string;
  heroDescription: string;
}

async function getPressItems(): Promise<SanityPress[]> {
  return (await safeFetch<SanityPress[]>(pressQuery)) ?? [];
}

async function getPressPageSettings(): Promise<PressPageSettings | null> {
  return safeFetch<PressPageSettings>(pressPageSettingsQuery);
}

export default async function PressPage() {
  const [pressItems, settings] = await Promise.all([
    getPressItems(),
    getPressPageSettings(),
  ]);

  // Use Sanity data with fallbacks
  const heroSubtitle = settings?.heroSubtitle ?? 'External coverage';
  const heroTitle = settings?.heroTitle ?? 'Archived Press';
  const heroDescription = settings?.heroDescription ?? "Coverage of Black Veterans Project's advocacy, litigation, and the movement for repair.";

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="border-b border-gray-200">
        <div style={{ padding: 'clamp(6rem, 10vw, 6rem) clamp(1rem, 4vw, 5.75rem) clamp(2rem, 5vw, 4rem)' }}>
          <div className="max-w-[1400px] mx-auto">
            <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">
              {heroSubtitle}
            </p>
            <h1
              className="font-gunterz font-bold leading-tight mb-4"
              style={{ fontSize: 'clamp(1.75rem, 1rem + 3.5vw, 3rem)' }}
            >
              {heroTitle}
            </h1>
            <p
              className="text-gray-600 max-w-2xl"
              style={{ fontSize: 'clamp(1rem, 0.9rem + 0.5vw, 1.125rem)' }}
            >
              {heroDescription}
            </p>
          </div>
        </div>
      </section>

      <PressSection pressItems={pressItems} />
    </div>
  );
}
