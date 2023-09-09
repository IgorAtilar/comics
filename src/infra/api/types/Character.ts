import { type z } from 'astro/zod';
import { type CharacterModel } from '../models/Character';

export type Character = z.infer<typeof CharacterModel>;

export type RawCharacter = {
  name: string;
  thumbnail: {
    path: string;
    extension: string;
  };
};

export type ResponseComicCharactersResponse = {
  data: {
    results: RawCharacter[];
  };
};
