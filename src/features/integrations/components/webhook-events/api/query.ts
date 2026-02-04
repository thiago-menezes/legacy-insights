import {
  WebhookEventsParams,
  webhookEventsService,
} from '@/libs/api/services/webhook-events';
import { useQuery } from '@tanstack/react-query';

export const useWebhookEventsQuery = (
  integrationId: string,
  params?: WebhookEventsParams,
) => {
  return useQuery({
    queryKey: ['webhook-events', integrationId, params],
    queryFn: () => webhookEventsService.get(integrationId, params),
    enabled: !!integrationId,
  });
};
