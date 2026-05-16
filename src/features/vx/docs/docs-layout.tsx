import type { ReactNode } from 'react'
import type { Root } from 'fumadocs-core/page-tree'
import { DocsLayout } from 'fumadocs-ui/layouts/docs'
import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared'

import { Logo } from '#/components/logo'
import { VxDocVersionSelect } from '#/features/vx/docs/vx-doc-version-select'
import type { RequestedVxVersion } from '#/features/vx/versioning/version-types'

function getBaseOptions(requestedVersion: RequestedVxVersion): BaseLayoutProps {
  return {
    nav: {
      title: (
        <span className="inline-flex items-center gap-2 font-semibold">
          <Logo className="h-8 w-auto" />
          <span className="text-muted-foreground">/</span>
          <span>vx</span>
        </span>
      ),
      url: `/vx/${requestedVersion}`,
    },
    links: [
      {
        type: 'custom',
        on: 'menu',
        children: <VxDocVersionSelect requestedVersion={requestedVersion} />,
      },
      {
        type: 'button',
        text: 'Install vx',
        url: `/vx/${requestedVersion}/docs/getting-started`,
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

type VxDocsLayoutProps = {
  children: ReactNode
  requestedVersion: RequestedVxVersion
  tree: Root
}

export function VxDocsLayout({
  children,
  requestedVersion,
  tree,
}: VxDocsLayoutProps) {
  return (
    <DocsLayout
      tree={tree}
      containerProps={{ className: 'vandor-docs' }}
      {...getBaseOptions(requestedVersion)}
    >
      {children}
    </DocsLayout>
  )
}
