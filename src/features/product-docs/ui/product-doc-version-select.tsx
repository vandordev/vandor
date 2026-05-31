'use client'

import { useNavigate } from '@tanstack/react-router'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '#/components/ui/select'
import type {
  ProductSlug,
  RequestedDocVersion,
} from '#/features/product-docs/versioning/product-types'
import {
  getLatestDocVersion,
  getSupportedDocVersions,
} from '#/features/product-docs/versioning/versions'

type ProductDocVersionSelectProps = {
  product: ProductSlug
  requestedVersion: RequestedDocVersion
}

function getVersionLabel(product: ProductSlug, version: RequestedDocVersion) {
  if (version === 'latest') {
    return `latest (${getLatestDocVersion(product)})`
  }

  return version
}

export function ProductDocVersionSelect({
  product,
  requestedVersion,
}: ProductDocVersionSelectProps) {
  const navigate = useNavigate()
  const versionOptions = [
    'latest',
    ...getSupportedDocVersions(product).filter((value) => value !== 'latest'),
  ] as RequestedDocVersion[]

  return (
    <div className="mb-4">
      <Select
        value={requestedVersion}
        onValueChange={(nextVersion) => {
          void navigate({
            to: `/${product}/${nextVersion as RequestedDocVersion}/docs`,
          })
        }}
      >
        <SelectTrigger
          size="sm"
          className="w-full rounded-lg border-fd-border bg-fd-secondary/50 text-fd-foreground shadow-none"
        >
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="border-fd-border bg-fd-popover text-fd-popover-foreground">
          {versionOptions.map((version) => (
            <SelectItem key={version} value={version}>
              {getVersionLabel(product, version)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
