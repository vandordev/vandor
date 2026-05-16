import { concreteDocVersions } from './version-types'

export const supportedDocVersions = [...concreteDocVersions, 'latest'] as const

export const latestDocVersion = concreteDocVersions[concreteDocVersions.length - 1]
