import { ArrowRight } from 'lucide-react'

import Footer5 from '#/components/footer-5'
import { HeroHeader } from '#/components/header'
import { LandingSection } from '#/components/landing-section'
import { getSiteShellContent } from '#/components/site-shell-content'
import type {
  WritingEntryKind,
  WritingEntryListItem,
  WritingIndexData,
} from '#/features/writing/writing-types'

const laneOrder: WritingEntryKind[] = [
  'practice',
  'security',
  'essay',
  'field-note',
]

const laneMeta: Record<
  WritingEntryKind,
  {
    eyebrow: string
    title: string
    description: string
  }
> = {
  practice: {
    eyebrow: 'Working methods',
    title: 'Practices and operational routines',
    description:
      'Release discipline, workflow design, and habits that keep technical work understandable over time.',
  },
  security: {
    eyebrow: 'Security desk',
    title: 'Boundary failures, risk, and response',
    description:
      'Technical incidents and vulnerabilities read as operator decisions, not just advisories.',
  },
  essay: {
    eyebrow: 'Arguments',
    title: 'Longer essays and institutional points of view',
    description:
      'Pieces that explain how Vandor thinks about systems, maintainership, and the shape of technical work.',
  },
  'field-note': {
    eyebrow: 'Field notes',
    title: 'Lessons observed in real systems',
    description:
      'Patterns, implementation notes, and details that only become visible after sustained use.',
  },
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat('en', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date(value))
}

function getPublishedTimestamp(value: string) {
  return Date.parse(value)
}

function formatCount(value: number, noun: string) {
  return `${value} ${noun}${value === 1 ? '' : 's'}`
}

function toTagTexture(tags: string[]) {
  return tags.slice(0, 3).join(' / ')
}

function groupEntriesByLane(entries: WritingEntryListItem[]) {
  const groups = new Map<WritingEntryKind, WritingEntryListItem[]>()

  for (const entry of entries) {
    const current = groups.get(entry.kind)

    if (current) {
      current.push(entry)
      continue
    }

    groups.set(entry.kind, [entry])
  }

  return laneOrder
    .map((kind) => {
      const items = groups.get(kind)

      if (!items || items.length === 0) {
        return null
      }

      return {
        kind,
        entries: items,
        meta: laneMeta[kind],
      }
    })
    .filter((group): group is NonNullable<typeof group> => group !== null)
}

type VandorWritingPageProps = {
  data: WritingIndexData
}

export function VandorWritingPage({ data }: VandorWritingPageProps) {
  const shellContent = getSiteShellContent({ variant: 'vandor' })
  const leadStory = data.featured ?? data.entries[0]
  const remainingStories = data.featured ? data.entries : data.entries.slice(1)
  const chronologicalStories = (leadStory
    ? [leadStory, ...remainingStories]
    : [...remainingStories]
  ).sort(
    (left, right) =>
      getPublishedTimestamp(right.publishedAt) -
      getPublishedTimestamp(left.publishedAt),
  )
  const totalStories = chronologicalStories.length
  const laneGroups = groupEntriesByLane(remainingStories)
  const primaryLane = laneGroups[0]
  const secondaryLanes = laneGroups.slice(1)
  const latestPublishedAt = chronologicalStories[0]?.publishedAt

  return (
    <>
      <HeroHeader content={shellContent} />
      <main className="bg-background text-foreground">
        <LandingSection className="pt-28 sm:pt-32 lg:pt-36">
          <div className="relative mx-auto w-full max-w-[92rem] px-4">
            <header className="border-b border-border/75 pb-10 sm:pb-12">
              <div className="grid gap-9 xl:grid-cols-[minmax(0,1.08fr)_minmax(18rem,22rem)] xl:items-end">
                <div className="space-y-5">
                  <p className="text-sm text-muted-foreground">Writing</p>
                  <h1 className="max-w-5xl text-balance text-[clamp(3.2rem,7.8vw,6.4rem)] leading-[0.94] font-medium tracking-[-0.065em]">
                    An editorial desk for technical arguments, working notes,
                    and field judgment.
                  </h1>
                  <p className="max-w-[68ch] text-[1.02rem] leading-7 text-muted-foreground">
                    Vandor Writing is where the organization slows down enough
                    to explain what it thinks a technical event means, which
                    practices hold up under pressure, and what is worth learning
                    from real systems.
                  </p>
                </div>

                <div className="rounded-[1.65rem] border border-border/75 bg-card/20 p-5 sm:p-6">
                  <div className="space-y-5">
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">
                        Editorial desk
                      </p>
                      <p className="max-w-[28ch] text-[0.96rem] leading-6 text-foreground">
                        Curated in lanes, not exposed as a feed of filters and
                        controls.
                      </p>
                    </div>

                    <div className="divide-y divide-border/70">
                      <DeskNoteRow
                        label="Current archive"
                        value={formatCount(totalStories, 'published piece')}
                      />
                      <DeskNoteRow
                        label="Reading lanes"
                        value={formatCount(laneGroups.length, 'active lane')}
                      />
                      <DeskNoteRow
                        label="Latest entry"
                        value={latestPublishedAt ? formatDate(latestPublishedAt) : 'In preparation'}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </header>

            {leadStory ? (
              <section className="border-b border-border/75 py-10 sm:py-12">
                <div className="grid gap-10 xl:grid-cols-[minmax(0,1.06fr)_minmax(18rem,0.72fr)] xl:gap-12">
                  <LeadWriting entry={leadStory} />

                  <div className="space-y-8">
                    <section className="space-y-4">
                      <div className="space-y-2">
                        <p className="text-sm text-muted-foreground">
                          Across the desk
                        </p>
                        <p className="max-w-[32ch] text-[0.96rem] leading-6 text-muted-foreground">
                          The archive is grouped by the kind of thinking it
                          carries, so breadth reads as editorial intent rather
                          than content inventory.
                        </p>
                      </div>

                      <div className="divide-y divide-border/70 border-y border-border/70">
                        {laneGroups.map((group) => (
                          <LanePreview
                            key={group.kind}
                            kind={group.kind}
                            title={group.meta.eyebrow}
                            description={group.meta.description}
                            count={group.entries.length}
                          />
                        ))}
                      </div>
                    </section>

                    {remainingStories.length > 0 ? (
                      <section className="space-y-4">
                        <div className="space-y-2">
                          <p className="text-sm text-muted-foreground">
                            Recently added
                          </p>
                        </div>

                        <div className="divide-y divide-border/70">
                          {remainingStories.slice(0, 3).map((entry) => (
                            <RecentWritingRow key={entry.slug} entry={entry} />
                          ))}
                        </div>
                      </section>
                    ) : null}
                  </div>
                </div>
              </section>
            ) : null}

            {laneGroups.length > 0 ? (
              <section className="border-b border-border/75 py-10 sm:py-12">
                <div className="mb-8 grid gap-5 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1fr)] lg:items-end">
                  <div className="space-y-3">
                    <p className="text-sm text-muted-foreground">
                      Reading lanes
                    </p>
                    <h2 className="max-w-3xl text-balance text-[clamp(2.2rem,5vw,4.25rem)] leading-[0.97] font-medium tracking-[-0.058em]">
                      The archive is arranged by how Vandor thinks, not only by
                      when something was published.
                    </h2>
                  </div>
                  <p className="max-w-2xl text-[0.98rem] leading-7 text-muted-foreground lg:justify-self-end">
                    Security notes, working practices, essays, and field
                    observations should feel like related strands of thought,
                    not one endless stream of interchangeable posts.
                  </p>
                </div>

                <div className="grid gap-6 xl:grid-cols-[minmax(0,1.06fr)_minmax(18rem,0.78fr)]">
                  {primaryLane ? (
                    <LaneFeature group={primaryLane} />
                  ) : (
                    <div />
                  )}

                  {secondaryLanes.length > 0 ? (
                    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-1">
                      {secondaryLanes.map((group) => (
                        <LaneStack key={group.kind} group={group} />
                      ))}
                    </div>
                  ) : null}
                </div>
              </section>
            ) : null}

            {chronologicalStories.length > 0 ? (
              <section className="py-10 sm:py-12">
                <div className="grid gap-8 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1fr)] lg:gap-10">
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">Desk archive</p>
                    <h2 className="max-w-[14ch] text-balance text-[clamp(2rem,4.8vw,3.35rem)] leading-[0.98] font-medium tracking-[-0.05em]">
                      A quieter chronological trail remains below.
                    </h2>
                    <p className="max-w-[34ch] text-[0.98rem] leading-7 text-muted-foreground">
                      Writing keeps the arguments. News keeps the release trail.
                      The archive below stays text-led so it can work as a
                      compact reading index as the publication grows.
                    </p>
                    <a
                      href="/news"
                      className="inline-flex items-center gap-2 text-sm text-foreground transition-colors hover:text-muted-foreground"
                    >
                      <span>Read Vandor news</span>
                      <ArrowRight className="size-4 opacity-55" />
                    </a>
                  </div>

                  <div className="divide-y divide-border/70 border-t border-border/70">
                    {chronologicalStories.map((entry) => (
                      <ArchiveWritingRow key={entry.slug} entry={entry} />
                    ))}
                  </div>
                </div>
              </section>
            ) : null}
          </div>
        </LandingSection>

        <LandingSection className="pt-12 sm:pt-16 lg:pt-20">
          <Footer5 content={shellContent} />
        </LandingSection>
      </main>
    </>
  )
}

function DeskNoteRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4 py-3 first:pt-0 last:pb-0">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="max-w-[14ch] text-right text-sm text-foreground">{value}</p>
    </div>
  )
}

function LanePreview({
  kind,
  title,
  description,
  count,
}: {
  kind: WritingEntryKind
  title: string
  description: string
  count: number
}) {
  return (
    <article className="grid gap-2 py-4 first:pt-0 last:pb-0">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-foreground">{title}</p>
        <p className="text-[0.8rem] text-muted-foreground">
          {formatCount(count, kind === 'essay' ? 'essay' : 'entry')}
        </p>
      </div>
      <p className="max-w-[32ch] text-[0.92rem] leading-6 text-muted-foreground">
        {description}
      </p>
    </article>
  )
}

function LeadWriting({ entry }: { entry: WritingEntryListItem }) {
  return (
    <a href={`/writing/${entry.slug}`} className="group block space-y-6">
      <div className="overflow-hidden rounded-[2rem] border border-border/75 bg-card/20">
        <img
          src={entry.coverImage}
          alt={entry.title}
          className="aspect-[16/10] w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(14rem,18rem)] lg:items-start">
        <div className="min-w-0 space-y-4">
          <div className="flex flex-wrap items-center gap-2 text-[0.8rem] text-muted-foreground">
            <p>{entry.authors.join(', ')}</p>
            <div className="size-1 rounded-full bg-muted-foreground" />
            <p className="tabular-nums">{formatDate(entry.publishedAt)}</p>
            <div className="size-1 rounded-full bg-muted-foreground" />
            <p>{laneMeta[entry.kind].eyebrow}</p>
          </div>

          <div className="space-y-3">
            <h2 className="max-w-[15ch] text-balance text-[clamp(2.4rem,4.4vw,4.1rem)] leading-[0.95] font-medium tracking-[-0.06em]">
              {entry.title}
            </h2>
            <p className="max-w-[60ch] text-[1rem] leading-7 text-muted-foreground">
              {entry.summary}
            </p>
          </div>
        </div>

        <div className="space-y-4 border-t border-border/70 pt-4 lg:border-t-0 lg:border-l lg:pl-6">
          <p className="text-sm text-muted-foreground">Lead document</p>
          <p className="text-[0.95rem] leading-6 text-muted-foreground">
            {toTagTexture(entry.tags)}
          </p>
          <div className="text-sm text-foreground transition-colors group-hover:text-muted-foreground">
            Read essay
          </div>
        </div>
      </div>
    </a>
  )
}

function RecentWritingRow({ entry }: { entry: WritingEntryListItem }) {
  return (
    <a
      href={`/writing/${entry.slug}`}
      className="group grid gap-3 py-4 first:pt-0 md:grid-cols-[auto_minmax(0,1fr)] md:items-baseline md:gap-5"
    >
      <p className="text-sm tabular-nums text-muted-foreground">
        {formatDate(entry.publishedAt)}
      </p>
      <div className="min-w-0 space-y-1.5">
        <p className="text-[1rem] leading-6 text-foreground transition-colors group-hover:text-muted-foreground">
          {entry.title}
        </p>
        <p className="text-sm leading-6 text-muted-foreground">
          {laneMeta[entry.kind].eyebrow}
        </p>
      </div>
    </a>
  )
}

function LaneFeature({
  group,
}: {
  group: {
    kind: WritingEntryKind
    entries: WritingEntryListItem[]
    meta: (typeof laneMeta)[WritingEntryKind]
  }
}) {
  const [leadEntry, ...supportingEntries] = group.entries

  return (
    <section className="rounded-[1.9rem] border border-border/75 bg-card/20 p-5 sm:p-6">
      <div className="grid gap-7 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1fr)] lg:gap-8">
        <div className="space-y-5">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">{group.meta.eyebrow}</p>
            <h3 className="max-w-[16ch] text-balance text-[clamp(1.9rem,3.5vw,3rem)] leading-[0.98] font-medium tracking-[-0.048em]">
              {group.meta.title}
            </h3>
            <p className="max-w-[34ch] text-[0.96rem] leading-7 text-muted-foreground">
              {group.meta.description}
            </p>
          </div>

          {leadEntry ? (
            <a href={`/writing/${leadEntry.slug}`} className="group/feature block space-y-4">
              <div className="overflow-hidden rounded-[1.4rem] border border-border/70 bg-background/60">
                <img
                  src={leadEntry.coverImage}
                  alt={leadEntry.title}
                  className="aspect-[6/5] w-full object-cover transition-transform duration-700 group-hover/feature:scale-[1.03]"
                />
              </div>

              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-2 text-[0.8rem] text-muted-foreground">
                  <p>{leadEntry.authors.join(', ')}</p>
                  <div className="size-1 rounded-full bg-muted-foreground" />
                  <p className="tabular-nums">{formatDate(leadEntry.publishedAt)}</p>
                </div>
                <h4 className="max-w-[18ch] text-balance text-[1.55rem] leading-[1.05] font-medium tracking-[-0.04em] transition-colors group-hover/feature:text-muted-foreground">
                  {leadEntry.title}
                </h4>
                <p className="max-w-[46ch] text-[0.95rem] leading-6 text-muted-foreground">
                  {leadEntry.summary}
                </p>
              </div>
            </a>
          ) : null}
        </div>

        <div className="divide-y divide-border/70 border-t border-border/70 lg:border-t-0 lg:border-l lg:pl-6">
          {supportingEntries.map((entry) => (
            <LaneStoryRow key={entry.slug} entry={entry} />
          ))}
          {supportingEntries.length === 0 && leadEntry ? (
            <div className="py-4 text-sm leading-6 text-muted-foreground lg:pt-1">
              This lane is currently anchored by a single entry. More pieces in
              this strand will appear here as the archive grows.
            </div>
          ) : null}
        </div>
      </div>
    </section>
  )
}

function LaneStack({
  group,
}: {
  group: {
    kind: WritingEntryKind
    entries: WritingEntryListItem[]
    meta: (typeof laneMeta)[WritingEntryKind]
  }
}) {
  return (
    <section className="rounded-[1.6rem] border border-border/75 p-5 sm:p-6">
      <div className="space-y-5">
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">{group.meta.eyebrow}</p>
          <h3 className="max-w-[18ch] text-balance text-[1.55rem] leading-[1.06] font-medium tracking-[-0.04em]">
            {group.meta.title}
          </h3>
          <p className="max-w-[34ch] text-[0.94rem] leading-6 text-muted-foreground">
            {group.meta.description}
          </p>
        </div>

        <div className="divide-y divide-border/70 border-t border-border/70">
          {group.entries.map((entry) => (
            <LaneStoryRow key={entry.slug} entry={entry} />
          ))}
        </div>
      </div>
    </section>
  )
}

function LaneStoryRow({ entry }: { entry: WritingEntryListItem }) {
  return (
    <a
      href={`/writing/${entry.slug}`}
      className="group grid gap-3 py-4 first:pt-4 sm:grid-cols-[7rem_minmax(0,1fr)] sm:gap-4"
    >
      <div className="overflow-hidden rounded-[1rem] border border-border/70 bg-card/30">
        <img
          src={entry.coverImage}
          alt={entry.title}
          className="aspect-[5/4] w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
      </div>

      <div className="min-w-0 space-y-2">
        <div className="flex flex-wrap items-center gap-2 text-[0.78rem] text-muted-foreground">
          <p className="tabular-nums">{formatDate(entry.publishedAt)}</p>
          <div className="size-1 rounded-full bg-muted-foreground" />
          <p>{entry.authors.join(', ')}</p>
        </div>
        <h4 className="max-w-[24ch] text-balance text-[1.08rem] leading-[1.14] font-medium tracking-[-0.03em] transition-colors group-hover:text-muted-foreground">
          {entry.title}
        </h4>
        <p className="text-[0.9rem] leading-6 text-muted-foreground">
          {entry.summary}
        </p>
      </div>
    </a>
  )
}

function ArchiveWritingRow({ entry }: { entry: WritingEntryListItem }) {
  return (
    <a
      href={`/writing/${entry.slug}`}
      className="group grid gap-3 py-4 first:pt-0 sm:grid-cols-[7rem_minmax(0,1fr)_auto] sm:items-baseline sm:gap-5"
    >
      <p className="text-sm tabular-nums text-muted-foreground">
        {formatDate(entry.publishedAt)}
      </p>

      <div className="min-w-0 space-y-1.5">
        <h3 className="text-[1.02rem] leading-6 text-foreground transition-colors group-hover:text-muted-foreground">
          {entry.title}
        </h3>
        <p className="text-sm leading-6 text-muted-foreground">
          {entry.summary}
        </p>
      </div>

      <p className="text-sm text-muted-foreground">
        {laneMeta[entry.kind].eyebrow}
      </p>
    </a>
  )
}
