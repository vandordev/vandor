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

type VandorNewsSectionProps = {
  data: NewsIndexData
}

export function VandorNewsSection({ data }: VandorNewsSectionProps) {
  const shellContent = getSiteShellContent({ variant: 'vandor' })
  const leadStory = data.featured ?? data.entries[0]
  const secondaryStories = data.featured ? data.entries : data.entries.slice(1)

  return (
    <>
      <HeroHeader content={shellContent} />
      <main className="bg-background text-foreground">
        <LandingSection className="pt-28 sm:pt-32 lg:pt-36">
          <div className="relative mx-auto w-full max-w-6xl">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 isolate -z-10 opacity-70"
            >
              <div className="absolute left-0 top-0 h-80 w-36 -translate-y-32 -rotate-45 rounded-full bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,color-mix(in_oklab,var(--color-foreground)_10%,transparent)_0,color-mix(in_oklab,var(--color-foreground)_2%,transparent)_50%,transparent_80%)]" />
              <div className="absolute left-10 top-0 h-80 w-16 -translate-y-40 -rotate-45 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,color-mix(in_oklab,var(--color-foreground)_8%,transparent)_0,color-mix(in_oklab,var(--color-foreground)_2%,transparent)_80%,transparent_100%)]" />
              <div className="absolute left-0 top-0 h-80 w-16 -translate-y-32 -rotate-45 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,color-mix(in_oklab,var(--color-foreground)_8%,transparent)_0,color-mix(in_oklab,var(--color-foreground)_2%,transparent)_80%,transparent_100%)]" />
            </div>

            <div className="grid gap-10 px-4 py-8 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1fr)] lg:items-end">
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground">Vandor News</p>
                <h1 className="max-w-3xl text-balance text-[clamp(2.9rem,7vw,5.15rem)] leading-[0.98] font-medium tracking-[-0.055em]">
                  Writing from the Vandor ecosystem.
                </h1>
              </div>
              <p className="max-w-2xl text-[1.02rem] leading-7 text-muted-foreground lg:justify-self-end">
                Announcements, essays, release notes, and product thinking from
                the systems we build and the tools we maintain.
              </p>
            </div>

            {leadStory ? (
              <section className="grid gap-8 border-y border-border/80 px-4 py-6 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:items-center lg:gap-12">
                <div className="space-y-5">
                  <div className="flex flex-wrap items-center gap-2 text-[0.78rem] text-muted-foreground">
                    <p>{leadStory.authors.join(', ')}</p>
                    <div className="size-1 rounded-full bg-muted-foreground" />
                    <p className="tabular-nums">{formatDate(leadStory.publishedAt)}</p>
                    <div className="size-1 rounded-full bg-muted-foreground" />
                    <p>{formatKind(leadStory.kind)}</p>
                  </div>

                  <div className="space-y-4">
                    <h2 className="max-w-2xl text-balance text-[clamp(2.1rem,4.8vw,3.6rem)] leading-[1] font-medium tracking-[-0.05em]">
                      {leadStory.title}
                    </h2>
                    <p className="max-w-xl text-[1rem] leading-7 text-muted-foreground sm:text-[1.08rem]">
                      {leadStory.summary}
                    </p>
                  </div>

                  <a
                    href={`/news/${leadStory.slug}`}
                    className="inline-flex items-center gap-2 text-sm text-foreground transition-colors hover:text-muted-foreground"
                  >
                    <span>Read story</span>
                  </a>
                </div>

                <a
                  href={`/news/${leadStory.slug}`}
                  className="group block overflow-hidden rounded-[1.4rem] border border-border/70"
                >
                  <img
                    src={leadStory.coverImage}
                    alt={leadStory.title}
                    className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </a>
              </section>
            ) : null}

            {secondaryStories.length > 0 ? (
              <section className="px-4 py-8">
                <div className="mb-6 flex items-end justify-between gap-4">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Recent stories</p>
                  </div>
                </div>

                <div className="grid gap-x-6 gap-y-10 md:grid-cols-2 xl:grid-cols-3">
                  {secondaryStories.map((entry, index) => (
                    <a
                      key={entry.slug}
                      href={`/news/${entry.slug}`}
                      className={cn(
                        'group block space-y-4',
                        index === 0 && secondaryStories.length > 2 && 'xl:col-span-2',
                      )}
                    >
                      <div className="overflow-hidden rounded-[1.25rem] border border-border/70 bg-card/50">
                        <img
                          src={entry.coverImage}
                          alt={entry.title}
                          className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
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

                        <h3 className="max-w-[24ch] text-balance text-[1.24rem] leading-[1.18] font-medium tracking-[-0.032em] sm:text-[1.38rem]">
                          {entry.title}
                        </h3>

                        <p className="max-w-[44ch] text-[0.95rem] leading-6 text-muted-foreground">
                          {entry.summary}
                        </p>
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
