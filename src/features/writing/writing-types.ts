import type { MarkdownRendererSerializedOptions } from '@fumadocs/local-md'

export const writingEntryKinds = [
  'essay',
  'field-note',
  'practice',
  'security',
] as const

export type WritingEntryKind = (typeof writingEntryKinds)[number]

export type WritingEntryFrontmatter = {
  title: string
  summary: string
  publishedAt: string
  kind: WritingEntryKind
  published: boolean
  featured: boolean
  authors: string[]
  tags: string[]
  coverImage: string
  seoTitle?: string
  seoDescription?: string
}

export type WritingEntryListItem = {
  slug: string
  title: string
  summary: string
  publishedAt: string
  kind: WritingEntryKind
  coverImage: string
  authors: string[]
  tags: string[]
}

export type WritingFeaturedEntry = WritingEntryListItem

export type WritingIndexData = {
  featured?: WritingFeaturedEntry
  entries: WritingEntryListItem[]
}

export type WritingArticleData = WritingEntryListItem & {
  seoTitle?: string
  seoDescription?: string
  render: MarkdownRendererSerializedOptions
}
