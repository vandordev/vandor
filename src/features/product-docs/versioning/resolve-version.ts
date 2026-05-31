import type {
  ConcreteDocVersion,
  ProductSlug,
  RequestedDocVersion,
} from './product-types'
import { productSlugs } from './product-types'
import { getLatestDocVersion, getSupportedDocVersions } from './versions'

export function isProductSlug(value: string): value is ProductSlug {
  return productSlugs.includes(value as ProductSlug)
}

export function isRequestedDocVersion(
  product: ProductSlug,
  value: string,
): value is RequestedDocVersion {
  return getSupportedDocVersions(product).includes(value as RequestedDocVersion)
}

export function resolveDocVersion(
  product: ProductSlug,
  version: RequestedDocVersion,
): ConcreteDocVersion {
  return version === 'latest' ? getLatestDocVersion(product) : version
}
