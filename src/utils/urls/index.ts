export const getSearchUrl = ({
  query,
  page = 1
}: {
  query: string;
  page?: number;
}) => `/search?q=${query}&page=${page}`;

export const getComicUrl = ({ id }: { id: string }) => `/comic/${id}`;

export const getCartUrl = () => '/cart';

export const getSuccesUrl = () => '/success';

export const getBaseURL = () => import.meta.env.PUBLIC_BASE_URL;
