import type { ReactNode } from 'react'
import type { Root } from 'fumadocs-core/page-tree'
import { DocsLayout } from 'fumadocs-ui/layouts/docs'
import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared'

import type { RequestedVxVersion } from '#/features/vx/versioning/version-types'

function getBaseOptions(requestedVersion: RequestedVxVersion): BaseLayoutProps {
  return {
    nav: {
      title: 'Vandor',
      url: '/',
    },
    links: [
      {
        text: 'vx Landing',
        url: `/vx/${requestedVersion}`,
        active: 'nested-url',
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
