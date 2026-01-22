import { useQuery } from '@tanstack/react-query';
import { CoursesResponse } from 'types/api/courses';
import type { CoursesSearchParams } from 'types/api/courses-search';
import { handleOffers } from '@/bff/handlers/courses/handler-offers';

export const useQueryOffers = (
  params: Partial<CoursesSearchParams>,
  page: number,
  perPage: number,
) => {
  const queryParams = {
    ...params,
    page: page.toString(),
    perPage: perPage.toString(),
  };

  return useQuery<CoursesResponse>({
    queryKey: ['courses', 'city', queryParams],
    queryFn: () => {
      return handleOffers(queryParams as CoursesSearchParams);
    },
    enabled: !!params.institution && (params.unitIds?.length ?? 0) > 0,
  });
};
