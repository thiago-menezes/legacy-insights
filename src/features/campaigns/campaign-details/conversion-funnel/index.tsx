import { Card, Text, View } from 'reshaped';
import { Icon } from '@/components/icon';
import { SourceBadge } from '@/components/source-badge';
import { formatPercentage } from '@/utils/format-currency';
import styles from './styles.module.scss';
import { ConversionFunnelProps } from './types';

export const ConversionFunnel = ({
  steps,
  isLoading = false,
}: ConversionFunnelProps) => {
  if (isLoading) {
    return (
      <Card padding={4}>
        <div
          style={{
            height: 100,
            background: 'var(--rs-color-background-neutral-faded)',
            borderRadius: 'var(--rs-unit-x2)',
          }}
        />
      </Card>
    );
  }

  return (
    <Card padding={4}>
      <View gap={4}>
        <Text variant="featured-3" weight="medium">
          Funil de Conversão
        </Text>

        <div className={styles.funnel}>
          {steps.map((step, index) => (
            <View key={step.label} direction="row" align="center" gap={2}>
              {index > 0 && (
                <div className={styles.connector}>
                  <Icon name="chevron-right" size={18} />
                  {step.rate !== undefined && (
                    <Text variant="caption-1" color="neutral-faded">
                      {formatPercentage(step.rate, false)}
                    </Text>
                  )}
                </div>
              )}
              <div className={styles.step}>
                <SourceBadge source={step.source} />
                <Text variant="title-6" weight="bold">
                  {step.formattedValue}
                </Text>
                <Text variant="caption-1" color="neutral-faded">
                  {step.label}
                </Text>
              </div>
            </View>
          ))}
        </div>
      </View>
    </Card>
  );
};
