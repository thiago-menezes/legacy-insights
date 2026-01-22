import { Text, View } from 'reshaped';
import { Icon } from '@/components';
import { formatPrice, toProperCase } from '@/utils';
import styles from './styles.module.scss';

export type EnrollmentSummaryProps = {
  courseName: string;
  selectedShift?: string;
  selectedAdmissionForm?: string;
  promotionalPrice?: string;
  monthlyPrice?: number;
  unitName?: string;
  modality?: string;
};

export const EnrollmentSummary = ({
  courseName,
  selectedShift,
  selectedAdmissionForm,
  promotionalPrice,
  monthlyPrice,
  unitName,
  modality,
}: EnrollmentSummaryProps) => {
  return (
    <View className={styles.summary}>
      <View className={styles.header}>
        <Icon name="clipboard-list" size={20} />
        <Text variant="body-2" weight="bold">
          Resumo
        </Text>
      </View>

      <View className={styles.items}>
        <View className={styles.item}>
          <Text variant="caption-1" color="neutral-faded">
            Curso
          </Text>
          <Text variant="body-3" weight="medium">
            {toProperCase(courseName)}
          </Text>
        </View>

        {unitName && modality !== 'Digital' && (
          <View className={styles.item}>
            <Text variant="caption-1" color="neutral-faded">
              Unidade
            </Text>
            <Text variant="body-3" weight="medium">
              {unitName}
            </Text>
          </View>
        )}

        {selectedShift && (
          <View className={styles.item}>
            <Text variant="caption-1" color="neutral-faded">
              Turno
            </Text>
            <Text variant="body-3" weight="medium">
              {selectedShift}
            </Text>
          </View>
        )}

        {selectedAdmissionForm && (
          <View className={styles.item}>
            <Text variant="caption-1" color="neutral-faded">
              Forma de ingresso
            </Text>
            <Text variant="body-3" weight="medium">
              {selectedAdmissionForm}
            </Text>
          </View>
        )}
      </View>

      {(promotionalPrice || monthlyPrice) && (
        <View className={styles.priceSection}>
          {promotionalPrice && (
            <View className={styles.promotionalPrice}>
              <Text variant="caption-1" color="neutral-faded">
                Primeira mensalidade
              </Text>
              <Text variant="featured-2" weight="bold" className={styles.price}>
                {promotionalPrice}
              </Text>
            </View>
          )}

          {monthlyPrice && (
            <Text variant="caption-2" color="neutral-faded">
              A partir da 2ª parcela:{' '}
              <strong>{formatPrice(monthlyPrice)}</strong>/mês
            </Text>
          )}
        </View>
      )}
    </View>
  );
};
