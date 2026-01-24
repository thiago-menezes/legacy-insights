import { IconNames } from '@/components/icon';
import { IntegrationPlatform, IntegrationTab } from './types';

export const TABS: { id: IntegrationTab; label: string; icon?: IconNames }[] = [
  { id: 'all', label: 'Todos' },
  { id: 'ads', label: 'Anúncios', icon: 'speakerphone' },
  { id: 'webhooks', label: 'Webhooks', icon: 'webhook' },
];

export const INTEGRATIONS: IntegrationPlatform[] = [
  {
    id: 'meta',
    name: 'Meta Ads',
    description: 'Conecte seus perfis do Meta Ads',
    icon: '/icon-meta.png',
    category: 'ads',
    profiles: [
      { id: '1', name: 'Grupo Ser', status: 'connected' },
      { id: '2', name: 'GOkursos', status: 'disconnected' },
    ],
  },
  {
    id: 'google',
    name: 'Google Ads',
    description: 'Conecte seus perfis do Google Ads',
    icon: '/icon-google.png',
    category: 'ads',
    profiles: [{ id: '3', name: 'Grupo Ser', status: 'connected' }],
  },
];

export const STATUS_CONFIG: Record<
  'connected' | 'disconnected',
  { label: string; color: 'positive' | 'neutral' }
> = {
  connected: {
    label: 'Conectado',
    color: 'positive',
  },
  disconnected: {
    label: 'Desconectado',
    color: 'neutral',
  },
};
