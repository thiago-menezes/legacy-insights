import { StrapiIntegration } from '@/libs/api/services/integrations';

export interface UseIntegrationDetailsResult {
  data: StrapiIntegration | null;
  isLoading: boolean;
  error: string | null;
}
