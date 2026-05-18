import { createFileRoute } from '@tanstack/react-router'

import {
  getWritingEntryDescription,
  getWritingEntryTitle,
} from '#/features/writing/writing-metadata'
import { loadWritingEntry } from '#/features/writing/load-writing-entry'
import { WritingArticlePage } from '#/features/writing/writing-article-page'
import {
  buildSeoHead,
  getArticleStructuredData,
} from '#/lib/seo'

export const Route = createFileRoute('/writing/$slug')({
  loader: ({ params }) =>
    loadWritingEntry({
      data: {
        slug: params.slug,
      },
    }),
  head: ({ loaderData }) =>
    loaderData
      ? buildSeoHead({
          title: getWritingEntryTitle(loaderData.title, loaderData.seoTitle),
          description: getWritingEntryDescription(
            loaderData.summary,
            loaderData.seoDescription,
          ),
          path: `/writing/${loaderData.slug}`,
          imagePath: loaderData.coverImage,
          imageAlt: loaderData.title,
          type: 'article',
          publishedTime: loaderData.publishedAt,
          section: loaderData.kind,
          authors: loaderData.authors,
          structuredData: getArticleStructuredData({
            title: getWritingEntryTitle(loaderData.title, loaderData.seoTitle),
            description: getWritingEntryDescription(
              loaderData.summary,
              loaderData.seoDescription,
            ),
            path: `/writing/${loaderData.slug}`,
            publishedTime: loaderData.publishedAt,
            imagePath: loaderData.coverImage,
            authors: loaderData.authors,
          }),
        })
      : { meta: [], links: [], scripts: [] },
  component: WritingArticleRoute,
})

function WritingArticleRoute() {
  return <WritingArticlePage data={Route.useLoaderData()} />
}
