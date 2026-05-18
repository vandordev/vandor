import { promises as fs } from 'node:fs'
import os from 'node:os'
import path from 'node:path'

import { localMd } from '@fumadocs/local-md'
import { dynamicLoader } from 'fumadocs-core/source/dynamic'
import { useStorage } from 'nitro/storage'
import { z } from 'zod'

import { writingEntryKinds } from '#/features/writing/writing-types'

const writingPageSchema = z.object({
  title: z.string(),
  summary: z.string(),
  publishedAt: z.string(),
  kind: z.enum(writingEntryKinds),
  published: z.boolean(),
  featured: z.boolean(),
  authors: z.array(z.string()),
  tags: z.array(z.string()),
  coverImage: z.string(),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
})

let writingSourceCache: ReturnType<typeof localMd> | undefined
let loaderCache: ReturnType<typeof dynamicLoader> | undefined
let runtimeWritingRootPromise: Promise<string> | undefined

function resolveBundledWritingKeyToFilePath(key: string) {
  const withoutBaseName = key.startsWith('writing:') ? key.slice('writing:'.length) : key
  return withoutBaseName.replaceAll(':', path.sep)
}

async function getWritingRootDir() {
  if (process.env.NODE_ENV === 'development') {
    return path.resolve('content/writing')
  }

  runtimeWritingRootPromise ??= materializeBundledWriting()
  return runtimeWritingRootPromise
}

async function materializeBundledWriting() {
  const storage = useStorage('assets/writing')
  const targetRoot = path.join(os.tmpdir(), 'vandor-writing')
  const keys = await storage.getKeys()

  await Promise.all(
    keys.map(async (key) => {
      const raw = await storage.getItemRaw(key)

      if (!raw) {
        return
      }

      const targetFile = path.join(
        targetRoot,
        resolveBundledWritingKeyToFilePath(key),
      )
      await fs.mkdir(path.dirname(targetFile), { recursive: true })
      await fs.writeFile(targetFile, raw)
    }),
  )

  return targetRoot
}

async function getWritingSourceInstance() {
  if (!writingSourceCache) {
    const writingRoot = await getWritingRootDir()
    writingSourceCache = localMd({
      dir: writingRoot,
      frontmatterSchema: writingPageSchema,
      include: ['*.mdx'],
    })

    if (process.env.NODE_ENV === 'development') {
      void writingSourceCache.devServer()
    }
  }

  return writingSourceCache
}

export async function getWritingSource() {
  const writingSource = await getWritingSourceInstance()

  if (!loaderCache) {
    loaderCache = dynamicLoader(writingSource.dynamicSource(), {
      baseUrl: '/writing',
    })
  }

  return loaderCache.get()
}

export async function getAllWritingPages() {
  const source = await getWritingSource()
  return source.getPages()
}

export async function getWritingPageBySlug(slug: string) {
  const source = await getWritingSource()
  return source.getPage([slug])
}
