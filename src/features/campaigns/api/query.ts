import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { campaignsService } from '@/libs/api/services/campaigns';
import {
  CampaignListParams,
  CampaignPerformanceParams,
} from '@/libs/api/services/campaigns/types';

export const useCampaignsQuery = (params?: CampaignListParams) => {
  return useQuery({
    queryKey: ['campaigns', params],
    queryFn: () => campaignsService.list(params),
    placeholderData: keepPreviousData,
  });
};

export const useCampaignAttributionQuery = (campaignId: string) => {
  return useQuery({
    queryKey: ['campaigns', campaignId, 'attribution'],
    queryFn: () => campaignsService.getAttribution(campaignId),
    enabled: !!campaignId,
  });
};

export const useCampaignDetailsQuery = (campaignId: string) => {
  return useQuery({
    queryKey: ['campaigns', campaignId, 'details'],
    queryFn: () => campaignsService.getById(campaignId),
    enabled: !!campaignId,
  });
};

export const useCampaignPerformanceQuery = (
  campaignId: string,
  params: CampaignPerformanceParams = {},
) => {
  return useQuery({
    queryKey: ['campaigns', campaignId, 'performance', params],
    queryFn: () => campaignsService.getPerformance(campaignId, params),
    enabled: !!campaignId,
    staleTime: 5 * 60 * 1000,
  });
};
