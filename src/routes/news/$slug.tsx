import { createFileRoute } from '@tanstack/react-router'

import {
  getNewsEntryDescription,
  getNewsEntryTitle,
} from '#/features/news/news-metadata'
import { NewsArticlePage } from '#/features/news/news-article-page'
import { loadNewsEntry } from '#/features/news/load-news-entry'

export const Route = createFileRoute('/news/$slug')({
  loader: ({ params }) =>
    loadNewsEntry({
      data: {
        slug: params.slug,
      },
    }),
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          {
            title: getNewsEntryTitle(loaderData.title, loaderData.seoTitle),
          },
          {
            name: 'description',
            content: getNewsEntryDescription(
              loaderData.summary,
              loaderData.seoDescription,
            ),
          },
        ]
      : [],
  }),
  component: NewsArticleRoute,
})

function NewsArticleRoute() {
  return <NewsArticlePage data={Route.useLoaderData()} />
}
