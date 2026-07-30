import { defineQuery } from 'next-sanity'

// ============================================
// TEAM MEMBERS
// ============================================
export const teamMembersQuery = defineQuery(`
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
`)

// ============================================
// PARTNERS
// ============================================
export const partnersQuery = defineQuery(`
  *[_type == "partner"] | order(order asc) {
    _id,
    name,
    website,
    category,
    "logo": logo.asset->url
  }
`)

// ============================================
// PRESS / NEWS
// ============================================
export const pressQuery = defineQuery(`
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
`)

export const featuredPressQuery = defineQuery(`
  *[_type == "press" && featured == true] | order(date desc)[0...3] {
    _id,
    title,
    date,
    source,
    url,
    excerpt,
    "image": image.asset->url
  }
`)

// ============================================
// FAQS
// ============================================
export const faqsQuery = defineQuery(`
  *[_type == "faq"] | order(order asc) {
    _id,
    question,
    answer,
    category
  }
`)

export const faqsByCategoryQuery = defineQuery(`
  *[_type == "faq"] | order(order asc) {
    _id,
    question,
    answer,
    category
  }
`)

// ============================================
// SITE SETTINGS
// ============================================
export const siteSettingsQuery = defineQuery(`
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
`)

// ============================================
// PAGES
// ============================================
export const pageBySlugQuery = defineQuery(`
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
`)

export const allPagesQuery = defineQuery(`
  *[_type == "page"] {
    _id,
    title,
    "slug": slug.current
  }
`)

// ============================================
// HOMEPAGE SETTINGS
// ============================================
export const homepageSettingsQuery = defineQuery(`
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
`)

// ============================================
// ABOUT PAGE SETTINGS
// ============================================
export const aboutPageSettingsQuery = defineQuery(`
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
`)

// ============================================
// DONATE PAGE SETTINGS
// ============================================
export const donatePageSettingsQuery = defineQuery(`
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
`)

// ============================================
// OUR WORK PAGE SETTINGS
// ============================================
export const ourWorkPageSettingsQuery = defineQuery(`
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
`)

// ============================================
// CONTACT PAGE SETTINGS
// ============================================
export const contactPageSettingsQuery = defineQuery(`
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
`)

// ============================================
// JOIN PAGE SETTINGS
// ============================================
export const joinPageSettingsQuery = defineQuery(`
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
`)

// ============================================
// SUBSTACK ARTICLES
// ============================================
export const substackArticlesQuery = defineQuery(`
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
`)

export const featuredSubstackArticleQuery = defineQuery(`
  *[_type == "substackArticle" && isVisible == true && isFeatured == true][0] {
    _id,
    title,
    description,
    substackUrl,
    "featuredImage": featuredImage.asset->url,
    publishedAt
  }
`)

// ============================================
// SHARED CONTENT (Statistics, CTAs, Legal)
// ============================================
export const sharedContentQuery = defineQuery(`
  *[_type == "sharedContent"][0] {
    statistics[] {
      key,
      number,
      label,
      description
    },
    primaryCTA {
      text,
      href,
      description
    },
    donateCTA {
      text,
      href,
      description
    },
    copyrightText,
    nonprofitDisclaimer,
    privacyNotice
  }
`)

// ============================================
// NAVIGATION (Header & Footer)
// ============================================
export const navigationQuery = defineQuery(`
  *[_type == "navigation"][0] {
    headerNav[] {
      label,
      href,
      children[] {
        label,
        href
      }
    },
    footerColumns[] {
      title,
      links[] {
        label,
        href,
        isExternal
      }
    },
    legalLinks[] {
      label,
      href
    },
    socialLinks[] {
      platform,
      url,
      label
    }
  }
`)

// ============================================
// NEWSLETTER SETTINGS
// ============================================
export const newsletterSettingsQuery = defineQuery(`
  *[_type == "newsletterSettings"][0] {
    stripHeadline,
    stripSubheadline,
    sectionTitle,
    sectionDescription,
    nameLabel,
    emailLabel,
    emailPlaceholder,
    substackCheckboxLabel,
    substackCheckboxHint,
    legalNotice,
    buttonDefault,
    buttonLoading,
    buttonSuccess,
    errorNameRequired,
    errorEmailInvalid,
    errorGeneric
  }
`)

// ============================================
// FAQ PAGE SETTINGS
// ============================================
export const faqPageSettingsQuery = defineQuery(`
  *[_type == "faqPageSettings"][0] {
    heroSubtitle,
    heroTitle,
    contactCTAText,
    contactCTAHref
  }
`)

// ============================================
// PRESS PAGE SETTINGS
// ============================================
export const pressPageSettingsQuery = defineQuery(`
  *[_type == "pressPageSettings"][0] {
    heroSubtitle,
    heroTitle,
    heroDescription
  }
`)
