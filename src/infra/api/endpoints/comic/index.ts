import type { Comic } from '../../types/Comic';
import { createMarvelApiUrl } from '../../helpers/createMarvelApiUrl';
import type {
  SearchComicsRawResponse,
  SearchComicsResponse
} from '../../types/SearchComic';
import { ComicModel } from '../../models/Comic';
import { getDefaultHeaders } from '../../helpers/getDefaultHeaders';

const comic: Comic = {
  id: '1158',
  title: 'ULTIMATE X-MEN VOL. 5: ULTIMATE WAR TPB (Trade Paperback)',
  description:
    "The Ultimates vs. the Ultimate X-Men: the battle begins. When the X-Men do the worst thing they could to humanity, the government orders Captain America, Iron Man, Thor and the rest of the Ultimates to bring them down. A small but lethal army, the Ultimates were created to face these and other newly rising threats to mankind. But the X-Men's founder, Professor X, hasn't been training his students for nothing -- and the youngs mutants just might take out the Ultimates first.",
  thumbnail: 'http://i.annihil.us/u/prod/marvel/i/mg/2/f0/4bc6670c80007.jpg',
  prices: [
    {
      type: 'printPrice',
      price: 3.99
    }
  ],
  creators: [
    {
      name: 'Chris Bachalo',
      role: 'penciller'
    },
    {
      name: 'Virtual Calligr',
      role: 'letterer'
    },
    {
      name: 'Olivier Coipel',
      role: 'penciler'
    },
    {
      name: 'Mike Deodato',
      role: 'penciler'
    },
    {
      name: 'Geoff Johns',
      role: 'writer'
    },
    {
      name: 'Bruce Jones',
      role: 'writer'
    },
    {
      name: 'Mark Millar',
      role: 'writer'
    },
    {
      name: 'Paul Mounts',
      role: 'colorist'
    },
    {
      name: 'Tim Townsend',
      role: 'inker'
    }
  ],
  characters: []
};

export const getComicSpotlight = () => comic;

export const getLatestRealeases = () => [
  comic,
  comic,
  comic,
  comic,
  comic,
  comic
];

const getSearchComicsUrl = ({
  limit,
  offset,
  query
}: {
  query: string;
  limit?: number;
  offset?: number;
}) => {
  const comicsUrl = createMarvelApiUrl({ endpoint: 'comics' });
  comicsUrl.searchParams.append('titleStartsWith', query);
  if (limit) {
    comicsUrl.searchParams.append('limit', limit.toString());
  }
  if (offset) {
    comicsUrl.searchParams.append('offset', offset.toString());
  }

  return comicsUrl;
};

const DEFAULT_LIMIT = 20;

export const searchComics = async ({
  limit = DEFAULT_LIMIT,
  page,
  query
}: {
  query: string;
  limit?: number;
  page?: number;
}) => {
  try {
    const offset = page ? (page - 1) * limit : undefined;
    const data = await fetch(getSearchComicsUrl({ limit, offset, query }), {
      headers: getDefaultHeaders()
    });

    const response: SearchComicsRawResponse = await data.json();

    const {
      data: { total, results }
    } = response;

    const comics = results.reduce<Comic[]>((acc, comic) => {
      const result = ComicModel.safeParse(comic);

      if (result.success) {
        const { data } = result;
        acc.push(data);
      }

      return acc;
    }, []);

    const result: SearchComicsResponse = {
      total,
      comics,
      limit
    };

    return result;
  } catch {}

  const result: SearchComicsResponse = {
    total: 0,
    comics: [],
    limit
  };

  return result;
};

export const getComicById = async ({ id }: { id: string }) => {
  try {
    const data = await fetch(createMarvelApiUrl({ endpoint: `comics/${id}` }), {
      headers: getDefaultHeaders()
    });

    const response: SearchComicsRawResponse = await data.json();

    const {
      data: { results }
    } = response;

    const [comic] = results;

    const result = ComicModel.safeParse(comic);

    if (result.success) {
      const { data } = result;
      return data;
    }
  } catch {}

  return undefined;
};
