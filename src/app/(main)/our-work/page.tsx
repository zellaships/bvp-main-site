import { safeFetch } from '@/sanity/lib/client';
import { ourWorkPageSettingsQuery } from '@/sanity/lib/queries';
import { OurWorkPageClient } from './OurWorkPageClient';

// Revalidate every 60 seconds
export const revalidate = 60;

interface OurWorkPageSettings {
  heroSubtitle?: string;
  heroTitle?: string;
  heroImage?: string;
  heroImageAlt?: string;
  mainVideoUrl?: string;
  statistics?: Array<{ number: string; label: string; description: string }>;
  litigationVideoUrl?: string;
  litigationCTA?: { title: string; buttonText: string; href: string };
  narrativeCTA?: { title: string; buttonText: string; href: string; isExternal?: boolean };
  mobilizationCTA?: { title: string; buttonText: string; href: string };
}

// Default content
const defaults = {
  heroSubtitle: 'Our Work',
  heroTitle: 'The Case for Repair',
  heroImage: '/images/our-work-banner.jpg',
  heroImageAlt: 'Navy sailors in formation representing the service and sacrifice of Black veterans',
  mainVideoUrl: 'https://www.youtube.com/embed/uLspZFLX23E?start=1',
  statistics: [
    {
      number: '$100B',
      label: 'DENIED',
      description: "Disparities in veterans' benefits have cost Black veterans and their families an estimated $100 Billion since WWII.",
    },
    {
      number: '32X',
      label: 'WEALTH GAP',
      description: 'White veterans hold 32 times more wealth than Black veterans—a gap of $164,000.',
    },
    {
      number: '33%',
      label: 'HOMELESS',
      description: "Black veterans account for 1/3 of our nation's homeless veteran population.",
    },
  ],
  litigationVideoUrl: 'https://www.youtube.com/embed/9XEj1AL9Bsw?start=1',
  litigationCTA: {
    title: 'Want to remain updated about our legal work?',
    buttonText: 'Become a member →',
    href: '/join',
  },
  narrativeCTA: {
    title: 'Are you a content creator, journalist, artist, scholar, or archivist?',
    buttonText: 'Contribute to our Substack →',
    href: 'https://blackveteransproject.substack.com',
    isExternal: true,
  },
  mobilizationCTA: {
    title: 'Do you support repair, equity, and democracy?',
    buttonText: 'Join the movement →',
    href: '/join',
  },
};

async function getOurWorkPageSettings(): Promise<OurWorkPageSettings | null> {
  return await safeFetch<OurWorkPageSettings>(ourWorkPageSettingsQuery);
}

export default async function OurWorkPage() {
  const settings = await getOurWorkPageSettings();

  // Merge with defaults
  const content = {
    heroSubtitle: settings?.heroSubtitle || defaults.heroSubtitle,
    heroTitle: settings?.heroTitle || defaults.heroTitle,
    heroImage: settings?.heroImage || defaults.heroImage,
    heroImageAlt: settings?.heroImageAlt || defaults.heroImageAlt,
    mainVideoUrl: settings?.mainVideoUrl || defaults.mainVideoUrl,
    statistics: (settings?.statistics && settings.statistics.length > 0) ? settings.statistics : defaults.statistics,
    litigationVideoUrl: settings?.litigationVideoUrl || defaults.litigationVideoUrl,
    litigationCTA: settings?.litigationCTA || defaults.litigationCTA,
    narrativeCTA: settings?.narrativeCTA || defaults.narrativeCTA,
    mobilizationCTA: settings?.mobilizationCTA || defaults.mobilizationCTA,
  };

  return <OurWorkPageClient content={content} />;
}
