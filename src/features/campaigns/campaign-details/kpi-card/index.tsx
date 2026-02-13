import { Badge, Card, Text, View } from 'reshaped';
import { Icon } from '@/components/icon';
import { SourceBadge } from '@/components/source-badge';
import { formatPercentage } from '@/utils/format-currency';
import { KpiCardProps } from './types';
import styles from './styles.module.scss';

export const KpiCard = ({
  title,
  value,
  previousValue,
  percentageChange,
  icon,
  source,
  tooltip,
  invertColor = false,
  isLoading = false,
}: KpiCardProps) => {
  if (isLoading) {
    return <div className={styles.skeleton} />;
  }

  const isPositive = percentageChange !== undefined && percentageChange >= 0;
  const changeColor = invertColor
    ? isPositive
      ? 'critical'
      : 'positive'
    : isPositive
      ? 'positive'
      : 'critical';

  return (
    <Card padding={4} className={styles.card}>
      <View gap={3}>
        <View direction="row" align="center" gap={2}>
          <View direction="row" align="center" className={styles.titleBar}>
            {icon && (
              <View padding={2} borderRadius="small">
                <Icon name={icon} size={18} />
              </View>
            )}
            <Text variant="body-3" color="neutral-faded">
              {title}
            </Text>
          </View>
          <SourceBadge source={source} />
        </View>

        <View gap={1}>
          <View direction="row" align="end" gap={2}>
            <Text
              variant="title-6"
              weight="bold"
              attributes={{ title: tooltip }}
            >
              {value}
            </Text>
            {percentageChange !== undefined && (
              <Badge
                color={changeColor}
                variant="faded"
                icon={
                  <Icon name={isPositive ? 'trending-up' : 'trending-down'} />
                }
                rounded
              >
                {formatPercentage(percentageChange)}
              </Badge>
            )}
          </View>

          {previousValue && (
            <Text variant="caption-1" color="neutral-faded">
              {previousValue} no período anterior
            </Text>
          )}
        </View>
      </View>
    </Card>
  );
};
