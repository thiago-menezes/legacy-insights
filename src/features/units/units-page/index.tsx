'use client';

import { useQuery } from '@tanstack/react-query';
import { Text } from 'reshaped';
import { handleUnits } from '@/bff/handlers/units/handler';
import { UnitsGrid } from '../units-grid';
import styles from './styles.module.scss';

const INSTITUTION_SLUG = process.env.NEXT_PUBLIC_INSTITUTION || '';

export const UnitsPage = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['units', INSTITUTION_SLUG],
    queryFn: () => handleUnits({ institutionSlug: INSTITUTION_SLUG }),
    enabled: !!INSTITUTION_SLUG,
  });

  const units = data?.data ?? [];

  return (
    <section className={styles.page}>
      <div className={styles.container}>
        <header className={styles.header}>
          <Text variant="title-3" as="h1">
            Nossas Unidades
          </Text>

          <Text variant="body-2">
            Escaneie o QR Code para acessar informações de cada unidade
          </Text>
        </header>

        <UnitsGrid units={units} isLoading={isLoading} />
      </div>
    </section>
  );
};
