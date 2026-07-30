import type {StructureResolver} from 'sanity/structure'

// Singleton document types (only one instance)
const singletonTypes = new Set([
  'siteSettings',
  'homepageSettings',
  'aboutPageSettings',
  'donatePageSettings',
  'ourWorkPageSettings',
  'contactPageSettings',
  'joinPageSettings',
  'faqPageSettings',
  'pressPageSettings',
  'newsletterSettings',
  'sharedContent',
  'navigation',
])

// Helper to create singleton list items
const singletonListItem = (S: Parameters<StructureResolver>[0], typeName: string, title: string) =>
  S.listItem()
    .title(title)
    .id(typeName)
    .child(S.document().schemaType(typeName).documentId(typeName))

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      // ==================== GLOBAL SETTINGS ====================
      S.listItem()
        .title('Global Settings')
        .icon(() => '🌐')
        .child(
          S.list()
            .title('Global Settings')
            .items([
              singletonListItem(S, 'siteSettings', 'Site Settings'),
              singletonListItem(S, 'sharedContent', 'Shared Content (Stats, CTAs)'),
              singletonListItem(S, 'navigation', 'Navigation (Header & Footer)'),
              singletonListItem(S, 'newsletterSettings', 'Newsletter Settings'),
            ])
        ),

      S.divider(),

      // ==================== PAGE SETTINGS ====================
      S.listItem()
        .title('Page Settings')
        .icon(() => '⚙️')
        .child(
          S.list()
            .title('Page Settings')
            .items([
              singletonListItem(S, 'homepageSettings', 'Homepage'),
              singletonListItem(S, 'aboutPageSettings', 'About Page'),
              singletonListItem(S, 'ourWorkPageSettings', 'Our Work Page'),
              singletonListItem(S, 'donatePageSettings', 'Donate Page'),
              singletonListItem(S, 'contactPageSettings', 'Contact Page'),
              singletonListItem(S, 'joinPageSettings', 'Join Page'),
              singletonListItem(S, 'faqPageSettings', 'FAQ Page'),
              singletonListItem(S, 'pressPageSettings', 'Press Page'),
            ])
        ),

      S.divider(),

      // ==================== CONTENT ====================
      S.listItem()
        .title('Substack Articles')
        .icon(() => '📰')
        .child(S.documentTypeList('substackArticle').title('Substack Articles')),

      S.listItem()
        .title('Team Members')
        .icon(() => '👥')
        .child(S.documentTypeList('teamMember').title('Team Members')),

      S.listItem()
        .title('Press')
        .icon(() => '📺')
        .child(S.documentTypeList('press').title('Press')),

      S.listItem()
        .title('Partners')
        .icon(() => '🤝')
        .child(S.documentTypeList('partner').title('Partners')),

      S.listItem()
        .title('FAQs')
        .icon(() => '❓')
        .child(S.documentTypeList('faq').title('FAQs')),

      S.listItem()
        .title('Pages')
        .icon(() => '📄')
        .child(S.documentTypeList('page').title('Pages')),
    ])
