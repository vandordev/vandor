import { ArrowUpRight } from 'lucide-react'

import Footer5 from '#/components/footer-5'
import { HeroHeader } from '#/components/header'
import { LandingSection } from '#/components/landing-section'
import { getSiteShellContent } from '#/components/site-shell-content'
import { VeilButton } from '#/components/ui/veil-button'
import { getVandorMailto, vandorContactEmail } from '#/lib/contact'

const collaborationLanes = [
  {
    label: 'Implementation and systems work',
    description:
      'Teams that need software, internal tooling, or structured backend work built with clearer boundaries from the start.',
  },
  {
    label: 'Documentation and reference work',
    description:
      'Organizations that need product reference, onboarding, or technical explanation treated as part of the system, not an afterthought.',
  },
  {
    label: 'Public-interest infrastructure',
    description:
      'Groups building civic, educational, or institutional systems that need durable technical foundations and calm operational reasoning.',
  },
  {
    label: 'Regional and community adaptation',
    description:
      'Local or distributed communities adapting tools and technical practices into context-specific workshops, translation, or field use.',
  },
] as const

const fitSignals = [
  'You need the tool, the reference, and the reasoning around it to stay legible together.',
  'You care more about durable systems and maintainable boundaries than about launch theater.',
  'You are working in a context where documentation, adoption, or stewardship are part of the real technical problem.',
] as const

const outreachInputs = [
  'What you are building or maintaining now',
  'The specific technical or organizational constraint you are running into',
  'Why Vandor seems relevant to the situation',
  'Any timing, operational pressure, or public-interest stakes that matter',
] as const

export function VandorCollaboratePage() {
  const shellContent = getSiteShellContent({ variant: 'vandor' })
  const collaborateHref = getVandorMailto('Collaboration')

  return (
    <>
      <HeroHeader content={shellContent} />
      <main className="bg-background text-foreground">
        <LandingSection className="pt-28 sm:pt-32 lg:pt-36">
          <div className="relative mx-auto w-full max-w-[88rem] px-4">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 isolate -z-10 h-52 opacity-60"
            >
              <div className="absolute left-0 top-0 h-34 w-36 -translate-y-14 rounded-full bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,color-mix(in_oklab,var(--color-foreground)_10%,transparent)_0,color-mix(in_oklab,var(--color-foreground)_1.8%,transparent)_58%,transparent_88%)]" />
              <div className="absolute right-0 top-8 h-32 w-28 -translate-y-10 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,color-mix(in_oklab,var(--color-foreground)_8%,transparent)_0,color-mix(in_oklab,var(--color-foreground)_1.2%,transparent)_74%,transparent_100%)]" />
            </div>

            <header className="grid gap-8 border-b border-border/70 pb-10 pt-8 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,0.68fr)] lg:items-end">
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">Collaborate</p>
                <h1 className="max-w-4xl text-balance text-[clamp(3rem,7vw,5.9rem)] leading-[0.96] font-medium tracking-[-0.06em]">
                  Vandor collaborates best where technical work needs durable
                  structure, reference, and public clarity.
                </h1>
              </div>
              <div className="space-y-4 lg:justify-self-end">
                <p className="max-w-xl text-[1rem] leading-7 text-muted-foreground">
                  This page is meant to help a team decide whether Vandor is a
                  good fit before reaching out. The goal is not lead capture. It
                  is alignment.
                </p>
              </div>
            </header>

            <section className="border-b border-border/70 py-10">
              <div className="mb-8 grid gap-4 lg:grid-cols-[minmax(0,0.74fr)_minmax(0,1fr)] lg:items-end">
                <div className="space-y-3">
                  <p className="text-sm text-muted-foreground">Collaboration lanes</p>
                  <h2 className="max-w-[15ch] text-balance text-[clamp(2rem,4vw,3.3rem)] leading-[0.98] font-medium tracking-[-0.05em]">
                    The best fits are specific, not universal.
                  </h2>
                </div>
                <p className="max-w-2xl text-[0.98rem] leading-7 text-muted-foreground lg:justify-self-end">
                  Vandor is not trying to be every kind of technical partner.
                  The lanes below describe the work that is most likely to make
                  sense.
                </p>
              </div>

              <div className="divide-y divide-border/70 border-y border-border/70">
                {collaborationLanes.map((lane) => (
                  <article
                    key={lane.label}
                    className="grid gap-3 py-5 lg:grid-cols-[minmax(0,0.34fr)_minmax(0,1fr)] lg:gap-8"
                  >
                    <h3 className="text-[1.16rem] leading-6 font-medium tracking-[-0.03em]">
                      {lane.label}
                    </h3>
                    <p className="max-w-[60ch] text-[0.97rem] leading-7 text-muted-foreground">
                      {lane.description}
                    </p>
                  </article>
                ))}
              </div>
            </section>

            <section className="grid gap-8 border-b border-border/70 py-10 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1fr)]">
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground">Good fit</p>
                <h2 className="max-w-[14ch] text-balance text-[clamp(2rem,4vw,3.15rem)] leading-[0.98] font-medium tracking-[-0.05em]">
                  Vandor is best used where the technical problem includes stewardship.
                </h2>
              </div>

              <div className="space-y-4">
                {fitSignals.map((signal) => (
                  <div
                    key={signal}
                    className="rounded-[1.4rem] border border-border/75 bg-card/20 p-5"
                  >
                    <p className="max-w-[58ch] text-[0.97rem] leading-7 text-muted-foreground">
                      {signal}
                    </p>
                  </div>
                ))}
                <p className="text-sm text-muted-foreground">
                  For more context on existing collaboration shapes, see{' '}
                  <a
                    href="/partners"
                    className="text-foreground transition-colors hover:text-muted-foreground"
                  >
                    Partners
                  </a>{' '}
                  or revisit the broader ecosystem map on{' '}
                  <a
                    href="/work"
                    className="text-foreground transition-colors hover:text-muted-foreground"
                  >
                    Work
                  </a>
                  .
                </p>
              </div>
            </section>

            <section className="grid gap-8 border-b border-border/70 py-10 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1fr)]">
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground">What to bring</p>
                <h2 className="max-w-[14ch] text-balance text-[clamp(2rem,4vw,3.15rem)] leading-[0.98] font-medium tracking-[-0.05em]">
                  A precise first email is more useful than a polished pitch.
                </h2>
              </div>

              <div className="divide-y divide-border/70 border-y border-border/70">
                {outreachInputs.map((item) => (
                  <div
                    key={item}
                    className="grid gap-3 py-4 sm:grid-cols-[auto_minmax(0,1fr)] sm:gap-5"
                  >
                    <p className="text-sm text-muted-foreground">Include</p>
                    <p className="max-w-[56ch] text-[0.96rem] leading-6 text-muted-foreground">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <section className="py-10">
              <div className="grid gap-8 lg:grid-cols-[minmax(0,0.68fr)_minmax(0,1fr)] lg:items-start">
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">Contact</p>
                  <h2 className="max-w-[14ch] text-balance text-[clamp(2rem,4vw,3.2rem)] leading-[0.98] font-medium tracking-[-0.05em]">
                    If the fit is clear, send an email and use the subject
                    line “Collaboration”.
                  </h2>
                  <VeilButton asChild size="sm">
                    <a href={collaborateHref}>
                      <span>Email Vandor</span>
                      <ArrowUpRight className="opacity-55" />
                    </a>
                  </VeilButton>
                </div>

                <div className="rounded-[1.65rem] border border-border/75 bg-card/20 p-5 sm:p-6">
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">Inbox path</p>
                    <p className="text-[1.02rem] leading-7 text-foreground">
                      {vandorContactEmail}
                    </p>
                    <p className="max-w-[48ch] text-[0.95rem] leading-6 text-muted-foreground">
                      This route shares an inbox with mission support inquiries,
                      but the subject line keeps the two paths easy to triage.
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Need more organizational context first? Read{' '}
                      <a
                        href="/about"
                        className="text-foreground transition-colors hover:text-muted-foreground"
                      >
                        About
                      </a>
                      .
                    </p>
                  </div>
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
