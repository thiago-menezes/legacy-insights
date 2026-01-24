export type IntegrationTab = 'all' | 'ads' | 'webhooks';

export type ConnectionStatus = 'connected' | 'disconnected';

export interface IntegrationProfile {
  id: string;
  name: string;
  status: ConnectionStatus;
}

export interface IntegrationPlatform {
  id: string;
  name: string;
  description: string;
  icon: string;
  profiles: IntegrationProfile[];
  category: 'ads' | 'webhooks';
}
