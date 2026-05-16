import { HomeLanding } from '#/components/home-landing'

type VxLandingPageProps = {
  requestedVersion: string
}

export function VxLandingPage({ requestedVersion }: VxLandingPageProps) {
  return <HomeLanding requestedVersion={requestedVersion} />
}
