'use client';

import { useState } from 'react';
import { Button, Divider, Text, View } from 'reshaped';
import { Icon } from '@/components/icon';
import { HotmartSyncModal } from '@/features/integrations/hotmart-sync-modal';
import { IntegrationComponentProps } from '../types';

export const HotmartSalesPlatform = ({
  integration,
  integrationId,
  refetch,
}: IntegrationComponentProps) => {
  const [showSyncModal, setShowSyncModal] = useState(false);

  return (
    <View gap={6}>
      <View gap={2} paddingTop={4}>
        <Text variant="featured-3" weight="bold">
          Sincronização de Vendas
        </Text>
        <Text variant="body-3" color="neutral">
          Sincronize vendas históricas da Hotmart para o período desejado.
        </Text>

        <View paddingBottom={6}>
          <Button
            color="primary"
            icon={<Icon name="refresh" size={16} />}
            onClick={() => setShowSyncModal(true)}
          >
            Sincronizar Vendas
          </Button>
        </View>

        <Divider />
      </View>

      <HotmartSyncModal
        integrationId={integrationId}
        integrationName={integration.name}
        isOpen={showSyncModal}
        onClose={() => setShowSyncModal(false)}
        onSuccess={() => {
          refetch();
        }}
      />
    </View>
  );
};
