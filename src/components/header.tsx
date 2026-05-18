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
        <div className="mx-auto max-w-7xl px-3 pt-3 sm:px-6 lg:px-6">
          <div className="lg:hidden">
            <div className="relative overflow-hidden rounded-[1.55rem] border border-white/12 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] shadow-[0_20px_52px_rgba(0,0,0,0.28)]">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_0%,rgba(96,128,255,0.18),transparent_34%),linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02)_28%,rgba(0,0,0,0.16)_100%)]"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-[1px] rounded-[calc(1.55rem-1px)] border border-white/7"
              />
              <div className="relative bg-black/58 backdrop-blur-2xl">
              <div className="flex items-center justify-between px-3.5 py-2.5">
                <a
                  href={getBrandHref(content.brand)}
                  aria-label="home"
                  className="flex min-w-0 items-center gap-2"
                >
                  <HeaderBrand brand={content.brand} compact />
                </a>

                <button
                  onClick={() => setMenuState(!menuState)}
                  aria-label={menuState ? 'Close Menu' : 'Open Menu'}
                  className="relative flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-full border border-white/12 bg-white/5 text-foreground/90 transition-colors duration-200 hover:bg-white/8"
                  type="button"
                >
                  <Menu className="in-data-[state=active]:rotate-180 in-data-[state=active]:scale-0 in-data-[state=active]:opacity-0 m-auto size-[1.05rem] duration-200" />
                  <X className="in-data-[state=active]:rotate-0 in-data-[state=active]:scale-100 in-data-[state=active]:opacity-100 absolute inset-0 m-auto size-[1.05rem] -rotate-180 scale-0 opacity-0 duration-200" />
                </button>
              </div>

              <AnimatePresence initial={false}>
                {menuState && (
                  <motion.div
                    initial={{ opacity: 0, height: 0, y: -8 }}
                    animate={{ opacity: 1, height: 'auto', y: 0 }}
                    exit={{ opacity: 0, height: 0, y: -8 }}
                  transition={{ duration: 0.24, ease: 'easeOut' }}
                    className="overflow-hidden border-t border-white/10"
                  >
                    <div className="space-y-4 px-2.5 pb-2.5 pt-1.5">
                      <NavItems
                        items={content.navItems}
                        productItems={content.productItems}
                        mobile
                      />
                      <div className="flex flex-col gap-2">
                        {content.headerCtas.secondary && (
                          <VeilButton asChild variant="ghost" size="sm" className="h-10 justify-between rounded-full px-4">
                            <a href={content.headerCtas.secondary.href}>
                              <span>{content.headerCtas.secondary.label}</span>
                              <ChevronRight className="opacity-45" />
                            </a>
                          </VeilButton>
                        )}
                        {content.headerCtas.primary && (
                          <VeilButton asChild size="sm" className="h-10 justify-between rounded-full px-4">
                            <a href={content.headerCtas.primary.href}>
                              <span>{content.headerCtas.primary.label}</span>
                              <ChevronRight className="opacity-45" />
                            </a>
                          </VeilButton>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              </div>
            </div>
          </div>

          <div className="relative hidden flex-wrap items-center justify-between gap-6 py-6 lg:flex lg:gap-0">
            <div
              className={cn(
                'flex justify-between gap-6 duration-200 max-lg:w-full',
                isScrolled && 'lg:opacity-0 lg:blur-[4px]',
              )}
            >
              <div className="hidden size-fit lg:block">
                <NavItems
                  items={content.navItems}
                  productItems={content.productItems}
                />
              </div>
            </div>

            {isLarge && (
              <FloatingNavPill content={content} isScrolled={isScrolled} />
            )}

            <div className="bg-card ring-border in-data-[state=active]:block lg:in-data-[state=active]:flex mb-6 hidden w-full flex-wrap items-center justify-end space-y-8 rounded-3xl p-6 shadow-2xl shadow-zinc-300/20 ring-1 md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:bg-transparent lg:p-0 lg:shadow-none lg:ring-transparent dark:shadow-none dark:lg:bg-transparent">
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
  compact = false,
}: {
  brand: SiteShellBrand
  hideVandorLabel?: boolean
  compact?: boolean
}) {
  return (
    <div className="flex items-center gap-2">
      <Logo className={cn('w-fit', compact && 'h-8')} />
      {brand.kind === 'vandor' ? (
        hideVandorLabel ? null : (
        <span className={cn('font-semibold text-lg', compact && 'text-base')}>
          Vandor
        </span>
        )
      ) : (
        <>
          <span className="text-muted-foreground">/</span>
          <span className={cn('font-semibold text-lg', compact && 'text-base')}>
            vx
          </span>
        </>
      )}
    </div>
  )
}

const NavItems = ({
  items,
  productItems = [],
  mobile = false,
}: {
  items: SiteShellContent['navItems']
  productItems?: SiteShellContent['productItems']
  mobile?: boolean
}) => {
  return (
    <ul className={cn('flex gap-1', mobile && 'flex-col')}>
      {items.map((item) => (
        <li key={item.label}>
          {item.label === 'Products' ? (
            <ProductsNavItem mobile={mobile} products={productItems} />
          ) : (
              <VeilButton
                asChild
                variant="ghost"
                size="sm"
                className={cn(
                  'w-full',
                  mobile && 'h-12 justify-start rounded-2xl px-4 text-lg',
                )}
              >
                <a href={item.href} className={mobile ? 'text-lg' : 'text-sm'}>
                  <span>{item.label}</span>
                </a>
              </VeilButton>
            )}
          </li>
        ))}
    </ul>
  )
}

function ProductsNavItem({
  mobile = false,
  products,
}: {
  mobile?: boolean
  products: SiteShellProduct[]
}) {
  const [isOpen, setIsOpen] = React.useState(false)

  if (mobile) {
    return (
      <div className="rounded-[1.4rem] border border-white/8 bg-white/[0.03] p-1">
      <button
        type="button"
        onClick={() => setIsOpen((value) => !value)}
        className="flex h-12 w-full items-center justify-between rounded-[1rem] px-4 text-left text-base"
      >
          <span>Products</span>
          <ChevronDown
            className={cn(
              'size-4 opacity-55 transition-transform duration-200',
              isOpen && 'rotate-180',
            )}
          />
        </button>
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="overflow-hidden"
            >
              <div className="px-2 pb-2">
                <ProductsPanel mobile products={products} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    )
  }

  return (
    <div className="group/products relative">
      <VeilButton
        variant="ghost"
        size="sm"
        className="w-full gap-1.5 text-sm"
        type="button"
      >
        <span>Products</span>
        <ChevronDown className="size-3.5 opacity-55 transition-transform duration-200 lg:group-hover/products:rotate-180" />
      </VeilButton>

      <div className="lg:pointer-events-none lg:absolute lg:left-0 lg:top-full lg:z-30 lg:w-[19rem] lg:pt-2 lg:opacity-0 lg:transition-all lg:duration-200 lg:group-hover/products:pointer-events-auto lg:group-hover/products:opacity-100">
        <ProductsPanel products={products} />
      </div>
    </div>
  )
}

function ProductsPanel({
  products,
  compact = false,
  mobile = false,
}: {
  products: SiteShellProduct[]
  compact?: boolean
  mobile?: boolean
}) {
  return (
    <div
      className={cn(
        'mt-2 rounded-[1.35rem] border border-border/70 bg-card/95 p-3 shadow-2xl shadow-black/18 backdrop-blur',
        compact && 'block lg:hidden',
        mobile
          ? 'mt-0 rounded-[1rem] border-white/8 bg-white/[0.03] p-2 shadow-none'
          : compact
            ? 'block lg:hidden'
            : 'hidden lg:block',
      )}
    >
      <div className="space-y-1.5">
        {products.map((product) => {
          const isComingSoon = product.status === 'coming-soon'

          return (
            <div
              key={product.label}
              className={cn(
                'rounded-[1rem] p-3',
                isComingSoon
                  ? 'bg-white/[0.02] opacity-72'
                  : 'group relative transition-colors hover:bg-background/55',
              )}
            >
              {product.href && !isComingSoon ? (
                <>
                  <a
                    href={product.href}
                    className="absolute inset-0 rounded-[1rem]"
                    aria-label={product.label}
                  />
                  <div className="pointer-events-none relative z-10 space-y-2">
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-[1.05rem] leading-none font-medium tracking-[-0.03em]">
                        {product.label}
                      </span>
                      <ChevronRight className="size-4 text-muted-foreground/70 transition-transform duration-200 group-hover:translate-x-0.5" />
                    </div>
                    <p className="max-w-[24ch] text-sm leading-6 text-muted-foreground">
                      {product.description}
                    </p>
                  </div>
                </>
              ) : (
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-[1.05rem] leading-none font-medium tracking-[-0.03em]">
                      {product.label}
                    </span>
                    <span className="text-[0.72rem] font-medium tracking-[0.02em] text-muted-foreground">
                      Coming soon
                    </span>
                  </div>
                  <p className="max-w-[24ch] text-sm leading-6 text-muted-foreground">
                    {product.description}
                  </p>
                </div>
              )}
            </div>
          )
        })}
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
        background: isScrolled ? 'rgba(8, 10, 18, 0.72)' : 'transparent',
      }}
      transition={{ duration: 0.5, type: 'spring', bounce: 0.1 }}
      className={cn(
        'absolute inset-0 z-50 m-auto flex size-fit h-12 items-center rounded-[1.15rem] transition-colors duration-500',
        isScrolled &&
          'border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.34)] backdrop-blur-2xl',
      )}
      style={
        isScrolled
          ? {
              boxShadow:
                '0 20px 50px rgba(0,0,0,0.34), inset 0 1px 0 rgba(255,255,255,0.12), inset 0 -1px 0 rgba(84,118,255,0.12)',
            }
          : undefined
      }
    >
      {isScrolled && (
        <>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-[1.15rem] bg-[radial-gradient(circle_at_0%_0%,rgba(88,122,255,0.16),transparent_32%),linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02)_28%,rgba(0,0,0,0.12)_100%)]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-[1px] rounded-[calc(1.15rem-1px)] ring-1 ring-inset ring-white/7"
          />
        </>
      )}
      <a
        href={getBrandHref(content.brand)}
        aria-label="home"
        className="relative z-10 px-3.5"
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
            className="relative z-10 flex origin-left items-center overflow-visible rounded-[1rem]"
          >
            <NavItems
              items={content.navItems}
              productItems={content.productItems}
            />
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
