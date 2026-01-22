import { useQuery } from '@tanstack/react-query';
import { handleHomePromoBanner } from '@/bff/handlers/home-promo-banner/handler';

const HOME_PROMO_BANNERS_QUERY_KEY = ['home', 'promo-banners'];

export const usePromotionalBanners = (institutionSlug: string) => {
  return useQuery({
    queryKey: [...HOME_PROMO_BANNERS_QUERY_KEY, institutionSlug],
    queryFn: () =>
      handleHomePromoBanner({
        institutionSlug,
      }),
  });
};
