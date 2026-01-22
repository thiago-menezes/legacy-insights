import { Text, View } from 'reshaped';
import { Icon, IconNames } from '@/components';
import type { PaymentMethodDisplay } from '../types';
import styles from './styles.module.scss';

export type PaymentMethodCardProps = {
  method: PaymentMethodDisplay;
};

export const PaymentMethodCard = ({ method }: PaymentMethodCardProps) => {
  return (
    <View className={styles.card}>
      <View className={styles.cardHeader}>
        <View className={styles.iconWrapper}>
          <Icon name={method.icon as IconNames} size={24} />
        </View>
        <View className={styles.methodInfo}>
          <Text variant="body-2" weight="bold">
            {method.name}
          </Text>
          <Text variant="caption-2" color="neutral-faded">
            {method.description}
          </Text>
        </View>
      </View>
    </View>
  );
};
