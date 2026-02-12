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
import { Button, Card, Text, View } from 'reshaped';
import { CHART_COLORS, METRIC_CONFIGS } from '../constants';
import { formatMetricValue } from '../utils';
import styles from './styles.module.scss';
import { MetricsChartProps } from './types';

export const MetricsChart = ({
  data,
  selectedMetric,
  onMetricChange,
}: MetricsChartProps) => {
  const color = CHART_COLORS[selectedMetric];
  const config = METRIC_CONFIGS.find((c) => c.key === selectedMetric);

  return (
    <Card padding={4}>
      <View gap={4}>
        <View direction="row" align="center" justify="space-between" gap={4}>
          <View gap={1}>
            <Text variant="featured-3" weight="medium">
              Performance ao Longo do Tempo
            </Text>
            <Text variant="body-3" color="neutral-faded">
              {config?.label || selectedMetric}
            </Text>
          </View>
        </View>

        <View direction="row" gap={2} className={styles.metricTabs}>
          {METRIC_CONFIGS.map((m) => (
            <Button
              key={m.key}
              variant={selectedMetric === m.key ? 'solid' : 'outline'}
              size="small"
              onClick={() => onMetricChange(m.key)}
            >
              {m.label}
            </Button>
          ))}
        </View>

        <div className={styles.chartContainer}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient
                  id={`gradient-${selectedMetric}`}
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="5%" stopColor={color} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={color} stopOpacity={0} />
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
                axisLine={false}
                tickLine={false}
                tick={{
                  fill: 'var(--rs-color-foreground-neutral-faded)',
                  fontSize: 12,
                }}
                tickFormatter={(value) =>
                  config
                    ? formatMetricValue(value, config.format)
                    : String(value)
                }
                width={80}
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
                formatter={(value) => [
                  config
                    ? formatMetricValue(value as number, config.format)
                    : String(value),
                  config?.label || selectedMetric,
                ]}
              />
              <Area
                type="monotone"
                dataKey={selectedMetric}
                stroke={color}
                strokeWidth={2}
                fill={`url(#gradient-${selectedMetric})`}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </View>
    </Card>
  );
};
