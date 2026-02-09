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
