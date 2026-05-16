import { promises as fs } from 'node:fs'
import os from 'node:os'
import path from 'node:path'

import { localMd } from '@fumadocs/local-md'
import { pageSchema } from 'fumadocs-core/source/schema'
import { dynamicLoader } from 'fumadocs-core/source/dynamic'
import { useStorage } from 'nitro/storage'
import { z } from 'zod'

import { resolveDocVersion } from '#/features/vx/versioning/resolve-version'
import type {
  ConcreteDocVersion,
  RequestedVxVersion,
} from '#/features/vx/versioning/version-types'

const docsSubdirectories: Record<ConcreteDocVersion, string> = {
  v0: 'v0',
  v1: 'v1',
  v2: 'v2',
}

const vxPageSchema = pageSchema.extend({
  banner: z.string().optional(),
})

const docsSourcesCache = new Map<ConcreteDocVersion, ReturnType<typeof localMd>>()

const loaderCache = new Map<string, ReturnType<typeof dynamicLoader>>()

let runtimeDocsRootPromise: Promise<string> | undefined

async function getDocsRootDir() {
  if (process.env.NODE_ENV === 'development') {
    return path.resolve('content/docs')
  }

  runtimeDocsRootPromise ??= materializeBundledDocs()
  return runtimeDocsRootPromise
}

async function materializeBundledDocs() {
  const storage = useStorage('assets/vx-docs')
  const targetRoot = path.join(os.tmpdir(), 'vandor-vx-docs')

  const keys = await storage.getKeys()

  await Promise.all(
    keys.map(async (key) => {
      const raw = await storage.getItemRaw(key)

      if (!raw) {
        return
      }

      const targetFile = path.join(targetRoot, key)
      await fs.mkdir(path.dirname(targetFile), { recursive: true })
      await fs.writeFile(targetFile, raw)
    }),
  )

  return targetRoot
}

async function getDocsSource(version: ConcreteDocVersion) {
  let source = docsSourcesCache.get(version)

  if (!source) {
    const docsRoot = await getDocsRootDir()
    source = localMd({
      dir: path.join(docsRoot, docsSubdirectories[version]),
      frontmatterSchema: vxPageSchema,
    })
    docsSourcesCache.set(version, source)

    if (process.env.NODE_ENV === 'development') {
      void source.devServer()
    }
  }

  return source
}

export async function getVxDocsSource(requestedVersion: RequestedVxVersion) {
  const resolvedVersion = resolveDocVersion(requestedVersion)
  const cacheKey = `${requestedVersion}:${resolvedVersion}`
  const docsSource = await getDocsSource(resolvedVersion)

  let loader = loaderCache.get(cacheKey)

  if (!loader) {
    loader = dynamicLoader(docsSource.dynamicSource(), {
      baseUrl: `/vx/${requestedVersion}/docs`,
    })
    loaderCache.set(cacheKey, loader)
  }

  return loader.get()
}
