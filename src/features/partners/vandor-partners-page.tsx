import { ArrowUpRight } from 'lucide-react'

import Footer5 from '#/components/footer-5'
import { HeroHeader } from '#/components/header'
import { LandingSection } from '#/components/landing-section'
import { getSiteShellContent } from '#/components/site-shell-content'
import {
  getPartnerHref,
  namedPartners,
  partnerLanes,
} from '#/features/partners/partner-data'
import { PartnerMark } from '#/features/partners/partner-mark'

export function VandorPartnersPage() {
  const shellContent = getSiteShellContent({ variant: 'vandor' })

  return (
    <>
      <HeroHeader content={shellContent} />
      <main className="bg-background text-foreground">
        <LandingSection className="pt-28 sm:pt-32 lg:pt-36">
          <div className="relative mx-auto w-full max-w-[88rem] px-4">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 isolate -z-10 h-48 opacity-60"
            >
              <div className="absolute left-0 top-0 h-36 w-32 -translate-y-16 rounded-full bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,color-mix(in_oklab,var(--color-foreground)_10%,transparent)_0,color-mix(in_oklab,var(--color-foreground)_1.8%,transparent)_58%,transparent_88%)]" />
              <div className="absolute right-0 top-4 h-32 w-28 -translate-y-8 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,color-mix(in_oklab,var(--color-foreground)_8%,transparent)_0,color-mix(in_oklab,var(--color-foreground)_1.2%,transparent)_74%,transparent_100%)]" />
            </div>

            <div className="grid gap-8 border-b border-border/70 pb-9 pt-8 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,0.68fr)] lg:items-end">
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">Partners</p>
                <h1 className="max-w-4xl text-balance text-[clamp(3rem,7vw,5.8rem)] leading-[0.96] font-medium tracking-[-0.06em]">
                  Vandor grows further when the work can move with others.
                </h1>
              </div>
              <div className="space-y-4 lg:justify-self-end">
                <p className="max-w-xl text-[1rem] leading-7 text-muted-foreground">
                  This surface holds the organizations already working with
                  Vandor, along with the collaboration lanes the ecosystem is
                  designed to support as it broadens.
                </p>
              </div>
            </div>

            <section className="border-b border-border/70 py-8">
              <div className="grid gap-3 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1fr)] lg:items-end">
                <p className="text-sm text-muted-foreground">Current partner</p>
                <p className="max-w-2xl text-[0.98rem] leading-7 text-muted-foreground lg:justify-self-end">
                  A record of who is already in motion with Vandor, followed by
                  the broader lanes the ecosystem is prepared to open next.
                </p>
              </div>
            </section>

            <section className="divide-y divide-border/70 border-b border-border/70">
              {namedPartners.map((partner, index) => (
                <article
                  key={partner.id}
                  className={`grid gap-5 py-7 sm:grid-cols-[auto_minmax(0,1fr)] sm:items-start sm:gap-6 lg:grid-cols-[auto_minmax(0,0.85fr)_minmax(16rem,0.48fr)] lg:gap-10 ${
                    index === 0 ? 'pt-8' : ''
                  }`}
                >
                  <PartnerMark
                    laneId={partner.id}
                    className="size-16 rounded-[1.35rem]"
                  />

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <h2 className="max-w-[20ch] text-balance text-[1.7rem] leading-[1.04] font-medium tracking-[-0.042em]">
                        {partner.name}
                      </h2>
                      <p className="max-w-[54ch] text-[1rem] leading-7 text-muted-foreground">
                        {partner.summary}
                      </p>
                    </div>
                    {partner.href ? (
                      <a
                        href={getPartnerHref(partner, 'directory')}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm text-foreground transition-colors hover:text-muted-foreground"
                      >
                        <span>Visit partner</span>
                        <ArrowUpRight className="size-4 opacity-55" />
                      </a>
                    ) : null}
                  </div>

                  <dl className="grid gap-4 text-sm leading-6 lg:justify-self-end">
                    <div className="space-y-1">
                      <dt className="text-foreground">Mode</dt>
                      <dd className="text-muted-foreground">
                        {partner.collaborationMode}
                      </dd>
                    </div>
                    <div className="space-y-1">
                      <dt className="text-foreground">Focus</dt>
                      <dd className="text-muted-foreground">{partner.focus}</dd>
                    </div>
                    <div className="space-y-1">
                      <dt className="text-foreground">Shape</dt>
                      <dd className="text-muted-foreground">{partner.shape}</dd>
                    </div>
                  </dl>
                </article>
              ))}
            </section>

            <section className="border-b border-border/70 py-8">
              <div className="grid gap-3 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1fr)] lg:items-end">
                <p className="text-sm text-muted-foreground">Collaboration lanes</p>
                <p className="max-w-2xl text-[0.98rem] leading-7 text-muted-foreground lg:justify-self-end">
                  The directory stays open for the kinds of institutions,
                  communities, and stewards the Vandor ecosystem is built to
                  support next.
                </p>
              </div>
            </section>

            <section className="divide-y divide-border/70">
              {partnerLanes.map((lane, index) => (
                <article
                  key={lane.id}
                  className={`grid gap-5 py-7 sm:grid-cols-[auto_minmax(0,1fr)] sm:items-start sm:gap-6 lg:grid-cols-[auto_minmax(0,0.85fr)_minmax(16rem,0.48fr)] lg:gap-10 ${
                    index === 0 ? 'pt-8' : ''
                  }`}
                >
                  <PartnerMark
                    laneId={lane.id}
                    className="size-16 rounded-[1.35rem]"
                  />

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <h2 className="max-w-[20ch] text-balance text-[1.7rem] leading-[1.04] font-medium tracking-[-0.042em]">
                        {lane.name}
                      </h2>
                      <p className="max-w-[54ch] text-[1rem] leading-7 text-muted-foreground">
                        {lane.summary}
                      </p>
                    </div>
                  </div>

                  <dl className="grid gap-4 text-sm leading-6 lg:justify-self-end">
                    <div className="space-y-1">
                      <dt className="text-foreground">Mode</dt>
                      <dd className="text-muted-foreground">
                        {lane.collaborationMode}
                      </dd>
                    </div>
                    <div className="space-y-1">
                      <dt className="text-foreground">Focus</dt>
                      <dd className="text-muted-foreground">{lane.focus}</dd>
                    </div>
                    <div className="space-y-1">
                      <dt className="text-foreground">Shape</dt>
                      <dd className="text-muted-foreground">{lane.shape}</dd>
                    </div>
                  </dl>
                </article>
              ))}
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
