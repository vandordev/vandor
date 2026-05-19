# Five Writing Articles Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add five new source-backed `/writing` articles, supporting cover images and diagrams, and promote a new featured article across existing writing surfaces.

**Architecture:** Reuse the existing MDX-based writing pipeline with no route or loader changes. Implementation is content-first: create five focused MDX entries under `content/writing`, store supporting cover assets under `public/images/writing`, and update the current featured state by editing frontmatter only.

**Tech Stack:** TanStack Start, Fumadocs local MDX loader, Mermaid in MDX, local static images, `pnpm typecheck`

---

## Chunk 1: Source Material and Archive Setup

### Task 1: Confirm content system constraints and article file layout

**Files:**
- Review: `src/features/writing/writing-types.ts`
- Review: `src/features/writing/writing-source.ts`
- Review: `src/features/writing/load-writing-index.ts`
- Review: `content/writing/copy-fail-is-not-just-a-local-linux-bug.mdx`

- [ ] **Step 1: Confirm allowed `kind` values and required frontmatter fields**

Read the writing types and loader files to confirm valid `kind` values, metadata requirements, and featured-entry behavior.

- [ ] **Step 2: Confirm current archive baseline**

List current files in `content/writing` and note the existing featured article and publish date.

- [ ] **Step 3: Lock article slugs and publish dates**

Use the approved spec to define exact slugs, `publishedAt` values, and `kind` values for all five new entries before writing content.

### Task 2: Gather primary-source links for all five articles

**Files:**
- Create later: `content/writing/*.mdx`

- [ ] **Step 1: Collect npm source links**

Use official npm docs for trusted publishing and CI/CD token guidance.

- [ ] **Step 2: Collect GitHub Actions roadmap links**

Use the official GitHub blog roadmap post and note the main control layers.

- [ ] **Step 3: Collect Ubuntu AppArmor advisory links**

Use the Ubuntu advisory and CVE page details needed for the CrackArmor article.

- [ ] **Step 4: Collect Kubernetes v1.36 links**

Use the official Kubernetes posts on manifest-based admission control and the v1.36 release.

- [ ] **Step 5: Collect GitHub maintainer commentary links**

Use the official GitHub blog posts on Eternal September and Maintainer Month.

## Chunk 2: Visual Assets

### Task 3: Add cover images for the five new articles

**Files:**
- Create: `public/images/writing/npm-publish-tokens-cover.jpg`
- Create: `public/images/writing/github-actions-policy-cover.jpg`
- Create: `public/images/writing/crackarmor-boundary-cover.jpg`
- Create: `public/images/writing/kubernetes-admission-policy-cover.jpg`
- Create: `public/images/writing/open-source-friction-cover.jpg`

- [ ] **Step 1: Choose fitting imagery for each topic**

Pick understated technical/editorial imagery that matches Vandor’s tone and does not feel like generic SaaS stock.

- [ ] **Step 2: Download and normalize the images**

Save each cover locally under `public/images/writing` using stable filenames and a landscape ratio suitable for current article cards.

- [ ] **Step 3: Verify image paths line up with planned frontmatter**

Make sure every planned `coverImage` value matches a real local file path.

### Task 4: Decide which articles need Mermaid diagrams

**Files:**
- Modify later: `content/writing/long-lived-npm-publish-tokens-should-be-treated-as-migration-debt.mdx`
- Modify later: `content/writing/github-actions-security-is-moving-from-secrets-to-policy.mdx`
- Modify later: `content/writing/kubernetes-policy-that-lives-only-in-the-api-is-not-a-strong-enough-boundary.mdx`

- [ ] **Step 1: Keep diagrams only where they explain control boundaries**

Limit Mermaid usage to the npm, GitHub Actions, and Kubernetes articles unless another article clearly benefits.

- [ ] **Step 2: Keep diagram shapes simple**

Prefer readable one-line labels and modest node counts that fit the current renderer constraints.

## Chunk 3: Article Writing

### Task 5: Write the npm trusted publishing article

**Files:**
- Create: `content/writing/long-lived-npm-publish-tokens-should-be-treated-as-migration-debt.mdx`

- [ ] **Step 1: Add complete frontmatter**

Set title, summary, `publishedAt`, `kind`, `published`, `featured`, tags, cover image, and SEO metadata.

- [ ] **Step 2: Write the article body**

Write the thesis-first essay using the approved structure: what changed, why it matters, practical migration guidance, and broader lesson.

- [ ] **Step 3: Add one Mermaid diagram**

Show the difference between OIDC-based trusted publishing and long-lived token risk.

### Task 6: Write the GitHub Actions policy article

**Files:**
- Create: `content/writing/github-actions-security-is-moving-from-secrets-to-policy.mdx`

- [ ] **Step 1: Add complete frontmatter**

Set metadata and keep `featured: false`.

- [ ] **Step 2: Write the article body**

Center the essay on secure defaults, policy, scoped credentials, and observability rather than secret storage alone.

- [ ] **Step 3: Add one Mermaid diagram**

Show the three control layers: ecosystem, attack surface, and infrastructure.

### Task 7: Write the CrackArmor article

**Files:**
- Create: `content/writing/crackarmor-is-a-boundary-problem-not-just-an-apparmor-bug.mdx`

- [ ] **Step 1: Add complete frontmatter**

Set security-focused metadata and local cover image.

- [ ] **Step 2: Write the article body**

Explain the Ubuntu advisory, high-priority risk, and why shared Linux and container hosts should treat this as a boundary problem.

- [ ] **Step 3: Keep the visual treatment minimal**

Use the cover image only unless a simple diagram becomes clearly necessary.

### Task 8: Write the Kubernetes admission boundary article

**Files:**
- Create: `content/writing/kubernetes-policy-that-lives-only-in-the-api-is-not-a-strong-enough-boundary.mdx`

- [ ] **Step 1: Add complete frontmatter**

Set operations-focused metadata and local cover image.

- [ ] **Step 2: Write the article body**

Explain why manifest-based admission control matters as a durability and survivability improvement for policy enforcement.

- [ ] **Step 3: Add one Mermaid diagram**

Contrast startup-time disk-backed policy with API-managed policy that can be removed.

### Task 9: Write the maintainership friction article

**Files:**
- Create: `content/writing/open-source-needs-more-friction-than-it-used-to.mdx`

- [ ] **Step 1: Add complete frontmatter**

Set commentary metadata and local cover image.

- [ ] **Step 2: Write the article body**

Argue that some contribution friction is now a governance tool in the age of AI-assisted contribution volume.

- [ ] **Step 3: Keep the presentation editorial**

Use prose and sources without forcing a diagram.

## Chunk 4: Featured State and Archive Consistency

### Task 10: Update the current featured article metadata

**Files:**
- Modify: `content/writing/copy-fail-is-not-just-a-local-linux-bug.mdx`

- [ ] **Step 1: Change the existing featured flag to `false`**

Keep the article published, but remove it as the lead story.

- [ ] **Step 2: Confirm the npm article is the only featured entry**

Re-check all six article frontmatters so exactly one entry remains featured.

### Task 11: Sanity-check publishing order and archive balance

**Files:**
- Review: `content/writing/*.mdx`

- [ ] **Step 1: Confirm publish dates create a believable archive**

Use staggered dates so the archive feels editorially maintained rather than bulk-dumped.

- [ ] **Step 2: Confirm kind and tag distribution**

Make sure the batch is balanced across `security`, `practice`, `field-note`, and `essay`-compatible tone while staying inside the current allowed type system.

## Chunk 5: Verification and Finish

### Task 12: Run required verification

**Files:**
- Review: all changed writing content and assets

- [ ] **Step 1: Run type checking**

Run: `pnpm typecheck`

Expected: command exits successfully with no type errors.

- [ ] **Step 2: Do a manual content sanity pass**

Spot-check article files for frontmatter correctness, valid Mermaid fences, and matching local asset paths.

### Task 13: Prepare the implementation summary

**Files:**
- Review: `git status --short`

- [ ] **Step 1: Summarize what changed**

Prepare a concise summary covering the five new articles, the featured swap, and added images.

- [ ] **Step 2: Note verification status and any residual risks**

Report the `pnpm typecheck` result and call out anything not manually browser-checked.
