import { useQuery } from '@tanstack/react-query';
import { handleEMec } from '@/bff/handlers/e-mec/handler';
import type { EMecResponseDTO } from './types';

export const useEMec = (institutionSlug: string) => {
  return useQuery<EMecResponseDTO>({
    queryKey: ['footer', 'e-mec', institutionSlug],
    queryFn: () => handleEMec({ institutionSlug }),
  });
};
