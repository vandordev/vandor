import { ArrowUpRight } from 'lucide-react'

import Footer5 from '#/components/footer-5'
import { HeroHeader } from '#/components/header'
import { LandingSection } from '#/components/landing-section'
import { getSiteShellContent } from '#/components/site-shell-content'
import { VeilButton } from '#/components/ui/veil-button'
import { getVandorMailto, vandorContactEmail } from '#/lib/contact'

const supportPaths = [
  {
    label: 'Institutional backing',
    description:
      'Organizations can help Vandor keep tools, reference, and editorial work steady by backing the mission over time rather than only funding one launch moment.',
  },
  {
    label: 'Financial support',
    description:
      'Individuals or aligned groups can help sustain the continuity required for product maintenance, documentation care, and public technical explanation.',
  },
] as const

const secondarySupport = [
  'Introductions to institutions or teams that could benefit from the work',
  'Distribution help that puts Vandor tools and writing in front of the right technical communities',
  'Documentation, translation, or editorial help that improves clarity and reach',
  'Maintainership support that reduces the long-term burden of keeping useful work public',
] as const

const sustainedOutcomes = [
  'continued upkeep of tools such as `vx`',
  'reference that remains current as products change',
  'writing that can slow down and explain what a technical event means',
  'a public surface that shows progress, releases, and reasoning without splitting them apart',
] as const

export function VandorSupportPage() {
  const shellContent = getSiteShellContent({ variant: 'vandor' })
  const supportHref = getVandorMailto('Support')

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
              <div className="absolute right-0 top-8 h-32 w-30 -translate-y-8 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,color-mix(in_oklab,var(--color-foreground)_8%,transparent)_0,color-mix(in_oklab,var(--color-foreground)_1.2%,transparent)_74%,transparent_100%)]" />
            </div>

            <header className="grid gap-8 border-b border-border/70 pb-10 pt-8 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,0.68fr)] lg:items-end">
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">Support</p>
                <h1 className="max-w-4xl text-balance text-[clamp(3rem,7vw,5.9rem)] leading-[0.96] font-medium tracking-[-0.06em]">
                  Support Vandor if you want tools, reference, and public
                  technical reasoning to stay alive long enough to matter.
                </h1>
              </div>
              <div className="space-y-4 lg:justify-self-end">
                <p className="max-w-xl text-[1rem] leading-7 text-muted-foreground">
                  The mission is not only to publish or ship. It is to keep the
                  work understandable, maintainable, and reusable over time.
                </p>
              </div>
            </header>

            <section className="grid gap-8 border-b border-border/70 py-10 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1fr)]">
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground">Why support matters</p>
                <h2 className="max-w-[15ch] text-balance text-[clamp(2rem,4vw,3.2rem)] leading-[0.98] font-medium tracking-[-0.05em]">
                  Long-lived public work needs continuity, not only attention.
                </h2>
              </div>

              <div className="max-w-[66ch] space-y-5 text-[0.98rem] leading-7 text-muted-foreground">
                <p>
                  Vandor treats tools, documentation, writing, and public
                  updates as connected responsibilities. Keeping them coherent
                  takes time beyond a release moment.
                </p>
                <p>
                  Support helps maintain the slower parts of technical work:
                  explanation, stewardship, upkeep, adaptation, and the ability
                  to keep publishing useful material in public.
                </p>
              </div>
            </section>

            <section className="border-b border-border/70 py-10">
              <div className="mb-8 grid gap-4 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1fr)] lg:items-end">
                <div className="space-y-3">
                  <p className="text-sm text-muted-foreground">Primary support path</p>
                  <h2 className="max-w-[15ch] text-balance text-[clamp(2rem,4vw,3.2rem)] leading-[0.98] font-medium tracking-[-0.05em]">
                    Backing the mission is the main route.
                  </h2>
                </div>
                <p className="max-w-2xl text-[0.98rem] leading-7 text-muted-foreground lg:justify-self-end">
                  The first-release emphasis is institutional and financial
                  support, not a menu of public contribution mechanics.
                </p>
              </div>

              <div className="grid gap-6 lg:grid-cols-2">
                {supportPaths.map((item) => (
                  <article
                    key={item.label}
                    className="space-y-3 rounded-[1.5rem] border border-border/75 bg-card/20 p-5 sm:p-6"
                  >
                    <h3 className="text-[1.3rem] leading-[1.08] font-medium tracking-[-0.035em]">
                      {item.label}
                    </h3>
                    <p className="text-[0.95rem] leading-6 text-muted-foreground">
                      {item.description}
                    </p>
                  </article>
                ))}
              </div>
            </section>

            <section className="grid gap-8 border-b border-border/70 py-10 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1fr)]">
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground">Secondary support paths</p>
                <h2 className="max-w-[15ch] text-balance text-[clamp(2rem,4vw,3.15rem)] leading-[0.98] font-medium tracking-[-0.05em]">
                  Support can also arrive through other forms of useful help.
                </h2>
              </div>

              <div className="divide-y divide-border/70 border-y border-border/70">
                {secondarySupport.map((item) => (
                  <div
                    key={item}
                    className="grid gap-3 py-4 sm:grid-cols-[auto_minmax(0,1fr)] sm:gap-5"
                  >
                    <p className="text-sm text-muted-foreground">Also useful</p>
                    <p className="max-w-[56ch] text-[0.96rem] leading-6 text-muted-foreground">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <section className="grid gap-8 border-b border-border/70 py-10 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1fr)]">
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground">What support sustains</p>
                <h2 className="max-w-[15ch] text-balance text-[clamp(2rem,4vw,3.15rem)] leading-[0.98] font-medium tracking-[-0.05em]">
                  The practical outcome is continuity across the whole surface.
                </h2>
              </div>

              <div className="divide-y divide-border/70 border-y border-border/70">
                {sustainedOutcomes.map((item) => (
                  <div
                    key={item}
                    className="grid gap-3 py-4 sm:grid-cols-[auto_minmax(0,1fr)] sm:gap-5"
                  >
                    <p className="text-sm text-muted-foreground">Sustains</p>
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
                  <h2 className="max-w-[15ch] text-balance text-[clamp(2rem,4vw,3.2rem)] leading-[0.98] font-medium tracking-[-0.05em]">
                    If you want to back the mission, send an email and use the
                    subject line “Support”.
                  </h2>
                  <VeilButton asChild size="sm">
                    <a href={supportHref}>
                      <span>Support Vandor</span>
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
                      Use this path for institutional backing, financial support,
                      or other forms of help that keep the mission sustainable.
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Need the broader context first? Read{' '}
                      <a
                        href="/about"
                        className="text-foreground transition-colors hover:text-muted-foreground"
                      >
                        About
                      </a>{' '}
                      or see{' '}
                      <a
                        href="/work"
                        className="text-foreground transition-colors hover:text-muted-foreground"
                      >
                        Work
                      </a>
                      .
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Looking for operational collaboration instead? Start with{' '}
                      <a
                        href="/collaborate"
                        className="text-foreground transition-colors hover:text-muted-foreground"
                      >
                        Collaborate
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
