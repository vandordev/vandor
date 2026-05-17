import type { RequestedVxVersion } from '#/features/vx/versioning/version-types'

export type SiteShellVariant = 'vandor' | 'vx'

export type SiteShellLink = {
  label: string
  href: string
}

export type SiteShellBrand = { kind: 'vandor' } | { kind: 'vx' }

export type SiteShellContent = {
  brand: SiteShellBrand
  navItems: SiteShellLink[]
  headerCtas: {
    secondary?: SiteShellLink
    primary?: SiteShellLink
  }
  footerLinks: SiteShellLink[]
}

const vandorShellContent: SiteShellContent = {
  brand: { kind: 'vandor' },
  navItems: [
    { label: 'About', href: '/#about' },
    { label: 'Products', href: '/#products' },
    { label: 'News', href: '/news' },
    { label: 'Open Source', href: '/vx/latest/docs' },
    { label: 'vx', href: '/vx/latest' },
  ],
  headerCtas: {
    secondary: { label: 'Read vx Docs', href: '/vx/latest/docs' },
    primary: { label: 'Explore vx', href: '/vx/latest' },
  },
  footerLinks: [
    { label: 'Vandor', href: '/' },
    { label: 'News', href: '/news' },
    { label: 'vx', href: '/vx/latest' },
    { label: 'vx Docs', href: '/vx/latest/docs' },
    { label: 'Getting Started', href: '/vx/latest/docs/getting-started' },
    { label: 'GitHub', href: '#' },
  ],
}

function buildVxShellContent(
  requestedVersion: RequestedVxVersion,
): SiteShellContent {
  return {
    brand: { kind: 'vx' },
    navItems: [
      { label: 'Overview', href: `/vx/${requestedVersion}#overview` },
      { label: 'Why vx', href: `/vx/${requestedVersion}#why-vx` },
      { label: 'Docs', href: `/vx/${requestedVersion}/docs` },
      { label: 'GitHub', href: '#' },
    ],
    headerCtas: {
      secondary: { label: 'Read Docs', href: `/vx/${requestedVersion}/docs` },
      primary: {
        label: 'Install vx',
        href: `/vx/${requestedVersion}/docs/getting-started`,
      },
    },
    footerLinks: [
      { label: 'vx Landing', href: `/vx/${requestedVersion}` },
      { label: 'Documentation', href: `/vx/${requestedVersion}/docs` },
      {
        label: 'Getting Started',
        href: `/vx/${requestedVersion}/docs/getting-started`,
      },
      { label: 'CLI Reference', href: `/vx/${requestedVersion}/docs` },
      { label: 'GitHub', href: '#' },
    ],
  }
}

export function getSiteShellContent(input: {
  variant: 'vandor'
}): SiteShellContent
export function getSiteShellContent(input: {
  variant: 'vx'
  requestedVersion: RequestedVxVersion
}): SiteShellContent
export function getSiteShellContent(input: {
  variant: SiteShellVariant
  requestedVersion?: RequestedVxVersion
}): SiteShellContent {
  if (input.variant === 'vandor') {
    return vandorShellContent
  }

  return buildVxShellContent(input.requestedVersion!)
}
