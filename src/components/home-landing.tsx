import Footer5 from '#/components/footer-5'
import HeroSection4 from '#/components/hero-section-4'
import { LandingSection } from '#/components/landing-section'
import { getSiteShellContent } from '#/components/site-shell-content'
import RotatingGradientRight from '#/components/ui/rotating-gradient-right'

type HomeLandingProps = {
  requestedVersion?: string
}

export function HomeLanding({
  requestedVersion = 'latest',
}: HomeLandingProps) {
  const shellContent = getSiteShellContent({ variant: 'vandor' })

  return (
    <main>
      <HeroSection4 />
      <LandingSection id="products">
        <RotatingGradientRight docsHref={`/vx/${requestedVersion}/docs`} />
      </LandingSection>
      <LandingSection contentClassName="">
        <Footer5 content={shellContent} />
      </LandingSection>
    </main>
  )
}
