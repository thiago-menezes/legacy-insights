'use client';

import { useMemo, useState } from 'react';
import { DEFAULT_DATE_RANGE, METRIC_CONFIGS } from './constants';
import { CampaignHeaderData, MetricCardData, MetricKey } from './types';
import {
  aggregateMetrics,
  buildChartData,
  calcPercentageChange,
  formatMetricValue,
  splitPeriods,
} from './utils';
import {
  useCampaignAttributionQuery,
  useCampaignDetailsQuery,
} from '../api/query';

export const useCampaignDetailsData = (campaignId: string) => {
  const [dateRange, setDateRange] = useState(DEFAULT_DATE_RANGE);
  const [selectedMetric, setSelectedMetric] = useState<MetricKey>('spend');

  const isCampaignLoading = false;
  const campaignError = null;
  const isAttributionLoading = false;

  const { data: campaignResponse } = useCampaignDetailsQuery(campaignId);
  const { data: attributionResponse } = useCampaignAttributionQuery(campaignId);

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

  const { current, previous } = useMemo(
    () => splitPeriods(dailyMetrics, dateRange),
    [dailyMetrics, dateRange],
  );

  const currentAggregated = useMemo(() => aggregateMetrics(current), [current]);
  const previousAggregated = useMemo(
    () => aggregateMetrics(previous),
    [previous],
  );

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

  const chartData = useMemo(() => buildChartData(current), [current]);

  // Suppress unused variable warning
  void campaignId;

  return {
    campaign,
    metrics,
    chartData,
    filteredMetrics: current,
    attribution: attributionResponse,
    isLoading: isCampaignLoading,
    isAttributionLoading,
    error: campaignError,
    dateRange,
    handleDateRangeChange: setDateRange,
    selectedMetric,
    handleMetricChange: setSelectedMetric,
  };
};
