export const productSlugs = ['vx', 'vxt'] as const

export type ProductSlug = (typeof productSlugs)[number]

export const concreteDocVersions = ['v0'] as const

export type ConcreteDocVersion = (typeof concreteDocVersions)[number]

export type RequestedDocVersion = ConcreteDocVersion | 'latest'

export type RequestedVxVersion = RequestedDocVersion
