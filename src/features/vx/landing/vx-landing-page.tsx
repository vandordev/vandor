import Footer5 from '#/components/footer-5'
import { HeroHeader } from '#/components/header'
import { LandingSection } from '#/components/landing-section'
import { getSiteShellContent } from '#/components/site-shell-content'
import { VxHeroSection2 } from '#/features/vx/landing/vx-hero-section-2'
import type { RequestedVxVersion } from '#/features/vx/versioning/version-types'

type VxLandingPageProps = {
  requestedVersion: RequestedVxVersion
}

export function VxLandingPage({ requestedVersion }: VxLandingPageProps) {
  const shellContent = getSiteShellContent({
    variant: 'vx',
    requestedVersion,
  })

  return (
    <>
      <HeroHeader content={shellContent} />
      <main className="bg-background text-foreground">
        <VxHeroSection2 requestedVersion={requestedVersion} />

        <LandingSection
          id="why-vx"
          className="pt-12 sm:pt-16 lg:pt-20"
          contentClassName=""
        >
          <Footer5 content={shellContent} />
        </LandingSection>
      </main>
    </>
  )
}
