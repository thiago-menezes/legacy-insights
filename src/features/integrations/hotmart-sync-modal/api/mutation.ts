import { useMutation, useQueryClient } from '@tanstack/react-query';
import { hotmartService } from '@/libs/api/services/hotmart';
import { HotmartSyncRequest, HotmartSyncResponse } from './types';

export const useHotmartSyncMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<HotmartSyncResponse, Error, HotmartSyncRequest>({
    mutationFn: ({ integrationId, startDate, endDate }) =>
      hotmartService.syncSales(integrationId, {
        startDate,
        endDate,
      }),
    onSuccess: (_data, variables) => {
      // Invalidate integration query to refresh last sync timestamp
      queryClient.invalidateQueries({
        queryKey: ['integrations', variables.integrationId],
      });
      // Invalidate sales queries to show new data
      queryClient.invalidateQueries({
        queryKey: ['sales'],
      });
    },
  });
};
