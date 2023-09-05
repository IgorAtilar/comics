import { z } from 'astro/zod';

import { CreatorModel } from './Creator';
import { CharacterModel } from './Character';

export const ComicModel = z
  .object({
    id: z.preprocess((val) => String(val), z.string()).optional(),
    title: z.preprocess((val) => String(val), z.string()).optional(),
    description: z.preprocess((val) => String(val), z.string()).optional(),
    thumbnail: z
      .preprocess((thumbnail) => {
        if (typeof thumbnail === 'object' && thumbnail) {
          if (
            'path' in thumbnail &&
            'extension' in thumbnail &&
            typeof thumbnail.path === 'string' &&
            typeof thumbnail.extension === 'string'
          ) {
            return `${thumbnail.path}.${thumbnail.extension}`;
          }
        }
      }, z.string())
      .optional(),
    prices: z
      .array(
        z.object({
          type: z.string(),
          price: z.number()
        })
      )
      .optional(),
    creators: z
      .preprocess((creators) => {
        if (typeof creators === 'object' && creators) {
          if ('items' in creators && Array.isArray(creators.items)) {
            return creators.items;
          }
        }
      }, z.array(CreatorModel))
      .optional(),
    characters: z
      .preprocess((characters) => {
        if (typeof characters === 'object' && characters) {
          if ('items' in characters && Array.isArray(characters.items)) {
            return characters.items;
          }
        }
      }, z.array(CharacterModel))
      .optional()
  })
  .strip();
