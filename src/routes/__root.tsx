import {
  HeadContent,
  Scripts,
  createRootRouteWithContext,
} from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'
import { RootProvider } from 'fumadocs-ui/provider/tanstack'

import TanStackQueryDevtools from '../integrations/tanstack-query/devtools'
import { ThemeProvider } from '../components/theme-provider'

import { env } from '#/env'
import {
  defaultTitle,
  getOrganizationStructuredData,
} from '#/lib/seo'
import { getLocale } from '#/paraglide/runtime'

import appCss from '../styles.css?url'

import type { QueryClient } from '@tanstack/react-query'

interface MyRouterContext {
  queryClient: QueryClient
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  beforeLoad: async () => {
    // Other redirect strategies are possible; see
    // https://github.com/TanStack/router/tree/main/examples/react/i18n-paraglide#offline-redirect
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('lang', getLocale())
    }
  },

  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: defaultTitle,
      },
      {
        name: 'application-name',
        content: 'Vandor',
      },
      {
        name: 'apple-mobile-web-app-title',
        content: 'Vandor',
      },
      {
        name: 'theme-color',
        content: '#000000',
      },
      {
        name: 'color-scheme',
        content: 'dark',
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
      {
        rel: 'shortcut icon',
        href: '/favicon.ico',
      },
      {
        rel: 'icon',
        href: '/favicon.ico',
        sizes: 'any',
      },
      {
        rel: 'icon',
        type: 'image/png',
        href: '/favicon-32x32.png',
        sizes: '32x32',
      },
      {
        rel: 'icon',
        type: 'image/png',
        href: '/favicon-16x16.png',
        sizes: '16x16',
      },
      {
        rel: 'apple-touch-icon',
        href: '/apple-touch-icon.png',
        sizes: '180x180',
      },
      {
        rel: 'manifest',
        href: '/manifest.json',
      },
    ],
    scripts: env.VITE_UMAMI_WEBSITE_ID
      ? [
          {
            src: 'https://cloud.umami.is/script.js',
            defer: true,
            'data-website-id': env.VITE_UMAMI_WEBSITE_ID,
          },
          {
            type: 'application/ld+json',
            children: JSON.stringify(getOrganizationStructuredData()),
          },
        ]
      : [
          {
            type: 'application/ld+json',
            children: JSON.stringify(getOrganizationStructuredData()),
          },
        ],
  }),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang={getLocale()}>
      <head>
        <HeadContent />
      </head>
      <body>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <RootProvider>
            {children}
            <TanStackDevtools
              config={{
                position: 'bottom-right',
              }}
              plugins={[
                {
                  name: 'Tanstack Router',
                  render: <TanStackRouterDevtoolsPanel />,
                },
                TanStackQueryDevtools,
              ]}
            />
            <Scripts />
          </RootProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
