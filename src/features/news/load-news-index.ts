import { createServerFn } from '@tanstack/react-start'

import { getAllNewsPages } from '#/features/news/news-source'
import type {
  NewsEntryKind,
  NewsEntryListItem,
  NewsIndexData,
} from '#/features/news/news-types'

function assertUniqueSlugs(entries: NewsEntryListItem[]) {
  if (process.env.NODE_ENV !== 'development') {
    return
  }

  const seen = new Set<string>()

  for (const entry of entries) {
    if (seen.has(entry.slug)) {
      throw new Error(`Duplicate news slug detected: ${entry.slug}`)
    }

    seen.add(entry.slug)
  }
}

function getPublishedTimestamp(slug: string, publishedAt: string) {
  const value = Date.parse(publishedAt)

  if (Number.isNaN(value)) {
    throw new Error(`Invalid publishedAt date for news entry "${slug}": ${publishedAt}`)
  }

  return value
}

function toListItem(page: Awaited<ReturnType<typeof getAllNewsPages>>[number]): NewsEntryListItem {
  const slug = page.slugs.at(-1)

  if (!slug) {
    throw new Error(`News entry at path "${page.path}" is missing a slug`)
  }

  return {
    slug,
    title: page.data.frontmatter.title,
    summary: page.data.frontmatter.summary,
    publishedAt: page.data.frontmatter.publishedAt,
    kind: page.data.frontmatter.kind as NewsEntryKind,
    coverImage: page.data.frontmatter.coverImage,
    authors: page.data.frontmatter.authors,
    products: page.data.frontmatter.products,
  }
}

export const loadNewsIndex = createServerFn({
  method: 'GET',
}).handler(async (): Promise<NewsIndexData> => {
  const pages = await getAllNewsPages()
  const entries: NewsEntryListItem[] = []
  let featuredSlug: string | undefined

  for (const page of pages) {
    if (!page.data.frontmatter.published) {
      continue
    }

    const entry = toListItem(page)
    entries.push(entry)

    if (page.data.frontmatter.featured && !featuredSlug) {
      featuredSlug = entry.slug
    }
  }

  entries.sort(
    (left, right) =>
      getPublishedTimestamp(right.slug, right.publishedAt) -
      getPublishedTimestamp(left.slug, left.publishedAt),
  )

  assertUniqueSlugs(entries)
  const featured = featuredSlug
    ? entries.find((entry) => entry.slug === featuredSlug)
    : undefined

  return {
    featured,
    entries: featured ? entries.filter((entry) => entry.slug !== featured.slug) : entries,
  }
})
