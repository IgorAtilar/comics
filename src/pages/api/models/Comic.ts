import { z } from 'zod';

import { CreatorModel } from './Creator';
import { CharacterModel } from './Character';

export const ComicModel = z
  .object({
    id: z.string(),
    title: z.string(),
    description: z.string(),
    thumbnail: z.string(),
    price: z.number(),
    creators: z.array(CreatorModel),
    characters: z.array(CharacterModel)
  })
  .strip();
