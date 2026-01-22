import { clsx } from 'clsx';
import { Skeleton } from 'reshaped';
import styles from './styles.module.scss';

export const HeroSkeleton = () => (
  <div className={styles.wrapper}>
    <div className={styles.container}>
      <div className={styles.heroSection}>
        <div className={clsx(styles.heroCard, styles.heroCardMobile)}>
          <Skeleton width="100%" height="100%" />
        </div>
      </div>
    </div>
  </div>
);
