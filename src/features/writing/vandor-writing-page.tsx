import { ArrowRight } from 'lucide-react'

import Footer5 from '#/components/footer-5'
import { HeroHeader } from '#/components/header'
import { LandingSection } from '#/components/landing-section'
import { getSiteShellContent } from '#/components/site-shell-content'

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

export function VandorWritingPage() {
  const shellContent = getSiteShellContent({ variant: 'vandor' })

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
