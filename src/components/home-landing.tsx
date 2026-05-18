import Footer5 from '#/components/footer-5'
import { HeroHeader } from '#/components/header'
import { LandingSection } from '#/components/landing-section'
import { getSiteShellContent } from '#/components/site-shell-content'
import { VandorHomeHero } from '#/features/home/vandor-home-hero'
import { VandorOpenWork } from '#/features/home/vandor-open-work'
import { VandorHomeHighlights } from '#/features/news/vandor-home-highlights'
import type { NewsIndexData } from '#/features/news/news-types'
import { VandorHomePartners } from '#/features/partners/vandor-home-partners'

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
        <LandingSection className="pt-24 sm:pt-30 lg:pt-40">
          <VandorOpenWork />
        </LandingSection>
        <LandingSection className="pt-24 sm:pt-30 lg:pt-40">
          <VandorHomePartners />
        </LandingSection>
        {newsData ? (
          <LandingSection className="pt-24 sm:pt-30 lg:pt-40">
            <VandorHomeHighlights data={newsData} />
          </LandingSection>
        ) : null}
        <LandingSection className="pt-40 sm:pt-48 lg:pt-60" contentClassName="">
          <Footer5 content={shellContent} />
        </LandingSection>
      </main>
    </>
  )
}
