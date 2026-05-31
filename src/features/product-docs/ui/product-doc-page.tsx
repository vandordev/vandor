import { useMemo } from 'react'
import { Text } from 'lucide-react'
import type { MarkdownRendererSerializedOptions } from '@fumadocs/local-md'
import { rendererFromSerialized } from '@fumadocs/local-md/client'
import type { Root } from 'fumadocs-core/page-tree'
import { useFumadocsLoader } from 'fumadocs-core/source/client'
import {
  TOCProvider,
  TOCScrollArea,
  useTOCItems,
} from 'fumadocs-ui/components/toc'
import {
  TOCEmpty,
  TOCItem,
  TOCItems,
} from 'fumadocs-ui/components/toc/default'
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
} from 'fumadocs-ui/layouts/docs/page'

import { useMDXComponents } from '#/components/mdx'
import { WaterRippleEffect } from '#/components/ui/water-ripple-effect'
import { ProductDocsLayout } from '#/features/product-docs/ui/product-docs-layout'
import type {
  ConcreteDocVersion,
  ProductSlug,
  RequestedDocVersion,
} from '#/features/product-docs/versioning/product-types'
import { cn } from '#/lib/utils'

type ProductDocPageData = {
  banner?: string
  description?: string
  pageTree: Root
  product: ProductSlug
  render: MarkdownRendererSerializedOptions
  requestedVersion: RequestedDocVersion
  resolvedVersion: ConcreteDocVersion
  title: string
}

type ProductDocPageProps = {
  data: ProductDocPageData
}

export function ProductDocPage({ data }: ProductDocPageProps) {
  const hydrated = useFumadocsLoader(data) as ProductDocPageData
  const renderer = useMemo(
    () => rendererFromSerialized(hydrated.render),
    [hydrated.render],
  )
  const { body, toc } = renderer.renderSync(useMDXComponents())
  const hasInlineToc = toc.length > 0

  return (
    <ProductDocsLayout
      product={hydrated.product}
      requestedVersion={hydrated.requestedVersion}
      tree={hydrated.pageTree}
    >
      <DocsPage
        className={
          hydrated.banner || hasInlineToc ? 'max-w-[1168px]' : undefined
        }
        tableOfContent={{ enabled: false }}
        tableOfContentPopover={{ enabled: false }}
      >
        {hydrated.banner ? (
          <div className="mb-8 overflow-hidden rounded-[1.5rem] border border-border bg-card">
            <div className="relative h-44 w-full sm:h-52">
              <WaterRippleEffect
                imageSrc={hydrated.banner}
                aria-hidden="true"
                distortionAmount={0.01}
                hoverRippleMultiplier={4.8}
                rippleFrequency={24}
                rippleIntensity={0.015}
                transitionSpeed={0.09}
                waveIntensity={0.007}
                waveFrequency={12}
                className="bg-card"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-black/15 to-transparent" />
            </div>
          </div>
        ) : null}
        <TOCProvider toc={toc}>
          <div
            className={cn(
              'grid min-w-0 gap-8 lg:gap-12',
              hasInlineToc && 'lg:grid-cols-[minmax(0,65ch)_240px]',
            )}
          >
            <div className="min-w-0 w-full max-w-[65ch]">
              <DocsTitle>{hydrated.title}</DocsTitle>
              <DocsDescription>{hydrated.description}</DocsDescription>
              {!hasInlineToc ? null : <InlineToc className="mb-8 lg:hidden" />}
              <DocsBody className="max-w-none">{body}</DocsBody>
            </div>
            {!hasInlineToc ? null : (
              <div className="hidden self-stretch lg:block">
                <InlineToc className="sticky top-24" />
              </div>
            )}
          </div>
        </TOCProvider>
      </DocsPage>
    </ProductDocsLayout>
  )
}

function InlineToc({ className }: { className?: string }) {
  const items = useTOCItems()

  return (
    <div
      className={cn(
        'w-full min-w-0 overflow-hidden rounded-[1.25rem] border border-border bg-card/55 p-5',
        className,
      )}
    >
      <div className="mb-3 inline-flex items-center gap-2 text-sm text-muted-foreground">
        <Text className="size-4" />
        <span>On this page</span>
      </div>
      <TOCScrollArea className="min-w-0 max-w-full overflow-x-hidden py-0 lg:max-h-[calc(100vh-9rem)]">
        <TOCItems className="min-w-0 border-border/80">
          {items.length === 0 ? <TOCEmpty /> : null}
          {items.map((item) => (
            <TOCItem
              key={item.url}
              item={item}
              className="max-w-full text-foreground/72 hover:text-white data-[active=true]:text-white"
            />
          ))}
        </TOCItems>
      </TOCScrollArea>
    </div>
  )
}
