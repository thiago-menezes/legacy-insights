import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import type { Metadata } from 'next';
import { UnitsPage } from '@/features/units';
import { getQueryClient } from '@/libs/api/queryClient';

export const metadata: Metadata = {
  title: 'Unidades - Conheça nossas unidades',
  description:
    'Conheça todas as nossas unidades. Escaneie o QR Code para acessar informações detalhadas.',
};

export default async function UnidadesPage() {
  const queryClient = getQueryClient();

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <UnitsPage />
    </HydrationBoundary>
  );
}
