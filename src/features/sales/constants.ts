import { SaleStatus } from '@/libs/api/services/sales/types';
import { StatusConfig } from './types';

export const STATUS_CONFIG: Record<SaleStatus, StatusConfig> = {
  approved: {
    label: 'Aprovada',
    color: 'positive',
    icon: 'circle-check',
  },
  pending: {
    label: 'Pendente',
    color: 'neutral',
    icon: 'clock',
  },
  refunded: {
    label: 'Reembolsada',
    color: 'critical',
    icon: 'arrow-back',
  },
  canceled: {
    label: 'Cancelada',
    color: 'critical',
    icon: 'x',
  },
  expired: {
    label: 'Expirada',
    color: 'neutral',
    icon: 'clock-off',
  },
};

export const DEFAULT_PAGE_SIZE = 25;
