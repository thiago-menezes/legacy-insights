import { DateRangePreset } from './types';

const toISODate = (d: Date): string => d.toISOString().split('T')[0];

const daysAgo = (days: number): string => {
  const d = new Date();
  d.setDate(d.getDate() - days);
  return toISODate(d);
};

const startOfMonth = (): string => {
  const d = new Date();
  d.setDate(1);
  return toISODate(d);
};

export const DATE_PRESETS: DateRangePreset[] = [
  {
    label: 'Hoje',
    getDates: () => ({
      startDate: toISODate(new Date()),
      endDate: toISODate(new Date()),
    }),
  },
  {
    label: '7d',
    getDates: () => ({ startDate: daysAgo(7), endDate: toISODate(new Date()) }),
  },
  {
    label: '14d',
    getDates: () => ({
      startDate: daysAgo(14),
      endDate: toISODate(new Date()),
    }),
  },
  {
    label: '30d',
    getDates: () => ({
      startDate: daysAgo(30),
      endDate: toISODate(new Date()),
    }),
  },
  {
    label: 'Mês atual',
    getDates: () => ({
      startDate: startOfMonth(),
      endDate: toISODate(new Date()),
    }),
  },
];
