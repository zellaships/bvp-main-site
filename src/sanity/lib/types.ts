// ============================================
// SANITY DATA TYPES
// ============================================

export interface SanityTeamMember {
  _id: string
  name: string
  role: string
  category: 'founder' | 'leadership' | 'team' | 'board' | 'advisor'
  bio: string | null
  initials: string | null
  linkedin: string | null
  photo: string | null
}

export interface SanityPartner {
  _id: string
  name: string
  website: string | null
  category: 'partner' | 'sponsor' | 'funder' | 'media'
  logo: string | null
}

export interface SanityPress {
  _id: string
  title: string
  date: string
  source: string | null
  author: string | null
  url: string | null
  type: 'news' | 'opinion' | 'broadcast' | null
  topics: ('monk-case' | 'gi-bill' | 'dei' | 'policy' | 'benefits')[] | null
  excerpt: string | null
  featured: boolean
  image: string | null
}

export interface SanityFAQ {
  _id: string
  question: string
  answer: string
  category: 'about' | 'involvement' | 'donations' | 'programs' | null
}

export interface SanitySiteSettings {
  siteName: string | null
  tagline: string | null
  heroHeadline: string | null
  contactEmail: string | null
  footerText: string | null
  logo: string | null
  socialLinks: {
    twitter: string | null
    instagram: string | null
    facebook: string | null
    linkedin: string | null
    youtube: string | null
  } | null
}

export interface SanityPage {
  _id: string
  title: string
  slug: string
  heroHeadline: string | null
  heroSubheadline: string | null
  heroImage: string | null
  content: unknown[] | null
  seoDescription: string | null
}
