# BVP SPEC 05: INTEGRATIONS
## Substack, Action Network, Zapier, Donately, Sanity

---

## INTEGRATION MAP

```
┌─────────────────┐     ┌──────────────────┐
│  Newsletter     │────▶│  Zapier Webhook  │────▶ Substack Subscribe
│  Form           │     └──────────────────┘
└─────────────────┘

┌─────────────────┐     ┌──────────────────┐
│  Join Us Form   │────▶│  Action Network  │────▶ Member Database
│                 │     │  API             │
└─────────────────┘     └──────────────────┘

┌─────────────────┐     ┌──────────────────┐
│  Blog Section   │◀────│  Substack RSS    │
│  (Homepage)     │     │  Feed            │
└─────────────────┘     └──────────────────┘

┌─────────────────┐     ┌──────────────────┐
│  Donate Button  │────▶│  Donately        │ (hosted page)
└─────────────────┘     └──────────────────┘

┌─────────────────┐
│  All CMS Data   │◀──── Sanity.io
└─────────────────┘
```

---

## 1. SUBSTACK RSS (Blog Feed)

### Purpose
Display latest blog posts on homepage without managing separate blog.

### Source URL
```
https://legaldefensefund.substack.com/feed
```

### Implementation
```typescript
// lib/substack.ts

interface SubstackPost {
  title: string;
  link: string;
  pubDate: string;
  description: string;
  image?: string;
}

export async function getSubstackPosts(limit = 3): Promise<SubstackPost[]> {
  const res = await fetch('https://legaldefensefund.substack.com/feed', {
    next: { revalidate: 3600 } // Cache 1 hour
  });
  const xml = await res.text();
  // Parse XML, extract items, return formatted
}
```

### Display
- 3 most recent posts
- Card: Image (if available), Date, Title, Excerpt (truncated)
- Click opens Substack in new tab

---

## 2. ACTION NETWORK (Story Form)

### Purpose
Collect story submissions, build member database for advocacy.

### Approach
Custom form UI → Server API → Action Network API

### Form Fields
| Field | Type | Required | AN Mapping |
|-------|------|----------|------------|
| Name | text | Yes | given_name, family_name |
| Email | email | Yes | email_addresses[0] |
| Relationship | select | Yes | custom_fields.relationship |
| Story | textarea | No | custom_fields.story |
| Consent | checkbox | Yes | (validation only) |

### Relationship Options
- Black veteran
- Family member of a Black veteran
- Descendant of a Black veteran
- Ally / Supporter

### API Implementation
```typescript
// app/api/join/route.ts

export async function POST(request: NextRequest) {
  const data = await request.json();
  
  // 1. Honeypot check
  if (data.website) {
    return NextResponse.json({ success: true }); // Fake success for bots
  }
  
  // 2. Validate required fields
  if (!data.name || !data.email || !data.relationship) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }
  
  // 3. Submit to Action Network
  const response = await fetch(
    `https://actionnetwork.org/api/v2/forms/${FORM_ID}/submissions`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'OSDI-API-Token': process.env.ACTION_NETWORK_API_KEY,
      },
      body: JSON.stringify({
        person: {
          given_name: data.name.split(' ')[0],
          family_name: data.name.split(' ').slice(1).join(' '),
          email_addresses: [{ address: data.email }],
          custom_fields: {
            relationship: data.relationship,
            story: data.story || '',
          }
        },
        add_tags: ['website-signup', 'story-submitted'],
      }),
    }
  );
  
  if (!response.ok) {
    return NextResponse.json({ error: 'Submission failed' }, { status: 500 });
  }
  
  return NextResponse.json({ success: true });
}
```

### Success Flow
1. Form validates
2. Submit to /api/join
3. Show loading state
4. On success: Show confirmation, suggest next actions
5. On error: Show error message, allow retry

---

## 3. ZAPIER (Newsletter → Substack)

### Purpose
Sync newsletter signups to Substack subscriber list.

### Flow
```
Newsletter Form → /api/newsletter → Zapier Webhook → Substack
```

### API Implementation
```typescript
// app/api/newsletter/route.ts

export async function POST(request: NextRequest) {
  const data = await request.json();
  
  // Honeypot
  if (data.website) {
    return NextResponse.json({ success: true });
  }
  
  // Validate email
  if (!data.email || !isValidEmail(data.email)) {
    return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
  }
  
  // Send to Zapier
  await fetch(process.env.ZAPIER_NEWSLETTER_WEBHOOK, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: data.name || '',
      email: data.email,
      source: 'website',
      timestamp: new Date().toISOString(),
    }),
  });
  
  return NextResponse.json({ success: true });
}
```

### Zapier Setup
1. **Trigger:** Webhooks by Zapier → Catch Hook
2. **Action:** Substack → Add Subscriber
3. **Field Mapping:** name → Name, email → Email

---

## 4. DONATELY (Donations)

### Purpose
Accept donations without handling payments.

### Approach
Link to hosted Donately page (recommended for simplicity + PCI compliance).

### Implementation
```typescript
const DONATELY_URL = 'https://www.donately.com/donate/blackveteransproject';

// In component
<Button onClick={() => window.open(DONATELY_URL, '_blank')}>
  Donate Now →
</Button>
```

### Alternative (Embed)
If preferred, Donately offers embeddable widgets:
```html
<div class="donately-donation-form" data-donately-id="xxx"></div>
<script src="https://cdn.donately.com/widget.js"></script>
```

---

## 5. SANITY CMS

### Purpose
Manage dynamic content (team, board, FAQs, stats, partners).

### Content Types

**Team Member**
```
- name (string, required)
- title (string, required)
- photo (image, hotspot)
- bio (text)
- category (leadership | staff)
- order (number)
```

**Board Member**
```
- name (string, required)
- title (string)
- affiliation (string)
- photo (image)
- bio (text)
- order (number)
```

**FAQ**
```
- question (string, required)
- answer (text, required)
- category (about | monk-case | eligibility | involvement)
- order (number)
```

**Stat**
```
- number (string, e.g., "$100B+")
- label (string)
- context (string)
- location (homepage | our-work | case-for-repair)
- order (number)
```

**Partner**
```
- name (string, required)
- logo (image, required)
- url (url)
- category (legal | academic | community)
- order (number)
```

### Example Query
```groq
// Get team members
*[_type == "teamMember"] | order(order asc) {
  _id,
  name,
  title,
  "photo": photo.asset->url,
  bio,
  category
}
```

### Revalidation
- Sanity webhook triggers /api/revalidate on publish
- ISR rebuilds affected pages

---

## CREDENTIALS CHECKLIST

| Service | What You Need | Where to Get |
|---------|---------------|--------------|
| Sanity | Project ID, Dataset, API Token | sanity.io dashboard |
| Action Network | API Key, Form ID | actionnetwork.org settings |
| Zapier | Webhook URL | Create new Zap |
| Donately | Account ID or donate URL | donately.com dashboard |
| Substack | RSS URL (public) | yourpub.substack.com/feed |

---

*Next: [SPEC-06-requirements.md](./SPEC-06-requirements.md)*
