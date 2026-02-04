import { apiClient } from '../../axios';
import type { WebhookEventsParams, WebhookEventsResponse } from './types';

export const get = async (
  integrationId: string,
  params?: WebhookEventsParams,
): Promise<WebhookEventsResponse> => {
  const response = await apiClient.get(
    `/api/integrations/${integrationId}/webhook-events`,
    { params },
  );
  return response.data;
};
