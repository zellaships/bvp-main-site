import { defineType, defineField } from 'sanity'

export const navigation = defineType({
  name: 'navigation',
  title: 'Navigation',
  type: 'document',
  description: 'Header and footer navigation structure',
  groups: [
    { name: 'header', title: 'Header Navigation' },
    { name: 'footer', title: 'Footer Navigation' },
    { name: 'social', title: 'Social Links' },
  ],
  fields: [
    // ==================== HEADER NAVIGATION ====================
    defineField({
      name: 'headerNav',
      title: 'Header Navigation',
      type: 'array',
      group: 'header',
      of: [
        {
          type: 'object',
          name: 'navItem',
          title: 'Navigation Item',
          fields: [
            {
              name: 'label',
              title: 'Label',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'href',
              title: 'Link',
              type: 'string',
              description: 'Leave empty if this is a dropdown parent',
            },
            {
              name: 'children',
              title: 'Dropdown Items',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    { name: 'label', title: 'Label', type: 'string', validation: (Rule) => Rule.required() },
                    { name: 'href', title: 'Link', type: 'string', validation: (Rule) => Rule.required() },
                  ],
                  preview: {
                    select: { title: 'label', subtitle: 'href' },
                  },
                },
              ],
            },
          ],
          preview: {
            select: { title: 'label', subtitle: 'href' },
          },
        },
      ],
    }),

    // ==================== FOOTER NAVIGATION ====================
    defineField({
      name: 'footerColumns',
      title: 'Footer Columns',
      type: 'array',
      group: 'footer',
      of: [
        {
          type: 'object',
          name: 'footerColumn',
          title: 'Footer Column',
          fields: [
            {
              name: 'title',
              title: 'Column Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'links',
              title: 'Links',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    { name: 'label', title: 'Label', type: 'string', validation: (Rule) => Rule.required() },
                    { name: 'href', title: 'Link', type: 'string', validation: (Rule) => Rule.required() },
                    { name: 'isExternal', title: 'External Link?', type: 'boolean', initialValue: false },
                  ],
                  preview: {
                    select: { title: 'label', subtitle: 'href' },
                  },
                },
              ],
            },
          ],
          preview: {
            select: { title: 'title' },
          },
        },
      ],
      validation: (Rule) => Rule.max(4),
    }),

    defineField({
      name: 'legalLinks',
      title: 'Legal Links (Footer Bottom)',
      type: 'array',
      group: 'footer',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', title: 'Label', type: 'string', validation: (Rule) => Rule.required() },
            { name: 'href', title: 'Link', type: 'string', validation: (Rule) => Rule.required() },
          ],
          preview: {
            select: { title: 'label' },
          },
        },
      ],
    }),

    // ==================== SOCIAL LINKS ====================
    defineField({
      name: 'socialLinks',
      title: 'Social Media Links',
      type: 'array',
      group: 'social',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'platform',
              title: 'Platform',
              type: 'string',
              options: {
                list: [
                  { title: 'Twitter/X', value: 'twitter' },
                  { title: 'Instagram', value: 'instagram' },
                  { title: 'Facebook', value: 'facebook' },
                  { title: 'LinkedIn', value: 'linkedin' },
                  { title: 'YouTube', value: 'youtube' },
                  { title: 'Substack', value: 'substack' },
                ],
              },
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'url',
              title: 'URL',
              type: 'url',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'label',
              title: 'Aria Label',
              type: 'string',
              description: 'Accessibility label, e.g., "Follow us on Twitter"',
            },
          ],
          preview: {
            select: { title: 'platform', subtitle: 'url' },
          },
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Navigation' }
    },
  },
})
