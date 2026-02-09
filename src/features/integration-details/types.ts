import {
  SingleIntegrationResponse,
  StrapiIntegration,
} from '@/libs/api/services/integrations';

export interface UseIntegrationDetailsResult {
  data: StrapiIntegration | null;
  isLoading: boolean;
  error: string | null;
  updateIntegration: (data: {
    id: string | number;
    [key: string]: unknown;
  }) => Promise<SingleIntegrationResponse>;
  refetch: () => void;
}
