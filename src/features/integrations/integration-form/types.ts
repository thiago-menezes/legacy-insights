import {
  IntegrationCreateInput,
  StrapiIntegration,
} from '@/libs/api/services/integrations';

export interface IntegrationFormProps {
  initialValues?: Partial<IntegrationCreateInput> | StrapiIntegration;
  onSubmit: (values: IntegrationCreateInput) => void;
  onCancel: () => void;
  isLoading?: boolean;
  projectId?: string;
  category?: 'ads' | 'sales' | 'webhooks';
}

export interface HotmartCredentials {
  clientId: string;
  clientSecret: string;
  basicToken: string;
}
