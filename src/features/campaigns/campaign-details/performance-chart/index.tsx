'use client';

import {
  Area,
  CartesianGrid,
  ComposedChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { Button, Card, Text, View } from 'reshaped';
import { formatCurrency } from '@/utils/format-currency';
import { REVENUE_COLOR, SPEND_COLOR } from './constants';
import styles from './styles.module.scss';
import { PerformanceChartProps } from './types';

export const PerformanceChart = ({
  data,
  granularity,
  onGranularityChange,
  isLoading = false,
}: PerformanceChartProps) => {
  if (isLoading) {
    return (
      <Card padding={4}>
        <div
          style={{
            height: 350,
            background: 'var(--rs-color-background-neutral-faded)',
          }}
        />
      </Card>
    );
  }

  return (
    <Card padding={4}>
      <View gap={4}>
        <View direction="row" align="center" justify="space-between" gap={4}>
          <View gap={1}>
            <Text variant="featured-3" weight="medium">
              Investimento vs Receita
            </Text>
            <View direction="row" gap={4}>
              <View direction="row" align="center" gap={2}>
                <div className={styles.spendDot} />
                <Text variant="caption-1" color="neutral-faded">
                  Investimento (Meta)
                </Text>
              </View>
              <View direction="row" align="center" gap={2}>
                <div className={styles.revenueDot} />
                <Text variant="caption-1" color="neutral-faded">
                  Receita (Hotmart)
                </Text>
              </View>
            </View>
          </View>

          <View direction="row" gap={2} className={styles.granularityTabs}>
            <Button
              variant={granularity === 'daily' ? 'solid' : 'outline'}
              size="small"
              onClick={() => onGranularityChange('daily')}
            >
              Diário
            </Button>
            <Button
              variant={granularity === 'weekly' ? 'solid' : 'outline'}
              size="small"
              onClick={() => onGranularityChange('weekly')}
            >
              Semanal
            </Button>
          </View>
        </View>

        <div className={styles.chartContainer}>
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
              data={data}
              margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="gradient-spend" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={SPEND_COLOR} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={SPEND_COLOR} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="var(--rs-color-border-neutral-faded)"
                vertical={false}
              />
              <XAxis
                dataKey="formattedDate"
                axisLine={false}
                tickLine={false}
                tick={{
                  fill: 'var(--rs-color-foreground-neutral-faded)',
                  fontSize: 12,
                }}
              />
              <YAxis
                yAxisId="left"
                axisLine={false}
                tickLine={false}
                tick={{
                  fill: 'var(--rs-color-foreground-neutral-faded)',
                  fontSize: 12,
                }}
                tickFormatter={(v) => formatCurrency(v)}
                width={90}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                axisLine={false}
                tickLine={false}
                tick={{
                  fill: 'var(--rs-color-foreground-neutral-faded)',
                  fontSize: 12,
                }}
                tickFormatter={(v) => formatCurrency(v)}
                width={90}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'var(--rs-color-background-elevated)',
                  border: '1px solid var(--rs-color-border-neutral-faded)',
                  borderRadius: '8px',
                  boxShadow: 'var(--rs-shadow-overlay)',
                }}
                labelStyle={{
                  color: 'var(--rs-color-foreground-neutral)',
                }}
                formatter={(value, name) => [
                  formatCurrency(Number(value) || 0),
                  name === 'spend' ? 'Investimento' : 'Receita',
                ]}
              />
              <Area
                yAxisId="left"
                type="monotone"
                dataKey="spend"
                stroke={SPEND_COLOR}
                strokeWidth={2}
                fill="url(#gradient-spend)"
                name="spend"
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="revenue"
                stroke={REVENUE_COLOR}
                strokeWidth={2}
                dot={false}
                name="revenue"
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </View>
    </Card>
  );
};
