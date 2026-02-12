import { useQuery } from '@tanstack/react-query';
import { productsService } from '@/libs/api/services/products';

export const useProductOptions = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['products-list-all'],
    queryFn: () => productsService.list({ pageSize: 100 }),
  });

  const options = [
    { value: '', label: 'Todos os produtos' },
    ...(data?.data || []).map((product) => ({
      value: product.documentId,
      label: product.name,
    })),
  ];

  return { options, isLoading };
};
