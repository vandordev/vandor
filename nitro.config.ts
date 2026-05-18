import { defineNitroConfig } from 'nitro/config'

export default defineNitroConfig({
  preset: 'vercel',
  serverAssets: [
    {
      baseName: 'news',
      dir: './content/news',
    },
    {
      baseName: 'writing',
      dir: './content/writing',
    },
    {
      baseName: 'vx-docs',
      dir: './content/docs',
    },
  ],
})
