import { useIntegrationQuery } from './api/query';
import { UseIntegrationDetailsResult } from './types';

export const useIntegrationDetails = (
  id: string,
): UseIntegrationDetailsResult => {
  const { data, isLoading, error } = useIntegrationQuery(id);

  return {
    data: data?.data || null,
    isLoading,
    error: error ? String(error) : null,
  };
};
