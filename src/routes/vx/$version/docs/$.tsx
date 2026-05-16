import { createFileRoute, notFound } from '@tanstack/react-router'

import { getVxDocsTitle } from '#/features/vx/docs/docs-metadata'
import { loadVxDocPage } from '#/features/vx/docs/load-doc-page'
import { VxDocPage } from '#/features/vx/docs/vx-doc-page'
import { isRequestedVxVersion } from '#/features/vx/versioning/resolve-version'

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
  head: ({ loaderData }) => ({
    meta: [
      {
        title: loaderData
          ? getVxDocsTitle(loaderData.requestedVersion, loaderData.title)
          : 'vx docs | Vandor',
      },
    ],
  }),
  component: VxDocsCatchAllRoute,
})

function VxDocsCatchAllRoute() {
  return <VxDocPage data={Route.useLoaderData()} />
}
