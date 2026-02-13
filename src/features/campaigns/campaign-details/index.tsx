'use client';

import { useParams, useRouter } from 'next/navigation';
import { Card, Text, View } from 'reshaped';
import { Icon } from '@/components/icon';
import { PageTitle } from '@/components/page-title';
import { CampaignAttribution } from '../components/campaign-attribution';
import { AttributionNotice } from './attribution-notice';
import { CampaignHeader } from './campaign-header';
import { ConversionFunnel } from './conversion-funnel';
import { DateRangePicker } from './date-range-picker';
import { useCampaignDetailsData } from './hooks';
import { KpiCard } from './kpi-card';
import { MetricsChart } from './metrics-chart';
import { MetricsTable } from './metrics-table';
import { PerformanceChart } from './performance-chart';
import { CampaignDetailsSkeleton } from './skeleton';
import styles from './styles.module.scss';

export const CampaignDetails = () => {
  const params = useParams();
  const router = useRouter();
  const campaignId = params?.campaignId as string;
  const client = params?.client as string;

  const {
    campaign,
    kpiCards,
    chartData,
    performanceChartData,
    filteredMetrics,
    attribution,
    funnelData,
    isLoading,
    isPerformanceLoading,
    error,
    performanceError,
    dateRange,
    handleDateRangeChange,
    selectedMetric,
    handleMetricChange,
    granularity,
    handleGranularityChange,
  } = useCampaignDetailsData(campaignId);

  if (!campaignId || isLoading) {
    return (
      <View>
        <PageTitle
          icon={<Icon name="chart-line" size={32} />}
          title="Detalhes da Campanha"
          description={`Campanha ${client === 'meta' ? 'Meta' : 'Google'} Ads`}
        />
        <View paddingTop={4}>
          <CampaignDetailsSkeleton />
        </View>
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

        <View direction="row" align="center" justify="space-between" gap={4}>
          <Text variant="featured-3" weight="medium">
            Visão Geral
          </Text>
          <DateRangePicker value={dateRange} onChange={handleDateRangeChange} />
        </View>

        <div className={styles.kpiGrid}>
          {kpiCards.map((kpi) => (
            <KpiCard key={kpi.title} {...kpi} />
          ))}
        </div>

        {performanceError && (
          <Card padding={4}>
            <Text color="neutral-faded">
              Dados de performance de vendas indisponíveis no momento. Mostrando
              apenas métricas de anúncios.
            </Text>
          </Card>
        )}

        <PerformanceChart
          data={performanceChartData}
          granularity={granularity}
          onGranularityChange={handleGranularityChange}
          isLoading={isPerformanceLoading}
        />

        {!performanceError && (
          <ConversionFunnel
            steps={funnelData}
            isLoading={isPerformanceLoading}
          />
        )}

        {campaign && (
          <AttributionNotice
            platform={campaign.platform}
            endDate={dateRange.endDate}
          />
        )}

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
