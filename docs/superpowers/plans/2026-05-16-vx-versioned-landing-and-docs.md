# vx Versioned Landing and Docs Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a shared `vx` landing at `/vx/:version` and versioned Fumadocs docs at `/vx/:version/docs/*`, with `latest` staying in the URL while resolving to the highest concrete docs version.

**Architecture:** Keep `Vandor` as the root site and add a dedicated `vx` subtree inside the existing TanStack Start app. Centralize version resolution in one feature module, share one `vx` landing across all supported versions, and mount one Fumadocs integration that reads content from version-specific docs folders based on the resolved version.

**Tech Stack:** TanStack Start, TanStack Router, React 19, TypeScript, Fumadocs, pnpm

---

## Constraints

- Do not run `vitest`
- Do not run `pnpm test`
- Required verification baseline is `pnpm typecheck`
- Unknown `:version` must return `404`
- `latest` must stay in the URL and resolve internally to the highest concrete version
- `/vx/:version` uses one shared landing page
- Only docs content varies by version

## File Structure

### Existing files to modify

- Modify: `package.json`
  - add Fumadocs dependencies and any docs-specific scripts only if required
- Modify: `src/routes/__root.tsx`
  - keep root shell stable if docs subtree needs shared head metadata helpers
- Modify: `src/routes/index.tsx`
  - keep `Vandor` root landing intact while linking to `vx` routes when needed
- Modify: `src/components/header.tsx`
  - optional nav entry to `vx` or `vx/latest/docs`
- Modify: `src/components/footer-5.tsx`
  - optional docs/product links

### New routing files

- Create: `src/routes/vx/$version/index.tsx`
  - shared `vx` landing route entry
- Create: `src/routes/vx/$version/docs/route.tsx` or the equivalent Fumadocs route entry TanStack Start requires
  - docs subtree entry for versioned docs
- Create: `src/routes/vx/$version/docs/[...slug].tsx` or the equivalent catch-all route TanStack Start requires
  - docs page renderer entry

### New feature modules

- Create: `src/features/vx/versioning/versions.ts`
  - source of truth for supported versions and `latest`
- Create: `src/features/vx/versioning/resolve-version.ts`
  - version validation and `latest` resolution helpers
- Create: `src/features/vx/versioning/version-types.ts`
  - narrow version types shared by routes and docs modules
- Create: `src/features/vx/landing/vx-landing-page.tsx`
  - shared `vx` landing UI
- Create: `src/features/vx/landing/vx-landing-content.ts`
  - content/config for the shared landing
- Create: `src/features/vx/docs/docs-source.ts`
  - maps resolved versions to content roots
- Create: `src/features/vx/docs/docs-layout.tsx`
  - shared docs shell for Fumadocs inside this app
- Create: `src/features/vx/docs/load-doc-page.ts`
  - content lookup by resolved version + slug
- Create: `src/features/vx/docs/docs-metadata.ts`
  - version-aware docs titles, labels, and breadcrumbs

### New docs content files

- Create: `content/docs/v0/...`
- Create: `content/docs/v1/...`
- Create: `content/docs/v2/...`

Start with a minimal set of pages per version:

- `index.mdx`
- `getting-started.mdx`

There must be no `content/docs/latest/...` folder.

### New documentation files

- Create or modify: `AGENTS.md`
  - add note that `pnpm typecheck` is the required verification command for this work
- Modify: `docs/superpowers/specs/2026-05-16-vx-versioned-landing-and-docs-design.md`
  - only if the implementation reveals a necessary spec correction

---

## Chunk 1: Versioning Foundation

### Task 1: Add the version source of truth

**Files:**
- Create: `src/features/vx/versioning/versions.ts`
- Create: `src/features/vx/versioning/version-types.ts`

- [ ] **Step 1: Create the version types file**

Add a focused type module:

```ts
export const concreteDocVersions = ['v0', 'v1', 'v2'] as const
export type ConcreteDocVersion = (typeof concreteDocVersions)[number]
export type RequestedVxVersion = ConcreteDocVersion | 'latest'
```

- [ ] **Step 2: Create the version source-of-truth file**

Export the shared constants:

```ts
import { concreteDocVersions } from './version-types'

export const supportedDocVersions = [...concreteDocVersions, 'latest'] as const
export const latestDocVersion = concreteDocVersions[concreteDocVersions.length - 1]
```

- [ ] **Step 3: Run typecheck**

Run: `pnpm typecheck`
Expected: PASS

- [ ] **Step 4: Commit**

```bash
git add src/features/vx/versioning/versions.ts src/features/vx/versioning/version-types.ts
git commit -m "feat: add vx version source of truth"
```

### Task 2: Add version validation and resolution helpers

**Files:**
- Create: `src/features/vx/versioning/resolve-version.ts`
- Modify: `src/features/vx/versioning/versions.ts`

- [ ] **Step 1: Write a resolver with explicit guards**

Implement helpers with narrow return types:

```ts
import { latestDocVersion, supportedDocVersions } from './versions'
import type { ConcreteDocVersion, RequestedVxVersion } from './version-types'

export function isRequestedVxVersion(value: string): value is RequestedVxVersion {
  return supportedDocVersions.includes(value as RequestedVxVersion)
}

export function resolveDocVersion(version: RequestedVxVersion): ConcreteDocVersion {
  return version === 'latest' ? latestDocVersion : version
}
```

- [ ] **Step 2: Add a route-facing assertion helper**

Expose a helper that throws for invalid slugs so route files stay thin.

- [ ] **Step 3: Run typecheck**

Run: `pnpm typecheck`
Expected: PASS

- [ ] **Step 4: Commit**

```bash
git add src/features/vx/versioning/resolve-version.ts src/features/vx/versioning/versions.ts
git commit -m "feat: add vx version resolver"
```

---

## Chunk 2: Shared vx Landing Route

### Task 3: Extract the shared vx landing feature

**Files:**
- Create: `src/features/vx/landing/vx-landing-content.ts`
- Create: `src/features/vx/landing/vx-landing-page.tsx`
- Modify: `src/components/hero-section-4.tsx`
- Modify: `src/components/ui/rotating-gradient-right.tsx`

- [ ] **Step 1: Move shared copy/config into a `vx` landing content module**

Extract strings and CTA targets needed by the `vx` landing so the route file only renders one page component.

- [ ] **Step 2: Create a focused `VxLandingPage` feature component**

Compose the existing hero and section blocks into one reusable page component that can receive:

- requested version label
- optional docs href
- optional install href

- [ ] **Step 3: Keep `Vandor` brand hierarchy intact**

Ensure the landing copy continues to say:

- `Vandor` is the organization
- `vx` is the CLI

- [ ] **Step 4: Run typecheck**

Run: `pnpm typecheck`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/features/vx/landing/vx-landing-content.ts src/features/vx/landing/vx-landing-page.tsx src/components/hero-section-4.tsx src/components/ui/rotating-gradient-right.tsx
git commit -m "feat: extract shared vx landing feature"
```

### Task 4: Add the `/vx/:version` landing route

**Files:**
- Create: `src/routes/vx/$version/index.tsx`
- Modify: `src/routes/index.tsx`
- Modify: `src/components/header.tsx`
- Modify: `src/components/footer-5.tsx`

- [ ] **Step 1: Create the route file for `/vx/:version`**

Use the route param, validate it with the shared helper, and render the shared `VxLandingPage`.

- [ ] **Step 2: Keep `latest` visible in the URL-facing UI**

If the landing shows a version label, show the requested version label, not the resolved concrete docs version.

- [ ] **Step 3: Add navigation paths where useful**

Only add links if they improve UX immediately:

- `/vx/latest`
- `/vx/latest/docs`

- [ ] **Step 4: Run typecheck**

Run: `pnpm typecheck`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/routes/vx/$version/index.tsx src/routes/index.tsx src/components/header.tsx src/components/footer-5.tsx
git commit -m "feat: add shared vx versioned landing route"
```

---

## Chunk 3: Fumadocs Integration

### Task 5: Install and wire Fumadocs in the existing app

**Files:**
- Modify: `package.json`
- Create: `src/features/vx/docs/docs-layout.tsx`
- Create: `src/features/vx/docs/docs-metadata.ts`

- [ ] **Step 1: Add the Fumadocs packages**

Add only the minimal packages needed for:

- docs layout/rendering
- mdx/content loading
- versioned page rendering

Do not add unrelated docs tooling.

- [ ] **Step 2: Create a shared docs layout component**

This component should:

- render the docs shell
- show the requested version label
- preserve the `latest` label in the UI when the URL uses `latest`

- [ ] **Step 3: Create docs metadata helpers**

Generate version-aware titles and labels from:

- requested version
- resolved version
- current slug

- [ ] **Step 4: Run typecheck**

Run: `pnpm typecheck`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add package.json pnpm-lock.yaml src/features/vx/docs/docs-layout.tsx src/features/vx/docs/docs-metadata.ts
git commit -m "feat: add fumadocs foundation for vx docs"
```

### Task 6: Add version-aware docs source loading

**Files:**
- Create: `src/features/vx/docs/docs-source.ts`
- Create: `src/features/vx/docs/load-doc-page.ts`
- Create: `content/docs/v0/index.mdx`
- Create: `content/docs/v0/getting-started.mdx`
- Create: `content/docs/v1/index.mdx`
- Create: `content/docs/v1/getting-started.mdx`
- Create: `content/docs/v2/index.mdx`
- Create: `content/docs/v2/getting-started.mdx`

- [ ] **Step 1: Create a concrete-version-to-content-root mapping**

Map only concrete versions:

```ts
{
  v0: ...
  v1: ...
  v2: ...
}
```

- [ ] **Step 2: Create the docs page loader**

The loader should:

- accept requested version + slug
- resolve the concrete version with the shared helper
- read docs from the concrete version root
- return `404` for missing pages

- [ ] **Step 3: Add the initial MDX docs pages**

Each concrete version gets a minimal but real content set:

- intro page
- getting started page

- [ ] **Step 4: Keep `latest` content indirect**

Do not create a `latest` content folder.

- [ ] **Step 5: Run typecheck**

Run: `pnpm typecheck`
Expected: PASS

- [ ] **Step 6: Commit**

```bash
git add src/features/vx/docs/docs-source.ts src/features/vx/docs/load-doc-page.ts content/docs
git commit -m "feat: add versioned vx docs content loading"
```

### Task 7: Add the `/vx/:version/docs/*` routes

**Files:**
- Create: `src/routes/vx/$version/docs/index.tsx`
- Create: `src/routes/vx/$version/docs/$slug.tsx` or the equivalent catch-all route structure used by TanStack Start
- Modify: `src/router.tsx`

- [ ] **Step 1: Add the docs index route**

Render the docs home page for the requested version through the shared loader and docs shell.

- [ ] **Step 2: Add the docs catch-all page route**

Render docs pages by slug while preserving the original requested version in route params.

- [ ] **Step 3: Keep invalid versions and missing slugs strict**

- invalid version -> route `404`
- missing docs page -> docs `404`

- [ ] **Step 4: Run typecheck**

Run: `pnpm typecheck`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/routes/vx/$version/docs src/router.tsx
git commit -m "feat: add versioned vx docs routes"
```

---

## Chunk 4: Polish and Navigation

### Task 8: Link landing CTAs to the new docs routes

**Files:**
- Modify: `src/features/vx/landing/vx-landing-page.tsx`
- Modify: `src/components/hero-section-4.tsx`
- Modify: `src/components/ui/rotating-gradient-right.tsx`

- [ ] **Step 1: Point docs CTA to `/vx/latest/docs`**

Prefer `latest` as the default public docs entry.

- [ ] **Step 2: Point product CTA to `/vx/latest` where appropriate**

Only keep install CTA external if there is already a real install target; otherwise keep internal CTA semantics consistent.

- [ ] **Step 3: Run typecheck**

Run: `pnpm typecheck`
Expected: PASS

- [ ] **Step 4: Commit**

```bash
git add src/features/vx/landing/vx-landing-page.tsx src/components/hero-section-4.tsx src/components/ui/rotating-gradient-right.tsx
git commit -m "feat: connect vx landing ctas to versioned routes"
```

### Task 9: Document the typecheck-only workflow and docs conventions

**Files:**
- Modify: `AGENTS.md`
- Modify: `README.md`

- [ ] **Step 1: Document the verification command**

State clearly that implementation verification in this repo uses:

- `pnpm typecheck`

and does not use:

- `pnpm test`
- `vitest`

- [ ] **Step 2: Document the new route structure**

Add a short section for:

- `/vx/:version`
- `/vx/:version/docs/*`
- `latest` resolution behavior

- [ ] **Step 3: Run typecheck**

Run: `pnpm typecheck`
Expected: PASS

- [ ] **Step 4: Commit**

```bash
git add AGENTS.md README.md
git commit -m "docs: describe vx routes and typecheck workflow"
```

---

## Execution Notes

- Implement chunk by chunk
- Do not batch all routing and docs work into one giant change
- Keep route files thin
- Keep `latest` resolution centralized
- Do not introduce fallback behavior for invalid versions
- Do not add a `latest` docs content folder
- Use `pnpm typecheck` after every task group

## Expected End State

- `Vandor` root landing remains intact
- `/vx/v0`, `/vx/v1`, `/vx/v2`, `/vx/latest` all render one shared `vx` landing
- `/vx/v0/docs/*`, `/vx/v1/docs/*`, `/vx/v2/docs/*` render version-specific docs
- `/vx/latest/docs/*` stays on `latest` while serving `v2` docs content
- `pnpm typecheck` passes
