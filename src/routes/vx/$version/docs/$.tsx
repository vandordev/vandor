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

export const Route = createFileRoute('/vx/$version/docs/$')({
  loader: async ({ params }) => {
    if (!isRequestedVxVersion(params.version)) {
      throw notFound()
    }

    return loadVxDocPage({
      data: {
        requestedVersion: params.version,
        slugs: params._splat ? params._splat.split('/') : [],
      },
    })
  },
  head: ({ loaderData, params }) =>
    loaderData
      ? buildSeoHead({
          title: getVxDocsTitle(loaderData.requestedVersion, loaderData.title),
          description: getVxDocsDescription(
            loaderData.requestedVersion,
            loaderData.description,
          ),
          path: `/vx/${loaderData.requestedVersion}/docs/${params._splat ?? ''}`,
          imagePath: '/images/og/vandor-vx.svg',
          structuredData: getCollectionPageStructuredData({
            title: getVxDocsTitle(loaderData.requestedVersion, loaderData.title),
            description: getVxDocsDescription(
              loaderData.requestedVersion,
              loaderData.description,
            ),
            path: `/vx/${loaderData.requestedVersion}/docs/${params._splat ?? ''}`,
          }),
        })
      : { meta: [], links: [], scripts: [] },
  component: VxDocsCatchAllRoute,
})

function VxDocsCatchAllRoute() {
  return <VxDocPage data={Route.useLoaderData()} />
}
