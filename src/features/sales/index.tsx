'use client';

import { Loader, Select, Text, View } from 'reshaped';
import { Icon } from '@/components/icon';
import { PageTitle } from '@/components/page-title';
import { SaleStatus } from '@/libs/api/services/sales/types';
import { STATUS_CONFIG } from './constants';
import { useSalesData } from './hooks';
import styles from './styles.module.scss';
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
    filters,
    pagination,
    handlePageChange,
    handleStatusFilter,
  } = useSalesData();

  if (isLoading && rows.length === 0) {
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
        <View
          direction="row"
          justify="space-between"
          align="center"
          className={styles.filterBar}
        >
          <Text variant="featured-2" weight="medium">
            Lista de Vendas
          </Text>

          <View direction="row" gap={3} align="center">
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
          </View>
        </View>

        <SalesTable
          data={rows}
          isLoading={isLoading}
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
          onPageChange={handlePageChange}
        />
      </View>
    </View>
  );
};
