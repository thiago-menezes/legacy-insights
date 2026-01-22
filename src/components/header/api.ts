import { useQuery } from '@tanstack/react-query';
import { handleLinks } from '@/bff/handlers/links/handler';
import type { LinksResponseDTO } from '@/bff/handlers/links/types';

export const useHeaderLinks = (institutionSlug?: string) => {
  const { data, error, isLoading } = useQuery<LinksResponseDTO>({
    queryKey: ['header-links', institutionSlug],
    queryFn: () =>
      handleLinks({
        local: 'cabeçalho',
        institutionSlug: institutionSlug || '',
      }),
    enabled: !!institutionSlug,
  });

  return {
    links: data?.data || [],
    isLoading,
    isError: error,
  };
};

export const useTopBarLinks = (institutionSlug?: string) => {
  const { data, error, isLoading } = useQuery<LinksResponseDTO>({
    queryKey: ['top-bar-links', institutionSlug],
    queryFn: () =>
      handleLinks({
        local: 'acima do cabeçalho',
        institutionSlug: institutionSlug || '',
      }),
    enabled: !!institutionSlug,
  });

  return {
    links: data?.data || [],
    isLoading,
    isError: error,
  };
};
