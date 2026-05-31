import { createFileRoute, notFound } from '@tanstack/react-router'

import { loadProductDocPage } from '#/features/product-docs/source/load-product-doc-page'
import { getProductDocsConfig } from '#/features/product-docs/source/product-docs-registry'
import {
  buildProductDocsPath,
  getProductDocsDescription,
  getProductDocsTitle,
} from '#/features/product-docs/ui/docs-metadata'
import { ProductDocPage } from '#/features/product-docs/ui/product-doc-page'
import { isRequestedDocVersion } from '#/features/product-docs/versioning/resolve-version'
import {
  buildSeoHead,
  getCollectionPageStructuredData,
} from '#/lib/seo'

export const Route = createFileRoute('/vxt/$version/docs/$')({
  loader: async ({ params }) => {
    if (!isRequestedDocVersion('vxt', params.version)) {
      throw notFound()
    }

    return loadProductDocPage({
      data: {
        product: 'vxt',
        requestedVersion: params.version,
        slugs: params._splat ? params._splat.split('/') : [],
      },
    })
  },
  head: ({ loaderData, params }) =>
    loaderData
      ? buildSeoHead({
          title: getProductDocsTitle(
            loaderData.product,
            loaderData.requestedVersion,
            loaderData.title,
          ),
          description: getProductDocsDescription(
            loaderData.product,
            loaderData.requestedVersion,
            loaderData.description,
          ),
          path: buildProductDocsPath({
            product: loaderData.product,
            requestedVersion: loaderData.requestedVersion,
            slugs: params._splat ? params._splat.split('/') : [],
          }),
          imagePath: getProductDocsConfig(loaderData.product).ogImagePath,
          structuredData: getCollectionPageStructuredData({
            title: getProductDocsTitle(
              loaderData.product,
              loaderData.requestedVersion,
              loaderData.title,
            ),
            description: getProductDocsDescription(
              loaderData.product,
              loaderData.requestedVersion,
              loaderData.description,
            ),
            path: buildProductDocsPath({
              product: loaderData.product,
              requestedVersion: loaderData.requestedVersion,
              slugs: params._splat ? params._splat.split('/') : [],
            }),
          }),
        })
      : { meta: [], links: [], scripts: [] },
  component: VxtDocsCatchAllRoute,
})

function VxtDocsCatchAllRoute() {
  return <ProductDocPage data={Route.useLoaderData()} />
}
