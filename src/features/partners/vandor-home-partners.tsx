import { ArrowRight, ArrowUpRight } from 'lucide-react'

import {
  getHomePartners,
  getPartnerHref,
} from '#/features/partners/partner-data'
import { PartnerMark } from '#/features/partners/partner-mark'

export function VandorHomePartners() {
  const partners = getHomePartners()

  return (
    <div className="space-y-9 border-t border-border/70 pt-9 sm:space-y-10 sm:pt-10">
      <div className="grid gap-5 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1fr)] lg:items-end">
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">Partners</p>
          <h2 className="max-w-3xl text-balance text-[clamp(2.15rem,4.8vw,4rem)] leading-[0.98] font-medium tracking-[-0.055em]">
            Vandor works with teams that care about durable technical systems.
          </h2>
        </div>
        <div className="space-y-4 lg:justify-self-end">
          <p className="max-w-xl text-[1rem] leading-7 text-muted-foreground">
            The partnerships here are practical: software delivery,
            documentation, and implementation work that benefits from clear,
            reusable tools.
          </p>
          <a
            href="/partners"
            className="inline-flex items-center gap-2 text-sm text-foreground transition-colors hover:text-muted-foreground"
          >
            <span>See partner work</span>
            <ArrowRight className="size-4 opacity-55" />
          </a>
        </div>
      </div>

      <div className="divide-y divide-border/70 border-y border-border/70">
        {partners.map((partner) => (
          <article
            key={partner.id}
            className="grid gap-5 py-6 sm:grid-cols-[auto_minmax(0,1fr)] sm:items-start sm:gap-6 lg:grid-cols-[auto_minmax(0,0.82fr)_minmax(16rem,0.52fr)] lg:gap-8"
          >
            <PartnerMark laneId={partner.id} />

            <div className="space-y-3">
              <div className="space-y-2">
                <h3 className="text-balance text-[1.38rem] leading-[1.08] font-medium tracking-[-0.038em]">
                  {partner.name}
                </h3>
                <p className="max-w-[48ch] text-[0.97rem] leading-6 text-muted-foreground">
                  {partner.summary}
                </p>
              </div>
              {partner.href ? (
                <a
                  href={getPartnerHref(partner, 'home')}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm text-foreground transition-colors hover:text-muted-foreground"
                >
                  <span>Visit partner</span>
                  <ArrowUpRight className="size-4 opacity-55" />
                </a>
              ) : null}
            </div>

            <div className="space-y-2 text-sm leading-6 text-muted-foreground lg:justify-self-end">
              <p>{partner.collaborationMode}</p>
              <p>{partner.focus}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
