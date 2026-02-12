'use client';

import { useMemo, useState } from 'react';
import { DEFAULT_DATE_RANGE, METRIC_CONFIGS } from './constants';
import { MOCK_ATTRIBUTION_RESPONSE, MOCK_CAMPAIGN_RESPONSE } from './mock-data';
import { CampaignHeaderData, MetricCardData, MetricKey } from './types';
import {
  aggregateMetrics,
  buildChartData,
  calcPercentageChange,
  formatMetricValue,
  splitPeriods,
} from './utils';

// TODO: Replace mock data with real API calls when backend is ready
// import { useCampaignAttributionQuery, useCampaignDetailsQuery } from '../api/query';

export const useCampaignDetailsData = (campaignId: string) => {
  const [dateRange, setDateRange] = useState(DEFAULT_DATE_RANGE);
  const [selectedMetric, setSelectedMetric] = useState<MetricKey>('spend');

  // Mock data — replace with real queries when backend routes are fixed
  const campaignResponse = MOCK_CAMPAIGN_RESPONSE;
  const attributionResponse = MOCK_ATTRIBUTION_RESPONSE;
  const isCampaignLoading = false;
  const campaignError = null;
  const isAttributionLoading = false;

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
