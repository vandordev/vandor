# OpenAI-Inspired Monochrome Landing Design

**Goal:** Rework the starter homepage into a polished monochrome landing page that uses `Plus Jakarta Sans`, a true `#000` dark background, and the existing token/class structure from `src/styles.css`.

## Visual Direction

The landing page should feel close to the current OpenAI homepage: restrained, premium, and high-contrast rather than decorative. The background stays truly black, text remains white to soft gray, borders are thin, and surfaces use subtle charcoal transparency for depth.

## Styling Approach

- Replace the current green/sea palette in `src/styles.css` with monochrome tokens only.
- Use `Plus Jakarta Sans` for both body and display typography.
- Keep the existing utility classes such as `page-wrap`, `island-shell`, `feature-card`, `nav-link`, `island-kicker`, and `site-footer`, but update their appearance to match the new monochrome system.
- Preserve layered background depth using gray-only gradients and soft radial highlights over `#000`.

## Homepage Structure

The homepage should stop being a placeholder and instead exercise the CSS system:

- A compact header with brand, navigation, and primary CTA
- A hero section with strong headline, supporting copy, and two CTAs
- A metrics strip to create immediate credibility
- A feature grid using the existing card styles
- A closing CTA/footer section

## Verification

- Add a route-level test that proves the homepage renders the new landing structure.
- Run that test first to confirm the current placeholder fails.
- Run the full test suite and production build after implementation.
