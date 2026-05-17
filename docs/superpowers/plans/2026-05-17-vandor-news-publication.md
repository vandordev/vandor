# Vandor News Publication Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a Vandor-wide publication surface at `/news` with MDX-backed listing and article pages, production-safe content bundling, and initial seed content.

**Architecture:** Add a dedicated `news` feature module that mirrors the repo's existing local-content strategy used by `vx` docs, but renders a custom publication UI instead of a docs tree. Keep routes thin, validate frontmatter centrally, bundle `content/news` through Nitro for production, and reuse the existing Vandor shell components where that preserves brand consistency.

**Tech Stack:** TanStack Start, TanStack Router, React 19, TypeScript, @fumadocs/local-md, Fumadocs MDX renderer, Nitro, Tailwind CSS, pnpm

---

## Constraints

- Do not run `vitest`
- Do not run `pnpm test`
- Required verification baseline is `pnpm typecheck`
- Keep `Vandor` as the organization brand
- Keep `vx` as a Vandor product, not the primary publication brand
- `/news` must feel like a newsroom or magazine surface, not repurposed docs
- Publication content is developer-managed through git
- `content/news` is the source of truth for published entries

## References

Inspect these existing files before implementation:

- `docs/superpowers/specs/2026-05-17-vandor-news-publication-design.md`
  - approved product and content design
- `src/features/vx/docs/docs-source.ts`
  - current local MDX loading and Nitro bundling pattern
- `src/features/vx/docs/load-doc-page.ts`
  - server loader shape with `createServerFn`
- `src/components/mdx.tsx`
  - shared MDX component registry
- `src/components/header.tsx`
  - shared top navigation shell
- `src/components/footer-5.tsx`
  - shared footer shell
- `src/components/site-shell-content.ts`
  - Vandor navigation and footer link config
- `nitro.config.ts`
  - current production asset bundling

## File Structure

### Existing files to modify

- Modify: `nitro.config.ts`
  - bundle `content/news` for production runtime
- Modify: `src/components/site-shell-content.ts`
  - add `News` links into the Vandor shell where appropriate
- Modify: `src/styles.css`
  - add only the minimal global styling hooks needed if page-level utility classes are insufficient

### New routing files

- Create: `src/routes/news/index.tsx`
  - publication index route
- Create: `src/routes/news/$slug.tsx`
  - individual article route

### New feature modules

- Create: `src/features/news/news-types.ts`
  - shared frontmatter and entry types
- Create: `src/features/news/news-source.ts`
  - content root resolution, schema validation, and local MDX source caching
- Create: `src/features/news/load-news-index.ts`
  - server loader for the publication listing
- Create: `src/features/news/load-news-entry.ts`
  - server loader for article lookup by slug
- Create: `src/features/news/news-metadata.ts`
  - page-title and SEO helpers
- Create: `src/features/news/news-list-page.tsx`
  - publication index UI
- Create: `src/features/news/news-article-page.tsx`
  - article detail UI

### New content files

- Create: `content/news/introducing-vandor-news.mdx`
  - launch/announcement post for the publication
- Create: `content/news/why-vandor-builds-vx.mdx`
  - ecosystem/product article that proves `products: ['vx']` works
- Create: `content/news/vx-release-notes-v0-1.mdx`
  - release-note example content

### New static assets

- Create: `public/images/news/introducing-vandor-news.svg`
- Create: `public/images/news/why-vandor-builds-vx.svg`
- Create: `public/images/news/vx-release-notes-v0-1.svg`

Keep image assets lightweight and deterministic. Prefer simple SVG cover art over remote images.

---

## Chunk 1: Content Foundation

### Task 1: Add the shared news types and frontmatter schema

**Files:**
- Create: `src/features/news/news-types.ts`

- [ ] **Step 1: Create the news kind and frontmatter types**

Add explicit, narrow types:

```ts
export const newsEntryKinds = [
  'announcement',
  'article',
  'product',
  'release-note',
] as const

export type NewsEntryKind = (typeof newsEntryKinds)[number]

export type NewsEntryFrontmatter = {
  title: string
  summary: string
  publishedAt: string
  kind: NewsEntryKind
  published: boolean
  featured: boolean
  authors: string[]
  products: string[]
  tags: string[]
  coverImage: string
  seoTitle?: string
  seoDescription?: string
}
```

- [ ] **Step 2: Add route-facing data shapes**

Export small data contracts for:

- listing cards
- featured card
- article payload

Keep them separate from raw loader internals.

- [ ] **Step 3: Run typecheck**

Run: `pnpm typecheck`
Expected: PASS

- [ ] **Step 4: Commit**

```bash
git add src/features/news/news-types.ts
git commit -m "feat: add news content types"
```

### Task 2: Create the news content source module

**Files:**
- Create: `src/features/news/news-source.ts`

- [ ] **Step 1: Mirror the existing local-content runtime pattern**

Follow the shape of `src/features/vx/docs/docs-source.ts`, but target a flat publication folder instead of versioned docs directories.

Responsibilities:

- resolve `content/news` in development
- materialize bundled news assets in production
- cache the local MD source instance
- validate frontmatter with Zod

- [ ] **Step 2: Define the frontmatter schema in the source layer**

Use `zod` to enforce:

- required strings for `title`, `summary`, `publishedAt`, `coverImage`
- enum validation for `kind`
- boolean validation for `published` and `featured`
- `string[]` validation for `authors`, `products`, and `tags`

- [ ] **Step 3: Expose focused read helpers**

Provide helpers with clear responsibilities, for example:

- `getNewsSource()`
- `getAllNewsPages()`
- `getNewsPageBySlug(slug: string)`

Do not make route files parse MDX directly.

- [ ] **Step 4: Run typecheck**

Run: `pnpm typecheck`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/features/news/news-source.ts
git commit -m "feat: add news content source"
```

### Task 3: Bundle `content/news` for production

**Files:**
- Modify: `nitro.config.ts`

- [ ] **Step 1: Add a second Nitro server asset entry**

Extend the config with:

```ts
{
  baseName: 'news',
  dir: './content/news',
}
```

Do not disturb the existing `vx-docs` asset definition.

- [ ] **Step 2: Keep the config format consistent**

Match the style and naming already used in `nitro.config.ts`.

- [ ] **Step 3: Run typecheck**

Run: `pnpm typecheck`
Expected: PASS

- [ ] **Step 4: Commit**

```bash
git add nitro.config.ts
git commit -m "feat: bundle news content for production"
```

---

## Chunk 2: Server Data Loaders and Metadata

### Task 4: Add the `/news` listing loader

**Files:**
- Create: `src/features/news/load-news-index.ts`
- Modify: `src/features/news/news-source.ts`

- [ ] **Step 1: Create a server loader for listing data**

Use `createServerFn({ method: 'GET' })` and keep the output listing-focused:

- all published posts
- sorted by `publishedAt` descending
- one featured entry if any
- remaining entries for the grid

- [ ] **Step 2: Normalize listing data into a stable shape**

Return only what the list page needs:

- `slug`
- `title`
- `summary`
- `publishedAt`
- `kind`
- `coverImage`
- `authors`
- `products`

Do not include full article render data here.

- [ ] **Step 3: Enforce publication rules in the loader**

Listing loader rules:

- exclude `published: false`
- fail loudly in development on duplicate slugs
- prefer explicit sorting instead of relying on file order

- [ ] **Step 4: Run typecheck**

Run: `pnpm typecheck`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/features/news/load-news-index.ts src/features/news/news-source.ts
git commit -m "feat: add news index loader"
```

### Task 5: Add the `/news/:slug` article loader

**Files:**
- Create: `src/features/news/load-news-entry.ts`
- Modify: `src/features/news/news-source.ts`

- [ ] **Step 1: Create a slug-based server loader**

Use `createServerFn({ method: 'GET' })` with a validated input shape:

```ts
type NewsEntryInput = {
  slug: string
}
```

- [ ] **Step 2: Resolve one page and serialize the render payload**

Follow the `loadVxDocPage` pattern:

- look up the page by slug
- return `notFound()` when missing
- reject unpublished entries from public access
- load the MDX renderer and return serialized render data

- [ ] **Step 3: Keep the payload article-specific**

Return:

- `slug`
- frontmatter-derived metadata
- serialized MDX render payload

Do not leak raw source internals into the route layer.

- [ ] **Step 4: Run typecheck**

Run: `pnpm typecheck`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/features/news/load-news-entry.ts src/features/news/news-source.ts
git commit -m "feat: add news entry loader"
```

### Task 6: Add publication metadata helpers

**Files:**
- Create: `src/features/news/news-metadata.ts`

- [ ] **Step 1: Add title helpers for index and article pages**

Export helpers such as:

```ts
export function getNewsIndexTitle() {
  return 'News | Vandor'
}

export function getNewsEntryTitle(title: string, seoTitle?: string) {
  return `${seoTitle ?? title} | Vandor News`
}
```

- [ ] **Step 2: Add description fallback helpers**

Support consistent metadata fallback from:

- `seoDescription`
- `summary`

- [ ] **Step 3: Run typecheck**

Run: `pnpm typecheck`
Expected: PASS

- [ ] **Step 4: Commit**

```bash
git add src/features/news/news-metadata.ts
git commit -m "feat: add news metadata helpers"
```

---

## Chunk 3: UI and Routes

### Task 7: Build the `/news` list page component

**Files:**
- Create: `src/features/news/news-list-page.tsx`
- Modify: `src/styles.css` only if utility classes are not enough

- [ ] **Step 1: Build the page shell using existing Vandor header and footer**

Reuse:

- `HeroHeader`
- `Footer5`
- `getSiteShellContent({ variant: 'vandor' })`

This keeps `/news` visually connected to the rest of the Vandor site.

- [ ] **Step 2: Add publication-specific sections**

Implement:

- page intro/header for `Vandor News`
- featured story section
- latest posts grid
- simple `kind` filter UI state

Keep filtering client-side within the loaded dataset for v1.

- [ ] **Step 3: Use article cards that show publication metadata clearly**

Each card should render:

- cover image
- title
- summary
- `kind`
- publication date

- [ ] **Step 4: Keep the implementation intentionally small**

If the card markup becomes noisy, extract only one small internal component inside the same file first. Do not explode the feature into many micro-files unless repetition is real.

- [ ] **Step 5: Run typecheck**

Run: `pnpm typecheck`
Expected: PASS

- [ ] **Step 6: Commit**

```bash
git add src/features/news/news-list-page.tsx src/styles.css
git commit -m "feat: add news list page"
```

### Task 8: Build the `/news/:slug` article page component

**Files:**
- Create: `src/features/news/news-article-page.tsx`
- Modify: `src/components/mdx.tsx` only if one or two safe publication-specific components are truly needed

- [ ] **Step 1: Render the serialized MDX payload**

Reuse the current MDX renderer approach:

- `rendererFromSerialized(...)`
- `useMDXComponents()`

Do not introduce a separate MDX stack for `news`.

- [ ] **Step 2: Build the editorial article chrome**

Render:

- title
- summary
- publication date
- author line
- product badges when `products.length > 0`
- cover image
- MDX body

- [ ] **Step 3: Keep the body styling publication-oriented**

Use a restrained reading width and typography treatment. Avoid docs-only UI such as:

- page tree
- docs sidebar
- version selector

- [ ] **Step 4: Run typecheck**

Run: `pnpm typecheck`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/features/news/news-article-page.tsx src/components/mdx.tsx
git commit -m "feat: add news article page"
```

### Task 9: Add the TanStack route files

**Files:**
- Create: `src/routes/news/index.tsx`
- Create: `src/routes/news/$slug.tsx`

- [ ] **Step 1: Add the `/news` route**

Route responsibilities:

- call the listing loader
- set page metadata via `news-metadata.ts`
- render `NewsListPage`

- [ ] **Step 2: Add the `/news/:slug` route**

Route responsibilities:

- call the article loader
- return `404` for missing slugs
- set article metadata from loader data
- render `NewsArticlePage`

- [ ] **Step 3: Keep route files thin**

Do not place filtering, parsing, or layout logic directly in the route modules.

- [ ] **Step 4: Run typecheck**

Run: `pnpm typecheck`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/routes/news/index.tsx src/routes/news/$slug.tsx
git commit -m "feat: add news routes"
```

---

## Chunk 4: Seed Content, Navigation, and Final Verification

### Task 10: Add initial publication entries

**Files:**
- Create: `content/news/introducing-vandor-news.mdx`
- Create: `content/news/why-vandor-builds-vx.mdx`
- Create: `content/news/vx-release-notes-v0-1.mdx`
- Create: `public/images/news/introducing-vandor-news.svg`
- Create: `public/images/news/why-vandor-builds-vx.svg`
- Create: `public/images/news/vx-release-notes-v0-1.svg`

- [ ] **Step 1: Create lightweight cover assets**

Use simple local SVG assets with deterministic naming. Keep them small and easy to diff.

- [ ] **Step 2: Add one featured launch post**

`introducing-vandor-news.mdx` should:

- set `featured: true`
- use `kind: "announcement"`
- explain the purpose of `/news`

- [ ] **Step 3: Add one ecosystem article and one release note**

Use the other two files to prove:

- `products: ['vx']` is represented
- `kind` styling handles multiple entry types

- [ ] **Step 4: Keep the content valid against the frontmatter schema**

Every entry must include:

- `title`
- `summary`
- `publishedAt`
- `kind`
- `published`
- `featured`
- `authors`
- `products`
- `tags`
- `coverImage`

- [ ] **Step 5: Run typecheck**

Run: `pnpm typecheck`
Expected: PASS

- [ ] **Step 6: Commit**

```bash
git add content/news public/images/news
git commit -m "feat: add initial news entries"
```

### Task 11: Link the publication into the Vandor shell

**Files:**
- Modify: `src/components/site-shell-content.ts`

- [ ] **Step 1: Add `News` to the Vandor navigation**

Update the `vandor` shell config so `/news` is reachable from the shared header.

- [ ] **Step 2: Add `News` into the Vandor footer links**

Ensure the footer includes a stable path to:

- `/news`

Do not add `news` links to the `vx` shell unless they clearly improve the current product surface.

- [ ] **Step 3: Keep existing Vandor and vx labels intact**

Do not rename the organization or product in nav copy.

- [ ] **Step 4: Run typecheck**

Run: `pnpm typecheck`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/components/site-shell-content.ts
git commit -m "feat: add news links to vandor shell"
```

### Task 12: Run final verification and prepare handoff

**Files:**
- Review only; no required file changes

- [ ] **Step 1: Run the required verification baseline**

Run: `pnpm typecheck`
Expected: PASS

- [ ] **Step 2: Smoke-check the route matrix manually in dev if needed**

Confirm these URLs are wired conceptually:

- `/`
- `/news`
- `/news/<known-slug>`
- `/news/<missing-slug>` returns `404`
- `/vx/latest`
- `/vx/latest/docs`

Do not run `vitest` or `pnpm test`.

- [ ] **Step 3: Review for scope drift**

Ensure the implementation did not accidentally add:

- CMS plumbing
- docs sidebar reuse
- product-specific news routes
- Obsidian integration

- [ ] **Step 4: Commit any final polish**

```bash
git add .
git commit -m "feat: finalize vandor news publication"
```

---

## Notes for the Implementer

- Prefer following the `vx` docs content-loader pattern rather than inventing a second content system.
- Keep route files extremely thin.
- Keep the first release editorially strong but technically modest.
- If `src/styles.css` does not need changes, do not force any global CSS additions.
- If one implementation detail turns out to require a spec correction, update the spec in a separate commit instead of silently drifting.

Plan complete and saved to `docs/superpowers/plans/2026-05-17-vandor-news-publication.md`. Ready to execute?
