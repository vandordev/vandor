export function getWritingTitle() {
  return 'Writing | Vandor'
}

export function getWritingDescription() {
  return 'Essays, technical notes, and working practices from across Vandor.'
}

export function getWritingEntryTitle(title: string, seoTitle?: string) {
  return `${seoTitle ?? title} | Vandor Writing`
}

export function getWritingEntryDescription(
  summary: string,
  seoDescription?: string,
) {
  return seoDescription ?? summary
}
