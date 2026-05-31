# vx and vxt Product Docs Surface Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the current `vx`-only local docs snapshot with a shared multi-product docs platform that publishes `vx` and `vxt` docs from their sibling repos under `vandor-landing`.

**Architecture:** Materialize curated docs from the local `vx` and `vxt` repositories into one generated docs tree before `dev` and `build`, then point one shared Fumadocs-based loader and UI layer at that generated tree. Migrate the existing `vx` routes to the shared engine first, then add `vxt` routes that reuse the same loader, metadata, and versioning logic.

**Tech Stack:** TanStack Start, TanStack Router, React 19, TypeScript, Fumadocs, Nitro server assets, Node.js ESM scripts, pnpm

---

## Constraints

- Do not run `vitest`
- Do not run `pnpm test`
- Required verification baseline is `pnpm typecheck`
- Do not hand-edit `src/routeTree.gen.ts`; let the router plugin regenerate it
- Keep `Vandor` as the organization brand
- Keep `vx` and `vxt` as product names
- For this phase, both products support only `v0` and `latest`
- `latest` must stay in the URL and resolve internally to `v0`
- `vandor-landing` must not become the long-term authoring source for `vx` or `vxt` docs

## File Structure

### Files to create

- Create: `scripts/product-docs-manifest.mjs`
  - explicit source-of-truth map for product docs imports, page order, labels, and output slugs
- Create: `scripts/sync-product-docs.mjs`
  - materializes curated `vx` and `vxt` docs into the generated local docs tree
- Create: `src/features/product-docs/versioning/product-types.ts`
  - shared product slug and version types
- Create: `src/features/product-docs/versioning/versions.ts`
  - source of truth for product-aware supported versions and `latest` mappings
- Create: `src/features/product-docs/versioning/resolve-version.ts`
  - route-facing guards and `latest` resolution helpers
- Create: `src/features/product-docs/source/docs-schema.ts`
  - shared frontmatter schema for imported docs pages
- Create: `src/features/product-docs/source/product-docs-registry.ts`
  - shared product labels, route bases, generated content roots, and metadata defaults
- Create: `src/features/product-docs/source/docs-source.ts`
  - one shared Fumadocs loader over the generated docs tree
- Create: `src/features/product-docs/source/load-product-doc-page.ts`
  - one server loader for product/version/slug docs pages
- Create: `src/features/product-docs/ui/product-docs-layout.tsx`
  - shared docs shell for `vx` and `vxt`
- Create: `src/features/product-docs/ui/product-doc-page.tsx`
  - shared docs renderer page
- Create: `src/features/product-docs/ui/product-doc-version-select.tsx`
  - shared requested-version selector
- Create: `src/features/product-docs/ui/docs-metadata.ts`
  - shared page title, description, and SEO helper functions
- Create: `src/routes/vxt/index.tsx`
  - redirect `/vxt` to `/vxt/latest/docs`
- Create: `src/routes/vxt/$version/index.tsx`
  - redirect `/vxt/:version` to `/vxt/:version/docs`
- Create: `src/routes/vxt/$version/docs/index.tsx`
  - docs home route for `vxt`
- Create: `src/routes/vxt/$version/docs/$.tsx`
  - catch-all docs route for `vxt`

### Files to modify

- Modify: `.gitignore`
  - ignore generated docs artifacts
- Modify: `package.json`
  - add docs sync scripts and wire them into `dev` and `build`
- Modify: `nitro.config.ts`
  - bundle the generated product docs tree instead of `content/docs`
- Modify: `README.md`
  - document the sibling-repo docs sync flow and public product docs routes
- Modify: `src/routes/vx/index.tsx`
  - keep `/vx` redirect behavior but make it compatible with the shared docs platform
- Modify: `src/routes/vx/$version/index.tsx`
  - switch version validation to the shared product-docs versioning helpers
- Modify: `src/routes/vx/$version/docs/index.tsx`
  - replace `vx`-specific loader and metadata with shared product-docs logic
- Modify: `src/routes/vx/$version/docs/$.tsx`
  - replace `vx`-specific loader and metadata with shared product-docs logic
- Modify: `src/features/vx/landing/vx-landing-page.tsx`
  - switch the requested version type import to the shared product-docs version types
- Modify: `src/features/vx/landing/vx-metadata.ts`
  - switch the requested version type import to the shared product-docs version types

### Files to delete after migration

- Delete: `src/features/vx/docs/docs-layout.tsx`
- Delete: `src/features/vx/docs/vx-doc-page.tsx`
- Delete: `src/features/vx/docs/vx-doc-version-select.tsx`
- Delete: `src/features/vx/docs/docs-metadata.ts`
- Delete: `src/features/vx/docs/docs-source.ts`
- Delete: `src/features/vx/docs/load-doc-page.ts`
- Delete: `src/features/vx/versioning/version-types.ts`
- Delete: `src/features/vx/versioning/versions.ts`
- Delete: `src/features/vx/versioning/resolve-version.ts`
- Delete: `content/docs/v0/getting-started.mdx`
- Delete: `content/docs/v0/index.mdx`
- Delete: `content/docs/v0/meta.json`
- Delete: `content/docs/v1/getting-started.mdx`
- Delete: `content/docs/v1/index.mdx`
- Delete: `content/docs/v1/meta.json`
- Delete: `content/docs/v2/getting-started.mdx`
- Delete: `content/docs/v2/index.mdx`
- Delete: `content/docs/v2/meta.json`

---

## Chunk 1: Generated Docs Sync Pipeline

### Task 1: Create the curated import manifest

**Files:**
- Create: `scripts/product-docs-manifest.mjs`

- [ ] **Step 1: Define the shared manifest shape**

Include explicit product entries for `vx` and `vxt` with:

- source repo root
- public product slug
- concrete version `v0`
- `latest` alias target `v0`
- sidebar order
- source file path to public slug mapping

Use a concrete shape such as:

```js
export const productDocsManifest = {
  vx: {
    sourceRoot: '../vx',
    versions: {
      v0: {
        pages: [
          { source: 'docs/src/content/docs/index.md', slug: 'index', title: 'vx' },
          { source: 'docs/src/content/docs/install.md', slug: 'install', title: 'Install' },
          { source: 'docs/src/content/docs/guides/quickstart.md', slug: 'guides/quickstart', title: 'Quick Start' },
        ],
      },
    },
  },
  vxt: {
    sourceRoot: '../vxt',
    versions: {
      v0: {
        pages: [
          { source: 'docs/getting-started.md', slug: 'getting-started', title: 'Getting Started' },
          { source: 'docs/document-mode.md', slug: 'document-mode', title: 'Document Mode' },
        ],
      },
    },
  },
}
```

- [ ] **Step 2: Include the full first-phase page set**

The initial manifest must include:

- `vx`
  - `index`
  - `install`
  - `guides/quickstart`
  - the already-published command docs under `docs/src/content/docs/commands/*`
- `vxt`
  - `getting-started`
  - `document-mode`
  - `runtime-api`
  - `go-bindings`
  - `concepts`

- [ ] **Step 3: Keep labels and grouping explicit**

Add enough metadata in the manifest to generate `meta.json` deterministically
for each product/version. Do not infer sidebar order from filesystem scans.

- [ ] **Step 4: Commit**

```bash
git add scripts/product-docs-manifest.mjs
git commit -m "chore: add product docs import manifest"
```

### Task 2: Build the local docs materialization script

**Files:**
- Create: `scripts/sync-product-docs.mjs`
- Create: `scripts/product-docs-manifest.mjs`

- [ ] **Step 1: Recreate one generated output root**

Write the script so it fully recreates:

```text
.generated/product-docs/
  vx/
    v0/
  vxt/
    v0/
```

Delete stale generated files before writing new output so old slugs cannot stay
behind after source changes.

- [ ] **Step 2: Copy and normalize docs pages**

For every manifest page:

- verify the source file exists
- read the source markdown
- preserve existing frontmatter where it is already valid
- add frontmatter when the source doc has none
- write the output page as `.mdx`

Prefer one normalization helper that can handle:

- `vx` Starlight markdown files from `docs/src/content/docs/*`
- `vxt` markdown files from `docs/*.md`

- [ ] **Step 3: Generate sidebar metadata**

Emit `meta.json` for each generated version directory from the manifest instead
of relying on source repo-native nav formats.

Expected output examples:

```text
.generated/product-docs/vx/v0/meta.json
.generated/product-docs/vxt/v0/meta.json
```

- [ ] **Step 4: Fail loudly on missing inputs**

Throw a process error when:

- a source repo path is missing
- a declared page file is missing
- a manifest product/version entry is malformed

Do not silently skip pages.

- [ ] **Step 5: Add a CLI entrypoint**

The script should be runnable with:

```bash
node scripts/sync-product-docs.mjs
```

and should print which product/version trees were generated.

- [ ] **Step 6: Commit**

```bash
git add scripts/product-docs-manifest.mjs scripts/sync-product-docs.mjs
git commit -m "feat: add product docs sync script"
```

### Task 3: Wire sync into the app toolchain

**Files:**
- Modify: `.gitignore`
- Modify: `package.json`
- Modify: `nitro.config.ts`

- [ ] **Step 1: Ignore generated docs artifacts**

Add:

```gitignore
.generated
```

- [ ] **Step 2: Add sync scripts to package.json**

Add:

```json
{
  "scripts": {
    "docs:sync": "node scripts/sync-product-docs.mjs",
    "predev": "pnpm docs:sync",
    "prebuild": "pnpm docs:sync"
  }
}
```

Keep existing `dev` and `build` commands otherwise unchanged.

- [ ] **Step 3: Point Nitro server assets at the generated docs root**

Replace the current docs asset dir:

```ts
{
  baseName: 'vx-docs',
  dir: './content/docs',
}
```

with a product-neutral asset root such as:

```ts
{
  baseName: 'product-docs',
  dir: './.generated/product-docs',
}
```

- [ ] **Step 4: Run the sync command**

Run: `pnpm docs:sync`
Expected: SUCCESS and generated trees for `vx/v0` and `vxt/v0`

- [ ] **Step 5: Run typecheck**

Run: `pnpm typecheck`
Expected: PASS

- [ ] **Step 6: Commit**

```bash
git add .gitignore package.json nitro.config.ts scripts/product-docs-manifest.mjs scripts/sync-product-docs.mjs
git commit -m "build: wire generated product docs sync"
```

---

## Chunk 2: Shared Product Docs Foundation

### Task 4: Create shared product and versioning primitives

**Files:**
- Create: `src/features/product-docs/versioning/product-types.ts`
- Create: `src/features/product-docs/versioning/versions.ts`
- Create: `src/features/product-docs/versioning/resolve-version.ts`

- [ ] **Step 1: Define shared product and version types**

Create `product-types.ts` with a narrow shape such as:

```ts
export const productSlugs = ['vx', 'vxt'] as const
export type ProductSlug = (typeof productSlugs)[number]
export type ConcreteDocVersion = 'v0'
export type RequestedDocVersion = ConcreteDocVersion | 'latest'
```

- [ ] **Step 2: Create one product-aware registry**

Create `versions.ts` with one source of truth:

```ts
export const productVersions = {
  vx: { concrete: ['v0'], latest: 'v0' },
  vxt: { concrete: ['v0'], latest: 'v0' },
} as const
```

Also expose helpers for:

- supported requested versions per product
- latest concrete version per product

- [ ] **Step 3: Add route-facing guards and resolver helpers**

Create helpers in `resolve-version.ts` for:

- `isProductSlug(value)`
- `isRequestedDocVersion(product, value)`
- `resolveDocVersion(product, requestedVersion)`
- optional assertion helper for route files

Route files should not duplicate product/version validation logic.

- [ ] **Step 4: Run typecheck**

Run: `pnpm typecheck`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/features/product-docs/versioning
git commit -m "feat: add shared product docs versioning"
```

### Task 5: Create the shared docs loader and UI layer

**Files:**
- Create: `src/features/product-docs/source/docs-schema.ts`
- Create: `src/features/product-docs/source/product-docs-registry.ts`
- Create: `src/features/product-docs/source/docs-source.ts`
- Create: `src/features/product-docs/source/load-product-doc-page.ts`
- Create: `src/features/product-docs/ui/product-docs-layout.tsx`
- Create: `src/features/product-docs/ui/product-doc-page.tsx`
- Create: `src/features/product-docs/ui/product-doc-version-select.tsx`
- Create: `src/features/product-docs/ui/docs-metadata.ts`

- [ ] **Step 1: Create a shared imported-doc schema**

Define one schema compatible with generated docs pages:

```ts
pageSchema.extend({
  banner: z.string().optional(),
})
```

Keep it minimal. Do not add product-specific fields unless the generated content
already needs them.

- [ ] **Step 2: Create one product registry for runtime metadata**

In `product-docs-registry.ts`, define:

- product display label
- docs route base
- docs landing URL
- default description
- OG image path

Use one lookup function instead of `if (product === 'vx')` checks scattered
across the codebase.

- [ ] **Step 3: Generalize the current localMd loader**

Port the current `vx` docs source behavior into `docs-source.ts`, but make it:

- product-aware
- version-aware
- rooted in `.generated/product-docs` during development
- rooted in bundled Nitro server assets in production

Use a cache key shaped like:

```ts
`${product}:${requestedVersion}:${resolvedVersion}`
```

- [ ] **Step 4: Generalize the current server loader**

Create `load-product-doc-page.ts` that:

- validates product/version
- resolves `latest`
- loads the requested page by slug
- returns the shared serialized render payload

Return:

- `product`
- `requestedVersion`
- `resolvedVersion`
- `title`
- `description`
- `banner`
- `pageTree`
- `render`

- [ ] **Step 5: Extract a shared docs page renderer**

Generalize the current `VxDocsLayout`, `VxDocPage`, and version selector into:

- `ProductDocsLayout`
- `ProductDocPage`
- `ProductDocVersionSelect`

Parameterize:

- product slug
- requested version
- page tree
- metadata labels

Keep the existing visual treatment unless a product-specific exception is
actually required.

- [ ] **Step 6: Centralize docs metadata helpers**

Create `docs-metadata.ts` with helpers such as:

- `getProductDocsTitle(product, requestedVersion, title?)`
- `getProductDocsDescription(product, requestedVersion, description?)`

`vx` and `vxt` should share the same function shapes but have product-aware text
from the registry.

- [ ] **Step 7: Run typecheck**

Run: `pnpm typecheck`
Expected: PASS

- [ ] **Step 8: Commit**

```bash
git add src/features/product-docs
git commit -m "feat: add shared product docs runtime"
```

---

## Chunk 3: Migrate vx to the Shared Platform

### Task 6: Move existing vx docs routes onto the shared product-docs engine

**Files:**
- Modify: `src/routes/vx/index.tsx`
- Modify: `src/routes/vx/$version/index.tsx`
- Modify: `src/routes/vx/$version/docs/index.tsx`
- Modify: `src/routes/vx/$version/docs/$.tsx`
- Modify: `src/features/vx/landing/vx-landing-page.tsx`
- Modify: `src/features/vx/landing/vx-metadata.ts`

- [ ] **Step 1: Switch vx landing version imports**

Replace imports from:

```ts
#/features/vx/versioning/...
```

with the new shared product-docs versioning module. The `vx` landing should
continue to accept only `v0` or `latest`.

- [ ] **Step 2: Replace vx docs route loaders**

Update the two `vx` docs routes to call the shared `loadProductDocPage` with:

- `product: 'vx'`
- `requestedVersion: params.version`

and render the shared `ProductDocPage`.

- [ ] **Step 3: Replace vx docs metadata helpers**

Update the route `head` functions to use the shared metadata helpers and the
shared product registry for image and path behavior.

- [ ] **Step 4: Keep vx public URLs stable**

Do not change these public paths:

- `/vx/latest`
- `/vx/v0/docs/*`
- `/vx/latest/docs/*`

The refactor must be internal only from the user's perspective.

- [ ] **Step 5: Run typecheck**

Run: `pnpm typecheck`
Expected: PASS

- [ ] **Step 6: Commit**

```bash
git add src/routes/vx src/features/vx/landing
git commit -m "refactor: move vx docs routes to shared product docs engine"
```

### Task 7: Delete the old vx-only docs runtime and local snapshot

**Files:**
- Delete: `src/features/vx/docs/docs-layout.tsx`
- Delete: `src/features/vx/docs/vx-doc-page.tsx`
- Delete: `src/features/vx/docs/vx-doc-version-select.tsx`
- Delete: `src/features/vx/docs/docs-metadata.ts`
- Delete: `src/features/vx/docs/docs-source.ts`
- Delete: `src/features/vx/docs/load-doc-page.ts`
- Delete: `src/features/vx/versioning/version-types.ts`
- Delete: `src/features/vx/versioning/versions.ts`
- Delete: `src/features/vx/versioning/resolve-version.ts`
- Delete: `content/docs/v0/getting-started.mdx`
- Delete: `content/docs/v0/index.mdx`
- Delete: `content/docs/v0/meta.json`
- Delete: `content/docs/v1/getting-started.mdx`
- Delete: `content/docs/v1/index.mdx`
- Delete: `content/docs/v1/meta.json`
- Delete: `content/docs/v2/getting-started.mdx`
- Delete: `content/docs/v2/index.mdx`
- Delete: `content/docs/v2/meta.json`

- [ ] **Step 1: Delete the obsolete vx-only docs modules**

Remove the `src/features/vx/docs/*` files after all route imports have moved to
the shared product-docs layer.

- [ ] **Step 2: Delete the obsolete vx-only versioning modules**

Remove `src/features/vx/versioning/*` after the landing and docs routes no
longer import them.

- [ ] **Step 3: Delete the old committed docs snapshot**

Remove `content/docs/*` only after `.generated/product-docs/vx/v0/*` is the
sole docs source in both development and production code paths.

- [ ] **Step 4: Run typecheck**

Run: `pnpm typecheck`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add -A src/features/vx/docs src/features/vx/versioning content/docs
git commit -m "refactor: remove legacy vx docs snapshot"
```

---

## Chunk 4: Add vxt Public Docs Routes

### Task 8: Add the vxt route family on top of the shared docs runtime

**Files:**
- Create: `src/routes/vxt/index.tsx`
- Create: `src/routes/vxt/$version/index.tsx`
- Create: `src/routes/vxt/$version/docs/index.tsx`
- Create: `src/routes/vxt/$version/docs/$.tsx`

- [ ] **Step 1: Add the top-level vxt redirect**

Create `/vxt` so it redirects to:

```text
/vxt/latest/docs
```

- [ ] **Step 2: Add the version-root vxt redirect**

Create `/vxt/$version` so it redirects to:

```text
/vxt/$version/docs
```

Validate the version slug before redirecting. Invalid versions must return
`404`, not redirect.

- [ ] **Step 3: Add the vxt docs index route**

Use the shared loader with:

- `product: 'vxt'`
- `slugs: []`

and render the shared `ProductDocPage`.

- [ ] **Step 4: Add the vxt docs catch-all route**

Use the shared loader with:

- `product: 'vxt'`
- `requestedVersion: params.version`
- `slugs: params._splat?.split('/') ?? []`

The `head` function should use the shared product docs metadata helpers.

- [ ] **Step 5: Run typecheck**

Run: `pnpm typecheck`
Expected: PASS

- [ ] **Step 6: Commit**

```bash
git add src/routes/vxt
git commit -m "feat: add vxt public docs routes"
```

---

## Chunk 5: Documentation and Final Verification

### Task 9: Document the sync workflow and public docs surface

**Files:**
- Modify: `README.md`

- [ ] **Step 1: Document the docs source-of-truth model**

Add a short section explaining:

- `vx` docs are authored in the sibling `vx` repo
- `vxt` docs are authored in the sibling `vxt` repo
- `vandor-landing` materializes those docs locally via `pnpm docs:sync`

- [ ] **Step 2: Document the public routes**

Add the public docs entry points:

- `/vx/latest/docs`
- `/vxt/latest/docs`

Also note that `latest` resolves internally to `v0` for both products.

- [ ] **Step 3: Document the local developer workflow**

Explain that:

- `pnpm dev` runs docs sync first
- `pnpm build` runs docs sync first
- when docs in sibling repos change during a running dev session, rerun
  `pnpm docs:sync` before refreshing

- [ ] **Step 4: Commit**

```bash
git add README.md
git commit -m "docs: describe product docs sync workflow"
```

### Task 10: Final verification

**Files:**
- Verify: `scripts/product-docs-manifest.mjs`
- Verify: `scripts/sync-product-docs.mjs`
- Verify: `src/features/product-docs/**/*`
- Verify: `src/routes/vx/**/*`
- Verify: `src/routes/vxt/**/*`
- Verify: `README.md`

- [ ] **Step 1: Re-run docs sync**

Run: `pnpm docs:sync`
Expected: SUCCESS and no missing source-file errors

- [ ] **Step 2: Run typecheck**

Run: `pnpm typecheck`
Expected: PASS

- [ ] **Step 3: Do one manual route smoke pass**

Run: `pnpm dev`
Expected: app boots successfully

Check these routes manually:

- `/vx/latest/docs`
- `/vx/v0/docs/install`
- `/vxt/latest/docs`
- `/vxt/v0/docs/runtime-api`

Expected:

- each page renders
- version selector shows `latest (v0)` or `v0`
- invalid version such as `/vxt/v1/docs` returns `404`

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: publish shared vx and vxt docs surface"
```

## Execution Notes

- Keep the sync script deterministic and manifest-driven
- Do not read sibling repos at request time in production code
- Keep runtime product docs logic shared; do not reintroduce `vx`-only copies
- Prefer small refactors that keep the public `vx` routes stable before adding
  `vxt`
- Do not hand-maintain `.generated/product-docs`; it should always come from the
  sync script

## Expected End State

- `pnpm dev` and `pnpm build` materialize `vx` and `vxt` docs first
- Nitro bundles `.generated/product-docs` instead of `content/docs`
- `vx` docs still work at `/vx/v0/docs/*` and `/vx/latest/docs/*`
- `vxt` docs work at `/vxt/v0/docs/*` and `/vxt/latest/docs/*`
- both products resolve `latest` internally to `v0` without redirecting
- `vandor-landing` remains the public docs shell
- `vx` and `vxt` remain the technical docs source of truth
