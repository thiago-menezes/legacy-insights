import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { salesService } from '@/libs/api/services/sales';
import { SaleAnalyticsFilters } from '@/libs/api/services/sales/types';

export const useSalesAnalyticsQuery = (filters?: SaleAnalyticsFilters) => {
  return useQuery({
    queryKey: ['sales-analytics', filters],
    queryFn: () => salesService.getAnalytics(filters),
    placeholderData: keepPreviousData,
  });
};
