import { useQuery } from '@tanstack/react-query';
import { handleLinks } from '@/bff/handlers/links/handler';
import type { LinksResponseDTO } from '@/bff/handlers/links/types';
import { handleSocialMedia } from '@/bff/handlers/social-media/handler';
import type { SocialMediaResponseDTO } from '@/bff/handlers/social-media/types';

export const useFooterLinks = (institutionSlug?: string) => {
  const { data, error, isLoading } = useQuery<LinksResponseDTO>({
    queryKey: ['footer-links', institutionSlug],
    queryFn: () =>
      handleLinks({
        local: 'rodapé',
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

export const useSocialMediaLinks = (institutionSlug?: string) => {
  const { data, error, isLoading } = useQuery<SocialMediaResponseDTO>({
    queryKey: ['social-media-links', institutionSlug],
    queryFn: () =>
      handleSocialMedia({
        institutionSlug: institutionSlug || '',
      }),
    enabled: !!institutionSlug,
  });

  return {
    socialLinks: data?.data || [],
    isLoading,
    isError: error,
  };
};
