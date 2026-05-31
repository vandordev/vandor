import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/vxt/')({
  beforeLoad: () => {
    throw redirect({
      to: '/vxt/$version/docs',
      params: {
        version: 'latest',
      },
    })
  },
})
