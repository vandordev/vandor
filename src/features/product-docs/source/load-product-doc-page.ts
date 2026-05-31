import { notFound } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'

import { getProductDocsSource } from '#/features/product-docs/source/docs-source'
import {
  isProductSlug,
  isRequestedDocVersion,
  resolveDocVersion,
} from '#/features/product-docs/versioning/resolve-version'
import type {
  ProductSlug,
  RequestedDocVersion,
} from '#/features/product-docs/versioning/product-types'

type ProductDocPageInput = {
  product: string
  requestedVersion: string
  slugs: string[]
}

export const loadProductDocPage = createServerFn({
  method: 'GET',
})
  .inputValidator((input: ProductDocPageInput) => input)
  .handler(async ({ data }) => {
    if (!isProductSlug(data.product)) {
      throw notFound()
    }

    const product = data.product as ProductSlug

    if (!isRequestedDocVersion(product, data.requestedVersion)) {
      throw notFound()
    }

    const requestedVersion = data.requestedVersion as RequestedDocVersion
    const resolvedVersion = resolveDocVersion(product, requestedVersion)
    const source = await getProductDocsSource(product, requestedVersion)
    const page = source.getPage(data.slugs)

    if (!page) {
      throw notFound()
    }

    const renderer = await page.data.load()

    return {
      banner: page.data.frontmatter.banner,
      description: page.data.description,
      pageTree: source.getPageTree(),
      product,
      render: renderer.serialize(),
      requestedVersion,
      resolvedVersion,
      title: page.data.title,
    }
  })
