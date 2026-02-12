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
| Role | Font | Fallback | Usage |
|------|------|----------|-------|
| **Display** | Alverata | Georgia, serif | Headlines, stats |
| **Body** | Open Sans | system-ui, sans-serif | Paragraphs, UI |
| **CTA** | Linear Grotesk | system-ui, sans-serif | Buttons, labels |

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

### Section Spacing
- **Desktop:** 96px vertical padding
- **Mobile:** 48px vertical padding
- **Horizontal:** 48px desktop, 24px mobile

---

## BORDERS & SHADOWS

### Borders
| Style | Value | Usage |
|-------|-------|-------|
| Primary | 4px solid black | Cards, buttons, inputs |
| Secondary | 2px solid black | Dividers, dropdown items |
| Subtle | 1px solid gray-200 | Light separators |

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
| Variant | Background | Text | Border | Hover |
|---------|------------|------|--------|-------|
| Primary | Gold | Black | Gold | Black bg, white text |
| Secondary | Black | White | Black | Gold bg, black text |
| Outline | Transparent | Black | Black | Black bg, white text |
| Outline White | Transparent | White | White | White bg, black text |

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
