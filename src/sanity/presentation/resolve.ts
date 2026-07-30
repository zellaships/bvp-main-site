import { defineLocations, type PresentationPluginOptions } from 'sanity/presentation'

// Document locations for the Presentation Tool
// This enables navigation between documents in the Studio and their front-end representations
export const resolve: PresentationPluginOptions['resolve'] = {
  locations: {
    // Homepage settings
    homepageSettings: defineLocations({
      select: {},
      resolve: () => ({
        locations: [{ title: 'Homepage', href: '/' }],
      }),
    }),
    // About page settings
    aboutPageSettings: defineLocations({
      select: {},
      resolve: () => ({
        locations: [{ title: 'About Page', href: '/about' }],
      }),
    }),
    // FAQ page settings
    faqPageSettings: defineLocations({
      select: {},
      resolve: () => ({
        locations: [{ title: 'FAQ Page', href: '/faq' }],
      }),
    }),
    // Press page settings
    pressPageSettings: defineLocations({
      select: {},
      resolve: () => ({
        locations: [{ title: 'Press Page', href: '/press' }],
      }),
    }),
    // Contact page settings
    contactPageSettings: defineLocations({
      select: {},
      resolve: () => ({
        locations: [{ title: 'Contact Page', href: '/contact' }],
      }),
    }),
    // Join page settings
    joinPageSettings: defineLocations({
      select: {},
      resolve: () => ({
        locations: [{ title: 'Join Page', href: '/join' }],
      }),
    }),
    // Donate page settings
    donatePageSettings: defineLocations({
      select: {},
      resolve: () => ({
        locations: [{ title: 'Donate Page', href: '/donate' }],
      }),
    }),
    // Our Work page settings
    ourWorkPageSettings: defineLocations({
      select: {},
      resolve: () => ({
        locations: [{ title: 'Our Work Page', href: '/our-work' }],
      }),
    }),
    // Team members
    teamMember: defineLocations({
      select: { name: 'name' },
      resolve: (doc) => ({
        locations: [
          { title: doc?.name || 'Team Member', href: '/about' },
        ],
      }),
    }),
    // FAQ items
    faq: defineLocations({
      select: { question: 'question' },
      resolve: (doc) => ({
        locations: [
          { title: doc?.question || 'FAQ', href: '/faq' },
        ],
      }),
    }),
    // Press items
    press: defineLocations({
      select: { title: 'title' },
      resolve: (doc) => ({
        locations: [
          { title: doc?.title || 'Press Item', href: '/press' },
        ],
      }),
    }),
    // Partners
    partner: defineLocations({
      select: { name: 'name' },
      resolve: (doc) => ({
        locations: [
          { title: doc?.name || 'Partner', href: '/about' },
        ],
      }),
    }),
    // Navigation
    navigation: defineLocations({
      select: {},
      resolve: () => ({
        locations: [
          { title: 'Header & Footer', href: '/' },
        ],
      }),
    }),
    // Newsletter settings
    newsletterSettings: defineLocations({
      select: {},
      resolve: () => ({
        locations: [{ title: 'Newsletter Section', href: '/' }],
      }),
    }),
    // Shared content
    sharedContent: defineLocations({
      select: {},
      resolve: () => ({
        locations: [{ title: 'Shared Content (Footer, Stats)', href: '/' }],
      }),
    }),
  },
}
