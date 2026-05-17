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
    <div className="space-y-8">
      <div className="grid gap-4 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1fr)] lg:items-end">
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">From Vandor</p>
          <h2 className="max-w-3xl text-balance text-[clamp(2.4rem,5vw,4.2rem)] leading-[0.98] font-medium tracking-[-0.05em]">
            Stories, release notes, and product thinking.
          </h2>
        </div>
        <div className="space-y-4 lg:justify-self-end">
          <p className="max-w-xl text-[1rem] leading-7 text-muted-foreground">
            A quieter layer of Vandor, where announcements and ideas sit beside the
            tools we build.
          </p>
          <a
            href="/news"
            className="inline-flex items-center gap-2 text-sm text-foreground transition-colors hover:text-muted-foreground"
          >
            <span>See all writing</span>
          </a>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.9fr)]">
        <LeadHighlight entry={leadStory} />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
          {supportingStories.map((entry) => (
            <SupportingHighlight key={entry.slug} entry={entry} />
          ))}
        </div>
      </div>
    </div>
  )
}

function LeadHighlight({ entry }: { entry: NewsEntryListItem }) {
  return (
    <a
      href={`/news/${entry.slug}`}
      className="group grid overflow-hidden rounded-[1.8rem] border border-border/70 bg-card/35 lg:grid-cols-[minmax(0,0.92fr)_minmax(300px,1.08fr)]"
    >
      <div className="flex flex-col justify-between gap-8 p-7 sm:p-8">
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-2 text-[0.78rem] text-muted-foreground">
            <p>{entry.authors.join(', ')}</p>
            <div className="size-1 rounded-full bg-muted-foreground" />
            <p className="tabular-nums">{formatDate(entry.publishedAt)}</p>
            <div className="size-1 rounded-full bg-muted-foreground" />
            <p>{formatKind(entry.kind)}</p>
          </div>

          <div className="space-y-3">
            <h3 className="max-w-[14ch] text-balance text-[clamp(2rem,4vw,3.35rem)] leading-[0.98] font-medium tracking-[-0.05em]">
              {entry.title}
            </h3>
            <p className="max-w-lg text-[0.98rem] leading-7 text-muted-foreground">
              {entry.summary}
            </p>
          </div>
        </div>

        <div className="text-sm text-foreground transition-colors group-hover:text-muted-foreground">
          Read story
        </div>
      </div>

      <div className="overflow-hidden border-t border-border/70 lg:border-t-0 lg:border-l">
        <img
          src={entry.coverImage}
          alt={entry.title}
          className="aspect-[16/10] h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>
    </a>
  )
}

function SupportingHighlight({ entry }: { entry: NewsEntryListItem }) {
  return (
    <a
      href={`/news/${entry.slug}`}
      className="group grid gap-4 rounded-[1.4rem] border border-border/70 bg-card/22 p-4 transition-colors duration-150 hover:bg-accent/35 sm:grid-cols-[160px_minmax(0,1fr)] sm:items-center sm:p-5"
    >
      <div className="overflow-hidden rounded-[1rem] border border-border/60">
        <img
          src={entry.coverImage}
          alt={entry.title}
          className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>

      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-2 text-[0.76rem] text-muted-foreground">
          <p>{entry.authors.join(', ')}</p>
          <div className="size-1 rounded-full bg-muted-foreground" />
          <p className="tabular-nums">{formatDate(entry.publishedAt)}</p>
        </div>

        <div className="space-y-2">
          <h3 className="text-balance text-[1.2rem] leading-6 font-medium tracking-[-0.03em]">
            {entry.title}
          </h3>
          <p className="line-clamp-3 text-[0.92rem] leading-6 text-muted-foreground">
            {entry.summary}
          </p>
        </div>
      </div>
    </a>
  )
}
