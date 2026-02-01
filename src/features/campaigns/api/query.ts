import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { campaignsService } from '@/libs/api/services/campaigns';
import { CampaignListParams } from '@/libs/api/services/campaigns/types';

export const useCampaignsQuery = (params?: CampaignListParams) => {
  return useQuery({
    queryKey: ['campaigns', params],
    queryFn: () => campaignsService.list(params),
    placeholderData: keepPreviousData,
  });
};
