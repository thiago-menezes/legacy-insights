'use client';

import { useMemo, useState } from 'react';
import { KPI_CONFIGS, METRIC_CONFIGS } from './constants';
import {
  CampaignHeaderData,
  ChartGranularity,
  FunnelStepData,
  MetricCardData,
  MetricKey,
} from './types';
import {
  aggregateMetrics,
  aggregateWeekly,
  buildChartData,
  calcPercentageChange,
  formatMetricValue,
  mergeSpendRevenue,
  splitPeriods,
} from './utils';
import {
  useCampaignAttributionQuery,
  useCampaignDetailsQuery,
  useCampaignPerformanceQuery,
} from '../api/query';
import { formatCompactNumber } from '@/utils/format-currency';
import { DateRangeValue } from './date-range-picker/types';
import { KpiCardProps } from './kpi-card/types';
import { CampaignPerformance } from '@/libs/api/services/campaigns/types';
import { PerformanceChartDataPoint } from './performance-chart/types';

// Map KPI config keys to CampaignPerformance field names
const PERF_FIELD_MAP: Record<string, string> = { revenue: 'grossRevenue' };

const getPerfValue = (perf: CampaignPerformance, key: string): number => {
  const perfKey = (PERF_FIELD_MAP[key] || key) as keyof CampaignPerformance;
  const val = perf[perfKey];
  return typeof val === 'number' ? val : 0;
};

const daysAgo = (days: number): string => {
  const d = new Date();
  d.setDate(d.getDate() - days);
  return d.toISOString().split('T')[0];
};

const today = (): string => new Date().toISOString().split('T')[0];

export const useCampaignDetailsData = (campaignId: string) => {
  const [dateRange, setDateRange] = useState<DateRangeValue>({
    startDate: daysAgo(30),
    endDate: today(),
  });
  const [selectedMetric, setSelectedMetric] = useState<MetricKey>('spend');
  const [granularity, setGranularity] = useState<ChartGranularity>('daily');

  const {
    data: campaignResponse,
    isLoading: isCampaignLoading,
    error: campaignError,
  } = useCampaignDetailsQuery(campaignId);
  const { data: attributionResponse, isLoading: isAttributionLoading } =
    useCampaignAttributionQuery(campaignId);
  const {
    data: performanceResponse,
    isLoading: isPerformanceLoading,
    error: performanceError,
  } = useCampaignPerformanceQuery(campaignId, {
    startDate: dateRange.startDate,
    endDate: dateRange.endDate,
  });

  const campaign = useMemo((): CampaignHeaderData | null => {
    if (!campaignResponse?.data) return null;
    const c = campaignResponse.data;
    return {
      name: c.name,
      status: c.status,
      platform: c.platform,
      objective: c.objective,
      dailyBudget: c.dailyBudget,
      lifetimeBudget: c.lifetimeBudget,
      startDate: c.startDate,
      endDate: c.endDate,
    };
  }, [campaignResponse]);

  const dailyMetrics = useMemo(
    () => campaignResponse?.data?.dailyMetrics ?? [],
    [campaignResponse],
  );

  // Calculate days from dateRange for legacy period splitting
  const dateRangeDays = useMemo(() => {
    const start = new Date(dateRange.startDate);
    const end = new Date(dateRange.endDate);
    return Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  }, [dateRange]);

  const { current, previous } = useMemo(
    () => splitPeriods(dailyMetrics, dateRangeDays),
    [dailyMetrics, dateRangeDays],
  );

  const currentAggregated = useMemo(() => aggregateMetrics(current), [current]);
  const previousAggregated = useMemo(
    () => aggregateMetrics(previous),
    [previous],
  );

  // Legacy MetricCard data (used by MetricsChart)
  const metrics = useMemo((): MetricCardData[] => {
    return METRIC_CONFIGS.map((config) => {
      const currentValue = currentAggregated[config.key];
      const previousValue = previousAggregated[config.key];
      const change = calcPercentageChange(currentValue, previousValue);

      return {
        title: config.label,
        value: formatMetricValue(currentValue, config.format),
        previousValue:
          previousValue > 0
            ? formatMetricValue(previousValue, config.format)
            : undefined,
        percentageChange: change,
        icon: config.icon,
      };
    });
  }, [currentAggregated, previousAggregated]);

  // KPI cards with performance data (new unified metrics)
  const kpiCards = useMemo((): KpiCardProps[] => {
    const perf = performanceResponse?.data;

    return KPI_CONFIGS.map((config) => {
      let value: number;

      if (perf) {
        value = getPerfValue(perf, config.key);
      } else {
        value = currentAggregated[config.key] ?? 0;
      }

      return {
        title: config.label,
        value: formatMetricValue(value, config.format),
        icon: config.icon,
        source: config.source ?? 'meta',
        tooltip: config.tooltip,
        invertColor: config.invertColor,
        isLoading: isCampaignLoading,
      };
    });
  }, [performanceResponse, currentAggregated, isCampaignLoading]);

  // Performance chart data (spend vs revenue)
  const performanceChartData = useMemo((): PerformanceChartDataPoint[] => {
    const dailyData = mergeSpendRevenue(current, performanceResponse?.data);

    if (granularity === 'weekly') {
      return aggregateWeekly(dailyData);
    }

    return dailyData;
  }, [current, performanceResponse, granularity]);

  const chartData = useMemo(() => buildChartData(current), [current]);

  // Funnel data
  const funnelData = useMemo((): FunnelStepData[] => {
    const perf = performanceResponse?.data;
    const impressions = perf?.impressions ?? currentAggregated.impressions;
    const clicks = perf?.clicks ?? currentAggregated.clicks;
    const sales = perf?.salesCount ?? 0;

    return [
      {
        label: 'Impressões',
        value: impressions,
        formattedValue: formatCompactNumber(impressions),
        source: 'meta' as const,
        rate: undefined,
      },
      {
        label: 'Cliques',
        value: clicks,
        formattedValue: formatCompactNumber(clicks),
        source: 'meta' as const,
        rate: impressions > 0 ? (clicks / impressions) * 100 : undefined,
      },
      {
        label: 'Vendas',
        value: sales,
        formattedValue: formatCompactNumber(sales),
        source: 'hotmart' as const,
        rate: clicks > 0 ? (sales / clicks) * 100 : undefined,
      },
    ];
  }, [performanceResponse, currentAggregated]);

  return {
    campaign,
    metrics,
    kpiCards,
    chartData,
    performanceChartData,
    filteredMetrics: current,
    attribution: attributionResponse,
    performance: performanceResponse,
    funnelData,
    isLoading: isCampaignLoading,
    isPerformanceLoading,
    isAttributionLoading,
    error: campaignError ?? null,
    performanceError: performanceError ?? null,
    dateRange,
    handleDateRangeChange: setDateRange,
    selectedMetric,
    handleMetricChange: setSelectedMetric,
    granularity,
    handleGranularityChange: setGranularity,
  };
};
