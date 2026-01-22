import { useQuery } from '@tanstack/react-query';
import { HOME_HERO_QUERY_KEY } from '../constants';
import { getHomeCarousel } from './server';

export const useHomeCarousel = (institutionSlug: string) => {
  return useQuery({
    queryKey: [...HOME_HERO_QUERY_KEY, 'carousel', institutionSlug],
    queryFn: () => getHomeCarousel(institutionSlug),
    staleTime: 1000 * 60 * 5,
  });
};
