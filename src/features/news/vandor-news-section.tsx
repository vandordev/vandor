import Footer5 from '#/components/footer-5'
import { HeroHeader } from '#/components/header'
import { LandingSection } from '#/components/landing-section'
import { getSiteShellContent } from '#/components/site-shell-content'

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
  const entries = data.featured ? [data.featured, ...data.entries] : data.entries

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

            <div className="flex flex-col gap-2 px-4 py-8">
              <h1 className="font-mono text-4xl font-bold tracking-wide sm:text-5xl">
                Vandor News
              </h1>
              <p className="max-w-2xl text-base text-muted-foreground">
                Announcements, essays, release notes, and product writing from
                the Vandor ecosystem.
              </p>
            </div>

            <div className="border-b border-dashed border-border" />

            <div className="grid gap-2 p-4 md:grid-cols-2 lg:grid-cols-3">
              {entries.map((entry) => (
                <a
                  key={entry.slug}
                  href={`/news/${entry.slug}`}
                  className="group flex flex-col gap-3 rounded-xl p-2 transition-colors duration-150 hover:bg-accent/60 active:bg-accent"
                >
                  <div className="overflow-hidden rounded-xl border border-border/70 bg-card">
                    <img
                      src={entry.coverImage}
                      alt={entry.title}
                      className="aspect-[16/9] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  <div className="flex flex-col gap-2 px-2 pb-2">
                    <div className="flex flex-wrap items-center gap-2 text-[11px] text-muted-foreground sm:text-xs">
                      <p>by {entry.authors.join(', ')}</p>
                      <div className="size-1 rounded-full bg-muted-foreground" />
                      <p>{formatDate(entry.publishedAt)}</p>
                      <div className="size-1 rounded-full bg-muted-foreground" />
                      <p className="capitalize">{formatKind(entry.kind)}</p>
                    </div>

                    <h2 className="line-clamp-2 text-lg font-semibold tracking-tight sm:text-xl">
                      {entry.title}
                    </h2>

                    <p className="line-clamp-3 text-sm text-muted-foreground">
                      {entry.summary}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </LandingSection>

        <LandingSection className="pt-12 sm:pt-16 lg:pt-20">
          <Footer5 content={shellContent} />
        </LandingSection>
      </main>
    </>
  )
}
