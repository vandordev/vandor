import { createFileRoute } from '@tanstack/react-router'
import { HomeLanding } from '../components/home-landing'
import {
  getHomeDescription,
  getHomeTitle,
} from '#/features/home/home-metadata'
import { loadNewsIndex } from '#/features/news/load-news-index'
import { loadWritingIndex } from '#/features/writing/load-writing-index'
import {
  buildSeoHead,
  getWebsiteStructuredData,
} from '#/lib/seo'

export const Route = createFileRoute('/')({
  loader: async () => {
    const [newsData, writingData] = await Promise.all([
      loadNewsIndex(),
      loadWritingIndex(),
    ])

    return {
      newsData,
      writingData,
    }
  },
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
  const { newsData, writingData } = Route.useLoaderData()

  return <HomeLanding newsData={newsData} writingData={writingData} />
}
