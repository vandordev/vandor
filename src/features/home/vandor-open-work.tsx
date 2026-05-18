import { ArrowRight } from 'lucide-react'

const workItems = [
  {
    title: 'vx',
    description:
      'A composable CLI that shows how Vandor turns reusable workflows into concrete products.',
    href: '/vx/latest',
    image: '/images/news/why-vandor-builds-vx.jpg',
    kind: 'Product',
    imageClass: 'object-[28%_50%]',
  },
  {
    title: 'Documentation',
    description:
      'Versioned reference that stays close to the tools and keeps the work readable as it evolves.',
    href: '/vx/latest/docs',
    image: '/images/home/vandor-signal.jpg',
    kind: 'Reference',
    imageClass: 'object-center',
  },
  {
    title: 'Writing',
    description:
      'Essays, practice notes, and technical commentary that do not need to be tied to a single product update.',
    href: '/writing',
    image: '/images/news/introducing-vandor-news.jpg',
    kind: 'Publication',
    imageClass: 'object-center',
  },
] as const

export function VandorOpenWork() {
  const [featured, ...secondary] = workItems

  return (
    <div
      id="about"
      className="space-y-10 border-t border-border/70 pt-10 sm:space-y-12 sm:pt-12 lg:space-y-14 lg:pt-14"
    >
      <div className="grid gap-5 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1fr)] lg:items-end">
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">Work in the open</p>
          <h2 className="max-w-3xl text-balance text-[clamp(2.2rem,4.8vw,4.15rem)] leading-[0.98] font-medium tracking-[-0.055em]">
            The ecosystem stays legible as it expands.
          </h2>
        </div>
        <p className="max-w-xl text-[1rem] leading-7 text-muted-foreground lg:justify-self-end">
          Products, documentation, and writing are treated as one connected
          surface. Each part makes the rest easier to understand and reuse.
        </p>
      </div>

      <div
        id="products"
        className="grid gap-6 lg:grid-cols-[minmax(0,1.08fr)_minmax(18rem,0.72fr)] lg:items-start xl:gap-8"
      >
        <a
          href={featured.href}
          className="group block space-y-5 rounded-[1.8rem] border border-border/70 bg-card/18 p-3 sm:p-4"
        >
          <div className="overflow-hidden rounded-[1.35rem] border border-border/70">
            <img
              src={featured.image}
              alt={featured.title}
              className={`aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-[1.02] ${featured.imageClass}`}
            />
          </div>

          <div className="space-y-3 px-1 pb-2">
            <p className="text-sm text-muted-foreground">{featured.kind}</p>
            <div className="space-y-2">
              <h3 className="text-balance text-[clamp(1.9rem,3vw,3rem)] leading-[1] font-medium tracking-[-0.045em]">
                {featured.title}
              </h3>
              <p className="max-w-[44ch] text-[1rem] leading-7 text-muted-foreground">
                {featured.description}
              </p>
            </div>
            <div className="inline-flex items-center gap-2 text-sm text-foreground transition-colors group-hover:text-muted-foreground">
              <span>See the product</span>
              <ArrowRight className="size-4 opacity-55" />
            </div>
          </div>
        </a>

        <div className="space-y-6">
          {secondary.map((item) => (
            <a
              key={item.title}
              href={item.href}
              className="group block space-y-4 border-t border-border/70 pt-6 first:border-t-0 first:pt-0"
            >
              <div className="overflow-hidden rounded-[1.3rem] border border-border/70 bg-card/20">
                <img
                  src={item.image}
                  alt={item.title}
                  className={`aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03] ${item.imageClass}`}
                />
              </div>

              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">{item.kind}</p>
                <h3 className="text-[1.45rem] leading-[1.06] font-medium tracking-[-0.04em]">
                  {item.title}
                </h3>
                <p className="max-w-[32ch] text-[0.96rem] leading-6 text-muted-foreground">
                  {item.description}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
