import { defineType, defineField } from 'sanity'

export const aboutPageSettings = defineType({
  name: 'aboutPageSettings',
  title: 'About Page Settings',
  type: 'document',
  fields: [
    // Hero Section
    defineField({
      name: 'heroSubtitle',
      title: 'Hero Subtitle',
      type: 'string',
      description: 'Small text above the hero title (e.g., "Who We Are")',
      initialValue: 'Who We Are',
    }),
    defineField({
      name: 'heroTitle',
      title: 'Hero Title',
      type: 'string',
      description: 'Main hero headline',
      initialValue: 'Building a Movement',
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Background Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'heroImageAlt',
      title: 'Hero Image Alt Text',
      type: 'string',
      initialValue: 'Black Army veterans proudly waving American flag',
    }),
    // Mission Section
    defineField({
      name: 'missionParagraphs',
      title: 'Mission Paragraphs',
      type: 'array',
      of: [{ type: 'text', rows: 4 }],
      description: 'Main mission statement paragraphs',
    }),
    defineField({
      name: 'nonprofitText',
      title: 'Nonprofit Text',
      type: 'string',
      description: 'Small text about nonprofit status',
      initialValue: 'BVP is a 501(c)(3) nonprofit organization.',
    }),
    // Timeline Section
    defineField({
      name: 'timelineTitle',
      title: 'Timeline Section Title',
      type: 'string',
      initialValue: 'A History of Discrimination',
    }),
    defineField({
      name: 'timelineEvents',
      title: 'Timeline Events',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'year', title: 'Year', type: 'string' },
            { name: 'title', title: 'Title', type: 'string' },
            { name: 'description', title: 'Description', type: 'text', rows: 4 },
          ],
          preview: {
            select: { title: 'year', subtitle: 'title' },
          },
        },
      ],
    }),
    // Press CTA Section
    defineField({
      name: 'pressCTATitle',
      title: 'Press CTA Title',
      type: 'string',
      initialValue: 'Press & Media',
    }),
    defineField({
      name: 'pressCTAText',
      title: 'Press CTA Text',
      type: 'string',
      initialValue: 'For press inquiries, interview requests, or media resources:',
    }),
    defineField({
      name: 'featuredInLogos',
      title: 'Featured In Outlets',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'List of media outlet names (e.g., BBC, NYT, CNN)',
    }),
  ],
  preview: {
    prepare() {
      return { title: 'About Page Settings' }
    },
  },
})
