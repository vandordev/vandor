# Design Spec: Vandor Institutional Brand Pages

Date: 2026-05-20
Status: Approved in conversation, pending final user review of this spec

## Summary

Add four new non-product brand pages to make Vandor read more clearly as a public-interest technical organization:

- `/about`
- `/work`
- `/collaborate`
- `/support`

These pages should extend the existing brand surface without turning the site into a generic company brochure or a startup marketing funnel.

The new pages should create one institutional spine and two clear action paths:

- `/about` explains who Vandor is and how it works
- `/work` maps what Vandor maintains across products, reference, writing, news, and partnership work
- `/collaborate` qualifies and invites collaboration
- `/support` explains how people and institutions can help sustain the mission

The release should ship all four pages together so the brand surface expands as a coherent system rather than as a series of isolated additions.

## Approved Decisions

- Use the route names `/about`, `/work`, `/collaborate`, and `/support`
- Keep `support` broad, with financial or institutional backing as the main path and non-financial help as a secondary path
- Refer to Vandor explicitly as a `public-interest technical organization`
- Do not make `non-profit` the main public label unless the legal status is final and intentionally public
- Keep the brand navigation restrained:
  - Header: `Work`, `Writing`, `News`, `About`, `Products`
  - Footer or secondary navigation: `Collaborate`, `Support`
- Release the four pages at the same time
- Keep the pages visually related, but give each one a distinct editorial rhythm

## Why This Work Exists

The current non-`/vx/*` brand surface covers discovery and publication well enough:

- `/` introduces Vandor
- `/writing` carries longer-form editorial work
- `/news` carries updates and release-related publication
- `/partners` shows current partner work and future collaboration lanes

What it does not yet do is explain Vandor as an institution with stable intent and clear next actions.

There are currently missing answers to four visitor questions:

1. Who is Vandor, exactly?
2. What does Vandor maintain across the whole ecosystem?
3. How should someone approach Vandor for collaboration?
4. How can someone help sustain the mission?

These four pages close those gaps without forcing the homepage, Writing, News, or Partners surfaces to do too many jobs at once.

## Goals

- Make Vandor read as an organization first, not only as the home of `vx`
- Add a clearer institutional layer above existing product and publication surfaces
- Give visitors a single place to understand the Vandor ecosystem
- Create two distinct action paths:
  - collaboration
  - support
- Reduce dependence on homepage anchors as the main way to explain Vandor's work
- Keep the brand surface calm, precise, and aligned with Vandor's existing tone

## Non-Goals

- Turn Vandor into a service-catalog or agency-style marketing site
- Replace `/partners` with a broader collaboration route
- Add donation processing, sponsorship tiers, or payment collection in this phase
- Add a team page, careers page, FAQ, or legal resource center
- Expand `/work` into a full archive or taxonomy index
- Collapse Writing and News into a single publication surface

## Information Architecture

### Structural Model

Use an **institutional spine + action leaves** structure.

Institutional spine:

- `/about`
- `/work`

Action leaves:

- `/collaborate`
- `/support`

This keeps understanding and action separate:

- first understand the organization
- then understand the ecosystem
- then choose the correct path for engagement

### Relationship to Existing Pages

- `/` remains the main front door
- `/writing` remains the editorial desk for longer-form thought
- `/news` remains the update and release surface
- `/partners` remains a supporting proof and directory surface
- `/vx/*` remains product-specific and separate from the brand spine

## Route Design

### New Public Routes

- `/about`
- `/work`
- `/collaborate`
- `/support`

### Existing Supporting Routes

- `/`
- `/writing`
- `/writing/:slug`
- `/news`
- `/news/:slug`
- `/partners`

## Page Specifications

### `/about`

#### Job

Explain who Vandor is, why it exists, and how its different public surfaces fit together.

This page should feel like a calm institutional explanation, not a manifesto and not a company brochure.

#### Tone

- factual
- calm
- institution-first
- technically literate
- quietly mission-driven

#### Recommended Section Order

1. Hero
   - short, factual description of Vandor
   - immediate framing as a public-interest technical organization
2. Institutional description
   - what Vandor builds
   - who it is for
   - why the work is done in public
3. How Vandor works
   - products
   - reference and documentation
   - writing
   - news
   - partnership work
4. Principles
   - clarity
   - durability
   - public technical usefulness
   - openness where it improves understanding and maintenance
5. Directional close
   - link to `/work`
   - link to `/collaborate`
   - link to `/support`

#### What This Page Should Not Become

- a project inventory
- a partner directory
- a fundraising page
- a rhetorical manifesto full of declarations

#### Cross-links

- primary link to `/work`
- secondary links to `/collaborate` and `/support`
- contextual links to `/writing` and `/news`

### `/work`

#### Job

Map the Vandor ecosystem in one place so visitors can scan what exists without assembling it from the homepage and multiple routes.

This page should function as a map of maintained surfaces, not as a detailed catalog.

#### Tone

- structured
- orienting
- ecosystem-first
- restrained

#### Recommended Section Order

1. Hero
   - what Vandor maintains
2. Intro to the map
   - explain that the work is grouped into clusters rather than shown as one long inventory
3. Cluster sections
   - Products
   - Reference
   - Writing
   - News
   - Partnership work
4. Short closing note
   - explain that the work is an evolving ecosystem
   - direct interested readers toward `/about` or `/collaborate`

#### Cluster Rules

Each cluster should include:

- one concise explanation of what the cluster is for
- one to three linked surfaces
- enough text to orient, not enough to duplicate destination pages

Examples:

- Products
  - `vx`
  - future product placeholders such as `vxt` and `vpkg`, clearly marked if not public yet
- Reference
  - `vx` docs
  - getting started surface
- Writing
  - `/writing`
- News
  - `/news`
- Partnership work
  - `/partners`

#### What This Page Should Not Become

- a full publication archive
- an implementation services page
- a duplicate of `/about`
- a docs index with deep hierarchy

#### Cross-links

- link to `/about` for institutional framing
- link to `/partners` from the partnership work cluster
- link to `/collaborate` as the action path for relevant teams

### `/collaborate`

#### Job

Help potential collaborators determine whether Vandor is the right fit, then invite them to make contact with better context.

This page should qualify first, then invite.

#### Tone

- clear
- selective
- serious
- welcoming without sounding sales-driven

#### Recommended Section Order

1. Hero
   - who should collaborate with Vandor
2. Collaboration lanes
   - implementation and systems work
   - documentation and reference work
   - public-interest infrastructure
   - regional or community adaptation
3. What Vandor is best used for
   - the types of problems and settings where Vandor is relevant
4. What to bring
   - goals
   - constraints
   - current system context
   - timeline or urgency
   - why Vandor is being approached
5. CTA
   - email Vandor

#### What This Page Should Not Become

- a generic services page
- a partner proof page
- a support or sponsorship page
- a hard-sell lead capture flow

#### Cross-links

- link to `/partners` as proof and context
- link to `/work` for ecosystem orientation
- link to `/about` for organizational framing

### `/support`

#### Job

Explain how people and institutions can help sustain Vandor's mission, with financial or institutional backing as the main path and broader support paths as the secondary layer.

This page should feel like a restrained mission-backing page, not a startup fundraising page.

#### Tone

- mission-led
- clear
- grateful but not pleading
- institutionally serious

#### Recommended Section Order

1. Hero
   - back the mission
2. Why support matters
   - tools, docs, writing, and public technical work need continuity
3. Primary support path
   - financial backing
   - institutional backing
4. Secondary support paths
   - introductions
   - distribution
   - documentation help
   - maintainership support
5. What support sustains
   - continued upkeep of tools
   - documentation quality
   - editorial work
   - public-facing technical clarity
6. CTA
   - email Vandor or a dedicated support contact

#### What This Page Should Not Become

- a donation widget page
- a sponsorship tier table
- a collaboration request page
- a generic community contribution page

#### Cross-links

- link to `/about` for mission context
- link to `/work` for what the support actually sustains
- optional link to `/collaborate` when the interest is more operational than supportive

## Naming and Positioning

### Final Route Names

- `/about`
- `/work`
- `/collaborate`
- `/support`

Rationale:

- the names are clear
- they read naturally in navigation
- they align with the existing tone of calm precision
- they avoid startup or campaign language

### Why `support`, Not `sponsor`

Use `support` because it is broader and more aligned with Vandor's positioning.

`support` can hold:

- financial backing
- institutional backing
- introductions
- distribution help
- documentation or maintainership support

`sponsor` would frame the page too narrowly and too transactionally for the intended purpose.

## Navigation Changes

### Header Navigation

Use:

- `Work`
- `Writing`
- `News`
- `About`
- `Products`

Notes:

- `Work` should point to `/work`, not depend only on homepage anchors
- `About` belongs in the main header because it is part of the institutional spine
- `Collaborate` and `Support` should stay out of the primary header to keep the shell light

### Footer or Secondary Navigation

Add:

- `Collaborate`
- `Support`

Keep existing relevant brand links such as:

- `Home`
- `Work`
- `Partners`
- `Writing`
- `News`
- `About`
- `vx`
- `vx Docs`

### `/partners` Placement

`/partners` should remain live but become a supporting surface rather than a primary navigation destination.

It should be linked from:

- `/work`
- `/collaborate`
- footer navigation

## Copy Strategy

### `/about`

Primary emphasis:

- institutional clarity
- organizational purpose
- how the parts of Vandor fit together

### `/work`

Primary emphasis:

- ecosystem orientation
- maintained surfaces
- cluster-based mapping rather than inventory depth

### `/collaborate`

Primary emphasis:

- fit
- working context
- clear invitation after qualification

### `/support`

Primary emphasis:

- sustaining the mission
- continuity of public technical work
- practical forms of support

## Visual and UX Direction

These four pages should feel like one family, but not like one repeated template.

### Shared system

- same shell language as the existing Vandor brand surface
- same dark restrained palette
- same calm typographic hierarchy
- same minimal-chrome behavior
- no loud marketing devices

### Distinct rhythms

- `/about`
  - most textual
  - most stable and institutional
- `/work`
  - most map-like
  - more structural grouping than narrative flow
- `/collaborate`
  - most directional
  - strong qualification flow
- `/support`
  - most persuasive
  - still restrained and calm

### Visual cautions

- do not turn these pages into four copies of the same card grid
- do not add startup-style metric blocks, fundraising clichés, or badge clutter
- do not lean on decorative editorial tricks
- keep hierarchy driven by spacing, grouping, and tone

## CTA Strategy

### Contact Method

Use email as the first release contact path.

Rationale:

- faster to ship
- more aligned with Vandor's tone
- avoids premature form design before inbound patterns are known

### `/collaborate` CTA

- primary action: `Email Vandor`
- include guidance on what a useful outreach message should contain

### `/support` CTA

- primary action: `Support Vandor` or `Email Vandor`
- copy should clarify that support inquiries can include institutional backing and other mission-supporting help

## Release Scope

This release should include:

- the four new routes
- shared navigation changes
- footer changes
- cross-linking between the new pages and relevant existing pages
- metadata and SEO updates for the new pages

This release should not require:

- payment processing
- internal forms
- new partner data modeling
- publication architecture changes

## Suggested File Boundaries

Suggested route files:

- `src/routes/about/index.tsx`
- `src/routes/work/index.tsx`
- `src/routes/collaborate/index.tsx`
- `src/routes/support/index.tsx`

Suggested feature modules:

- `src/features/about/*`
- `src/features/work/*`
- `src/features/collaborate/*`
- `src/features/support/*`

Shared updates likely required:

- `src/components/site-shell-content.ts`
- `src/components/footer-5.tsx`
- `src/lib/sitemap.ts`
- `src/lib/seo.ts`

## Open Inputs Required Before Implementation

Implementation will still need a few concrete content decisions:

- the email address used for `/collaborate`
- whether `/support` uses the same email or a separate support contact
- whether Vandor's legal non-profit status should be stated explicitly anywhere
- whether future products such as `vxt` and `vpkg` should appear on `/work` as visible placeholders or stay implied

## Success Criteria

The work is successful if:

- a visitor can understand Vandor as an organization without entering `/vx/*`
- a visitor can distinguish collaboration from support
- `/work` feels like a map of an ecosystem rather than a pile of links
- the main navigation stays calm and readable
- the new pages strengthen the brand surface without making it sound like a startup funnel

## Recommended Next Step

After user review of this design spec, write an implementation plan covering:

- route creation
- feature-module boundaries
- navigation updates
- footer updates
- metadata and sitemap updates
- copy implementation order
