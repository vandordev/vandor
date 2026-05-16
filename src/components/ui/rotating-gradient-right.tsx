'use client'

import { ArrowRight } from 'lucide-react'

import { Button } from '#/components/ui/button'
import { Card, CardContent } from '#/components/ui/card'

export default function RotatingGradientRight() {
  return (
    <div className="min-h-screen w-full font-sans text-foreground">
      <div className="grid items-center gap-12 md:grid-cols-2">
        <div className="relative mx-auto flex h-[40rem] w-full max-w-[60rem] items-center justify-center overflow-hidden rounded-3xl">
          <div className="absolute -inset-10 flex items-center justify-center">
            <div className="h-[120%] w-[120%] rounded-[36px] bg-[conic-gradient(from_0deg,theme(colors.emerald.400),theme(colors.cyan.400),theme(colors.blue.500),theme(colors.violet.600),theme(colors.red.500),theme(colors.emerald.400))] opacity-80 blur-3xl animate-[spin_8s_linear_infinite]" />
          </div>

          <Card className="z-10 w-[340px] rounded-2xl border-border bg-card/85 text-card-foreground shadow-2xl backdrop-blur-xl">
            <CardContent className="p-5">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-sm font-medium">vx</span>
                <span className="text-muted-foreground text-xs">hexagonal-ddd</span>
              </div>

              <div className="bg-muted/60 mb-3 h-1.5 w-full overflow-hidden rounded-full">
                <div className="h-full w-[92%] rounded-full bg-[linear-gradient(90deg,theme(colors.cyan.400),theme(colors.sky.400),theme(colors.emerald.400))]" />
              </div>

              <p className="text-muted-foreground text-xs">
                Generating domain core, application layer, and adapter wiring for your
                next Go service.
              </p>

              <Button variant="secondary" className="mt-4 w-full rounded-lg">
                Scaffold project
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <h2 className="text-foreground text-lg leading-relaxed font-normal sm:text-xl lg:text-3xl">
            Vandor builds vx,{' '}
            <span className="text-muted-foreground text-sm sm:text-base lg:text-3xl">
              the Go backend CLI for teams that want hexagonal architecture, bounded
              contexts, and DDD structure from the first command.
            </span>
          </h2>
          <Button variant="link" className="px-0">
            Read the vx docs <ArrowRight />
          </Button>
        </div>
      </div>
    </div>
  )
}
