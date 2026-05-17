import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/vx/')({
  beforeLoad: () => {
    throw redirect({
      to: '/vx/$version',
      params: {
        version: 'latest',
      },
    })
  },
})
