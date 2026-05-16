import { defineNitroConfig } from 'nitro/config'

export default defineNitroConfig({
  preset: 'vercel',
  serverAssets: [
    {
      baseName: 'vx-docs',
      dir: './content/docs',
    },
  ],
})
