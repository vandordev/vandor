import Footer5 from '#/components/footer-5'
import HeroSection4 from '#/components/hero-section-4'
import { LandingSection } from '#/components/landing-section'
import RotatingGradientRight from '#/components/ui/rotating-gradient-right'

type HomeLandingProps = {
  requestedVersion?: string
}

export function HomeLanding({
  requestedVersion = 'latest',
}: HomeLandingProps) {
  return (
    <main>
      <HeroSection4 installHref="#link" />
      <LandingSection>
        <RotatingGradientRight docsHref={`/vx/${requestedVersion}/docs`} />
      </LandingSection>
      <LandingSection contentClassName="">
        <Footer5 />
      </LandingSection>
    </main>
  )
}
