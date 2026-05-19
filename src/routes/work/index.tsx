import { createFileRoute } from '@tanstack/react-router'

import { VandorWorkPage } from '#/features/work/vandor-work-page'
import { getWorkDescription, getWorkTitle } from '#/features/work/work-metadata'
import {
  buildSeoHead,
  getCollectionPageStructuredData,
} from '#/lib/seo'

export const Route = createFileRoute('/work/')({
  head: () =>
    buildSeoHead({
      title: getWorkTitle(),
      description: getWorkDescription(),
      path: '/work/',
      imagePath: '/images/og/vandor-home.svg',
      structuredData: getCollectionPageStructuredData({
        title: getWorkTitle(),
        description: getWorkDescription(),
        path: '/work/',
      }),
    }),
  component: WorkRoute,
})

function WorkRoute() {
  return <VandorWorkPage />
}
