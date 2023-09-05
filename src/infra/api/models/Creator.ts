import { z } from 'astro/zod';

export const CreatorModel = z
  .object({
    name: z.string(),
    role: z.string()
  })
  .strip();
