import clsx from 'clsx';
import { Skeleton } from 'reshaped';
import styles from './styles.module.scss';

export const HeroBannerSkeleton = () => {
  return (
    <div className={styles.container}>
      <Skeleton className={clsx(styles.skeleton, styles.desktopSkeleton)} />
      <Skeleton className={clsx(styles.skeleton, styles.mobileSkeleton)} />
    </div>
  );
};
