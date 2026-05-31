import type { ProductSlug, RequestedDocVersion } from './product-types'

export const productVersions = {
  vx: {
    concrete: ['v0'],
    latest: 'v0',
  },
  vxt: {
    concrete: ['v0'],
    latest: 'v0',
  },
} as const

export function getLatestDocVersion(product: ProductSlug) {
  return productVersions[product].latest
}

export function getSupportedDocVersions(product: ProductSlug) {
  return [
    ...productVersions[product].concrete,
    'latest',
  ] as RequestedDocVersion[]
}
