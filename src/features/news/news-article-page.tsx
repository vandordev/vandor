import { useMemo } from 'react'
import { ArrowLeft } from 'lucide-react'
import { rendererFromSerialized } from '@fumadocs/local-md/client'

import Footer5 from '#/components/footer-5'
import { HeroHeader } from '#/components/header'
import { LandingSection } from '#/components/landing-section'
import { useMDXComponents } from '#/components/mdx'
import { getSiteShellContent } from '#/components/site-shell-content'

import type { NewsArticleData } from '#/features/news/news-types'

function formatDate(value: string) {
  return new Intl.DateTimeFormat('en', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(value))
}

function formatKind(value: string) {
  return value.replace('-', ' ')
}

type NewsArticlePageProps = {
  data: NewsArticleData
}

export function NewsArticlePage({ data }: NewsArticlePageProps) {
  const shellContent = getSiteShellContent({ variant: 'vandor' })
  const renderer = useMemo(() => rendererFromSerialized(data.render), [data.render])
  const { body } = renderer.renderSync(useMDXComponents())

  return (
    <>
      <HeroHeader content={shellContent} />
      <main className="bg-background text-foreground">
        <LandingSection className="pt-28 sm:pt-32 lg:pt-36">
          <article className="mx-auto max-w-6xl">
            <a
              href="/news"
              className="mb-10 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="size-4" />
              <span>Back to News</span>
            </a>

            <div className="grid gap-12 lg:grid-cols-[190px_minmax(0,1fr)] lg:gap-16">
              <div className="space-y-6 border-border/80 lg:sticky lg:top-28 lg:self-start lg:border-r lg:pr-8">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">
                    Vandor News
                  </p>
                  <p className="text-[0.94rem] text-foreground/78">
                    {formatKind(data.kind)}
                  </p>
                </div>

                <div className="space-y-1.5 text-[0.94rem] text-muted-foreground">
                  <p className="tabular-nums">{formatDate(data.publishedAt)}</p>
                  <p className="leading-6">{data.authors.join(', ')}</p>
                </div>

                {data.products.length > 0 ? (
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">
                      Product
                    </p>
                    <p className="text-[0.94rem] leading-6 text-foreground/78">
                      {data.products.join(', ')}
                    </p>
                  </div>
                ) : null}
              </div>

              <div className="min-w-0 space-y-14">
                <header className="space-y-7">
                  <div className="space-y-5">
                    <h1 className="max-w-4xl text-balance text-[clamp(2.65rem,6vw,4.65rem)] leading-[1] font-medium tracking-[-0.052em] [font-kerning:normal]">
                      {data.title}
                    </h1>
                    <p className="max-w-[44rem] text-[1.08rem] leading-8 text-muted-foreground sm:text-[1.28rem] sm:leading-9">
                      {data.summary}
                    </p>
                  </div>

                  <div className="border-b border-border/80" />
                </header>

                <figure className="overflow-hidden rounded-[1.6rem] border border-border/70">
                  <img
                    src={data.coverImage}
                    alt={data.title}
                    className="aspect-[16/9] w-full object-cover"
                  />
                </figure>

                <div className="max-w-[68ch]">
                  <div className="prose prose-invert prose-neutral max-w-none text-[1.03rem] leading-[1.92] [font-kerning:normal] prose-headings:font-medium prose-headings:tracking-[-0.04em] prose-h2:mt-18 prose-h2:mb-5 prose-h2:text-[2rem] prose-h2:leading-[1.08] prose-h3:mt-14 prose-h3:mb-4 prose-h3:text-[1.48rem] prose-h3:leading-[1.14] prose-p:my-6 prose-p:text-foreground/88 prose-p:leading-[1.95] prose-ul:my-8 prose-ol:my-8 prose-li:my-2 prose-li:text-foreground/82 prose-strong:font-medium prose-strong:text-foreground prose-a:text-foreground prose-a:underline prose-a:decoration-border prose-a:underline-offset-4 prose-code:rounded prose-code:bg-card prose-code:px-1.5 prose-code:py-0.5 prose-code:text-[0.92em] prose-code:text-foreground prose-pre:rounded-2xl prose-pre:border prose-pre:border-border/80 prose-pre:bg-card/70 prose-img:rounded-2xl prose-blockquote:my-10 prose-blockquote:border-l-0 prose-blockquote:pl-0 prose-blockquote:text-[1.15rem] prose-blockquote:leading-9 prose-blockquote:text-foreground/72 prose-hr:my-14 prose-hr:border-border/80">
                    {body}
                  </div>
                </div>
              </div>
            </div>
          </article>
        </LandingSection>

        <LandingSection className="pt-12 sm:pt-16 lg:pt-20">
          <Footer5 content={shellContent} />
        </LandingSection>
      </main>
    </>
  )
}
