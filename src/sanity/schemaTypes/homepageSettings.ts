import { defineType, defineField } from 'sanity'

export const homepageSettings = defineType({
  name: 'homepageSettings',
  title: 'Homepage Settings',
  type: 'document',
  fields: [
    // Hero Section
    defineField({
      name: 'heroHeadline',
      title: 'Hero Headline',
      type: 'text',
      rows: 2,
      description: 'Main headline on homepage hero',
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Background Image',
      type: 'image',
      options: { hotspot: true },
    }),
    // Our Work Section
    defineField({
      name: 'ourWorkTitle',
      title: 'Our Work Section Title',
      type: 'string',
      initialValue: 'Our Work',
    }),
    defineField({
      name: 'ourWorkIntro',
      title: 'Our Work Intro Text',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'pillars',
      title: 'Pillars',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', title: 'Title', type: 'string' },
            { name: 'description', title: 'Description', type: 'text', rows: 3 },
            { name: 'cta', title: 'CTA Text', type: 'string' },
            { name: 'href', title: 'Link URL', type: 'string' },
            { name: 'image', title: 'Image', type: 'image', options: { hotspot: true } },
            { name: 'imageAlt', title: 'Image Alt Text', type: 'string' },
          ],
          preview: {
            select: { title: 'title', media: 'image' },
          },
        },
      ],
      validation: (Rule) => Rule.max(3),
    }),
    // Newsletter Section
    defineField({
      name: 'newsletterHeadline',
      title: 'Newsletter Headline',
      type: 'string',
    }),
    defineField({
      name: 'newsletterSubheadline',
      title: 'Newsletter Subheadline',
      type: 'string',
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Homepage Settings' }
    },
  },
})
