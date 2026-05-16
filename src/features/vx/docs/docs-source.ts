import { localMd } from '@fumadocs/local-md'
import { dynamicLoader } from 'fumadocs-core/source/dynamic'

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

const docsSources: Record<ConcreteDocVersion, ReturnType<typeof localMd>> = {
  v0: localMd({ dir: docsDirectories.v0 }),
  v1: localMd({ dir: docsDirectories.v1 }),
  v2: localMd({ dir: docsDirectories.v2 }),
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
