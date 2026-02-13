type ChartGranularity = 'daily' | 'weekly';

export interface PerformanceChartDataPoint {
  date: string;
  formattedDate: string;
  spend: number;
  revenue: number;
}

export interface PerformanceChartProps {
  data: PerformanceChartDataPoint[];
  granularity: ChartGranularity;
  onGranularityChange: (granularity: ChartGranularity) => void;
  isLoading?: boolean;
}
