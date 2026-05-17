import { ArrowRight } from 'lucide-react'

import { VeilButton } from '#/components/ui/veil-button'

type VandorHomeHeroProps = {
  requestedVersion?: string
}

export function VandorHomeHero({
  requestedVersion = 'latest',
}: VandorHomeHeroProps) {
  return (
    <section className="bg-background">
      <div className="relative overflow-hidden px-6 pb-22 pt-28 sm:px-8 sm:pb-28 sm:pt-32 lg:px-10 lg:pb-34 lg:pt-36">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 isolate opacity-55"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,color-mix(in_oklab,var(--color-foreground)_8%,transparent)_0,transparent_32%),radial-gradient(circle_at_100%_12%,color-mix(in_oklab,var(--color-foreground)_6%,transparent)_0,transparent_24%)]" />
        </div>

        <div className="relative mx-auto w-full max-w-[88rem] space-y-12 lg:space-y-16">
          <div className="mx-auto max-w-4xl space-y-6 text-center">
            <div className="space-y-5">
              <h1 className="mx-auto max-w-4xl text-balance text-[clamp(3.1rem,7.8vw,6.3rem)] leading-[0.94] font-medium tracking-[-0.068em]">
                Tools, documentation, and technical work, kept open.
              </h1>
              <p className="mx-auto max-w-2xl text-[1.04rem] leading-8 text-muted-foreground sm:text-[1.1rem]">
                Vandor builds in public so systems can stay legible, reusable,
                and alive across products, reference, and writing.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <VeilButton asChild size="lg" className="pr-2">
                <a href="#about">
                  <span>See the work</span>
                  <ArrowRight className="opacity-55" />
                </a>
              </VeilButton>
              <a
                href={`/vx/${requestedVersion}`}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                Explore vx
              </a>
            </div>
          </div>

          <div className="space-y-4">
            <div className="overflow-hidden rounded-[1.9rem] border border-border/70 bg-card/18">
              <img
                src="/images/home/vandor-hero.jpg"
                alt="People collaborating around a computer in a shared workspace."
                width={2200}
                height={1238}
                className="aspect-[16/9] w-full object-cover object-center"
              />
            </div>
            <div className="flex flex-wrap items-center gap-2 text-[0.84rem] text-muted-foreground">
              <span>Products</span>
              <div className="size-1 rounded-full bg-muted-foreground" />
              <span>Reference</span>
              <div className="size-1 rounded-full bg-muted-foreground" />
              <span>Writing</span>
              <div className="size-1 rounded-full bg-muted-foreground" />
              <span>Public work</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
