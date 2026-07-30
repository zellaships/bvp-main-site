# Sanity Source of Truth Project
## Phased Implementation Plan

**Goal:** Make Sanity the single, high-fidelity source of truth for all site content. What you see in Sanity = what's on the site. Edit once, updates everywhere.

**Timeline:** ~2-3 weeks (depending on team capacity)

---

# Phase 1: Content Audit
**Duration:** 2-3 days

## Objective
Identify every piece of content currently hardcoded in the codebase that should live in Sanity.

## Deliverables
1. **Content inventory spreadsheet** with columns:
   - File path
   - Content type (headline, body copy, CTA, image, link, etc.)
   - Current value (the actual text/URL)
   - Sanity field exists? (Y/N)
   - Sanity field populated? (Y/N)
   - Shared across pages? (list which pages)

2. **Shared content map** identifying content used in multiple places:
   - Statistics (Our Work, Donate, Homepage)
   - CTAs and button labels
   - Footer content
   - Social links
   - Legal text (privacy, terms references)

## Acceptance Criteria
```
[ ] Every .tsx file in src/app and src/components audited
[ ] Every hardcoded string logged in inventory
[ ] Shared content identified and grouped
[ ] No file skipped or marked "TODO later"
[ ] Inventory reviewed by stakeholder
```

## QA Loop
1. Run `grep -r "\".*\"" src/app src/components` to find string literals
2. Cross-reference against Sanity schemas in `src/sanity/schemaTypes/`
3. Spot-check 5 random pages against inventory for completeness
4. Second pair of eyes reviews inventory before sign-off

## Exit Gate
Inventory signed off → Phase 2 begins

---

# Phase 2: Schema Restructure
**Duration:** 2-3 days

## Objective
Restructure Sanity schemas to support shared content and eliminate duplication.

## Deliverables
1. **New schema: `sharedContent`** (singleton)
   ```ts
   // Statistics used across multiple pages
   statistics: [
     { key: string, number: string, label: string, description: string }
   ]

   // Shared CTAs
   primaryCTA: { label: string, href: string }

   // Footer content
   footerText: string
   socialLinks: { platform, url }[]

   // Legal
   copyrightText: string
   nonprofitDisclaimer: string
   ```

2. **Updated page schemas** that reference `sharedContent` instead of duplicating:
   ```ts
   // Example: donatePageSettings
   statistics: reference → sharedContent.statistics
   // OR
   useSharedStatistics: boolean (if true, pull from sharedContent)
   ```

3. **New required field markers** on all critical content fields

4. **Validation rules** added where appropriate (max length, URL format, etc.)

## Acceptance Criteria
```
[ ] sharedContent schema created and deployed
[ ] Statistics exist in ONE place only
[ ] All page schemas updated to reference shared content
[ ] Critical fields marked required:
    - All hero headlines
    - All hero images (where applicable)
    - All CTA labels and hrefs
    - Footer text
    - Social links
[ ] Validation rules on:
    - URLs (valid format)
    - Headlines (max 150 chars)
    - Descriptions (max 500 chars)
[ ] Schema changes deployed to Sanity Studio
[ ] No TypeScript errors in codebase after schema changes
```

## QA Loop
1. Open Sanity Studio → verify new schemas appear
2. Attempt to publish document with empty required field → should fail
3. Attempt to enter invalid URL → should show validation error
4. Create test document with shared content reference → verify it resolves
5. Run `npm run build` → no errors

## Exit Gate
All schemas deployed, validated in Studio, build passes → Phase 3 begins

---

# Phase 3: Content Seeding
**Duration:** 1-2 days

## Objective
Populate Sanity with all current live site content. After this phase, Sanity has everything the site displays.

## Deliverables
1. **Seeding script** (`scripts/seed-sanity-full.ts`) that:
   - Reads current code defaults
   - Creates/updates Sanity documents
   - Handles images (uploads to Sanity CDN)
   - Logs every action taken

2. **All Sanity documents populated:**
   - `sharedContent` (statistics, CTAs, footer, social)
   - `homepageSettings`
   - `aboutPageSettings`
   - `ourWorkPageSettings`
   - `donatePageSettings`
   - `joinPageSettings`
   - `contactPageSettings`
   - `siteSettings`
   - All `faq` documents (already done)
   - All `teamMember` documents
   - All `partner` documents
   - All `press` documents

3. **Content verification checklist** — side-by-side comparison of live site vs Sanity Studio

## Acceptance Criteria
```
[ ] Seeding script runs without errors
[ ] Every field in every schema has content (no empty required fields)
[ ] Images uploaded to Sanity CDN (not external URLs)
[ ] Content in Sanity matches live site exactly:
    - [ ] Homepage: hero headline, pillars, newsletter copy
    - [ ] About: mission paragraphs, timeline, team, partners
    - [ ] Our Work: all sections, all stats, all CTAs
    - [ ] Donate: headline, paragraphs, tax notice
    - [ ] Join: both card value props, form labels, success messages
    - [ ] Contact: all form options, social links
    - [ ] FAQ: all questions (already verified)
    - [ ] Footer: all links, text, social icons
[ ] Sanity Studio shows no "missing required field" warnings
[ ] Script is idempotent (can run multiple times safely)
```

## QA Loop
1. Run seeding script
2. Open each page in browser + corresponding Sanity document side-by-side
3. Character-by-character verify headlines match
4. Click every link in Sanity → verify href is correct
5. Check images render (not broken)
6. Have second person repeat verification on 3 random pages

## Exit Gate
All content seeded, verified side-by-side, no mismatches → Phase 4 begins

---

# Phase 4: Component Refactor
**Duration:** 3-4 days

## Objective
Remove all hardcoded content from components. Components become pure structure — Sanity provides all content.

## Deliverables
1. **Updated components** that:
   - Fetch from Sanity (or receive Sanity data as props)
   - Have NO hardcoded display strings
   - Handle empty states gracefully (hide section, or show dev warning)

2. **Deleted code defaults** — remove the fallback objects like:
   ```ts
   // DELETE this pattern:
   const defaults = {
     heroTitle: "Help Us Secure...",
     ...
   }
   ```

3. **Empty state handling** — each component either:
   - Hides entirely if content missing (`if (!data) return null`)
   - Shows clear "Content not configured" message in development only

4. **Updated queries** — ensure all GROQ queries fetch shared content correctly

## Acceptance Criteria
```
[ ] Zero hardcoded display strings in components (audit grep confirms)
[ ] All `defaults` objects removed from page files
[ ] Each component handles missing data gracefully:
    - Production: hides section or shows minimal fallback
    - Development: shows clear warning
[ ] All pages still render correctly with Sanity data
[ ] No visual regressions (site looks identical to before)
[ ] Build passes with no TypeScript errors
[ ] No console errors in browser
```

## QA Loop
1. `grep -r "defaults\s*=" src/app` → should return nothing
2. `grep -rE "\"[A-Z][a-zA-Z\s]{10,}\"" src/app src/components` → flag any long hardcoded strings
3. Visual regression test:
   - Screenshot every page BEFORE refactor
   - Screenshot every page AFTER refactor
   - Diff them (should be identical or intentionally improved)
4. Test empty state:
   - Temporarily empty a Sanity field
   - Verify page doesn't crash
   - Verify appropriate handling (hide or dev warning)
5. Full site click-through in browser

## Exit Gate
All components refactored, visual regression passed, no hardcoded content → Phase 5 begins

---

# Phase 5: Live Preview Setup
**Duration:** 1-2 days

## Objective
Enable real-time preview in Sanity Studio so editors see exactly what the site will look like as they edit.

## Deliverables
1. **Preview route** (`/api/preview` or similar) that enables draft mode

2. **Sanity Studio configuration** with preview pane showing live site

3. **Draft mode in Next.js** — site fetches draft content when in preview

4. **Preview button in Studio** — one click to see changes live

## Acceptance Criteria
```
[ ] Preview pane visible in Sanity Studio
[ ] Clicking "Preview" opens site in preview mode
[ ] Changes in Sanity reflect immediately in preview (within 1-2 seconds)
[ ] Draft content visible in preview, not on production
[ ] Preview works for all document types:
    - [ ] Homepage settings
    - [ ] About page settings
    - [ ] Our Work page settings
    - [ ] Donate page settings
    - [ ] Join page settings
    - [ ] Contact page settings
    - [ ] FAQ items
    - [ ] Team members
[ ] Exit preview returns to normal published content
```

## QA Loop
1. Open Sanity Studio → open Homepage settings
2. Change hero headline to "TEST PREVIEW"
3. Click Preview → verify "TEST PREVIEW" appears in preview pane
4. Do NOT publish
5. Open production site in new tab → verify original headline (not "TEST PREVIEW")
6. Revert change in Studio
7. Repeat for 3 different document types

## Exit Gate
Preview working for all content types, editors can see changes before publishing → Phase 6 begins

---

# Phase 6: TypeScript Type Generation
**Duration:** 1 day

## Objective
Auto-generate TypeScript types from Sanity schemas. Eliminates drift between schema and code.

## Deliverables
1. **Sanity TypeGen configured** (`sanity typegen`)

2. **Generated types file** (`src/sanity/types.generated.ts` or similar)

3. **Updated imports** across codebase to use generated types

4. **CI check** (optional) — type generation runs in CI, fails if types drift

## Acceptance Criteria
```
[ ] `npm run typegen` (or equivalent) generates types without errors
[ ] All Sanity document types have corresponding TypeScript types
[ ] All queries return properly typed results
[ ] Existing manual types replaced with generated types
[ ] No TypeScript errors after switchover
[ ] Types regenerate correctly after schema changes
```

## QA Loop
1. Run `sanity typegen`
2. Verify generated file exists and contains expected types
3. Change a schema field name
4. Run typegen again
5. Verify TypeScript errors appear where old field name was used
6. Fix errors, verify build passes

## Exit Gate
Types generating correctly, integrated into codebase → Phase 7 begins

---

# Phase 7: Required Fields & Validation
**Duration:** 1 day

## Objective
Lock down Sanity so incomplete or invalid content cannot be published.

## Deliverables
1. **Required field markers** on all critical fields (if not done in Phase 2)

2. **Validation rules:**
   - URL fields: valid URL format
   - Email fields: valid email format
   - Character limits on headlines/descriptions
   - Image aspect ratio hints (where applicable)

3. **Custom validation** for complex rules:
   - At least one statistic if statistics section enabled
   - CTA must have both label AND href

4. **Editor documentation** — brief guide on required fields and validation rules

## Acceptance Criteria
```
[ ] Cannot publish homepage without: hero headline, hero image, at least one pillar
[ ] Cannot publish any page without: hero headline
[ ] Cannot publish CTA with label but no href (or vice versa)
[ ] Invalid URLs rejected at save time
[ ] Character limits enforced with clear error messages
[ ] Editors have documentation on what's required
```

## QA Loop
1. Attempt to publish document with empty required field → blocked
2. Attempt to enter "not-a-url" in URL field → validation error
3. Attempt to exceed character limit → validation error
4. Try every "bad input" scenario for each content type
5. Verify error messages are clear (not cryptic)

## Exit Gate
All validation in place, tested, documented → Project complete

---

# Project Completion Criteria

The project is DONE when:

```
[ ] Content audit complete — we know everything that was hardcoded
[ ] Schemas restructured — shared content exists once, referenced everywhere
[ ] Sanity fully seeded — all current site content in Sanity
[ ] Components refactored — zero hardcoded display content in code
[ ] Live Preview working — editors see real-time changes
[ ] Types auto-generated — schema and code stay in sync
[ ] Validation enforced — incomplete content cannot publish
[ ] Documentation complete — editors know how to use the system
```

## Success Metrics
1. **Edit headline in Sanity → see change on site in <60 seconds** (with revalidation)
2. **Edit shared statistic → updates on ALL pages that use it**
3. **Zero instances of "site says X but Sanity says Y"**
4. **New content type can be added with: schema → typegen → component → done**

---

# Risk Register

| Risk | Mitigation |
|------|------------|
| Content mismatch during seeding | Side-by-side verification QA loop |
| Visual regression during refactor | Before/after screenshots, diff comparison |
| Breaking production during refactor | Feature branch, staging deploy, then production |
| Editor confusion with new system | Documentation + walkthrough session |
| Shared content breaks page | Test reference resolution in all locations |

---

# Post-Project: Maintenance Rules

Once complete, these rules maintain the system:

1. **New content = new Sanity field first, then component**
2. **Never hardcode display strings in components**
3. **Run typegen after any schema change**
4. **Test preview before publishing major changes**
5. **Shared content (stats, CTAs) lives in `sharedContent` document only**

---

*Document: `/docs/SANITY-SOURCE-OF-TRUTH-PROJECT.md`*
