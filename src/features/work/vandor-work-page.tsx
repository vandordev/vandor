import { ArrowRight } from 'lucide-react'

import Footer5 from '#/components/footer-5'
import { HeroHeader } from '#/components/header'
import { LandingSection } from '#/components/landing-section'
import { getSiteShellContent } from '#/components/site-shell-content'
import { VeilButton } from '#/components/ui/veil-button'

type WorkClusterLink = {
  label: string
  href?: string
  note: string
  status?: string
}

type WorkCluster = {
  label: string
  description: string
  links: WorkClusterLink[]
}

const workClusters: WorkCluster[] = [
  {
    label: 'Products',
    description:
      'Vandor builds tools that structure technical work from the start and keep later changes easier to reason about.',
    links: [
      {
        label: 'vx',
        href: '/vx/latest',
        note: 'Composable CLI for structured backend work.',
      },
      {
        label: 'vxt',
        note: 'Templating engine for structured Vandor workflows.',
        status: 'Coming soon',
      },
      {
        label: 'vpkg',
        note: 'Packaging system for shipping reusable Vandor artifacts.',
        status: 'Coming soon',
      },
    ],
  },
  {
    label: 'Reference',
    description:
      'Reference stays close to the product so setup, version changes, and core usage remain readable.',
    links: [
      {
        label: 'vx Docs',
        href: '/vx/latest/docs',
        note: 'Versioned product reference for current and future `vx` releases.',
      },
      {
        label: 'Getting Started',
        href: '/vx/latest/docs/getting-started',
        note: 'The shortest path into installation and first use.',
      },
    ],
  },
  {
    label: 'Writing',
    description:
      'Writing carries slower judgment, field notes, and technical arguments that do not belong in product docs.',
    links: [
      {
        label: 'Vandor Writing',
        href: '/writing',
        note: 'Editorial desk for essays, security analysis, and working methods.',
      },
    ],
  },
  {
    label: 'News',
    description:
      'News keeps the release trail visible through announcements, updates, and product notes tied to live work.',
    links: [
      {
        label: 'Vandor News',
        href: '/news',
        note: 'Announcements and release-adjacent publication from across the organization.',
      },
    ],
  },
  {
    label: 'Partnership work',
    description:
      'Collaboration with other teams keeps the ecosystem grounded in real operational systems and public use cases.',
    links: [
      {
        label: 'Partners',
        href: '/partners',
        note: 'Current partner proof and the collaboration lanes Vandor is built to support.',
      },
      {
        label: 'Collaborate',
        href: '/collaborate',
        note: 'Fit-check and contact path for teams that may want to work with Vandor.',
      },
    ],
  },
] as const

export function VandorWorkPage() {
  const shellContent = getSiteShellContent({ variant: 'vandor' })

  return (
    <>
      <HeroHeader content={shellContent} />
      <main className="bg-background text-foreground">
        <LandingSection className="pt-28 sm:pt-32 lg:pt-36">
          <div className="relative mx-auto w-full max-w-[92rem] px-4">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 isolate -z-10 h-52 opacity-60"
            >
              <div className="absolute left-0 top-0 h-34 w-36 -translate-y-14 rounded-full bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,color-mix(in_oklab,var(--color-foreground)_10%,transparent)_0,color-mix(in_oklab,var(--color-foreground)_1.8%,transparent)_58%,transparent_88%)]" />
              <div className="absolute right-0 top-4 h-30 w-34 -translate-y-8 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,color-mix(in_oklab,var(--color-foreground)_8%,transparent)_0,color-mix(in_oklab,var(--color-foreground)_1.2%,transparent)_74%,transparent_100%)]" />
            </div>

            <header className="grid gap-8 border-b border-border/70 pb-10 pt-8 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,0.72fr)] lg:items-end">
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">Work</p>
                <h1 className="max-w-4xl text-balance text-[clamp(3rem,7vw,5.9rem)] leading-[0.96] font-medium tracking-[-0.06em]">
                  The Vandor ecosystem is maintained as one body of public
                  technical work.
                </h1>
              </div>
              <div className="space-y-4 lg:justify-self-end">
                <p className="max-w-xl text-[1rem] leading-7 text-muted-foreground">
                  This map is meant for orientation. It shows the main surfaces
                  Vandor maintains and the route each one serves in the larger
                  system.
                </p>
              </div>
            </header>

            <section className="border-b border-border/70 py-8">
              <div className="grid gap-4 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1fr)] lg:items-end">
                <div className="space-y-3">
                  <p className="text-sm text-muted-foreground">Map logic</p>
                  <h2 className="max-w-[14ch] text-balance text-[clamp(2rem,4vw,3.25rem)] leading-[0.98] font-medium tracking-[-0.05em]">
                    The work is grouped by function, not by one long inventory.
                  </h2>
                </div>
                <p className="max-w-2xl text-[0.98rem] leading-7 text-muted-foreground lg:justify-self-end">
                  Products, reference, publication, and collaboration should
                  feel like connected surfaces with distinct jobs, not like
                  disconnected sections of a brochure.
                </p>
              </div>
            </section>

            <div className="divide-y divide-border/70">
              {workClusters.map((cluster) => (
                <section
                  key={cluster.label}
                  className="grid gap-8 py-8 lg:grid-cols-[minmax(0,0.34fr)_minmax(0,1fr)] lg:gap-12"
                >
                  <div className="space-y-3">
                    <p className="text-sm text-muted-foreground">{cluster.label}</p>
                    <p className="max-w-[30ch] text-[0.98rem] leading-7 text-muted-foreground">
                      {cluster.description}
                    </p>
                  </div>

                  <div className="divide-y divide-border/70 border-y border-border/70">
                    {cluster.links.map((link) => (
                      link.href ? (
                        <a
                          key={link.label}
                          href={link.href}
                          className="group grid gap-3 py-5 first:pt-4 last:pb-4 sm:grid-cols-[minmax(0,0.34fr)_minmax(0,1fr)_auto] sm:items-start sm:gap-5"
                        >
                          <div className="space-y-1">
                            <p className="text-[1.08rem] leading-6 font-medium tracking-[-0.03em] transition-colors group-hover:text-muted-foreground">
                              {link.label}
                            </p>
                            {link.status ? (
                              <p className="text-[0.8rem] text-muted-foreground">
                                {link.status}
                              </p>
                            ) : null}
                          </div>
                          <p className="max-w-[48ch] text-[0.94rem] leading-6 text-muted-foreground">
                            {link.note}
                          </p>
                          <div className="hidden text-sm text-muted-foreground transition-colors group-hover:text-foreground sm:block">
                            Open
                          </div>
                        </a>
                      ) : (
                        <div
                          key={link.label}
                          className="grid gap-3 py-5 first:pt-4 last:pb-4 sm:grid-cols-[minmax(0,0.34fr)_minmax(0,1fr)_auto] sm:items-start sm:gap-5"
                        >
                          <div className="space-y-1">
                            <p className="text-[1.08rem] leading-6 font-medium tracking-[-0.03em]">
                              {link.label}
                            </p>
                            {link.status ? (
                              <p className="text-[0.8rem] text-muted-foreground">
                                {link.status}
                              </p>
                            ) : null}
                          </div>
                          <p className="max-w-[48ch] text-[0.94rem] leading-6 text-muted-foreground">
                            {link.note}
                          </p>
                          <div className="hidden text-sm text-muted-foreground sm:block">
                            Planned
                          </div>
                        </div>
                      )
                    ))}
                  </div>
                </section>
              ))}
            </div>

            <section className="border-t border-border/70 py-10">
              <div className="grid gap-8 lg:grid-cols-[minmax(0,0.68fr)_minmax(0,1fr)] lg:items-start">
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">Next paths</p>
                  <h2 className="max-w-[15ch] text-balance text-[clamp(2rem,4vw,3.2rem)] leading-[0.98] font-medium tracking-[-0.05em]">
                    Follow the organizational frame, or open a collaboration
                    path.
                  </h2>
                  <VeilButton asChild size="sm">
                    <a href="/about">
                      <span>Read about Vandor</span>
                      <ArrowRight className="opacity-55" />
                    </a>
                  </VeilButton>
                </div>

                <div className="divide-y divide-border/70 border-y border-border/70">
                  <a
                    href="/about"
                    className="group grid gap-3 py-5 first:pt-4 last:pb-4 sm:grid-cols-[minmax(0,0.32fr)_minmax(0,1fr)]"
                  >
                    <p className="text-foreground transition-colors group-hover:text-muted-foreground">
                      About
                    </p>
                    <p className="max-w-[52ch] text-[0.95rem] leading-6 text-muted-foreground">
                      Read how products, reference, publication, and partner
                      work fit together inside Vandor as an institution.
                    </p>
                  </a>
                  <a
                    href="/collaborate"
                    className="group grid gap-3 py-5 first:pt-4 last:pb-4 sm:grid-cols-[minmax(0,0.32fr)_minmax(0,1fr)]"
                  >
                    <p className="text-foreground transition-colors group-hover:text-muted-foreground">
                      Collaborate
                    </p>
                    <p className="max-w-[52ch] text-[0.95rem] leading-6 text-muted-foreground">
                      See the kinds of technical situations and organizations
                      that are a good fit for working with Vandor.
                    </p>
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
