import { createFileRoute } from '@tanstack/react-router'

import {
  getNewsIndexDescription,
  getNewsIndexTitle,
} from '#/features/news/news-metadata'
import { loadNewsIndex } from '#/features/news/load-news-index'
import { VandorNewsSection } from '#/features/news/vandor-news-section'
import {
  buildSeoHead,
  getCollectionPageStructuredData,
} from '#/lib/seo'

export const Route = createFileRoute('/news/')({
  loader: () => loadNewsIndex(),
  head: () =>
    buildSeoHead({
      title: getNewsIndexTitle(),
      description: getNewsIndexDescription(),
      path: '/news/',
      imagePath: '/images/og/vandor-news.svg',
      structuredData: getCollectionPageStructuredData({
        title: getNewsIndexTitle(),
        description: getNewsIndexDescription(),
        path: '/news/',
      }),
    }),
  component: NewsIndexRoute,
})

function NewsIndexRoute() {
  return <VandorNewsSection data={Route.useLoaderData()} />
}
