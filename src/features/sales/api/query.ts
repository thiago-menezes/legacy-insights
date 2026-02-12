import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { salesService } from '@/libs/api/services/sales';
import { SaleFilters } from '@/libs/api/services/sales/types';

export const useSalesQuery = (filters?: SaleFilters) => {
  return useQuery({
    queryKey: ['sales', filters],
    queryFn: () => salesService.list(filters),
    placeholderData: keepPreviousData,
  });
};
