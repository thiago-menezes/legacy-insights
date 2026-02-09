import { apiClient } from '../../axios';
import {
  HotmartSyncRequest,
  HotmartSyncResponse,
  HotmartCredentialValidationRequest,
  HotmartCredentialValidationResponse,
} from './types';

export const syncSales = async (
  integrationId: string | number,
  payload: HotmartSyncRequest,
) => {
  const { data } = await apiClient.post<HotmartSyncResponse>(
    `/api/hotmart/integrations/${integrationId}/sync`,
    payload,
  );
  return data;
};

export const validateCredentials = async (
  payload: HotmartCredentialValidationRequest,
) => {
  const { data } = await apiClient.post<HotmartCredentialValidationResponse>(
    '/api/hotmart/validate-credentials',
    payload,
  );
  return data;
};
