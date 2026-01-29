import { useQuery } from '@tanstack/react-query';
import { integrationsService } from '@/libs/api/services/integrations';

export const useIntegrationQuery = (id: string) => {
  return useQuery({
    queryKey: ['integrations', id],
    queryFn: () => integrationsService.get(id),
    enabled: !!id,
  });
};
