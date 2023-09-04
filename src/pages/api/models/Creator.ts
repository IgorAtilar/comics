import { z } from 'zod';

export const CreatorModel = z
  .object({
    name: z.string(),
    role: z.string()
  })
  .strip();
