import type { PropsWithChildren } from 'react'

import { cn } from '#/lib/utils'

type LandingSectionProps = PropsWithChildren<{
  className?: string
  contentClassName?: string
}>

export function LandingSection({
  children,
  className,
  contentClassName,
}: LandingSectionProps) {
  return (
    <section className={cn('bg-background pt-16 sm:pt-20 lg:pt-28', className)}>
      <div
        className={cn(
          'mx-auto w-full max-w-[1440px] px-6 sm:px-8 lg:px-10',
          contentClassName,
        )}
      >
        {children}
      </div>
    </section>
  )
}
