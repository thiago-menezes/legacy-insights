'use client';

import { Text, View } from 'reshaped';
import { IntegrationComponentProps } from '../types';

export const GoogleAdsIntegration = ({
  integration,
}: IntegrationComponentProps) => {
  return (
    <View gap={4} paddingTop={6}>
      <Text variant="featured-3" weight="bold">
        Google Ads
      </Text>
      <Text variant="body-3" color="neutral">
        Configurações para a integração com Google Ads para {integration.name}.
      </Text>
      <View padding={4} borderRadius="medium" backgroundColor="neutral-faded">
        <Text align="center">
          Em breve: integração direta com a API do Google Ads.
        </Text>
      </View>
    </View>
  );
};
