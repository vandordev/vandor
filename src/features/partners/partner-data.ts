import type { PartnerEntry } from '#/features/partners/partner-types'

type PartnerPlacement = 'home' | 'directory'

export const namedPartners: PartnerEntry[] = [
  {
    id: 'ozone',
    name: 'Ozone',
    summary:
      'Ozone builds software, internal tools, integrations, and automation around the way a team actually works.',
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
      'Teams that keep public docs, onboarding, and translation clear as a technical system grows.',
    collaborationMode: 'Documentation systems and editorial maintenance',
    focus: 'Reference systems',
    shape: 'Distributed lane',
  },
  {
    id: 'regional-communities',
    name: 'Regional communities',
    summary:
      'Local groups that adapt tools, run workshops, and make shared technical practice useful in context.',
    collaborationMode: 'Programs, adaptation, and field distribution',
    focus: 'Community infrastructure',
    shape: 'Regional lane',
  },
  {
    id: 'public-infrastructure',
    name: 'Public infrastructure groups',
    summary:
      'Organizations building reusable systems for civic, educational, or other public-interest operations.',
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
