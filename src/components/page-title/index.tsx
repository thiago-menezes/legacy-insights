import { Text, View } from 'reshaped';
import styles from './styles.module.scss';

export interface PageTitle {
  title: string;
  description?: string;
}

export const PageTitle = ({ title, description }: PageTitle) => {
  return (
    <View gap={1}>
      <Text variant="title-4" weight="bold" className={styles.title}>
        {title}
      </Text>

      <Text variant="body-2" color="neutral-faded">
        {description}
      </Text>
    </View>
  );
};
