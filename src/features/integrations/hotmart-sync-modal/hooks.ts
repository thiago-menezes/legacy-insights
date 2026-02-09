import { useHotmartSyncMutation } from './api/mutation';

export const useHotmartSync = () => {
  const mutation = useHotmartSyncMutation();

  const syncSales = async (
    integrationId: string,
    startDate: string,
    endDate: string,
  ) => {
    return mutation.mutateAsync({
      integrationId,
      startDate,
      endDate,
    });
  };

  return {
    loading: mutation.isPending,
    error: mutation.error?.message ?? null,
    stats: mutation.data?.stats ?? null,
    syncSales,
    reset: mutation.reset,
  };
};
