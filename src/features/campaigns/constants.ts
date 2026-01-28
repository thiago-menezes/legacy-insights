import { IconNames } from '@/components/icon';
import { CampaignStatus, CampaignTab, UseParamsCampaigns } from './types';

export const STATUS_CONFIG: Record<
  CampaignStatus,
  { label: string; color: 'positive' | 'neutral' | 'critical'; icon: IconNames }
> = {
  active: {
    label: 'Ativo',
    color: 'positive',
    icon: 'circle-check',
  },
  paused: {
    label: 'Pausado',
    color: 'neutral',
    icon: 'player-pause',
  },
  archived: {
    label: 'Arquivado',
    color: 'neutral',
    icon: 'archive',
  },
  removed: {
    label: 'Removido',
    color: 'critical',
    icon: 'trash',
  },
  deleted: {
    label: 'Excluído',
    color: 'critical',
    icon: 'trash',
  },
};

export const TABS: { id: CampaignTab; label: string }[] = [
  { id: 'campaigns', label: 'Campanhas' },
  { id: 'adsets', label: 'Conjuntos' },
  { id: 'ads', label: 'Anúncios' },
];

export const PLATFORM_CONFIG: Record<
  UseParamsCampaigns['client'],
  { title: string; description: string; icon: string }
> = {
  meta: {
    title: 'Campanhas da Meta',
    description:
      ' Gestão de campanhas do Instagram, Facebook e outras ferramentas da Meta',
    icon: '/icon-meta.png',
  },
  google: {
    title: 'Campanhas do Google',
    description: 'Gestão de campanhas de pesquisa, display, Youtube e Shopping',
    icon: '/icon-google.png',
  },
};
