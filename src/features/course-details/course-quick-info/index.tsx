import { Text, View } from 'reshaped';
import { Icon } from '@/components';
import styles from './styles.module.scss';

export type CourseQuickInfoProps = {
  totalHours?: number;
  campus?: string;
  startDate?: string;
};

export const CourseQuickInfo = ({
  totalHours,
  campus,
  startDate,
}: CourseQuickInfoProps) => {
  const hasInfo = totalHours || campus || startDate;

  if (!hasInfo) return null;

  return (
    <View className={styles.quickInfo}>
      {totalHours && (
        <View className={styles.infoItem}>
          <Icon name="book" size={16} />
          <Text variant="body-3">{totalHours}h de carga horária</Text>
        </View>
      )}

      {campus && (
        <View className={styles.infoItem}>
          <Icon name="map-pin" size={16} />
          <Text variant="body-3">{campus}</Text>
        </View>
      )}

      {startDate && (
        <View className={styles.infoItem}>
          <Icon name="calendar" size={16} />
          <Text variant="body-3">Início: {startDate}</Text>
        </View>
      )}
    </View>
  );
};
