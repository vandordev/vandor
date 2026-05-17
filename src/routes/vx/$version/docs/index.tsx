import { createFileRoute, notFound } from '@tanstack/react-router'

import {
  getVxDocsDescription,
  getVxDocsTitle,
} from '#/features/vx/docs/docs-metadata'
import { loadVxDocPage } from '#/features/vx/docs/load-doc-page'
import { VxDocPage } from '#/features/vx/docs/vx-doc-page'
import { isRequestedVxVersion } from '#/features/vx/versioning/resolve-version'
import {
  buildSeoHead,
  getCollectionPageStructuredData,
} from '#/lib/seo'

export const Route = createFileRoute('/vx/$version/docs/')({
  loader: async ({ params }) => {
    if (!isRequestedVxVersion(params.version)) {
      throw notFound()
    }

    return loadVxDocPage({
      data: {
        requestedVersion: params.version,
        slugs: [],
      },
    })
  },
  head: ({ loaderData }) =>
    loaderData
      ? buildSeoHead({
          title: getVxDocsTitle(loaderData.requestedVersion, loaderData.title),
          description: getVxDocsDescription(
            loaderData.requestedVersion,
            loaderData.description,
          ),
          path: `/vx/${loaderData.requestedVersion}/docs/`,
          imagePath: '/images/og/vandor-vx.svg',
          structuredData: getCollectionPageStructuredData({
            title: getVxDocsTitle(loaderData.requestedVersion, loaderData.title),
            description: getVxDocsDescription(
              loaderData.requestedVersion,
              loaderData.description,
            ),
            path: `/vx/${loaderData.requestedVersion}/docs/`,
          }),
        })
      : { meta: [], links: [], scripts: [] },
  component: VxDocsIndexRoute,
})

function VxDocsIndexRoute() {
  return <VxDocPage data={Route.useLoaderData()} />
}
