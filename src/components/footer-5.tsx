import { LogoIcon } from '#/components/logo'
import type { SiteShellContent } from '#/components/site-shell-content'
// import { ThemeSwitcher } from '#/components/theme-switcher'

type Footer5Props = {
  content: Pick<SiteShellContent, 'footerLinks'>
}

export default function Footer5({ content }: Footer5Props) {
  return (
    <footer className="mt-8 w-full border-t border-border/70 py-12 sm:mt-10 sm:py-14 lg:mt-12">
      <div className="flex flex-col gap-10">
        <a
          href="/"
          aria-label="go home"
          className="hover:bg-foreground/5 -ml-1.5 rounded-lg *:m-auto w-fit"
        >
          <LogoIcon className="size-20" />
        </a>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1fr)] lg:items-start">
          <div className="space-y-3">
            <p className="max-w-[26ch] text-balance text-[1.3rem] leading-[1.1] font-medium tracking-[-0.04em]">
              Vandor is a public-interest technical organization building
              tools, reference, and writing that are meant to stay useful.
            </p>
            <p className="max-w-[40ch] text-sm leading-6 text-muted-foreground">
              The site brings together products, documentation, writing, news,
              and collaboration paths so the work can be understood as one
              living ecosystem.
            </p>
          </div>

          <nav className="flex flex-wrap gap-x-8 gap-y-3">
            {content.footerLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-muted-foreground hover:text-foreground text-sm transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        {/* <ThemeSwitcher /> */}

        <p className="text-muted-foreground border-t border-border/70 pt-6 text-sm">
          &copy; {2026} Vandor.
        </p>
      </div>
    </footer>
  )
}
