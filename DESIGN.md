---
name: Vandor
description: A dark, restrained publication and product surface for Vandor and vx.
colors:
  background: "oklch(0 0 0)"
  foreground: "oklch(0.985 0 0)"
  card: "oklch(0.14 0 0)"
  muted: "oklch(0.18 0 0)"
  muted-foreground: "oklch(0.72 0 0)"
  border: "oklch(0.26 0 0)"
  ring: "oklch(0.78 0 0)"
typography:
  display:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.65rem, 6vw, 4.65rem)"
    fontWeight: 500
    lineHeight: 1
    letterSpacing: "-0.05em"
  headline:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "2rem"
    fontWeight: 500
    lineHeight: 1.08
    letterSpacing: "-0.04em"
  title:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.28rem"
    fontWeight: 500
    lineHeight: 1.45
    letterSpacing: "-0.03em"
  body:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.03rem"
    fontWeight: 400
    lineHeight: 1.92
    letterSpacing: "normal"
  label:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.94rem"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "normal"
rounded:
  sm: "0.625rem"
  md: "1rem"
  lg: "1.6rem"
spacing:
  sm: "0.5rem"
  md: "1rem"
  lg: "1.5rem"
  xl: "3.5rem"
components:
  button-ghost:
    backgroundColor: "{colors.background}"
    textColor: "{colors.muted-foreground}"
    rounded: "{rounded.sm}"
    padding: "0.5rem 0.75rem"
  news-card:
    backgroundColor: "{colors.card}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.md}"
    padding: "0.5rem"
  article-frame:
    backgroundColor: "{colors.background}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.lg}"
    padding: "0"
---

# Design System: Vandor

## Overview

**Creative North Star: "The Quiet Terminal Journal"**

Vandor is a dark, restrained brand surface for people who read carefully. The interface is not meant to perform sophistication through ornamental editorial tropes. It should feel calm, exact, and technically literate, with typography, spacing, and contrast doing the heavy lifting.

This system treats long-form content and product context as part of the same world, but not the same surface. The publication should feel quieter than the landing page and more atmospheric than the docs, while still remaining visibly part of Vandor. The effect is deliberate understatement, not neutrality.

The system explicitly rejects Substack clones, generic SaaS blog styling, serif-heavy magazine drama, glassmorphism, and over-polished startup aesthetics.

**Key Characteristics:**

- Dark, high-contrast, and restrained
- Typography-led hierarchy with minimal chrome
- Rounded geometry used sparingly, never as softness for its own sake
- Ambient depth through tonal layering, not glossy effects
- Product seriousness expressed through rhythm and spacing

## Colors

The palette is nearly monochrome, with softly tinted neutrals carrying hierarchy instead of accent colors.

### Primary

- **White Ink** (`oklch(0.985 0 0)`): Used for primary reading text, large headings, and the moments where content must feel fully present.

### Neutral

- **Black Field** (`oklch(0 0 0)`): The base canvas for the site and the dominant mood-setting surface.
- **Quiet Surface** (`oklch(0.14 0 0)`): Used for cards, inline code backgrounds, and contained surfaces that need subtle separation.
- **Soft Ash** (`oklch(0.18 0 0)`): Used for quiet fills, secondary hover states, and restrained containers.
- **Dim Reading Line** (`oklch(0.72 0 0)`): Used for summaries, metadata, and any text that should remain visible without competing with body copy.
- **Night Border** (`oklch(0.26 0 0)`): Used for dividers, frames, and subtle structural edges.

### Named Rules

**The One-Voice Rule.** The interface should feel monochrome at first glance. Color contrast comes from lightness shifts, not from introducing decorative accents.

## Typography

**Display Font:** Geist, ui-sans-serif, system-ui, sans-serif  
**Body Font:** Geist, ui-sans-serif, system-ui, sans-serif  
**Label/Mono Font:** No separate mono voice is required for publication surfaces unless a technical artifact explicitly earns it.

**Character:** Precise, quiet, and contemporary. The system relies on one committed sans family with strong control over scale, measure, and tracking, instead of pairing a display serif with a body sans.

### Hierarchy

- **Display** (500, `clamp(2.65rem, 6vw, 4.65rem)`, 1): Reserved for article titles and the rare top-level publication heading.
- **Headline** (500, `2rem`, 1.08): Used for major section headings inside long-form content.
- **Title** (500, `1.28rem`, 1.45): Used for story cards and smaller content headings.
- **Body** (400, `1.03rem`, 1.92): Used for long-form reading. Keep measure around `65–70ch`.
- **Label** (400, `0.94rem`, 1.5): Used for metadata and supporting context. Labels stay in normal case unless a specific UI control needs otherwise.

### Named Rules

**The No-False-Editorial Rule.** Do not reach for italic serif, aggressive uppercase labels, or magazine-like type tricks to simulate elegance. Elegance here comes from measure, cadence, and restraint.

## Elevation

Vandor uses tonal layering more than shadow. Depth comes from separating black field, quiet surface, and border values with small but disciplined lightness shifts. Shadows exist, but they should feel ambient rather than lifted or glossy.

### Shadow Vocabulary

- **Ambient Low** (`0 1px 2px rgba(0, 0, 0, 0.22)`): Used quietly on contained surfaces that need a touch of separation.
- **Ambient Soft** (`0 10px 30px rgba(0, 0, 0, 0.18)`): Used only where a section needs atmosphere, never as decorative glow.

### Named Rules

**The Flat-by-Default Rule.** Surfaces rest flat. If something lifts, it should be because state or hierarchy requires it, not because the design wants extra drama.

## Components

### Buttons

- **Shape:** Small radius (`0.625rem`) or pill only when the surrounding shell already uses that language.
- **Primary:** Bright foreground on dark ground. Primary actions should feel concise and precise, not loud.
- **Ghost:** Background stays near-transparent or near-black, text uses muted foreground until hover.
- **Hover / Focus:** State changes are tonal and understated. No glowing accent outlines or animated theatrics.

### Cards / Containers

- **Corner Style:** Rounded, but never plush. `1rem` is the standard contained-surface radius.
- **Background:** Use `card` only when a surface needs real separation.
- **Shadow Strategy:** Ambient only, if any.
- **Border:** Structural, soft, and low-contrast.
- **Internal Padding:** Tight enough to feel exact, never stuffed.

### Publication Cards

- **Style:** Image-led, then metadata, then title and summary.
- **Hierarchy:** Title should carry the card. Metadata stays quiet and always subordinate.
- **Interaction:** Hover may slightly scale imagery or warm the background, but must not turn the grid into a flashy feed.

### Article Surfaces

- **Layout:** Reading column first, chrome second.
- **Metadata Rail:** Quiet, narrow, and supportive. It should never feel like a sidebar from a docs site.
- **Cover Image:** Framed and present, but not oversized hero theater.
- **Body:** Typography carries the experience. Decorative containers around the prose should be avoided unless they genuinely improve reading.

### Navigation

- **Style:** Fixed shell, calm typography, strong contrast.
- **State:** Hover and active states should remain quiet and tonal.
- **Mobile Treatment:** Collapsed navigation may be more contained, but should not shift into glossy card language.

## Do's and Don'ts

### Do:

- **Do** keep labels in normal case when possible, especially on reading surfaces.
- **Do** let hierarchy come from spacing, scale, and lightness before adding new visual treatments.
- **Do** keep article body measure disciplined, around `65–70ch`, with generous line-height.
- **Do** use quiet borders and tonal surfaces to separate content instead of louder cards or banners.
- **Do** let product references stay contextual and secondary inside publication pages.

### Don't:

- **Don't** build Substack clones.
- **Don't** drift into generic SaaS blog styling.
- **Don't** use serif-heavy editorial magazine aesthetics to simulate elegance.
- **Don't** use glassmorphism.
- **Don't** lean on over-polished startup patterns such as loud pills, badge clutter, or decorative chrome around metadata.
- **Don't** use uppercase micro-labels as a default publication voice.
