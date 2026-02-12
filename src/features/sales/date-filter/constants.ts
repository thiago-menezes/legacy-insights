import { DatePreset } from './types';

export const DATE_PRESET_OPTIONS: { value: DatePreset; label: string }[] = [
  { value: '7d', label: 'Últimos 7 dias' },
  { value: '30d', label: 'Últimos 30 dias' },
  { value: '90d', label: 'Últimos 90 dias' },
  { value: 'custom', label: 'Personalizado' },
];

export const PRESET_DAYS: Record<Exclude<DatePreset, 'custom'>, number> = {
  '7d': 7,
  '30d': 30,
  '90d': 90,
};
