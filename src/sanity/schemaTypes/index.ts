import { type SchemaTypeDefinition } from 'sanity'
import { page } from './page'
import { teamMember } from './teamMember'
import { partner } from './partner'
import { press } from './press'
import { faq } from './faq'
import { siteSettings } from './siteSettings'
import { homepageSettings } from './homepageSettings'
import { aboutPageSettings } from './aboutPageSettings'
import { substackArticle } from './substackArticle'
import { donatePageSettings } from './donatePageSettings'
import { ourWorkPageSettings } from './ourWorkPageSettings'
import { contactPageSettings } from './contactPageSettings'
import { joinPageSettings } from './joinPageSettings'
import { sharedContent } from './sharedContent'
import { navigation } from './navigation'
import { faqPageSettings } from './faqPageSettings'
import { pressPageSettings } from './pressPageSettings'
import { newsletterSettings } from './newsletterSettings'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    // Content Types
    page,
    teamMember,
    partner,
    press,
    faq,
    substackArticle,
    // Settings (Singletons)
    siteSettings,
    homepageSettings,
    aboutPageSettings,
    donatePageSettings,
    ourWorkPageSettings,
    contactPageSettings,
    joinPageSettings,
    faqPageSettings,
    pressPageSettings,
    newsletterSettings,
    // Shared Content
    sharedContent,
    navigation,
  ],
}
