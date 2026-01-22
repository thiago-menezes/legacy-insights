import Link from 'next/link';
import { Image, Text, View } from 'reshaped';
import { Icon } from '@/components';
import { UnitDTO } from '@/types/api/units';
import styles from './styles.module.scss';

type UnitCardProps = {
  unit: UnitDTO;
};

export const UnitCard = ({ unit }: UnitCardProps) => {
  return (
    <article className={styles.card}>
      <div className={styles.qrcodeWrapper}>
        {unit.qrcode?.url ? (
          <div className={styles.qrcode}>
            <Image
              src={unit.qrcode.url}
              alt={unit.qrcode.alt || `QR Code - ${unit.name}`}
              width={200}
              height={200}
            />
          </div>
        ) : (
          <div className={styles.noQrcode}>Sem QR Code</div>
        )}
        {unit.qrcodeLink && (
          <Link
            href={unit.qrcodeLink}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.qrcodeLink}
          >
            <Text variant="body-2">
              Acessar Link <Icon name="arrow-right" />
            </Text>
          </Link>
        )}
      </div>

      <View align="start" gap={3}>
        <Text variant="featured-2" as="h3">
          <strong>{unit.name}</strong>
        </Text>

        {unit.address && (
          <div>
            <Text variant="body-1">Endereço:</Text>
            <Text variant="body-2">{unit.address}</Text>
          </div>
        )}

        {unit.city && (
          <div>
            <Text variant="body-1">Cidade:</Text>
            <Text variant="body-2">
              {unit.city.name} - {unit.city.state}
            </Text>
          </div>
        )}
      </View>
    </article>
  );
};
