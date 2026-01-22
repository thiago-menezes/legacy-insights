import Image from 'next/image';
import { View } from 'reshaped';
import type { CourseDetails } from '../types';
import styles from './styles.module.scss';

export type CourseImageProps = {
  course: CourseDetails;
};

export const CourseImage = ({ course }: CourseImageProps) => {
  const imageAlt = course.name || 'Imagem do curso';

  if (!course.featuredImage) {
    return null;
  }

  return (
    <View className={styles.imageContainer}>
      <Image
        src={course.featuredImage}
        alt={imageAlt}
        fill
        className={styles.image}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 800px"
        priority
      />
    </View>
  );
};
