import { createFileRoute, notFound } from '@tanstack/react-router'

import { VxLandingPage } from '#/features/vx/landing/vx-landing-page'
import { isRequestedVxVersion } from '#/features/vx/versioning/resolve-version'

export const Route = createFileRoute('/vx/$version/')({
  loader: ({ params }) => {
    if (!isRequestedVxVersion(params.version)) {
      throw notFound()
    }

    return {
      requestedVersion: params.version,
    }
  },
  head: ({ loaderData }) => ({
    meta: [
      {
        title: `vx ${loaderData?.requestedVersion ?? 'latest'} | Vandor`,
      },
    ],
  }),
  component: VxVersionLandingRoute,
})

function VxVersionLandingRoute() {
  const { requestedVersion } = Route.useLoaderData()

  return <VxLandingPage requestedVersion={requestedVersion} />
}
