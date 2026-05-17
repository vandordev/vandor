import Footer5 from '#/components/footer-5'
import { HeroHeader } from '#/components/header'
import { LandingSection } from '#/components/landing-section'
import { getSiteShellContent } from '#/components/site-shell-content'
import { cn } from '#/lib/utils'

import type { NewsIndexData } from '#/features/news/news-types'

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

function StoryMeta({
  authors,
  publishedAt,
  kind,
}: Pick<NewsIndexData['entries'][number], 'authors' | 'publishedAt' | 'kind'>) {
  return (
    <div className="flex flex-wrap items-center gap-2 text-[0.78rem] text-muted-foreground">
      <p>{authors.join(', ')}</p>
      <div className="size-1 rounded-full bg-muted-foreground" />
      <p className="tabular-nums">{formatDate(publishedAt)}</p>
      <div className="size-1 rounded-full bg-muted-foreground" />
      <p>{formatKind(kind)}</p>
    </div>
  )
}

type VandorNewsSectionProps = {
  data: NewsIndexData
}

export function VandorNewsSection({ data }: VandorNewsSectionProps) {
  const shellContent = getSiteShellContent({ variant: 'vandor' })
  const leadStory = data.featured ?? data.entries[0]
  const secondaryStories = data.featured ? data.entries : data.entries.slice(1)
  const supportingStories = secondaryStories.slice(0, 2)
  const archiveStories = secondaryStories.slice(supportingStories.length)
  const allWriting = archiveStories.length
    ? archiveStories
    : leadStory
      ? [leadStory, ...supportingStories]
      : supportingStories

  return (
    <>
      <HeroHeader content={shellContent} />
      <main className="bg-background text-foreground">
        <LandingSection className="pt-28 sm:pt-32 lg:pt-36">
          <div className="relative mx-auto w-full max-w-[88rem]">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 isolate -z-10 opacity-70"
            >
              <div className="absolute left-0 top-0 h-80 w-36 -translate-y-24 -rotate-[28deg] rounded-full bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,color-mix(in_oklab,var(--color-foreground)_12%,transparent)_0,color-mix(in_oklab,var(--color-foreground)_2%,transparent)_52%,transparent_82%)]" />
              <div className="absolute right-0 top-10 h-72 w-28 translate-x-8 -rotate-[22deg] rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,color-mix(in_oklab,var(--color-foreground)_10%,transparent)_0,color-mix(in_oklab,var(--color-foreground)_1.5%,transparent)_78%,transparent_100%)]" />
            </div>

            <div className="grid gap-10 border-b border-border/70 px-4 pb-8 pt-8 lg:grid-cols-[minmax(0,1fr)_minmax(16rem,0.52fr)] lg:items-end">
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">Vandor News</p>
                <h1 className="max-w-4xl text-balance text-[clamp(3.15rem,7.4vw,6.2rem)] leading-[0.96] font-medium tracking-[-0.06em]">
                  A publication for what Vandor is building, learning, and releasing.
                </h1>
              </div>
              <p className="max-w-xl text-[1rem] leading-7 text-muted-foreground lg:justify-self-end">
                Writing across the Vandor ecosystem, from product notes and
                release lines to the longer arguments behind how we work.
              </p>
            </div>

            {leadStory ? (
              <section className="grid gap-8 px-4 py-10 lg:grid-cols-[minmax(0,1.14fr)_minmax(18rem,0.72fr)] xl:gap-14">
                <article className="space-y-5">
                  <a
                    href={`/news/${leadStory.slug}`}
                    className="group block overflow-hidden rounded-[1.75rem] border border-border/75 bg-card/20"
                  >
                    <img
                      src={leadStory.coverImage}
                      alt={leadStory.title}
                      className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-[1.025] sm:aspect-[16/10]"
                    />
                  </a>

                  <div className="space-y-4">
                    <StoryMeta
                      authors={leadStory.authors}
                      publishedAt={leadStory.publishedAt}
                      kind={leadStory.kind}
                    />
                    <div className="space-y-3">
                      <h2 className="max-w-3xl text-balance text-[clamp(2.25rem,5vw,4rem)] leading-[0.98] font-medium tracking-[-0.055em]">
                        {leadStory.title}
                      </h2>
                      <p className="max-w-2xl text-[1rem] leading-7 text-muted-foreground sm:text-[1.08rem]">
                        {leadStory.summary}
                      </p>
                    </div>
                  </div>
                </article>

                {supportingStories.length > 0 ? (
                  <aside className="flex flex-col justify-end border-t border-border/70 pt-5 lg:border-t-0 lg:border-l lg:pl-8 xl:pl-10">
                    <div className="mb-5">
                      <p className="text-sm text-muted-foreground">Recent writing</p>
                    </div>

                    <div className="divide-y divide-border/70">
                      {supportingStories.map((entry) => (
                        <a
                          key={entry.slug}
                          href={`/news/${entry.slug}`}
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
                            <StoryMeta
                              authors={entry.authors}
                              publishedAt={entry.publishedAt}
                              kind={entry.kind}
                            />
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
                      ))}
                    </div>
                  </aside>
                ) : null}
              </section>
            ) : null}

            {allWriting.length > 0 ? (
              <section className="border-t border-border/70 px-4 py-8">
                <div className="mb-6 grid gap-3 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1fr)] lg:items-end">
                  <p className="text-sm text-muted-foreground">All writing</p>
                  <p className="max-w-2xl text-[0.98rem] leading-7 text-muted-foreground lg:justify-self-end">
                    Every post stays in one archive, readable at a glance and
                    still led by the image system rather than a generic blog list.
                  </p>
                </div>

                <div className="divide-y divide-border/70">
                  {allWriting.map((entry, index) => (
                    <a
                      key={entry.slug}
                      href={`/news/${entry.slug}`}
                      className={cn(
                        'group grid gap-5 py-6 sm:grid-cols-[9.5rem_minmax(0,1fr)] lg:grid-cols-[10.5rem_minmax(0,1fr)_auto] lg:items-center lg:gap-8',
                        index === 0 && 'pt-0',
                      )}
                    >
                      <div className="overflow-hidden rounded-[1.15rem] border border-border/70 bg-card/30">
                        <img
                          src={entry.coverImage}
                          alt={entry.title}
                          className="aspect-[6/5] w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                        />
                      </div>

                      <div className="space-y-3">
                        <StoryMeta
                          authors={entry.authors}
                          publishedAt={entry.publishedAt}
                          kind={entry.kind}
                        />
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
                        Read story
                      </div>
                    </a>
                  ))}
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
