import { ArrowRight } from 'lucide-react'

import Footer5 from '#/components/footer-5'
import { HeroHeader } from '#/components/header'
import { LandingSection } from '#/components/landing-section'
import { getSiteShellContent } from '#/components/site-shell-content'
import { VeilButton } from '#/components/ui/veil-button'

const operatingSurfaces = [
  {
    label: 'Products',
    description:
      'Vandor builds tools that help technical work start with clearer structure and stay easier to maintain over time.',
  },
  {
    label: 'Reference',
    description:
      'Documentation and getting-started paths stay close to the tools so setup and changes remain legible.',
  },
  {
    label: 'Writing',
    description:
      'Longer-form essays and field notes explain the reasoning, judgment, and boundaries around the work.',
  },
  {
    label: 'News',
    description:
      'Announcements, releases, and product notes keep the public trail of what is changing and why.',
  },
  {
    label: 'Partnership work',
    description:
      'Collaboration with other teams helps the tools and methods stay grounded in real systems and public usefulness.',
  },
] as const

const principles = [
  {
    title: 'Clarity over theater',
    description:
      'Vandor prefers work that can be read, followed, and maintained over interfaces or systems that only perform sophistication.',
  },
  {
    title: 'Durability over launch energy',
    description:
      'The point is not only to release something new. The point is to leave behind tools, docs, and reasoning that remain useful.',
  },
  {
    title: 'Public work with practical edges',
    description:
      'Vandor works in public where openness improves understanding, stewardship, and reuse, not as a branding gesture.',
  },
] as const

const nextPaths = [
  {
    label: 'See the work',
    href: '/work',
    description: 'Map the ecosystem Vandor maintains across products, reference, publication, and partner work.',
  },
  {
    label: 'Collaborate',
    href: '/collaborate',
    description: 'See which kinds of teams and technical situations are a good fit for working with Vandor.',
  },
  {
    label: 'Support',
    href: '/support',
    description: 'Learn how to help sustain Vandor through institutional backing and other mission-supporting help.',
  },
] as const

export function VandorAboutPage() {
  const shellContent = getSiteShellContent({ variant: 'vandor' })

  return (
    <>
      <HeroHeader content={shellContent} />
      <main className="bg-background text-foreground">
        <LandingSection className="pt-28 sm:pt-32 lg:pt-36">
          <div className="relative mx-auto w-full max-w-[88rem] px-4">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 isolate -z-10 h-56 opacity-60"
            >
              <div className="absolute left-0 top-0 h-40 w-32 -translate-y-18 rounded-full bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,color-mix(in_oklab,var(--color-foreground)_10%,transparent)_0,color-mix(in_oklab,var(--color-foreground)_1.8%,transparent)_58%,transparent_88%)]" />
              <div className="absolute right-0 top-6 h-36 w-30 -translate-y-10 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,color-mix(in_oklab,var(--color-foreground)_8%,transparent)_0,color-mix(in_oklab,var(--color-foreground)_1.2%,transparent)_74%,transparent_100%)]" />
            </div>

            <header className="grid gap-8 border-b border-border/70 pb-10 pt-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,0.7fr)] lg:items-end">
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">About Vandor</p>
                <h1 className="max-w-4xl text-balance text-[clamp(3rem,7vw,5.8rem)] leading-[0.96] font-medium tracking-[-0.06em]">
                  Vandor is a public-interest technical organization building
                  tools, reference, and writing that are meant to hold up over
                  time.
                </h1>
              </div>
              <div className="space-y-4 lg:justify-self-end">
                <p className="max-w-xl text-[1rem] leading-7 text-muted-foreground">
                  The organization exists to make technical work easier to
                  understand, maintain, and reuse by keeping products,
                  documentation, editorial reasoning, and public progress close
                  to one another.
                </p>
              </div>
            </header>

            <section className="grid gap-8 border-b border-border/70 py-10 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1fr)]">
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground">Institution</p>
                <h2 className="max-w-[14ch] text-balance text-[clamp(2.1rem,4vw,3.4rem)] leading-[0.98] font-medium tracking-[-0.05em]">
                  One organization, several public surfaces.
                </h2>
              </div>
              <div className="max-w-[68ch] space-y-5 text-[1rem] leading-7 text-muted-foreground">
                <p>
                  Some people meet Vandor through a tool such as{' '}
                  <a
                    href="/vx/latest"
                    className="text-foreground transition-colors hover:text-muted-foreground"
                  >
                    vx
                  </a>
                  . Others arrive through{' '}
                  <a
                    href="/writing"
                    className="text-foreground transition-colors hover:text-muted-foreground"
                  >
                    writing
                  </a>{' '}
                  or{' '}
                  <a
                    href="/news"
                    className="text-foreground transition-colors hover:text-muted-foreground"
                  >
                    news
                  </a>
                  . The point of the site is to make those paths feel connected,
                  not accidental.
                </p>
                <p>
                  Vandor treats products, documentation, and editorial work as
                  parts of the same technical body of work. The organization is
                  not only shipping software. It is also trying to keep the
                  reasoning around that software close enough to stay useful.
                </p>
              </div>
            </section>

            <section className="border-b border-border/70 py-10">
              <div className="mb-8 grid gap-4 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1fr)] lg:items-end">
                <div className="space-y-3">
                  <p className="text-sm text-muted-foreground">How Vandor works</p>
                  <h2 className="max-w-[16ch] text-balance text-[clamp(2rem,4.2vw,3.5rem)] leading-[0.98] font-medium tracking-[-0.05em]">
                    The organization is easiest to understand through its
                    operating surfaces.
                  </h2>
                </div>
                <p className="max-w-2xl text-[0.98rem] leading-7 text-muted-foreground lg:justify-self-end">
                  Each surface has a distinct job, but none of them are meant
                  to feel detached from the others.
                </p>
              </div>

              <div className="divide-y divide-border/70 border-y border-border/70">
                {operatingSurfaces.map((item) => (
                  <article
                    key={item.label}
                    className="grid gap-3 py-5 lg:grid-cols-[minmax(0,0.38fr)_minmax(0,1fr)] lg:gap-8"
                  >
                    <h3 className="text-[1.18rem] leading-6 font-medium tracking-[-0.03em]">
                      {item.label}
                    </h3>
                    <p className="max-w-[64ch] text-[0.98rem] leading-7 text-muted-foreground">
                      {item.description}
                    </p>
                  </article>
                ))}
              </div>
            </section>

            <section className="border-b border-border/70 py-10">
              <div className="mb-8 grid gap-4 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1fr)] lg:items-end">
                <div className="space-y-3">
                  <p className="text-sm text-muted-foreground">Principles</p>
                  <h2 className="max-w-[15ch] text-balance text-[clamp(2rem,4vw,3.25rem)] leading-[0.98] font-medium tracking-[-0.05em]">
                    The work stays public where publicness improves the work.
                  </h2>
                </div>
                <p className="max-w-2xl text-[0.98rem] leading-7 text-muted-foreground lg:justify-self-end">
                  Vandor is quieter than a manifesto and more opinionated than a
                  neutral repository. The principles below define the posture.
                </p>
              </div>

              <div className="grid gap-6 lg:grid-cols-3">
                {principles.map((item) => (
                  <article
                    key={item.title}
                    className="space-y-3 rounded-[1.5rem] border border-border/75 bg-card/20 p-5 sm:p-6"
                  >
                    <h3 className="max-w-[14ch] text-balance text-[1.3rem] leading-[1.08] font-medium tracking-[-0.035em]">
                      {item.title}
                    </h3>
                    <p className="text-[0.95rem] leading-6 text-muted-foreground">
                      {item.description}
                    </p>
                  </article>
                ))}
              </div>
            </section>

            <section className="py-10">
              <div className="grid gap-8 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1fr)] lg:items-start">
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">Next paths</p>
                  <h2 className="max-w-[14ch] text-balance text-[clamp(2rem,4vw,3.2rem)] leading-[0.98] font-medium tracking-[-0.05em]">
                    Follow the work, or choose how to engage with it.
                  </h2>
                  <VeilButton asChild size="sm">
                    <a href="/work">
                      <span>Open the work map</span>
                      <ArrowRight className="opacity-55" />
                    </a>
                  </VeilButton>
                </div>

                <div className="divide-y divide-border/70 border-y border-border/70">
                  {nextPaths.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      className="group grid gap-3 py-5 first:pt-4 last:pb-4 sm:grid-cols-[minmax(0,0.32fr)_minmax(0,1fr)]"
                    >
                      <p className="text-foreground transition-colors group-hover:text-muted-foreground">
                        {item.label}
                      </p>
                      <p className="max-w-[52ch] text-[0.95rem] leading-6 text-muted-foreground">
                        {item.description}
                      </p>
                    </a>
                  ))}
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
