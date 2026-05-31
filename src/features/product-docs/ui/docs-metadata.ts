import { getProductDocsConfig } from '#/features/product-docs/source/product-docs-registry'
import type {
  ProductSlug,
  RequestedDocVersion,
} from '#/features/product-docs/versioning/product-types'

export function buildProductDocsPath(input: {
  product: ProductSlug
  requestedVersion: RequestedDocVersion
  slugs?: string[]
}) {
  const base = `/${input.product}/${input.requestedVersion}/docs`

  if (!input.slugs || input.slugs.length === 0) {
    return `${base}/`
  }

  return `${base}/${input.slugs.join('/')}`
}

export function getProductDocsTitle(
  product: ProductSlug,
  requestedVersion: RequestedDocVersion,
  title?: string,
) {
  const { label } = getProductDocsConfig(product)

  if (title) {
    return `${title} | ${label} ${requestedVersion} docs | Vandor`
  }

  return `${label} ${requestedVersion} docs | Vandor`
}

export function getProductDocsDescription(
  product: ProductSlug,
  _requestedVersion: RequestedDocVersion,
  description?: string,
) {
  if (description) {
    return description
  }

  return getProductDocsConfig(product).defaultDescription
}
