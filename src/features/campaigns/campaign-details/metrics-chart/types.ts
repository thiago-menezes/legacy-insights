import { ChartDataPoint, MetricKey } from '../types';

export interface MetricsChartProps {
  data: ChartDataPoint[];
  selectedMetric: MetricKey;
  onMetricChange: (metric: MetricKey) => void;
}
