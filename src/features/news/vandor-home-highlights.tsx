import type { NewsIndexData, NewsEntryListItem } from '#/features/news/news-types'

function formatDate(value: string) {
  return new Intl.DateTimeFormat('en', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date(value))
}

function formatKind(value: string) {
  return value.replace('-', ' ')
}

function getHomeHighlightImageClass(slug: string) {
  switch (slug) {
    case 'why-vandor-builds-vx':
      return 'object-[22%_50%]'
    case 'vx-release-notes-v0-1':
      return 'object-[24%_44%]'
    default:
      return 'object-center'
  }
}

function StoryMeta({
  entry,
  showKind = true,
}: {
  entry: NewsEntryListItem
  showKind?: boolean
}) {
  return (
    <div className="flex flex-wrap items-center gap-2 text-[0.78rem] text-muted-foreground">
      <p>{entry.authors.join(', ')}</p>
      <div className="size-1 rounded-full bg-muted-foreground" />
      <p className="tabular-nums">{formatDate(entry.publishedAt)}</p>
      {showKind ? (
        <>
          <div className="size-1 rounded-full bg-muted-foreground" />
          <p>{formatKind(entry.kind)}</p>
        </>
      ) : null}
    </div>
  )
}

type VandorHomeHighlightsProps = {
  data: NewsIndexData
}

export function VandorHomeHighlights({ data }: VandorHomeHighlightsProps) {
  const leadStory = data.featured ?? data.entries[0]
  const supportingStories = data.featured
    ? data.entries.slice(0, 2)
    : data.entries.slice(1, 3)

  if (!leadStory) {
    return null
  }

  return (
    <div className="relative space-y-8 border-t border-border/70 pt-8 sm:pt-10">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-40 opacity-60"
      >
        <div className="absolute left-0 top-0 h-32 w-32 -translate-x-6 -translate-y-6 rounded-full bg-[radial-gradient(60%_60%_at_50%_50%,color-mix(in_oklab,var(--color-foreground)_8%,transparent)_0,color-mix(in_oklab,var(--color-foreground)_1.5%,transparent)_72%,transparent_100%)]" />
      </div>

      <div className="grid gap-5 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1fr)] lg:items-end">
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">From Vandor</p>
          <h2 className="max-w-3xl text-balance text-[clamp(2.2rem,5vw,3.85rem)] leading-[0.98] font-medium tracking-[-0.052em]">
            Writing from across the work.
          </h2>
        </div>
        <div className="space-y-4 lg:justify-self-end">
          <p className="max-w-xl text-[1rem] leading-7 text-muted-foreground">
            Announcements, release notes, and essays that stay close to the
            tools, but are written to be read.
          </p>
          <a
            href="/news"
            className="inline-flex items-center gap-2 text-sm text-foreground transition-colors hover:text-muted-foreground"
          >
            <span>See all writing</span>
          </a>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1.08fr)_minmax(18rem,0.72fr)] xl:gap-12">
        <LeadHighlight entry={leadStory} />

        <div className="border-t border-border/70 pt-5 lg:border-t-0 lg:border-l lg:pl-8 xl:pl-10">
          <div className="mb-5">
            <p className="text-sm text-muted-foreground">Latest notes</p>
          </div>

          <div className="divide-y divide-border/70">
            {supportingStories.map((entry) => (
              <SupportingHighlight key={entry.slug} entry={entry} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function LeadHighlight({ entry }: { entry: NewsEntryListItem }) {
  return (
    <a href={`/news/${entry.slug}`} className="group block space-y-5">
      <div className="overflow-hidden rounded-[1.7rem] border border-border/75 bg-card/20">
        <img
          src={entry.coverImage}
          alt={entry.title}
          className={`aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-[1.025] ${getHomeHighlightImageClass(entry.slug)}`}
        />
      </div>

      <div className="space-y-4">
        <StoryMeta entry={entry} />

        <div className="space-y-3">
          <h3 className="max-w-[16ch] text-balance text-[clamp(2rem,4vw,3.2rem)] leading-[0.98] font-medium tracking-[-0.05em]">
            {entry.title}
          </h3>
          <p className="max-w-xl text-[0.98rem] leading-7 text-muted-foreground">
            {entry.summary}
          </p>
        </div>

        <div className="text-sm text-foreground transition-colors group-hover:text-muted-foreground">
          Read story
        </div>
      </div>
    </a>
  )
}

function SupportingHighlight({ entry }: { entry: NewsEntryListItem }) {
  return (
    <a
      href={`/news/${entry.slug}`}
      className="group grid gap-4 py-5 first:pt-0 sm:grid-cols-[7.25rem_minmax(0,1fr)] sm:items-start"
    >
      <div className="self-start overflow-hidden rounded-[1rem] border border-border/70 bg-card/30">
        <img
          src={entry.coverImage}
          alt={entry.title}
          className={`aspect-[5/4] w-full object-cover transition-transform duration-500 group-hover:scale-[1.04] ${getHomeHighlightImageClass(entry.slug)}`}
        />
      </div>

      <div className="space-y-3">
        <StoryMeta entry={entry} showKind={false} />

        <div className="space-y-2">
          <h3 className="max-w-[18ch] text-balance text-[1.25rem] leading-[1.12] font-medium tracking-[-0.034em]">
            {entry.title}
          </h3>
          <p className="max-w-[34ch] text-[0.92rem] leading-6 text-muted-foreground">
            {entry.summary}
          </p>
        </div>
      </div>
    </a>
  )
}
