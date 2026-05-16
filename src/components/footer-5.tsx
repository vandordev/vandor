import { LogoIcon } from '#/components/logo'
// import { ThemeSwitcher } from '#/components/theme-switcher'

const links = [
  { label: 'vx Landing', href: '/vx/latest' },
  { label: 'Documentation', href: '/vx/latest/docs' },
  { label: 'Getting Started', href: '/vx/latest/docs/getting-started' },
  { label: 'CLI Reference', href: '/vx/latest/docs' },
  { label: 'GitHub', href: '#' },
]

export default function Footer5() {
  return (
    <footer className="w-full py-12">
      <div className="flex flex-col">
        <a
          href="/"
          aria-label="go home"
          // className="hover:bg-foreground/5 -ml-1.5 flex size-8 rounded-lg *:m-auto"
          className="hover:bg-foreground/5 -ml-1.5 rounded-lg *:m-auto w-fit"
        >
          <LogoIcon className="size-20" />
        </a>
        <nav className="my-8 flex flex-wrap gap-x-8 gap-y-2">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-muted-foreground hover:text-foreground text-sm transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* <ThemeSwitcher /> */}

        <p className="text-muted-foreground mt-2 border-t pt-6 text-sm">
          &copy; {2026} Vandor.
        </p>
      </div>
    </footer>
  )
}
