# Vandor News Publication Design

## Summary

Add a Vandor-wide publication surface under `/news`.

- `/` remains the main `Vandor` landing page
- `/news` becomes the main editorial index for announcements, articles, product writing, and release notes
- `/news/:slug` renders individual publication entries
- `vx` remains a Vandor product with its own landing and docs under `/vx/...`

The publication must feel like a clean newsroom or magazine surface, not like repurposed product docs.

## Goals

- Introduce one clear public publication route for `Vandor`
- Keep the publication source developer-managed through git
- Use local content files that fit the existing app architecture
- Support multiple editorial entry types such as announcements and release notes
- Allow `vx`-related posts to appear in the Vandor-wide publication
- Preserve room for future product-specific publication surfaces without redesigning the content model

## Non-Goals

- Add a headless CMS or non-developer publishing workflow
- Couple the public site runtime to Obsidian
- Merge `vx` docs into the publication surface
- Build product-specific publication routes in this phase
- Add scheduling, preview mode, or advanced editorial workflows

## Route Design

### Public routes

- `/`
  - Existing `Vandor` landing
- `/news`
  - Vandor publication index
- `/news/:slug`
  - Individual publication entry

### Existing product routes

- `/vx/:version`
  - Shared `vx` landing
- `/vx/:version/docs/*`
  - Versioned `vx` documentation

`/news` is a Vandor-wide publication hub. It should not be nested under `/vx` and should not inherit docs-specific UX patterns.

## Information Architecture

### Vandor News

`/news` is the editorial home for:

- company announcements
- essays and articles
- product updates
- release notes
- ecosystem writing related to Vandor products such as `vx`

This surface represents the whole Vandor organization, not a single product.

### vx Relationship

Posts about `vx` may appear in `/news`, but `vx` documentation remains separate.

The content model should prepare for future product publication surfaces, for example:

- `/vx/news`
- `/vx/index`

That future extension should be able to reuse the same metadata model without forcing a content migration.

## Naming and Positioning

Use `/news` as the public route.

Rationale:

- `news` is explicit and self-explanatory for visitors
- it aligns with the intended newsroom or magazine positioning
- it is clearer than `/index` for navigation, linking, and SEO

The publication can be branded in the UI as `Vandor News`.

## Content Format

Use `.mdx` as the publication file format.

Authoring rules:

- default writing style should stay markdown-first
- MDX capabilities are available when richer article presentation is needed
- do not require React components in routine articles

Why `.mdx` instead of `.md`:

- the app already uses an MDX-capable content pipeline
- publication posts may later need richer embeds, callouts, or product components
- choosing `.mdx` now avoids a content-format migration later

## Content Source of Truth

Publication content is stored in the repo and managed by developers through git.

Recommended content location:

- `content/news/*.mdx`

This repo remains the source of truth for published content. Obsidian may be used as a personal writing editor, but it must not become a runtime dependency or a required publishing system.

## Metadata Schema

Each post should use frontmatter with a stable, publication-oriented schema.

Recommended required fields:

```ts
type NewsEntryKind =
  | 'announcement'
  | 'article'
  | 'product'
  | 'release-note'

type NewsEntryFrontmatter = {
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

Field intent:

- `title`
  - public title
- `summary`
  - short excerpt for cards, hero areas, and metadata
- `publishedAt`
  - publication date
- `kind`
  - editorial type
- `published`
  - lightweight draft control
- `featured`
  - allows one or more promoted entries on `/news`
- `authors`
  - supports multi-author writing later
- `products`
  - links entries to products such as `vx`
- `tags`
  - lightweight editorial grouping
- `coverImage`
  - required for a stronger publication presentation
- `seoTitle`, `seoDescription`
  - optional metadata overrides

## Example Frontmatter

```mdx
---
title: "Introducing Vandor News"
summary: "A new publication hub for updates, essays, and product announcements across Vandor."
publishedAt: "2026-05-17"
kind: "announcement"
published: true
featured: true
authors:
  - "Vandor"
products: []
tags:
  - "company"
coverImage: "/images/news/vandor-news-cover.jpg"
seoTitle: "Introducing Vandor News"
seoDescription: "Meet Vandor News, the new home for updates and writing across the Vandor ecosystem."
---
```

## Listing Page Design

### `/news`

The news index should read as a publication hub rather than a docs tree.

First-release structure:

- featured story area near the top
- latest posts section below
- post cards with:
  - cover image
  - title
  - summary
  - kind
  - publication date
- simple filtering by `kind`

Future-friendly but out of scope for first release:

- filtering by `product`
- sorting controls
- pagination or load more
- related content recommendations

## Article Page Design

### `/news/:slug`

Each article page should render:

- title
- summary
- publication date
- authors
- optional product badges
- cover image
- MDX body

The page should feel editorial and restrained. It must not reuse a docs sidebar, page tree, or version selector.

## Component and File Boundaries

Suggested structure:

- `src/routes/news/index.tsx`
- `src/routes/news/$slug.tsx`
- `src/features/news/*`
- `content/news/*.mdx`

Suggested feature-module responsibilities:

- `src/features/news/news-source.ts`
  - load and validate publication entries
- `src/features/news/load-news-index.ts`
  - provide listing data
- `src/features/news/load-news-entry.ts`
  - provide one article by slug
- `src/features/news/news-list-page.tsx`
  - render the publication index
- `src/features/news/news-article-page.tsx`
  - render the article detail page
- `src/features/news/news-metadata.ts`
  - build page titles and SEO metadata

Route files should stay thin and delegate to feature modules.

## Loader and Runtime Strategy

Build a dedicated content loader for `news`, parallel to the existing `vx` docs loader.

Requirements:

- in development, read from `content/news`
- in production, bundle `content/news` into Nitro server assets
- validate frontmatter against a schema
- expose filtered, sorted listing data for `/news`
- expose per-slug lookup for `/news/:slug`

This mirrors the current local-content strategy already used for versioned `vx` docs and keeps the deployment model consistent.

## Production Bundling

The current app already bundles `content/docs` for production runtime through Nitro server assets.

The news publication should extend that pattern to include:

- `content/news`

This avoids a split deployment model between docs content and publication content.

## Data Flow

### News index

- route `/news` loads publication entries
- unpublished entries are excluded
- entries are sorted by `publishedAt` descending
- featured content is selected from entry metadata
- the page renders a publication-style listing

### News article

- route `/news/:slug` resolves one published entry
- missing slug returns `404`
- unpublished entry should not render publicly
- page metadata is built from entry metadata with optional SEO overrides

## Error Handling

- missing slug returns `404`
- unpublished entries are excluded from public routes
- invalid frontmatter must fail loudly in development
- missing required metadata must be treated as an error
- duplicate slugs must fail loudly in development

## Editorial Rules

Keep the first version intentionally simple:

- no CMS
- no scheduling
- no preview mode
- no draft dashboard
- no cross-posting automation

Publishing workflow:

1. Add or edit an `.mdx` file in `content/news`
2. Commit through normal git workflow
3. Deploy through the existing app pipeline

## Obsidian Decision

Do not integrate the publication architecture directly with Obsidian.

If desired, Obsidian may be used privately as a writing environment, but the website must continue to rely only on repository content files. This keeps the runtime simple and prevents editorial tooling from leaking into application architecture.

## Verification Strategy

Per repository rules, the required verification baseline remains:

- `pnpm typecheck`

No `vitest` or `pnpm test` execution is required for this work.

## Rollout Plan

1. Add a `news` feature module and route subtree
2. Introduce a validated MDX source under `content/news`
3. Extend Nitro server asset bundling for production
4. Implement `/news` listing UI
5. Implement `/news/:slug` article UI
6. Add initial publication entries
7. Verify with `pnpm typecheck`

## Open Decisions Already Resolved

- public route is `/news`, not `/index`
- publication scope is Vandor-wide
- content format is `.mdx`
- publishing workflow is developer-only via git
- Obsidian is not part of the architecture
- `vx` docs remain separate from publication content
