import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '#/lib/utils'

const veilButtonVariants = cva(
  'active:scale-99 inline-flex cursor-pointer items-center justify-center gap-2 rounded-full text-sm font-medium whitespace-nowrap duration-200 focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default: 'bg-foreground text-background hover:brightness-95',
        neutral: 'bg-foreground text-background hover:brightness-95',
        destructive:
          'bg-destructive text-destructive-foreground shadow-md hover:bg-destructive/90',
        outline:
          'border border-transparent bg-card text-foreground shadow-sm ring-1 ring-foreground/15 duration-200 hover:bg-muted/50',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'text-foreground/75 hover:bg-foreground/5 hover:text-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-8 px-3 py-2',
        sm: 'h-7 px-2.5 text-sm',
        lg: 'h-11 px-6 text-base font-medium',
        icon: 'size-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

export interface VeilButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof veilButtonVariants> {
  asChild?: boolean
}

const VeilButton = React.forwardRef<HTMLButtonElement, VeilButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'

    return (
      <Comp
        data-slot="veil-button"
        className={cn(veilButtonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  },
)

VeilButton.displayName = 'VeilButton'

export { VeilButton, veilButtonVariants }
