import { DailyMetric } from '@/libs/api/services/campaigns/types';
import {
  formatCompactNumber,
  formatCurrency,
  formatPercentage,
} from '@/utils/format-currency';
import { AggregatedMetrics, ChartDataPoint, MetricFormat } from './types';

export const filterMetricsByDateRange = (
  metrics: DailyMetric[],
  days: number,
): DailyMetric[] => {
  const now = new Date();
  const cutoff = new Date(now);
  cutoff.setDate(cutoff.getDate() - days);

  return metrics.filter((m) => new Date(m.date) >= cutoff);
};

export const aggregateMetrics = (metrics: DailyMetric[]): AggregatedMetrics => {
  if (metrics.length === 0) {
    return {
      spend: 0,
      impressions: 0,
      clicks: 0,
      ctr: 0,
      cpc: 0,
      cpm: 0,
      conversions: 0,
      costPerConversion: 0,
    };
  }

  const totals = metrics.reduce(
    (acc, m) => ({
      spend: acc.spend + (m.spend || 0),
      impressions: acc.impressions + Number(m.impressions || 0),
      clicks: acc.clicks + Number(m.clicks || 0),
      conversions: acc.conversions + (m.conversions || 0),
    }),
    { spend: 0, impressions: 0, clicks: 0, conversions: 0 },
  );

  const ctr =
    totals.impressions > 0 ? (totals.clicks / totals.impressions) * 100 : 0;
  const cpc = totals.clicks > 0 ? totals.spend / totals.clicks : 0;
  const cpm =
    totals.impressions > 0 ? (totals.spend / totals.impressions) * 1000 : 0;
  const costPerConversion =
    totals.conversions > 0 ? totals.spend / totals.conversions : 0;

  return {
    ...totals,
    ctr,
    cpc,
    cpm,
    costPerConversion,
  };
};

export const splitPeriods = (
  metrics: DailyMetric[],
  days: number,
): { current: DailyMetric[]; previous: DailyMetric[] } => {
  const now = new Date();

  const currentCutoff = new Date(now);
  currentCutoff.setDate(currentCutoff.getDate() - days);

  const previousCutoff = new Date(currentCutoff);
  previousCutoff.setDate(previousCutoff.getDate() - days);

  const current = metrics.filter((m) => new Date(m.date) >= currentCutoff);
  const previous = metrics.filter(
    (m) =>
      new Date(m.date) >= previousCutoff && new Date(m.date) < currentCutoff,
  );

  return { current, previous };
};

export const calcPercentageChange = (
  current: number,
  previous: number,
): number | undefined => {
  if (previous === 0) return undefined;
  return ((current - previous) / previous) * 100;
};

export const buildChartData = (metrics: DailyMetric[]): ChartDataPoint[] => {
  return [...metrics]
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .map((m) => ({
      date: m.date,
      formattedDate: new Date(m.date).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
      }),
      spend: m.spend || 0,
      impressions: Number(m.impressions || 0),
      clicks: Number(m.clicks || 0),
      ctr: m.ctr || 0,
      cpc: m.cpc || 0,
      cpm: m.cpm || 0,
      conversions: m.conversions || 0,
      costPerConversion: m.costPerConversion || 0,
    }));
};

export const formatMetricValue = (
  value: number,
  format: MetricFormat,
): string => {
  switch (format) {
    case 'currency':
      return formatCurrency(value);
    case 'percentage':
      return formatPercentage(value, false);
    case 'compact':
      return formatCompactNumber(value);
    case 'number':
      return new Intl.NumberFormat('pt-BR').format(value);
    default:
      return String(value);
  }
};
