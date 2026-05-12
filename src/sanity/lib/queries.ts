import { groq } from 'next-sanity'

// ============================================
// TEAM MEMBERS
// ============================================
export const teamMembersQuery = groq`
  *[_type == "teamMember"] | order(order asc) {
    _id,
    name,
    role,
    category,
    bio,
    initials,
    linkedin,
    "photo": photo.asset->url
  }
`

// ============================================
// PARTNERS
// ============================================
export const partnersQuery = groq`
  *[_type == "partner"] | order(order asc) {
    _id,
    name,
    website,
    category,
    "logo": logo.asset->url
  }
`

// ============================================
// PRESS / NEWS
// ============================================
export const pressQuery = groq`
  *[_type == "press"] | order(date desc) {
    _id,
    title,
    date,
    source,
    author,
    url,
    type,
    topics,
    excerpt,
    featured,
    "image": image.asset->url
  }
`

export const featuredPressQuery = groq`
  *[_type == "press" && featured == true] | order(date desc)[0...3] {
    _id,
    title,
    date,
    source,
    url,
    excerpt,
    "image": image.asset->url
  }
`

// ============================================
// FAQS
// ============================================
export const faqsQuery = groq`
  *[_type == "faq"] | order(order asc) {
    _id,
    question,
    answer,
    category
  }
`

export const faqsByCategoryQuery = groq`
  *[_type == "faq"] | order(order asc) {
    _id,
    question,
    answer,
    category
  }
`

// ============================================
// SITE SETTINGS
// ============================================
export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    siteName,
    tagline,
    heroHeadline,
    contactEmail,
    footerText,
    "logo": logo.asset->url,
    socialLinks {
      twitter,
      instagram,
      facebook,
      linkedin,
      youtube
    }
  }
`

// ============================================
// PAGES
// ============================================
export const pageBySlugQuery = groq`
  *[_type == "page" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    heroHeadline,
    heroSubheadline,
    "heroImage": heroImage.asset->url,
    content,
    seoDescription
  }
`

export const allPagesQuery = groq`
  *[_type == "page"] {
    _id,
    title,
    "slug": slug.current
  }
`

// ============================================
// HOMEPAGE SETTINGS
// ============================================
export const homepageSettingsQuery = groq`
  *[_type == "homepageSettings"][0] {
    heroHeadline,
    "heroImage": heroImage.asset->url,
    ourWorkTitle,
    ourWorkIntro,
    pillars[] {
      title,
      description,
      cta,
      href,
      "image": image.asset->url,
      imageAlt
    },
    newsletterHeadline,
    newsletterSubheadline
  }
`

// ============================================
// ABOUT PAGE SETTINGS
// ============================================
export const aboutPageSettingsQuery = groq`
  *[_type == "aboutPageSettings"][0] {
    heroSubtitle,
    heroTitle,
    "heroImage": heroImage.asset->url,
    heroImageAlt,
    missionParagraphs,
    nonprofitText,
    timelineTitle,
    timelineEvents[] {
      year,
      title,
      description
    },
    pressCTATitle,
    pressCTAText,
    featuredInLogos
  }
`

// ============================================
// DONATE PAGE SETTINGS
// ============================================
export const donatePageSettingsQuery = groq`
  *[_type == "donatePageSettings"][0] {
    heroSubtitle,
    heroTitle,
    "heroImage": heroImage.asset->url,
    mainParagraphs,
    taxNoticeTitle,
    taxNoticeText,
    donationFormUrl,
    recurringDonationText
  }
`

// ============================================
// OUR WORK PAGE SETTINGS
// ============================================
export const ourWorkPageSettingsQuery = groq`
  *[_type == "ourWorkPageSettings"][0] {
    heroSubtitle,
    heroTitle,
    "heroImage": heroImage.asset->url,
    heroImageAlt,
    mainVideoUrl,
    caseForRepairIntro,
    statistics[] {
      number,
      label,
      description
    },
    caseForRepairContinued,
    howRepairHappensTitle,
    howRepairHappensIntro,
    repairBulletPoints,
    theoryOfChangeTitle,
    theoryOfChangeIntro,
    litigationTitle,
    litigationVideoUrl,
    litigationParagraphs,
    litigationCTA {
      title,
      buttonText,
      href
    },
    narrativeTitle,
    narrativeParagraphs,
    narrativeCTA {
      title,
      buttonText,
      href,
      isExternal
    },
    mobilizationTitle,
    mobilizationParagraphs,
    mobilizationCTA {
      title,
      buttonText,
      href
    }
  }
`

// ============================================
// CONTACT PAGE SETTINGS
// ============================================
export const contactPageSettingsQuery = groq`
  *[_type == "contactPageSettings"][0] {
    heroSubtitle,
    heroTitle,
    heroDescription,
    contactEmail,
    contactPanelHeadline,
    socialLinks[] {
      platform,
      handle,
      url
    },
    formTitle,
    topicOptions[] {
      value,
      label
    },
    successTitle,
    successMessage
  }
`

// ============================================
// JOIN PAGE SETTINGS
// ============================================
export const joinPageSettingsQuery = groq`
  *[_type == "joinPageSettings"][0] {
    heroSubtitle,
    heroTitle,
    heroDescription,
    "heroImage": heroImage.asset->url,
    veteranCard {
      title,
      description,
      buttonText
    },
    advocateCard {
      title,
      description,
      buttonText
    },
    memberTypeOptions[] {
      value,
      label
    },
    veteranSuccessTitle,
    veteranSuccessMessage,
    advocateSuccessTitle,
    advocateSuccessMessage,
    privacyText
  }
`

// ============================================
// SUBSTACK ARTICLES
// ============================================
export const substackArticlesQuery = groq`
  *[_type == "substackArticle" && isVisible == true] | order(displayOrder asc, publishedAt desc) {
    _id,
    title,
    description,
    substackUrl,
    "featuredImage": featuredImage.asset->url,
    publishedAt,
    isFeatured,
    displayOrder
  }
`

export const featuredSubstackArticleQuery = groq`
  *[_type == "substackArticle" && isVisible == true && isFeatured == true][0] {
    _id,
    title,
    description,
    substackUrl,
    "featuredImage": featuredImage.asset->url,
    publishedAt
  }
`
