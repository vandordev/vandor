import { createFileRoute } from '@tanstack/react-router'

import {
  getCollaborateDescription,
  getCollaborateTitle,
} from '#/features/collaborate/collaborate-metadata'
import { VandorCollaboratePage } from '#/features/collaborate/vandor-collaborate-page'
import {
  buildSeoHead,
  getCollectionPageStructuredData,
} from '#/lib/seo'

export const Route = createFileRoute('/collaborate/')({
  head: () =>
    buildSeoHead({
      title: getCollaborateTitle(),
      description: getCollaborateDescription(),
      path: '/collaborate/',
      imagePath: '/images/og/vandor-home.svg',
      structuredData: getCollectionPageStructuredData({
        title: getCollaborateTitle(),
        description: getCollaborateDescription(),
        path: '/collaborate/',
      }),
    }),
  component: CollaborateRoute,
})

function CollaborateRoute() {
  return <VandorCollaboratePage />
}
