import { Card, Text, View } from 'reshaped';
import { Icon } from '@/components/icon';
import { SaleInfoCardProps } from './types';

export const SaleInfoCard = ({ title, icon, items }: SaleInfoCardProps) => {
  return (
    <Card padding={4}>
      <View gap={4}>
        <View direction="row" align="center" gap={2}>
          <Icon name={icon} size={20} />
          <Text variant="featured-3" weight="medium">
            {title}
          </Text>
        </View>

        <View gap={3}>
          {items.map((item) => (
            <View key={item.label} direction="row" justify="space-between">
              <Text variant="body-2" color="neutral-faded">
                {item.label}
              </Text>
              <Text variant="body-2" weight="medium">
                {item.value}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </Card>
  );
};
