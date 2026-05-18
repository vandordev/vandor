import { ArrowRight } from 'lucide-react'

import { VeilButton } from '#/components/ui/veil-button'

export function VandorHomeHero() {
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
                Tools, docs, and technical writing built to stay useful.
              </h1>
              <p className="mx-auto max-w-2xl text-[1.04rem] leading-8 text-muted-foreground sm:text-[1.1rem]">
                Vandor is an open organization that builds developer tools,
                publishes documentation, and shares technical work in public so
                each part stays easier to understand, use, and improve.
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
                href="/writing"
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                Read the writing
              </a>
            </div>
          </div>

          <div className="space-y-4">
            <div className="group relative overflow-hidden rounded-[2.05rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))] p-[1px] shadow-[0_30px_80px_rgba(0,0,0,0.32)]">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-[1px] rounded-[calc(2.05rem-1px)] bg-[radial-gradient(circle_at_12%_0%,rgba(105,140,255,0.16),transparent_30%),linear-gradient(180deg,rgba(255,255,255,0.1),rgba(255,255,255,0.02)_16%,rgba(0,0,0,0.08)_100%)] opacity-95"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-6 top-0 h-12 rounded-full bg-[radial-gradient(circle,rgba(190,214,255,0.24)_0,rgba(190,214,255,0.08)_36%,transparent_72%)] blur-2xl"
              />
              <div className="relative overflow-hidden rounded-[calc(2.05rem-1px)] border border-white/6 bg-black/45 backdrop-blur-sm">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 z-10 bg-[linear-gradient(180deg,rgba(255,255,255,0.12),transparent_12%,transparent_78%,rgba(72,110,255,0.12))]"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-[1px] z-10 rounded-[calc(2.05rem-3px)] ring-1 ring-inset ring-white/8"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-y-0 right-0 z-10 w-1/3 bg-[radial-gradient(circle_at_100%_50%,rgba(89,125,255,0.18),transparent_72%)]"
                />
                <img
                  src="/images/home/vandor-hero.jpg"
                  alt="People collaborating around a computer in a shared workspace."
                  width={2200}
                  height={1238}
                  className="aspect-[16/9] w-full object-cover object-center"
                />
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2 text-[0.84rem] text-muted-foreground">
              <span>Products</span>
              <div className="size-1 rounded-full bg-muted-foreground" />
              <span>Reference</span>
              <div className="size-1 rounded-full bg-muted-foreground" />
              <span>Writing</span>
              <div className="size-1 rounded-full bg-muted-foreground" />
              <span>Collaboration</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
