export interface HotmartSyncRequest {
  startDate: string;
  endDate: string;
}

export interface HotmartSyncStats {
  created: number;
  updated: number;
  errors: number;
}

export interface HotmartSyncResponse {
  success: boolean;
  stats: HotmartSyncStats;
  message: string;
}

export interface HotmartCredentialValidationRequest {
  credentialsText: string;
}

export interface HotmartCredentialValidationResponse {
  success: boolean;
  message: string;
  credentials?: {
    clientId: string;
  };
}
