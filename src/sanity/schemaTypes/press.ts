import { defineType, defineField } from 'sanity'

export const press = defineType({
  name: 'press',
  title: 'Press & News',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Headline',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Publication Date',
      type: 'date',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'source',
      title: 'Source / Publication',
      type: 'string',
      description: 'e.g., "New York Times", "CNN"',
    }),
    defineField({
      name: 'author',
      title: 'Author / Attribution',
      type: 'string',
      description: 'e.g., "Featuring Kyle Bibby · By Jane Doe"',
    }),
    defineField({
      name: 'url',
      title: 'Article URL',
      type: 'url',
    }),
    defineField({
      name: 'type',
      title: 'Type',
      type: 'string',
      options: {
        list: [
          { title: 'News', value: 'news' },
          { title: 'Opinion', value: 'opinion' },
          { title: 'Broadcast', value: 'broadcast' },
        ],
      },
      initialValue: 'news',
    }),
    defineField({
      name: 'topics',
      title: 'Topics',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Monk Case', value: 'monk-case' },
          { title: 'GI Bill', value: 'gi-bill' },
          { title: 'DEI', value: 'dei' },
          { title: 'Policy', value: 'policy' },
          { title: 'Benefits', value: 'benefits' },
        ],
      },
    }),
    defineField({
      name: 'image',
      title: 'Featured Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt / Summary',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      description: 'Show prominently on the site',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'source',
      media: 'image',
    },
  },
  orderings: [
    {
      title: 'Date (Newest)',
      name: 'dateDesc',
      by: [{ field: 'date', direction: 'desc' }],
    },
  ],
})
