import { type z } from 'zod';
import { type CharacterModel } from '../models/Character';

export type Character = z.infer<typeof CharacterModel>;
