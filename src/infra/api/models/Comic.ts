import { z } from 'astro/zod';

import { CreatorModel } from './Creator';
import { ComicCharacterModel } from './Character';
import { ThumbnailModel } from './Thumbnail';

const stringPreprocess = (val: unknown) => {
  if (typeof val === 'string') {
    return val;
  }

  return String(val);
};

const creatorsPreprocess = (creators: unknown) => {
  if (typeof creators === 'object' && creators) {
    if ('items' in creators && Array.isArray(creators.items)) {
      return creators.items;
    }
  }
};

const PriceModel = z.object({
  type: z.string(),
  price: z.number()
});

export const ComicModel = z
  .object({
    id: z.preprocess(stringPreprocess, z.string()).optional(),
    title: z.preprocess(stringPreprocess, z.string()).optional(),
    description: z.preprocess(stringPreprocess, z.string()).optional(),
    thumbnail: ThumbnailModel,
    price: z.number().optional(),
    creators: z.preprocess(creatorsPreprocess, z.array(CreatorModel)).optional()
  })
  .strip();

export const ComicWithCharactersModel = z
  .object({
    id: z.string().optional(),
    title: z.string().optional(),
    description: z.string().optional(),
    thumbnail: z.string().optional(),
    prices: z.array(PriceModel).optional(),
    creators: z.array(CreatorModel).optional(),
    characters: z.array(ComicCharacterModel).optional()
  })
  .strip();
