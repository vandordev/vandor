import { notFound } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'

import { getWritingPageBySlug } from '#/features/writing/writing-source'
import type { WritingArticleData } from '#/features/writing/writing-types'

type WritingEntryInput = {
  slug: string
}

export const loadWritingEntry = createServerFn({
  method: 'GET',
})
  .inputValidator((input: WritingEntryInput) => input)
  .handler(async ({ data }): Promise<WritingArticleData> => {
    const page = await getWritingPageBySlug(data.slug)

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
      tags: page.data.frontmatter.tags,
      seoTitle: page.data.frontmatter.seoTitle,
      seoDescription: page.data.frontmatter.seoDescription,
      render: renderer.serialize(),
    }
  })
