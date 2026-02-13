'use client';

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { Card, Loader, Text, View } from 'reshaped';
import { formatCurrency } from '@/utils/format-currency';
import { REVENUE_CHART_COLORS } from './constants';
import styles from './styles.module.scss';
import { RevenueChartProps } from './types';

function formatDateLabel(dateStr: string): string {
  const [, month, day] = dateStr.split('-');
  return `${day}/${month}`;
}

export const RevenueChart = ({ data, isLoading }: RevenueChartProps) => {
  const chartData = data.map((point) => ({
    name: formatDateLabel(point.date),
    revenue: point.revenue,
    commission: point.commission,
  }));

  return (
    <Card padding={4}>
      <View gap={1}>
        <Text variant="featured-3" weight="medium">
          Receita ao Longo do Tempo
        </Text>
        <Text variant="body-3" color="neutral-faded">
          Receita e comissão diária em BRL
        </Text>
      </View>

      {isLoading ? (
        <View align="center" justify="center" height="300px">
          <Loader />
        </View>
      ) : (
        <View>
          <div className={styles.chartContainer}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={chartData}
                margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
              >
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'var(--rs-color-background-elevated)',
                    border: '1px solid var(--rs-color-border-neutral-faded)',
                    borderRadius: '8px',
                    boxShadow: 'var(--rs-shadow-overlay)',
                    zIndex: 99999,
                  }}
                  labelStyle={{
                    color: 'var(--rs-color-foreground-neutral)',
                  }}
                  formatter={(value) => [formatCurrency(value as number), '']}
                />
                <defs>
                  <linearGradient
                    id="gradient-revenue"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="5%"
                      stopColor={REVENUE_CHART_COLORS.revenue}
                      stopOpacity={0.3}
                    />
                    <stop
                      offset="95%"
                      stopColor={REVENUE_CHART_COLORS.revenue}
                      stopOpacity={0}
                    />
                  </linearGradient>
                  <linearGradient
                    id="gradient-commission"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="5%"
                      stopColor={REVENUE_CHART_COLORS.commission}
                      stopOpacity={0.3}
                    />
                    <stop
                      offset="95%"
                      stopColor={REVENUE_CHART_COLORS.commission}
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="var(--rs-color-border-neutral-faded)"
                  vertical={false}
                />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fill: 'var(--rs-color-foreground-neutral-faded)',
                    fontSize: 12,
                  }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fill: 'var(--rs-color-foreground-neutral-faded)',
                    fontSize: 12,
                  }}
                  tickFormatter={(value) =>
                    value >= 1000 ? `${value / 1000}k` : String(value)
                  }
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke={REVENUE_CHART_COLORS.revenue}
                  strokeWidth={2}
                  fill="url(#gradient-revenue)"
                  name="Receita"
                />
                <Area
                  type="monotone"
                  dataKey="commission"
                  stroke={REVENUE_CHART_COLORS.commission}
                  strokeWidth={2}
                  fill="url(#gradient-commission)"
                  name="Comissão"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className={styles.chartLegend}>
            <div className={styles.legendItem}>
              <span
                className={styles.legendDot}
                style={{
                  backgroundColor: REVENUE_CHART_COLORS.revenue,
                }}
              />
              <Text variant="caption-1" color="neutral-faded">
                Receita
              </Text>
            </div>
            <div className={styles.legendItem}>
              <span
                className={styles.legendDot}
                style={{
                  backgroundColor: REVENUE_CHART_COLORS.commission,
                }}
              />
              <Text variant="caption-1" color="neutral-faded">
                Comissão
              </Text>
            </div>
          </div>
        </View>
      )}
    </Card>
  );
};
