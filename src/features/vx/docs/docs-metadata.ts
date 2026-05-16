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
