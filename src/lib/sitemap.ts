import { getAllNewsPages } from '#/features/news/news-source'
import { getProductDocsSource } from '#/features/product-docs/source/docs-source'
import { buildProductDocsPath } from '#/features/product-docs/ui/docs-metadata'
import { productSlugs } from '#/features/product-docs/versioning/product-types'
import type { ProductSlug } from '#/features/product-docs/versioning/product-types'
import { getSupportedDocVersions } from '#/features/product-docs/versioning/versions'
import { getAllWritingPages } from '#/features/writing/writing-source'
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
    { loc: getAbsoluteUrl('/about/') },
    { loc: getAbsoluteUrl('/work/') },
    { loc: getAbsoluteUrl('/collaborate/') },
    { loc: getAbsoluteUrl('/support/') },
    { loc: getAbsoluteUrl('/news/') },
    { loc: getAbsoluteUrl('/writing/') },
    { loc: getAbsoluteUrl('/partners/') },
    { loc: getAbsoluteUrl('/vx/') },
    { loc: getAbsoluteUrl('/vxt/') },
  ]

  for (const product of productSlugs) {
    for (const version of getSupportedDocVersions(product)) {
      entries.push({ loc: getAbsoluteUrl(`/${product}/${version}/`) })
      entries.push({
        loc: getAbsoluteUrl(
          buildProductDocsPath({
            product,
            requestedVersion: version,
          }),
        ),
      })
    }
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
  const entries: SitemapEntry[] = []

  for (const product of productSlugs) {
    for (const version of getSupportedDocVersions(product)) {
      const source = await getProductDocsSource(product, version)
      const pages = source.getPages() as Array<{
        slugs?: string[]
        path?: string
      }>

      for (const page of pages) {
        const slugs = page.slugs ?? []
        const normalizedSlugs =
          slugs.at(-1) === 'index' ? slugs.slice(0, -1) : slugs

        entries.push({
          loc: getAbsoluteUrl(
            buildProductDocsPath({
              product: product as ProductSlug,
              requestedVersion: version,
              slugs: normalizedSlugs,
            }),
          ),
        })
      }
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
