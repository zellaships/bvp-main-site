import { defineType, defineField } from 'sanity'

export const donatePageSettings = defineType({
  name: 'donatePageSettings',
  title: 'Donate Page Settings',
  type: 'document',
  fields: [
    // Hero Section
    defineField({
      name: 'heroSubtitle',
      title: 'Hero Subtitle',
      type: 'string',
      description: 'Small text above the hero title (e.g., "Support Our Mission")',
      initialValue: 'Support Our Mission',
    }),
    defineField({
      name: 'heroTitle',
      title: 'Hero Title',
      type: 'string',
      description: 'Main hero headline',
      initialValue: 'Help Us Secure the Legacy for Black Veterans',
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Background Image',
      type: 'image',
      options: { hotspot: true },
      description: 'Optional hero background image',
    }),
    // Main Content
    defineField({
      name: 'mainParagraphs',
      title: 'Main Content Paragraphs',
      type: 'array',
      of: [{ type: 'text', rows: 4 }],
      description: 'The main copy explaining why donations matter',
      initialValue: [
        "Your donation helps Black Veterans Project's mission to advocate for racial inclusion and justice across the United States military while ensuring the welfare of all Black veterans who've served.",
        "By supporting us, you're helping to drive forward vital work that raises public awareness, addresses systemic inequities, and brings us closer to a future where all who have served are empowered with the resources and opportunities they've long been denied.",
        "Every contribution, no matter the size, strengthens our ability to make lasting change and ensure Black veterans' voices are heard.",
      ],
    }),
    // Tax Notice
    defineField({
      name: 'taxNoticeTitle',
      title: 'Tax Notice Title',
      type: 'string',
      initialValue: 'Tax Deductible:',
    }),
    defineField({
      name: 'taxNoticeText',
      title: 'Tax Notice Text',
      type: 'text',
      rows: 2,
      initialValue: 'Black Veterans Project is a 501(c)(3) nonprofit organization. Your donation is tax-deductible to the extent allowed by law.',
    }),
    // Donation Form
    defineField({
      name: 'donationFormUrl',
      title: 'Donation Form URL',
      type: 'url',
      description: 'Donately iframe embed URL',
      initialValue: 'https://cdn.donately.com/core/6.0/donate-form.html?form_id=frm_17bf7d7efced&account_id=act_1c9da0501869&stripe_key=pk_live_51EciVsFvVHN4GQU4Cyxh9ZfzIYeJQ9VXDHj4LqCHlU4XCB2cDI8vxhDzxXOJwCw5TjK89kwvuDuXEz3XeugfdcSr00nNgvHMYd',
    }),
    // Recurring Donation Info
    defineField({
      name: 'recurringDonationText',
      title: 'Recurring Donation Text',
      type: 'text',
      rows: 3,
      initialValue: 'Monthly donations will be charged on the same date each month until cancelled. To cancel or modify your recurring donation, email info@blackveteransproject.org or manage your subscription through Donately.',
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Donate Page Settings' }
    },
  },
})
