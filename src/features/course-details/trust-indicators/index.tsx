import { Text, View } from 'reshaped';
import { Icon } from '@/components';
import styles from './styles.module.scss';

export const TrustIndicators = () => {
  return (
    <View className={styles.indicators}>
      <View className={styles.indicator}>
        <Icon name="shield" size={20} />
        <Text variant="caption-1" weight="medium">
          Pagamento Seguro
        </Text>
      </View>

      <View className={styles.divider} />

      <View className={styles.indicator}>
        <Icon name="award" size={20} />
        <Text variant="caption-1" weight="medium">
          MEC Aprovado
        </Text>
      </View>
    </View>
  );
};
