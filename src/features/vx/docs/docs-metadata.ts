import type { RequestedVxVersion } from '#/features/vx/versioning/version-types'

export function getVxDocsTitle(
  requestedVersion: RequestedVxVersion,
  title?: string,
) {
  if (title) {
    return `${title} | vx ${requestedVersion} docs | Vandor`
  }

  return `vx ${requestedVersion} docs | Vandor`
}

export function getVxDocsDescription(
  requestedVersion: RequestedVxVersion,
  description?: string,
) {
  if (description) {
    return description
  }

  return `Versioned documentation for vx ${requestedVersion}, Vandor’s CLI for structured Go backends.`
}
