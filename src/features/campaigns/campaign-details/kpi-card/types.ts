import { IconProps } from '@/components/icon';

type DataSource = 'meta' | 'hotmart' | 'calculated';

export interface KpiCardProps {
  title: string;
  value: string;
  previousValue?: string;
  percentageChange?: number;
  icon?: IconProps['name'];
  source: DataSource;
  tooltip?: string;
  invertColor?: boolean;
  isLoading?: boolean;
}
