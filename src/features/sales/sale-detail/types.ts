import { StrapiSale } from '@/libs/api/services/sales/types';

export interface SaleDetailProps {
  saleId: string;
}

export interface UseSaleDetailResult {
  sale: StrapiSale | undefined;
  isLoading: boolean;
  error: Error | null;
}

export interface SaleInfoItem {
  label: string;
  value: string;
}
