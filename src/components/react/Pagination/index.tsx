import { getSearchUrl } from '@/utils/urls';
import { PaginationComponent, type PaginationProps } from './component';

export const Pagination = ({
  total,
  limit,
  query,
  page
}: Omit<PaginationProps, 'getNextPageUrl'> & {
  query: string;
}) => {
  const getNextPageUrl = (page: number) =>
    getSearchUrl({
      query,
      page
    });

  return (
    <PaginationComponent
      total={total}
      limit={limit}
      page={page}
      getNextPageUrl={getNextPageUrl}
    />
  );
};
