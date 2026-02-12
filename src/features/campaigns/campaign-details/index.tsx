'use client';

import { useParams, useRouter } from 'next/navigation';
import { Card, Loader, Text, View } from 'reshaped';
import { Icon } from '@/components/icon';
import { MetricCard } from '@/components/metric-card';
import { PageTitle } from '@/components/page-title';
import { CampaignAttribution } from '../components/campaign-attribution';
import { DateRangeFilter } from '../date-range-filter';
import { CampaignHeader } from './campaign-header';
import { useCampaignDetailsData } from './hooks';
import { MetricsChart } from './metrics-chart';
import { MetricsTable } from './metrics-table';
import styles from './styles.module.scss';

export const CampaignDetails = () => {
  const params = useParams();
  const router = useRouter();
  const campaignId = params?.campaignId as string;
  const client = params?.client as string;

  const {
    campaign,
    metrics,
    chartData,
    filteredMetrics,
    attribution,
    isLoading,
    error,
    dateRange,
    handleDateRangeChange,
    selectedMetric,
    handleMetricChange,
  } = useCampaignDetailsData(campaignId);

  if (!campaignId || isLoading) {
    return (
      <View align="center" justify="center" paddingTop={10}>
        <Loader />
      </View>
    );
  }

  if (error) {
    return (
      <View>
        <PageTitle
          icon={<Icon name="chart-line" size={32} />}
          title="Detalhes da Campanha"
          description={`Campanha ${client === 'meta' ? 'Meta' : 'Google'} Ads`}
        />
        <View align="center" paddingTop={10}>
          <Text color="critical">Erro ao carregar dados da campanha.</Text>
        </View>
      </View>
    );
  }

  return (
    <View>
      <PageTitle
        icon={<Icon name="chart-line" size={32} />}
        title="Detalhes da Campanha"
        description={`Campanha ${client === 'meta' ? 'Meta' : 'Google'} Ads`}
      />

      <View paddingTop={4} gap={6}>
        {campaign && (
          <CampaignHeader campaign={campaign} onBack={() => router.back()} />
        )}

        <View direction="row" align="center" justify="space-between">
          <Text variant="featured-3" weight="medium">
            Visão Geral
          </Text>
          <DateRangeFilter value={dateRange} onChange={handleDateRangeChange} />
        </View>

        <div className={styles.metricsGrid}>
          {metrics.map((m) => (
            <MetricCard key={m.title} {...m} />
          ))}
        </div>

        <MetricsChart
          data={chartData}
          selectedMetric={selectedMetric}
          onMetricChange={handleMetricChange}
        />

        <Card padding={4}>
          <View paddingBottom={4}>
            <Text variant="featured-2" weight="medium">
              Atribuição de Vendas e ROAS
            </Text>
            <Text color="neutral-faded">
              Análise de retorno sobre investimento e eventos de venda
              atribuídos
            </Text>
          </View>
          <CampaignAttribution campaignId={campaignId} mockData={attribution} />
        </Card>

        <MetricsTable data={filteredMetrics} />
      </View>
    </View>
  );
};
