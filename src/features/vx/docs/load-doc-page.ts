import { notFound } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'

import { getVxDocsSource } from '#/features/vx/docs/docs-source'
import {
  isRequestedVxVersion,
  resolveDocVersion,
} from '#/features/vx/versioning/resolve-version'
import type { RequestedVxVersion } from '#/features/vx/versioning/version-types'

type VxDocPageInput = {
  requestedVersion: string
  slugs: string[]
}

export const loadVxDocPage = createServerFn({
  method: 'GET',
})
  .inputValidator((input: VxDocPageInput) => input)
  .handler(async ({ data }) => {
    if (!isRequestedVxVersion(data.requestedVersion)) {
      throw notFound()
    }

    const requestedVersion = data.requestedVersion as RequestedVxVersion
    const resolvedVersion = resolveDocVersion(requestedVersion)
    const source = await getVxDocsSource(requestedVersion)
    const page = source.getPage(data.slugs)

    if (!page) {
      throw notFound()
    }

    const renderer = await page.data.load()

    return {
      description: page.data.description,
      pageTree: source.getPageTree(),
      render: renderer.serialize(),
      requestedVersion,
      resolvedVersion,
      title: page.data.title,
    }
  })
