import { createFileRoute, notFound, redirect } from '@tanstack/react-router'

import { isRequestedDocVersion } from '#/features/product-docs/versioning/resolve-version'

export const Route = createFileRoute('/vxt/$version/')({
  beforeLoad: ({ params }) => {
    if (!isRequestedDocVersion('vxt', params.version)) {
      throw notFound()
    }

    throw redirect({
      to: '/vxt/$version/docs',
      params: {
        version: params.version,
      },
    })
  },
})
