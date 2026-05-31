import type { ReactNode } from 'react'
import type { Root } from 'fumadocs-core/page-tree'
import { DocsLayout } from 'fumadocs-ui/layouts/docs'
import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared'

import { Logo } from '#/components/logo'
import { getProductDocsConfig } from '#/features/product-docs/source/product-docs-registry'
import { ProductDocVersionSelect } from '#/features/product-docs/ui/product-doc-version-select'
import type {
  ProductSlug,
  RequestedDocVersion,
} from '#/features/product-docs/versioning/product-types'

function getBaseOptions(
  product: ProductSlug,
  requestedVersion: RequestedDocVersion,
): BaseLayoutProps {
  const productConfig = getProductDocsConfig(product)

  return {
    nav: {
      title: (
        <span className="inline-flex items-center gap-2 font-semibold">
          <Logo className="h-8 w-auto" />
          <span className="text-muted-foreground">/</span>
          <span>{productConfig.label}</span>
        </span>
      ),
      url: productConfig.getBrandHref(requestedVersion),
    },
    links: [
      {
        type: 'custom',
        on: 'menu',
        children: (
          <ProductDocVersionSelect
            product={product}
            requestedVersion={requestedVersion}
          />
        ),
      },
      {
        type: 'button',
        text: productConfig.primaryCtaLabel,
        url: productConfig.getPrimaryCtaHref(requestedVersion),
      },
    ],
    searchToggle: {
      enabled: false,
    },
    themeSwitch: {
      enabled: false,
    },
  }
}

type ProductDocsLayoutProps = {
  children: ReactNode
  product: ProductSlug
  requestedVersion: RequestedDocVersion
  tree: Root
}

export function ProductDocsLayout({
  children,
  product,
  requestedVersion,
  tree,
}: ProductDocsLayoutProps) {
  return (
    <DocsLayout
      tree={tree}
      containerProps={{ className: 'vandor-docs' }}
      {...getBaseOptions(product, requestedVersion)}
    >
      {children}
    </DocsLayout>
  )
}
