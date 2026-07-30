import { defineType, defineField } from 'sanity'

export const pressPageSettings = defineType({
  name: 'pressPageSettings',
  title: 'Press Page Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'heroSubtitle',
      title: 'Hero Subtitle',
      type: 'string',
      initialValue: 'External coverage',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroTitle',
      title: 'Hero Title',
      type: 'string',
      initialValue: 'Archived Press',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroDescription',
      title: 'Hero Description',
      type: 'text',
      rows: 2,
      initialValue: "Coverage of Black Veterans Project's advocacy, impact litigation, and the stories we've helped bring to light.",
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Press Page Settings' }
    },
  },
})
