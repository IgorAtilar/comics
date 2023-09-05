import { Pagination, type PaginationProps } from './component';
import { getSearchUrl } from '../../helpers/search';

export const EnhancedPagination = ({
  total,
  limit,
  query,
  page
}: Omit<PaginationProps, 'getUrl'> & {
  query: string;
}) => {
  const getUrl = (page: number) =>
    getSearchUrl({
      query,
      page
    });

  return <Pagination total={total} limit={limit} page={page} getUrl={getUrl} />;
};
