# AGENTS.md

This repo is the `Vandor` landing and product site built with TanStack Start.

## Purpose

- `/` is the main `Vandor` landing page
- `vx` is a Vandor-maintained CLI product
- future `vx` versioned routes and docs should live in this app unless explicitly split later

## Key Commands

- `pnpm dev`
- `pnpm build`
- `pnpm typecheck`
- `pnpm lint`
- `pnpm check`

## Verification Rules

- Do not run `vitest`
- Do not run `pnpm test`
- No test execution is required for routine work in this repo
- The required verification baseline is a type-safe check with:
  - `pnpm typecheck`

## Working Notes

- Keep `Vandor` as the organization brand
- Keep `vx` as the CLI product name
- Prefer small, focused route components and move product logic into feature modules
- For versioned `vx` docs, treat `latest` as an alias that stays in the URL while resolving to the highest concrete supported version
