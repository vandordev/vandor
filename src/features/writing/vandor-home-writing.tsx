import type {
  WritingEntryListItem,
  WritingIndexData,
} from '#/features/writing/writing-types'

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

type VandorHomeWritingProps = {
  data: WritingIndexData
}

export function VandorHomeWriting({ data }: VandorHomeWritingProps) {
  const leadStory = data.featured ?? data.entries[0]
  const supportingStories = data.featured
    ? data.entries.slice(0, 3)
    : data.entries.slice(1, 4)

  if (!leadStory) {
    return null
  }

  return (
    <div className="relative space-y-9 border-t border-border/70 pt-9 sm:space-y-10 sm:pt-10">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-44 opacity-55"
      >
        <div className="absolute right-0 top-0 h-36 w-36 translate-x-8 -translate-y-5 rounded-full bg-[radial-gradient(60%_60%_at_50%_50%,color-mix(in_oklab,var(--color-foreground)_7%,transparent)_0,color-mix(in_oklab,var(--color-foreground)_1.2%,transparent)_70%,transparent_100%)]" />
      </div>

      <div className="grid gap-5 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1fr)] lg:items-end">
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">Writing from Vandor</p>
          <h2 className="max-w-3xl text-balance text-[clamp(2.15rem,4.8vw,4rem)] leading-[0.98] font-medium tracking-[-0.055em]">
            Longer-form thinking around the work, not just updates from it.
          </h2>
        </div>
        <div className="space-y-4 lg:justify-self-end">
          <p className="max-w-xl text-[1rem] leading-7 text-muted-foreground">
            Essays, field notes, and technical analysis that make the reasoning
            around Vandor easier to follow over time.
          </p>
          <a
            href="/writing"
            className="inline-flex items-center gap-2 text-sm text-foreground transition-colors hover:text-muted-foreground"
          >
            <span>Browse writing</span>
          </a>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[minmax(18rem,0.72fr)_minmax(0,1.06fr)] xl:gap-12">
        <div className="space-y-5 lg:order-2">
          <a href={`/writing/${leadStory.slug}`} className="group block space-y-5">
            <div className="overflow-hidden rounded-[1.7rem] border border-border/75 bg-card/20">
              <img
                src={leadStory.coverImage}
                alt={leadStory.title}
                className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-[1.025]"
              />
            </div>

            <div className="space-y-4">
              <StoryMeta entry={leadStory} />

              <div className="space-y-3">
                <h3 className="max-w-[16ch] text-balance text-[clamp(2rem,4vw,3.15rem)] leading-[0.98] font-medium tracking-[-0.05em]">
                  {leadStory.title}
                </h3>
                <p className="max-w-xl text-[0.98rem] leading-7 text-muted-foreground">
                  {leadStory.summary}
                </p>
              </div>

              <div className="text-sm text-foreground transition-colors group-hover:text-muted-foreground">
                Read essay
              </div>
            </div>
          </a>
        </div>

        <div className="space-y-6 border-b border-border/70 pb-2 lg:order-1 lg:border-b-0 lg:border-r lg:pr-10 xl:pr-12">
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">Recent entries</p>
            <p className="max-w-[36ch] text-[1rem] leading-7 text-muted-foreground">
              Writing gives slower ideas a place to develop, whether the topic
              is security, engineering practice, or how a system should be
              maintained.
            </p>
          </div>

          <div className="divide-y divide-border/70">
            {(supportingStories.length > 0 ? supportingStories : [leadStory]).map(
              (entry) => (
                <HomeWritingListItem key={entry.slug} entry={entry} />
              ),
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function StoryMeta({ entry }: { entry: WritingEntryListItem }) {
  return (
    <div className="flex flex-wrap items-center gap-2 text-[0.78rem] text-muted-foreground">
      <p>{entry.authors.join(', ')}</p>
      <div className="size-1 rounded-full bg-muted-foreground" />
      <p className="tabular-nums">{formatDate(entry.publishedAt)}</p>
      <div className="size-1 rounded-full bg-muted-foreground" />
      <p>{formatKind(entry.kind)}</p>
    </div>
  )
}

function HomeWritingListItem({ entry }: { entry: WritingEntryListItem }) {
  return (
    <a
      href={`/writing/${entry.slug}`}
      className="group block space-y-3 py-5 first:pt-0"
    >
      <StoryMeta entry={entry} />

      <div className="space-y-2">
        <h3 className="max-w-[22ch] text-balance text-[1.45rem] leading-[1.08] font-medium tracking-[-0.038em] transition-colors group-hover:text-muted-foreground">
          {entry.title}
        </h3>
        <p className="max-w-[42ch] text-[0.96rem] leading-6 text-muted-foreground">
          {entry.summary}
        </p>
      </div>
    </a>
  )
}
