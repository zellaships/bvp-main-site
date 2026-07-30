import { safeFetch } from '@/sanity/lib/client';
import { contactPageSettingsQuery } from '@/sanity/lib/queries';
import { ContactPageClient } from './ContactPageClient';

// Revalidate every 60 seconds
export const revalidate = 60;

interface ContactPageSettings {
  heroSubtitle?: string;
  heroTitle?: string;
  heroDescription?: string;
  contactEmail?: string;
  contactPanelHeadline?: string;
  socialLinks?: Array<{ platform: string; handle: string; url: string }>;
  formTitle?: string;
  topicOptions?: Array<{ value: string; label: string }>;
  successTitle?: string;
  successMessage?: string;
}

// Default content
const defaults = {
  heroSubtitle: 'Get in touch',
  heroTitle: 'Contact Us',
  heroDescription: 'For press inquiries, partnerships, speaking requests, or general questions.',
  contactEmail: 'info@blackveteransproject.org',
  contactPanelHeadline: 'For press, partnerships, and general inquiries:',
  socialLinks: [
    { platform: 'Instagram', handle: '@blackvetsproject', url: 'https://instagram.com/blackvetsproject' },
    { platform: 'Twitter / X', handle: '@blackvetsproject', url: 'https://twitter.com/blackvetsproject' },
    { platform: 'LinkedIn', handle: 'Black Veterans Project', url: 'https://linkedin.com/company/blackveteransproject' },
  ],
  formTitle: 'Send a Message',
  topicOptions: [
    { value: 'press', label: 'Press Inquiry' },
    { value: 'partnership', label: 'Partnership Opportunity' },
    { value: 'speaking', label: 'Speaking Request' },
    { value: 'general', label: 'General Question' },
    { value: 'other', label: 'Other' },
  ],
  successTitle: 'Thank You',
  successMessage: "We've received your message and will get back to you as soon as possible. For urgent matters, please email us directly.",
};

async function getContactPageSettings(): Promise<ContactPageSettings | null> {
  return await safeFetch<ContactPageSettings>(contactPageSettingsQuery);
}

export default async function ContactPage() {
  const settings = await getContactPageSettings();

  // Merge with defaults
  const content = {
    heroSubtitle: settings?.heroSubtitle || defaults.heroSubtitle,
    heroTitle: settings?.heroTitle || defaults.heroTitle,
    heroDescription: settings?.heroDescription || defaults.heroDescription,
    contactEmail: settings?.contactEmail || defaults.contactEmail,
    contactPanelHeadline: settings?.contactPanelHeadline || defaults.contactPanelHeadline,
    socialLinks: (settings?.socialLinks && settings.socialLinks.length > 0) ? settings.socialLinks : defaults.socialLinks,
    formTitle: settings?.formTitle || defaults.formTitle,
    topicOptions: (settings?.topicOptions && settings.topicOptions.length > 0) ? settings.topicOptions : defaults.topicOptions,
    successTitle: settings?.successTitle || defaults.successTitle,
    successMessage: settings?.successMessage || defaults.successMessage,
  };

  return <ContactPageClient content={content} />;
}
