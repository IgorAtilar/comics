import { getSearchUrl } from '@/utils/urls';
import { SearchBarComponent } from './component';

export const SearchBar = ({ className }: { className?: string }) => {
  const handleSubmit = (search: string) => {
    window.location.href = getSearchUrl({ query: search });
  };

  return <SearchBarComponent className={className} onSubmit={handleSubmit} />;
};
