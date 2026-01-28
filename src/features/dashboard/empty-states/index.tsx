'use client';

import { useRouter } from 'next/navigation';
import { View } from 'reshaped';
import { EmptyState } from '@/components/empty-state';
import { PageTitle } from '@/components/page-title';
import styles from './styles.module.scss';
import { DashboardEmptyStateProps } from './types';

const EMPTY_STATE_CONFIG = {
  'no-project': {
    icon: 'folder' as const,
    title: 'Nenhum projeto encontrado',
    description:
      'Para visualizar o dashboard, é necessário criar um projeto no workspace atual.',
    actionLabel: 'Criar Projeto',
    getUrl: (props: DashboardEmptyStateProps) => props.projectsPageUrl,
  },
  'no-integration': {
    icon: 'plug-connected' as const,
    title: 'Integração não configurada',
    description:
      'Para visualizar os dados do dashboard, é necessário configurar as integrações.',
    actionLabel: 'Configurar Integração',
    getUrl: (props: DashboardEmptyStateProps) => props.integrationsPageUrl,
  },
  'no-data': {
    icon: 'chart-pie' as const,
    title: 'Nenhum dado disponível',
    description:
      'Ainda não há dados de campanhas para exibir. Os dados aparecerão aqui após a sincronização com suas contas de anúncios.',
    actionLabel: undefined,
    getUrl: () => '',
  },
};

export const DashboardEmptyState = (props: DashboardEmptyStateProps) => {
  const router = useRouter();
  const config = EMPTY_STATE_CONFIG[props.state];

  const handleAction = () => {
    const url = config.getUrl(props);
    if (url) {
      router.push(url);
    }
  };

  return (
    <View gap={6}>
      <PageTitle
        title="Dashboard"
        description="Gestão de campanhas do Instagram, Facebook e Google Ads"
      />

      <View className={styles.container}>
        <EmptyState
          icon={config.icon}
          title={config.title}
          description={config.description}
          actionLabel={config.actionLabel}
          onAction={config.actionLabel ? handleAction : undefined}
        />
      </View>
    </View>
  );
};
