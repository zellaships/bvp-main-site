/**
 * Seed script to populate Sanity with existing site content
 * Run with: npx tsx scripts/seed-sanity.ts
 */

import { createClient } from '@sanity/client'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN, // Need write token
  useCdn: false,
})

// ============================================
// TEAM MEMBERS DATA
// ============================================
const teamMembers = [
  {
    _type: 'teamMember',
    name: 'Richard Brookshire',
    role: 'Co-CEO + Co-Founder',
    category: 'founder',
    bio: `Richard Brookshire is a multi-hyphenate storyteller and reparationist working at the intersection of politics and culture. A nationally recognized political communications strategist, writer, director, and filmmaker, he's held previous leadership roles in communications strategy at Iraq & Afghanistan Veterans of America, the Human Rights Campaign, and The New School.

He is a former U.S. Army Combat Medic and a veteran of the War in Afghanistan. He is an alumnus of Fordham University, Columbia University School of International & Public Affairs, and New York Film Academy's Documentary Filmmaking School.`,
    initials: 'RB',
    linkedin: 'https://www.linkedin.com/in/richardbrookshire/',
    order: 1,
  },
  {
    _type: 'teamMember',
    name: 'Kyle Bibby',
    role: 'Co-CEO + Co-Founder',
    category: 'founder',
    bio: `Kyle Bibby is one of the co-founders of the Black Veterans Project. He also serves as the Chief of Campaigns at Color of Change, and as a Political Partner with the Truman National Security Project.

As a former Marine Corps infantry captain and Afghanistan War veteran, Kyle is a proven leader dedicated to equal rights, social justice, and ending wars. He served as a Presidential Management Fellow at the Office of Management and Budget during the Obama Administration.

Kyle holds a Master in Public Administration from Columbia University's School of International and Public Affairs, and a Bachelor of Science in Political Science from the United States Naval Academy.`,
    initials: 'KB',
    linkedin: 'https://www.linkedin.com/in/kylebibby/',
    order: 2,
  },
  {
    _type: 'teamMember',
    name: 'Zella Vanié',
    role: 'Co-Founder + Board Chair',
    category: 'founder',
    bio: `Zella Vanié is a multidisciplinary artist and designer whose work is at the intersection of strategy and design. Zella has spent their career helping organizations build inclusive products, craft stories, and push creative ideas to their highest potential.

Most recently they worked as a Staff Product Designer at the Chan Zuckerberg Initiative. Zella is a veteran of the U.S. Army and earned an MFA in Interaction Design from the School of Visual Arts.`,
    initials: 'ZV',
    linkedin: 'https://www.linkedin.com/in/zellavanie/',
    order: 3,
  },
  {
    _type: 'teamMember',
    name: 'Daniele Anderson',
    role: 'Co-Founder & Board Member',
    category: 'founder',
    bio: `Daniele is a nationally recognized strategist, historian, and researcher focused on strengthening healthcare access, data-informed advocacy, and institutional accountability. She is deeply committed to building more humane, effective, and equitable systems, particularly for veterans and historically underserved communities.

She has held senior leadership roles in research, policy, and strategy at Color of Change and Black Economic Alliance Foundation, where she helped translate data and community insight into institutional reform and public impact.

A former Surface Warfare Officer, Daniele served five years in the U.S. Navy. She is a graduate of the United States Naval Academy and holds a Master of Arts from Columbia University.`,
    initials: 'DA',
    linkedin: 'https://www.linkedin.com/in/daniele-anderson/',
    order: 4,
  },
  {
    _type: 'teamMember',
    name: 'Yolanda Hoskey',
    role: 'Creative Producer',
    category: 'team',
    bio: `Yolanda Hoskey is a Brooklyn-born multidisciplinary artist, storyteller, narrative strategist, and creative producer whose work speaks to the Black experience in America. Across photography, film, and creative production, her practice focuses on shaping and expanding narratives around Black life, identity, and cultural memory, centering stories that are often overlooked, flattened, or misrepresented.

Over the past decade, Yolanda has built a career across the creative arts, working at the intersection of storytelling, cultural production, and visual practice. Her work spans editorial and commercial projects as well as independent artistic practice, moving fluidly between these spaces while bringing culturally grounded, intentional storytelling into every environment she engages.

She is a Magnum Foundation Fellow (2024), a BRICLab Artist-in-Residence, and the 2025 recipient of the International Photographic Council Rising Star Award, presented at the United Nations.`,
    initials: 'YH',
    linkedin: null,
    order: 5,
  },
  {
    _type: 'teamMember',
    name: 'Brianna Fernandez',
    role: 'Administrative Manager',
    category: 'team',
    bio: `Brianna Fernandez is a NYC born artist and administrative worker deeply committed to building efficient, equitable systems that empower mission-driven work and amplify historically marginalized voices. For the past seven years, she has worked across the arts ecosystem as a curator, arts dealer, and liaison in both the primary and secondary markets, developing a strong foundation in operations, communications, and cross-sector collaboration.

As the niece of a U.S. Army veteran, Brianna brings a personal understanding of sacrifice, service, and generational impact to her role at Black Veterans Project. This connection fuels her commitment to advancing justice for Black veterans and their families. Through her work, she strives to help build an organization where operational excellence strengthens advocacy, research, and storytelling in pursuit of meaningful structural change.`,
    initials: 'BF',
    linkedin: null,
    order: 6,
  },
  {
    _type: 'teamMember',
    name: 'MaCherie Dunbar',
    role: 'Board Member',
    category: 'board',
    bio: `MaCherie Dunbar brings policy and legislative expertise to advance BVP's organizational objectives. A retired Air Force veteran, she served as a combat engineer with two tours to Iraq during Operation Iraqi Freedom.

She was featured in Google Doodle's military voices initiative, has contributed to VA budget recommendations, and served as keynote speaker for VA's first LGBTQ+ Veteran Town Hall. She is a political appointee on the Washington DC Mayor's Advisory Committee for LGBTQ Affairs.`,
    initials: 'MD',
    linkedin: 'https://www.linkedin.com/in/macheriedunbar/',
    order: 7,
  },
  {
    _type: 'teamMember',
    name: 'Dr. Ravi K. Perry',
    role: 'Board Member',
    category: 'board',
    bio: `Dr. Ravi K. Perry is a Professor of Political Science at Howard University, holding a B.A. from the University of Michigan and M.A. and Ph.D. from Brown University.

An expert on Black politics, minority representation, urban politics, and LGBT candidates of color, he is finishing a book on Black lesbian and gay elected officials in the United States. He is the proud descendant of generations of Armed Forces family members across World War I, World War II, Korean and Vietnam Wars.`,
    initials: 'RP',
    linkedin: 'https://www.linkedin.com/in/ravikperry/',
    order: 8,
  },
]

// ============================================
// PARTNERS DATA
// ============================================
const partners = [
  {
    _type: 'partner',
    name: 'Robert Wood Johnson Foundation',
    website: 'https://www.rwjf.org/',
    category: 'funder',
    order: 1,
  },
  {
    _type: 'partner',
    name: 'Liberation Ventures',
    website: 'https://www.liberationventures.org/',
    category: 'funder',
    order: 2,
  },
  {
    _type: 'partner',
    name: 'National Veterans Council for Legal Redress',
    website: 'https://www.nvclr.org/',
    category: 'partner',
    order: 3,
  },
  {
    _type: 'partner',
    name: 'May & Stanley Smith Charitable Trust',
    website: 'https://smithct.org/',
    category: 'funder',
    order: 4,
  },
  {
    _type: 'partner',
    name: 'Legal Services Corporation',
    website: 'https://www.lsc.gov/',
    category: 'partner',
    order: 5,
  },
  {
    _type: 'partner',
    name: 'Connecticut Veterans Legal Center',
    website: 'https://ctveteranslegal.org/',
    category: 'partner',
    order: 6,
  },
]

// ============================================
// FAQS DATA
// ============================================
const faqs = [
  // About BVP
  {
    _type: 'faq',
    question: 'What is Black Veterans Project (BVP)?',
    answer: 'Black Veterans Project is the first comprehensive reparative justice effort mobilizing Black veterans and military families. We leverage data-driven research, narrative storytelling, and impact litigation to advance repair and equity.',
    category: 'about',
    order: 1,
  },
  {
    _type: 'faq',
    question: 'Is BVP a nonprofit?',
    answer: 'Yes, BVP is a registered 501(c)(3) nonprofit organization.',
    category: 'about',
    order: 2,
  },
  {
    _type: 'faq',
    question: 'Are donations tax-deductible?',
    answer: 'Yes. All donations to Black Veterans Project are tax-deductible to the extent allowed by law.',
    category: 'about',
    order: 3,
  },
  {
    _type: 'faq',
    question: 'How is BVP governed?',
    answer: 'BVP is governed by an independent Board of Directors. You can learn more about our board members on our [About page](/about).',
    category: 'about',
    order: 4,
  },
  {
    _type: 'faq',
    question: "Where can I find BVP's financial information?",
    answer: 'Our 990s are available on our [Financials page](/financials). We believe in full transparency and make all required nonprofit disclosures publicly accessible.',
    category: 'about',
    order: 5,
  },
  // Get Involved
  {
    _type: 'faq',
    question: 'How do I become a BVP member?',
    answer: 'Visit the [Join Us](/join) section of our site to sign up as an Affiliate or Advocate. All members receive updates on our work, invitations to events, and opportunities to participate in campaigns. Advocates gain access to training, campaign resources, and opportunities to represent BVP.',
    category: 'involvement',
    order: 6,
  },
  {
    _type: 'faq',
    question: 'Do I have to identify as Black or be a military veteran to become a member of BVP?',
    answer: 'No. Membership is free and open to all supporters of our mission.',
    category: 'involvement',
    order: 7,
  },
  {
    _type: 'faq',
    question: 'What are the benefits of BVP membership?',
    answer: 'Members receive regular updates on our litigation, narrative projects, and advocacy efforts. Advocates gain access to training, campaign resources, and opportunities to represent BVP.',
    category: 'involvement',
    order: 8,
  },
  {
    _type: 'faq',
    question: 'How can I volunteer with BVP?',
    answer: 'We welcome volunteers for a variety of roles, including event support, community outreach, research assistance, and storytelling projects. Sign up as an Advocate member to be notified of volunteer opportunities, or contact us directly with your interests and skills.',
    category: 'involvement',
    order: 9,
  },
  {
    _type: 'faq',
    question: 'Can my organization partner with BVP?',
    answer: 'We welcome inquiries about partnerships. If interested, please contact us at info@blackveteransproject.org',
    category: 'involvement',
    order: 10,
  },
]

// ============================================
// PRESS DATA
// ============================================
const pressItems = [
  {
    _type: 'press',
    title: 'Black veterans sound the alarm over military DEI purge',
    date: '2025-04-05',
    source: 'The Hill',
    author: 'Featuring Kyle Bibby & Gov. Wes Moore',
    type: 'news',
    topics: ['dei'],
    url: 'https://thehill.com/policy/defense/5233381-black-veterans-pentagon-dei-purge/',
    featured: true,
  },
  {
    _type: 'press',
    title: "'Appalled': Pentagon restores web pages on Navajo code talkers, Jackie Robinson",
    date: '2025-03-21',
    source: 'USA Today',
    author: 'Featuring Kyle Bibby',
    type: 'news',
    topics: ['dei'],
    url: 'https://www.usatoday.com/story/news/politics/2025/03/21/pentagon-restores-navajo-code-talkers-jackie-robinson/82567891007/',
    featured: false,
  },
  {
    _type: 'press',
    title: 'Co-founder of Black Veterans Project slams Trump administration for DEI purge',
    date: '2025-03-20',
    source: 'CNN',
    author: 'Featuring Richard Brookshire · By Pamela Brown',
    type: 'broadcast',
    topics: ['dei'],
    url: 'https://www.cnn.com/2025/03/20/tv/video/sitroom-pamela-brown-veterans-dei-purge-trump',
    featured: true,
  },
  {
    _type: 'press',
    title: 'New report proves disparities in PTSD care for Black veterans',
    date: '2023-03-20',
    source: 'NBC News',
    author: 'By Lucy Bustamante',
    type: 'broadcast',
    topics: ['benefits'],
    url: 'https://www.nbcnews.com/meet-the-press/video/new-report-proves-disparities-in-ptsd-care-for-black-veterans-165816389964',
    featured: false,
  },
  {
    _type: 'press',
    title: "It's Back: Two Congressmen Want Americans to Thank Troops for Their Freedom",
    date: '2023-01-18',
    source: 'Military.com',
    author: 'Featuring Kyle Bibby',
    type: 'news',
    topics: ['policy'],
    url: 'https://www.military.com/daily-news/2023/01/18/its-back-two-congressmen-want-americans-thank-troops-their-freedom.html',
    featured: false,
  },
  {
    _type: 'press',
    title: 'VA denied benefits for Black veterans at higher rate for decades, lawsuit says',
    date: '2022-12-03',
    source: 'PBS',
    author: 'Featuring Richard Brookshire & Conley Monk · By Geoff Bennett',
    type: 'broadcast',
    topics: ['monk-case'],
    url: 'https://www.pbs.org/newshour/show/va-denied-benefits-for-black-veterans-at-higher-rate-for-decades-lawsuit-says',
    featured: true,
  },
  {
    _type: 'press',
    title: 'Black Vets Were Excluded From G.I. Bill Benefits. Congress Could Fix That',
    date: '2022-10-26',
    source: 'NPR',
    author: 'Featuring Richard Brookshire · By Quil Lawrence',
    type: 'broadcast',
    topics: ['gi-bill'],
    url: 'https://www.npr.org/2022/10/26/1131677540/black-vets-were-excluded-from-g-i-bill-benefits-congress-could-fix-that',
    featured: false,
  },
  {
    _type: 'press',
    title: "Division's blue-gray patch might get the ax",
    date: '2022-06-01',
    source: 'Washington Post',
    author: 'Featuring Richard Brookshire',
    type: 'news',
    topics: ['policy'],
    url: 'https://www.washingtonpost.com/local/divisions-blue-gray-patch-might-get-the-ax/2022/06/01/54f93c8a-e15c-11ec-9611-6f35e4fddfc3_story.html',
    featured: false,
  },
  {
    _type: 'press',
    title: "'We just feel it': Racism plagues US military academies",
    date: '2021-12-03',
    source: 'Associated Press',
    author: 'Featuring Kyle Bibby · By Lolita C. Baldor',
    type: 'news',
    topics: ['policy'],
    url: 'https://apnews.com/article/racism-us-military-academies-4fd04a344d6e8a5cfc7b8b2c76e28383',
    featured: false,
  },
  {
    _type: 'press',
    title: 'Veterans Struggle With Issues That Are Often Invisible to Others',
    date: '2021-09-10',
    source: 'New York Times',
    author: 'Featuring Richard Brookshire · By Jennifer Steinhauer',
    type: 'news',
    topics: ['benefits'],
    url: 'https://www.nytimes.com/2021/09/10/us/politics/911-veterans-mental-health.html',
    featured: false,
  },
]

// ============================================
// SITE SETTINGS
// ============================================
const siteSettings = {
  _type: 'siteSettings',
  _id: 'siteSettings', // Singleton
  siteName: 'Black Veterans Project',
  tagline: 'Reparative Justice for Black Veterans',
  heroHeadline: 'Defend the Legacy. Fight for Equity. Protect Democracy.',
  contactEmail: 'info@blackveteransproject.org',
  footerText: '© Black Veterans Project. All rights reserved.',
  socialLinks: {
    twitter: 'https://twitter.com/blaboratories',
    instagram: 'https://instagram.com/blkveterans',
    linkedin: 'https://www.linkedin.com/company/blackveteransproject',
    facebook: null,
    youtube: null,
  },
}

// ============================================
// SEED FUNCTION
// ============================================
async function seed() {
  console.log('🌱 Starting Sanity seed...\n')

  // Check for write token
  if (!process.env.SANITY_API_TOKEN) {
    console.error('❌ Error: SANITY_API_TOKEN not found in .env.local')
    console.log('\nTo get a write token:')
    console.log('1. Go to https://www.sanity.io/manage')
    console.log('2. Select your project')
    console.log('3. Go to API → Tokens')
    console.log('4. Create a new token with "Editor" permissions')
    console.log('5. Add it to .env.local as SANITY_API_TOKEN=your_token_here\n')
    process.exit(1)
  }

  try {
    // Create Site Settings (singleton)
    console.log('📝 Creating Site Settings...')
    await client.createOrReplace(siteSettings)
    console.log('   ✓ Site Settings created\n')

    // Create Team Members
    console.log('👥 Creating Team Members...')
    for (const member of teamMembers) {
      await client.create(member)
      console.log(`   ✓ ${member.name}`)
    }
    console.log('')

    // Create Partners
    console.log('🤝 Creating Partners...')
    for (const partner of partners) {
      await client.create(partner)
      console.log(`   ✓ ${partner.name}`)
    }
    console.log('')

    // Create FAQs
    console.log('❓ Creating FAQs...')
    for (const faq of faqs) {
      await client.create(faq)
      console.log(`   ✓ ${faq.question.substring(0, 50)}...`)
    }
    console.log('')

    // Create Press Items
    console.log('📰 Creating Press Items...')
    for (const item of pressItems) {
      await client.create(item)
      console.log(`   ✓ ${item.title.substring(0, 50)}...`)
    }
    console.log('')

    console.log('✅ Seed complete! All content has been added to Sanity.\n')
    console.log('Next steps:')
    console.log('1. Go to your Studio to upload images for team members and partners')
    console.log('2. Edit any content as needed')
    console.log('3. Push to deploy the updated site\n')

  } catch (error) {
    console.error('❌ Error seeding data:', error)
    process.exit(1)
  }
}

seed()
