export const vandorContactEmail = 'hello@vandor.org'

export function getVandorMailto(subject: string) {
  const params = new URLSearchParams({ subject })

  return `mailto:${vandorContactEmail}?${params.toString()}`
}
