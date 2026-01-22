import { useQuery } from '@tanstack/react-query';
import { handleSearchBannerPromo } from '@/bff/handlers/search-banner-promo/handler';
import type { UseSearchBannerPromosParams } from './types';

const SEARCH_BANNER_PROMOS_QUERY_KEY = 'search-banner-promos';

export const useQuerySearchBannerPromos = ({
  institutionSlug,
  enabled = true,
}: UseSearchBannerPromosParams) => {
  return useQuery({
    queryKey: [SEARCH_BANNER_PROMOS_QUERY_KEY, institutionSlug],
    queryFn: () =>
      handleSearchBannerPromo({
        institutionSlug,
      }),
    enabled: enabled && !!institutionSlug,
  });
};
