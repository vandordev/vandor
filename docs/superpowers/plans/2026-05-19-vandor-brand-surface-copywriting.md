# Vandor Brand Surface Copywriting Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reposition non-product Vandor pages around the Vandor ecosystem, split `News` from `Writing`, and reduce direct `vx` emphasis on the brand surface.

**Architecture:** Update shared shell content first so navigation and CTAs reflect the new brand structure everywhere. Then adjust page-level copy on home, partners, and news, and add a new `/writing` route as the broader publication surface.

**Tech Stack:** TanStack Start, React, TypeScript, TanStack Router

---

## Chunk 1: Shared Brand Shell

### Task 1: Update shared shell content

**Files:**
- Modify: `src/components/site-shell-content.ts`
- Modify: `src/components/footer-5.tsx`

- [ ] Update brand-level nav items to include both `Writing` and `News`
- [ ] Remove `vx` as the main brand CTA and replace it with brand-surface actions
- [ ] Refresh footer copy so it describes Vandor as an ecosystem of tools, documentation, and technical work

## Chunk 2: Brand Pages

### Task 2: Reframe the homepage around Vandor

**Files:**
- Modify: `src/features/home/vandor-home-hero.tsx`
- Modify: `src/features/home/vandor-open-work.tsx`
- Modify: `src/features/home/vandor-home-highlights.tsx`
- Modify: `src/features/home/home-metadata.ts`

- [ ] Rewrite hero and supporting sections to emphasize Vandor over `vx`
- [ ] Keep `vx` visible only as one product within the broader work surface
- [ ] Reframe the homepage content feed as Vandor news rather than general writing

### Task 3: Reframe page-specific copy

**Files:**
- Modify: `src/features/news/vandor-news-section.tsx`
- Modify: `src/features/partners/vandor-partners-page.tsx`
- Modify: `src/features/news/news-metadata.ts`
- Modify: `src/features/partners/partner-metadata.ts`

- [ ] Narrow `/news` copy to Vandor-specific updates and releases
- [ ] Shift `/partners` copy toward collaboration within the Vandor ecosystem
- [ ] Update metadata descriptions to match the new positioning

## Chunk 3: Writing Surface

### Task 4: Add the `/writing` route

**Files:**
- Create: `src/features/writing/vandor-writing-page.tsx`
- Create: `src/features/writing/writing-metadata.ts`
- Create: `src/routes/writing/index.tsx`

- [ ] Add a brand-level writing page that explains what belongs in `Writing`
- [ ] Keep the initial page static and broad rather than inventing a full content system
- [ ] Link the new route from the shared shell

## Chunk 4: Verification

### Task 5: Regenerate router output if needed and verify types

**Files:**
- Modify if generated: `src/routeTree.gen.ts`

- [ ] Run the router generation path if the new route requires it
- [ ] Run `pnpm typecheck`
- [ ] Confirm no forbidden test command was used
