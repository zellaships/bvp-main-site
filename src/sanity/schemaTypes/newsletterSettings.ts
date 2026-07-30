import { defineType, defineField } from 'sanity'

export const newsletterSettings = defineType({
  name: 'newsletterSettings',
  title: 'Newsletter Settings',
  type: 'document',
  description: 'Content for newsletter signup sections across the site',
  groups: [
    { name: 'strip', title: 'Newsletter Strip (Homepage)' },
    { name: 'section', title: 'Newsletter Section (Full)' },
    { name: 'form', title: 'Form Labels & Messages' },
  ],
  fields: [
    // ==================== NEWSLETTER STRIP ====================
    defineField({
      name: 'stripHeadline',
      title: 'Strip Headline',
      type: 'string',
      group: 'strip',
      initialValue: 'Stay connected to the movement.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'stripSubheadline',
      title: 'Strip Subheadline',
      type: 'string',
      group: 'strip',
      initialValue: 'Updates on the case, the archive, and the organizing.',
    }),

    // ==================== FULL NEWSLETTER SECTION ====================
    defineField({
      name: 'sectionTitle',
      title: 'Section Title',
      type: 'string',
      group: 'section',
      initialValue: 'Join the Fight for Repair',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'sectionDescription',
      title: 'Section Description',
      type: 'text',
      rows: 2,
      group: 'section',
      initialValue: 'Get updates on our work, stories from the community, and ways to take action.',
    }),

    // ==================== FORM LABELS ====================
    defineField({
      name: 'nameLabel',
      title: 'Name Field Label',
      type: 'string',
      group: 'form',
      initialValue: 'Your name (required)',
    }),
    defineField({
      name: 'emailLabel',
      title: 'Email Field Label',
      type: 'string',
      group: 'form',
      initialValue: 'Your email address (required)',
    }),
    defineField({
      name: 'emailPlaceholder',
      title: 'Email Placeholder',
      type: 'string',
      group: 'form',
      initialValue: 'you@email.com',
    }),
    defineField({
      name: 'substackCheckboxLabel',
      title: 'Substack Checkbox Label',
      type: 'string',
      group: 'form',
      initialValue: 'Add me to Substack',
    }),
    defineField({
      name: 'substackCheckboxHint',
      title: 'Substack Checkbox Hint',
      type: 'string',
      group: 'form',
      initialValue: 'Optional. Also receive updates via our Substack newsletter.',
    }),
    defineField({
      name: 'legalNotice',
      title: 'Legal Notice',
      type: 'text',
      rows: 2,
      group: 'form',
      initialValue: 'By signing up, you agree to receive email updates from Black Veterans Project. You can unsubscribe at any time.',
    }),

    // ==================== BUTTON STATES ====================
    defineField({
      name: 'buttonDefault',
      title: 'Button Text (Default)',
      type: 'string',
      group: 'form',
      initialValue: 'Sign Up',
    }),
    defineField({
      name: 'buttonLoading',
      title: 'Button Text (Loading)',
      type: 'string',
      group: 'form',
      initialValue: 'Joining...',
    }),
    defineField({
      name: 'buttonSuccess',
      title: 'Button Text (Success)',
      type: 'string',
      group: 'form',
      initialValue: "You're In!",
    }),

    // ==================== ERROR MESSAGES ====================
    defineField({
      name: 'errorNameRequired',
      title: 'Error: Name Required',
      type: 'string',
      group: 'form',
      initialValue: 'Please enter your name',
    }),
    defineField({
      name: 'errorEmailInvalid',
      title: 'Error: Invalid Email',
      type: 'string',
      group: 'form',
      initialValue: 'Please enter a valid email address',
    }),
    defineField({
      name: 'errorGeneric',
      title: 'Error: Generic',
      type: 'string',
      group: 'form',
      initialValue: 'Something went wrong. Please try again.',
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Newsletter Settings' }
    },
  },
})
