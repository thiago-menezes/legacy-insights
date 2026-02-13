'use client';

import { Divider, Text, View } from 'reshaped';
import { WebhookEvents } from '@/features/integrations/webhook-events';
import { WebhookTester } from '@/features/integrations/webhook-tester';
import { IntegrationComponentProps } from '../types';
import styles from '../../styles.module.scss';

export const CustomWebhook = ({
  integration,
  integrationId,
}: IntegrationComponentProps) => {
  const webhookUrl = `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/webhooks/custom/${integrationId}`;

  return (
    <View gap={6}>
      <View maxWidth="100%">
        <Divider />
        <View paddingTop={6} gap={6}>
          <View className={styles.logItem} gap={2}>
            <Text weight="medium">Webhook URL</Text>
            <View
              padding={2}
              borderRadius="small"
              backgroundColor="neutral-faded"
            >
              <Text variant="caption-1" color="neutral">
                {webhookUrl}
              </Text>
            </View>
          </View>

          <Divider />

          <WebhookTester
            webhookUrl={webhookUrl}
            source="custom"
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
