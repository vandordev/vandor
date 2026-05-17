import Footer5 from '#/components/footer-5'
import HeroSection4 from '#/components/hero-section-4'
import { LandingSection } from '#/components/landing-section'
import { getSiteShellContent } from '#/components/site-shell-content'
import RotatingGradientRight from '#/components/ui/rotating-gradient-right'
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
    <main>
      <HeroSection4 />
      <LandingSection id="products">
        <RotatingGradientRight docsHref={`/vx/${requestedVersion}/docs`} />
      </LandingSection>
      {newsData ? (
        <LandingSection className="pt-12 sm:pt-16 lg:pt-20">
          <VandorHomeHighlights data={newsData} />
        </LandingSection>
      ) : null}
      <LandingSection contentClassName="">
        <Footer5 content={shellContent} />
      </LandingSection>
    </main>
  )
}
