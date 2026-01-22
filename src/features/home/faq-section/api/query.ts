import { useQuery } from '@tanstack/react-query';
import { handleFAQ } from '@/bff/handlers/faq';

const FAQ_QUERY_KEY = ['home', 'faq'];

export const useFAQ = (institutionSlug: string) => {
  return useQuery({
    queryKey: [...FAQ_QUERY_KEY, institutionSlug],
    queryFn: () => handleFAQ({ institutionSlug }),
  });
};
