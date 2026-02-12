import { RevenueTimeSeriesPoint } from '@/libs/api/services/sales/types';

export interface RevenueChartProps {
  data: RevenueTimeSeriesPoint[];
  isLoading?: boolean;
}
