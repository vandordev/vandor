import { defineNitroConfig } from 'nitro/config'

export default defineNitroConfig({
  preset: 'vercel',
  serverAssets: [
    {
      baseName: 'news',
      dir: './content/news',
    },
    {
      baseName: 'vx-docs',
      dir: './content/docs',
    },
  ],
})
