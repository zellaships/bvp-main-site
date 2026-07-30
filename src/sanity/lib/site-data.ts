import { safeFetch } from './client'
import { navigationQuery, newsletterSettingsQuery, sharedContentQuery } from './queries'

// Types for site-wide data
export interface NavigationData {
  headerNav: Array<{
    label: string
    href: string
    children?: Array<{
      label: string
      href: string
    }>
  }>
  footerColumns: Array<{
    title: string
    links: Array<{
      label: string
      href: string
      isExternal?: boolean
    }>
  }>
  legalLinks: Array<{
    label: string
    href: string
  }>
  socialLinks: Array<{
    platform: string
    url: string
    label?: string
  }>
}

export interface NewsletterSettingsData {
  stripHeadline: string
  stripSubheadline: string
  sectionTitle: string
  sectionDescription: string
  nameLabel: string
  emailLabel: string
  emailPlaceholder: string
  substackCheckboxLabel: string
  substackCheckboxHint: string
  legalNotice: string
  buttonDefault: string
  buttonLoading: string
  buttonSuccess: string
  errorNameRequired: string
  errorEmailInvalid: string
  errorGeneric: string
}

export interface SharedContentData {
  statistics: Array<{
    key: string
    number: string
    label: string
    description: string
  }>
  primaryCTA: {
    text: string
    href: string
    description: string
  }
  donateCTA: {
    text: string
    href: string
    description: string
  }
  copyrightText: string
  nonprofitDisclaimer: string
  privacyNotice: string
}

export interface SiteData {
  navigation: NavigationData | null
  newsletter: NewsletterSettingsData | null
  shared: SharedContentData | null
}

// Fetch all site-wide data in one call
export async function getSiteData(): Promise<SiteData> {
  const [navigation, newsletter, shared] = await Promise.all([
    safeFetch<NavigationData>(navigationQuery),
    safeFetch<NewsletterSettingsData>(newsletterSettingsQuery),
    safeFetch<SharedContentData>(sharedContentQuery),
  ])

  return { navigation, newsletter, shared }
}

// Individual fetchers for when you only need specific data
export async function getNavigationData(): Promise<NavigationData | null> {
  return safeFetch<NavigationData>(navigationQuery)
}

export async function getNewsletterSettings(): Promise<NewsletterSettingsData | null> {
  return safeFetch<NewsletterSettingsData>(newsletterSettingsQuery)
}

export async function getSharedContent(): Promise<SharedContentData | null> {
  return safeFetch<SharedContentData>(sharedContentQuery)
}
