import { env } from '#/env'

const fallbackSiteUrl = 'http://localhost:3000'

export const siteName = 'Vandor'
export const defaultLocale = 'en_US'
export const defaultTitle = 'Vandor'
export const defaultDescription =
  'Vandor is a mission-driven public-interest organization that builds tools, publishes writing, and keeps technical work open.'
export const defaultRobots =
  'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'

type SeoStructuredData = Record<string, unknown>

type SeoHeadInput = {
  title: string
  description: string
  path: string
  imagePath?: string
  imageAlt?: string
  type?: 'website' | 'article'
  robots?: string
  publishedTime?: string
  modifiedTime?: string
  section?: string
  authors?: string[]
  structuredData?: SeoStructuredData | SeoStructuredData[]
}

function sanitizeSiteUrl(value?: string) {
  try {
    return new URL(value ?? fallbackSiteUrl).origin
  } catch {
    return fallbackSiteUrl
  }
}

function normalizePath(path: string) {
  if (!path) {
    return '/'
  }

  return path.startsWith('/') ? path : `/${path}`
}

export function getSiteUrl() {
  if (typeof window !== 'undefined') {
    return window.location.origin
  }

  return sanitizeSiteUrl(env.SERVER_URL)
}

export function getAbsoluteUrl(path: string) {
  return new URL(normalizePath(path), `${getSiteUrl()}/`).toString()
}

export function buildSeoHead({
  title,
  description,
  path,
  imagePath = '/images/og/vandor-home.svg',
  imageAlt,
  type = 'website',
  robots = defaultRobots,
  publishedTime,
  modifiedTime,
  section,
  authors,
  structuredData,
}: SeoHeadInput) {
  const canonicalUrl = getAbsoluteUrl(path)
  const imageUrl = getAbsoluteUrl(imagePath)
  const resolvedImageAlt = imageAlt ?? title
  const meta = [
    { title },
    { name: 'description', content: description },
    { name: 'robots', content: robots },
    { property: 'og:locale', content: defaultLocale },
    { property: 'og:site_name', content: siteName },
    { property: 'og:type', content: type },
    { property: 'og:title', content: title },
    { property: 'og:description', content: description },
    { property: 'og:url', content: canonicalUrl },
    { property: 'og:image', content: imageUrl },
    { property: 'og:image:secure_url', content: imageUrl },
    { property: 'og:image:width', content: '1200' },
    { property: 'og:image:height', content: '630' },
    { property: 'og:image:alt', content: resolvedImageAlt },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: title },
    { name: 'twitter:description', content: description },
    { name: 'twitter:image', content: imageUrl },
  ]

  if (publishedTime) {
    meta.push({ property: 'article:published_time', content: publishedTime })
  }

  if (modifiedTime) {
    meta.push({ property: 'article:modified_time', content: modifiedTime })
  }

  if (section) {
    meta.push({ property: 'article:section', content: section })
  }

  for (const author of authors ?? []) {
    meta.push({ property: 'article:author', content: author })
  }

  return {
    meta,
    links: [{ rel: 'canonical', href: canonicalUrl }],
    scripts: structuredData
      ? [
          {
            type: 'application/ld+json',
            children: JSON.stringify(structuredData),
          },
        ]
      : [],
  }
}

export function getOrganizationStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteName,
    url: getSiteUrl(),
    logo: getAbsoluteUrl('/app-logo.png'),
    description: defaultDescription,
  }
}

export function getWebsiteStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteName,
    url: getSiteUrl(),
    description: defaultDescription,
  }
}

export function getCollectionPageStructuredData(input: {
  title: string
  description: string
  path: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: input.title,
    description: input.description,
    url: getAbsoluteUrl(input.path),
    isPartOf: getSiteUrl(),
  }
}

export function getArticleStructuredData(input: {
  title: string
  description: string
  path: string
  publishedTime: string
  imagePath: string
  authors?: string[]
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: input.title,
    description: input.description,
    datePublished: input.publishedTime,
    image: [getAbsoluteUrl(input.imagePath)],
    url: getAbsoluteUrl(input.path),
    author: (input.authors ?? [siteName]).map((name) => ({
      '@type': 'Organization',
      name,
    })),
    publisher: {
      '@type': 'Organization',
      name: siteName,
      logo: {
        '@type': 'ImageObject',
        url: getAbsoluteUrl('/app-logo.png'),
      },
    },
  }
}

export function getSoftwareApplicationStructuredData(input: {
  title: string
  description: string
  path: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'vx',
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'macOS, Linux, Windows',
    creator: {
      '@type': 'Organization',
      name: siteName,
    },
    description: input.description,
    url: getAbsoluteUrl(input.path),
  }
}

