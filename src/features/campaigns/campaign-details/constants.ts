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

export const KPI_CONFIGS: MetricConfig[] = [
  {
    key: 'spend',
    label: 'Investimento',
    icon: 'wallet',
    format: 'currency',
    source: 'meta',
    tooltip: 'Total investido na plataforma de anúncios',
  },
  {
    key: 'revenue',
    label: 'Receita',
    icon: 'coins',
    format: 'currency',
    source: 'hotmart',
    tooltip: 'Receita bruta de vendas atribuídas via UTM',
  },
  {
    key: 'roas',
    label: 'ROAS',
    icon: 'trending-up',
    format: 'number',
    source: 'calculated',
    tooltip: 'Return On Ad Spend = Receita / Investimento',
  },
  {
    key: 'salesCount',
    label: 'Vendas',
    icon: 'shopping-cart',
    format: 'number',
    source: 'hotmart',
    tooltip: 'Total de vendas aprovadas atribuídas a esta campanha',
  },
  {
    key: 'cpa',
    label: 'CPA',
    icon: 'receipt',
    format: 'currency',
    source: 'calculated',
    invertColor: true,
    tooltip: 'Custo Por Aquisição = Investimento / Vendas',
  },
  {
    key: 'ctr',
    label: 'CTR',
    icon: 'percentage',
    format: 'percentage',
    source: 'meta',
    tooltip: 'Click-Through Rate = Cliques / Impressões × 100',
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
  revenue: '#22c55e',
  roas: '#f59e0b',
  cpa: '#ef4444',
  salesCount: '#8b5cf6',
};

export const DEFAULT_DATE_RANGE = 30;
