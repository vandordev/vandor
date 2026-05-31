import { promises as fs } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { productDocsManifest } from './product-docs-manifest.mjs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const repoRoot = path.resolve(__dirname, '..')
const outputRoot = path.join(repoRoot, '.generated', 'product-docs')

function hasFrontmatter(content) {
  return content.startsWith('---\n')
}

function toFrontmatterValue(value) {
  return JSON.stringify(value)
}

function buildFrontmatter(page) {
  const lines = ['---']

  if (page.title) {
    lines.push(`title: ${toFrontmatterValue(page.title)}`)
  }

  if (page.description) {
    lines.push(`description: ${toFrontmatterValue(page.description)}`)
  }

  if (page.banner) {
    lines.push(`banner: ${toFrontmatterValue(page.banner)}`)
  }

  lines.push('---', '')
  return lines.join('\n')
}

function normalizeMarkdown(page, content) {
  if (hasFrontmatter(content)) {
    return content
  }

  return `${buildFrontmatter(page)}${content}`
}

async function ensureExists(absolutePath, errorMessage) {
  try {
    await fs.access(absolutePath)
  } catch {
    throw new Error(errorMessage)
  }
}

async function writeGeneratedPage({ sourceRoot, outputDir, page }) {
  const sourceFile = path.join(sourceRoot, page.source)
  await ensureExists(sourceFile, `Missing product docs source file: ${sourceFile}`)

  const raw = await fs.readFile(sourceFile, 'utf8')
  const normalized = normalizeMarkdown(page, raw)
  const targetFile =
    page.slug === 'index'
      ? path.join(outputDir, 'index.mdx')
      : path.join(outputDir, `${page.slug}.mdx`)

  await fs.mkdir(path.dirname(targetFile), { recursive: true })
  await fs.writeFile(targetFile, normalized)
}

async function writeMetaJson(outputDir, versionConfig) {
  const meta = {
    title: versionConfig.title,
    pages: versionConfig.pages.map((page) => page.slug),
  }

  await fs.writeFile(
    path.join(outputDir, 'meta.json'),
    `${JSON.stringify(meta, null, 2)}\n`,
  )
}

async function syncProductVersion(productKey, productConfig, versionKey, versionConfig) {
  const sourceRoot = path.resolve(repoRoot, productConfig.sourceRoot)

  await ensureExists(
    sourceRoot,
    `Missing product docs source root: ${sourceRoot}`,
  )

  if (!Array.isArray(versionConfig.pages) || versionConfig.pages.length === 0) {
    throw new Error(
      `Product ${productKey} version ${versionKey} has no declared docs pages`,
    )
  }

  const outputDir = path.join(outputRoot, productKey, versionKey)
  await fs.mkdir(outputDir, { recursive: true })

  for (const page of versionConfig.pages) {
    if (!page.source || !page.slug) {
      throw new Error(
        `Product ${productKey} version ${versionKey} has malformed page entry`,
      )
    }

    await writeGeneratedPage({
      sourceRoot,
      outputDir,
      page,
    })
  }

  await writeMetaJson(outputDir, versionConfig)
}

async function main() {
  await fs.rm(outputRoot, { recursive: true, force: true })

  for (const [productKey, productConfig] of Object.entries(productDocsManifest)) {
    for (const [versionKey, versionConfig] of Object.entries(productConfig.versions)) {
      await syncProductVersion(productKey, productConfig, versionKey, versionConfig)
      console.log(`synced ${productKey}/${versionKey}`)
    }
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error)
  process.exitCode = 1
})
