import type { ConcreteDocVersion, RequestedVxVersion } from './version-types'
import { latestDocVersion, supportedDocVersions } from './versions'

export function isRequestedVxVersion(value: string): value is RequestedVxVersion {
  return supportedDocVersions.includes(value as RequestedVxVersion)
}

export function resolveDocVersion(version: RequestedVxVersion): ConcreteDocVersion {
  return version === 'latest' ? latestDocVersion : version
}
