# BVP SPEC 04: PAGE SPECIFICATIONS
## Detailed Page-by-Page Breakdown

---

## SITE MAP

```
/ ........................... Homepage
/who-we-are ................. About (anchors: #founders, #team, #board, #partners)
/our-work ................... Work (anchors: #case-for-repair, #litigation, #narrative, #mobilization)
/join ....................... Story submission
/donate ..................... Donations
/faq ........................ FAQ accordion
/privacy .................... Privacy policy
/terms ...................... Terms of use
```

---

## HOMEPAGE ( / )

### Purpose
First impression. Communicate mission, establish credibility, drive action.

### Sections

**1. Hero (Full viewport)**
- Full-width background image with gradient overlay
- Headline: "We advance reparative justice for Black veterans and military families through litigation, narrative, and mobilization."
- Two CTAs: [Join Us →] primary, [Donate →] outline-white
- Scroll indicator bottom-right

**2. Blog Feed (Gray bg)**
- Section title: "LATEST FROM OUR BLOG"
- 3-column grid of post cards (from Substack RSS)
- Each card: Image, Date, Title, Excerpt
- CTA: [Subscribe to Newsletter →]

**3. Email Signup (Black bg)**
- Two-column: Headline left, form right
- Form: Name, Email (rounded-full, white border), Submit button
- Privacy link below

**4. Footer**

### Data Sources
- Blog posts: Substack RSS (cached 1hr)
- All else: Static

---

## WHO WE ARE ( /who-we-are )

### Purpose
Establish credibility. Introduce team. Build trust.

### Sections

**1. Page Header (Black bg)**
- Eyebrow: "Who We Are"
- Title: "Building the Case for Repair"
- Subtitle: Mission summary

**2. Mission Overview (White bg)**
- Two-column: Text left, image right
- 3 paragraphs about mission and approach

**3. Founders Story (Gray bg)** `#founders`
- Title: "Our Founders' Story"
- Two-column: Narrative (2 cols) + Founder card (1 col)
- Founder card: Photo, name, title, bio

**4. Team Grid (White bg)** `#team`
- Title: "Our Team"
- Leadership: 3-column grid, large cards (photo, name, title, bio)
- Staff: 4-column grid, smaller cards (photo, name, title only)

**5. Board of Directors (Gray bg)** `#board`
- Title: "Board of Directors"
- 2-column grid of horizontal cards (photo, name, title, affiliation, short bio)

**6. Partners (White bg)** `#partners`
- Title: "Our Partners"
- 4-column logo grid

**7. Press & Media (Black bg)**
- Title: "Press & Media"
- Contact CTA + Featured outlets grid

### Data Sources
- Team, Board, Partners: Sanity CMS
- Press: Sanity CMS

---

## OUR WORK ( /our-work )

### Purpose
Deep-dive into BVP's four pillars.

### Layout
Two-column with sticky sidebar navigation.

### Sections

**1. Page Header (Black bg)**
- Title: "Research. Litigation. Narrative. Mobilization."
- Subtitle describing four pillars

**2. Content Area with Sticky Nav**

**Sidebar (sticky, 280px wide):**
- Links to each section
- Scroll spy highlights current section
- Mobile: Horizontal scrolling pills

**Content Sections:**

### The Case for Repair `#case-for-repair`
- Stats grid (3 columns):
  - $100B+ denied
  - 3M Black veterans today
  - 15M Americans from Black military families
- Narrative paragraphs
- Data visualization placeholder
- CTA: [Read the Full Report →]

### Impact Litigation `#litigation`
- Overview paragraphs
- Monk v. United States highlight card:
  - Featured case badge
  - Case description
  - "Survived motion to dismiss" callout
  - CTA to FAQ for more
- Legal partners logo grid (Yale, Harvard, Quinn Emanuel)

### Narrative Building `#narrative`
- Overview paragraphs
- Two output cards:
  - Digital Archive: "Explore Archive →"
  - Research & Reports: "View Reports →"

### Mobilization `#mobilization`
- Overview paragraphs
- CTA card (dark): "Your Story Is Evidence" with [Join the Movement →]

### Data Sources
- Stats: Sanity CMS
- Content: Static (or Sanity for editability)

---

## JOIN US ( /join )

### Purpose
Primary conversion. Collect stories, build member database.

### Layout
Two-column: Content left, form right.

### Sections

**1. Page Header (Black bg)**
- Title: "Your Story Is Evidence"
- Subtitle: "Add your voice to the movement for repair."

**2. Content + Form (White bg)**

**Left Column:**
- Title: "Why Your Story Matters"
- Explanation paragraphs
- Numbered steps:
  1. Share Your Story
  2. Join the Movement
  3. Take Action

**Right Column (Form):**
- Title: "Tell Us Your Story"
- Fields:
  - Name * (text)
  - Email * (email)
  - I am a... * (select: Black veteran, Family member, Descendant, Ally)
  - Your Story (textarea, optional)
  - Consent checkbox
- Submit button: [Submit →]

### Form Submission
- Validate client-side
- POST to /api/join
- Server validates + sends to Action Network API
- Success: Show confirmation message
- Error: Show error, allow retry

### Data Sources
- Form submits to Action Network

---

## DONATE ( /donate )

### Purpose
Drive donations. Communicate impact.

### Layout
Full-width black background, two-column content.

### Sections

**1. Hero/CTA Section (Black bg)**

**Left Column:**
- Eyebrow: "Donate"
- Title: "Support the Work"
- Description paragraph
- Two CTAs: [Donate Now →] primary, [Learn About Giving →] outline-white

**Right Column:**
- Impact card (white border):
  - Title: "Impact of Your Gift"
  - Tiers:
    - $50 → Story collection outreach
    - $150 → One FOIA request
    - $500 → Oral history interview
    - $1,000+ → Litigation research

### Donation Action
- "Donate Now" opens Donately hosted page in new tab
- OR embed Donately widget (TBD)

### Data Sources
- Impact tiers: Can be Sanity or static

---

## FAQ ( /faq )

### Purpose
Answer questions. Reduce support. SEO value.

### Sections

**1. Page Header (Gray bg)**
- Title: "Frequently Asked Questions"
- Subtitle: "Get answers about BVP, the Monk case, and how to get involved."

**2. Accordion (Gray bg)**
- FAQ items expand/collapse
- Single-open behavior (one closes when another opens)
- Plus icon rotates to X when open

**Initial FAQs:**
1. What is Black Veterans Project?
2. What is Monk v. United States?
3. Am I eligible to be part of the Monk case?
4. How did the GI Bill discriminate against Black veterans?
5. How can I share my story with BVP?
6. Does BVP provide direct legal services?

- CTA: [View All FAQs →] (if more exist)

### Data Sources
- FAQ items: Sanity CMS

---

## GLOBAL COMPONENTS

### Header (All pages)
- Fixed position
- Black background with slight transparency
- Logo left, nav center-right, Donate button right
- Mobile: Hamburger → slide-out menu

### Footer (All pages)
- Dark gray (gray-900) background
- 4-column layout:
  - Brand + mission (2 cols)
  - Quick links
  - Contact + social
- Bottom bar: Copyright, legal links, 501(c)(3) notice

---

*Next: [SPEC-05-integrations.md](./SPEC-05-integrations.md)*
