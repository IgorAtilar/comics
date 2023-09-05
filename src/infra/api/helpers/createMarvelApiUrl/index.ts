export const createMarvelApiUrl = ({ endpoint }: { endpoint: string }) => {
  const comicsUrl = new URL(`${import.meta.env.PUBLIC_MARVEL_API}/${endpoint}`);
  comicsUrl.searchParams.append('apikey', import.meta.env.MARVEL_API_KEY);
  comicsUrl.searchParams.append('hash', import.meta.env.MARVEL_API_HASH);
  comicsUrl.searchParams.append('ts', '1');

  return comicsUrl;
};
