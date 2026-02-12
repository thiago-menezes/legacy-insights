'use client';

import { Loader, View } from 'reshaped';
import { MetricCard } from '@/components/metric-card';
import {
  formatCurrency,
  formatNumber,
  formatPercentage,
} from '@/utils/format-currency';
import { SUMMARY_CARDS } from './constants';
import styles from './styles.module.scss';
import { SalesSummaryProps } from './types';

function formatValue(
  value: number | undefined,
  format: 'currency' | 'number' | 'percentage',
): string {
  if (value === undefined) return '-';

  switch (format) {
    case 'currency':
      return formatCurrency(value);
    case 'number':
      return formatNumber(value);
    case 'percentage':
      return formatPercentage(value, false);
    default:
      return String(value);
  }
}

export const SalesSummary = ({ summary, isLoading }: SalesSummaryProps) => {
  if (isLoading) {
    return (
      <View align="center" justify="center" paddingBlock={4}>
        <Loader />
      </View>
    );
  }

  return (
    <View className={styles.metricsGrid}>
      {SUMMARY_CARDS.map((card) => {
        const value = summary
          ? (summary[card.key as keyof typeof summary] as number)
          : undefined;

        return (
          <MetricCard
            key={card.key}
            title={card.title}
            value={formatValue(value, card.format)}
            icon={card.icon}
          />
        );
      })}
    </View>
  );
};
