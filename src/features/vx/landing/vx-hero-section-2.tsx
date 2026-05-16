import { ChevronRight } from 'lucide-react'

import { Button } from '#/components/ui/button'
import { vxLandingContent } from '#/features/vx/landing/vx-landing-content'
import type { RequestedVxVersion } from '#/features/vx/versioning/version-types'

type VxHeroSection2Props = {
  requestedVersion: RequestedVxVersion
}

export function VxHeroSection2({ requestedVersion }: VxHeroSection2Props) {
  const docsHref = vxLandingContent.getDocsHref(requestedVersion)
  const gettingStartedHref = vxLandingContent.installHref(requestedVersion)

  return (
    <section id="overview" className="bg-background">
      <div className="relative overflow-hidden px-6 pb-32 pt-44 sm:px-8 lg:px-10">
        <div className="mask-radial-from-45% mask-radial-to-75% mask-radial-at-top mask-radial-[75%_100%] pointer-events-none absolute inset-0 aspect-square opacity-65 md:aspect-[9/4] dark:opacity-5">
          <img
            src="https://images.unsplash.com/photo-1740516367177-ae20098c8786?q=80&w=2268&auto=format&fit=crop"
            alt=""
            className="size-full object-cover object-top"
          />
        </div>
        <div className="relative z-10 mx-auto w-full max-w-[1440px]">
          {/* <div className="mx-auto mb-16 max-w-3xl lg:mb-24"> */}
          {/*   <div className="grid scale-95 grid-cols-3 gap-4 font-sans sm:gap-8 lg:gap-12 [&>*]:justify-self-center"> */}
          {/*     {vxLandingContent.showcaseItems.map((item, index) => { */}
          {/*       const blurClass = */}
          {/*         index % 3 === 0 */}
          {/*           ? 'blur-[2px]' */}
          {/*           : index % 3 === 2 */}
          {/*             ? 'blur-[1.5px]' */}
          {/*             : '' */}
          {/**/}
          {/*       return ( */}
          {/*         <div key={item} className={blurClass}> */}
          {/*           <Card className="shadow-foreground/10 flex h-8 w-fit items-center rounded-xl px-3 sm:h-10 sm:px-4"> */}
          {/*             <span className="text-nowrap text-xs font-medium sm:text-sm"> */}
          {/*               {item} */}
          {/*             </span> */}
          {/*           </Card> */}
          {/*         </div> */}
          {/*       ) */}
          {/*     })} */}
          {/*   </div> */}
          {/* </div> */}

          <div className="mx-auto max-w-2xl text-center font-sans">
            <div className="inline-flex items-center rounded-full border border-border bg-card/70 px-3 py-1 text-xs font-medium tracking-[0.22em] text-muted-foreground">
              vx {requestedVersion}
            </div>
            <h1 className="mt-6 text-balance text-4xl font-medium sm:text-5xl lg:text-6xl">
              Build hexagonal-DDD Go services with vx.
            </h1>
            <p className="text-muted-foreground mt-4 text-balance text-base leading-7 sm:text-lg">
              Vandor maintains vx, a CLI for generating bounded contexts, use
              cases, adapters, and project structure that stays coherent as your
              backend grows.
            </p>

            <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Button asChild className="pr-1.5">
                <a href={gettingStartedHref}>
                  <span className="text-nowrap">Install vx</span>
                  <ChevronRight className="opacity-50" />
                </a>
              </Button>
              <Button asChild variant="ghost">
                <a href={docsHref}>
                  <span>Read Docs</span>
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
