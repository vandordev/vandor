import { createFileRoute } from '@tanstack/react-router'

import { getSitemapXml } from '#/lib/sitemap'

export const Route = createFileRoute('/sitemap/xml')({
  server: {
    handlers: {
      GET: async () => {
        return new Response(await getSitemapXml(), {
          headers: {
            'Content-Type': 'application/xml; charset=utf-8',
          },
        })
      },
    },
  },
})

