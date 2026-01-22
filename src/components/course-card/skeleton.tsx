import { Skeleton } from 'reshaped';
import styles from './styles.module.scss';

export const CourseCardSkeleton = () => (
  <div className={`${styles.card} ${styles.skeletonCard}`}>
    <div className={styles.header}>
      <Skeleton width="40%" height={4} />
      <Skeleton width="90%" height={5} />
      <div className={styles.meta}>
        <Skeleton width={24} height={4} />
        <Skeleton width={28} height={4} />
      </div>
    </div>

    <div className={styles.priceSection}>
      <Skeleton width="35%" height={4} />
      <Skeleton width="50%" height={7} />
    </div>

    <Skeleton height={9} width="100%" borderRadius="medium" />
  </div>
);
