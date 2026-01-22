import Image from 'next/image';
import Link from 'next/link';
import { Text } from 'reshaped';
import styles from './styles.module.scss';
import type { EmecBadgeProps } from './types';

export const EmecBadge = ({
  title,
  qrcodeUrl,
  qrcodeAlt = 'QR Code e-MEC',
}: EmecBadgeProps) => {
  return (
    <Link href="/unidades" className={styles.container} aria-label={title}>
      <div className={styles.header}>
        <Image
          src="/logos/emec.png"
          alt="Logo e-MEC"
          width={72}
          height={28}
          className={styles.logo}
        />
      </div>
      <div className={styles.qrCodeWrapper}>
        <Image
          src={qrcodeUrl}
          alt={qrcodeAlt}
          width={320}
          height={320}
          className={styles.qrCode}
        />
      </div>
      <Text as="p" variant="body-2" color="primary" weight="bold">
        Acesse já!
      </Text>
    </Link>
  );
};
