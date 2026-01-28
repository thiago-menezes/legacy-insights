import { useQuery } from '@tanstack/react-query';
import { campaignService } from '@/libs/api/services/campaigns';
import { CampaignListParams } from '@/libs/api/services/campaigns/types';

export const useCampaignsQuery = (params?: CampaignListParams) => {
  return useQuery({
    queryKey: campaignService.keys('list', params),
    queryFn: () => campaignService.list(params),
  });
};
