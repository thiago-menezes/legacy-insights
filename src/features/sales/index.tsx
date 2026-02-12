'use client';

import { Loader, Select, Text, View } from 'reshaped';
import { Icon } from '@/components/icon';
import { PageTitle } from '@/components/page-title';
import { SaleStatus } from '@/libs/api/services/sales/types';
import { STATUS_CONFIG } from './constants';
import { DateFilter } from './date-filter';
import { useSalesData } from './hooks';
import { ProductFilter } from './product-filter';
import { RevenueChart } from './revenue-chart';
import styles from './styles.module.scss';
import { SalesSummary } from './summary';
import { SalesTable } from './table';

const STATUS_OPTIONS = [
  { value: '', label: 'Todos os status' },
  ...Object.entries(STATUS_CONFIG).map(([value, config]) => ({
    value,
    label: config.label,
  })),
];

export const Sales = () => {
  const {
    rows,
    isLoading,
    isAnalyticsLoading,
    filters,
    analytics,
    pagination,
    handlePageChange,
    handleStatusFilter,
    handleDatePresetChange,
    handleDateRangeChange,
    handleProductFilter,
    handleRowClick,
  } = useSalesData();

  if (isLoading && rows.length === 0 && !analytics) {
    return (
      <View align="center" justify="center" paddingTop={10}>
        <Loader />
      </View>
    );
  }

  return (
    <View gap={4}>
      <PageTitle
        icon={<Icon name="receipt" size={32} />}
        title="Vendas"
        description="Acompanhe todas as vendas das suas plataformas integradas"
      />

      <View gap={4}>
        <View className={styles.filterBar}>
          <DateFilter
            startDate={filters.startDate}
            endDate={filters.endDate}
            preset={filters.datePreset}
            onPresetChange={handleDatePresetChange}
            onDateRangeChange={handleDateRangeChange}
          />

          <Select
            name="status-filter"
            onChange={({ value }) =>
              handleStatusFilter(value ? (value as SaleStatus) : undefined)
            }
            value={filters.status || ''}
          >
            {STATUS_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>

          <ProductFilter
            value={filters.productId}
            onChange={handleProductFilter}
          />
        </View>

        <SalesSummary
          summary={analytics?.summary}
          isLoading={isAnalyticsLoading}
        />

        <RevenueChart
          data={analytics?.revenueTimeSeries || []}
          isLoading={isAnalyticsLoading}
        />

        <Text variant="featured-2" weight="medium">
          Lista de Vendas
        </Text>

        <SalesTable
          data={rows}
          isLoading={isLoading}
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
          onPageChange={handlePageChange}
          onRowClick={handleRowClick}
        />
      </View>
    </View>
  );
};
