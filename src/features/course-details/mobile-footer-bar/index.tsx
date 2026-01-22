import { Button, View } from 'reshaped';
import { Icon } from '@/components';
import styles from './styles.module.scss';

export type MobileFooterBarProps = {
  ctaLabel?: string;
  ctaDisabled?: boolean;
};

export const MobileFooterBar = ({
  ctaLabel = 'Quero me inscrever',
}: MobileFooterBarProps) => {
  return (
    <View className={styles.footer}>
      <a href="#enrollment">
        <Button
          icon={<Icon name="book-2" />}
          color="primary"
          size="large"
          className={styles.ctaButton}
        >
          {ctaLabel}
        </Button>
      </a>
    </View>
  );
};
