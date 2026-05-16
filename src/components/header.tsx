import React from 'react'
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from 'motion/react'
import { ChevronRight, Menu, X } from 'lucide-react'

import { useMedia } from '#/hooks/use-media'
import { cn } from '#/lib/utils'
import { Logo } from '#/components/logo'
import { VeilButton } from '#/components/ui/veil-button'

const menuItems = [
  { name: 'vx', href: '/vx/latest' },
  { name: 'Documentation', href: '/vx/latest/docs' },
  { name: 'GitHub', href: '#' },
]

export const HeroHeader = () => {
  const [menuState, setMenuState] = React.useState(false)
  const [isScrolled, setIsScrolled] = React.useState(false)
  const { scrollY } = useScroll()
  const isLarge = useMedia('(min-width: 64rem)')

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setIsScrolled(latest > 75)
  })

  return (
    <header>
      <nav data-state={menuState && 'active'} className="fixed z-20 w-full">
        <div className="mx-auto max-w-7xl px-6">
          <div className="relative flex flex-wrap items-center justify-between gap-6 py-6 lg:gap-0">
            <div
              className={cn(
                'flex justify-between gap-6 duration-200 max-lg:w-full',
                isScrolled && 'lg:opacity-0 lg:blur-[4px]',
              )}
            >
              <div className="hidden size-fit lg:block">
                <NavItems />
              </div>
              <a
                href="/"
                aria-label="home"
                className="flex items-center gap-2 lg:hidden"
              >
                <Logo className="w-fit" />{' '}
                <span className="font-bold">Vandor</span>
              </a>

              <button
                onClick={() => setMenuState(!menuState)}
                aria-label={menuState ? 'Close Menu' : 'Open Menu'}
                className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden"
                type="button"
              >
                <Menu className="in-data-[state=active]:rotate-180 in-data-[state=active]:scale-0 in-data-[state=active]:opacity-0 m-auto size-6 duration-200" />
                <X className="in-data-[state=active]:rotate-0 in-data-[state=active]:scale-100 in-data-[state=active]:opacity-100 absolute inset-0 m-auto size-6 -rotate-180 scale-0 opacity-0 duration-200" />
              </button>
            </div>

            {isLarge && <FloatingNavPill isScrolled={isScrolled} />}

            <div className="bg-card ring-border in-data-[state=active]:block lg:in-data-[state=active]:flex mb-6 hidden w-full flex-wrap items-center justify-end space-y-8 rounded-3xl p-6 shadow-2xl shadow-zinc-300/20 ring-1 md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:bg-transparent lg:p-0 lg:shadow-none lg:ring-transparent dark:shadow-none dark:lg:bg-transparent">
              <div className="lg:hidden">
                <NavItems />
              </div>
              <div
                className={cn(
                  'flex w-full flex-col space-y-3 duration-200 sm:flex-row sm:gap-3 sm:space-y-0 md:w-fit',
                  isScrolled && 'lg:opacity-0 lg:blur-[4px]',
                )}
              >
                <VeilButton asChild variant="ghost" size="sm">
                  <a href="/vx/latest/docs">
                    <span>Read Docs</span>
                  </a>
                </VeilButton>
                <VeilButton asChild size="sm">
                  <a href="/vx/latest">
                    <span>Install vx</span>
                  </a>
                </VeilButton>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}

const NavItems = () => {
  return (
    <ul className="flex gap-1 max-lg:flex-col">
      {menuItems.map((item) => (
        <li key={item.name}>
          <VeilButton
            asChild
            variant="ghost"
            size="sm"
            className="w-full max-lg:h-12 max-lg:justify-start max-lg:text-lg"
          >
            <a href={item.href} className="text-base">
              <span>{item.name}</span>
            </a>
          </VeilButton>
        </li>
      ))}
    </ul>
  )
}

const FloatingNavPill = ({ isScrolled }: { isScrolled: boolean }) => {
  return (
    <motion.div
      animate={{
        gap: isScrolled ? '1rem' : '0rem',
        background: isScrolled ? 'var(--color-card)' : 'transparent',
      }}
      transition={{ duration: 0.5, type: 'spring', bounce: 0.1 }}
      className={cn(
        'absolute inset-0 z-50 m-auto flex size-fit h-11 items-center rounded-lg transition-colors duration-500',
        isScrolled &&
          'ring-border shadow-foreground/6.5 shadow-lg ring-1 backdrop-blur',
      )}
    >
      <a href="/" aria-label="home" className="px-3.5">
        {isScrolled ? (
          <Logo className="w-fit" />
        ) : (
          <div className="flex items-center gap-2">
            <Logo className="w-fit" />
            <span className="font-semibold text-lg">Vandor</span>
          </div>
        )}
      </a>
      <AnimatePresence initial={false}>
        {isScrolled && (
          <motion.div
            initial={{
              opacity: 0,
              x: -156,
              scale: 0.8,
              filter: 'blur(4px)',
              width: 0,
            }}
            animate={{
              opacity: 1,
              x: 0,
              scale: 1,
              filter: 'blur(0px)',
              width: 'auto',
            }}
            exit={{
              opacity: 0,
              x: -156,
              scale: 0.8,
              filter: 'blur(4px)',
              width: 0,
            }}
            transition={{ duration: 0.5, type: 'spring', bounce: 0.1 }}
            className="flex origin-left items-center overflow-hidden rounded-full"
          >
            <NavItems />
            <VeilButton asChild size="sm" className="mx-2 gap-1 pr-1">
              <a href="/vx/latest">
                <span>Install vx</span>
                <ChevronRight className="opacity-50" />
              </a>
            </VeilButton>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
