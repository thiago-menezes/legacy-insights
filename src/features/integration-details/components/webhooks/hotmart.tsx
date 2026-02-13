'use client';

import { Divider, View } from 'reshaped';
import { HotmartConfig } from '@/features/integrations/webhook-configs';
import { WebhookEvents } from '@/features/integrations/webhook-events';
import { WebhookTester } from '@/features/integrations/webhook-tester';
import { IntegrationComponentProps } from '../types';

export const HotmartWebhook = ({
  integration,
  integrationId,
  updateIntegration,
}: IntegrationComponentProps) => {
  const webhookUrl = `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/webhooks/hotmart/${integrationId}`;

  return (
    <View gap={6}>
      <View maxWidth="100%">
        <Divider />
        <View paddingTop={6} gap={6}>
          <HotmartConfig
            webhookUrl={webhookUrl}
            onUpdateSecret={(secret) =>
              updateIntegration({
                id: integrationId,
                webhookSecret: secret,
              })
            }
            initialSecret={integration.webhookSecret}
          />

          <Divider />

          <WebhookTester
            webhookUrl={webhookUrl}
            source="hotmart"
            secret={integration.webhookSecret}
          />
        </View>
      </View>

      <View maxWidth="100%">
        <Divider />
        <View paddingTop={6}>
          <WebhookEvents integrationId={integrationId} />
        </View>
      </View>
    </View>
  );
};
