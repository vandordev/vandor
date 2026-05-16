import Footer5 from '#/components/footer-5'
import HeroSection4 from '#/components/hero-section-4'
import { LandingSection } from '#/components/landing-section'
import RotatingGradientRight from '#/components/ui/rotating-gradient-right'

export function HomeLanding() {
  return (
    <main>
      <HeroSection4 />
      <LandingSection>
        <RotatingGradientRight />
      </LandingSection>
      <LandingSection contentClassName="">
        <Footer5 />
      </LandingSection>
    </main>
  )
}
