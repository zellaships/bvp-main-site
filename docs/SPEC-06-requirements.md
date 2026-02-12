# BVP SPEC 06: REQUIREMENTS
## Performance, Accessibility, Security, SEO & Launch

---

## PERFORMANCE

### Core Web Vitals Targets

| Metric | Target | What It Measures |
|--------|--------|------------------|
| **LCP** | < 2.5s | Largest element render time |
| **FID** | < 100ms | First interaction response |
| **CLS** | < 0.1 | Visual stability |
| **TTFB** | < 600ms | Server response time |

### Lighthouse Targets

| Category | Target |
|----------|--------|
| Performance | > 90 |
| Accessibility | 100 |
| Best Practices | > 95 |
| SEO | 100 |

### Optimization Strategies

**Images**
- Use Next.js `<Image>` component
- Serve WebP with fallbacks
- Lazy load below-fold images
- Set explicit width/height (prevent CLS)
- Use blur placeholders for hero

**Fonts**
- Self-host fonts (not Google Fonts CDN)
- Use `font-display: swap`
- Preload critical fonts
- Subset to reduce file size

**JavaScript**
- Code split by route (automatic with Next.js)
- Dynamic imports for heavy components
- Minimize third-party scripts
- Defer non-critical JS

**Caching**
- Static pages from edge (Vercel)
- ISR for CMS content
- Long cache headers for assets

---

## ACCESSIBILITY

### Standard
**WCAG 2.1 Level AA Compliance**

### Checklist

**Perceivable**
- [ ] All images have descriptive alt text
- [ ] Color is not the only way to convey info
- [ ] Text contrast ≥ 4.5:1 (normal), ≥ 3:1 (large)
- [ ] Content works at 200% zoom
- [ ] Text resizable without breaking

**Operable**
- [ ] All functions work via keyboard
- [ ] No keyboard traps
- [ ] Skip to main content link
- [ ] Focus indicators visible
- [ ] Logical focus order
- [ ] No flashing content > 3/second

**Understandable**
- [ ] Page language declared (`<html lang="en">`)
- [ ] Form inputs have labels
- [ ] Error messages are clear
- [ ] Consistent navigation

**Robust**
- [ ] Valid HTML
- [ ] ARIA used correctly
- [ ] Works with screen readers

### Color Contrast Verification

| Combination | Ratio | Status |
|-------------|-------|--------|
| Black on white | 21:1 | ✅ AAA |
| White on black | 21:1 | ✅ AAA |
| Black on gold | 13.1:1 | ✅ AAA |
| White on navy | 12.4:1 | ✅ AAA |

### Testing Tools
- axe DevTools (browser extension)
- Lighthouse accessibility audit
- VoiceOver (Mac) / NVDA (Windows)
- Keyboard-only navigation test

---

## SECURITY

### Infrastructure (Managed)
| Service | Security |
|---------|----------|
| Vercel | DDoS, SSL, edge security |
| Sanity | Encryption, SOC 2, backups |
| Action Network | Member data compliance |
| Donately | PCI DSS compliance |

### Application Security

**Environment Variables**
- All secrets in `.env.local` (gitignored)
- Server-only keys: no `NEXT_PUBLIC_` prefix
- Never log or expose API keys

**Form Security**
- Honeypot fields on all forms
- Rate limiting on API routes
- Server-side validation
- Input sanitization

**Access Control**
- 2FA on all admin accounts
- Role-based access in Sanity
- Quarterly access review
- Remove access when people leave

### Security Headers
```javascript
// next.config.js headers
X-DNS-Prefetch-Control: on
Strict-Transport-Security: max-age=63072000; includeSubDomains
X-Frame-Options: SAMEORIGIN
X-Content-Type-Options: nosniff
Referrer-Policy: origin-when-cross-origin
```

---

## SEO

### Meta Tags (Per Page)
```html
<title>{Page Title} | Black Veterans Project</title>
<meta name="description" content="{150-160 chars}" />
<link rel="canonical" href="https://blackveteransproject.org/{path}" />
```

### Open Graph
```html
<meta property="og:title" content="{Title}" />
<meta property="og:description" content="{Description}" />
<meta property="og:image" content="{og-image.jpg}" />
<meta property="og:url" content="{URL}" />
<meta property="og:type" content="website" />
```

### Twitter Cards
```html
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:site" content="@blkvetsproject" />
```

### Structured Data

**Organization (all pages)**
```json
{
  "@context": "https://schema.org",
  "@type": "NonprofitOrganization",
  "name": "Black Veterans Project",
  "url": "https://blackveteransproject.org"
}
```

**FAQ Page**
```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [...]
}
```

### Page Titles & Descriptions

| Page | Title | Description |
|------|-------|-------------|
| Home | Black Veterans Project — Reparative Justice | Advancing reparative justice for Black veterans and military families through litigation, narrative, and mobilization. |
| Who We Are | Who We Are \| Black Veterans Project | Meet the team building the case for repair... |
| Our Work | Our Work \| Black Veterans Project | Research, litigation, narrative, and mobilization... |
| Join | Share Your Story \| Black Veterans Project | Your story is evidence. Join thousands... |
| Donate | Support the Work \| Black Veterans Project | Your contribution fuels research and litigation... |
| FAQ | FAQ \| Black Veterans Project | Get answers about BVP, Monk case, eligibility... |

### Technical SEO
- Auto-generated sitemap.xml
- robots.txt allowing all crawlers
- Clean URL structure
- Fast page loads (Core Web Vitals)

---

## ANALYTICS

### Tools
- **Vercel Analytics** — Privacy-friendly, built-in
- **Google Analytics 4** — Comprehensive tracking

### Key Events to Track

| Event | Where | Why |
|-------|-------|-----|
| `newsletter_signup` | Homepage, Blog section | Measure email conversion |
| `story_form_start` | Join page | Measure intent |
| `story_form_submit` | Join page | Measure conversion |
| `donate_click` | Multiple | Measure donation intent |
| `blog_post_click` | Homepage | Measure content engagement |
| `nav_click` | Header | Understand navigation patterns |

### UTM Parameters
Support for campaign tracking via UTM params in URLs.

---

## LAUNCH CHECKLIST

### Pre-Launch (1 week before)

**Content**
- [ ] All placeholder text replaced with real content
- [ ] All images uploaded and optimized
- [ ] Team bios and photos complete
- [ ] FAQs written and reviewed
- [ ] Legal pages (Privacy, Terms) in place

**Technical**
- [ ] All pages render correctly
- [ ] Mobile responsive on all breakpoints
- [ ] Forms submit successfully
- [ ] Integrations tested (AN, Zapier, RSS)
- [ ] 404 page styled
- [ ] Favicon and OG images set

**Performance**
- [ ] Lighthouse scores meet targets
- [ ] Images optimized
- [ ] Fonts loading correctly

**Accessibility**
- [ ] axe DevTools shows 0 critical issues
- [ ] Keyboard navigation works
- [ ] Screen reader tested

**SEO**
- [ ] Meta tags on all pages
- [ ] Sitemap generating
- [ ] robots.txt correct
- [ ] Structured data valid

### Launch Day

**DNS & Domain**
- [ ] Domain pointed to Vercel
- [ ] SSL certificate active
- [ ] www redirect configured
- [ ] Old site redirects (if applicable)

**Monitoring**
- [ ] Analytics connected
- [ ] Error tracking enabled
- [ ] Uptime monitoring set up

**Communication**
- [ ] Team notified
- [ ] Social announcement ready
- [ ] Email to stakeholders drafted

### Post-Launch (First week)

- [ ] Monitor analytics for issues
- [ ] Check form submissions flowing
- [ ] Review Core Web Vitals in Search Console
- [ ] Fix any reported bugs
- [ ] Gather initial feedback

---

## MAINTENANCE

### Ongoing Tasks

| Task | Frequency |
|------|-----------|
| Content updates (Sanity) | As needed |
| Dependency updates | Monthly |
| Security audit | Quarterly |
| Access review | Quarterly |
| Performance check | Monthly |
| Backup verification | Monthly |

### Who Manages What

| Area | Owner |
|------|-------|
| Content (CMS) | BVP team |
| Code changes | Developer |
| Hosting (Vercel) | Developer |
| Domain/DNS | BVP admin |
| Analytics review | BVP team |

---

## DOCUMENTATION

All specs live in `/docs/`:
- `SPEC-01-overview.md` — Vision, goals, audiences
- `SPEC-02-architecture.md` — Tech stack, structure
- `SPEC-03-design-system.md` — Colors, type, spacing
- `SPEC-04-pages.md` — Page-by-page specs
- `SPEC-05-integrations.md` — Third-party services
- `SPEC-06-requirements.md` — This file

---

*End of specification. Let's build this.*
