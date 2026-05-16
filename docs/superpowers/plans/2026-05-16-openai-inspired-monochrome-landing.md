# OpenAI-Inspired Monochrome Landing Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the starter homepage with a monochrome landing page and update the global theme tokens to a true-black OpenAI-like visual direction.

**Architecture:** Keep the implementation intentionally small by changing only the homepage route and the existing global stylesheet. Reuse the existing semantic CSS classes already present in `src/styles.css` so the visual system remains centralized instead of scattering one-off Tailwind styling everywhere.

**Tech Stack:** React 19, TanStack Start/Router, Tailwind CSS v4, Vitest, Testing Library

---

## Chunk 1: Homepage Behavior

### Task 1: Add route-level coverage for the new landing page

**Files:**
- Create: `src/routes/-index.test.tsx`
- Modify: `src/routes/index.tsx`

- [ ] **Step 1: Write the failing test**

Add a test that renders the home route component and expects:
- a hero heading for the new landing page
- the primary CTA text
- a features heading or section content

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm exec vitest run --environment jsdom src/routes/-index.test.tsx`
Expected: FAIL because the current placeholder page does not include the new landing content.

- [ ] **Step 3: Write minimal homepage implementation**

Replace the placeholder with a structured landing page that uses the existing custom CSS classes plus Tailwind layout utilities.

- [ ] **Step 4: Run test to verify it passes**

Run: `pnpm exec vitest run --environment jsdom src/routes/-index.test.tsx`
Expected: PASS

## Chunk 2: Global Monochrome Theme

### Task 2: Rework existing design tokens and shared classes

**Files:**
- Modify: `src/styles.css`

- [ ] **Step 1: Replace palette and typography tokens**

Switch imports and `@theme` font wiring to `Plus Jakarta Sans`, then replace the green-tinted tokens in `:root` and `.dark` with monochrome values centered on `#000`.

- [ ] **Step 2: Update shared class styling**

Adjust body background, surface layers, hover states, link styles, cards, code blocks, and footer so they align with the new monochrome look while preserving the existing class API.

- [ ] **Step 3: Verify route test still passes**

Run: `pnpm exec vitest run --environment jsdom src/routes/-index.test.tsx`
Expected: PASS

## Chunk 3: Final Verification

### Task 3: Run project verification

**Files:**
- No file changes

- [ ] **Step 1: Run full test suite**

Run: `pnpm test`
Expected: PASS

- [ ] **Step 2: Run production build**

Run: `pnpm build`
Expected: PASS
