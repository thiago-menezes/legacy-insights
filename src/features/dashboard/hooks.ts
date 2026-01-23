import { useState, useEffect, useCallback } from 'react';
import { fetchDashboardData } from '@/data/mock';
import { DashboardData } from './types';

interface UseDashboardDataResult {
  data: DashboardData | null;
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
}

export const useDashboardData = (_filters?: {
  startDate?: Date;
  endDate?: Date;
  context?: string;
}): UseDashboardDataResult => {
  const [data, setData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await fetchDashboardData();
      setData(result);
    } catch (err) {
      setError(
        err instanceof Error
          ? err
          : new Error('Failed to fetch dashboard data'),
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    data,
    isLoading,
    error,
    refetch: fetchData,
  };
};
