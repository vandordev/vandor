import type { RequestedVxVersion } from '#/features/product-docs/versioning/product-types'

export function getVxLandingTitle(requestedVersion: RequestedVxVersion) {
  return `vx ${requestedVersion} | Vandor`
}

export function getVxLandingDescription() {
  return 'vx is a Vandor-maintained CLI for structured Go backends, with versioned documentation and a cleaner path into reusable service architecture.'
}
