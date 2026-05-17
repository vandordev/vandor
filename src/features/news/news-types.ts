import type { MarkdownRendererSerializedOptions } from '@fumadocs/local-md'

export const newsEntryKinds = [
  'announcement',
  'article',
  'product',
  'release-note',
] as const

export type NewsEntryKind = (typeof newsEntryKinds)[number]

export type NewsEntryFrontmatter = {
  title: string
  summary: string
  publishedAt: string
  kind: NewsEntryKind
  published: boolean
  featured: boolean
  authors: string[]
  products: string[]
  tags: string[]
  coverImage: string
  seoTitle?: string
  seoDescription?: string
}

export type NewsEntryListItem = {
  slug: string
  title: string
  summary: string
  publishedAt: string
  kind: NewsEntryKind
  coverImage: string
  authors: string[]
  products: string[]
}

export type NewsFeaturedEntry = NewsEntryListItem

export type NewsIndexData = {
  featured?: NewsFeaturedEntry
  entries: NewsEntryListItem[]
}

export type NewsArticleData = NewsEntryListItem & {
  tags: string[]
  seoTitle?: string
  seoDescription?: string
  render: MarkdownRendererSerializedOptions
}
