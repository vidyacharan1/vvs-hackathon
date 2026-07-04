---
name: Arogyam Health Intelligence
colors:
  surface: '#fcf8ff'
  surface-dim: '#dbd8e4'
  surface-bright: '#fcf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f5f2fe'
  surface-container: '#efecf8'
  surface-container-high: '#e9e6f3'
  surface-container-highest: '#e4e1ed'
  on-surface: '#1b1b23'
  on-surface-variant: '#464554'
  inverse-surface: '#303038'
  inverse-on-surface: '#f2effb'
  outline: '#767586'
  outline-variant: '#c7c4d7'
  surface-tint: '#494bd6'
  primary: '#4648d4'
  on-primary: '#ffffff'
  primary-container: '#6063ee'
  on-primary-container: '#fffbff'
  inverse-primary: '#c0c1ff'
  secondary: '#006591'
  on-secondary: '#ffffff'
  secondary-container: '#39b8fd'
  on-secondary-container: '#004666'
  tertiary: '#904900'
  on-tertiary: '#ffffff'
  tertiary-container: '#b55d00'
  on-tertiary-container: '#fffbff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e1e0ff'
  primary-fixed-dim: '#c0c1ff'
  on-primary-fixed: '#07006c'
  on-primary-fixed-variant: '#2f2ebe'
  secondary-fixed: '#c9e6ff'
  secondary-fixed-dim: '#89ceff'
  on-secondary-fixed: '#001e2f'
  on-secondary-fixed-variant: '#004c6e'
  tertiary-fixed: '#ffdcc5'
  tertiary-fixed-dim: '#ffb783'
  on-tertiary-fixed: '#301400'
  on-tertiary-fixed-variant: '#703700'
  background: '#fcf8ff'
  on-background: '#1b1b23'
  surface-variant: '#e4e1ed'
  brand-purple: '#7C3AED'
  brand-deep-blue: '#1E1B4B'
  status-critical: '#EF4444'
  status-warning: '#F59E0B'
  status-success: '#10B981'
typography:
  display-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.3'
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.4'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '500'
    lineHeight: '1.4'
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1.2'
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  container-max: 1280px
  gutter: 1.5rem
  margin-mobile: 1rem
  margin-desktop: 2.5rem
  stack-sm: 0.5rem
  stack-md: 1rem
  stack-lg: 2rem
---

## Brand & Style

The design system for this AI-powered healthcare management platform is built on the pillars of **Precision, Compassion, and Clarity**. It targets healthcare administrators, district officers, and medical professionals who require rapid, data-driven insights without cognitive overload.

The visual style is **Corporate / Modern** with a infusion of **Glassmorphism**. This combination establishes a professional, reliable atmosphere essential for healthcare, while utilizing translucent layers and soft blurs to signify the "intelligence" and "depth" of the underlying AI. The interface prioritizes high legibility and a systematic information hierarchy to ensure that critical life-saving data is never obscured.

## Colors

The palette is derived from the core brand identity, utilizing a sophisticated spectrum of purples and blues. 

- **Primary & Secondary:** A vibrant gradient bridging `#7C3AED` (Purple) and `#0EA5E9` (Blue) is used for high-impact actions, active states, and AI-driven features.
- **Neutral:** We utilize a refined grayscale based on cool slates (`#64748B`) to maintain a clean, clinical feel.
- **Semantic Colors:** Healthcare demands clear status indicators. We use a standardized set of high-visibility tones for "Critical" (Red), "High Risk" (Orange), and "Operational" (Green).
- **Backgrounds:** Pure white (`#FFFFFF`) is the primary surface color to ensure maximum contrast, with very soft lavender-tinted grays for secondary container backgrounds.

## Typography

This design system uses a dual-font strategy to balance character with utility.

- **Plus Jakarta Sans** is the headline face. Its soft, modern curves provide a welcoming, humanistic feel to the "Arogyam" brand, making the technology feel accessible rather than intimidating.
- **Inter** is used for all functional UI elements, body text, and data tables. Its exceptional legibility and neutral tone are perfect for the high-density information environments required for healthcare dashboards.

Scale headers aggressively on desktop to create a clear entry point, but ensure they collapse to readable sizes on tablet and mobile viewports. Use medium and semi-bold weights for labels to distinguish them from standard body text.

## Layout & Spacing

The layout follows a **Fixed-Fluid Hybrid** model. On desktop, the central content area is capped at 1280px to maintain line-length readability, while dashboard backgrounds and navigation elements may stretch to fill the viewport.

- **Grid:** A 12-column grid is used for the dashboard, allowing for flexible card layouts (spanning 3, 4, 6, or 12 columns).
- **Density:** Given the clinical nature of the product, we use a "Comfortable" density for marketing pages and a "Compact" density for the management dashboard to minimize scrolling during critical data review.
- **Breakpoints:**
  - Mobile: < 640px (1 column, 16px margins)
  - Tablet: 641px - 1024px (2 columns, 24px margins)
  - Desktop: > 1025px (12 columns, 40px margins)

## Elevation & Depth

To signify its modern, AI-first nature, this design system uses **Tonal Layering** combined with **Ambient Shadows**.

1.  **Level 0 (Base):** The primary canvas color, typically a very light gray or white.
2.  **Level 1 (Cards):** Use white surfaces with a very soft, diffused shadow (15% opacity, 20px blur, tinted with the primary blue) to create a "floating" effect.
3.  **Level 2 (Active/Floating UI):** Elements like modals or active dropdowns use a subtle **Glassmorphism** effect: a 10px backdrop blur combined with 80% opacity white fill and a 1px semi-transparent border.

Depth is used to separate high-level summaries (Level 1 cards) from interactive management tools (Level 2 overlays).

## Shapes

The shape language is consistently **Rounded**. 

The 0.5rem (8px) base radius provides a friendly and modern aesthetic that removes the "harshness" of traditional enterprise software. This radius should be applied to cards, input fields, and standard buttons. 

For high-level status indicators, "pill" shapes (full rounding) are used to distinguish them from interactive buttons. Complex components like "Feature Cards" may use `rounded-xl` (1.5rem) to emphasize their container status.

## Components

### Buttons
- **Primary:** Uses the purple-to-blue gradient. Includes a subtle "glow" shadow on hover.
- **Secondary:** Transparent background with a 1px border using the primary blue.
- **Ghost:** No border or background; text turns primary blue on hover.

### Cards
Cards are the primary container for data. They must feature a 1px light gray border (`#E2E8F0`) and the Level 1 shadow. Header areas within cards should be separated by a subtle horizontal rule.

### Input Fields
Standardized with an 8px radius. Active states use a 2px primary blue outline. Error states must include both a red border and a small icon for accessibility.

### AI Insights Chip
A specialized component for "AI Actions." These use a light purple background (`#F5F3FF`), a purple text color, and a small "sparkle" icon to denote an AI-generated suggestion.

### Data Tables
Tables use "Inter" at 14px. Rows feature a subtle zebra-striping on hover. Headers are persistent (sticky) during scroll and use `label-sm` styling.