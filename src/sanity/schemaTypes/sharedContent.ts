import { defineType, defineField } from 'sanity'

export const sharedContent = defineType({
  name: 'sharedContent',
  title: 'Shared Content',
  type: 'document',
  description: 'Content that appears across multiple pages (statistics, CTAs, etc.)',
  groups: [
    { name: 'statistics', title: 'Statistics' },
    { name: 'ctas', title: 'Calls to Action' },
    { name: 'legal', title: 'Legal & Compliance' },
  ],
  fields: [
    // ==================== STATISTICS ====================
    defineField({
      name: 'statistics',
      title: 'Key Statistics',
      type: 'array',
      group: 'statistics',
      description: 'These stats appear on Our Work, Donate, and Homepage. Edit once, updates everywhere.',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'key',
              title: 'Key (for reference)',
              type: 'string',
              description: 'Internal identifier, e.g., "denied", "wealth-gap", "homeless"',
            },
            {
              name: 'number',
              title: 'Number/Value',
              type: 'string',
              description: 'e.g., "$100B", "32X", "33%"',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'label',
              title: 'Label',
              type: 'string',
              description: 'e.g., "DENIED", "WEALTH GAP", "HOMELESS"',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 3,
              validation: (Rule) => Rule.required(),
            },
          ],
          preview: {
            select: { title: 'number', subtitle: 'label' },
          },
        },
      ],
      validation: (Rule) => Rule.max(5),
    }),

    // ==================== PRIMARY CTA ====================
    defineField({
      name: 'primaryCTA',
      title: 'Primary CTA (Get Involved)',
      type: 'object',
      group: 'ctas',
      description: 'The main membership/involvement CTA used across the site',
      fields: [
        {
          name: 'label',
          title: 'Button Label',
          type: 'string',
          initialValue: 'Get Involved',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'href',
          title: 'Button Link',
          type: 'string',
          initialValue: '/join',
          validation: (Rule) => Rule.required(),
        },
      ],
    }),

    defineField({
      name: 'donateCTA',
      title: 'Donate CTA',
      type: 'object',
      group: 'ctas',
      description: 'The donate button used across the site',
      fields: [
        {
          name: 'label',
          title: 'Button Label',
          type: 'string',
          initialValue: 'Donate',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'href',
          title: 'Button Link',
          type: 'string',
          initialValue: '/donate',
          validation: (Rule) => Rule.required(),
        },
      ],
    }),

    // ==================== LEGAL ====================
    defineField({
      name: 'copyrightText',
      title: 'Copyright Text',
      type: 'string',
      group: 'legal',
      description: 'Copyright notice (year will be auto-updated)',
      initialValue: 'Black Veterans Project. 501(c)(3) nonprofit organization.',
    }),
    defineField({
      name: 'nonprofitDisclaimer',
      title: 'Nonprofit Disclaimer',
      type: 'text',
      rows: 2,
      group: 'legal',
      initialValue: 'Black Veterans Project is a 501(c)(3) nonprofit organization. Your donation is tax-deductible to the extent allowed by law.',
    }),
    defineField({
      name: 'privacyNotice',
      title: 'Form Privacy Notice',
      type: 'text',
      rows: 2,
      group: 'legal',
      description: 'Privacy notice shown on forms',
      initialValue: 'By submitting, you agree to our Privacy Policy and consent to receive email communications from Black Veterans Project.',
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Shared Content' }
    },
  },
})
