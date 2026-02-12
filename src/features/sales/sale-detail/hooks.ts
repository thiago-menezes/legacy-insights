import { useQuery } from '@tanstack/react-query';
import { salesService } from '@/libs/api/services/sales';

export const useSaleDetail = (saleId: string) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['sale', saleId],
    queryFn: () => salesService.get(saleId),
    enabled: !!saleId,
  });

  return {
    sale: data?.data,
    isLoading,
    error: error as Error | null,
  };
};
