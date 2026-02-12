import { MetricConfig, MetricKey } from './types';

export const METRIC_CONFIGS: MetricConfig[] = [
  { key: 'spend', label: 'Investimento', icon: 'wallet', format: 'currency' },
  {
    key: 'impressions',
    label: 'Impressões',
    icon: 'eye',
    format: 'compact',
  },
  { key: 'clicks', label: 'Cliques', icon: 'pointer', format: 'compact' },
  { key: 'ctr', label: 'CTR', icon: 'percentage', format: 'percentage' },
  { key: 'cpc', label: 'CPC', icon: 'coins', format: 'currency' },
  { key: 'cpm', label: 'CPM', icon: 'chart-bar', format: 'currency' },
  {
    key: 'conversions',
    label: 'Conversões',
    icon: 'target',
    format: 'number',
  },
  {
    key: 'costPerConversion',
    label: 'Custo/Conversão',
    icon: 'receipt',
    format: 'currency',
  },
];

export const CHART_COLORS: Record<MetricKey, string> = {
  spend: '#373ac3ff',
  impressions: '#8b5cf6',
  clicks: '#f97316',
  ctr: '#22c55e',
  cpc: '#ef4444',
  cpm: '#06b6d4',
  conversions: '#eab308',
  costPerConversion: '#ec4899',
};

export const DEFAULT_DATE_RANGE = 30;
