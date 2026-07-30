import { defineType, defineField } from 'sanity'

export const joinPageSettings = defineType({
  name: 'joinPageSettings',
  title: 'Join Page Settings',
  type: 'document',
  groups: [
    { name: 'hero', title: 'Hero Section' },
    { name: 'memberTypes', title: 'Member Types' },
    { name: 'success', title: 'Success Messages' },
  ],
  fields: [
    // Hero Section
    defineField({
      name: 'heroSubtitle',
      title: 'Hero Subtitle',
      type: 'string',
      group: 'hero',
      initialValue: 'Join Our Movement',
    }),
    defineField({
      name: 'heroTitle',
      title: 'Hero Title',
      type: 'string',
      group: 'hero',
      initialValue: 'Build With Us',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroDescription',
      title: 'Hero Description',
      type: 'text',
      rows: 2,
      group: 'hero',
      initialValue: 'Whether you\'re a Black veteran, military family member, descendant, or ally — your voice is needed in this fight.',
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Background Image',
      type: 'image',
      options: { hotspot: true },
      group: 'hero',
    }),

    // Member Type Cards
    defineField({
      name: 'veteranCard',
      title: 'Veteran Card',
      type: 'object',
      group: 'memberTypes',
      fields: [
        { name: 'title', title: 'Title', type: 'string', initialValue: 'I\'m a Black Veteran' },
        { name: 'description', title: 'Description', type: 'text', rows: 3 },
        { name: 'buttonText', title: 'Button Text', type: 'string', initialValue: 'Share Your Story' },
      ],
    }),
    defineField({
      name: 'advocateCard',
      title: 'Advocate Card',
      type: 'object',
      group: 'memberTypes',
      fields: [
        { name: 'title', title: 'Title', type: 'string', initialValue: 'I\'m a Supporter' },
        { name: 'description', title: 'Description', type: 'text', rows: 3 },
        { name: 'buttonText', title: 'Button Text', type: 'string', initialValue: 'Join as Advocate' },
      ],
    }),

    // Form Labels (customizable)
    defineField({
      name: 'memberTypeOptions',
      title: 'Member Type Options',
      type: 'array',
      group: 'memberTypes',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'value', title: 'Value', type: 'string' },
            { name: 'label', title: 'Label', type: 'string' },
          ],
          preview: {
            select: { title: 'label' },
          },
        },
      ],
      initialValue: [
        { value: 'veteran', label: 'Black Veteran' },
        { value: 'family', label: 'Military Family Member' },
        { value: 'descendant', label: 'Black Veteran Descendant' },
        { value: 'ally', label: 'Ally / Supporter' },
      ],
    }),

    // Success Messages
    defineField({
      name: 'veteranSuccessTitle',
      title: 'Veteran Success Title',
      type: 'string',
      group: 'success',
      initialValue: 'Thank You for Your Service',
    }),
    defineField({
      name: 'veteranSuccessMessage',
      title: 'Veteran Success Message',
      type: 'text',
      rows: 3,
      group: 'success',
      initialValue: 'Your story matters. We\'ll be in touch soon to learn more about your experience.',
    }),
    defineField({
      name: 'advocateSuccessTitle',
      title: 'Advocate Success Title',
      type: 'string',
      group: 'success',
      initialValue: 'Welcome to the Movement',
    }),
    defineField({
      name: 'advocateSuccessMessage',
      title: 'Advocate Success Message',
      type: 'text',
      rows: 3,
      group: 'success',
      initialValue: 'Thank you for joining us. Together, we\'re building a more equitable future for Black veterans.',
    }),

    // Privacy/Consent Text
    defineField({
      name: 'privacyText',
      title: 'Privacy/Consent Text',
      type: 'text',
      rows: 3,
      initialValue: 'By submitting, you agree to our Privacy Policy and consent to receive email communications from Black Veterans Project.',
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Join Page Settings' }
    },
  },
})
