import { useState, useMemo } from 'react';
import { StrapiCampaignListResponse } from '@/libs/api/services/campaigns';
import { useCampaignsQuery } from './api/query';
import { CampaignsData, CampaignsFilters, CampaignStatus } from './types';
import { formatCurrency, formatNumber } from './utils';

const mapStrapiToCampaignsData = (
  response: StrapiCampaignListResponse,
): CampaignsData => {
  const { data, meta } = response;

  let totalSpend = 0;
  let totalLeads = 0;
  let totalClicks = 0;
  let totalConversions = 0;

  const campaignRows = data.map((campaign) => {
    let campSpend = 0;
    let campLeads = 0;
    let campClicks = 0;
    let campConversions = 0;
    let campImpressions = 0;

    campaign.dailyMetrics?.forEach((m) => {
      campSpend += Number(m.spend);
      campLeads += Number(m.leads);
      campClicks += Number(m.clicks);
      campConversions += Number(m.conversions);
      campImpressions += Number(m.impressions);
    });

    totalSpend += campSpend;
    totalLeads += campLeads;
    totalClicks += campClicks;
    totalConversions += campConversions;

    return {
      id: campaign.documentId,
      name: campaign.name,
      status: (campaign.status === 'active'
        ? 'active'
        : campaign.status === 'paused'
          ? 'disabled'
          : 'finished') as CampaignStatus,
      budget: campaign.dailyBudget || 0,

      clicks: campClicks,
      clicksPrevious: 0, // TODO: Implement previous period
      clicksChange: 0,
      cpc: campClicks > 0 ? campSpend / campClicks : 0,
      cpcPrevious: 0,
      cpcChange: 0,
      ctr: campImpressions > 0 ? (campClicks / campImpressions) * 100 : 0,
      ctrPrevious: 0,
      ctrChange: 0,
      conversionRate: campClicks > 0 ? (campConversions / campClicks) * 100 : 0,
      conversionRatePrevious: 0,
      conversionRateChange: 0,
    };
  });

  const metrics = [
    {
      title: 'Valor investido',
      value: formatCurrency(totalSpend),
      previousValue: formatCurrency(0),
      percentageChange: 0,
      icon: 'wallet' as const,
    },
    {
      title: 'Leads',
      value: formatNumber(totalLeads),
      previousValue: formatNumber(0),
      percentageChange: 0,
      icon: 'users' as const,
    },
    {
      title: 'Custo por aquisição',
      value: formatCurrency(totalLeads > 0 ? totalSpend / totalLeads : 0),
      previousValue: formatCurrency(0),
      percentageChange: 0,
      icon: 'receipt' as const,
    },
    {
      title: 'Conversão em venda',
      value: `${(totalClicks > 0 ? (totalConversions / totalClicks) * 100 : 0)
        .toFixed(2)
        .replace('.', ',')}%`,
      previousValue: '0%',
      percentageChange: 0,
      icon: 'percentage' as const,
    },
  ];

  return {
    metrics,
    campaigns: campaignRows,
    totalPages: meta.pagination.pageCount,
    currentPage: meta.pagination.page,
    totalItems: meta.pagination.total,
  };
};

export const useCampaignsData = () => {
  const [filters, setFilters] = useState<CampaignsFilters>({
    page: 1,
    pageSize: 10,
  });

  const { data, isLoading, error, refetch } = useCampaignsQuery({
    platform: 'meta',
    startDate: filters?.startDate?.toISOString(),
    endDate: filters?.endDate?.toISOString(),
    page: filters?.page,
    pageSize: filters?.pageSize,
  });

  const mappedData = useMemo(() => {
    if (!data) return null;
    return mapStrapiToCampaignsData(data);
  }, [data]);

  const handlePageChange = (page: number) => {
    setFilters((prev) => ({ ...prev, page }));
  };

  const handlePageSizeChange = (pageSize: number) => {
    setFilters((prev) => ({ ...prev, pageSize, page: 1 }));
  };

  return {
    data: mappedData,
    isLoading,
    error,
    refetch,
    filters,
    handlePageChange,
    handlePageSizeChange,
  };
};
