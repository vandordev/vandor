# Vandor Institutional Pages Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add `/about`, `/work`, `/collaborate`, and `/support` as a coherent brand-layer expansion for Vandor, while updating shared navigation and discovery flows to make the organization easier to understand without entering `/vx/*`.

**Architecture:** Follow the existing TanStack Start pattern used by `/partners`, `/news`, and `/writing`: each page gets a focused feature module, a small metadata helper, and a route file that wires loader-free static content into `buildSeoHead`. Shared shell content, footer links, sitemap entries, and homepage CTA paths should be updated first so the new pages are reachable as soon as the routes land.

**Tech Stack:** TanStack Start, TanStack Router file routes, React, TypeScript, Tailwind CSS, existing SEO helpers in `src/lib/seo.ts`

---

## Chunk 1: Shared Shell and Discovery Updates

### Task 1: Update brand navigation, CTAs, and footer links

**Files:**
- Modify: `src/components/site-shell-content.ts`
- Modify: `src/components/footer-5.tsx`
- Modify: `src/features/home/vandor-home-hero.tsx`

- [ ] Update Vandor header nav items in `src/components/site-shell-content.ts` to:
  - `Work -> /work`
  - `Writing -> /writing`
  - `News -> /news`
  - `About -> /about`
  - keep `Products` as the product menu trigger
- [ ] Remove `Partners` from the primary brand nav and move that discovery responsibility to `/work`, `/collaborate`, and footer navigation.
- [ ] Update Vandor header CTA links in `src/components/site-shell-content.ts` so they no longer depend on `/#about`.
- [ ] Add footer links for `/about`, `/collaborate`, and `/support` in `src/components/site-shell-content.ts`.
- [ ] Keep `/partners` present in footer navigation as a supporting route.
- [ ] Refresh footer descriptive copy in `src/components/footer-5.tsx` only if needed to align with the broader institutional framing, while keeping the existing tone and concision.
- [ ] Change the homepage hero CTA in `src/features/home/vandor-home-hero.tsx` from the `#about` anchor to `/work` so the new ecosystem map becomes the main “see the work” destination.
- [ ] Run: `pnpm typecheck`
- [ ] Expected: TypeScript completes with no errors after the shared navigation changes.
- [ ] Commit:

```bash
git add src/components/site-shell-content.ts src/components/footer-5.tsx src/features/home/vandor-home-hero.tsx
git commit -m "feat: update brand shell for institutional pages"
```

### Task 2: Plan the new SEO and sitemap surface area

**Files:**
- Modify: `src/lib/sitemap.ts`
- Note for later route tasks: `src/lib/seo.ts`

- [ ] Add the four new static routes to `buildStaticEntries()` in `src/lib/sitemap.ts`:
  - `/about/`
  - `/work/`
  - `/collaborate/`
  - `/support/`
- [ ] Confirm `src/lib/seo.ts` already provides everything needed through `buildSeoHead()` and `getCollectionPageStructuredData()`.
- [ ] Avoid adding new SEO helpers unless a page genuinely needs route-specific structured data behavior that cannot be expressed with the current helpers.
- [ ] Run: `pnpm typecheck`
- [ ] Expected: no TypeScript errors from sitemap updates.
- [ ] Commit:

```bash
git add src/lib/sitemap.ts
git commit -m "feat: add institutional routes to sitemap"
```

## Chunk 2: `/about`

### Task 3: Add the About feature module

**Files:**
- Create: `src/features/about/about-metadata.ts`
- Create: `src/features/about/vandor-about-page.tsx`

- [ ] Create `src/features/about/about-metadata.ts` with focused helpers:
  - `getAboutTitle()`
  - `getAboutDescription()`
- [ ] Keep the title and description consistent with the approved spec:
  - organization-first
  - explicit `public-interest technical organization`
  - not legalistic about `non-profit`
- [ ] Create `src/features/about/vandor-about-page.tsx`.
- [ ] Follow the existing page composition pattern used in `src/features/partners/vandor-partners-page.tsx` and `src/features/writing/vandor-writing-page.tsx`:
  - `HeroHeader`
  - `LandingSection`
  - `Footer5`
  - `getSiteShellContent({ variant: 'vandor' })`
- [ ] Implement the approved `/about` section order:
  - hero
  - institutional description
  - how Vandor works
  - principles
  - directional close
- [ ] Add links from this page to:
  - `/work`
  - `/collaborate`
  - `/support`
  - contextual references to `/writing` and `/news`
- [ ] Keep the page text-led and institutionally calm. Do not introduce a metrics block, badge clutter, or fundraising CTA language here.
- [ ] Run: `pnpm typecheck`
- [ ] Expected: new feature files type-check cleanly before route wiring.
- [ ] Commit:

```bash
git add src/features/about/about-metadata.ts src/features/about/vandor-about-page.tsx
git commit -m "feat: add about page feature module"
```

### Task 4: Add the About route

**Files:**
- Create: `src/routes/about/index.tsx`
- Modify if generated: `src/routeTree.gen.ts`

- [ ] Create `src/routes/about/index.tsx` following the existing static route pattern from `src/routes/partners/index.tsx`.
- [ ] Wire `head` with:
  - `getAboutTitle()`
  - `getAboutDescription()`
  - `path: '/about/'`
  - reuse an existing brand OG asset such as `/images/og/vandor-home.svg` unless a dedicated asset is added in a separate scoped task
  - `getCollectionPageStructuredData()`
- [ ] Render `VandorAboutPage` as the route component.
- [ ] Regenerate or accept generated router output if `src/routeTree.gen.ts` updates automatically. Do not hand-edit the generated file.
- [ ] Run: `pnpm typecheck`
- [ ] Expected: route registration and generated types compile without errors.
- [ ] Commit:

```bash
git add src/routes/about/index.tsx src/routeTree.gen.ts
git commit -m "feat: add about route"
```

## Chunk 3: `/work`

### Task 5: Add the Work feature module

**Files:**
- Create: `src/features/work/work-metadata.ts`
- Create: `src/features/work/vandor-work-page.tsx`

- [ ] Create `src/features/work/work-metadata.ts` with:
  - `getWorkTitle()`
  - `getWorkDescription()`
- [ ] Create `src/features/work/vandor-work-page.tsx`.
- [ ] Keep this page map-like rather than archive-like.
- [ ] Structure the content into the approved clusters:
  - Products
  - Reference
  - Writing
  - News
  - Partnership work
- [ ] Link the cluster destinations to existing routes:
  - `/vx/latest`
  - `/vx/latest/docs`
  - `/writing`
  - `/news`
  - `/partners`
- [ ] Decide implementation behavior for `vxt` and `vpkg` before coding:
  - if placeholders are approved, render them explicitly as future products
  - otherwise omit them from the first-release page
- [ ] Add directional links to `/about` and `/collaborate`.
- [ ] Keep the page concise enough that it does not duplicate `/about`, `/news`, or `/writing`.
- [ ] Run: `pnpm typecheck`
- [ ] Expected: the feature module compiles with existing shared components.
- [ ] Commit:

```bash
git add src/features/work/work-metadata.ts src/features/work/vandor-work-page.tsx
git commit -m "feat: add work page feature module"
```

### Task 6: Add the Work route

**Files:**
- Create: `src/routes/work/index.tsx`
- Modify if generated: `src/routeTree.gen.ts`

- [ ] Create `src/routes/work/index.tsx` using the same pattern as the static brand pages.
- [ ] Wire SEO metadata with:
  - `getWorkTitle()`
  - `getWorkDescription()`
  - `path: '/work/'`
  - existing brand OG image
  - `getCollectionPageStructuredData()`
- [ ] Render `VandorWorkPage` as the route component.
- [ ] Regenerate or accept generated `src/routeTree.gen.ts` output if it changes.
- [ ] Run: `pnpm typecheck`
- [ ] Expected: route and generated types compile without errors.
- [ ] Commit:

```bash
git add src/routes/work/index.tsx src/routeTree.gen.ts
git commit -m "feat: add work route"
```

## Chunk 4: `/collaborate`

### Task 7: Add the Collaborate feature module

**Files:**
- Create: `src/features/collaborate/collaborate-metadata.ts`
- Create: `src/features/collaborate/vandor-collaborate-page.tsx`

- [ ] Create `src/features/collaborate/collaborate-metadata.ts` with:
  - `getCollaborateTitle()`
  - `getCollaborateDescription()`
- [ ] Create `src/features/collaborate/vandor-collaborate-page.tsx`.
- [ ] Implement the approved section order:
  - hero
  - collaboration lanes
  - what Vandor is best used for
  - what to bring
  - CTA
- [ ] Add explicit links to `/partners`, `/work`, and `/about`.
- [ ] Use plain email CTA copy, not a form UI.
- [ ] Leave the email address configurable in one obvious string location so a future change does not require a large page edit.
- [ ] Keep the language selective and qualifying, not salesy.
- [ ] Run: `pnpm typecheck`
- [ ] Expected: the collaborate feature compiles and links to existing routes cleanly.
- [ ] Commit:

```bash
git add src/features/collaborate/collaborate-metadata.ts src/features/collaborate/vandor-collaborate-page.tsx
git commit -m "feat: add collaborate page feature module"
```

### Task 8: Add the Collaborate route

**Files:**
- Create: `src/routes/collaborate/index.tsx`
- Modify if generated: `src/routeTree.gen.ts`

- [ ] Create `src/routes/collaborate/index.tsx`.
- [ ] Wire `head` with:
  - `getCollaborateTitle()`
  - `getCollaborateDescription()`
  - `path: '/collaborate/'`
  - existing brand OG asset
  - `getCollectionPageStructuredData()`
- [ ] Render `VandorCollaboratePage` as the route component.
- [ ] Regenerate or accept generated `src/routeTree.gen.ts` output if it changes.
- [ ] Run: `pnpm typecheck`
- [ ] Expected: the route compiles and is recognized by TanStack Router.
- [ ] Commit:

```bash
git add src/routes/collaborate/index.tsx src/routeTree.gen.ts
git commit -m "feat: add collaborate route"
```

## Chunk 5: `/support`

### Task 9: Add the Support feature module

**Files:**
- Create: `src/features/support/support-metadata.ts`
- Create: `src/features/support/vandor-support-page.tsx`

- [ ] Create `src/features/support/support-metadata.ts` with:
  - `getSupportTitle()`
  - `getSupportDescription()`
- [ ] Create `src/features/support/vandor-support-page.tsx`.
- [ ] Implement the approved section order:
  - hero
  - why support matters
  - primary support path
  - secondary support paths
  - what support sustains
  - CTA
- [ ] Keep financial or institutional backing as the main path.
- [ ] Keep non-financial help present but clearly secondary.
- [ ] Link back to `/about` and `/work`, with an optional clarifying link to `/collaborate` for operational interest.
- [ ] Use email CTA copy instead of payment-processing UI or sponsorship tables.
- [ ] Run: `pnpm typecheck`
- [ ] Expected: the support feature compiles and stays within existing brand patterns.
- [ ] Commit:

```bash
git add src/features/support/support-metadata.ts src/features/support/vandor-support-page.tsx
git commit -m "feat: add support page feature module"
```

### Task 10: Add the Support route

**Files:**
- Create: `src/routes/support/index.tsx`
- Modify if generated: `src/routeTree.gen.ts`

- [ ] Create `src/routes/support/index.tsx`.
- [ ] Wire `head` with:
  - `getSupportTitle()`
  - `getSupportDescription()`
  - `path: '/support/'`
  - existing brand OG asset
  - `getCollectionPageStructuredData()`
- [ ] Render `VandorSupportPage` as the route component.
- [ ] Regenerate or accept generated `src/routeTree.gen.ts` output if it changes.
- [ ] Run: `pnpm typecheck`
- [ ] Expected: the route compiles and is included in the router types.
- [ ] Commit:

```bash
git add src/routes/support/index.tsx src/routeTree.gen.ts
git commit -m "feat: add support route"
```

## Chunk 6: Final Integration Pass

### Task 11: Check cross-linking and static metadata consistency

**Files:**
- Review and modify as needed:
  - `src/features/about/vandor-about-page.tsx`
  - `src/features/work/vandor-work-page.tsx`
  - `src/features/collaborate/vandor-collaborate-page.tsx`
  - `src/features/support/vandor-support-page.tsx`
  - `src/components/site-shell-content.ts`
  - `src/lib/sitemap.ts`

- [ ] Review all four new pages and confirm each page links to the correct institutional or action neighbors.
- [ ] Confirm `/about` and `/work` behave as the institutional spine.
- [ ] Confirm `/collaborate` and `/support` do not duplicate each other’s core job.
- [ ] Confirm `site-shell-content.ts` does not retain stale `/#about` or old primary-nav assumptions.
- [ ] Confirm `/partners` is still reachable through footer or in-page linking even after removal from the primary header nav.
- [ ] Run: `pnpm typecheck`
- [ ] Expected: no regressions after the cross-linking pass.
- [ ] Commit:

```bash
git add src/features/about/vandor-about-page.tsx src/features/work/vandor-work-page.tsx src/features/collaborate/vandor-collaborate-page.tsx src/features/support/vandor-support-page.tsx src/components/site-shell-content.ts src/lib/sitemap.ts
git commit -m "refactor: align institutional page cross-links"
```

### Task 12: Final verification

**Files:**
- Review generated and touched files from all prior tasks

- [ ] Run: `pnpm typecheck`
- [ ] Expected: PASS with no TypeScript errors.
- [ ] Do not run `vitest` or `pnpm test`.
- [ ] Optionally run `pnpm dev` for manual browser review if visual confirmation is needed, but do not make this a release blocker if typecheck is clean.
- [ ] Review the final diff for accidental copy drift, stale links, or unsupported legal wording around `non-profit`.
- [ ] Prepare final handoff notes including:
  - chosen email contact path(s)
  - whether `vxt` and `vpkg` were shown on `/work`
  - whether `routeTree.gen.ts` changed

## Inputs Required Before Execution

- The email address for `/collaborate`
- Whether `/support` uses the same email or a separate contact
- Whether `vxt` and `vpkg` should appear on `/work` as placeholders
- Whether legal `non-profit` wording should remain implied only, or be stated explicitly in copy

## Notes for the Implementer

- Follow the existing page-shell pattern. These routes should feel like siblings of `/partners`, `/news`, and `/writing`, not like a separate mini-site.
- Prefer small focused feature files over a single shared “institutional pages” mega-module.
- Reuse existing SEO helpers and OG assets unless there is a strong reason to create new ones.
- Keep copy aligned with the approved design spec:
  - quiet
  - rigorous
  - elegant
  - institution-first
- Verification for this repo is `pnpm typecheck`. No routine test execution is required.
