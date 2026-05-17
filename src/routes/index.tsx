import { createFileRoute } from '@tanstack/react-router'
import { HomeLanding } from '../components/home-landing'
import { loadNewsIndex } from '#/features/news/load-news-index'

export const Route = createFileRoute('/')({
  loader: () => loadNewsIndex(),
  component: Home,
})

function Home() {
  return <HomeLanding newsData={Route.useLoaderData()} />
}
