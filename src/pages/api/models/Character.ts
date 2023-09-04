import { z } from 'zod';

export const CharacterModel = z
  .object({
    id: z.string(),
    name: z.string(),
    thumbnail: z.string()
  })
  .strip();
