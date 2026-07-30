import { defineType, defineField } from 'sanity'

export const ourWorkPageSettings = defineType({
  name: 'ourWorkPageSettings',
  title: 'Our Work Page Settings',
  type: 'document',
  groups: [
    { name: 'hero', title: 'Hero Section' },
    { name: 'caseForRepair', title: 'The Case for Repair' },
    { name: 'stats', title: 'Statistics' },
    { name: 'howRepairHappens', title: 'How Repair Happens' },
    { name: 'theoryOfChange', title: 'Theory of Change' },
    { name: 'litigation', title: 'Impact Litigation' },
    { name: 'narrative', title: 'Narrative Hub' },
    { name: 'mobilization', title: 'Mobilization' },
  ],
  fields: [
    // ==================== HERO SECTION ====================
    defineField({
      name: 'heroSubtitle',
      title: 'Hero Subtitle',
      type: 'string',
      group: 'hero',
      initialValue: 'Our Work',
    }),
    defineField({
      name: 'heroTitle',
      title: 'Hero Title',
      type: 'string',
      group: 'hero',
      initialValue: 'The Case for Repair',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Background Image',
      type: 'image',
      options: { hotspot: true },
      group: 'hero',
    }),
    defineField({
      name: 'heroImageAlt',
      title: 'Hero Image Alt Text',
      type: 'string',
      group: 'hero',
      initialValue: 'Navy sailors in formation representing the service and sacrifice of Black veterans',
    }),
    defineField({
      name: 'mainVideoUrl',
      title: 'Main Video URL',
      type: 'url',
      group: 'hero',
      description: 'YouTube embed URL for the main video at top of page',
    }),

    // ==================== CASE FOR REPAIR ====================
    defineField({
      name: 'caseForRepairIntro',
      title: 'Case for Repair - Intro Paragraphs',
      type: 'array',
      of: [{ type: 'text', rows: 4 }],
      group: 'caseForRepair',
      description: 'Opening paragraphs about the case for repair',
    }),

    // ==================== STATISTICS ====================
    defineField({
      name: 'statistics',
      title: 'Key Statistics',
      type: 'array',
      group: 'stats',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'number', title: 'Number/Value', type: 'string', description: 'e.g., "$100B", "32X", "33%"', validation: (Rule) => Rule.required() },
            { name: 'label', title: 'Label', type: 'string', description: 'e.g., "DENIED", "WEALTH GAP"', validation: (Rule) => Rule.required() },
            { name: 'description', title: 'Description', type: 'text', rows: 3, validation: (Rule) => Rule.required() },
          ],
          preview: {
            select: { title: 'number', subtitle: 'label' },
          },
        },
      ],
      validation: (Rule) => Rule.max(3),
    }),
    defineField({
      name: 'caseForRepairContinued',
      title: 'Case for Repair - Continued Paragraphs',
      type: 'array',
      of: [{ type: 'text', rows: 4 }],
      group: 'caseForRepair',
      description: 'Paragraphs after the statistics section',
    }),

    // ==================== HOW REPAIR HAPPENS ====================
    defineField({
      name: 'howRepairHappensTitle',
      title: 'How Repair Happens - Title',
      type: 'string',
      group: 'howRepairHappens',
      initialValue: 'How Repair Happens',
    }),
    defineField({
      name: 'howRepairHappensIntro',
      title: 'How Repair Happens - Intro',
      type: 'text',
      rows: 3,
      group: 'howRepairHappens',
    }),
    defineField({
      name: 'repairBulletPoints',
      title: 'Repair Bullet Points',
      type: 'array',
      of: [{ type: 'text', rows: 2 }],
      group: 'howRepairHappens',
    }),

    // ==================== THEORY OF CHANGE ====================
    defineField({
      name: 'theoryOfChangeTitle',
      title: 'Theory of Change - Title',
      type: 'string',
      group: 'theoryOfChange',
      initialValue: 'Our Theory of Change',
    }),
    defineField({
      name: 'theoryOfChangeIntro',
      title: 'Theory of Change - Intro',
      type: 'text',
      rows: 3,
      group: 'theoryOfChange',
    }),

    // ==================== IMPACT LITIGATION ====================
    defineField({
      name: 'litigationTitle',
      title: 'Impact Litigation - Title',
      type: 'string',
      group: 'litigation',
      initialValue: 'Impact Litigation',
    }),
    defineField({
      name: 'litigationVideoUrl',
      title: 'Litigation Section Video URL',
      type: 'url',
      group: 'litigation',
      description: 'YouTube embed URL for litigation section',
    }),
    defineField({
      name: 'litigationParagraphs',
      title: 'Impact Litigation - Paragraphs',
      type: 'array',
      of: [{ type: 'text', rows: 4 }],
      group: 'litigation',
    }),
    defineField({
      name: 'litigationCTA',
      title: 'Litigation CTA',
      type: 'object',
      group: 'litigation',
      fields: [
        { name: 'title', title: 'CTA Title', type: 'string' },
        { name: 'buttonText', title: 'Button Text', type: 'string' },
        { name: 'href', title: 'Button Link', type: 'string' },
      ],
    }),

    // ==================== NARRATIVE HUB ====================
    defineField({
      name: 'narrativeTitle',
      title: 'Narrative Hub - Title',
      type: 'string',
      group: 'narrative',
      initialValue: 'Narrative Hub',
    }),
    defineField({
      name: 'narrativeParagraphs',
      title: 'Narrative Hub - Paragraphs',
      type: 'array',
      of: [{ type: 'text', rows: 4 }],
      group: 'narrative',
    }),
    defineField({
      name: 'narrativeCTA',
      title: 'Narrative CTA',
      type: 'object',
      group: 'narrative',
      fields: [
        { name: 'title', title: 'CTA Title', type: 'string' },
        { name: 'buttonText', title: 'Button Text', type: 'string' },
        { name: 'href', title: 'Button Link', type: 'string' },
        { name: 'isExternal', title: 'External Link?', type: 'boolean' },
      ],
    }),

    // ==================== MOBILIZATION ====================
    defineField({
      name: 'mobilizationTitle',
      title: 'Mobilization - Title',
      type: 'string',
      group: 'mobilization',
      initialValue: 'Mobilization',
    }),
    defineField({
      name: 'mobilizationParagraphs',
      title: 'Mobilization - Paragraphs',
      type: 'array',
      of: [{ type: 'text', rows: 4 }],
      group: 'mobilization',
    }),
    defineField({
      name: 'mobilizationCTA',
      title: 'Mobilization CTA',
      type: 'object',
      group: 'mobilization',
      fields: [
        { name: 'title', title: 'CTA Title', type: 'string' },
        { name: 'buttonText', title: 'Button Text', type: 'string' },
        { name: 'href', title: 'Button Link', type: 'string' },
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Our Work Page Settings' }
    },
  },
})
