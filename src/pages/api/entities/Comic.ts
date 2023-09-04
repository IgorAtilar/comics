import { type z } from 'zod';
import { type ComicModel } from '../models/Comic';

export type Comic = z.infer<typeof ComicModel>;
