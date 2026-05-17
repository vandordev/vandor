import { createFileRoute } from '@tanstack/react-router'
import { HomeLanding } from '../components/home-landing'
import {
  getHomeDescription,
  getHomeTitle,
} from '#/features/home/home-metadata'
import { loadNewsIndex } from '#/features/news/load-news-index'
import {
  buildSeoHead,
  getWebsiteStructuredData,
} from '#/lib/seo'

export const Route = createFileRoute('/')({
  loader: () => loadNewsIndex(),
  head: () =>
    buildSeoHead({
      title: getHomeTitle(),
      description: getHomeDescription(),
      path: '/',
      imagePath: '/images/og/vandor-home.svg',
      structuredData: getWebsiteStructuredData(),
    }),
  component: Home,
})

function Home() {
  return <HomeLanding newsData={Route.useLoaderData()} />
}
