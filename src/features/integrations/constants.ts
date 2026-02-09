import { IconNames } from '@/components/icon';
import {
  IntegrationType,
  StrapiIntegration,
} from '@/libs/api/services/integrations';
import { StrapiProject } from '@/libs/api/services/projects';
import { IntegrationTab } from './types';

export const TABS: { id: IntegrationTab; label: string; icon?: IconNames }[] = [
  { id: 'all', label: 'Todos' },
  { id: 'ads', label: 'Anúncios', icon: 'speakerphone' },
  { id: 'sales', label: 'Plataformas de Venda', icon: 'shopping-cart' },
  { id: 'webhooks', label: 'Webhooks', icon: 'webhook' },
  { id: 'utms', label: 'UTMs & Scripts', icon: 'code' },
];

export const PLATFORM_METADATA = [
  {
    id: 'meta_ads',
    name: 'Meta Ads',
    description: 'Conecte seus perfis do Meta Ads',
    icon: '/icon-meta.png',
    category: 'ads',
    integrationType: 'meta_ads',
  },
  {
    id: 'google_ads',
    name: 'Google Ads',
    description: 'Conecte seus perfis do Google Ads',
    icon: '/icon-google.png',
    category: 'ads',
    integrationType: 'google_ads',
  },
  {
    id: 'hotmart_api',
    name: 'Hotmart',
    description: 'Conecte sua conta Hotmart via API e sincronize vendas',
    icon: '/icon-hotmart.png',
    category: 'sales',
    integrationType: 'hotmart',
    filter: (i: StrapiIntegration) =>
      i.type === 'hotmart' && (!!i.accessToken || !!i.config?.clientId),
  },
  {
    id: 'hotmart',
    name: 'Hotmart',
    description: 'Receba eventos de vendas do Hotmart via webhook',
    icon: '/icon-hotmart.png',
    category: 'webhooks',
    integrationType: 'hotmart',
    filter: (i: StrapiIntegration) =>
      i.type === 'hotmart' && !i.accessToken && !i.config?.clientId,
  },
  {
    id: 'kiwify',
    name: 'Kiwify',
    description: 'Receba eventos de vendas do Kiwify',
    icon: '/icon-kiwify.png',
    category: 'webhooks',
    integrationType: 'kiwify',
  },
  {
    id: 'kirvano',
    name: 'Kirvano',
    description: 'Receba eventos de vendas do Kirvano',
    icon: '/icon-kirvano.png',
    category: 'webhooks',
    integrationType: 'kirvano',
  },
  {
    id: 'custom_webhook',
    name: 'Webhook Personalizado',
    description: 'Configure um webhook customizado',
    icon: 'webhook',
    category: 'webhooks',
    integrationType: 'custom_webhook',
  },
] as const;

export const STATUS_CONFIG: Record<
  string,
  { label: string; color: 'positive' | 'neutral' | 'critical' }
> = {
  connected: {
    label: 'Conectado',
    color: 'positive',
  },
  disconnected: {
    label: 'Desconectado',
    color: 'neutral',
  },
  token_expired: {
    label: 'Token Expirado',
    color: 'critical',
  },
  error: {
    label: 'Erro',
    color: 'critical',
  },
  processing: {
    label: 'Processando',
    color: 'neutral',
  },
};
export const PROCESS_STATUS_CONFIG: Record<
  string,
  { label: string; color: 'positive' | 'neutral' | 'critical' }
> = {
  'não processado': {
    label: 'Não Processado',
    color: 'neutral',
  },
  processando: {
    label: 'Processando',
    color: 'neutral',
  },
  erro: {
    label: 'Erro',
    color: 'critical',
  },
  'finalizado com sucesso': {
    label: 'Finalizado',
    color: 'positive',
  },
};

export const INTEGRATION_TYPES: { label: string; value: IntegrationType }[] = [
  { label: 'Meta Ads', value: 'meta_ads' },
  { label: 'Google Ads', value: 'google_ads' },
  { label: 'Hotmart', value: 'hotmart' },
  { label: 'Kiwify', value: 'kiwify' },
  { label: 'Kirvano', value: 'kirvano' },
  { label: 'Webhook Personalizado', value: 'custom_webhook' },
];

export const BREADCRUMBS: {
  label: (project?: StrapiProject) => string;
  href?: (project?: StrapiProject) => string;
}[] = [
  {
    label: (_?: StrapiProject) => 'Lista de Workspaces',
    href: (_?: StrapiProject) => '/workspaces',
  },
  {
    label: (project?: StrapiProject) =>
      `Workspace: ${project?.workspace?.slug}`,
    href: (project?: StrapiProject) =>
      `/workspaces/${project?.workspace?.slug}`,
  },
  {
    label: (project?: StrapiProject) => `Projeto: ${project?.name}`,
  },
];
