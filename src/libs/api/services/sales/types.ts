export type SaleStatus =
  | 'approved'
  | 'pending'
  | 'refunded'
  | 'canceled'
  | 'expired';

export interface StrapiSale {
  id: number;
  documentId: string;
  externalId: string;
  amount: number;
  currency: string;
  status: SaleStatus;
  customerEmail?: string;
  customerName?: string;
  customerPhone?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
  utmTerm?: string;
  saleDate: string;
  commissionAmount?: number;
  productName?: string;
  rawPayload?: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
  product?: {
    id: number;
    documentId: string;
    name: string;
    platform: string;
  };
  integration?: {
    id: number;
    documentId: string;
    name: string;
    type: string;
  };
  project?: {
    id: number;
    documentId: string;
    name: string;
  };
}

export interface SaleResponse {
  data: StrapiSale[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface SingleSaleResponse {
  data: StrapiSale;
}

export interface SaleFilters {
  projectId?: string;
  integrationId?: string;
  productId?: string;
  status?: SaleStatus;
  startDate?: string;
  endDate?: string;
  page?: number;
  pageSize?: number;
}

export interface SalesSummary {
  totalRevenue: number;
  totalSales: number;
  approvedSales: number;
  averageTicket: number;
  totalCommission: number;
  approvalRate: number;
}

export interface RevenueTimeSeriesPoint {
  date: string;
  revenue: number;
  commission: number;
}

export interface SaleAnalyticsResponse {
  data: {
    summary: SalesSummary;
    revenueTimeSeries: RevenueTimeSeriesPoint[];
  };
}

export interface SaleAnalyticsFilters {
  projectId?: string;
  startDate?: string;
  endDate?: string;
  status?: SaleStatus;
  productId?: string;
}

export interface HotmartPriceDetails {
  items: Array<{
    total: { value: number; currency_code: string };
    product: { name: string; id: number };
    base: { value: number; currency_code: string };
    transaction: string;
    fee: { value: number; currency_code: string };
    vat: { value: number; currency_code: string };
    real_conversion_rate: number;
  }>;
}

export interface HotmartParticipant {
  role: 'PRODUCER' | 'BUYER' | 'COPRODUCER' | 'AFFILIATE';
  user: {
    name: string;
    email: string;
    ucode: string;
    cellphone?: string;
    trade_name?: string;
    address?: {
      city?: string;
      country?: string;
      state?: string;
      address?: string;
      zip_code?: string;
    };
  };
}

export interface HotmartParticipantsResponse {
  items: Array<{
    transaction: string;
    users: HotmartParticipant[];
    product: { name: string; id: number };
  }>;
}

export interface HotmartCommission {
  user: {
    email: string;
    name: string;
    ucode: string;
  };
  commission: {
    value: number;
    currency_code: string;
  };
  source: string;
}

export interface HotmartCommissionsResponse {
  items: Array<{
    product: { id: number; name: string };
    commissions: HotmartCommission[];
    exchange_rate_currency_payout: number;
    transaction: string;
  }>;
}

export interface EnrichedSaleData {
  priceDetails: HotmartPriceDetails | null;
  participants: HotmartParticipantsResponse | null;
  commissions: HotmartCommissionsResponse | null;
}

export interface EnrichedSaleResponse {
  success: boolean;
  data: EnrichedSaleData;
}
