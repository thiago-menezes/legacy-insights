import Link from 'next/link';
import { Text, View } from 'reshaped';
import styles from './styles.module.scss';

export const CourseSearchHeader = () => {
  return (
    <View className={styles.header}>
      <Text variant="body-2" color="neutral-faded">
        <Link className={styles.homeLink} href="/">
          Home
        </Link>{' '}
        /{' '}
        <Text as="strong" color="primary" weight="bold">
          Lista de cursos
        </Text>
      </Text>

      <Text
        as="h1"
        variant={{ m: 'featured-2', s: 'featured-3' }}
        weight="bold"
        color="neutral"
      >
        Encontre o curso ideal para você
      </Text>
    </View>
  );
};
