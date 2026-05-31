import { createFileRoute, notFound } from '@tanstack/react-router'

import { isRequestedDocVersion } from '#/features/product-docs/versioning/resolve-version'
import { VxLandingPage } from '#/features/vx/landing/vx-landing-page'
import {
  getVxLandingDescription,
  getVxLandingTitle,
} from '#/features/vx/landing/vx-metadata'
import {
  buildSeoHead,
  getSoftwareApplicationStructuredData,
} from '#/lib/seo'

export const Route = createFileRoute('/vx/$version/')({
  loader: ({ params }) => {
    if (!isRequestedDocVersion('vx', params.version)) {
      throw notFound()
    }

    return {
      requestedVersion: params.version,
    }
  },
  head: ({ loaderData }) =>
    buildSeoHead({
      title: getVxLandingTitle(loaderData?.requestedVersion ?? 'latest'),
      description: getVxLandingDescription(),
      path: `/vx/${loaderData?.requestedVersion ?? 'latest'}/`,
      imagePath: '/images/og/vandor-vx.svg',
      structuredData: getSoftwareApplicationStructuredData({
        title: getVxLandingTitle(loaderData?.requestedVersion ?? 'latest'),
        description: getVxLandingDescription(),
        path: `/vx/${loaderData?.requestedVersion ?? 'latest'}/`,
      }),
    }),
  component: VxVersionLandingRoute,
})

function VxVersionLandingRoute() {
  const { requestedVersion } = Route.useLoaderData()

  return <VxLandingPage requestedVersion={requestedVersion} />
}
