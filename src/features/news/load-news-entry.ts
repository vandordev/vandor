import { notFound } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'

import { getNewsPageBySlug } from '#/features/news/news-source'
import type { NewsArticleData } from '#/features/news/news-types'

type NewsEntryInput = {
  slug: string
}

export const loadNewsEntry = createServerFn({
  method: 'GET',
})
  .inputValidator((input: NewsEntryInput) => input)
  .handler(async ({ data }): Promise<NewsArticleData> => {
    const page = await getNewsPageBySlug(data.slug)

    if (!page || !page.data.frontmatter.published) {
      throw notFound()
    }

    const renderer = await page.data.load()

    return {
      slug: data.slug,
      title: page.data.frontmatter.title,
      summary: page.data.frontmatter.summary,
      publishedAt: page.data.frontmatter.publishedAt,
      kind: page.data.frontmatter.kind,
      coverImage: page.data.frontmatter.coverImage,
      authors: page.data.frontmatter.authors,
      products: page.data.frontmatter.products,
      tags: page.data.frontmatter.tags,
      seoTitle: page.data.frontmatter.seoTitle,
      seoDescription: page.data.frontmatter.seoDescription,
      render: renderer.serialize(),
    }
  })
