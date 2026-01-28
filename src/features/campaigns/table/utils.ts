import { StrapiCampaign } from '@/libs/api/services/campaigns';
import { CampaignRow, CampaignStatus } from '../types';

export const buildCampaignRow = (apiResponse: StrapiCampaign): CampaignRow => {
  const latestMetric = apiResponse.dailyMetrics?.[0];

  return {
    id: String(apiResponse.id),
    name: apiResponse.name,
    status: apiResponse.status as CampaignStatus,
    budget: Number(apiResponse.dailyBudget || 0),
    clicks: Number(latestMetric?.clicks || 0),
    clicksPrevious: 0,
    clicksChange: 0,
    cpc: Number(latestMetric?.cpc || 0),
    cpcPrevious: 0,
    cpcChange: 0,
    ctr: Number(latestMetric?.ctr || 0),
    ctrPrevious: 0,
    ctrChange: 0,
    conversionRate: Number(latestMetric?.conversionRate || 0),
    conversionRatePrevious: 0,
    conversionRateChange: 0,
  };
};
