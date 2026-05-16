import { localMd } from '@fumadocs/local-md'
import { pageSchema } from 'fumadocs-core/source/schema'
import { dynamicLoader } from 'fumadocs-core/source/dynamic'
import { z } from 'zod'

import { resolveDocVersion } from '#/features/vx/versioning/resolve-version'
import type {
  ConcreteDocVersion,
  RequestedVxVersion,
} from '#/features/vx/versioning/version-types'

const docsDirectories: Record<ConcreteDocVersion, string> = {
  v0: 'content/docs/v0',
  v1: 'content/docs/v1',
  v2: 'content/docs/v2',
}

const vxPageSchema = pageSchema.extend({
  banner: z.string().optional(),
})

const docsSources: Record<ConcreteDocVersion, ReturnType<typeof localMd>> = {
  v0: localMd({ dir: docsDirectories.v0, frontmatterSchema: vxPageSchema }),
  v1: localMd({ dir: docsDirectories.v1, frontmatterSchema: vxPageSchema }),
  v2: localMd({ dir: docsDirectories.v2, frontmatterSchema: vxPageSchema }),
}

if (process.env.NODE_ENV === 'development') {
  for (const source of Object.values(docsSources)) {
    void source.devServer()
  }
}

const loaderCache = new Map<string, ReturnType<typeof dynamicLoader>>()

export async function getVxDocsSource(requestedVersion: RequestedVxVersion) {
  const resolvedVersion = resolveDocVersion(requestedVersion)
  const cacheKey = `${requestedVersion}:${resolvedVersion}`

  let loader = loaderCache.get(cacheKey)

  if (!loader) {
    loader = dynamicLoader(docsSources[resolvedVersion].dynamicSource(), {
      baseUrl: `/vx/${requestedVersion}/docs`,
    })
    loaderCache.set(cacheKey, loader)
  }

  return loader.get()
}
