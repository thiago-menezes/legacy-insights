export interface HotmartSyncRequest {
  integrationId: string;
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
