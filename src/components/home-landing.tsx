import Footer5 from '#/components/footer-5'
import { HeroHeader } from '#/components/header'
import { LandingSection } from '#/components/landing-section'
import { getSiteShellContent } from '#/components/site-shell-content'
import { VandorHomeHero } from '#/features/home/vandor-home-hero'
import { VandorOpenWork } from '#/features/home/vandor-open-work'
import { VandorHomeHighlights } from '#/features/news/vandor-home-highlights'
import type { NewsIndexData } from '#/features/news/news-types'
import { VandorHomePartners } from '#/features/partners/vandor-home-partners'
import { VandorHomeWriting } from '#/features/writing/vandor-home-writing'
import type { WritingIndexData } from '#/features/writing/writing-types'

type HomeLandingProps = {
  newsData?: NewsIndexData
  writingData?: WritingIndexData
}

export function HomeLanding({ newsData, writingData }: HomeLandingProps) {
  const shellContent = getSiteShellContent({ variant: 'vandor' })

  return (
    <>
      <HeroHeader content={shellContent} />
      <main>
        <VandorHomeHero />
        <LandingSection className="pt-24 sm:pt-30 lg:pt-40">
          <VandorOpenWork />
        </LandingSection>
        {writingData ? (
          <LandingSection className="pt-28 sm:pt-34 lg:pt-44">
            <VandorHomeWriting data={writingData} />
          </LandingSection>
        ) : null}
        {newsData ? (
          <LandingSection className="pt-28 sm:pt-34 lg:pt-44">
            <VandorHomeHighlights data={newsData} />
          </LandingSection>
        ) : null}
        <LandingSection className="pt-32 sm:pt-38 lg:pt-48">
          <VandorHomePartners />
        </LandingSection>
        <LandingSection className="pt-40 sm:pt-48 lg:pt-60" contentClassName="">
          <Footer5 content={shellContent} />
        </LandingSection>
      </main>
    </>
  )
}
