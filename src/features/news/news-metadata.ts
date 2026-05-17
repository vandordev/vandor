export function getNewsIndexTitle() {
  return 'News | Vandor'
}

export function getNewsIndexDescription() {
  return 'Announcements, essays, product updates, and release notes from Vandor.'
}

export function getNewsEntryTitle(title: string, seoTitle?: string) {
  return `${seoTitle ?? title} | Vandor News`
}

export function getNewsEntryDescription(summary: string, seoDescription?: string) {
  return seoDescription ?? summary
}
