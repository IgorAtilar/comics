import { type z } from 'zod';
import { type CreatorModel } from '../models/Creator';

export type Creator = z.infer<typeof CreatorModel>;
