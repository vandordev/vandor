import { cn } from '#/lib/utils'

export const Logo = ({ className }: { className?: string }) => {
  return <img src="/app-logo.png" alt="Vandor" className={cn('h-10 w-auto', className)} />
}
