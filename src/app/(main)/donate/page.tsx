import { client } from '@/sanity/lib/client';
import { donatePageSettingsQuery } from '@/sanity/lib/queries';
import { DonatePageClient } from './DonatePageClient';

// Revalidate every 60 seconds
export const revalidate = 60;

// Default content (used as fallback)
const defaults = {
  heroSubtitle: 'Support Our Mission',
  heroTitle: 'Help Us Secure the Legacy for Black Veterans',
  mainParagraphs: [
    "Your donation helps Black Veterans Project's mission to advocate for racial inclusion and justice across the United States military while ensuring the welfare of all Black veterans who've served.",
    "By supporting us, you're helping to drive forward vital work that raises public awareness, addresses systemic inequities, and brings us closer to a future where all who have served are empowered with the resources and opportunities they've long been denied.",
    "Every contribution, no matter the size, strengthens our ability to make lasting change and ensure Black veterans' voices are heard.",
  ],
  taxNoticeTitle: 'Tax Deductible:',
  taxNoticeText: 'Black Veterans Project is a 501(c)(3) nonprofit organization. Your donation is tax-deductible to the extent allowed by law.',
  donationFormUrl: 'https://cdn.donately.com/core/6.0/donate-form.html?form_id=frm_17bf7d7efced&account_id=act_1c9da0501869&stripe_key=pk_live_51EciVsFvVHN4GQU4Cyxh9ZfzIYeJQ9VXDHj4LqCHlU4XCB2cDI8vxhDzxXOJwCw5TjK89kwvuDuXEz3XeugfdcSr00nNgvHMYd',
  recurringDonationText: 'Monthly donations will be charged on the same date each month until cancelled. To cancel or modify your recurring donation, email info@blackveteransproject.org or manage your subscription through Donately.',
};

async function getDonatePageSettings() {
  const settings = await client.fetch(donatePageSettingsQuery);
  return settings;
}

export default async function DonatePage() {
  const settings = await getDonatePageSettings();

  // Merge with defaults
  const content = {
    heroSubtitle: settings?.heroSubtitle || defaults.heroSubtitle,
    heroTitle: settings?.heroTitle || defaults.heroTitle,
    mainParagraphs: settings?.mainParagraphs?.length > 0 ? settings.mainParagraphs : defaults.mainParagraphs,
    taxNoticeTitle: settings?.taxNoticeTitle || defaults.taxNoticeTitle,
    taxNoticeText: settings?.taxNoticeText || defaults.taxNoticeText,
    donationFormUrl: settings?.donationFormUrl || defaults.donationFormUrl,
    recurringDonationText: settings?.recurringDonationText || defaults.recurringDonationText,
  };

  return <DonatePageClient content={content} />;
}
