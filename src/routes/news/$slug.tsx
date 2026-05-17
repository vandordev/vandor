import { createFileRoute } from '@tanstack/react-router'

import {
  getNewsEntryDescription,
  getNewsEntryTitle,
} from '#/features/news/news-metadata'
import { NewsArticlePage } from '#/features/news/news-article-page'
import { loadNewsEntry } from '#/features/news/load-news-entry'
import {
  buildSeoHead,
  getArticleStructuredData,
} from '#/lib/seo'

export const Route = createFileRoute('/news/$slug')({
  loader: ({ params }) =>
    loadNewsEntry({
      data: {
        slug: params.slug,
      },
    }),
  head: ({ loaderData }) =>
    loaderData
      ? buildSeoHead({
          title: getNewsEntryTitle(loaderData.title, loaderData.seoTitle),
          description: getNewsEntryDescription(
            loaderData.summary,
            loaderData.seoDescription,
          ),
          path: `/news/${loaderData.slug}`,
          imagePath: loaderData.coverImage,
          imageAlt: loaderData.title,
          type: 'article',
          publishedTime: loaderData.publishedAt,
          section: loaderData.kind,
          authors: loaderData.authors,
          structuredData: getArticleStructuredData({
            title: getNewsEntryTitle(loaderData.title, loaderData.seoTitle),
            description: getNewsEntryDescription(
              loaderData.summary,
              loaderData.seoDescription,
            ),
            path: `/news/${loaderData.slug}`,
            publishedTime: loaderData.publishedAt,
            imagePath: loaderData.coverImage,
            authors: loaderData.authors,
          }),
        })
      : { meta: [], links: [], scripts: [] },
  component: NewsArticleRoute,
})

function NewsArticleRoute() {
  return <NewsArticlePage data={Route.useLoaderData()} />
}
