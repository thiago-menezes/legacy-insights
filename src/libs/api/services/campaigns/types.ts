export interface DailyMetric {
  id: number;
  date: string;
  impressions: string | number;
  reach: string | number;
  clicks: string | number;
  spend: number;
  conversions: number;
  leads: number;
  cpm: number;
  cpc: number;
  ctr: number;
  frequency: number;
  conversionRate: number;
  costPerConversion: number;
  costPerLead: number;
  results: number;
  costPerResult: number;
  purchases: number;
  purchaseValue: number;
  purchaseRoas: number;
  costPerPurchase: number;
  landingPageViews: number;
  costPerLandingPageView: number;
  initiateCheckouts: number;
  costPerInitiateCheckout: number;
  outboundClicks: number;
  costPerOutboundClick: number;
  outboundClicksCtr: number;
  connectRate: number;
  initiateCheckoutRate: number;
  checkoutRate: number;
  overallConversionRate: number;
}

export interface StrapiCampaign {
  id: number;
  documentId: string;
  externalId: string;
  name: string;
  status: 'active' | 'paused' | 'archived' | 'removed' | 'deleted';
  objective?: string;
  platform: 'meta' | 'google';
  dailyBudget?: number;
  lifetimeBudget?: number;
  startDate?: string;
  endDate?: string;
  dailyMetrics?: DailyMetric[];
}

export interface StrapiCampaignListResponse {
  data: StrapiCampaign[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
    metrics?: {
      totalSpend: number;
      totalLeads: number;
      totalClicks: number;
      totalConversions: number;
    };
  };
}

export interface CampaignListParams {
  platform?: 'meta' | 'google';
  integrationId?: string | number;
  startDate?: string;
  endDate?: string;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  showOnlyActive?: boolean;
  status?: ('active' | 'paused' | 'archived' | 'removed' | 'deleted')[];
  page?: number;
  pageSize?: number;
}

export interface MatchedWebhookEvent {
  id: number;
  documentId: string;
  source: 'hotmart' | 'kiwify' | 'kirvano' | 'custom';
  eventType: string;
  amount?: number;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  processedAt: string;
  product?: {
    id: number;
    name: string;
  } | null;
}

export interface CampaignAttribution {
  campaignId: number;
  campaignName: string;
  campaignDocumentId: string;
  totalSpend: number;
  totalRevenue: number;
  roas: number;
  salesCount: number;
  matchedEvents: MatchedWebhookEvent[];
}

export interface CampaignAttributionResponse {
  data: CampaignAttribution;
}

export interface StrapiCampaignResponse {
  data: StrapiCampaign;
}

export interface CampaignPerformance {
  campaignId: string;
  campaignDocumentId: string;
  campaignName: string;
  platform: 'meta' | 'google';
  dateRange: {
    startDate: string;
    endDate: string;
  };
  impressions: number;
  reach: number;
  clicks: number;
  spend: number;
  ctr: number;
  cpc: number;
  cpm: number;
  frequency: number;
  salesCount: number;
  grossRevenue: number;
  netRevenue: number;
  refunds: number;
  refundedAmount: number;
  averageTicket: number;
  totalCommission: number;
  roas: number;
  cpa: number;
  conversionRate: number;
  roi: number;
  attributionModel: 'last_click';
  attributionWindowDays: number;
  unmatchedSalesCount: number;
}

export interface DrilldownPerformance {
  level: 'adset' | 'ad';
  id: string;
  name: string;
  parentId: string;
  salesCount: number;
  grossRevenue: number;
  netRevenue: number;
  refunds: number;
  averageTicket: number;
  spend?: number;
  roas?: number;
  cpa?: number;
  conversionRate?: number;
}

export interface CampaignPerformanceResponse {
  data: CampaignPerformance;
  drilldown?: {
    adsets: DrilldownPerformance[];
    ads: DrilldownPerformance[];
  };
}

export interface CampaignPerformanceParams {
  startDate?: string;
  endDate?: string;
  attributionWindowDays?: number;
  includeDrilldown?: boolean;
}
