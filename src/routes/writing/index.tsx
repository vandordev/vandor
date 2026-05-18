import { createFileRoute } from '@tanstack/react-router'

import {
  getWritingDescription,
  getWritingTitle,
} from '#/features/writing/writing-metadata'
import { VandorWritingPage } from '#/features/writing/vandor-writing-page'
import {
  buildSeoHead,
  getCollectionPageStructuredData,
} from '#/lib/seo'

export const Route = createFileRoute('/writing/')({
  head: () =>
    buildSeoHead({
      title: getWritingTitle(),
      description: getWritingDescription(),
      path: '/writing/',
      imagePath: '/images/og/vandor-news.svg',
      structuredData: getCollectionPageStructuredData({
        title: getWritingTitle(),
        description: getWritingDescription(),
        path: '/writing/',
      }),
    }),
  component: WritingRoute,
})

function WritingRoute() {
  return <VandorWritingPage />
}
