# BVP SPEC 02: TECHNICAL ARCHITECTURE
## Stack, Structure & Deployment

---

## TECHNOLOGY STACK

| Layer | Choice | Why |
|-------|--------|-----|
| **Framework** | Next.js 14 (App Router) | Industry standard, SEO-friendly, Vercel-optimized |
| **Language** | TypeScript | Type safety, fewer bugs, better DX |
| **Styling** | Tailwind CSS | Already in wireframe, utility-first, fast |
| **CMS** | Sanity.io | Real-time previews, generous free tier, flexible |
| **Hosting** | Vercel | Built for Next.js, instant deploys, preview URLs |
| **Animation** | Framer Motion | Best React animation library |
| **Forms** | Action Network API | Custom UI, member database, advocacy tools |
| **Newsletter** | Zapier → Substack | Webhook integration |
| **Donations** | Donately | Nonprofit-focused, handles PCI |
| **Analytics** | Vercel Analytics + GA4 | Privacy-friendly + comprehensive |

---

## REPOSITORY STRUCTURE

```
bvp-site/
├── src/
│   ├── app/                      # Next.js App Router
│   │   ├── layout.tsx            # Root layout
│   │   ├── page.tsx              # Homepage
│   │   ├── who-we-are/page.tsx
│   │   ├── our-work/page.tsx
│   │   ├── join/page.tsx
│   │   ├── donate/page.tsx
│   │   ├── faq/page.tsx
│   │   └── api/
│   │       ├── newsletter/route.ts
│   │       └── join/route.ts
│   │
│   ├── components/
│   │   ├── ui/                   # Base components
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Section.tsx
│   │   │   └── Accordion.tsx
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   └── Footer.tsx
│   │   ├── sections/             # Page sections
│   │   │   ├── Hero.tsx
│   │   │   ├── BlogFeed.tsx
│   │   │   ├── TeamGrid.tsx
│   │   │   └── StatsBar.tsx
│   │   └── forms/
│   │       ├── NewsletterForm.tsx
│   │       └── StoryForm.tsx
│   │
│   ├── lib/
│   │   ├── sanity/
│   │   │   ├── client.ts
│   │   │   └── queries.ts
│   │   ├── substack.ts
│   │   └── utils.ts
│   │
│   └── styles/
│       └── globals.css
│
├── public/
│   ├── fonts/
│   └── images/
│
├── docs/                         # These spec files
├── tailwind.config.ts
├── next.config.js
├── .env.local                    # Secrets (gitignored)
└── .env.example                  # Template
```

---

## ENVIRONMENT VARIABLES

```bash
# .env.local (NEVER COMMIT)

# Sanity
NEXT_PUBLIC_SANITY_PROJECT_ID=xxxxx
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=sk_xxxxx              # Server only

# Action Network
ACTION_NETWORK_API_KEY=xxxxx           # Server only

# Zapier
ZAPIER_NEWSLETTER_WEBHOOK=xxxxx        # Server only

# Donately
NEXT_PUBLIC_DONATELY_ID=xxxxx          # Public OK

# Analytics
NEXT_PUBLIC_GA_ID=G-xxxxx
```

**Rule:** Anything without `NEXT_PUBLIC_` prefix stays server-side only.

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
  │             │     │             │     │             │
  │ Team, FAQs  │     │ Blog posts  │     │ Forms/      │
  │ Stats, etc  │     │             │     │ Members     │
  └─────────────┘     └─────────────┘     └─────────────┘
         │
         ▼
  ┌─────────────┐
  │   Zapier    │──────► Substack (newsletter sync)
  └─────────────┘
```

---

## DEPLOYMENT FLOW

```
Developer pushes to GitHub
         │
         ▼
Vercel detects push
         │
         ├── TypeScript check
         ├── ESLint
         ├── Build Next.js
         ├── Generate static pages
         │
         ▼
Preview URL created (for PRs)
         │
         ▼
Merge to main = Production deploy
```

---

## CACHING STRATEGY

| Content Type | Strategy | Revalidation |
|--------------|----------|--------------|
| Static pages | ISR | On Sanity webhook |
| Blog feed | ISR | Every 1 hour |
| Images | CDN cached | Long TTL |
| API routes | No cache | Real-time |

---

## SECURITY LAYERS

| Layer | Protection |
|-------|------------|
| Infrastructure | Vercel handles DDoS, SSL, edge security |
| CMS | Sanity handles encryption, SOC 2 compliant |
| Payments | Donately handles PCI compliance |
| Forms | Honeypot, rate limiting, server validation |
| Access | 2FA on all admin accounts |

---

*Next: [SPEC-03-design-system.md](./SPEC-03-design-system.md)*
