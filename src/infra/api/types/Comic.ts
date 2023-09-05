import { type z } from 'astro/zod';
import { type ComicModel } from '../models/Comic';

export type Comic = z.infer<typeof ComicModel>;

export type RawComic = {
  id: number;
  title: string;
  description: string;
  prices: Array<{ type: string; price: number }>;
  thumbnail: { path: string; extension: string };
  creators: { items: Array<{ name: string; role: string }> };
  characters: { items: Array<{ resourceURI: string; name: string }> };
};
