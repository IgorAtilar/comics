import { type z } from 'astro/zod';
import { type ComicModel } from '../models/Comic';
import type { Creator } from './Creator';

export type Comic = z.infer<typeof ComicModel>;

export type RawComicCharacter = {
  name: string;
  resourceURI: string;
};

export type RawComic = {
  id: number;
  title: string;
  description: string;
  prices: Array<{ type: string; price: number }>;
  thumbnail: { path: string; extension: string };
  creators: { items: Creator[] };
  characters: { items: RawComicCharacter[] };
};
