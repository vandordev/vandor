import type { PartnerEntry } from '#/features/partners/partner-types'

type PartnerPlacement = 'home' | 'directory'

export const namedPartners: PartnerEntry[] = [
  {
    id: 'ozone',
    name: 'Ozone',
    summary:
      'Ozone builds software, apps, internal tools, integrations, and automation around the real workflow of a team.',
    collaborationMode: 'Delivery partnership and systems implementation',
    focus: 'Custom software and integration',
    shape: 'Independent studio',
    href: 'https://www.ozonedigitech.com/',
  },
]

export const partnerLanes: PartnerEntry[] = [
  {
    id: 'documentation-stewards',
    name: 'Documentation stewards',
    summary:
      'Teams that keep public reference, onboarding, and translation readable as technical work grows.',
    collaborationMode: 'Editorial maintenance and reference design',
    focus: 'Reference systems',
    shape: 'Distributed lane',
  },
  {
    id: 'regional-communities',
    name: 'Regional communities',
    summary:
      'Local groups that adapt tools, run workshops, and make shared technical practice durable in context.',
    collaborationMode: 'Programs, adaptation, and field distribution',
    focus: 'Community infrastructure',
    shape: 'Regional lane',
  },
  {
    id: 'public-infrastructure',
    name: 'Public infrastructure groups',
    summary:
      'Organizations working on legible, reusable systems for civic, educational, or public-interest operations.',
    collaborationMode: 'Implementation support and open systems work',
    focus: 'Operational infrastructure',
    shape: 'Institutional lane',
  },
]

export function getHomePartners() {
  return [...namedPartners, ...partnerLanes].slice(0, 3)
}

export function getPartnerHref(
  partner: Pick<PartnerEntry, 'id' | 'href'>,
  placement: PartnerPlacement,
) {
  if (!partner.href) {
    return undefined
  }

  if (partner.id !== 'ozone') {
    return partner.href
  }

  const url = new URL(partner.href)
  url.searchParams.set('utm_source', 'vandor')
  url.searchParams.set(
    'utm_medium',
    placement === 'home' ? 'partner_section' : 'partner_directory',
  )
  url.searchParams.set('utm_campaign', 'partners')

  return url.toString()
}
