import { createFileRoute } from '@tanstack/react-router'

import {
  getPartnersDescription,
  getPartnersTitle,
} from '#/features/partners/partner-metadata'
import { VandorPartnersPage } from '#/features/partners/vandor-partners-page'
import {
  buildSeoHead,
  getCollectionPageStructuredData,
} from '#/lib/seo'

export const Route = createFileRoute('/partners/')({
  head: () =>
    buildSeoHead({
      title: getPartnersTitle(),
      description: getPartnersDescription(),
      path: '/partners/',
      imagePath: '/images/og/vandor-partners.svg',
      structuredData: getCollectionPageStructuredData({
        title: getPartnersTitle(),
        description: getPartnersDescription(),
        path: '/partners/',
      }),
    }),
  component: PartnersRoute,
})

function PartnersRoute() {
  return <VandorPartnersPage />
}
