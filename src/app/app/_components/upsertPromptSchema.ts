import { z } from 'zod'

export const upsertPromptSchema = z.object({
  id: z.string().optional(),
  data: z.date(),
  userId: z.string(),
  funcao: z.string(),
})
