import { IconProps } from '@/components/icon';

export type CampaignStatus =
  | 'active'
  | 'paused'
  | 'archived'
  | 'removed'
  | 'deleted';

export type CampaignTab = 'campaigns' | 'adsets' | 'ads';

export interface CampaignMetric {
  title: string;
  value: string;
  previousValue: string;
  percentageChange: number;
  icon?: IconProps['name'];
}

export interface CampaignRow {
  id: string;
  documentId: string;
  name: string;
  status: CampaignStatus;
  budget: number;
  spend: number;
  spendPrevious: number;
  spendChange: number;
  clicks: number;
  clicksPrevious: number;
  clicksChange: number;
  cpc: number;
  cpcPrevious: number;
  cpcChange: number;
  ctr: number;
  ctrPrevious: number;
  ctrChange: number;
  conversionRate: number;
  conversionRatePrevious: number;
  conversionRateChange: number;
  results: number;
  resultsPrevious: number;
  resultsChange: number;
  costPerResult: number;
  costPerResultPrevious: number;
  costPerResultChange: number;
  purchases: number;
  purchasesPrevious: number;
  purchasesChange: number;
  purchaseValue: number;
  purchaseValuePrevious: number;
  purchaseValueChange: number;
  purchaseRoas: number;
  purchaseRoasPrevious: number;
  purchaseRoasChange: number;
  costPerPurchase: number;
  costPerPurchasePrevious: number;
  costPerPurchaseChange: number;
  landingPageViews: number;
  landingPageViewsPrevious: number;
  landingPageViewsChange: number;
  costPerLandingPageView: number;
  costPerLandingPageViewPrevious: number;
  costPerLandingPageViewChange: number;
  initiateCheckouts: number;
  initiateCheckoutsPrevious: number;
  initiateCheckoutsChange: number;
  costPerInitiateCheckout: number;
  costPerInitiateCheckoutPrevious: number;
  costPerInitiateCheckoutChange: number;
  outboundClicks: number;
  outboundClicksPrevious: number;
  outboundClicksChange: number;
  costPerOutboundClick: number;
  costPerOutboundClickPrevious: number;
  costPerOutboundClickChange: number;
  outboundClicksCtr: number;
  outboundClicksCtrPrevious: number;
  outboundClicksCtrChange: number;
  connectRate: number;
  connectRatePrevious: number;
  connectRateChange: number;
  initiateCheckoutRate: number;
  initiateCheckoutRatePrevious: number;
  initiateCheckoutRateChange: number;
  checkoutRate: number;
  checkoutRatePrevious: number;
  checkoutRateChange: number;
  overallConversionRate: number;
  overallConversionRatePrevious: number;
  overallConversionRateChange: number;
}

export interface CampaignsData {
  metrics: CampaignMetric[];
  campaigns: CampaignRow[];
  totalPages: number;
  currentPage: number;
  totalItems: number;
}

export interface CampaignsFilters {
  integrationId?: string | number;
  startDate?: Date;
  endDate?: Date;
  status?: CampaignStatus[];
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  showOnlyActive?: boolean;
  page?: number;
  pageSize?: number;
}

export interface CampaignMetricCardProps {
  title: string;
  value: string;
  previousValue?: string;
  percentageChange?: number;
  icon?: IconProps['name'];
}

export interface CampaignsTableProps {
  data: CampaignRow[];
  isLoading?: boolean;
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
  currentPage?: number;
  totalPages?: number;
  pageSize?: number;
  totalItems?: number;
  platform?: 'meta' | 'google';
}

export interface StatusBadgeProps {
  status: CampaignStatus;
}

export type UseParamsCampaigns = {
  client: 'meta' | 'google';
};
