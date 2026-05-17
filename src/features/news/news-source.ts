import { promises as fs } from 'node:fs'
import os from 'node:os'
import path from 'node:path'

import { localMd } from '@fumadocs/local-md'
import { dynamicLoader } from 'fumadocs-core/source/dynamic'
import { useStorage } from 'nitro/storage'
import { z } from 'zod'

import { newsEntryKinds } from '#/features/news/news-types'

const newsPageSchema = z.object({
  title: z.string(),
  summary: z.string(),
  publishedAt: z.string(),
  kind: z.enum(newsEntryKinds),
  published: z.boolean(),
  featured: z.boolean(),
  authors: z.array(z.string()),
  products: z.array(z.string()),
  tags: z.array(z.string()),
  coverImage: z.string(),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
})

let newsSourceCache: ReturnType<typeof localMd> | undefined
let loaderCache: ReturnType<typeof dynamicLoader> | undefined
let runtimeNewsRootPromise: Promise<string> | undefined

function resolveBundledNewsKeyToFilePath(key: string) {
  const withoutBaseName = key.startsWith('news:') ? key.slice('news:'.length) : key
  return withoutBaseName.replaceAll(':', path.sep)
}

async function getNewsRootDir() {
  if (process.env.NODE_ENV === 'development') {
    return path.resolve('content/news')
  }

  runtimeNewsRootPromise ??= materializeBundledNews()
  return runtimeNewsRootPromise
}

async function materializeBundledNews() {
  const storage = useStorage('assets/news')
  const targetRoot = path.join(os.tmpdir(), 'vandor-news')
  const keys = await storage.getKeys()

  await Promise.all(
    keys.map(async (key) => {
      const raw = await storage.getItemRaw(key)

      if (!raw) {
        return
      }

      const targetFile = path.join(targetRoot, resolveBundledNewsKeyToFilePath(key))
      await fs.mkdir(path.dirname(targetFile), { recursive: true })
      await fs.writeFile(targetFile, raw)
    }),
  )

  return targetRoot
}

async function getNewsSourceInstance() {
  if (!newsSourceCache) {
    const newsRoot = await getNewsRootDir()
    newsSourceCache = localMd({
      dir: newsRoot,
      frontmatterSchema: newsPageSchema,
      include: ['*.mdx'],
    })

    if (process.env.NODE_ENV === 'development') {
      void newsSourceCache.devServer()
    }
  }

  return newsSourceCache
}

export async function getNewsSource() {
  const newsSource = await getNewsSourceInstance()

  if (!loaderCache) {
    loaderCache = dynamicLoader(newsSource.dynamicSource(), {
      baseUrl: '/news',
    })
  }

  return loaderCache.get()
}

export async function getAllNewsPages() {
  const source = await getNewsSource()
  return source.getPages()
}

export async function getNewsPageBySlug(slug: string) {
  const source = await getNewsSource()
  return source.getPage([slug])
}
