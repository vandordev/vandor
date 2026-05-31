import { promises as fs } from 'node:fs'
import os from 'node:os'
import path from 'node:path'

import { localMd } from '@fumadocs/local-md'
import { dynamicLoader } from 'fumadocs-core/source/dynamic'
import { useStorage } from 'nitro/storage'

import { productDocPageSchema } from '#/features/product-docs/source/docs-schema'
import { resolveDocVersion } from '#/features/product-docs/versioning/resolve-version'
import type {
  ConcreteDocVersion,
  ProductSlug,
  RequestedDocVersion,
} from '#/features/product-docs/versioning/product-types'

const docsSourcesCache = new Map<string, ReturnType<typeof localMd>>()

const loaderCache = new Map<string, ReturnType<typeof dynamicLoader>>()

let runtimeDocsRootPromise: Promise<string> | undefined

function resolveBundledDocKeyToFilePath(key: string) {
  const withoutBaseName = key.startsWith('product-docs:')
    ? key.slice('product-docs:'.length)
    : key

  return withoutBaseName.replaceAll(':', path.sep)
}

async function getDocsRootDir() {
  if (process.env.NODE_ENV === 'development') {
    return path.resolve('.generated/product-docs')
  }

  runtimeDocsRootPromise ??= materializeBundledDocs()
  return runtimeDocsRootPromise
}

async function materializeBundledDocs() {
  const storage = useStorage('assets/product-docs')
  const targetRoot = path.join(os.tmpdir(), 'vandor-product-docs')
  const keys = await storage.getKeys()

  await Promise.all(
    keys.map(async (key) => {
      const raw = await storage.getItemRaw(key)

      if (!raw) {
        return
      }

      const targetFile = path.join(targetRoot, resolveBundledDocKeyToFilePath(key))
      await fs.mkdir(path.dirname(targetFile), { recursive: true })
      await fs.writeFile(targetFile, raw)
    }),
  )

  return targetRoot
}

async function getDocsSource(product: ProductSlug, version: ConcreteDocVersion) {
  const cacheKey = `${product}:${version}`
  let source = docsSourcesCache.get(cacheKey)

  if (!source) {
    const docsRoot = await getDocsRootDir()
    source = localMd({
      dir: path.join(docsRoot, product, version),
      frontmatterSchema: productDocPageSchema,
    })
    docsSourcesCache.set(cacheKey, source)
  }

  return source
}

export async function getProductDocsSource(
  product: ProductSlug,
  requestedVersion: RequestedDocVersion,
) {
  const resolvedVersion = resolveDocVersion(product, requestedVersion)
  const cacheKey = `${product}:${requestedVersion}:${resolvedVersion}`
  const docsSource = await getDocsSource(product, resolvedVersion)

  let loader = loaderCache.get(cacheKey)

  if (!loader) {
    loader = dynamicLoader(docsSource.dynamicSource(), {
      baseUrl: `/${product}/${requestedVersion}/docs`,
    })
    loaderCache.set(cacheKey, loader)
  }

  return loader.get()
}
