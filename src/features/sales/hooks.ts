import { useCallback, useMemo, useState } from 'react';
import { SaleStatus } from '@/libs/api/services/sales/types';
import { useSalesQuery } from './api/query';
import { DEFAULT_PAGE_SIZE } from './constants';
import { SalesPageFilters } from './types';
import { mapStrapiToSaleRow } from './utils';

export const useSalesData = () => {
  const [filters, setFilters] = useState<SalesPageFilters>({
    page: 1,
    pageSize: DEFAULT_PAGE_SIZE,
  });

  const apiFilters = useMemo(
    () => ({
      status: filters.status,
      startDate: filters.startDate?.toISOString(),
      endDate: filters.endDate?.toISOString(),
      page: filters.page,
      pageSize: filters.pageSize,
    }),
    [filters],
  );

  const { data, isLoading, error } = useSalesQuery(apiFilters);

  const rows = useMemo(
    () => (data?.data || []).map(mapStrapiToSaleRow),
    [data],
  );

  const pagination = data?.meta?.pagination;

  const handlePageChange = useCallback((page: number) => {
    setFilters((prev) => ({ ...prev, page }));
  }, []);

  const handleStatusFilter = useCallback((status: SaleStatus | undefined) => {
    setFilters((prev) => ({ ...prev, status, page: 1 }));
  }, []);

  const handleDateRangeChange = useCallback(
    (startDate?: Date, endDate?: Date) => {
      setFilters((prev) => ({ ...prev, startDate, endDate, page: 1 }));
    },
    [],
  );

  const handleClearFilters = useCallback(() => {
    setFilters({
      page: 1,
      pageSize: DEFAULT_PAGE_SIZE,
    });
  }, []);

  return {
    rows,
    isLoading,
    error,
    filters,
    pagination: {
      currentPage: pagination?.page || 1,
      totalPages: pagination?.pageCount || 1,
      totalItems: pagination?.total || 0,
    },
    handlePageChange,
    handleStatusFilter,
    handleDateRangeChange,
    handleClearFilters,
  };
};
