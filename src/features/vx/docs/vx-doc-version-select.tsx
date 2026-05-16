'use client'

import { useNavigate } from '@tanstack/react-router'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '#/components/ui/select'
import {
  latestDocVersion,
  supportedDocVersions,
} from '#/features/vx/versioning/versions'
import type { RequestedVxVersion } from '#/features/vx/versioning/version-types'

type VxDocVersionSelectProps = {
  requestedVersion: RequestedVxVersion
}

const versionOptions = [
  'latest',
  ...[...supportedDocVersions].filter((value) => value !== 'latest').reverse(),
] as const

function getVersionLabel(version: RequestedVxVersion) {
  if (version === 'latest') {
    return `latest (${latestDocVersion})`
  }

  return version
}

export function VxDocVersionSelect({
  requestedVersion,
}: VxDocVersionSelectProps) {
  const navigate = useNavigate()

  return (
    <div className="mb-4">
      <Select
        value={requestedVersion}
        onValueChange={(nextVersion) => {
          void navigate({ to: `/vx/${nextVersion as RequestedVxVersion}/docs` })
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
              {getVersionLabel(version)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
