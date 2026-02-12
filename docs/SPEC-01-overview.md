# BVP SPEC 01: VISION, AUDIENCES & GOALS
## The WHY Behind Everything

---

## EXECUTIVE SUMMARY

### What We're Building

A world-class website for **Black Veterans Project (BVP)**, a nonprofit advancing reparative justice for Black veterans and military families through:

| Pillar | Description |
|--------|-------------|
| **Impact Litigation** | Building legal cases for systemic repair (Monk v. United States) |
| **Narrative Building** | Documenting stories, creating archives, producing research |
| **Mobilization** | Organizing Black veterans and families into a political force |

This is not a brochure site. This is **digital headquarters for a movement**.

### Scope

**In Scope:**
- 6 core pages + 2 legal pages
- Mobile-first responsive design
- Sanity CMS for content management
- Substack RSS integration (blog)
- Action Network API (forms)
- Donately (donations)
- Zapier → Substack (newsletter)
- Framer Motion animations

**Out of Scope (Future):**
- Member portal/auth
- E-commerce
- Events
- Multi-language

---

## PROJECT VISION

### Vision Statement

> Create a digital experience that matches the gravity and importance of BVP's mission—a site that commands respect, builds trust, and moves people to action.

The website should feel like walking into the headquarters of a serious, credible institution fighting for justice.

### Design Philosophy

| Principle | What It Means |
|-----------|---------------|
| **Authority through restraint** | Generous whitespace, deliberate typography. Less is more. |
| **Credibility through craft** | Pixel-perfect execution, premium feel. No template vibes. |
| **Urgency through content** | Statistics that stop you mid-scroll. Stories that move. |
| **Accessibility through clarity** | Clear hierarchy, intuitive navigation. Everyone welcome. |

### Inspiration

- **Amnesty International** — Premium feel, global authority
- **Innocence Project** — Clean design, clear mission, strong stats
- **Apple** — Whitespace as design element, typography-forward
- **Equal Justice Initiative** — Powerful storytelling, dignity

---

## STRATEGIC GOALS

### Goal 1: Establish Credibility
Position BVP as THE leading authority on Black veteran justice.

**How:** Professional design, team/board visibility, partner logos, press mentions, statistics

### Goal 2: Drive Action
Convert visitors → subscribers → story contributors → donors → advocates

**How:** Clear CTAs everywhere, low-friction forms, multiple touchpoints

### Goal 3: Tell the Story
Communicate the case for repair through data and narrative.

**How:** Stats prominently displayed, Our Work explains theory of change, blog keeps narrative fresh

### Goal 4: Build Community
Create pathways for Black veterans and families to engage.

**How:** Story submission as dignified experience, newsletter for ongoing connection

### Goal 5: Support Fundraising
Provide funders with clear understanding of impact.

**How:** All info within 3 clicks, professional presentation, clear giving pathways

---

## TARGET AUDIENCES

### Primary 1: Black Veterans & Military Families

| Attribute | Detail |
|-----------|--------|
| **Who** | Veterans who experienced discrimination, descendants, family |
| **Mindset** | "Did this happen to my family? Can I be part of this?" |
| **Entry Points** | Google, social media, word of mouth |
| **Key Flow** | Homepage → Our Work → Join Us |
| **Critical Action** | Submit story form |
| **Design Needs** | Mobile-first, accessible language, dignified tone |

### Primary 2: Funders & Philanthropists

| Attribute | Detail |
|-----------|--------|
| **Who** | Foundation officers, major donors, family foundations |
| **Mindset** | "Is this credible? What's their theory of change?" |
| **Entry Points** | Direct URL, referrals, due diligence |
| **Key Flow** | Homepage → Who We Are → Our Work → Donate |
| **Critical Action** | Donate or request meeting |
| **Design Needs** | Desktop-optimized, efficient navigation, stats visible |

### Primary 3: Press & Media

| Attribute | Detail |
|-----------|--------|
| **Who** | Journalists, filmmakers, podcasters |
| **Mindset** | "Is there a story here? Who do I contact?" |
| **Entry Points** | Search, press releases |
| **Key Flow** | Homepage → Who We Are (press) |
| **Critical Action** | Contact press team |
| **Design Needs** | Facts scannable, contacts visible |

### Secondary Audiences

- **Policy Makers** — Access research, legal strategy
- **Academics** — Primary sources, citations
- **General Public** — Learn, find ways to help

---

## INFORMATION ARCHITECTURE

### Site Map

```
blackveteransproject.org
├── / (Homepage)
│   ├── Hero
│   ├── Blog Feed (Substack RSS)
│   └── Newsletter Signup
├── /who-we-are
│   ├── Mission
│   ├── #founders
│   ├── #team
│   ├── #board
│   ├── #partners
│   └── Press Contact
├── /our-work
│   ├── #case-for-repair (stats)
│   ├── #litigation (Monk v. US)
│   ├── #narrative (archive, research)
│   └── #mobilization (network)
├── /join (story form)
├── /donate
├── /faq
├── /privacy
└── /terms
```

### Navigation

**Desktop:**
```
[LOGO]          Who We Are    Our Work ▾    Join Us    [DONATE]
                                  │
                                  ├── The Case for Repair
                                  ├── Impact Litigation
                                  ├── Narrative Building
                                  └── Mobilization
```

**Mobile:**
```
[LOGO]                              [☰]
                                     │
                         ┌───────────┘
                         │ Slide-out menu
                         │ All links + Donate button
                         └───────────
```

---

## USER JOURNEYS

### Journey 1: Veteran Story Submission

```
Facebook Post → Homepage
                   │
                   ▼
            Read mission ("This is about my family")
                   │
                   ▼
            Click "Join Us"
                   │
                   ▼
            Read "Why Your Story Matters"
                   │
                   ▼
            Fill form (name, email, relationship, story)
                   │
                   ▼
            Submit → Confirmation
                   │
                   ▼
            Share with family
```

**Key Emotions:** Curious → Recognition → Validation → Pride

### Journey 2: Funder Due Diligence

```
Grant Proposal → Direct URL → Homepage
                                  │
                                  ▼
                            30-sec assessment ("Looks legit")
                                  │
                                  ▼
                            Who We Are → Team, Board
                                  │
                                  ▼
                            Our Work → Strategy, Case
                                  │
                                  ▼
                            Press, Partners → Validation
                                  │
                                  ▼
                            Decision: Fund / Meet / Pass
```

**Key Questions:** "Credible? Strategy sound? Who else supports?"

### Journey 3: Newsletter Subscriber

```
Any Page → Scroll → Newsletter Section
                         │
                         ▼
                   Enter name + email
                         │
                         ▼
                   Click "Sign Up"
                         │
                         ▼
                   Success message
                         │
                         ▼
          [Backend: API → Zapier → Substack]
                         │
                         ▼
                   Confirmation email
```

---

## CONTENT STRATEGY

### Brand Voice

| Attribute | Description |
|-----------|-------------|
| **Authoritative** | Expertise without arrogance |
| **Dignified** | Respect for subjects and audience |
| **Urgent** | Importance without panic |
| **Inclusive** | Welcoming all supporters |
| **Clear** | Plain language, no jargon |

### Key Messages by Page

| Page | Primary Message |
|------|-----------------|
| **Homepage** | BVP advances justice for Black veterans. Join the movement. |
| **Who We Are** | Credible team, serious mission, growing coalition. |
| **Our Work** | Comprehensive strategy. Your story is evidence. |
| **Join Us** | Your story matters. It's easy. You belong. |
| **Donate** | Your contribution creates real impact. |
| **FAQ** | We have answers. Get involved. |

### Content Types

| Type | Source | Update Frequency |
|------|--------|------------------|
| Static copy | CMS | Quarterly review |
| Team/Board bios | Sanity CMS | As needed |
| Statistics | Sanity CMS | Quarterly |
| FAQs | Sanity CMS | As needed |
| Blog posts | Substack RSS | Per schedule |
| Partner logos | Sanity CMS | As needed |

---

## SUCCESS METRICS

### Performance (Technical)

| Metric | Target |
|--------|--------|
| Lighthouse Performance | > 90 |
| Lighthouse Accessibility | 100 |
| LCP | < 2.5s |
| CLS | < 0.1 |
| TTFB | < 600ms |

### Business (Conversion)

| Metric | Target |
|--------|--------|
| Newsletter signup rate | Track → improve |
| Story form completion | > 60% |
| Donate button CTR | > 3% |
| Bounce rate | < 40% |
| Avg session duration | > 2 min |
| Pages per session | > 2.5 |

---

## APPENDIX: TERMINOLOGY

| Term | Definition |
|------|------------|
| **Reparative Justice** | Addressing historical wrongs through acknowledgment, restitution, change |
| **GI Bill** | 1944 Servicemen's Readjustment Act providing veteran benefits |
| **Monk v. United States** | BVP's flagship lawsuit for Black veteran discrimination repair |
| **Theory of Change** | Framework connecting activities → outcomes → impact |

---

*Next: SPEC-02-architecture.md (Technical Stack & Structure)*
