# BVP Website Implementation Plan
## Mission Wired Recommendations — Actionable Spec

**Version:** 2.0
**Source:** Mission Wired Strategy Deck
**Last Updated:** July 2025

---

# BLOCKERS — RESOLVE FIRST

These decisions gate all downstream work.

---

## ⚠️ BLOCKER 1: Action Network Terminology

### The Problem
The deck references the "Affiliate sign-up form" but there's a naming mismatch across systems:

| System | Term Used |
|--------|-----------|
| Live Site (Sanity CMS) | **Affiliate** |
| Codebase Components | `AdvocateSignupForm` |
| Action Network Backend | **❓ Unknown** |
| Mission Wired Deck | Affiliate |

**Why it matters:** The deck says *"use the existing Affiliate sign-up form as a pop-up across the website."* But developers will search the codebase for "Affiliate" and find nothing — the component is called `AdvocateSignupForm`.

### Questions to Answer
```
1. What does Action Network call this segment?
   → This is the source of truth for CRM/segmentation

2. Are there existing Action Network tags we must preserve?
   → Affects how form submissions are routed

3. Canonical term decision:
   → If AN says "Affiliate" — rename code components to match
   → If AN says "Advocate" — update Sanity labels to match
   → Document in style guide either way
```

### Owner: _______________
### Due: _______________

---

## ⚠️ BLOCKER 2: Form Consolidation Strategy

### The Recommendation
**Slide 8:** *"We recommend using the existing 'Affiliate' sign-up form as a pop-up across the website for all membership types to simplify acquisition and reduce barriers to entry."*

### Current State
Two distinct signup paths exist:

**Path 1: Veteran**
- Headline: "As a Veteran member, your experiences with the VA, your service, and your voice are central to building the case for repair."
- CTA: "Register as a Veteran →"
- Form fields: Email, Name, Member Type, Branch of Service, Service Dates, Gender, Race/Ethnicity

**Path 2: Affiliate**
- Headline: "You stand with the movement. Your membership adds to the collective strength BVP represents when we testify before Congress, convene coalitions, or speak to the press."
- CTA: "Become an Affiliate →"
- Form fields: Email, Name, Why joining, How heard about BVP

### Decision Needed

| Option | Description | Trade-off |
|--------|-------------|-----------|
| **A** | Keep two paths | Preserves veteran-specific intake; more complex |
| **B** | Single form for all | Simpler funnel; loses veteran data collection |
| **C** | Single entry → branching | Best UX; more complex to build |

**Deck implies Option B** (universal Affiliate form), but this loses the veteran-specific fields. Is that intentional?

### Owner: _______________
### Due: _______________

---

# PHASE 1: QUICK WINS

No blockers. Execute immediately.

---

## 1.1 Donate Page Headline

### Change
| Current | New |
|---------|-----|
| "Help Us Secure the Legacy for Black Veterans" | "Donate Now to Secure the Legacy of Black Veterans" |

### Location
Sanity Studio → Donate Page Settings → Hero Title

### Execution
Content update only. No code change. **5 minutes.**

---

## 1.2 Donate Page Statistics Block

### Change
Add the three Case for Repair stats to the Donate page:

| Stat | Copy |
|------|------|
| **$100B DENIED** | Disparities in veterans' benefits have cost Black veterans and their families an estimated $100 Billion since WWII. |
| **32X WEALTH GAP** | White veterans hold 32 times more wealth than Black veterans—a gap of $164,000. |
| **33% HOMELESS** | Black veterans account for 1/3 of our nation's homeless veteran population. |

### Source
These stats already exist on `/our-work` page, pulled from `ourWorkPageSettings.statistics[]` in Sanity.

### Execution
1. Add `statistics[]` field to `donatePageSettings` schema (or reference same data)
2. Add `StatisticsSection` component to donate page layout
3. Position between hero and donation form

---

## 1.3 CTA Button Standardization

### Change
All membership CTAs → **"Get Involved"**

### Current Inventory

| Location | Current Text | Change To |
|----------|--------------|-----------|
| Homepage Hero | "Become a member" | "Get Involved" |
| Our Work - Litigation | "Become a member →" | "Get Involved →" |
| Our Work - Mobilization | "Join the movement →" | "Get Involved →" |
| Footer | "Become a Member" | "Get Involved" |

### Files to Update
- `src/app/(main)/page.tsx`
- `src/app/(main)/our-work/page.tsx`
- `src/components/layout/Footer.tsx`
- Sanity CMS (if button labels stored there)

### Exception
Keep "Contribute to our Substack →" unchanged (different action type).

---

# PHASE 2: CONTENT INTEGRATION

Requires Blocker decisions, then execute.

---

## 2.1 Join Page Copy Migration

### The Recommendation
**Slide 7:** *"Folding in and repurposing the copy on the current 'Join Us' page on the 'Our Work' page and for use on the sign-up form to drive conversions."*

### Existing Copy to Migrate

**Veteran Value Prop:**
> "As a Veteran member, your experiences with the VA, your service, and your voice are central to building the case for repair."

**Affiliate Value Prop:**
> "You stand with the movement. Your membership adds to the collective strength BVP represents when we testify before Congress, convene coalitions, or speak to the press. You'll receive updates on the fight: what's happening in the courts, on the Hill, and at the VA."

### Proposed Migration

| Copy Block | Migrate To |
|------------|------------|
| Veteran value prop | Signup form (veteran path) |
| Affiliate value prop | Signup form (affiliate path) OR universal form header |
| Both | New "Join" section on Our Work page |

### Execution
1. Add "Join the Movement" section to `/our-work` after Mobilization
2. Include both value props (or merged version)
3. Embed signup form or prominent CTA
4. Optional: Simplify `/join` to form-only (no landing content)

---

## 2.2 Signup Form Pop-Up

### The Recommendation
**Slide 8:** Use Affiliate form as pop-up across site.

### Gated By
- Blocker 1 (terminology)
- Blocker 2 (form strategy)

### When Ready
1. Create modal/pop-up wrapper for signup form
2. Add trigger points across site (scroll-based, exit intent, or button-click)
3. Ensure form submits to correct Action Network endpoint with proper tagging

---

## 2.3 Homepage Donation CTA

### The Recommendation
**Slide 6:** *"Embed a donation form after the 'Our Work' or 'Our Impact' sections."*

### Proposed Implementation
Add CTA section (not full form embed) for page performance:
- Position: After Pillars section, before Substack
- Headline: "Support the Movement"
- 1-2 sentence impact statement
- "Donate Now" button → /donate

### Execution
1. Create `DonationCTA` component
2. Add to homepage layout
3. Style to create visual break between sections

---

# PHASE 3: NEW COMPONENTS

Design + development required.

---

## 3.1 Homepage "Our Impact" Section

### The Recommendation
**Slide 6:** *"Create an 'Our Impact' section to surface existing impact-focused stats."*

### Proposed Implementation

**Current homepage order:**
1. Hero
2. Newsletter Strip
3. Pillars ("Our Work")
4. Substack Feed
5. Footer

**New order:**
1. Hero
2. Newsletter Strip
3. Pillars ("Our Work")
4. **Our Impact** ← NEW
5. **Donation CTA** ← NEW (from 2.3)
6. Substack Feed
7. Footer

### Stats to Use
Same three as Donate page (unless different stats specified):
- $100B DENIED
- 32X WEALTH GAP
- 33% HOMELESS

### Decision Needed
```
[ ] Same 3 stats as Donate, or different?
[ ] Link stats to /our-work for context?
```

---

## 3.2 Narrative Hub / Dark Green Report Description

### The Recommendation
**Slide 6:** *"Add a description of the Dark Green Report within the Substack section."*

### Current State
Homepage Substack section shows article feed only — no contextual copy.

### Gap
**No description exists.** This is a copywriting task.

### Copy Needed
```
NARRATIVE HUB
[What it is]: 1-2 sentences
[What's included]: Dark Green Report, personal testimonies, etc.
[Why it matters]: Value prop for readers

DARK GREEN REPORT
[What it is]: 1-2 sentences
[Publication cadence]: Monthly? Quarterly?
```

### Execution
1. Write copy (content blocker)
2. Add headline + description to Substack section
3. Keep article feed below

### Owner: _______________

---

## 3.3 Story of the Month

### The Recommendation
**Slide 14:** *"Featuring a 'Story of the Month' is an opportunity to generate curiosity and immediately communicate the impact."*

### Current State
- Substack articles pulled via RSS
- Sanity has `isFeatured` boolean on `substackArticle` type
- No special UI treatment for featured content

### Proposed Implementation
- Featured story card above article feed
- Larger image, prominent headline
- Pull from `*[_type == "substackArticle" && isFeatured == true][0]`

### Operational Requirement
```
[ ] Assign owner for monthly selection
[ ] Define selection criteria
[ ] Set calendar reminder
```

---

# PHASE 4: NEW PAGES

Gated on strategy/programming decisions.

---

## 4.1 Take Action Page

### The Recommendation
**Slide 5 & 9:** Dedicated page for engagement options with focus on acquisition.

### Why Gated
Page requires **active programming** to populate:
- Events to attend
- Petitions to sign
- Volunteer opportunities

Without content, this is an empty shell.

### Pre-Requisites
```
[ ] Define 2-3 initial actions to feature
[ ] Confirm Action Network integration
[ ] Assign content owner
```

### When Ready
```
Route: /take-action

Sections:
1. Hero
2. Featured Action (current campaign)
3. Ways to Get Involved
4. Newsletter signup
```

---

## 4.2 News & Stories Page

### The Recommendation
**Slide 5:** *"Surface news, podcast episodes, and community reporting."*

### Why Gated
Least specified item. Open questions:
- What is "community reporting"?
- Are there podcast episodes? Where hosted?
- Replace `/press` or separate?
- Manual curation or automated feeds?

### Pre-Requisites
```
[ ] Define content types
[ ] Identify sources
[ ] Clarify relationship to /press
```

---

# PHASE 5: STYLE GUIDE

Parallel track. Informs all other work.

---

## 5.1 Lightweight Style Guide

### The Recommendation
**Slide 12:** *"Develop a style guide that outlines typography, imagery, colors, and editorial guidance for brand voice."*

### Deliverables

**Visual Standards (extract from code):**
- Typography: Gunterz (headlines), Inter (body)
- Colors: Black, BVP Gold (#FDC500), Navy
- Button styles, spacing, etc.

**Editorial Standards (net new):**
- Brand voice attributes
- Headline style (sentence case vs. title case)
- CTA language patterns
- Canonical terminology (Affiliate vs. Advocate resolution)
- Inclusive language guidelines

### Format Options
- Markdown in `/docs` (developer-friendly)
- Notion (stakeholder-friendly)
- Figma (designer-friendly)

---

# APPENDIX

## A. Current Site Architecture

```
BVP Website
├── / (Homepage)
│   ├── Hero → "Become a member" CTA
│   ├── Newsletter Strip
│   ├── Pillars ("Our Work")
│   └── Substack Feed
├── /about (Mission, Team, Partners, Timeline)
├── /our-work (Case for Repair, Litigation, Narrative, Mobilization)
├── /join (Two-path signup: Veteran / Affiliate)
├── /donate (Donately embed)
├── /contact
├── /press
├── /faq
├── /financials
└── /studio (Sanity CMS)
```

## B. Key File Locations

| Component | Path |
|-----------|------|
| Homepage | `src/app/(main)/page.tsx` |
| Our Work | `src/app/(main)/our-work/page.tsx` |
| Join Page | `src/app/(main)/join/page.tsx` |
| Join Client | `src/app/(main)/join/JoinPageClient.tsx` |
| Donate | `src/app/(main)/donate/page.tsx` |
| Header | `src/components/layout/Header.tsx` |
| Footer | `src/components/layout/Footer.tsx` |
| Sanity Queries | `src/sanity/lib/queries.ts` |

## C. Decision Log

| Decision | Options | Selected | Date | Owner |
|----------|---------|----------|------|-------|
| Action Network terminology | Affiliate / Advocate / Other | | | |
| Form consolidation | A (two paths) / B (single) / C (branching) | | | |
| Impact stats (homepage) | Same as Donate / Different | | | |

---

*Document: `/docs/WEBSITE-IMPLEMENTATION-PLAN.md`*
