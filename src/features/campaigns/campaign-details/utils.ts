import {
  CampaignPerformance,
  DailyMetric,
} from '@/libs/api/services/campaigns/types';
import {
  formatCompactNumber,
  formatCurrency,
  formatPercentage,
} from '@/utils/format-currency';
import { AggregatedMetrics, ChartDataPoint, MetricFormat } from './types';
import { PerformanceChartDataPoint } from './performance-chart/types';

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
      revenue: 0,
      roas: 0,
      cpa: 0,
      salesCount: 0,
      results: 0,
      purchases: 0,
      purchaseValue: 0,
      landingPageViews: 0,
      initiateCheckouts: 0,
      outboundClicks: 0,
    };
  }

  const totals = metrics.reduce(
    (acc, m) => ({
      spend: acc.spend + (m.spend || 0),
      impressions: acc.impressions + Number(m.impressions || 0),
      clicks: acc.clicks + Number(m.clicks || 0),
      conversions: acc.conversions + (m.conversions || 0),
      results: (acc.results || 0) + Number(m.results || 0),
      purchases: (acc.purchases || 0) + Number(m.purchases || 0),
      purchaseValue: (acc.purchaseValue || 0) + Number(m.purchaseValue || 0),
      landingPageViews:
        (acc.landingPageViews || 0) + Number(m.landingPageViews || 0),
      initiateCheckouts:
        (acc.initiateCheckouts || 0) + Number(m.initiateCheckouts || 0),
      outboundClicks: (acc.outboundClicks || 0) + Number(m.outboundClicks || 0),
    }),
    {
      spend: 0,
      impressions: 0,
      clicks: 0,
      conversions: 0,
      results: 0,
      purchases: 0,
      purchaseValue: 0,
      landingPageViews: 0,
      initiateCheckouts: 0,
      outboundClicks: 0,
    },
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
    revenue: totals.purchaseValue,
    roas: totals.spend > 0 ? totals.purchaseValue / totals.spend : 0,
    cpa: totals.purchases > 0 ? totals.spend / totals.purchases : 0,
    salesCount: totals.purchases,
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
      revenue: m.purchaseValue || 0,
      roas: m.purchaseRoas || 0,
      cpa: m.costPerPurchase || 0,
      salesCount: m.purchases || 0,
      results: m.results || 0,
      purchases: m.purchases || 0,
      purchaseValue: m.purchaseValue || 0,
      landingPageViews: m.landingPageViews || 0,
      initiateCheckouts: m.initiateCheckouts || 0,
      outboundClicks: m.outboundClicks || 0,
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

/**
 * Merge daily ad spend with total revenue into chart data points.
 * Revenue is distributed evenly across days when daily breakdown is unavailable.
 */
export const mergeSpendRevenue = (
  dailyMetrics: DailyMetric[],
  performance?: CampaignPerformance,
): PerformanceChartDataPoint[] => {
  const sorted = [...dailyMetrics].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
  );

  const totalRevenue = performance?.grossRevenue ?? 0;
  const daysCount = sorted.length || 1;
  const dailyRevenue = totalRevenue / daysCount;

  return sorted.map((m) => ({
    date: m.date,
    formattedDate: new Date(m.date).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
    }),
    spend: m.spend || 0,
    revenue: dailyRevenue,
  }));
};

/**
 * Aggregate daily data points into weekly buckets.
 */
export const aggregateWeekly = (
  dailyData: PerformanceChartDataPoint[],
): PerformanceChartDataPoint[] => {
  if (dailyData.length === 0) return [];

  const weeks: PerformanceChartDataPoint[] = [];
  let weekStart = 0;

  for (let i = 0; i < dailyData.length; i++) {
    if (i - weekStart >= 7 || i === dailyData.length - 1) {
      const slice = dailyData.slice(weekStart, i + 1);
      const totalSpend = slice.reduce((sum, d) => sum + d.spend, 0);
      const totalRevenue = slice.reduce((sum, d) => sum + d.revenue, 0);

      const startDate = new Date(slice[0].date).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
      });
      const endDate = new Date(slice[slice.length - 1].date).toLocaleDateString(
        'pt-BR',
        { day: '2-digit', month: '2-digit' },
      );

      weeks.push({
        date: slice[0].date,
        formattedDate: `${startDate}-${endDate}`,
        spend: totalSpend,
        revenue: totalRevenue,
      });

      weekStart = i + 1;
    }
  }

  return weeks;
};
