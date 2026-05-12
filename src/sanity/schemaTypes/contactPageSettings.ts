import { defineType, defineField } from 'sanity'

export const contactPageSettings = defineType({
  name: 'contactPageSettings',
  title: 'Contact Page Settings',
  type: 'document',
  fields: [
    // Hero Section
    defineField({
      name: 'heroSubtitle',
      title: 'Hero Subtitle',
      type: 'string',
      initialValue: 'Get in touch',
    }),
    defineField({
      name: 'heroTitle',
      title: 'Hero Title',
      type: 'string',
      initialValue: 'Contact Us',
    }),
    defineField({
      name: 'heroDescription',
      title: 'Hero Description',
      type: 'string',
      initialValue: 'For press inquiries, partnerships, speaking requests, or general questions.',
    }),
    // Contact Info
    defineField({
      name: 'contactEmail',
      title: 'Contact Email',
      type: 'string',
      initialValue: 'info@blackveteransproject.org',
    }),
    defineField({
      name: 'contactPanelHeadline',
      title: 'Contact Panel Headline',
      type: 'string',
      initialValue: 'For press, partnerships, and general inquiries:',
    }),
    // Social Links
    defineField({
      name: 'socialLinks',
      title: 'Social Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'platform', title: 'Platform Name', type: 'string' },
            { name: 'handle', title: 'Handle / Display Text', type: 'string' },
            { name: 'url', title: 'URL', type: 'url' },
          ],
          preview: {
            select: { title: 'platform', subtitle: 'handle' },
          },
        },
      ],
      initialValue: [
        { platform: 'Instagram', handle: '@blackvetsproject', url: 'https://instagram.com/blackvetsproject' },
        { platform: 'Twitter / X', handle: '@blackvetsproject', url: 'https://twitter.com/blackvetsproject' },
        { platform: 'LinkedIn', handle: 'Black Veterans Project', url: 'https://linkedin.com/company/blackveteransproject' },
      ],
    }),
    // Form Settings
    defineField({
      name: 'formTitle',
      title: 'Form Section Title',
      type: 'string',
      initialValue: 'Send a Message',
    }),
    defineField({
      name: 'topicOptions',
      title: 'Topic Dropdown Options',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'value', title: 'Value (internal)', type: 'string' },
            { name: 'label', title: 'Label (displayed)', type: 'string' },
          ],
          preview: {
            select: { title: 'label' },
          },
        },
      ],
      initialValue: [
        { value: 'press', label: 'Press Inquiry' },
        { value: 'partnership', label: 'Partnership Opportunity' },
        { value: 'speaking', label: 'Speaking Request' },
        { value: 'general', label: 'General Question' },
        { value: 'other', label: 'Other' },
      ],
    }),
    // Success Message
    defineField({
      name: 'successTitle',
      title: 'Success Message Title',
      type: 'string',
      initialValue: 'Thank You',
    }),
    defineField({
      name: 'successMessage',
      title: 'Success Message',
      type: 'text',
      rows: 3,
      initialValue: "We've received your message and will get back to you as soon as possible. For urgent matters, please email us directly.",
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Contact Page Settings' }
    },
  },
})
