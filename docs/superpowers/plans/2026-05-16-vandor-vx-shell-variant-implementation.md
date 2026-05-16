# Vandor and vx Shell Variant Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Split the landing header and footer content between `Vandor` and `vx` while keeping one shared visual shell for `/` and `/vx/:version`.

**Architecture:** Keep the existing landing header behavior and footer layout, but move all brand labels, navigation items, CTA labels, and footer links into one variant-driven content module. Route-facing landing components choose `vandor` or `vx`, while `vx` links remain version-aware through `requestedVersion`. Fumadocs docs routes remain untouched.

**Tech Stack:** TanStack Start, TanStack Router, React 19, TypeScript, Tailwind CSS, pnpm

---

## Constraints

- Do not run `vitest`
- Do not run `pnpm test`
- Required verification baseline is `pnpm typecheck`
- Apply this change only to `/` and `/vx/:version`
- Do not change the Fumadocs layout under `/vx/:version/docs/*`
- Keep the `Vandor` logo as the shared logo asset
- Render brand text as `Logo + Vandor` on `/`
- Render brand text as `Logo + / + vx` on `/vx/:version`

## File Structure

### Existing files to modify

- Modify: `src/components/header.tsx`
  - replace hardcoded `vx` menu data with variant-driven shell content
- Modify: `src/components/footer-5.tsx`
  - replace hardcoded footer links with variant-driven shell content
- Modify: `src/components/home-landing.tsx`
  - request `vandor` shell content and pass it to the footer
- Modify: `src/components/hero-section-4.tsx`
  - request `vandor` shell content and pass it to the header
- Modify: `src/components/landing-section.tsx`
  - optionally accept `id` props if a stable anchor target is useful
- Modify: `src/components/ui/rotating-gradient-right.tsx`
  - keep `vandor` CTA destinations aligned with the new shell content
- Modify: `src/features/vx/landing/vx-hero-section-2.tsx`
  - keep `vx` CTA destinations aligned with the new shell content
- Modify: `src/features/vx/landing/vx-landing-page.tsx`
  - request `vx` shell content using `requestedVersion` and pass it to header/footer
- Modify: `src/routes/-index.test.tsx`
  - only if static copy assertions become obviously stale after the shell text changes; do not run Vitest

### New files to create

- Create: `src/components/site-shell-content.ts`
  - one source of truth for `vandor` and `vx` shell content

### Files to leave alone

- Do not modify: `src/features/vx/docs/docs-layout.tsx`
- Do not modify: `src/routes/vx/$version/docs/index.tsx`
- Do not modify: `src/routes/vx/$version/docs/$.tsx`

---

## Chunk 1: Variant Content Foundation

### Task 1: Create the shared shell content module

**Files:**
- Create: `src/components/site-shell-content.ts`
- Reuse types from: `src/features/vx/versioning/version-types.ts`

- [ ] **Step 1: Create the variant and content types**

Add a focused content module with explicit types:

```ts
import type { RequestedVxVersion } from '#/features/vx/versioning/version-types'

export type SiteShellVariant = 'vandor' | 'vx'

export type SiteShellLink = {
  label: string
  href: string
}

export type SiteShellBrand =
  | { kind: 'vandor' }
  | { kind: 'vx' }

export type SiteShellContent = {
  brand: SiteShellBrand
  navItems: SiteShellLink[]
  headerCtas: {
    secondary?: SiteShellLink
    primary?: SiteShellLink
  }
  footerLinks: SiteShellLink[]
}
```

- [ ] **Step 2: Add one builder for `vandor` shell content**

Encode the agreed first-pass content:

```ts
const vandorShellContent: SiteShellContent = {
  brand: { kind: 'vandor' },
  navItems: [
    { label: 'About', href: '/#about' },
    { label: 'Products', href: '/#products' },
    { label: 'Open Source', href: '/vx/latest/docs' },
    { label: 'vx', href: '/vx/latest' },
  ],
  headerCtas: {
    secondary: { label: 'Read vx Docs', href: '/vx/latest/docs' },
    primary: { label: 'Explore vx', href: '/vx/latest' },
  },
  footerLinks: [
    { label: 'Vandor', href: '/' },
    { label: 'vx', href: '/vx/latest' },
    { label: 'vx Docs', href: '/vx/latest/docs' },
    { label: 'Getting Started', href: '/vx/latest/docs/getting-started' },
    { label: 'GitHub', href: '#' },
  ],
}
```

- [ ] **Step 3: Add one builder for `vx` shell content**

Make every product link version-aware:

```ts
function buildVxShellContent(
  requestedVersion: RequestedVxVersion,
): SiteShellContent {
  return {
    brand: { kind: 'vx' },
    navItems: [
      { label: 'Overview', href: `/vx/${requestedVersion}#overview` },
      { label: 'Why vx', href: `/vx/${requestedVersion}#why-vx` },
      { label: 'Docs', href: `/vx/${requestedVersion}/docs` },
      { label: 'GitHub', href: '#' },
    ],
    headerCtas: {
      secondary: { label: 'Read Docs', href: `/vx/${requestedVersion}/docs` },
      primary: {
        label: 'Install vx',
        href: `/vx/${requestedVersion}/docs/getting-started`,
      },
    },
    footerLinks: [
      { label: 'vx Landing', href: `/vx/${requestedVersion}` },
      { label: 'Documentation', href: `/vx/${requestedVersion}/docs` },
      {
        label: 'Getting Started',
        href: `/vx/${requestedVersion}/docs/getting-started`,
      },
      { label: 'CLI Reference', href: `/vx/${requestedVersion}/docs` },
      { label: 'GitHub', href: '#' },
    ],
  }
}
```

- [ ] **Step 4: Export one narrow public helper**

Keep call sites small:

```ts
export function getSiteShellContent(input: {
  variant: 'vandor'
}): SiteShellContent
export function getSiteShellContent(input: {
  variant: 'vx'
  requestedVersion: RequestedVxVersion
}): SiteShellContent
```

The implementation should return `vandorShellContent` for `/` and `buildVxShellContent(requestedVersion)` for `vx`.

- [ ] **Step 5: Run typecheck**

Run: `pnpm typecheck`
Expected: PASS

- [ ] **Step 6: Commit**

```bash
git add src/components/site-shell-content.ts
git commit -m "feat: add vandor and vx shell content config"
```

---

## Chunk 2: Header Refactor

### Task 2: Make the header consume shell content instead of hardcoded menu items

**Files:**
- Modify: `src/components/header.tsx`
- Create dependency on: `src/components/site-shell-content.ts`

- [ ] **Step 1: Replace the hardcoded `menuItems` array with typed props**

Refactor the public component contract:

```ts
import type { SiteShellContent } from '#/components/site-shell-content'

type HeroHeaderProps = {
  content: SiteShellContent
}

export const HeroHeader = ({ content }: HeroHeaderProps) => {
  // existing state and motion logic stays here
}
```

Do not move scroll behavior or mobile-menu behavior out of this file.

- [ ] **Step 2: Render brand text from `content.brand`**

Create one small internal renderer in `src/components/header.tsx`:

```ts
function HeaderBrand({ brand }: { brand: SiteShellContent['brand'] }) {
  if (brand.kind === 'vandor') {
    return (
      <div className="flex items-center gap-2">
        <Logo className="w-fit" />
        <span className="font-semibold text-lg">Vandor</span>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-2">
      <Logo className="w-fit" />
      <span className="text-muted-foreground">/</span>
      <span className="font-semibold text-lg">vx</span>
    </div>
  )
}
```

Use this renderer in both the mobile brand area and the floating pill brand area.

- [ ] **Step 3: Render nav items from `content.navItems`**

Change `NavItems` to:

```ts
const NavItems = ({ items }: { items: SiteShellContent['navItems'] }) => (
  <ul className="flex gap-1 max-lg:flex-col">
    {items.map((item) => (
      <li key={item.label}>...</li>
    ))}
  </ul>
)
```

Use `item.label` instead of `item.name`.

- [ ] **Step 4: Render CTA buttons from `content.headerCtas`**

Replace the current hardcoded links:

- `Read Docs`
- `Install vx`

with config-driven rendering:

```ts
const { secondary, primary } = content.headerCtas
```

Render each CTA only when present so the shell stays future-proof.

- [ ] **Step 5: Keep root brand link destinations stable**

Use:

- `href="/"` for the mobile brand link
- `href="/"` for the floating pill brand link

Do not route the brand link to `/vx/:version`; only the brand text changes by variant.

- [ ] **Step 6: Run typecheck**

Run: `pnpm typecheck`
Expected: PASS

- [ ] **Step 7: Commit**

```bash
git add src/components/header.tsx
git commit -m "feat: make landing header variant-driven"
```

---

## Chunk 3: Footer Refactor

### Task 3: Make the footer consume shell content instead of hardcoded `vx` links

**Files:**
- Modify: `src/components/footer-5.tsx`
- Create dependency on: `src/components/site-shell-content.ts`

- [ ] **Step 1: Replace the module-level `links` array with typed props**

Refactor the footer signature:

```ts
import type { SiteShellContent } from '#/components/site-shell-content'

type Footer5Props = {
  content: Pick<SiteShellContent, 'footerLinks'>
}

export default function Footer5({ content }: Footer5Props) {
  // existing footer layout stays here
}
```

- [ ] **Step 2: Render footer links from `content.footerLinks`**

Update the footer loop:

```ts
{content.footerLinks.map((link) => (
  <a key={link.label} href={link.href}>...</a>
))}
```

Do not leave fallback hardcoded `vx` links in this file.

- [ ] **Step 3: Keep the shared logo and root home link**

Retain:

- `LogoIcon`
- `href="/"` on the logo link
- `&copy; 2026 Vandor.`

This file is a shell footer, not a product-specific footer implementation.

- [ ] **Step 4: Run typecheck**

Run: `pnpm typecheck`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/components/footer-5.tsx
git commit -m "feat: make landing footer variant-driven"
```

---

## Chunk 4: Wire the Vandor Landing

### Task 4: Pass `vandor` shell content into the root landing header and footer

**Files:**
- Modify: `src/components/hero-section-4.tsx`
- Modify: `src/components/home-landing.tsx`
- Modify: `src/components/landing-section.tsx`
- Modify: `src/components/ui/rotating-gradient-right.tsx`

- [ ] **Step 1: Request `vandor` shell content in the Vandor hero**

In `src/components/hero-section-4.tsx`, replace the no-prop header usage:

```ts
import { getSiteShellContent } from '#/components/site-shell-content'

const shellContent = getSiteShellContent({ variant: 'vandor' })
```

Render:

```tsx
<HeroHeader content={shellContent} />
```

- [ ] **Step 2: Point the hero CTA to the agreed `vandor` product target**

Change the default prop from:

```ts
installHref = '/vx/latest'
```

and remove placeholder destinations such as `#link` from the Vandor landing path.

- [ ] **Step 3: Pass the same `vandor` shell content into the footer**

In `src/components/home-landing.tsx`:

```ts
const shellContent = getSiteShellContent({ variant: 'vandor' })
```

Render:

```tsx
<Footer5 content={shellContent} />
```

- [ ] **Step 4: Add only the minimum anchor support needed by `vandor` nav items**

If `/#about` and `/#products` stay in the config, make them real targets by adding an optional `id` prop to `LandingSection` or the relevant section root.

Minimum acceptable targets:

- hero section -> `about`
- product showcase section -> `products`

Do not invent new content sections just to satisfy these links.

- [ ] **Step 5: Keep the `Read the vx docs` CTA aligned with the shell destinations**

In `src/components/ui/rotating-gradient-right.tsx`, keep:

- default docs href at `/vx/latest/docs`
- copy focused on `Vandor` as the organization and `vx` as the product

- [ ] **Step 6: Run typecheck**

Run: `pnpm typecheck`
Expected: PASS

- [ ] **Step 7: Commit**

```bash
git add src/components/hero-section-4.tsx src/components/home-landing.tsx src/components/landing-section.tsx src/components/ui/rotating-gradient-right.tsx
git commit -m "feat: wire vandor landing shell variant"
```

---

## Chunk 5: Wire the vx Landing

### Task 5: Pass `vx` shell content into the product landing header and footer

**Files:**
- Modify: `src/features/vx/landing/vx-landing-page.tsx`
- Modify: `src/features/vx/landing/vx-hero-section-2.tsx`
- Modify: `src/components/landing-section.tsx`

- [ ] **Step 1: Request `vx` shell content using `requestedVersion`**

In `src/features/vx/landing/vx-landing-page.tsx`:

```ts
import { getSiteShellContent } from '#/components/site-shell-content'

const shellContent = getSiteShellContent({
  variant: 'vx',
  requestedVersion,
})
```

Render:

```tsx
<HeroHeader content={shellContent} />
<Footer5 content={shellContent} />
```

- [ ] **Step 2: Keep landing CTAs version-aware**

In `src/features/vx/landing/vx-hero-section-2.tsx`, make sure:

- install CTA -> `/vx/${requestedVersion}/docs/getting-started`
- docs CTA -> `/vx/${requestedVersion}/docs`

Do not regress the current `requestedVersion` handling.

- [ ] **Step 3: Add only the minimum anchor support needed by `vx` nav items**

If `#overview` and `#why-vx` remain in the config, add stable IDs to the closest existing section roots.

Minimum acceptable targets:

- hero section -> `overview`
- footer section wrapper or existing lower landing section -> `why-vx`

If there is no honest target for `why-vx`, point that menu item back to `/vx/${requestedVersion}` instead of creating fake content.

- [ ] **Step 4: Keep docs routes out of scope**

Do not edit:

- `src/features/vx/docs/docs-layout.tsx`
- `src/routes/vx/$version/docs/index.tsx`
- `src/routes/vx/$version/docs/$.tsx`

- [ ] **Step 5: Run typecheck**

Run: `pnpm typecheck`
Expected: PASS

- [ ] **Step 6: Commit**

```bash
git add src/features/vx/landing/vx-landing-page.tsx src/features/vx/landing/vx-hero-section-2.tsx src/components/landing-section.tsx
git commit -m "feat: wire vx landing shell variant"
```

---

## Chunk 6: Static Assertion Cleanup and Verification

### Task 6: Update obvious stale assertions and verify the final state

**Files:**
- Modify: `src/routes/-index.test.tsx`
- Review: `src/components/header.tsx`
- Review: `src/components/footer-5.tsx`
- Review: `src/components/site-shell-content.ts`

- [ ] **Step 1: Inspect the existing homepage test for stale assumptions**

If the text assertions still match after the shell change, leave the file untouched.

If the assertions become stale because the shell labels changed, update only the obvious text expectations. Do not expand test scope in this task.

- [ ] **Step 2: Do not run Vitest**

Follow repo rules:

- do not run `vitest`
- do not run `pnpm test`

This task is static cleanup only.

- [ ] **Step 3: Run the required repo verification**

Run: `pnpm typecheck`
Expected: PASS

- [ ] **Step 4: Review the final user-facing outcomes in code**

Confirm from the code that:

- `/` uses `Logo + Vandor`
- `/vx/:version` uses `Logo + / + vx`
- `vandor` links point to `latest` for `vx`
- `vx` links stay version-aware
- docs layout files were not modified

- [ ] **Step 5: Commit**

```bash
git add src/routes/-index.test.tsx src/components/header.tsx src/components/footer-5.tsx src/components/site-shell-content.ts src/components/home-landing.tsx src/components/hero-section-4.tsx src/components/landing-section.tsx src/components/ui/rotating-gradient-right.tsx src/features/vx/landing/vx-landing-page.tsx src/features/vx/landing/vx-hero-section-2.tsx
git commit -m "chore: finalize vandor and vx landing shell variants"
```

---

## Execution Notes

- Implement chunk by chunk
- Keep `site-shell-content.ts` as the only source of shell copy and hrefs
- Do not duplicate nav arrays between header and footer consumers
- Do not move docs-layout logic into the landing shell
- Do not create extra route files for this refactor
- Prefer honest stable hrefs over fake placeholders
- If a nav item has no good anchor target yet, point it to the nearest stable page-level destination
- Use `pnpm typecheck` after each task group

## Expected End State

- `/` renders the shared landing shell with `vandor` content
- `/vx/:version` renders the shared landing shell with `vx` content
- Header visuals stay shared, but labels and links differ by variant
- Footer visuals stay shared, but links differ by variant
- The shared logo remains the Vandor logo in both contexts
- `vx` shell links remain aware of `requestedVersion`
- Fumadocs docs pages remain on their own layout
- `pnpm typecheck` passes
