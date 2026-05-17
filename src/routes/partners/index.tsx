import { createFileRoute } from '@tanstack/react-router'

import {
  getPartnersDescription,
  getPartnersTitle,
} from '#/features/partners/partner-metadata'
import { VandorPartnersPage } from '#/features/partners/vandor-partners-page'

export const Route = createFileRoute('/partners/')({
  head: () => ({
    meta: [
      {
        title: getPartnersTitle(),
      },
      {
        name: 'description',
        content: getPartnersDescription(),
      },
    ],
  }),
  component: PartnersRoute,
})

function PartnersRoute() {
  return <VandorPartnersPage />
}
