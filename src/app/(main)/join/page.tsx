import { client } from '@/sanity/lib/client';
import { joinPageSettingsQuery } from '@/sanity/lib/queries';
import { JoinPageClient } from './JoinPageClient';

// Revalidate every 60 seconds
export const revalidate = 60;

// Default content
const defaults = {
  heroSubtitle: 'Join Our Movement',
  heroTitle: 'Build With Us',
  heroDescription: "Whether you're a Black veteran, military family member, descendant, or ally — your voice is needed in this fight.",
  veteranCard: {
    title: "I'm a Black Veteran",
    description: "Share your story and join our network of veteran advocates fighting for equity and repair.",
    buttonText: 'Share Your Story',
  },
  advocateCard: {
    title: "I'm a Supporter",
    description: "Stand with Black veterans in the fight for equity, repair, and democracy.",
    buttonText: 'Join as Advocate',
  },
  memberTypeOptions: [
    { value: 'veteran', label: 'Black Veteran' },
    { value: 'family', label: 'Military Family Member' },
    { value: 'descendant', label: 'Black Veteran Descendant' },
    { value: 'ally', label: 'Ally / Supporter' },
  ],
  veteranSuccessTitle: 'Thank You for Your Service',
  veteranSuccessMessage: "Your story matters. We'll be in touch soon to learn more about your experience and how we can support you.",
  advocateSuccessTitle: 'Welcome to the Movement',
  advocateSuccessMessage: "Thank you for joining us. Together, we're building a more equitable future for Black veterans.",
  privacyText: "By submitting, you agree to our Privacy Policy and consent to receive email communications from Black Veterans Project.",
};

async function getJoinPageSettings() {
  const settings = await client.fetch(joinPageSettingsQuery);
  return settings;
}

export default async function JoinPage() {
  const settings = await getJoinPageSettings();

  // Merge with defaults
  const content = {
    heroSubtitle: settings?.heroSubtitle || defaults.heroSubtitle,
    heroTitle: settings?.heroTitle || defaults.heroTitle,
    heroDescription: settings?.heroDescription || defaults.heroDescription,
    heroImage: settings?.heroImage || null,
    veteranCard: settings?.veteranCard || defaults.veteranCard,
    advocateCard: settings?.advocateCard || defaults.advocateCard,
    memberTypeOptions: settings?.memberTypeOptions?.length > 0 ? settings.memberTypeOptions : defaults.memberTypeOptions,
    veteranSuccessTitle: settings?.veteranSuccessTitle || defaults.veteranSuccessTitle,
    veteranSuccessMessage: settings?.veteranSuccessMessage || defaults.veteranSuccessMessage,
    advocateSuccessTitle: settings?.advocateSuccessTitle || defaults.advocateSuccessTitle,
    advocateSuccessMessage: settings?.advocateSuccessMessage || defaults.advocateSuccessMessage,
    privacyText: settings?.privacyText || defaults.privacyText,
  };

  return <JoinPageClient content={content} />;
}
