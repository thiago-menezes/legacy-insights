import { IconNames } from '@/components/icon';

export type MetricKey =
  | 'spend'
  | 'impressions'
  | 'clicks'
  | 'ctr'
  | 'cpc'
  | 'cpm'
  | 'conversions'
  | 'costPerConversion';

export type MetricFormat = 'currency' | 'number' | 'compact' | 'percentage';

export interface MetricConfig {
  key: MetricKey;
  label: string;
  icon: IconNames;
  format: MetricFormat;
}

export interface AggregatedMetrics {
  spend: number;
  impressions: number;
  clicks: number;
  ctr: number;
  cpc: number;
  cpm: number;
  conversions: number;
  costPerConversion: number;
}

export interface ChartDataPoint {
  date: string;
  formattedDate: string;
  spend: number;
  impressions: number;
  clicks: number;
  ctr: number;
  cpc: number;
  cpm: number;
  conversions: number;
  costPerConversion: number;
}

export interface MetricCardData {
  title: string;
  value: string;
  previousValue?: string;
  percentageChange?: number;
  icon?: IconNames;
}

export interface CampaignHeaderData {
  name: string;
  status: 'active' | 'paused' | 'archived' | 'removed' | 'deleted';
  platform: 'meta' | 'google';
  objective?: string;
  dailyBudget?: number;
  lifetimeBudget?: number;
  startDate?: string;
  endDate?: string;
}
