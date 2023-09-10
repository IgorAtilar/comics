import { createMarvelApiUrl, getDefaultHeaders } from '@/infra/api/helpers';
import { CharacterModel } from '@/infra/api/models';
import type {
  Character,
  ResponseComicCharactersResponse
} from '@/infra/api/types';

export const getComicCharacters = async ({ id }: { id: string }) => {
  try {
    const data = await fetch(
      createMarvelApiUrl({ endpoint: `comics/${id}/characters` }),
      {
        headers: getDefaultHeaders()
      }
    );

    const response: ResponseComicCharactersResponse = await data.json();

    const {
      data: { results }
    } = response;

    const characters = results.reduce<Character[]>((acc, character) => {
      const result = CharacterModel.safeParse(character);

      if (result.success) {
        const { data } = result;
        acc.push(data);
      }

      return acc;
    }, []);

    return { characters };
  } catch {}
  return { characters: [] };
};
