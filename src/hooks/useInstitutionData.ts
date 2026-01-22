'use client';

import { useQuery } from '@tanstack/react-query';
import { handleInstitutionBySlug } from '@/bff/handlers/institutions/handler';
import { InstitutionDTO } from '@/types/api/institutions';
import { useCurrentInstitution } from './useInstitution';

export type InstitutionData = {
  id: number;
  name: string;
  slug: string;
  code: string;
  defaultCity?: string | null;
  defaultState?: string | null;
  active: boolean;
};

export const useInstitutionData = () => {
  const { institutionSlug } = useCurrentInstitution();

  const { data, isLoading, error } = useQuery<InstitutionDTO>({
    queryKey: ['institution', institutionSlug],
    queryFn: () => handleInstitutionBySlug({ slug: institutionSlug }),
    enabled: !!institutionSlug,
    staleTime: 5 * 60 * 1000, // 5 minutes - institution data rarely changes
  });

  return {
    institution: data,
    isLoading,
    error,
    defaultCity: data?.defaultCity,
    defaultState: data?.defaultState,
  };
};
