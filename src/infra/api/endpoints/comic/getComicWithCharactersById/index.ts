import { ComicWithCharactersModel } from '@/infra/api/models/Comic';
import { getComicById } from '../getComicById';
import { getComicCharacters } from '../getComicCharacters';

export const getComicWithCharactersById = async ({ id }: { id: string }) => {
  try {
    const [comic, { characters }] = await Promise.all([
      getComicById({ id }),
      getComicCharacters({ id })
    ]);

    const comicWithCharacters = {
      ...comic,
      characters
    };

    const result = ComicWithCharactersModel.safeParse(comicWithCharacters);

    if (result.success) {
      const { data } = result;
      return data;
    }
  } catch {}
};
