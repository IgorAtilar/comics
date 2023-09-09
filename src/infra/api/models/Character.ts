import { z } from 'astro/zod';
import { ThumbnailModel } from './Thumbnail';

export const CharacterModel = z
  .object({
    name: z.string().optional(),
    thumbnail: ThumbnailModel
  })
  .strip();

export const ComicCharacterModel = z
  .object({
    name: z.string().optional(),
    thumbnail: z.string().optional()
  })
  .strip();
