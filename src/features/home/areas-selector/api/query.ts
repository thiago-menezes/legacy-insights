import { useQuery } from '@tanstack/react-query';
import { handleAreasInteresse } from '@/bff/handlers/areas-interesse';

export const useAreasOfInterest = (institutionSlug: string) => {
  return useQuery({
    queryKey: ['home', 'areas-of-interest', institutionSlug],
    queryFn: () =>
      handleAreasInteresse({
        institutionSlug,
      }),
    enabled: !!institutionSlug,
  });
};
