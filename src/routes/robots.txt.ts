import { createFileRoute } from '@tanstack/react-router'

import { getAbsoluteUrl, getSiteUrl } from '#/lib/seo'

export const Route = createFileRoute('/robots/txt')({
  server: {
    handlers: {
      GET: async () => {
        const body = [
          'User-agent: *',
          'Allow: /',
          `Host: ${new URL(getSiteUrl()).host}`,
          `Sitemap: ${getAbsoluteUrl('/sitemap.xml')}`,
        ].join('\n')

        return new Response(body, {
          headers: {
            'Content-Type': 'text/plain; charset=utf-8',
          },
        })
      },
    },
  },
})

