import { StrapiIntegration } from '@/libs/api/services/integrations';
import { IntegrationProfile } from '../types';

export interface ProfileItemProps {
  profile: IntegrationProfile;
  onDelete: (id: string) => void;
  onEdit: (integration: StrapiIntegration) => void;
  onProcess: (id: string, startDate?: string) => void;
  onDetails: (id: string) => void;
  canManage?: boolean;
}
