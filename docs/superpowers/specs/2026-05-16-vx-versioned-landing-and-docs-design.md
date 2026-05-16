# vx Versioned Landing and Docs Design

## Summary

Add a versioned `vx` product surface under the `Vandor` site:

- `/` remains the main `Vandor` landing page
- `/vx/:version` serves one shared `vx` landing page
- `/vx/:version/docs/*` serves versioned `vx` documentation

`Vandor` remains the organization brand. `vx` is the CLI product maintained by Vandor.

## Goals

- Preserve `Vandor` as the top-level brand
- Introduce a dedicated `vx` route family
- Keep the `vx` marketing landing shared across all versions
- Version only the docs content
- Support `latest` as a stable URL that resolves to the highest supported version without redirecting
- Keep version rules explicit and centralized

## Non-Goals

- Separate docs into another app or repo
- Create distinct marketing layouts for `v0`, `v1`, `v2`
- Let unknown version slugs silently fall back to another version
- Build a fully custom docs engine when Fumadocs can handle the docs surface

## Route Design

### Top-level routes

- `/`
  - Existing `Vandor` landing
- `/vx/:version`
  - Shared `vx` landing page
- `/vx/:version/docs/*`
  - Versioned docs surface powered by Fumadocs

### Valid versions

Supported versions are explicit and finite:

- `v0`
- `v1`
- `v2`
- `latest`

Unknown versions return `404`.

## Version Resolution

Create one source of truth for version support and `latest` resolution.

Example shape:

```ts
export const supportedDocVersions = ['v0', 'v1', 'v2'] as const
export const latestDocVersion = 'v2' as const
```

Resolver behavior:

- `v0` -> `v0`
- `v1` -> `v1`
- `v2` -> `v2`
- `latest` -> `v2`

This resolver must be shared by:

- route validation
- docs content lookup
- page metadata
- docs navigation/version selector

## URL Behavior

### `/vx/:version`

All valid versions render the same shared `vx` landing content.

Examples:

- `/vx/v0`
- `/vx/v1`
- `/vx/v2`
- `/vx/latest`

These pages may show the selected version in the UI, but they do not require different marketing content.

### `/vx/latest/docs/*`

This route must stay on the `latest` URL while rendering docs from the current highest concrete version.

Example:

- URL: `/vx/latest/docs/getting-started`
- Content source: docs for `v2`

There is no redirect to `/vx/v2/docs/getting-started`.

## Information Architecture

### Vandor

- Brand and organization
- Owns the root landing and site shell
- Presents `vx` as one of Vandor's open-source tools

### vx

- Product/CLI identity
- Lives under `/vx`
- Uses shared landing content
- Uses versioned docs content

## Component and File Boundaries

### Routing

Introduce a route subtree for `vx`.

Expected route structure:

- `src/routes/index.tsx`
- `src/routes/vx/$version/index.tsx`
- `src/routes/vx/$version/docs/...`

The route layer should stay thin and delegate to feature modules.

### vx feature modules

Suggested structure:

- `src/features/vx/landing/*`
- `src/features/vx/docs/*`
- `src/features/vx/versioning/*`

Responsibilities:

- `landing`
  - shared `vx` marketing surface
- `docs`
  - Fumadocs app wiring
  - docs shell
  - content lookup
- `versioning`
  - supported version list
  - `latest` resolution
  - route guards/helpers

## Docs Content Structure

Docs content is versioned by concrete version only.

Suggested layout:

- `content/docs/v0/*`
- `content/docs/v1/*`
- `content/docs/v2/*`

There is no `content/docs/latest/*`.

`latest` always maps to the concrete version declared by `latestDocVersion`.

## Fumadocs Integration

Use one Fumadocs integration inside this app.

Requirements:

- One shared docs renderer and docs shell
- Content source selected from the resolved version
- Ability to render docs while preserving the original requested URL
- Version-aware navigation UI

The Fumadocs surface should not own version resolution logic itself. It should consume the resolved version from the app layer.

## Metadata and UX Rules

### Shared landing

- `Vandor` remains visible as the site brand
- `vx` is presented as the CLI product
- CTA language stays product-focused, e.g. `Install vx`, `Read vx docs`

### Docs pages

- Docs header should make the current requested version clear
- `latest` should be displayed as `latest`, even when the underlying content source is `v2`
- Optionally expose a note such as `Currently serving v2 docs` if needed later, but not required for the first version

## Error Handling

- Invalid `:version` -> `404`
- Valid version but missing docs page -> docs `404`
- Missing concrete version folder for a declared supported version -> fail loudly in development
- Missing `latestDocVersion` mapping -> fail loudly in development

## Testing Strategy

### Routing tests

- `/vx/v0` renders the shared `vx` landing
- `/vx/v1` renders the shared `vx` landing
- `/vx/v2` renders the shared `vx` landing
- `/vx/latest` renders the shared `vx` landing
- invalid version returns `404`

### Resolver tests

- `latest` resolves to highest concrete version
- concrete versions resolve to themselves
- invalid versions are rejected

### Docs tests

- `/vx/v2/docs/...` loads `v2` docs
- `/vx/latest/docs/...` loads `v2` docs while preserving `latest` in the route context
- missing docs slug returns docs `404`

## Rollout Plan

1. Add centralized versioning utilities
2. Add shared `vx` landing route subtree
3. Integrate Fumadocs in the same app
4. Add versioned docs content folders
5. Wire `latest` to the highest concrete version without redirect
6. Add route and resolver tests

## Open Decisions Already Resolved

- Single app, not separate docs app
- Shared `vx` landing for all versions
- Docs differ by version
- `latest` stays in the URL
- `latest` resolves to the highest concrete version
