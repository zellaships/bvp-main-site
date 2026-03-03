# BVP SPEC 03: DESIGN SYSTEM
## Colors, Typography, Spacing & Components

---

## COLOR PALETTE

### Primary Colors
| Name | Hex | CSS Variable | Usage |
|------|-----|--------------|-------|
| **BVP Gold** | `#FDC500` | `--bvp-gold` | Primary accent, CTAs, highlights, stat numbers |
| **BVP Navy** | `#232651` | `--bvp-navy` | Secondary backgrounds, contrast sections |
| **Black** | `#000000` | `--bvp-black` | Text, headers, borders, dark backgrounds |
| **White** | `#FFFFFF` | `--bvp-white` | Backgrounds, reverse text |

### Supporting Colors
| Name | Hex | Usage |
|------|-----|-------|
| Gold Light | `#F4E7C3` | Light gold tints |
| Success Green | `#56C035` | Positive indicators |
| Gray 100 | `#F3F4F6` | Section backgrounds |
| Gray 500 | `#6B7280` | Secondary text |
| Gray 900 | `#111827` | Footer background |

### Color Rules
- Gold is the hero—use sparingly for maximum impact
- Black 4px borders define the visual language
- White space is a color—use generously
- Never gold text on white (accessibility)

---

## TYPOGRAPHY

### Font Stack
| Role | Font | Fallback | Tailwind Class | Usage |
|------|------|----------|----------------|-------|
| **Display** | Alverata | Georgia, serif | `font-display` / `font-alverata` | Headlines, stats |
| **Display Alt** | Gunterz | Georgia, serif | `font-gunterz` | Bold military-inspired headlines |
| **Body** | Linear Grotesk | system-ui, sans-serif | `font-body` / `font-linear` | Paragraphs, UI text |
| **CTA** | Ontika | system-ui, sans-serif | `font-cta` / `font-ontika` | Buttons, labels, CTAs |

### Type Scale

| Name | Desktop | Mobile | Line Height | Use For |
|------|---------|--------|-------------|---------|
| Display XL | 72px | 48px | 1.1 | Hero headlines |
| Display LG | 60px | 40px | 1.1 | Page titles |
| Display MD | 48px | 32px | 1.2 | Section headers |
| Display SM | 36px | 28px | 1.2 | Subsection headers |
| Body XL | 24px | 20px | 1.6 | Lead paragraphs |
| Body LG | 20px | 18px | 1.6 | Body copy |
| Body MD | 16px | 16px | 1.6 | Default text |
| Body SM | 14px | 14px | 1.5 | Captions, meta |
| Label | 12px | 12px | 1.4 | Eyebrows (uppercase) |

### Typography Rules
- ALL CAPS only for labels/eyebrows, never headlines
- Max line length: 65-70 characters
- Letter spacing: -0.02em for display, 0.1em for labels
- Never center body text longer than 2 lines

---

## iOS HIG MOBILE GUIDELINES

### Interactive Text Minimum: 17px
All interactive text (buttons, links, navigation) must be **17px minimum** on mobile to meet Apple Human Interface Guidelines.

| Element | Minimum Size | Tailwind Class | Notes |
|---------|-------------|----------------|-------|
| Button text | 17px | `text-[17px]` | All interactive buttons |
| Link text | 17px | `text-[17px]` | Tappable links |
| Navigation | 17px | `text-[17px]` | Menu items, tabs |
| Form labels | 17px | `text-[17px]` | Interactive labels |
| Form inputs | 16px | `text-base` | Prevents iOS Safari zoom |

### Mobile-First Pattern
Use larger text on mobile, optionally reduce on desktop:
```tsx
// Interactive text: 17px on mobile, can reduce on desktop
className="text-[17px] md:text-sm"

// Form inputs: 16px minimum everywhere
className="text-base"
```

### Touch Targets: 44×44px Minimum
All interactive elements must have a minimum touch target of **44×44 pixels** on mobile.

| Element | Implementation | Tailwind |
|---------|---------------|----------|
| Buttons | Height + padding | `min-h-[44px]` |
| Links | Padding or min-height | `min-h-[44px] py-2` |
| Form inputs | Height | `min-h-[44px]` or `min-h-[48px]` |
| Icon buttons | Width + height | `w-11 h-11` (44px) |
| Checkboxes | Touch wrapper | `w-11 h-11` |

### Form Input Zoom Prevention
iOS Safari zooms the page when focusing on inputs with text smaller than 16px. Always use:
```tsx
// Form inputs - 16px minimum
className="text-base min-h-[44px]"

// Select dropdowns
className="text-base min-h-[44px]"

// Textareas
className="text-base"
```

### What CAN Be Smaller
Non-interactive elements can use smaller sizes:
- Eyebrow labels: 12px (`text-xs`)
- Captions: 12-14px (`text-xs`, `text-sm`)
- Timestamps: 12-14px
- Static metadata: 14px

---

## SPACING SYSTEM

**Base Unit:** 4px

| Token | Value | Usage |
|-------|-------|-------|
| `space-1` | 4px | Minimum |
| `space-2` | 8px | Tight |
| `space-4` | 16px | Component padding |
| `space-6` | 24px | Card padding (mobile) |
| `space-8` | 32px | Card padding (desktop) |
| `space-12` | 48px | Section padding (mobile) |
| `space-24` | 96px | Section padding (desktop) |

### Section Spacing (Fluid with clamp())
The site uses fluid responsive design with `clamp()` for smooth scaling.

| Size | Clamp Value | Range |
|------|-------------|-------|
| `sm` | `clamp(3rem, 6vw, 4rem)` | 48px → 64px |
| `md` | `clamp(4rem, 8vw, 5rem)` | 64px → 80px |
| `lg` | `clamp(5rem, 10vw, 8rem)` | 80px → 128px |

**Horizontal Padding:** `clamp(1.5rem, 4vw, 3rem)` → 24px → 48px

---

## BORDERS & SHADOWS

### Borders
| Style | Value | Tailwind | Usage |
|-------|-------|----------|-------|
| Heavy | 4px solid black | `border-4` | Cards, section dividers |
| Primary | 2px solid black | `border-2` | Buttons, inputs |
| Subtle | 1px solid gray-200 | `border` | Light separators |

### Shadows
| Style | Value | Usage |
|-------|-------|-------|
| Card Hover | `0 10px 40px rgba(0,0,0,0.15)` | Hoverable cards |
| Dropdown | `0 4px 20px rgba(0,0,0,0.1)` | Nav dropdowns |

---

## ANIMATION

### Entrance Animation
```css
@keyframes fade-up {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

duration: 400ms
easing: cubic-bezier(0.16, 1, 0.3, 1) /* ease-out-expo */
```

### Stagger Pattern
- 1st element: 0ms
- 2nd element: 75ms
- 3rd element: 150ms
- 4th element: 225ms

### Hover Transitions
- Duration: 200ms
- Easing: ease-out
- Properties: transform, background-color, border-color

### Scroll Animations
- Trigger: 10% in viewport
- Animation: fade-up
- Once: true (don't replay)

---

## COMPONENT VARIANTS

### Button
All buttons use `border-2` (2px), `rounded-full`, and 44px min touch target on mobile.

| Variant | Background | Text | Border | Hover |
|---------|------------|------|--------|-------|
| `primary` | Gold #FDC500 | Black | Gold | Black bg, gold text |
| `primary-light` | Gold #FDC500 | Black | Gold | White bg |
| `secondary` | Black | White | Black | Gold bg, black text |
| `outline` | Transparent | Black | Black | Black bg, white text |
| `outline-white` | Transparent | White | Gold | Gold bg, black text |
| `white` | White | Black | White | Black bg, white text |
| `accent` | Orange #F44708 | White | Orange | White bg, orange text |

#### Button Sizes
| Size | Padding | Font Size | Min Height (Mobile) |
|------|---------|-----------|---------------------|
| `sm` | px-6 py-3 | text-base (16px) | 44px |
| `md` | px-8 py-3.5 | text-lg (18px) | 48px |
| `lg` | px-10 py-4 | text-xl (20px) | 52px |

### Card
| Variant | Background | Border | Text |
|---------|------------|--------|------|
| Default | White | Black | Black |
| Dark | Black | Black | White |
| Gold | Gold | Gold | Black |
| Navy | Navy | Navy | White |

### Section
| Variant | Background | Text |
|---------|------------|------|
| White | White | Black |
| Gray | Gray 100 | Black |
| Black | Black | White |
| Gold | Gold | Black |
| Navy | Navy | White |

---

## RESPONSIVE BREAKPOINTS

| Name | Width | Target |
|------|-------|--------|
| `sm` | 640px | Large phones |
| `md` | 768px | Tablets |
| `lg` | 1024px | Small laptops |
| `xl` | 1280px | Laptops |
| `2xl` | 1536px | Large screens |

**Approach:** Mobile-first (default styles = mobile, add at breakpoints)

---

*Next: [SPEC-04-pages.md](./SPEC-04-pages.md)*
