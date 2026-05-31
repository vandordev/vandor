import type {
  ProductSlug,
  RequestedDocVersion,
} from '#/features/product-docs/versioning/product-types'

type ProductDocsConfig = {
  label: string
  defaultDescription: string
  ogImagePath: string
  getBrandHref: (requestedVersion: RequestedDocVersion) => string
  getDocsHref: (requestedVersion: RequestedDocVersion) => string
  getPrimaryCtaHref: (requestedVersion: RequestedDocVersion) => string
  primaryCtaLabel: string
}

const productDocsRegistry: Record<ProductSlug, ProductDocsConfig> = {
  vx: {
    label: 'vx',
    defaultDescription:
      'Versioned documentation for vx, Vandor’s CLI for local vpkg packages and vxt templates.',
    ogImagePath: '/images/og/vandor-vx.svg',
    getBrandHref: (requestedVersion) => `/vx/${requestedVersion}`,
    getDocsHref: (requestedVersion) => `/vx/${requestedVersion}/docs`,
    getPrimaryCtaHref: (requestedVersion) => `/vx/${requestedVersion}/docs/install`,
    primaryCtaLabel: 'Install vx',
  },
  vxt: {
    label: 'vxt',
    defaultDescription:
      'Versioned documentation for vxt, Vandor’s spec-first Go templating library.',
    ogImagePath: '/images/og/vandor-home.svg',
    getBrandHref: (requestedVersion) => `/vxt/${requestedVersion}/docs`,
    getDocsHref: (requestedVersion) => `/vxt/${requestedVersion}/docs`,
    getPrimaryCtaHref: (requestedVersion) =>
      `/vxt/${requestedVersion}/docs/getting-started`,
    primaryCtaLabel: 'Get Started',
  },
}

export function getProductDocsConfig(product: ProductSlug) {
  return productDocsRegistry[product]
}
