import { useMemo } from 'react'
import type { MarkdownRendererSerializedOptions } from '@fumadocs/local-md'
import { rendererFromSerialized } from '@fumadocs/local-md/client'
import type { Root } from 'fumadocs-core/page-tree'
import { useFumadocsLoader } from 'fumadocs-core/source/client'
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
} from 'fumadocs-ui/layouts/docs/page'

import { useMDXComponents } from '#/components/mdx'
import { VxDocsLayout } from '#/features/vx/docs/docs-layout'
import type { RequestedVxVersion } from '#/features/vx/versioning/version-types'

type VxDocPageData = {
  description?: string
  pageTree: Root
  render: MarkdownRendererSerializedOptions
  requestedVersion: RequestedVxVersion
  resolvedVersion: string
  title: string
}

type VxDocPageProps = {
  data: VxDocPageData
}

export function VxDocPage({ data }: VxDocPageProps) {
  const hydrated = useFumadocsLoader(data) as VxDocPageData
  const renderer = useMemo(
    () => rendererFromSerialized(hydrated.render),
    [hydrated.render],
  )
  const { body, toc } = renderer.renderSync(useMDXComponents())

  return (
    <VxDocsLayout requestedVersion={hydrated.requestedVersion} tree={hydrated.pageTree}>
      <DocsPage toc={toc}>
        <DocsTitle>{hydrated.title}</DocsTitle>
        <DocsDescription>{hydrated.description}</DocsDescription>
        <DocsBody>{body}</DocsBody>
      </DocsPage>
    </VxDocsLayout>
  )
}
