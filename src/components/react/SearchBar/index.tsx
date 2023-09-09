import { getSearchUrl } from '../../../utils/urls';
import { SearchBar } from './component';

export const EnhancedSearchBar = ({ className }: { className?: string }) => {
  const handleSubmit = (search: string) => {
    window.location.href = getSearchUrl({ query: search });
  };

  return <SearchBar className={className} onSubmit={handleSubmit} />;
};
