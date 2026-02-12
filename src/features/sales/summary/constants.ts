import { IconNames } from '@/components/icon';

export interface SummaryCardConfig {
  key: string;
  title: string;
  icon: IconNames;
  format: 'currency' | 'number' | 'percentage';
}

export const SUMMARY_CARDS: SummaryCardConfig[] = [
  {
    key: 'totalRevenue',
    title: 'Receita Total',
    icon: 'currency-dollar',
    format: 'currency',
  },
  {
    key: 'totalSales',
    title: 'Total de Vendas',
    icon: 'shopping-cart',
    format: 'number',
  },
  {
    key: 'averageTicket',
    title: 'Ticket Médio',
    icon: 'receipt',
    format: 'currency',
  },
  {
    key: 'approvalRate',
    title: 'Taxa de Aprovação',
    icon: 'circle-check',
    format: 'percentage',
  },
];
