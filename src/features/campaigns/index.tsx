'use client';

import Image from 'next/image';
import { useParams } from 'next/navigation';
import { View, Button, Tabs } from 'reshaped';
import { Icon } from '@/components/icon';
import { MetricCard } from '@/components/metric-card';
import { PageTitle } from '@/components/page-title';
import { useDataAccessStatus } from '@/hooks';
import { PLATFORM_CONFIG, TABS } from './constants';
import { CampaignsEmptyState } from './empty-states';
import { useCampaignsData } from './hooks';
import { CampaignsSkeleton } from './skeleton';
import styles from './styles.module.scss';
import { CampaignsTable } from './table';
import { UseParamsCampaigns } from './types';

export const Campaigns = () => {
  const { client: platformParam } = useParams<UseParamsCampaigns>();
  const {
    data,
    isLoading: isLoadingData,
    filters,
    handlePageChange,
    handlePageSizeChange,
  } = useCampaignsData(platformParam);

  const integrationType =
    platformParam === 'google' ? 'google_ads' : 'meta_ads';

  const {
    state: accessState,
    isLoading: isLoadingAccess,
    integrationsPageUrl,
    projectsPageUrl,
  } = useDataAccessStatus({
    integrationType,
    hasData: !!data && data.campaigns.length > 0,
  });

  const isLoading = isLoadingData || isLoadingAccess;

  if (!platformParam) return <></>;

  if (isLoading) {
    return <CampaignsSkeleton />;
  }

  if (accessState === 'no-project') {
    return (
      <CampaignsEmptyState
        state="no-project"
        platform={platformParam}
        projectsPageUrl={projectsPageUrl}
        integrationsPageUrl={integrationsPageUrl}
      />
    );
  }

  if (accessState === 'no-integration') {
    return (
      <CampaignsEmptyState
        state="no-integration"
        platform={platformParam}
        projectsPageUrl={projectsPageUrl}
        integrationsPageUrl={integrationsPageUrl}
      />
    );
  }

  if (!data || data.campaigns.length === 0) {
    return (
      <CampaignsEmptyState
        state="no-data"
        platform={platformParam}
        projectsPageUrl={projectsPageUrl}
        integrationsPageUrl={integrationsPageUrl}
      />
    );
  }

  const { metrics, campaigns, totalPages, currentPage, totalItems } = data;

  const currentPlatform = PLATFORM_CONFIG[platformParam];

  return (
    <View gap={4} className={styles.campaigns}>
      <PageTitle
        icon={
          <div className={styles.iconContainer}>
            <Image
              src={currentPlatform.icon}
              alt={platformParam}
              width={32}
              height={32}
              priority
              quality={80}
            />
          </div>
        }
        title={currentPlatform.title}
        description={currentPlatform.description}
      />

      <View
        direction="row"
        align="center"
        justify="space-between"
        className={styles.header}
      >
        <View direction="row" gap={4} align="center">
          <Tabs variant="pills-elevated" defaultValue="campaigns">
            <Tabs.List>
              {TABS.map((tab) => (
                <Tabs.Item key={tab.id} value={tab.id}>
                  {tab.label}
                </Tabs.Item>
              ))}
            </Tabs.List>
          </Tabs>
        </View>

        <Button
          variant="outline"
          icon={<Icon name="chart-bar" size={18} />}
          endIcon={<Icon name="chevron-down" size={16} />}
        >
          Editar gráficos
        </Button>
      </View>

      <div className={styles.metricsGrid}>
        {metrics.map((metric) => (
          <MetricCard
            key={metric.title}
            title={metric.title}
            value={metric.value}
            previousValue={metric.previousValue}
            percentageChange={metric.percentageChange}
            icon={metric.icon}
          />
        ))}
      </div>

      <View className={styles.filterBar}>
        <div className={styles.filterBarLeft}>
          <Button variant="outline" icon={<Icon name="calendar" size={18} />}>
            01 Dez, 2025 - 31 Dez, 2025
          </Button>
          <Button
            variant="outline"
            icon={<Icon name="adjustments-horizontal" size={18} />}
          >
            Filtros
          </Button>
        </div>

        <Button
          variant="outline"
          icon={<Icon name="table" size={18} />}
          endIcon={<Icon name="chevron-down" size={16} />}
        >
          Editar tabela
        </Button>
      </View>

      <CampaignsTable
        data={campaigns}
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={totalItems}
        pageSize={filters.pageSize || 10}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
      />
    </View>
  );
};
