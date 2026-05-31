import { pageSchema } from 'fumadocs-core/source/schema'
import { z } from 'zod'

export const productDocPageSchema = pageSchema.extend({
  banner: z.string().optional(),
})
