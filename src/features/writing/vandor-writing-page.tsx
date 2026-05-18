import { ArrowRight } from 'lucide-react'

import Footer5 from '#/components/footer-5'
import { HeroHeader } from '#/components/header'
import { LandingSection } from '#/components/landing-section'
import { getSiteShellContent } from '#/components/site-shell-content'
import type { WritingEntryListItem, WritingIndexData } from '#/features/writing/writing-types'

const writingLanes = [
  {
    title: 'Field notes',
    description:
      'Observations from building and maintaining technical systems over time.',
    examples:
      'Examples include implementation notes, maintenance lessons, and patterns that only show up after real use.',
  },
  {
    title: 'Practices',
    description:
      'Working methods, engineering habits, and operational patterns worth documenting clearly.',
    examples:
      'Examples include git practices, review habits, release discipline, and the routines behind steady delivery.',
  },
  {
    title: 'Security and commentary',
    description:
      'Security responses, ecosystem changes, and technical events that deserve a clear point of view.',
    examples:
      'Examples include CVE analysis, ecosystem commentary, and notes on changes that affect real operators.',
  },
] as const

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

type VandorWritingPageProps = {
  data: WritingIndexData
}

export function VandorWritingPage({ data }: VandorWritingPageProps) {
  const shellContent = getSiteShellContent({ variant: 'vandor' })
  const leadStory = data.featured ?? data.entries[0]
  const supportingStories = data.featured
    ? data.entries.slice(0, 2)
    : data.entries.slice(1, 3)
  const archiveStories = data.featured
    ? data.entries.slice(2)
    : data.entries.slice(3)

  return (
    <>
      <HeroHeader content={shellContent} />
      <main className="bg-background text-foreground">
        <LandingSection className="pt-28 sm:pt-32 lg:pt-36">
          <div className="relative mx-auto w-full max-w-[88rem] px-4">
            <div className="grid gap-8 border-b border-border/70 pb-9 pt-8 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,0.68fr)] lg:items-end">
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">Writing</p>
                <h1 className="max-w-4xl text-balance text-[clamp(3rem,7vw,5.8rem)] leading-[0.96] font-medium tracking-[-0.06em]">
                  Technical writing with room for argument, practice, and
                  context.
                </h1>
              </div>
              <div className="space-y-4 lg:justify-self-end">
                <p className="max-w-xl text-[1rem] leading-7 text-muted-foreground">
                  Writing is where Vandor publishes essays, working notes, and
                  commentary that go beyond release updates.
                </p>
              </div>
            </div>

            <section className="border-b border-border/70 py-8">
              <div className="grid gap-3 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1fr)] lg:items-end">
                <p className="text-sm text-muted-foreground">What belongs here</p>
                <p className="max-w-2xl text-[0.98rem] leading-7 text-muted-foreground lg:justify-self-end">
                  If a piece explains how Vandor thinks, what it is learning,
                  or how it sees a technical problem, it belongs in Writing.
                </p>
              </div>
            </section>

            {leadStory ? (
              <section className="border-b border-border/70 py-8 sm:py-10">
                <div className="mb-6 grid gap-3 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1fr)] lg:items-end">
                  <p className="text-sm text-muted-foreground">Latest writing</p>
                  <p className="max-w-2xl text-[0.98rem] leading-7 text-muted-foreground lg:justify-self-end">
                    Longer-form analysis, field notes, and technical commentary
                    that deserve more room than a release update.
                  </p>
                </div>

                <div className="grid gap-8 lg:grid-cols-[minmax(0,1.08fr)_minmax(18rem,0.72fr)] xl:gap-12">
                  <LeadWriting entry={leadStory} />

                  {supportingStories.length > 0 ? (
                    <div className="border-t border-border/70 pt-5 lg:border-t-0 lg:border-l lg:pl-8 xl:pl-10">
                      <div className="mb-5">
                        <p className="text-sm text-muted-foreground">Recent entries</p>
                      </div>

                      <div className="divide-y divide-border/70">
                        {supportingStories.map((entry) => (
                          <WritingListItem key={entry.slug} entry={entry} compact />
                        ))}
                      </div>
                    </div>
                  ) : null}
                </div>

                {archiveStories.length > 0 ? (
                  <div className="mt-8 border-t border-border/70 pt-8">
                    <div className="mb-5">
                      <p className="text-sm text-muted-foreground">Archive</p>
                    </div>

                    <div className="divide-y divide-border/70">
                      {archiveStories.map((entry) => (
                        <WritingListItem key={entry.slug} entry={entry} />
                      ))}
                    </div>
                  </div>
                ) : null}
              </section>
            ) : null}

            <section className="divide-y divide-border/70">
              {writingLanes.map((lane, index) => (
                <article
                  key={lane.title}
                  className={`grid gap-5 py-7 lg:grid-cols-[minmax(0,0.82fr)_minmax(16rem,0.52fr)] lg:gap-8 ${
                    index === 0 ? 'pt-8' : ''
                  }`}
                >
                  <div className="space-y-2">
                    <h2 className="max-w-[20ch] text-balance text-[1.7rem] leading-[1.04] font-medium tracking-[-0.042em]">
                      {lane.title}
                    </h2>
                    <p className="max-w-[54ch] text-[1rem] leading-7 text-muted-foreground">
                      {lane.description}
                    </p>
                  </div>

                  <div className="space-y-3 text-sm leading-6 text-muted-foreground lg:justify-self-end">
                    <p>{lane.examples}</p>
                  </div>
                </article>
              ))}
            </section>

            <section className="border-t border-border/70 py-8">
              <div className="grid gap-5 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1fr)] lg:items-end">
                <div className="space-y-3">
                  <p className="text-sm text-muted-foreground">Editorial split</p>
                  <h2 className="max-w-3xl text-balance text-[clamp(2.15rem,4.8vw,4rem)] leading-[0.98] font-medium tracking-[-0.055em]">
                    News covers what shipped. Writing covers what it means.
                  </h2>
                </div>
                <div className="space-y-4 lg:justify-self-end">
                  <p className="max-w-xl text-[1rem] leading-7 text-muted-foreground">
                    That split keeps release notes and announcements clear,
                    while leaving room for analysis, practice, and longer-form
                    technical thinking.
                  </p>
                  <a
                    href="/news"
                    className="inline-flex items-center gap-2 text-sm text-foreground transition-colors hover:text-muted-foreground"
                  >
                    <span>Read Vandor news</span>
                    <ArrowRight className="size-4 opacity-55" />
                  </a>
                </div>
              </div>
            </section>
          </div>
        </LandingSection>

        <LandingSection className="pt-12 sm:pt-16 lg:pt-20">
          <Footer5 content={shellContent} />
        </LandingSection>
      </main>
    </>
  )
}

function LeadWriting({ entry }: { entry: WritingEntryListItem }) {
  return (
    <a href={`/writing/${entry.slug}`} className="group block space-y-5">
      <div className="overflow-hidden rounded-[1.7rem] border border-border/75 bg-card/20">
        <img
          src={entry.coverImage}
          alt={entry.title}
          className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-[1.025]"
        />
      </div>

      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-2 text-[0.78rem] text-muted-foreground">
          <p>{entry.authors.join(', ')}</p>
          <div className="size-1 rounded-full bg-muted-foreground" />
          <p className="tabular-nums">{formatDate(entry.publishedAt)}</p>
          <div className="size-1 rounded-full bg-muted-foreground" />
          <p>{formatKind(entry.kind)}</p>
        </div>

        <div className="space-y-3">
          <h2 className="max-w-[16ch] text-balance text-[clamp(2rem,4vw,3.2rem)] leading-[0.98] font-medium tracking-[-0.05em]">
            {entry.title}
          </h2>
          <p className="max-w-xl text-[0.98rem] leading-7 text-muted-foreground">
            {entry.summary}
          </p>
        </div>

        <div className="text-sm text-foreground transition-colors group-hover:text-muted-foreground">
          Read essay
        </div>
      </div>
    </a>
  )
}

function WritingListItem({
  entry,
  compact = false,
}: {
  entry: WritingEntryListItem
  compact?: boolean
}) {
  if (compact) {
    return (
      <a
        href={`/writing/${entry.slug}`}
        className="group grid gap-4 py-5 first:pt-0 sm:grid-cols-[7.25rem_minmax(0,1fr)]"
      >
        <div className="overflow-hidden rounded-[1rem] border border-border/70 bg-card/30">
          <img
            src={entry.coverImage}
            alt={entry.title}
            className="aspect-[5/4] w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />
        </div>

        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2 text-[0.78rem] text-muted-foreground">
            <p>{entry.authors.join(', ')}</p>
            <div className="size-1 rounded-full bg-muted-foreground" />
            <p className="tabular-nums">{formatDate(entry.publishedAt)}</p>
          </div>

          <div className="space-y-2">
            <h3 className="max-w-[18ch] text-balance text-[1.28rem] leading-[1.12] font-medium tracking-[-0.035em]">
              {entry.title}
            </h3>
            <p className="max-w-[34ch] text-[0.94rem] leading-6 text-muted-foreground">
              {entry.summary}
            </p>
          </div>
        </div>
      </a>
    )
  }

  return (
    <a
      href={`/writing/${entry.slug}`}
      className="group grid gap-5 py-6 sm:grid-cols-[9.5rem_minmax(0,1fr)] lg:grid-cols-[10.5rem_minmax(0,1fr)_auto] lg:items-center lg:gap-8"
    >
      <div className="overflow-hidden rounded-[1.15rem] border border-border/70 bg-card/30">
        <img
          src={entry.coverImage}
          alt={entry.title}
          className="aspect-[6/5] w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
      </div>

      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-2 text-[0.78rem] text-muted-foreground">
          <p>{entry.authors.join(', ')}</p>
          <div className="size-1 rounded-full bg-muted-foreground" />
          <p className="tabular-nums">{formatDate(entry.publishedAt)}</p>
          <div className="size-1 rounded-full bg-muted-foreground" />
          <p>{formatKind(entry.kind)}</p>
        </div>

        <div className="space-y-2">
          <h3 className="max-w-[26ch] text-balance text-[1.5rem] leading-[1.08] font-medium tracking-[-0.04em]">
            {entry.title}
          </h3>
          <p className="max-w-[56ch] text-[0.96rem] leading-6 text-muted-foreground">
            {entry.summary}
          </p>
        </div>
      </div>

      <div className="hidden text-sm text-muted-foreground transition-colors group-hover:text-foreground lg:block">
        Read essay
      </div>
    </a>
  )
}
