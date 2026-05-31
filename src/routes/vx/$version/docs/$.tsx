import { createFileRoute, notFound } from '@tanstack/react-router'

import {
  buildProductDocsPath,
  getProductDocsDescription,
  getProductDocsTitle,
} from '#/features/product-docs/ui/docs-metadata'
import { ProductDocPage } from '#/features/product-docs/ui/product-doc-page'
import { loadProductDocPage } from '#/features/product-docs/source/load-product-doc-page'
import { isRequestedDocVersion } from '#/features/product-docs/versioning/resolve-version'
import { getProductDocsConfig } from '#/features/product-docs/source/product-docs-registry'
import {
  buildSeoHead,
  getCollectionPageStructuredData,
} from '#/lib/seo'

export const Route = createFileRoute('/vx/$version/docs/$')({
  loader: async ({ params }) => {
    if (!isRequestedDocVersion('vx', params.version)) {
      throw notFound()
    }

    return loadProductDocPage({
      data: {
        product: 'vx',
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
  component: VxDocsCatchAllRoute,
})

function VxDocsCatchAllRoute() {
  return <ProductDocPage data={Route.useLoaderData()} />
}
