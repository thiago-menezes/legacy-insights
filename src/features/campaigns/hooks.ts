import { useState, useMemo } from 'react';
import { StrapiCampaignListResponse } from '@/libs/api/services/campaigns';
import { useCampaignsQuery } from './api/query';
import { buildCampaignRow } from './table/utils';
import { CampaignsData, CampaignsFilters } from './types';
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
    campaign.dailyMetrics?.forEach((m) => {
      totalSpend += Number(m.spend);
      totalLeads += Number(m.leads);
      totalClicks += Number(m.clicks);
      totalConversions += Number(m.conversions);
    });

    return buildCampaignRow(campaign);
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
