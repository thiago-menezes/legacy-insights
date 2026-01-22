import { useQuery } from '@tanstack/react-query';
import { handleClientUnits } from '@/bff/handlers';

export const useQueryUnits = ({
  institution,
  state,
  city,
  courseId,
}: {
  institution: string;
  state: string;
  city: string;
  courseId: string;
}) => {
  return useQuery({
    queryKey: ['units', courseId, institution, state, city],
    queryFn: async () =>
      await handleClientUnits({
        institution,
        state,
        city,
        courseId,
      }),
    enabled: !!institution && !!state && !!city && !!courseId,
  });
};
