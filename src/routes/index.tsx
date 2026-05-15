import { createFileRoute } from '@tanstack/react-router'
import { HomeLanding } from '../components/home-landing'

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  return <HomeLanding />
}
