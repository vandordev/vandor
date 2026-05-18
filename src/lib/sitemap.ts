import { concreteDocVersions } from '#/features/vx/versioning/version-types'
import { getAllNewsPages } from '#/features/news/news-source'
import { getAllWritingPages } from '#/features/writing/writing-source'
import { getVxDocsSource } from '#/features/vx/docs/docs-source'
import { getAbsoluteUrl } from '#/lib/seo'

type SitemapEntry = {
  loc: string
  lastmod?: string
}

function escapeXml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;')
}

function buildStaticEntries(): SitemapEntry[] {
  const entries: SitemapEntry[] = [
    { loc: getAbsoluteUrl('/') },
    { loc: getAbsoluteUrl('/news/') },
    { loc: getAbsoluteUrl('/writing/') },
    { loc: getAbsoluteUrl('/partners/') },
    { loc: getAbsoluteUrl('/vx/') },
  ]

  for (const version of ['latest', ...concreteDocVersions] as const) {
    entries.push({ loc: getAbsoluteUrl(`/vx/${version}/`) })
    entries.push({ loc: getAbsoluteUrl(`/vx/${version}/docs/`) })
  }

  return entries
}

async function buildNewsEntries(): Promise<SitemapEntry[]> {
  const pages = (await getAllNewsPages()) as Array<{
    slugs: string[]
    path: string
    data: {
      frontmatter: {
        published: boolean
        publishedAt: string
      }
    }
  }>

  return pages
    .filter((page) => page.data.frontmatter.published)
    .map((page) => {
      const slug = page.slugs.at(-1)

      if (!slug) {
        throw new Error(`News entry at path "${page.path}" is missing a slug`)
      }

      return {
        loc: getAbsoluteUrl(`/news/${slug}`),
        lastmod: page.data.frontmatter.publishedAt,
      }
    })
}

async function buildDocsEntries(): Promise<SitemapEntry[]> {
  const versions = ['latest', ...concreteDocVersions] as const
  const entries: SitemapEntry[] = []

  for (const version of versions) {
    const source = await getVxDocsSource(version)
    const pages = source.getPages() as Array<{
      slugs?: string[]
      path?: string
    }>

    for (const page of pages) {
      const slugs = page.slugs ?? []
      const pagePath =
        slugs.at(-1) === 'index' || slugs.length === 0
          ? `/vx/${version}/docs/`
          : `/vx/${version}/docs/${slugs.join('/')}`

      entries.push({
        loc: getAbsoluteUrl(pagePath),
      })
    }
  }

  return entries
}

async function buildWritingEntries(): Promise<SitemapEntry[]> {
  const pages = (await getAllWritingPages()) as Array<{
    slugs: string[]
    path: string
    data: {
      frontmatter: {
        published: boolean
        publishedAt: string
      }
    }
  }>

  return pages
    .filter((page) => page.data.frontmatter.published)
    .map((page) => {
      const slug = page.slugs.at(-1)

      if (!slug) {
        throw new Error(`Writing entry at path "${page.path}" is missing a slug`)
      }

      return {
        loc: getAbsoluteUrl(`/writing/${slug}`),
        lastmod: page.data.frontmatter.publishedAt,
      }
    })
}

export async function getSitemapEntries() {
  const [newsEntries, writingEntries, docsEntries] = await Promise.all([
    buildNewsEntries(),
    buildWritingEntries(),
    buildDocsEntries(),
  ])

  return [...buildStaticEntries(), ...newsEntries, ...writingEntries, ...docsEntries]
}

export async function getSitemapXml() {
  const entries = await getSitemapEntries()
  const uniqueEntries = Array.from(
    new Map(entries.map((entry) => [entry.loc, entry])).values(),
  )

  const items = uniqueEntries
    .map((entry) => {
      const lastmod = entry.lastmod ? `<lastmod>${escapeXml(entry.lastmod)}</lastmod>` : ''

      return `<url><loc>${escapeXml(entry.loc)}</loc>${lastmod}</url>`
    })
    .join('')

  return `<?xml version="1.0" encoding="UTF-8"?>` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${items}</urlset>`
}
