import { SaleRow } from '../types';

export interface SalesTableProps {
  data: SaleRow[];
  isLoading?: boolean;
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
}
