import { createFileRoute } from '@tanstack/react-router'

import { VandorSupportPage } from '#/features/support/vandor-support-page'
import {
  getSupportDescription,
  getSupportTitle,
} from '#/features/support/support-metadata'
import {
  buildSeoHead,
  getCollectionPageStructuredData,
} from '#/lib/seo'

export const Route = createFileRoute('/support/')({
  head: () =>
    buildSeoHead({
      title: getSupportTitle(),
      description: getSupportDescription(),
      path: '/support/',
      imagePath: '/images/og/vandor-home.svg',
      structuredData: getCollectionPageStructuredData({
        title: getSupportTitle(),
        description: getSupportDescription(),
        path: '/support/',
      }),
    }),
  component: SupportRoute,
})

function SupportRoute() {
  return <VandorSupportPage />
}
