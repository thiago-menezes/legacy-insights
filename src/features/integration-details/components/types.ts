import { StrapiIntegration } from '@/libs/api/services/integrations';
import { UseIntegrationDetailsResult } from '../types';

export interface IntegrationComponentProps {
  integration: StrapiIntegration;
  integrationId: string;
  updateIntegration: UseIntegrationDetailsResult['updateIntegration'];
  refetch: UseIntegrationDetailsResult['refetch'];
}
