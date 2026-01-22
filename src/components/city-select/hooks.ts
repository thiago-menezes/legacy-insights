'use client';

import { useQuery } from '@tanstack/react-query';
import { handleCities } from '@/bff/handlers/cities/handler';
import { CityDTO } from '@/bff/handlers/cities/types';
import { useCurrentInstitution } from '@/hooks';

export const useCities = () => {
  const { institutionSlug } = useCurrentInstitution();
  const { data, isLoading, error } = useQuery({
    queryKey: ['cities', institutionSlug],
    queryFn: () => handleCities({ institutionSlug }),
  });

  const cities: CityDTO[] = data?.data || [];

  return {
    cities,
    isLoading,
    error,
  };
};
