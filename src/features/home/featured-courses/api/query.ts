import { useQuery } from '@tanstack/react-query';
import { handleOffers } from '@/bff/handlers/courses/handler-offers';
import { useCurrentInstitution } from '@/hooks';

export type FeaturedCoursesQueryParams = {
  unitIds?: number[];
  page?: number;
  perPage?: number;
};

export const FEATURED_COURSES_QUERY_KEYS = {
  all: ['featured-courses'] as const,
  lists: () => [...FEATURED_COURSES_QUERY_KEYS.all, 'list'] as const,
  list: (params: FeaturedCoursesQueryParams) =>
    [...FEATURED_COURSES_QUERY_KEYS.lists(), params] as const,
};

export const useQueryFeaturedCourses = (params: FeaturedCoursesQueryParams) => {
  const { institutionSlug } = useCurrentInstitution();

  return useQuery({
    queryKey: FEATURED_COURSES_QUERY_KEYS.list(params),
    queryFn: async () =>
      handleOffers({
        institution: institutionSlug,
        page: params.page?.toString(),
        perPage: params.perPage?.toString(),
        unitIds: params.unitIds,
      }),
    enabled: !!params.unitIds && params.unitIds.length > 0,
    refetchOnWindowFocus: false,
  });
};
