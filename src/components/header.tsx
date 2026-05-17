import React from 'react'
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from 'motion/react'
import { ChevronDown, ChevronRight, Menu, X } from 'lucide-react'

import { useMedia } from '#/hooks/use-media'
import { cn } from '#/lib/utils'
import { Logo } from '#/components/logo'
import type {
  SiteShellBrand,
  SiteShellContent,
  SiteShellProduct,
} from '#/components/site-shell-content'
import { VeilButton } from '#/components/ui/veil-button'

type HeroHeaderProps = {
  content: SiteShellContent
}

function getBrandHref(brand: SiteShellBrand) {
  return brand.kind === 'vx' ? '/vx' : '/'
}

export const HeroHeader = ({ content }: HeroHeaderProps) => {
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
                <NavItems items={content.navItems} />
              </div>
              <a
                href={getBrandHref(content.brand)}
                aria-label="home"
                className="flex items-center gap-2 lg:hidden"
              >
                <HeaderBrand brand={content.brand} />
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

            {isLarge && (
              <FloatingNavPill content={content} isScrolled={isScrolled} />
            )}

            <div className="bg-card ring-border in-data-[state=active]:block lg:in-data-[state=active]:flex mb-6 hidden w-full flex-wrap items-center justify-end space-y-8 rounded-3xl p-6 shadow-2xl shadow-zinc-300/20 ring-1 md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:bg-transparent lg:p-0 lg:shadow-none lg:ring-transparent dark:shadow-none dark:lg:bg-transparent">
              <div className="lg:hidden">
                <NavItems items={content.navItems} />
              </div>
              <div
                className={cn(
                  'flex w-full flex-col space-y-3 duration-200 sm:flex-row sm:gap-3 sm:space-y-0 md:w-fit',
                  isScrolled && 'lg:opacity-0 lg:blur-[4px]',
                )}
              >
                {content.headerCtas.secondary && (
                  <VeilButton asChild variant="ghost" size="sm">
                    <a href={content.headerCtas.secondary.href}>
                      <span>{content.headerCtas.secondary.label}</span>
                    </a>
                  </VeilButton>
                )}
                {content.headerCtas.primary && (
                  <VeilButton asChild size="sm">
                    <a href={content.headerCtas.primary.href}>
                      <span>{content.headerCtas.primary.label}</span>
                    </a>
                  </VeilButton>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}

function HeaderBrand({
  brand,
  hideVandorLabel = false,
}: {
  brand: SiteShellBrand
  hideVandorLabel?: boolean
}) {
  return (
    <div className="flex items-center gap-2">
      <Logo className="w-fit" />
      {brand.kind === 'vandor' ? (
        hideVandorLabel ? null : (
        <span className="font-semibold text-lg">Vandor</span>
        )
      ) : (
        <>
          <span className="text-muted-foreground">/</span>
          <span className="font-semibold text-lg">vx</span>
        </>
      )}
    </div>
  )
}

const NavItems = ({ items }: { items: SiteShellContent['navItems'] }) => {
  return (
    <ul className="flex gap-1 max-lg:flex-col">
      {items.map((item) => (
        <li key={item.label}>
          {item.label === 'Products' ? (
            <ProductsNavItem />
          ) : (
            <VeilButton
              asChild
              variant="ghost"
              size="sm"
              className="w-full max-lg:h-12 max-lg:justify-start max-lg:text-lg"
            >
              <a href={item.href} className="text-base">
                <span>{item.label}</span>
              </a>
            </VeilButton>
          )}
        </li>
      ))}
    </ul>
  )
}

function ProductsNavItem() {
  return (
    <div className="group/products relative">
      <VeilButton
        variant="ghost"
        size="sm"
        className="w-full gap-1.5 max-lg:h-12 max-lg:justify-start max-lg:text-lg"
        type="button"
      >
        <span className="text-base">Products</span>
        <ChevronDown className="size-3.5 opacity-55 transition-transform duration-200 lg:group-hover/products:rotate-180" />
      </VeilButton>

      <div className="lg:pointer-events-none lg:absolute lg:left-0 lg:top-full lg:z-30 lg:w-[19rem] lg:pt-2 lg:opacity-0 lg:transition-all lg:duration-200 lg:group-hover/products:pointer-events-auto lg:group-hover/products:opacity-100">
        <ProductsPanel />
      </div>
      <div className="lg:hidden">
        <ProductsPanel compact />
      </div>
    </div>
  )
}

function ProductsPanel({ compact = false }: { compact?: boolean }) {
  const product: SiteShellProduct = {
    label: 'vx',
    href: '/vx/latest',
    description: 'CLI for structured Go backends.',
    secondaryHref: '/vx/latest/docs',
    secondaryLabel: 'Docs',
  }

  return (
    <div
      className={cn(
        'mt-2 rounded-[1.35rem] border border-border/70 bg-card/95 p-3 shadow-2xl shadow-black/18 backdrop-blur',
        compact
          ? 'block lg:hidden'
          : 'hidden lg:block',
      )}
    >
      <div className="group rounded-[1rem] p-3 transition-colors hover:bg-background/55">
        <div className="space-y-2">
          <div className="flex items-center justify-between gap-3">
            <a
              href={product.href}
              className="text-[1.05rem] leading-none font-medium tracking-[-0.03em]"
            >
              {product.label}
            </a>
            {product.secondaryHref && product.secondaryLabel && (
              <a
                href={product.secondaryHref}
                className="text-xs text-muted-foreground transition-colors hover:text-foreground"
              >
                {product.secondaryLabel}
              </a>
            )}
          </div>
          <p className="max-w-[24ch] text-sm leading-6 text-muted-foreground">{product.description}</p>
        </div>
      </div>
    </div>
  )
}

const FloatingNavPill = ({
  content,
  isScrolled,
}: {
  content: SiteShellContent
  isScrolled: boolean
}) => {
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
      <a
        href={getBrandHref(content.brand)}
        aria-label="home"
        className="px-3.5"
      >
        <HeaderBrand
          brand={content.brand}
          hideVandorLabel={content.brand.kind === 'vandor' && isScrolled}
        />
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
            className="flex origin-left items-center overflow-visible rounded-full"
          >
            <NavItems items={content.navItems} />
            {content.headerCtas.primary && (
              <VeilButton asChild size="sm" className="mx-2 gap-1 pr-1">
                <a href={content.headerCtas.primary.href}>
                  <span>{content.headerCtas.primary.label}</span>
                  <ChevronRight className="opacity-50" />
                </a>
              </VeilButton>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
