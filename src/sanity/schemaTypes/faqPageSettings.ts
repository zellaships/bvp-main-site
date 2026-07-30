import { defineType, defineField } from 'sanity'

export const faqPageSettings = defineType({
  name: 'faqPageSettings',
  title: 'FAQ Page Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'heroSubtitle',
      title: 'Hero Subtitle',
      type: 'string',
      initialValue: 'Frequently Asked Questions',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroTitle',
      title: 'Hero Title',
      type: 'string',
      initialValue: 'Common questions about BVP and how to get involved.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'contactCTAText',
      title: 'Contact CTA Text',
      type: 'string',
      initialValue: 'Have More Questions? Contact Us',
      description: 'Text for the contact link at the bottom of the FAQ page',
    }),
    defineField({
      name: 'contactCTAHref',
      title: 'Contact CTA Link',
      type: 'string',
      initialValue: '/contact',
    }),
  ],
  preview: {
    prepare() {
      return { title: 'FAQ Page Settings' }
    },
  },
})
