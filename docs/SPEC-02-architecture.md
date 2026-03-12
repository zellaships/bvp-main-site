# BVP SPEC 02: TECHNICAL ARCHITECTURE
## Stack, Structure & Deployment

---

## TECHNOLOGY STACK

| Layer | Choice | Status | Why |
|-------|--------|--------|-----|
| **Framework** | Next.js 16 (App Router) | ✅ Active | Industry standard, SEO-friendly, Vercel-optimized |
| **Language** | TypeScript | ✅ Active | Type safety, fewer bugs, better DX |
| **Styling** | Tailwind CSS 4 | ✅ Active | Utility-first, fast iteration |
| **Animation** | Framer Motion | ✅ Active | Best React animation library |
| **Hosting** | Vercel | ✅ Active | Built for Next.js, instant deploys, preview URLs |
| **Forms/CRM** | Action Network API | ✅ Active | Member database, advocacy tools, email automation |
| **Newsletter** | Substack RSS | ✅ Active | RSS feed integration for blog posts |
| **Unit Testing** | Vitest + RTL | ✅ Active | Fast, modern test runner |
| **E2E Testing** | Playwright | ✅ Active | Cross-browser, reliable E2E |
| **CI/CD** | GitHub Actions | ✅ Active | Automated testing on push |
| **CMS** | Sanity.io | 🔜 Planned | Real-time previews, flexible content |
| **Donations** | Donately | 🔜 Planned | Nonprofit-focused, handles PCI |
| **Analytics** | GA4 | 🔜 Planned | Cookie consent ready, need GA ID |

---

## REPOSITORY STRUCTURE

```
bvp-site/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── layout.tsx                # Root layout (global meta, fonts)
│   │   ├── globals.css               # Global styles
│   │   ├── robots.ts                 # Dynamic robots.txt
│   │   ├── sitemap.ts                # Dynamic sitemap
│   │   │
│   │   ├── (main)/                   # Route group for public pages
│   │   │   ├── layout.tsx            # Header + Footer wrapper
│   │   │   ├── page.tsx              # Homepage
│   │   │   ├── about/
│   │   │   ├── our-work/
│   │   │   ├── join/                 # Membership signup (2-step)
│   │   │   ├── donate/
│   │   │   ├── contact/
│   │   │   ├── press/
│   │   │   ├── faq/
│   │   │   ├── financials/
│   │   │   ├── privacy/
│   │   │   ├── terms/
│   │   │   └── accessibility/
│   │   │
│   │   ├── admin/                    # Admin dashboard
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx
│   │   │
│   │   ├── api/                      # API Routes
│   │   │   ├── advocate-signup/      # → Action Network
│   │   │   ├── substack/             # → RSS feed parser
│   │   │   ├── feedback/             # → Google Sheets webhook
│   │   │   ├── contact/              # (placeholder)
│   │   │   └── newsletter/           # (placeholder)
│   │   │
│   │   ├── buttons/                  # Design system showcase
│   │   ├── design-system/            # Component library
│   │   ├── dev/                      # Development tools
│   │   └── feedback/                 # Feedback page
│   │
│   ├── components/
│   │   ├── ui/                       # Base components
│   │   │   ├── Button.tsx            # 7 variants
│   │   │   ├── Input.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Section.tsx
│   │   │   ├── Accordion.tsx
│   │   │   ├── BackToTop.tsx
│   │   │   ├── CookieConsent.tsx     # GDPR-compliant
│   │   │   ├── DebugOverlay.tsx
│   │   │   └── DesignDebug.tsx
│   │   │
│   │   ├── layout/
│   │   │   ├── Header.tsx            # Nav with dropdowns, mobile menu
│   │   │   └── Footer.tsx            # 4-column footer
│   │   │
│   │   ├── sections/                 # Page sections
│   │   │   ├── Hero.tsx              # Parallax hero
│   │   │   ├── PillarsSection.tsx    # Our work pillars
│   │   │   ├── NewsletterStrip.tsx   # Inline signup form
│   │   │   ├── NewsletterBanner.tsx
│   │   │   ├── NewsletterSection.tsx
│   │   │   ├── SubstackFeed.tsx      # RSS blog feed
│   │   │   └── index.ts
│   │   │
│   │   ├── providers/
│   │   │   └── AnalyticsProvider.tsx # GA4 event tracking
│   │   │
│   │   ├── dev/                      # Debug components
│   │   │   ├── SpacingDebug.tsx
│   │   │   └── index.ts
│   │   │
│   │   └── FeedbackWidget.tsx        # Screenshot feedback
│   │
│   ├── config/
│   │   ├── seo.ts                    # Centralized SEO for all pages
│   │   ├── integrations.ts           # Third-party config
│   │   ├── accessibility.ts          # A11y checklist
│   │   └── launch-checklist.ts
│   │
│   ├── lib/
│   │   ├── utils.ts                  # cn(), formatDate(), slugify()
│   │   ├── validation.ts             # Form validation utilities
│   │   ├── actionNetwork.ts          # Action Network API client
│   │   ├── analytics.ts              # GA4 event helpers
│   │   ├── utm.ts                    # UTM parameter tracking
│   │   └── form-data.ts
│   │
│   └── __tests__/                    # Unit & component tests
│       ├── lib/
│       │   ├── utils.test.ts
│       │   └── validation.test.ts
│       └── components/
│           └── NewsletterStrip.test.tsx
│
├── e2e/                              # Playwright E2E tests
│   ├── homepage.spec.ts
│   ├── newsletter.spec.ts
│   ├── join.spec.ts
│   ├── contact.spec.ts
│   └── accessibility.spec.ts
│
├── public/
│   ├── images/                       # Static images
│   └── fonts/                        # Custom fonts (Gunterz, Ontika, Linear)
│
├── docs/                             # Spec files
├── scripts/                          # Build/utility scripts
├── .github/
│   └── workflows/
│       └── ci.yml                    # GitHub Actions pipeline
│
├── vitest.config.ts                  # Unit test config
├── vitest.setup.tsx                  # Test setup/mocks
├── playwright.config.ts              # E2E test config
├── tailwind.config.ts
├── next.config.ts
├── tsconfig.json
└── package.json
```

---

## TESTING INFRASTRUCTURE

### Test Stack

| Type | Tool | Coverage |
|------|------|----------|
| **Unit Tests** | Vitest | Utilities, validation, helpers |
| **Component Tests** | React Testing Library | Form behavior, interactions |
| **E2E Tests** | Playwright | User flows, accessibility |
| **CI/CD** | GitHub Actions | Automated on push |

### Test Commands

```bash
# Unit & component tests
npm run test          # Watch mode (development)
npm run test:run      # Single run
npm run test:coverage # With coverage report

# E2E tests
npm run test:e2e      # Full suite (all browsers)
npm run test:e2e:ui   # Visual debugging mode

# Specific browser
npm run test:e2e -- --project=chromium
```

### Test Structure

```
src/__tests__/
├── lib/
│   ├── utils.test.ts         # 20 tests - cn, formatDate, slugify, truncate
│   └── validation.test.ts    # 21 tests - email, required, zip, phone, forms
└── components/
    └── NewsletterStrip.test.tsx  # 8 tests - form validation, submission

e2e/
├── homepage.spec.ts          # Hero, navigation, sections
├── newsletter.spec.ts        # Full signup flow
├── join.spec.ts              # Membership flow (affiliate/advocate)
├── contact.spec.ts           # Contact form submission
├── accessibility.spec.ts     # Headings, alt text, ARIA, focus
├── faq.spec.ts               # FAQ accordion behavior
├── mobile-navigation.spec.ts # Mobile menu, hamburger, gestures
├── footer.spec.ts            # Footer links, social, legal
└── pages.spec.ts             # All page content verification, SEO
```

### Test Coverage

| Area | Tests | Status |
|------|-------|--------|
| Utility functions | 20 | ✅ |
| Form validation | 21 | ✅ |
| Newsletter form | 8 | ✅ |
| Homepage E2E | 6 | ✅ |
| Newsletter E2E | 5 | ✅ |
| Join page E2E | 6 | ✅ |
| Contact E2E | 6 | ✅ |
| Accessibility E2E | 8 | ✅ |
| FAQ Accordion E2E | 8 | ✅ |
| Mobile Navigation E2E | 10 | ✅ |
| Footer Links E2E | 16 | ✅ |
| Page Content E2E | 25+ | ✅ |
| **Total** | **140+** | ✅ |

---

## ENVIRONMENT VARIABLES

```bash
# .env.local (NEVER COMMIT)

# Action Network (ACTIVE)
ACTION_NETWORK_API_KEY=xxxxx           # Server only

# Feedback widget (optional)
GOOGLE_SHEETS_WEBHOOK_URL=xxxxx        # Server only

# Analytics (planned)
NEXT_PUBLIC_GA_ID=G-xxxxx

# Sanity CMS (planned)
NEXT_PUBLIC_SANITY_PROJECT_ID=xxxxx
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=sk_xxxxx              # Server only

# Donately (planned)
NEXT_PUBLIC_DONATELY_ID=xxxxx          # Public OK
```

**Rule:** Anything without `NEXT_PUBLIC_` prefix stays server-side only.

---

## INTEGRATION STATUS

| Integration | Status | Notes |
|-------------|--------|-------|
| Vercel Hosting | ✅ Live | Deployed at bvp-main-site.vercel.app |
| Action Network | ✅ Active | Advocate signup, member tagging |
| Substack RSS | ✅ Active | Blog feed with 5-min cache |
| SEO Meta Tags | ✅ Done | All 17 pages have title, description, OG tags |
| Cookie Consent | ✅ Done | GDPR-compliant with preference drawer |
| Custom Fonts | ✅ Done | Gunterz, Ontika, Linear Grotesk |
| Form Validation | ✅ Done | Inline errors, ARIA support |
| Testing Suite | ✅ Done | 80+ tests (unit, component, E2E) |
| CI/CD Pipeline | ✅ Done | GitHub Actions on push |
| Admin Dashboard | ✅ Done | Mock data, SEO overview at /admin |
| Sanity CMS | 🔜 Next | Will replace hardcoded content |
| Donately | 🔜 Next | Will handle donations |
| Google Analytics | 🔜 Next | Cookie consent ready, need GA ID |

---

## DATA FLOW ARCHITECTURE

```
┌─────────────────────────────────────────────────────────────┐
│                         VERCEL                               │
│                                                              │
│   Static Assets ──► Edge CDN (cached)                       │
│   Pages ──► ISR (revalidate on CMS webhook)                 │
│   API Routes ──► Serverless Functions                       │
│                                                              │
└─────────────────────────────────────────────────────────────┘
                              │
         ┌────────────────────┼────────────────────┐
         ▼                    ▼                    ▼
  ┌─────────────┐     ┌─────────────┐     ┌─────────────┐
  │   Sanity    │     │   Substack  │     │   Action    │
  │    CMS      │     │    RSS      │     │   Network   │
  │  (planned)  │     │   ✅ Live   │     │   ✅ Live   │
  │             │     │             │     │             │
  │ Team, FAQs  │     │ Blog posts  │     │ Forms/      │
  │ Stats, etc  │     │ 6 latest    │     │ Members     │
  └─────────────┘     └─────────────┘     └─────────────┘
```

---

## DEPLOYMENT FLOW

```
Developer pushes to GitHub
         │
         ▼
┌─────────────────────────────────────┐
│        GITHUB ACTIONS CI            │
│                                     │
│  ┌─────────────────────────────┐   │
│  │  1. Lint (ESLint)           │   │
│  │  2. Type Check (tsc)        │   │
│  │  3. Unit Tests (Vitest)     │   │
│  │  4. E2E Tests (Playwright)  │   │
│  │  5. Build (next build)      │   │
│  └─────────────────────────────┘   │
│                                     │
│  ❌ Any fail → Block merge          │
│  ✅ All pass → Continue             │
└─────────────────────────────────────┘
         │
         ▼
Vercel detects push
         │
         ├── Build Next.js
         ├── Generate static pages
         ├── Deploy to Edge CDN
         │
         ▼
Preview URL created (for PRs)
         │
         ▼
Merge to main = Production deploy
```

### CI Failure Notifications

| Recipient | When | How |
|-----------|------|-----|
| Repository Owner | Any workflow failure | GitHub email (automatic) |
| PR Author | Failed checks on their PR | GitHub email + PR status |
| Watchers | If enabled in settings | GitHub email |
| Team (optional) | Can add Slack/Discord | Via webhook integration |

**To configure notifications:**
1. Go to GitHub.com → Settings → Notifications
2. Under "Actions", enable "Send notifications for failed workflows only"
3. Emails come from `noreply@github.com`

**For team-wide Slack notifications (optional):**
Add a workflow step with `slackapi/slack-github-action` and configure a webhook URL.

---

## CACHING STRATEGY

| Content Type | Strategy | Revalidation |
|--------------|----------|--------------|
| Static pages | ISR | On Sanity webhook (planned) |
| Substack feed | Server cache | 5 minutes |
| Images | CDN cached | Long TTL |
| API routes | No cache | Real-time |
| Fonts | CDN cached | Immutable |

---

## SECURITY LAYERS

| Layer | Protection |
|-------|------------|
| Infrastructure | Vercel DDoS protection, SSL, edge security |
| Headers | CSP, HSTS, X-Frame-Options, Referrer-Policy |
| CMS | Sanity SOC 2 compliant (planned) |
| Payments | Donately handles PCI compliance (planned) |
| Forms | Honeypot fields, server-side validation |
| API Keys | Server-only env vars, no client exposure |
| Access | 2FA on all admin accounts |

### Security Headers (Active)

```typescript
// next.config.ts
headers: [
  'Strict-Transport-Security: max-age=31536000; includeSubDomains; preload',
  'X-Frame-Options: SAMEORIGIN',
  'X-Content-Type-Options: nosniff',
  'Referrer-Policy: strict-origin-when-cross-origin',
  'Permissions-Policy: camera=(), microphone=(), geolocation=()',
  'Content-Security-Policy: ...' // GA4, fonts, images allowed
]
```

---

## PERFORMANCE TARGETS

| Metric | Target | Current |
|--------|--------|---------|
| Lighthouse Performance | > 90 | ✅ Optimized |
| First Contentful Paint | < 1.5s | ✅ |
| Largest Contentful Paint | < 2.5s | ✅ |
| Cumulative Layout Shift | < 0.1 | ✅ |
| Time to Interactive | < 3.5s | ✅ |

---

## DEVELOPMENT WORKFLOW

### Daily Development
```bash
# Terminal 1: Dev server
npm run dev

# Terminal 2: Tests in watch mode
npm run test
```

### Before Committing
```bash
npm run lint && npm run test:run
```

### Before Deploying
```bash
npm run test:run && npm run test:e2e -- --project=chromium
```

---

*Next: [SPEC-03-design-system.md](./SPEC-03-design-system.md)*
