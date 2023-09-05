import { type z } from 'astro/zod';
import { type CharacterModel } from '../models/Character';

export type Character = z.infer<typeof CharacterModel>;
