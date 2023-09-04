import type { Character } from './Character';
import type { Creator } from './Creator';

export type Comic = {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  price: number;
  creators: Creator[];
  characters: Character[];
};
