export const concreteDocVersions = ['v0', 'v1', 'v2'] as const

export type ConcreteDocVersion = (typeof concreteDocVersions)[number]

export type RequestedVxVersion = ConcreteDocVersion | 'latest'
