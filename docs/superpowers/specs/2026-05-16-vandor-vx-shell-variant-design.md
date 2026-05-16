# Vandor and vx Landing Shell Variant Design

## Summary

Split the landing-site shell content between `Vandor` and `vx` without splitting the visual shell itself.

- `/` remains the `Vandor` landing
- `/vx/:version` remains the `vx` landing
- `/vx/:version/docs/*` keeps its separate Fumadocs layout

The header and footer should share one visual implementation, but their content must vary by landing context.

## Goals

- Keep one reusable shell for landing-page header behavior and footer layout
- Show `Vandor`-oriented navigation and footer content on `/`
- Show `vx`-oriented navigation and footer content on `/vx/:version`
- Preserve the `Vandor` logo as the root brand asset in both contexts
- Make the `vx` landing brand read as `Logo / vx`
- Keep route components small and focused

## Non-Goals

- Replace or redesign the Fumadocs docs shell
- Introduce a completely different visual layout for `Vandor` and `vx`
- Create new dedicated routes for every proposed nav item in this change
- Solve final copywriting for all marketing sections beyond shell content

## Scope

This design applies only to:

- `/`
- `/vx/:version`

This design does not apply to:

- `/vx/:version/docs/*`

## Design Direction

Use one shared landing shell implementation with variant-driven content.

The shell keeps:

- the current header layout
- the current mobile menu behavior
- the current scroll/floating-pill behavior
- the current footer layout rhythm

The variant controls:

- brand label rendering
- navigation items
- CTA labels and hrefs
- footer links
- footer descriptive copy if needed later

## Variant Model

Introduce one explicit variant type:

```ts
type SiteShellVariant = 'vandor' | 'vx'
```

The variant is a routing-level decision:

- `/` -> `vandor`
- `/vx/:version` -> `vx`

For `vx`, the shell content also depends on `requestedVersion` so links stay version-aware.

## Content Source

Create one source of truth for shell content, for example:

- `src/components/site-shell-content.ts`

This module should expose either:

- a config object keyed by variant, or
- helper builders that return content from variant plus optional version

Suggested output shape:

```ts
type ShellLink = {
  label: string
  href: string
}

type ShellCta = {
  label: string
  href: string
  variant?: 'primary' | 'secondary'
}

type ShellBrand =
  | { kind: 'vandor' }
  | { kind: 'vx' }

type SiteShellContent = {
  brand: ShellBrand
  navItems: ShellLink[]
  headerCtas: {
    secondary?: ShellCta
    primary?: ShellCta
  }
  footerLinks: ShellLink[]
}
```

## Header Design

Refactor the current landing header into a reusable shell component that receives content instead of hardcoding `vx` links.

Expected responsibilities:

- render the shared visual shell
- render mobile and desktop navigation from config
- render the brand treatment from config
- render CTA buttons from config
- keep existing scroll-state behavior internal to the component

Brand treatment rules:

- `vandor`: render `Logo + Vandor`
- `vx`: render `Logo + / + vx`

The `vx` brand still uses the `Vandor` logo. Only the text treatment changes.

## Footer Design

Refactor the current landing footer into a reusable shell footer with variant-driven content.

Expected responsibilities:

- render shared layout and spacing
- render the logo link back to `/`
- render footer links from config
- keep `Vandor` copyright

The footer should follow the same variant model as the header so landing pages remain internally consistent.

## Initial Navigation Content

### `vandor` on `/`

Header navigation:

- `About`
- `Products`
- `Open Source`
- `vx`

Header CTAs:

- `Read vx Docs`
- `Explore vx`

Footer links:

- `Vandor`
- `vx`
- `vx Docs`
- `Getting Started`
- `GitHub`

### `vx` on `/vx/:version`

Header navigation:

- `Overview`
- `Why vx`
- `Docs`
- `GitHub`

Header CTAs:

- `Read Docs`
- `Install vx`

Footer links:

- `vx Landing`
- `Documentation`
- `Getting Started`
- `CLI Reference`
- `GitHub`

## URL Strategy for Shell Links

For the first implementation, shell links may target a mix of:

- in-page anchors for sections on the current landing page
- version-aware docs URLs
- external URLs such as GitHub

Rules:

- `vandor` links to `vx` should default to `/vx/latest` or `/vx/latest/docs`
- `vx` links must use the active `requestedVersion`
- shell config must not assume docs routes own the landing shell

## Component Boundaries

Suggested boundaries:

- `src/components/header.tsx`
  - reusable landing header shell
- `src/components/footer-5.tsx`
  - reusable landing footer shell
- `src/components/site-shell-content.ts`
  - one source of truth for variant-driven shell content

Route consumers stay thin:

- `src/components/hero-section-4.tsx`
  - uses the `vandor` header shell content
- `src/components/home-landing.tsx`
  - uses the `vandor` footer shell content
- `src/features/vx/landing/vx-landing-page.tsx`
  - uses the `vx` header and footer shell content

If the current component names no longer fit, renaming is acceptable as long as route responsibilities remain small.

## Data Flow

### Vandor landing

- route `/` renders the root landing component
- landing component requests shell content for `vandor`
- header and footer render from the shared shell implementation

### vx landing

- route `/vx/:version` validates and loads `requestedVersion`
- `VxLandingPage` requests shell content for `vx` with `requestedVersion`
- header and footer render links using that version

### Docs

- docs routes remain unchanged
- docs keep using the dedicated Fumadocs layout

## Error Handling

- If a shell variant is unknown, fail at compile time through the variant union
- If `vx` shell content is requested without a valid `requestedVersion`, route validation remains the guard
- External links such as GitHub may be placeholders temporarily, but they should remain explicit in config

## Testing Strategy

Required verification baseline for this repo remains:

- `pnpm typecheck`

Implementation-oriented test focus:

- `vandor` shell renders `Logo + Vandor`
- `vx` shell renders `Logo / vx`
- `vandor` shell points `vx` links to `latest`
- `vx` shell points docs and install links to the active `requestedVersion`
- docs routes remain on their existing Fumadocs layout path

No docs-shell behavior should be regressed by this landing-shell refactor.

## Rollout Plan

1. Extract shell content into a variant-driven source module
2. Refactor header to consume variant content
3. Refactor footer to consume variant content
4. Update `/` landing to use the `vandor` shell content
5. Update `/vx/:version` landing to use the `vx` shell content
6. Run `pnpm typecheck`

## Open Decisions Already Resolved

- One visual shell, not two independent shell implementations
- `vandor` and `vx` differ by content, not by overall header/footer behavior
- `vx` brand text reads as `Logo / vx`
- Fumadocs docs pages stay on their own layout
