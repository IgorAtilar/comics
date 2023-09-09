import { PaginationItem } from './components/PaginationItem';

export type PaginationProps = {
  total: number;
  limit?: number;
  page?: number;
  getUrl: (page: number) => string;
};

const SIBLING_COUNT = 1;
const MIN_PAGE_THRESHOLD = 2 + SIBLING_COUNT;

function generatePagesArray(from: number, to: number) {
  return [...new Array(to - from)]
    .map((_, index) => from + index + 1)
    .filter((page) => page > 0);
}

export function Pagination({
  total,
  page = 1,
  limit = 20,
  getUrl
}: PaginationProps) {
  const lastPage = Math.round(total / limit);

  const previousPages =
    page > 1 ? generatePagesArray(page - 1 - SIBLING_COUNT, page - 1) : [];

  const nextPages =
    page < lastPage
      ? generatePagesArray(page, Math.min(page + SIBLING_COUNT, lastPage))
      : [];

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex items-center justify-center ml-8 gap-x-2">
        {page > 1 + SIBLING_COUNT && (
          <>
            <PaginationItem number={1} getUrl={getUrl} />
            {page > MIN_PAGE_THRESHOLD && (
              <span className="text-gray-500 text-md">...</span>
            )}
          </>
        )}

        {previousPages.length > 0 &&
          previousPages.map((page) => (
            <PaginationItem key={page} number={page} getUrl={getUrl} />
          ))}
        <PaginationItem number={page} getUrl={getUrl} isCurrent />
        {nextPages.length > 0 &&
          nextPages.map((page) => (
            <PaginationItem key={page} number={page} getUrl={getUrl} />
          ))}

        {page + SIBLING_COUNT < lastPage && (
          <>
            {page + 1 + SIBLING_COUNT < lastPage && (
              <span className="text-gray-500 text-md">...</span>
            )}
            <PaginationItem number={lastPage} getUrl={getUrl} />
          </>
        )}
      </div>
    </div>
  );
}
