# vx and vxt Product Docs Surface Design

## Summary

Add a shared public docs surface in `vandor-landing` for both `vx` and `vxt`.

- `vandor-landing` becomes the public website, navigation, and SEO surface
- `vx` and `vxt` repositories remain the source of truth for technical docs
- docs are served under product-specific route families
- `latest` remains in the URL and resolves internally to `v0` for both products

This keeps the writing workflow close to each product repository while giving
Vandor one coherent public docs site.

## Goals

- Keep `Vandor` as the organization brand and public docs shell
- Publish `vx` docs under `/vx/:version/docs/*`
- Publish `vxt` docs under `/vxt/:version/docs/*`
- Preserve product-specific docs ownership in the `vx` and `vxt` repos
- Support `latest` as a stable public URL alias without redirecting
- Generalize the current `vx`-only docs system into a reusable product-docs
  platform inside `vandor-landing`

## Non-Goals

- Make `vandor-landing` the editing source of truth for `vx` or `vxt` docs
- Fetch docs from GitHub or another remote source at request time
- Introduce full semantic version routing such as `v0.1.0` in the public site
  for the current phase
- Build a third independent docs engine for each product
- Replace the existing repo-local docs sites in `vx` or `vxt`

## Current State

### vandor-landing

The site already contains a working versioned docs surface for `vx`:

- routes under `/vx/$version/docs/*`
- local MDX content in `content/docs/v0`, `content/docs/v1`, and `content/docs/v2`
- a `latest` alias that resolves to the highest concrete `vx` docs version

This implementation is currently specialized to `vx`.

### vx

The `vx` repository already has publishable docs content in its own docs site:

- source content under `vx/docs/src/content/docs/*`
- Starlight-based docs information architecture
- command pages, installation docs, quick start, and top-level product pages

### vxt

The `vxt` repository already has publishable markdown docs in-repo:

- guides and reference docs under `vxt/docs/*.md`
- a README that links to those focused docs
- clear public product boundaries and topic structure

## Product and Ownership Model

### Public surface ownership

`vandor-landing` owns:

- public URLs
- docs shell and layout
- shared metadata and SEO behavior
- site navigation and brand framing
- product/version route validation

### Technical docs ownership

`vx` owns the text and structure of `vx` technical docs.

`vxt` owns the text and structure of `vxt` technical docs.

The landing site consumes those docs through local source adapters during
development and build. This preserves repo-local maintenance for product docs
while keeping the public website unified.

## Route Design

### Public routes

For `vx`:

- `/vx/v0/docs/*`
- `/vx/latest/docs/*`

For `vxt`:

- `/vxt/v0/docs/*`
- `/vxt/latest/docs/*`

Unknown products, invalid versions, and missing slugs return `404`.

### URL behavior

`latest` must remain visible in the URL and UI when it is the requested public
version.

Example:

- URL: `/vxt/latest/docs/runtime-api`
- resolved content version: `v0`
- visible route context: still `latest`

There is no redirect to `/vxt/v0/docs/runtime-api`.

## Versioning Model

Version support is product-specific but intentionally simple for the current
phase.

For now:

- `vx` supports `v0` and `latest`
- `vxt` supports `v0` and `latest`

`latest` resolves internally to `v0` for both products.

Version rules must be centralized and product-aware so the app can expand later
without rewriting route logic.

Example shape:

```ts
type ProductSlug = 'vx' | 'vxt'

const productVersions = {
  vx: {
    concrete: ['v0'],
    latest: 'v0',
  },
  vxt: {
    concrete: ['v0'],
    latest: 'v0',
  },
} as const
```

## Architecture

### High-level approach

Turn the current `vx` docs feature into a generalized product-docs platform.

The platform should provide:

- shared route validation
- shared version resolution
- shared page loading contract
- shared docs layout and metadata helpers
- product-specific content adapters

### Why this structure

Copying the existing `vx` docs implementation into a second `vxt` tree would
lock the app into duplicated behavior and diverging rules. The site instead
needs one reusable docs engine with multiple product adapters.

## Module Boundaries

### Shared product-docs modules

Suggested structure:

- `src/features/product-docs/versioning/*`
- `src/features/product-docs/source/*`
- `src/features/product-docs/ui/*`

Responsibilities:

- `versioning`
  - product validation
  - supported version registry per product
  - `latest` resolution per product
- `source`
  - product-specific docs source adapters
  - normalization into one internal docs loading contract
- `ui`
  - shared docs layout
  - metadata helpers
  - shared product/version navigation controls

### Product-specific modules

Product-specific code should be minimal and limited to:

- docs source adapter for `vx`
- docs source adapter for `vxt`
- small metadata/copy helpers where product language differs
- optional future product landing pages outside docs

### Existing vx feature code

Current `src/features/vx/docs/*` and `src/features/vx/versioning/*` should be
refactored into the shared product-docs structure rather than extended in place
as `vx`-only code.

## Content Source Strategy

### Runtime behavior

Do not fetch docs remotely at request time.

During local development and build:

- `vandor-landing` reads docs from the local sibling `vx` repo
- `vandor-landing` reads docs from the local sibling `vxt` repo

This assumes the current Vandor multi-repo workspace layout is available during
development and deployment packaging.

### Normalization requirement

The public renderer should consume one normalized internal content shape even if
the product source layouts differ.

That means:

- `vx` can keep its Starlight docs source structure
- `vxt` can keep its markdown file structure
- `vandor-landing` adapters translate those source formats into the site's
  shared rendering contract

## vx Content Mapping

For the first phase, `vx` should expose a curated user-facing subset from
`vx/docs/src/content/docs/*`.

Initial pages should include:

- `index`
- `install`
- `guides/quickstart`
- relevant published command docs already present in the repo docs

The site should map those pages into stable public slugs without making
`vandor-landing` the authoring location.

## vxt Content Mapping

For the first phase, `vxt` should expose its existing markdown docs directly
through mapped public slugs.

Initial pages should include:

- `getting-started`
- `document-mode`
- `runtime-api`
- `go-bindings`
- `concepts`

This content already has a coherent public structure and is the easiest product
to adapt into the shared renderer.

## Navigation and UX

Each product should have its own page tree and sidebar.

The docs header should always make these things explicit:

- current product
- requested public version
- page title

When the route is `latest`, the UI should continue to show `latest`, not the
resolved concrete version.

If the UX needs a note later such as `Currently serving v0 docs`, that can be
added later, but it is not required for the first implementation.

## Metadata and SEO

`vandor-landing` should own:

- page titles
- descriptions
- canonical public paths
- Open Graph images
- structured data

Metadata should be product-aware and route-aware:

- `vx` docs pages use `vx` branding and paths
- `vxt` docs pages use `vxt` branding and paths

Source repositories remain the content owners, but the landing site remains the
public metadata owner for the web surface.

## Error Handling

- invalid product slug -> `404`
- invalid version slug for a valid product -> `404`
- missing docs page for a valid product/version -> `404`
- missing source repo or source path during development/build -> fail loudly
- incomplete product version registry -> fail loudly

The implementation should not silently fall back to a different product, a
different version, or a placeholder content tree.

## Rollout Plan

1. Generalize the current `vx` docs engine into shared product-docs modules.
2. Keep the existing `vx` public routes intact while moving them to the new
   shared internals.
3. Replace `vx` bundled local content with a `vx` repo-source adapter.
4. Add `vxt` repo-source adapter and public routes under `/vxt/$version/docs/*`.
5. Add product-aware metadata, navigation, and version selectors.

This order keeps the existing `vx` public surface stable while the internals
become reusable.

## Testing Strategy

Primary verification for this repository remains:

- `pnpm typecheck`

No `vitest` or `pnpm test` execution is required for routine work in this repo.

Implementation-level checks should cover:

- `/vx/v0/docs/*` resolution
- `/vx/latest/docs/*` resolution while preserving `latest`
- `/vxt/v0/docs/*` resolution
- `/vxt/latest/docs/*` resolution while preserving `latest`
- product-aware invalid version rejection
- missing slug `404` behavior

## Risks and Constraints

- The landing app currently assumes local bundled content for `vx`; moving to
  repo-source adapters changes the content loading boundary.
- `vx` and `vxt` have different docs source layouts, so normalization must stay
  explicit and minimal.
- Build and deploy environments must have access to the product docs source or a
  pre-materialized equivalent.

## Accepted Decisions

- `vandor-landing` is the public docs surface
- `vx` and `vxt` repos remain the technical docs source of truth
- public docs URLs are product-specific
- both products currently support only `v0` and `latest`
- `latest` stays in the URL and resolves internally to `v0`
- the docs engine should be generalized instead of duplicated
