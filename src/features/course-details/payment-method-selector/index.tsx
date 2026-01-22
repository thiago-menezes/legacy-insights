import { Text, View } from 'reshaped';
import { PaymentMethodCard } from '../payment-method-card';
import type { PaymentMethodDisplay } from '../types';
import styles from './styles.module.scss';

export type PaymentMethodSelectorProps = {
  paymentMethods: PaymentMethodDisplay[];
};

export const PaymentMethodSelector = ({
  paymentMethods,
}: PaymentMethodSelectorProps) => {
  if (!paymentMethods || paymentMethods.length === 0) return null;

  return (
    <View className={styles.section}>
      <View className={styles.header} paddingTop={2}>
        <Text as="h3" variant="body-3" weight="medium">
          Métodos de pagamento:
        </Text>
      </View>

      <View className={styles.cardsGrid}>
        {paymentMethods.map((method) => (
          <PaymentMethodCard key={method.type} method={method} />
        ))}
      </View>
    </View>
  );
};
