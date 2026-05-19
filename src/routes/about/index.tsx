import { createFileRoute } from '@tanstack/react-router'

import {
  getAboutDescription,
  getAboutTitle,
} from '#/features/about/about-metadata'
import { VandorAboutPage } from '#/features/about/vandor-about-page'
import {
  buildSeoHead,
  getCollectionPageStructuredData,
} from '#/lib/seo'

export const Route = createFileRoute('/about/')({
  head: () =>
    buildSeoHead({
      title: getAboutTitle(),
      description: getAboutDescription(),
      path: '/about/',
      imagePath: '/images/og/vandor-home.svg',
      structuredData: getCollectionPageStructuredData({
        title: getAboutTitle(),
        description: getAboutDescription(),
        path: '/about/',
      }),
    }),
  component: AboutRoute,
})

function AboutRoute() {
  return <VandorAboutPage />
}
