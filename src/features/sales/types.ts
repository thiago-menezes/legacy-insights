import { SaleStatus } from '@/libs/api/services/sales/types';
import { IconNames } from '@/components/icon';

export interface SaleRow {
  id: number;
  documentId: string;
  externalId: string;
  productName: string;
  customerName: string;
  customerEmail: string;
  amount: number;
  currency: string;
  commissionAmount?: number;
  status: SaleStatus;
  saleDate: string;
  integrationName: string;
  integrationType: string;
}

export interface SalesPageFilters {
  status?: SaleStatus;
  startDate?: Date;
  endDate?: Date;
  page?: number;
  pageSize?: number;
}

export interface SalesTableProps {
  data: SaleRow[];
  isLoading?: boolean;
  currentPage?: number;
  totalPages?: number;
  pageSize?: number;
  totalItems?: number;
  onPageChange?: (page: number) => void;
}

export interface StatusConfig {
  label: string;
  color: 'positive' | 'neutral' | 'critical';
  icon: IconNames;
}
