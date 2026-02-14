import { IconNames } from '@/components/icon';

export type DataSource = 'meta' | 'hotmart' | 'calculated';

export type ChartGranularity = 'daily' | 'weekly';

export type MetricKey =
  | 'spend'
  | 'impressions'
  | 'clicks'
  | 'ctr'
  | 'cpc'
  | 'cpm'
  | 'conversions'
  | 'costPerConversion'
  | 'revenue'
  | 'roas'
  | 'cpa'
  | 'salesCount'
  | 'results'
  | 'purchases'
  | 'purchaseValue'
  | 'landingPageViews'
  | 'initiateCheckouts'
  | 'outboundClicks';

export type MetricFormat = 'currency' | 'number' | 'compact' | 'percentage';

export interface MetricConfig {
  key: MetricKey;
  label: string;
  icon: IconNames;
  format: MetricFormat;
  source?: DataSource;
  invertColor?: boolean;
  tooltip?: string;
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
  revenue: number;
  roas: number;
  cpa: number;
  salesCount: number;
  results: number;
  purchases: number;
  purchaseValue: number;
  landingPageViews: number;
  initiateCheckouts: number;
  outboundClicks: number;
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
  revenue: number;
  roas: number;
  cpa: number;
  salesCount: number;
  results: number;
  purchases: number;
  purchaseValue: number;
  landingPageViews: number;
  initiateCheckouts: number;
  outboundClicks: number;
}

export interface MetricCardData {
  title: string;
  value: string;
  previousValue?: string;
  percentageChange?: number;
  icon?: IconNames;
}

export interface FunnelStepData {
  label: string;
  value: number;
  formattedValue: string;
  source: DataSource;
  rate?: number;
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
