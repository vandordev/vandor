import { createFileRoute } from '@tanstack/react-router'

import {
  getNewsIndexDescription,
  getNewsIndexTitle,
} from '#/features/news/news-metadata'
import { loadNewsIndex } from '#/features/news/load-news-index'
import { VandorNewsSection } from '#/features/news/vandor-news-section'

export const Route = createFileRoute('/news/')({
  loader: () => loadNewsIndex(),
  head: () => ({
    meta: [
      {
        title: getNewsIndexTitle(),
      },
      {
        name: 'description',
        content: getNewsIndexDescription(),
      },
    ],
  }),
  component: NewsIndexRoute,
})

function NewsIndexRoute() {
  return <VandorNewsSection data={Route.useLoaderData()} />
}
