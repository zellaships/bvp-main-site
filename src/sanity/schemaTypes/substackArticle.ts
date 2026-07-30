import { defineType, defineField } from 'sanity'

export const substackArticle = defineType({
  name: 'substackArticle',
  title: 'Substack Article',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Article Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description / Excerpt',
      type: 'text',
      rows: 3,
      description: 'Brief description shown on cards',
    }),
    defineField({
      name: 'substackUrl',
      title: 'Substack URL',
      type: 'url',
      description: 'Link to the full article on Substack',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      options: { hotspot: true },
      description: 'Image shown on article cards',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published Date',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'isFeatured',
      title: 'Featured Article',
      type: 'boolean',
      description: 'Show as the main featured article on homepage',
      initialValue: false,
    }),
    defineField({
      name: 'displayOrder',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first (1, 2, 3...)',
      initialValue: 10,
    }),
    defineField({
      name: 'isVisible',
      title: 'Visible',
      type: 'boolean',
      description: 'Show this article on the site',
      initialValue: true,
    }),
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'displayOrderAsc',
      by: [{ field: 'displayOrder', direction: 'asc' }],
    },
    {
      title: 'Published Date, Newest',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'description',
      media: 'featuredImage',
      isFeatured: 'isFeatured',
    },
    prepare({ title, subtitle, media, isFeatured }) {
      return {
        title: isFeatured ? `⭐ ${title}` : title,
        subtitle,
        media,
      }
    },
  },
})
