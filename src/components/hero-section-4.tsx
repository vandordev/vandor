import {
  AudioLines,
  ChevronRight,
  Github,
  ImageIcon,
  Lightbulb,
  Mic2,
  Paperclip,
  Plus,
  ShoppingBag,
  Telescope,
} from 'lucide-react'

import { HeroHeader } from '#/components/header'
import { VeilButton } from '#/components/ui/veil-button'

export default function HeroSection4() {
  return (
    <>
      <HeroHeader />
      <main className="overflow-hidden">
        <section className="bg-background">
          <div className="relative py-32">
            <div className="mask-radial-from-45% mask-radial-to-75% mask-radial-at-top mask-radial-[75%_100%] mask-t-from-50% aspect-2/3 lg:aspect-9/4 absolute inset-0 md:aspect-square dark:opacity-5">
              <img
                src="https://images.unsplash.com/photo-1740516367177-ae20098c8786?q=80&w=2268&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="hero background"
                width={2268}
                height={1740}
                className="h-full w-full object-cover object-top"
              />
            </div>
            <div className="relative z-10 mx-auto w-full max-w-5xl px-6">
              <div
                aria-hidden
                className="perspective-near mask-radial-at-left mask-radial-from-65% mask-radial-to-90% mask-radial-[75%_100%] min-w-2xl mb-6 ml-auto max-w-3xl scale-90 py-12 pl-6 sm:mb-12 md:pl-12 lg:mb-20"
              >
                <div className="rotate-x-12 bg-muted rotate-y-2 rotate-z-10 relative flex h-56 -rotate-12 flex-col rounded-3xl border py-4 pl-4">
                  <div className="bg-card ring-border shadow-foreground/10 bottom-15 absolute left-4 min-w-56 rounded-2xl p-1 shadow-xl ring-1 dark:shadow-black/25">
                    <div className="hover:bg-muted flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2 text-sm [&>svg]:size-4 [&>svg]:opacity-65">
                      <Paperclip />
                      <span>Scaffold bounded contexts</span>
                    </div>
                    <span className="bg-size-[6px_1px] mx-3 my-0.5 block h-px bg-[linear-gradient(90deg,var(--color-foreground)_1px,transparent_1px)] bg-bottom bg-repeat-x opacity-30 dark:opacity-15" />
                    <div className="hover:bg-muted flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2 text-sm [&>svg]:size-4 [&>svg]:opacity-65">
                      <ImageIcon />
                      <span>Generate adapters</span>
                    </div>
                    <div className="hover:bg-muted flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2 text-sm [&>svg]:size-4 [&>svg]:opacity-65">
                      <Lightbulb />
                      <span>Map use cases</span>
                    </div>
                    <div className="hover:bg-muted flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2 text-sm [&>svg]:size-4 [&>svg]:opacity-65">
                      <Telescope />
                      <span>Inspect architecture</span>
                    </div>
                    <div className="hover:bg-muted flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2 text-sm [&>svg]:size-4 [&>svg]:opacity-65">
                      <ShoppingBag />
                      <span>Add VPKG packages</span>
                    </div>
                    <div className="hover:bg-muted flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2 text-sm [&>svg]:size-4 [&>svg]:opacity-65">
                      <Github />
                      <span>Ship open source faster</span>
                    </div>
                  </div>

                  <div className="bg-card ring-border shadow-foreground/6.5 dark:shadow-black/6.5 shadow-xs mt-auto flex h-fit justify-between gap-3 rounded-full p-2 ring-1">
                    <div className="flex items-center gap-2">
                      <div className="bg-muted flex size-9 cursor-pointer rounded-full *:m-auto *:size-4">
                        <Plus />
                      </div>
                      <div className="text-muted-foreground text-sm">Run vx new...</div>
                    </div>
                    <div className="flex items-center gap-0.5">
                      <div className="hover:bg-muted flex size-9 cursor-pointer rounded-full *:m-auto *:size-4">
                        <Mic2 />
                      </div>
                      <div className="bg-foreground text-background flex size-9 cursor-pointer rounded-full *:m-auto *:size-4 hover:brightness-110">
                        <AudioLines />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mx-auto max-w-md text-center">
                <h1 className="text-balance text-4xl font-medium sm:text-5xl">
                  Open-source tools for structured Go backends.
                </h1>
                <p className="text-muted-foreground mt-4 text-balance">
                  Vandor builds vx, a CLI that scaffolds bounded contexts, use cases,
                  and infrastructure wiring so you can ship clean Go services with
                  hexagonal DDD from the first command.
                </p>

                <VeilButton asChild className="mt-6 pr-1.5">
                  <a href="#link">
                    <span className="text-nowrap">Install vx</span>
                    <ChevronRight className="opacity-50" />
                  </a>
                </VeilButton>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
