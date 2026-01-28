export type IntegrationType = 'meta_ads' | 'google_ads';

export type IntegrationStatus = 'connected' | 'disconnected' | 'token_expired';
export type SyncStatus = 'success' | 'failed' | 'pending';

export interface StrapiIntegration {
  id: number;
  documentId: string;
  name: string;
  type: IntegrationType;
  status: IntegrationStatus;
  lastSyncAt: string | null;
  lastSyncStatus: SyncStatus | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
  config: Record<string, unknown> | null;
  project?: {
    id: number;
    documentId: string;
    name: string;
  };
}

export interface IntegrationResponse {
  data: StrapiIntegration[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface SingleIntegrationResponse {
  data: StrapiIntegration;
}

export interface IntegrationCreateInput {
  name: string;
  type: IntegrationType;
  project: string | number;
  accessToken?: string;
  refreshToken?: string;
  config?: {
    // Meta Ads
    appId?: string;
    appSecret?: string;
    adAccountIds?: string[];
    // Google Ads
    clientId?: string;
    clientSecret?: string;
    developerToken?: string;
    customerIds?: string[];
    loginCustomerId?: string;
  };
  status?: IntegrationStatus;
}
