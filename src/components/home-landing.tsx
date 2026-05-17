import Footer5 from '#/components/footer-5'
import { HeroHeader } from '#/components/header'
import { LandingSection } from '#/components/landing-section'
import { getSiteShellContent } from '#/components/site-shell-content'
import { VandorHomeHero } from '#/features/home/vandor-home-hero'
import { VandorOpenWork } from '#/features/home/vandor-open-work'
import { VandorHomeHighlights } from '#/features/news/vandor-home-highlights'
import type { NewsIndexData } from '#/features/news/news-types'

type HomeLandingProps = {
  newsData?: NewsIndexData
  requestedVersion?: string
}

export function HomeLanding({
  newsData,
  requestedVersion = 'latest',
}: HomeLandingProps) {
  const shellContent = getSiteShellContent({ variant: 'vandor' })

  return (
    <>
      <HeroHeader content={shellContent} />
      <main>
        <VandorHomeHero requestedVersion={requestedVersion} />
        <LandingSection className="pt-18 sm:pt-24 lg:pt-32">
          <VandorOpenWork />
        </LandingSection>
        {newsData ? (
          <LandingSection className="pt-20 sm:pt-26 lg:pt-36">
            <VandorHomeHighlights data={newsData} />
          </LandingSection>
        ) : null}
        <LandingSection className="pt-18 sm:pt-24 lg:pt-30" contentClassName="">
          <Footer5 content={shellContent} />
        </LandingSection>
      </main>
    </>
  )
}
