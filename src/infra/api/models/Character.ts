import { z } from 'astro/zod';

export const CharacterModel = z
  .object({
    name: z.string()
  })
  .strip();
