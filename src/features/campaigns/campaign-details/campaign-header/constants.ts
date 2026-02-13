import { CampaignHeaderData } from '../types';

export const STATUS_LABELS: Record<CampaignHeaderData['status'], string> = {
  active: 'Ativa',
  paused: 'Pausada',
  archived: 'Arquivada',
  removed: 'Removida',
  deleted: 'Excluída',
};

export const STATUS_COLORS: Record<
  CampaignHeaderData['status'],
  'positive' | 'neutral' | 'critical' | 'primary'
> = {
  active: 'positive',
  paused: 'neutral',
  archived: 'neutral',
  removed: 'critical',
  deleted: 'critical',
};
