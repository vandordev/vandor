# Design Spec: Five New Writing Articles for Vandor

Date: 2026-05-19
Status: Approved in conversation, pending final user review of this spec

## Goal

Add five new `/writing` articles that make Vandor feel like an active editorial surface rather than a single-article archive or a CVE news feed.

The batch should be mixed across security, engineering practice, infrastructure, and maintainership commentary. Each article should be timely, source-backed, and written as analysis rather than announcement.

## Why This Work Exists

The current `/writing` surface has one published article. That proves the content pipeline works, but it does not yet create the editorial rhythm promised by the homepage and the Writing landing page.

This batch should:

- make `/writing` feel populated and intentional
- show Vandor can publish both security analysis and broader technical commentary
- strengthen the distinction between `/news` and `/writing`
- create enough depth for the home Writing section to feel alive

## Scope

This work covers:

- writing five new MDX articles under `content/writing`
- adding or updating cover images and inline visuals where useful
- choosing one new featured article for `/writing` and homepage surfaces
- updating metadata so the new pieces appear in existing writing loaders without route changes

This work does not cover:

- changing the writing route structure
- redesigning the `/writing` page layout
- changing the current Mermaid renderer unless an article specifically requires a small diagram tweak
- adding author profile pages, pagination, or taxonomy routes

## Editorial Model

Each article should follow the same high-level shape:

1. A clear thesis in the opening
2. A concise `what changed` section grounded in primary sources
3. A practical `why this matters` or `what teams should do` section
4. A broader lesson that lifts the piece above pure recap
5. A sources section with primary links

The voice should stay aligned with Vandor:

- quiet, rigorous, technically literate
- plainspoken rather than promotional
- analytical rather than reactive
- concrete about systems, trust boundaries, and operator decisions

## Planned Articles

### 1. Long-Lived npm Publish Tokens Should Be Treated as Migration Debt

Type: `security`

Core argument:
The official npm direction now favors trusted publishing with OIDC, so long-lived publish tokens should be treated as legacy risk that teams actively retire rather than passively keep.

Likely sources:

- npm trusted publishing docs
- npm CI/CD workflow docs

Visual plan:

- cover image
- one Mermaid diagram showing `CI workflow -> OIDC identity -> publish action` versus `long-lived token -> persistent credential risk`

### 2. GitHub Actions Security Is Moving From Secrets to Policy

Type: `operations`

Core argument:
The GitHub Actions security roadmap shows that CI/CD hardening is moving beyond secret storage toward policy, scoped credentials, secure defaults, and runner observability.

Likely sources:

- GitHub Actions 2026 security roadmap

Visual plan:

- cover image
- one Mermaid diagram showing ecosystem, attack surface, and infrastructure control layers

### 3. CrackArmor Is a Boundary Problem, Not Just an AppArmor Bug

Type: `security`

Core argument:
The AppArmor vulnerability set should be understood as a boundary failure with real implications for shared Linux and container hosts, not merely as another local kernel issue.

Likely sources:

- Ubuntu AppArmor vulnerability advisory
- Ubuntu CVE pages for the affected issues

Visual plan:

- cover image
- no inline diagram unless needed for a host-to-container boundary explanation

### 4. Kubernetes Policy That Lives Only in the API Is Not a Strong Enough Boundary

Type: `operations`

Core argument:
Manifest-based admission control in Kubernetes v1.36 matters because it acknowledges a core platform truth: security policy that can be deleted from the API is not a durable enough boundary.

Likely sources:

- Kubernetes v1.36 manifest-based admission control post
- Kubernetes v1.36 release post

Visual plan:

- cover image
- one Mermaid diagram showing startup-time policy versus API-managed policy

### 5. Open Source Needs More Friction Than It Used To

Type: `commentary`

Core argument:
In a world of AI-assisted volume and lower-cost contribution noise, some friction is not hostility. It is maintainership and governance.

Likely sources:

- GitHub “Eternal September” maintainer post
- GitHub Maintainer Month post

Visual plan:

- cover image
- no Mermaid diagram by default

## Publishing Order

Recommended order:

1. npm trusted publishing
2. GitHub Actions security roadmap
3. CrackArmor / AppArmor boundary analysis
4. Kubernetes manifest-based admission control
5. Open source friction and maintainership

This order starts with broadly actionable supply-chain guidance, moves into CI control-plane thinking, then into host and cluster boundaries, and ends with a wider maintainership essay.

## Featured Article Strategy

The currently featured article is `Copy Fail Is Not Just a Local Linux Bug`.

After this batch is added:

- `Long-Lived npm Publish Tokens Should Be Treated as Migration Debt` should become the new featured article
- `Copy Fail Is Not Just a Local Linux Bug` should remain published but no longer featured

Reasoning:

- the npm article is the broadest entry point
- it has a strong operational thesis without feeling too narrow
- it works well as the lead card on both `/writing` and the homepage Writing section

## Content Architecture

No new routing or loader architecture is required.

The existing writing system already supports:

- MDX content loading from `content/writing`
- frontmatter-based metadata for listing and detail pages
- homepage promotion via existing writing index data
- optional inline Mermaid diagrams

Implementation should stay within the current architecture:

- one MDX file per article
- local image assets under `public/images/writing`
- existing metadata fields reused consistently

## Metadata Rules

Each article should include:

- `title`
- `summary`
- `publishedAt`
- `kind`
- `published`
- `featured`
- `authors`
- `tags`
- `coverImage`
- `seoTitle`
- `seoDescription`

Rules:

- exactly one article in the full set should have `featured: true`
- all five new articles should publish as `published: true`
- `publishedAt` values should be staggered enough to create a believable archive order
- tags should stay narrow and useful, not decorative

## Visual Rules

The batch should not overload every article with diagrams.

Use visuals selectively:

- diagrams only where they clarify a system boundary or workflow
- photos should support tone without looking like generic enterprise stock
- inline diagrams should stay readable within the current Mermaid renderer constraints

Expected distribution:

- npm: diagram
- GitHub Actions: diagram
- CrackArmor: likely image only
- Kubernetes: diagram
- Open source friction: likely image only

## Error Handling and Risk Management

Primary risks:

1. The batch starts to feel like a news feed instead of essays
2. Topic quality becomes uneven because the themes are mixed
3. Mermaid diagrams become too dense or visually weak
4. The featured article choice overweights security compared with broader editorial goals

Mitigations:

- enforce a thesis-first structure for every piece
- keep each article centered on one argument, not full ecosystem coverage
- use Mermaid only when it improves understanding
- write the commentary article with equal editorial seriousness so the batch does not collapse into security-only voice

## Verification

Required verification baseline:

- `pnpm typecheck`

No test execution is required by repo policy.

Manual review criteria:

- `/writing` shows all five new entries in the intended order
- homepage Writing section reflects the new featured article
- each article reads as analysis, not announcement
- cover images and diagrams render cleanly

## Implementation Notes

Implementation should proceed in this order:

1. write all five article MDX files
2. add cover images and any inline visual assets
3. update featured flags and archive dates
4. run `pnpm typecheck`
5. perform a quick manual content sanity check

## Success Criteria

This work is successful when:

- `/writing` contains six total articles with a balanced editorial mix
- the page feels active and intentionally curated
- the homepage Writing section gains stronger depth and variety
- Vandor reads as an organization with ideas and technical judgment, not only releases and product surfaces
