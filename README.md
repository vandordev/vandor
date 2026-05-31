# Vandor Landing

`vandor-landing` is the Vandor public website built with TanStack Start.

It serves:

- the main `Vandor` landing page at `/`
- the `vx` product landing at `/vx/:version`
- the public docs surfaces for `vx` and `vxt`

## Purpose

`Vandor` remains the organization brand.

Product docs live under this site as the public web surface, but their technical
content stays owned by the sibling product repos:

- `../vx`
- `../vxt`

This app materializes curated docs from those repos into a generated local tree
before development and production builds.

## Public Routes

### Vandor

- `/`
- `/about`
- `/work`
- `/collaborate`
- `/support`
- `/writing`
- `/news`
- `/partners`

### vx

- `/vx/latest`
- `/vx/v0`
- `/vx/latest/docs`
- `/vx/v0/docs/*`

`latest` stays in the URL and resolves internally to `v0`.

### vxt

- `/vxt/latest/docs`
- `/vxt/v0/docs/*`

`/vxt` redirects to `/vxt/latest/docs`.

`latest` stays in the URL and resolves internally to `v0`.

## Docs Source Of Truth

Do not author `vx` or `vxt` technical docs inside this repo.

Docs content comes from:

- `vx`
  - `../vx/docs/src/content/docs/*`
- `vxt`
  - `../vxt/README.md`
  - `../vxt/docs/*.md`

The generated output lives under:

```text
.generated/product-docs/
```

This generated tree is build input, not source of truth.

## Commands

Install dependencies:

```bash
pnpm install
```

Start development:

```bash
pnpm dev
```

Build for production:

```bash
pnpm build
```

Sync imported product docs manually:

```bash
pnpm docs:sync
```

## Docs Sync Workflow

`pnpm dev` runs `pnpm docs:sync` first.

`pnpm build` runs `pnpm docs:sync` first.

If you change docs in the sibling `vx` or `vxt` repos while this app is
already running, rerun:

```bash
pnpm docs:sync
```

before refreshing the site.

## Verification

The required verification baseline for routine work in this repo is:

```bash
pnpm typecheck
```

Do not use:

- `vitest`
- `pnpm test`

unless the task explicitly requires it.

## Implementation Notes

- The shared product docs runtime lives under `src/features/product-docs/`.
- `vx` keeps its dedicated landing under `src/features/vx/landing/`.
- `Nitro` bundles `.generated/product-docs` as server assets for production.
- `src/routeTree.gen.ts` is generated. Do not edit it by hand.
