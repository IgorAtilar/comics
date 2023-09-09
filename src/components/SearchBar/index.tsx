import { getSearchUrl } from '../../utils/urls';
import { SearchBar } from './component';

export const EnhancedSearchBar = ({ className }: { className?: string }) => {
  const handleSearch = (search: string) => {
    return getSearchUrl({ query: search });
  };

  return <SearchBar className={className} getSearchUrl={handleSearch} />;
};
